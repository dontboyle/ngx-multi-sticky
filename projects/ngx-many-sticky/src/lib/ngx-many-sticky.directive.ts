import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import {
  IOptions,
  StickyAttributes,
  StickyInstance,
} from './ngx-many-sticky.classes';
import { NgxManyStickyService } from './ngx-many-sticky.service';

@Directive({
  selector: `[${StickyAttributes.selector}]`,
  exportAs: `${StickyAttributes.selector}`,
})
export class NgxManyStickyDirective implements AfterViewInit, OnDestroy {
  private instance = new StickyInstance();
  @Input()
  set spacer(value: HTMLElement) {
    if (value !== this.instance.spacer) {
      this.instance.spacer = value;
    }
  }

  get spacer(): HTMLElement {
    return this.instance.spacer;
  }

  @Input()
  get groupIndex(): number {
    return this.instance.groupIndex;
  }

  set groupIndex(value: number) {
    if (value !== this.instance.groupIndex) {
      this.instance.groupIndex = value;
    }
  }

  @Input()
  get elementIndex(): number {
    return this.instance.elementIndex;
  }

  set elementIndex(value: number) {
    if (value !== this.instance.elementIndex) {
      this.instance.elementIndex = value;
    }
  }

  @Input()
  set options(value: IOptions | any) {
    if (value !== this.instance.options) {
      this.instance.options = Object.assign({}, this.instance.options, value);
    }
  }

  get options(): IOptions {
    return this.instance.options;
  }

  @Input()
  set zIndex(value: number) {
    if (value !== this.instance.zIndex) {
      this.instance.zIndex = value;
    }
  }

  get zIndex(): number {
    return this.instance.zIndex;
  }

  @Input()
  set debug(value: boolean) {
    if (value !== this.instance.debug) {
      this.instance.debug = value;
    }
  }

  get debug(): boolean {
    return this.instance.debug;
  }

  @Output()
  get $stickyState(): EventEmitter<boolean> {
    return this.instance.$stickyState;
  }

  set $stickyState(value: EventEmitter<boolean>) {
    if (value !== this.instance.$stickyState) {
      this.instance.$stickyState = value;
    }
  }

  constructor(private el: ElementRef, private service: NgxManyStickyService) {}
  ngAfterViewInit() {
    this.instance.el = this.el;
    this.service.add(this.instance);
  }

  ngOnDestroy() {
    this.service.remove(this.instance);
    this.service.reset();
  }
}
