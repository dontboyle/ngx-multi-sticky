# NgxMultiSticky

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.9.

# ngx-multi-sticky

Angular 15 based project for Multiple Sticky elements across components. Can Group sticky elements and auto hide elements if they are within the same group.

## Use Case:

        <div #stickySpacer0></div>
        <div
            sticky
            class="w-100"
            [groupIndex]="0"
            [elementIndex]="1"
            [spacer]="stickySpacer0"
            [options]="{
                animationSpeed: '0.1s',
            }"
            [debug]="true"
            #sticky0
        >
            <div>I will replace 0,0 because i'm in the same group, even if it lives on another component</div>
            <div [hidden]="sticky2['isSticky']">hide Content based on sticky 2 activation</div>
            <div [ngClass]="{ isSticky: sticky0['isSticky'] }">custom class on sticky 2 activation</div>
        </div>

        <div #stickySpacer2></div>
        <div
            sticky
            class="w-100"
            [groupIndex]="0"
            [elementIndex]="2"
            [spacer]="stickySpacer2"
            [options]="{
                animationSpeed: '0.1s',
            }"
            #sticky2
            [debug]="true"
        >
            <div>I will replace 0,1 because i'm in the same group</div>
        </div>


        <div #stickySpacer3></div>
        <div
            sticky
            class="w-100"
            [groupIndex]="1"
            [elementIndex]="0"
            [spacer]="stickySpacer3"
            [options]="{
                animationSpeed: '0.1s',
            }"
            #sticky3
            [debug]="true"
        >
            <div>I will not replace 0,2 but sticky to bottom of because i'm in a different group</div>
        </div>

        <div>
            <div>Debug & Nav to Tests</div>
            <div>
                <div>sticky0 {{ sticky0['debug'] | json }}</div>
                <div>sticky2 {{ sticky2['debug'] | json }}</div>
                <div>sticky3 {{ sticky3['debug'] | json }}</div>
            </div>
            <div>
                <div>
                    <button type="button" class="btn btn-primary" (click)="srollHelper.scrollTo(0, 0)">
                        scrollTo(0, 0)
                    </button>
                    <button type="button" class="btn btn-warning" (click)="srollHelper.scrollTo(0, 1)">
                        scrollTo(0, 1)
                    </button>
                    <button type="button" class="btn btn-warning" (click)="srollHelper.scrollTo(0, 2)">
                        scrollTo(0, 2)
                    </button>
                    <button type="button" class="btn btn-warning" (click)="srollHelper.scrollTo(1, 0)">
                        scrollTo(1, 0)
                    </button>
                </div>
            </div>
        </div>
        <div style="height: 20000px">i make us scroll</div>

## Animation based on css:

          .animation {
              animation-duration: 1s;
              animation-fill-mode: both;
          }

          @keyframes animationSlideInDown {
              from {
              transform: translate3d(0, -100%, 0);
              visibility: visible;
              }
              to {
              transform: translate3d(0, 0, 0);
              }
          }
          .animation-slide-in-down {
              animation-name: animationSlideInDown;
          }

          @keyframes animationSlideInUp {
              from {
              transform: translate3d(0, 100%, 0);
              visibility: visible;
              }
              to {
              transform: translate3d(0, 0, 0);
              }
          }
          .animation-slide-in-up {
              animation-name: animationSlideInUp;
          }

          @keyframes animationFadeIn {
              from {
              opacity: 0;
              }
              to {
              opacity: 1;
              }
          }
          .animation-fade-in {
              animation-name: animationFadeIn;
          }

          @keyframes animationFadeOut {
              from {
              opacity: 1;
              }
              to {
              opacity: 0;
              }
          }
          .animation-fade-out {
              animation-name: animationFadeOut;
          }

          .animation-blink {
              animation: animationBlink 1s steps(5, start) infinite;
          }

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
