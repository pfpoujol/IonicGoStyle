(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["tab-list-promos-tab-list-promos-module"],{

/***/ "./node_modules/@ionic-native/clipboard/ngx/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/@ionic-native/clipboard/ngx/index.js ***!
  \***********************************************************/
/*! exports provided: Clipboard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Clipboard", function() { return Clipboard; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _ionic_native_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic-native/core */ "./node_modules/@ionic-native/core/index.js");



var Clipboard = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(Clipboard, _super);
    function Clipboard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Clipboard.prototype.copy = function (text) { return Object(_ionic_native_core__WEBPACK_IMPORTED_MODULE_2__["cordova"])(this, "copy", {}, arguments); };
    Clipboard.prototype.paste = function () { return Object(_ionic_native_core__WEBPACK_IMPORTED_MODULE_2__["cordova"])(this, "paste", {}, arguments); };
    Clipboard.prototype.clear = function () { return Object(_ionic_native_core__WEBPACK_IMPORTED_MODULE_2__["cordova"])(this, "clear", {}, arguments); };
    Clipboard.pluginName = "Clipboard";
    Clipboard.plugin = "cordova-clipboard";
    Clipboard.pluginRef = "cordova.plugins.clipboard";
    Clipboard.repo = "https://github.com/ihadeed/cordova-clipboard";
    Clipboard.platforms = ["Android", "iOS", "Windows Phone 8"];
    Clipboard = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
    ], Clipboard);
    return Clipboard;
}(_ionic_native_core__WEBPACK_IMPORTED_MODULE_2__["IonicNativePlugin"]));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvQGlvbmljLW5hdGl2ZS9wbHVnaW5zL2NsaXBib2FyZC9uZ3gvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyw4QkFBc0MsTUFBTSxvQkFBb0IsQ0FBQzs7SUFzQ3pDLDZCQUFpQjs7OztJQU85Qyx3QkFBSSxhQUFDLElBQVk7SUFTakIseUJBQUs7SUFTTCx5QkFBSzs7Ozs7O0lBekJNLFNBQVM7UUFEckIsVUFBVSxFQUFFO09BQ0EsU0FBUztvQkF2Q3RCO0VBdUMrQixpQkFBaUI7U0FBbkMsU0FBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvcmRvdmEsIElvbmljTmF0aXZlUGx1Z2luLCBQbHVnaW4gfSBmcm9tICdAaW9uaWMtbmF0aXZlL2NvcmUnO1xuLyoqXG4gKiBAbmFtZSBDbGlwYm9hcmRcbiAqIEBkZXNjcmlwdGlvblxuICogQ2xpcGJvYXJkIG1hbmFnZW1lbnQgcGx1Z2luIGZvciBDb3Jkb3ZhIHRoYXQgc3VwcG9ydHMgaU9TLCBBbmRyb2lkLCBhbmQgV2luZG93cyBQaG9uZSA4LlxuICpcbiAqXG4gKiBAdXNhZ2VcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGltcG9ydCB7IENsaXBib2FyZCB9IGZyb20gJ0Bpb25pYy1uYXRpdmUvY2xpcGJvYXJkL25neCc7XG4gKlxuICogY29uc3RydWN0b3IocHJpdmF0ZSBjbGlwYm9hcmQ6IENsaXBib2FyZCkgeyB9XG4gKlxuICogLi4uXG4gKlxuICpcbiAqIHRoaXMuY2xpcGJvYXJkLmNvcHkoJ0hlbGxvIHdvcmxkJyk7XG4gKlxuICogdGhpcy5jbGlwYm9hcmQucGFzdGUoKS50aGVuKFxuICogICAgKHJlc29sdmU6IHN0cmluZykgPT4ge1xuICogICAgICAgYWxlcnQocmVzb2x2ZSk7XG4gKiAgICAgfSxcbiAqICAgICAocmVqZWN0OiBzdHJpbmcpID0+IHtcbiAqICAgICAgIGFsZXJ0KCdFcnJvcjogJyArIHJlamVjdCk7XG4gKiAgICAgfVxuICogICApO1xuICpcbiAqIHRoaXMuY2xpcGJvYXJkLmNsZWFyKCk7XG4gKiBgYGBcbiAqL1xuQFBsdWdpbih7XG4gIHBsdWdpbk5hbWU6ICdDbGlwYm9hcmQnLFxuICBwbHVnaW46ICdjb3Jkb3ZhLWNsaXBib2FyZCcsXG4gIHBsdWdpblJlZjogJ2NvcmRvdmEucGx1Z2lucy5jbGlwYm9hcmQnLFxuICByZXBvOiAnaHR0cHM6Ly9naXRodWIuY29tL2loYWRlZWQvY29yZG92YS1jbGlwYm9hcmQnLFxuICBwbGF0Zm9ybXM6IFsnQW5kcm9pZCcsICdpT1MnLCAnV2luZG93cyBQaG9uZSA4J11cbn0pXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ2xpcGJvYXJkIGV4dGVuZHMgSW9uaWNOYXRpdmVQbHVnaW4ge1xuICAvKipcbiAgICogQ29waWVzIHRoZSBnaXZlbiB0ZXh0XG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0IFRleHQgdGhhdCBnZXRzIGNvcGllZCBvbiB0aGUgc3lzdGVtIGNsaXBib2FyZFxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fSBSZXR1cm5zIGEgcHJvbWlzZSBhZnRlciB0aGUgdGV4dCBoYXMgYmVlbiBjb3BpZWRcbiAgICovXG4gIEBDb3Jkb3ZhKClcbiAgY29weSh0ZXh0OiBzdHJpbmcpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8qKlxuICAgKiBQYXN0ZXMgdGhlIHRleHQgc3RvcmVkIGluIGNsaXBib2FyZFxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fSBSZXR1cm5zIGEgcHJvbWlzZSBhZnRlciB0aGUgdGV4dCBoYXMgYmVlbiBwYXN0ZWRcbiAgICovXG4gIEBDb3Jkb3ZhKClcbiAgcGFzdGUoKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXIgdGhlIHRleHQgc3RvcmVkIGluIGNsaXBib2FyZFxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fSBSZXR1cm5zIGEgcHJvbWlzZSBhZnRlciB0aGUgdGV4dCBoYXMgYmVlbiBjbGVhbmVkXG4gICAqL1xuICBAQ29yZG92YSgpXG4gIGNsZWFyKCk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuO1xuICB9XG59XG4iXX0=

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/tab-list-promos/tab-list-promos.page.html":
/*!*************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/tab-list-promos/tab-list-promos.page.html ***!
  \*************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\r\n  <ion-toolbar color=\"primary\">\r\n    <ion-buttons slot=\"end\">\r\n      <ion-button color=\"light\" (click)=\"logout()\">\r\n        <ion-icon name=\"log-out-outline\" slot=\"icon-only\"></ion-icon>\r\n      </ion-button>\r\n    </ion-buttons>\r\n    <ion-title>Promotion de Pierre-Florent Poujol</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content>\r\n<!-- List des codes promo d'un utisateur -->\r\n<ion-list>\r\n  <ion-item-sliding  *ngFor=\"let promo of promos\">\r\n  <ion-item>\r\n    <ion-label>\r\n      <h2>{{ promo.description }}</h2>\r\n      <p>{{ promo.code }}\r\n        <br>Date limite : {{ promo.dateExpiration | date: 'dd/MM/yyyy' }}</p>\r\n    </ion-label>\r\n    <ion-icon name=\"swap-horizontal-outline\"></ion-icon>\r\n  </ion-item>  \r\n<ion-item-options side=\"end\">\r\n     <ion-item-option >Unread</ion-item-option>\r\n    <ion-item-option (click)=\"copyText()\"> <ion-icon name=\"copy-outline\"></ion-icon></ion-item-option>\r\n  </ion-item-options>\r\n</ion-item-sliding>\r\n</ion-list>\r\n<p>Enter text then click copy<br>\r\n  <ion-textarea [(ngModel)]=\"CopyTextAreaText\"></ion-textarea>\r\n  <ion-button color=\"primary\" (click)=\"copyText()\">Copy Text</ion-button>\r\n  </p>\r\n\r\n<p>Paste text<br>\r\n  <ion-textarea [(ngModel)]=\"PasteTextAreaText\"></ion-textarea>\r\n  <ion-button color=\"primary\" (click)=\"pasteText()\">Paste Here</ion-button>\r\n  <ion-button color=\"primary\" (click)=\"clearClipboard()\">Clear Clipboard</ion-button>\r\n</p>\r\n</ion-content>\r\n");

/***/ }),

