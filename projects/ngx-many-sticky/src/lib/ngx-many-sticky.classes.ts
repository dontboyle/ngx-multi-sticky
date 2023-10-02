import { ElementRef, EventEmitter } from '@angular/core';

export class StickyAttributes {
  static selector = 'many-sticky';
  static groupIndex = 'groupIndex';
  static elementIndex = 'elementIndex';
}

export interface IOptions {
  // offset: number;
  // reverse: boolean;
  animation: boolean;
  animationSpeed: string;
  animationSpeedMs: number;
  animationClassIn: string;
  animationClassOut?: string;
}

export class Options implements IOptions {
  // offset!: number;
  // reverse!: boolean;
  animation!: boolean;
  animationSpeedMs!: number;
  animationClassIn!: string;
  animationClassOut!: string;

  constructor(props: Partial<IOptions>) {
    Object.assign(this, props);
  }

  get animationSpeed(): string {
    return `${this.animationSpeedMs / 1000}s`;
  }
}

export const defaultOptions = new Options({
  // offset: 0,
  // reverse: false,
  animation: true,
  //animationSpeed: '0.5s', //get from animationSpeed()
  animationSpeedMs: 500,
  animationClassIn: 'animation-slide-in-down',
  animationClassOut: undefined, //'animation-slide-in-up',
} as IOptions);

export class StickyInstance {
  //Directive props
  el!: ElementRef;
  spacer!: HTMLElement;
  groupIndex: number = 0;
  elementIndex: number = 0;
  options = defaultOptions;
  zIndex: number = 80;
  $stickyState = new EventEmitter<boolean>();
  debug: boolean = false;

  //Added for use in service
  //Service Props
  isSticky = false;
  offset!: number;

  constructor(props?: Partial<StickyInstance>) {
    Object.assign(this, props);
  }

  getDebugOptions() {
    let debugObj: any = {};
    debugObj.zIndex = this.zIndex;
    debugObj.isSticky = this.isSticky;
    debugObj.offset = this.offset;
    debugObj.groupIndex = this.groupIndex;
    debugObj.elementIndex = this.elementIndex;
    return debugObj;
  }
}

export class SrollHelper {
  static scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  static getElementInGroupIndex(groupIndex: number, elementIndex: number) {
    return document.querySelector<HTMLElement>(
      `[${StickyAttributes.selector}][${StickyAttributes.groupIndex}="${groupIndex}"][${StickyAttributes.elementIndex}="${elementIndex}"]`
    );
  }
  static getElementInGroup(groupIndex: number) {
    return document.querySelector<HTMLElement>(
      `[${StickyAttributes.selector}][${StickyAttributes.groupIndex}="${groupIndex}"]`
    );
  }
  static getElementsInGroup(groupIndex: number) {
    return document.querySelectorAll<HTMLElement>(
      `[${StickyAttributes.selector}][${StickyAttributes.groupIndex}="${groupIndex}"]`
    );
  }
  static getSpacerInGroup(groupIndex: number) {
    return this.getElementInGroup(groupIndex)?.previousElementSibling;
  }
  static getSpacerInGroupIndex(groupIndex: number, elementIndex: number) {
    return this.getElementInGroupIndex(groupIndex, elementIndex)
      ?.previousElementSibling;
  }
  static scrollTo(groupIndex: number, elementIndex: number) {
    let spacer = this.getSpacerInGroupIndex(groupIndex, elementIndex);
    if (spacer) {
      const rect = spacer.getBoundingClientRect();
      const scrollTop = window.scrollY;
      const top = rect.top + scrollTop + 1;
      window.scrollTo({ top: top, behavior: 'smooth' });
    } else {
      console.error(
        `Spacer not found for scrollTo(${groupIndex},${elementIndex})`,
        `[${StickyAttributes.selector}][${StickyAttributes.groupIndex}="${groupIndex}"][${StickyAttributes.elementIndex}="${elementIndex}"]`
      );
    }
  }

  static scrollToElement(eleRef: HTMLDivElement) {
    const rect = eleRef.getBoundingClientRect();
    const scrollTop = window.scrollY;
    const showEarlyPx = 1;
    const top = rect.top + scrollTop + showEarlyPx;
    window.scrollTo({ top: top, behavior: 'smooth' });
  }
}
