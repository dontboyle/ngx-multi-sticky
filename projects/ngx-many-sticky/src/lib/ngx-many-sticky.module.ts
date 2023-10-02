import { NgModule } from '@angular/core';
import { NgxManyStickyDirective } from './ngx-many-sticky.directive';
export * from './ngx-many-sticky.classes';

const impExport = [NgxManyStickyDirective];

@NgModule({
  imports: [],
  declarations: [...impExport],
  exports: [...impExport],
})
export class NgxManyStickyModule {}