/***/ "./src/app/tab-list-promos/tab-list-promos-routing.module.ts":
/*!*******************************************************************!*\
  !*** ./src/app/tab-list-promos/tab-list-promos-routing.module.ts ***!
  \*******************************************************************/
/*! exports provided: TabListPromosPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TabListPromosPageRoutingModule", function() { return TabListPromosPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _tab_list_promos_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tab-list-promos.page */ "./src/app/tab-list-promos/tab-list-promos.page.ts");




const routes = [
    {
        path: '',
        component: _tab_list_promos_page__WEBPACK_IMPORTED_MODULE_3__["TabListPromosPage"]
    },
];
let TabListPromosPageRoutingModule = class TabListPromosPageRoutingModule {
};
TabListPromosPageRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], TabListPromosPageRoutingModule);



/***/ }),

/***/ "./src/app/tab-list-promos/tab-list-promos.module.ts":
/*!***********************************************************!*\
  !*** ./src/app/tab-list-promos/tab-list-promos.module.ts ***!
  \***********************************************************/
/*! exports provided: TabListPromosPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TabListPromosPageModule", function() { return TabListPromosPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm2015/ionic-angular.js");
/* harmony import */ var _tab_list_promos_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./tab-list-promos-routing.module */ "./src/app/tab-list-promos/tab-list-promos-routing.module.ts");
/* harmony import */ var _ionic_native_clipboard_ngx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic-native/clipboard/ngx */ "./node_modules/@ionic-native/clipboard/ngx/index.js");
/* harmony import */ var _tab_list_promos_page__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./tab-list-promos.page */ "./src/app/tab-list-promos/tab-list-promos.page.ts");








