import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductComponent } from './components/product/product.component';
import { ProductsComponent } from './components/products/products.component';
import { HighlightDirective } from './directives/highlight.directive';
import { ImageErrorDirective } from './directives/image-error.directive';
import { ReversePipe } from './pipes/reverse.pipe';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { VowelsByNumbersPipe } from './pipes/vowels-by-numbers.pipe';
import { ImgComponent } from './components/img/img.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SwiperModule } from 'swiper/angular';


@NgModule({
  declarations: [
    ImgComponent,
    ProductComponent,
    ProductsComponent,
    ReversePipe,
    TimeAgoPipe,
    VowelsByNumbersPipe,
    HighlightDirective,
    ImageErrorDirective,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SwiperModule,
    FormsModule
  ],
  // If we want that these components of this module can be used in other modules
  // we need to use 'exports', in this case we want to share all the components, directives and pipes
  exports: [
    ImgComponent,
    ProductComponent,
    ProductsComponent,
    ReversePipe,
    TimeAgoPipe,
    VowelsByNumbersPipe,
    HighlightDirective,
    ImageErrorDirective,
  ]
})
export class SharedModule { }
