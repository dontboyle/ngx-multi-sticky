import {
  Injectable,
  OnDestroy,
  Renderer2,
  RendererFactory2,
} from '@angular/core';
import {
  StickyAttributes,
  StickyInstance,
  defaultOptions,
} from './ngx-many-sticky.classes';

@Injectable({
  providedIn: 'root',
})
export class NgxManyStickyService implements OnDestroy {
  private renderer: Renderer2;
  _stickies: StickyInstance[] = [];

  private scrollFn: () => void;
  private resizeFn: () => void;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.scrollFn = this.renderer.listen('window', 'scroll', (event) => {
      this.doScroll();
    });

    this.resizeFn = this.renderer.listen('window', 'resize', (event) => {
      this.doScroll(true);
    });
  }

  remove(instance: StickyInstance) {
    this._stickies = this._stickies.filter((ref) => ref !== instance);
  }
  add(instance: StickyInstance) {
    instance.options = Object.assign({}, defaultOptions, instance.options);

    // set the elementIndex attributes
    instance.el.nativeElement.setAttribute(
      `${StickyAttributes.groupIndex}`,
      instance.groupIndex
    );
    instance.el.nativeElement.setAttribute(
      `${StickyAttributes.elementIndex}`,
      instance.elementIndex
    );

    this._stickies.push(instance);

    this._stickies.sort((a, b) => {
      if (a.groupIndex === b.groupIndex) {
        return a.elementIndex - b.elementIndex; // sort by elementIndex if groupIndex is the same
      }
      return a.groupIndex - b.groupIndex; // primary sort by groupIndex
    });

    setTimeout(() => {
      this.doScroll();
    }, 250);
  }

  doScroll(windowResize: boolean = false) {
    requestAnimationFrame(() => {
      this.setElementPositions(windowResize);
    });
  }

  reset() {
    this.doScroll(true);
  }

  private getPreviousGroups(instance: StickyInstance) {
    return this._stickies.filter((f) => f.groupIndex < instance.groupIndex);
  }
  private setElementPositions(windowResize = false) {
    this._stickies.forEach((instance) => {
      //   if (
      //     instance.offset === undefined ||
      //     instance.offset === null ||
      //     windowResize
      //   ) {
      //     this.CalcOffset(instance);
      //   }
      this.CalcOffset(instance);

      if (windowResize) {
        if (instance.isSticky) {
          this.removeFixedState(instance);
          this.setFixedState(instance);
        }
      } else {
        const currentStickyState = this.getCurrentStickyState(instance);
        if (instance.isSticky !== currentStickyState) {
          instance.isSticky = currentStickyState;
          instance.$stickyState.emit(instance.isSticky);
          if (instance.isSticky) {
            this.setAnimation(instance);
            this.setFixedState(instance);
          } else {
            this.setAnimation(instance);
            this.removeFixedState(instance);
          }
          this.removeAnimation(instance);
        }
      }
      if (instance.debug) {
        instance.el.nativeElement['debug'] = Object.assign(
          {},
          instance.getDebugOptions()
        );
      }
    });
  }
  private calcHeightOfPreviousElementsStickyHeight(
    instance: StickyInstance
  ): number {
    // Create a map to hold the height of the currently sticky element for each group
    const groupStickyHeights: Map<number, number> = new Map();

    this._stickies.forEach((sticky) => {
      if (sticky.isSticky && sticky.groupIndex < instance.groupIndex) {
        //update the height for its sticky group
        groupStickyHeights.set(
          sticky.groupIndex,
          sticky.el.nativeElement.offsetHeight
        );
      }
    });

    // Sum the heights of the currently sticky elements from each group
    const totalHeight = Array.from(groupStickyHeights.values()).reduce(
      (sum, height) => sum + height,
      0
    );

    return totalHeight;
  }

  private CalcOffset(instance: StickyInstance) {
    let currentOffset = this.calcHeightOfPreviousElementsStickyHeight(instance);
    instance.offset = currentOffset;
  }

  private getCurrentStickyState(instance: StickyInstance) {
    return window.scrollY + instance.offset > instance.spacer.offsetTop;
  }

  setAnimation(instance: StickyInstance) {
    if (instance.options.animation) {
      const animationClass = instance.isSticky
        ? instance.options.animationClassIn
        : instance.options.animationClassOut;

      if (animationClass) {
        this.renderer.setStyle(
          instance.el.nativeElement,
          'transition',
          `all ${instance.options.animationSpeed}`
        );
        this.renderer.addClass(instance.el.nativeElement, 'animation');
        this.renderer.addClass(instance.el.nativeElement, animationClass);
      }
    }
  }
  removeAnimation(instance: StickyInstance) {
    if (instance.options.animation) {
      const animationClass = instance.isSticky
        ? instance.options.animationClassIn
        : instance.options.animationClassOut;

      if (animationClass) {
        setTimeout(() => {
          this.renderer.removeStyle(instance.el.nativeElement, 'transition');
          this.renderer.removeClass(instance.el.nativeElement, 'animation');
          this.renderer.removeClass(instance.el.nativeElement, animationClass);
        }, instance.options.animationSpeedMs);
      }
    }
  }

  private setFixedState(instance: StickyInstance) {
    // Stop page flicker
    const currentElementHeight = instance.el.nativeElement.offsetHeight;
    this.renderer.setStyle(
      instance.spacer,
      'height',
      `${currentElementHeight}px`
    );

    // Set element styles
    this.renderer.addClass(instance.el.nativeElement, 'isSticky');
    instance.el.nativeElement['isSticky'] = true;
    this.renderer.setStyle(instance.el.nativeElement, 'position', 'fixed');
    this.renderer.setStyle(
      instance.el.nativeElement,
      'top',
      `${instance.offset}px`
    );
    this.renderer.setStyle(
      instance.el.nativeElement,
      'z-index',
      instance.zIndex
    );

    if (instance.elementIndex > 0) {
      this.hidePreviousStickyAndSpacerElements(instance);
    }
  }

  private removeFixedState(instance: StickyInstance) {
    // Stop page flicker
    this.renderer.removeStyle(instance.spacer, 'height');

    // Reset element styles
    this.renderer.removeClass(instance.el.nativeElement, 'isSticky');
    instance.el.nativeElement['isSticky'] = false;
    this.renderer.removeStyle(instance.el.nativeElement, 'position');
    this.renderer.removeStyle(instance.el.nativeElement, 'top');
    this.renderer.removeStyle(instance.el.nativeElement, 'z-index');

    if (instance.elementIndex > 0) {
      this.showPreviousStickyAndSpacerElements(instance);
    }
  }

  private showPreviousStickyAndSpacerElements(instance: StickyInstance) {
    const prevGroups = this.getPreviousGroups(instance);
    for (let i = 0; i < prevGroups.length; i++) {
      const previousInstance = prevGroups[i];
      if (
        previousInstance.isSticky &&
        previousInstance.elementIndex < instance.elementIndex &&
        previousInstance.groupIndex < instance.groupIndex
      ) {
        this.renderer.setStyle(
          previousInstance.el.nativeElement,
          'visibility',
          'visible'
        );
        if (previousInstance.spacer) {
          this.renderer.setStyle(
            previousInstance.spacer,
            'visibility',
            'visible'
          );
        }
      }
    }
  }
  private hidePreviousStickyAndSpacerElements(instance: StickyInstance) {
    const prevGroups = this.getPreviousGroups(instance);
    for (let i = 0; i < prevGroups.length; i++) {
      const previousInstance = prevGroups[i];
      if (
        previousInstance.isSticky &&
        previousInstance.groupIndex === instance.groupIndex &&
        previousInstance.elementIndex < instance.elementIndex
      ) {
        this.renderer.setStyle(
          previousInstance.el.nativeElement,
          'visibility',
          'hidden'
        );
        if (previousInstance.spacer) {
          this.renderer.setStyle(
            previousInstance.spacer,
            'visibility',
            'hidden'
          );
        }
      }
    }
  }

  ngOnDestroy() {
    this.scrollFn(); // This will remove the listener
    this.resizeFn(); // This will remove the listener
  }
}