let TabListPromosPageModule = class TabListPromosPageModule {
};
TabListPromosPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _tab_list_promos_routing_module__WEBPACK_IMPORTED_MODULE_5__["TabListPromosPageRoutingModule"]
        ],
        providers: [
            _ionic_native_clipboard_ngx__WEBPACK_IMPORTED_MODULE_6__["Clipboard"]
        ],
        declarations: [_tab_list_promos_page__WEBPACK_IMPORTED_MODULE_7__["TabListPromosPage"]]
    })
], TabListPromosPageModule);



/***/ }),

/***/ "./src/app/tab-list-promos/tab-list-promos.page.scss":
/*!***********************************************************!*\
  !*** ./src/app/tab-list-promos/tab-list-promos.page.scss ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3RhYi1saXN0LXByb21vcy90YWItbGlzdC1wcm9tb3MucGFnZS5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/tab-list-promos/tab-list-promos.page.ts":
/*!*********************************************************!*\
  !*** ./src/app/tab-list-promos/tab-list-promos.page.ts ***!
  \*********************************************************/
/*! exports provided: TabListPromosPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TabListPromosPage", function() { return TabListPromosPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/auth.service */ "./src/app/services/auth.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_native_clipboard_ngx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic-native/clipboard/ngx */ "./node_modules/@ionic-native/clipboard/ngx/index.js");





let TabListPromosPage = class TabListPromosPage {
    constructor(authService, router, clipboard) {
        this.authService = authService;
        this.router = router;
        this.clipboard = clipboard;
        this.promos = [
            {
                code: 'SUPER50',
                dateExpiration: new Date(2020, 3, 9),
                description: '30% de réduction sur Sneakers Adidas'
            },
            {
                code: 'KADO20',
                dateExpiration: new Date(2020, 3, 7),
                description: '20% de réduction sur Jean Levi\'s'
            },
            {
                code: 'zbu',
                dateExpiration: new Date(2020, 4, 1),
                description: 'blablalbal'
            },
            {
                code: 'zbu',
                dateExpiration: new Date(2020, 4, 1),
                description: 'blablalbal'
            },
            {
                code: 'zbu',
                dateExpiration: new Date(2020, 4, 1),
                description: 'blablalbal'
            }
        ];
        this.CopyTextAreaText = 'Sample text to copy!';
        this.PasteTextAreaText = 'Paste here!';
    }
    ngOnInit() {
    }
    logout() {
        this.authService.doLogout();
        this.router.navigate(['login']);
    }
    // Copy Event
    copyText() {
        this.clipboard.copy(this.CopyTextAreaText);
    }
    // Paste Event
    pasteText() {
        this.clipboard.paste().then((resolve) => {
            this.PasteTextAreaText = resolve;
            console.log(resolve);
        }, (reject) => {
            console.error('Error: ' + reject);
        });
    }
    // Clear Event
    clearClipboard() {
        this.clipboard.clear();
    }
};
TabListPromosPage.ctorParameters = () => [
    { type: _services_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
    { type: _ionic_native_clipboard_ngx__WEBPACK_IMPORTED_MODULE_4__["Clipboard"] }
];
TabListPromosPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-tab-list-promos',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./tab-list-promos.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/tab-list-promos/tab-list-promos.page.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./tab-list-promos.page.scss */ "./src/app/tab-list-promos/tab-list-promos.page.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"], _ionic_native_clipboard_ngx__WEBPACK_IMPORTED_MODULE_4__["Clipboard"]])
], TabListPromosPage);



/***/ })

}]);
//# sourceMappingURL=tab-list-promos-tab-list-promos-module-es2015.js.map