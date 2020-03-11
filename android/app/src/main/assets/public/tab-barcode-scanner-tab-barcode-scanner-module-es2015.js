(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["tab-barcode-scanner-tab-barcode-scanner-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/tab-barcode-scanner/tab-barcode-scanner.page.html":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/tab-barcode-scanner/tab-barcode-scanner.page.html ***!
  \*********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-content>\r\n\r\n</ion-content>\r\n");

/***/ }),

/***/ "./src/app/tab-barcode-scanner/tab-barcode-scanner-routing.module.ts":
/*!***************************************************************************!*\
  !*** ./src/app/tab-barcode-scanner/tab-barcode-scanner-routing.module.ts ***!
  \***************************************************************************/
/*! exports provided: TabBarcodeScannerPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TabBarcodeScannerPageRoutingModule", function() { return TabBarcodeScannerPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _tab_barcode_scanner_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tab-barcode-scanner.page */ "./src/app/tab-barcode-scanner/tab-barcode-scanner.page.ts");




const routes = [
    {
        path: '',
        component: _tab_barcode_scanner_page__WEBPACK_IMPORTED_MODULE_3__["TabBarcodeScannerPage"]
    }
];
let TabBarcodeScannerPageRoutingModule = class TabBarcodeScannerPageRoutingModule {
};
TabBarcodeScannerPageRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], TabBarcodeScannerPageRoutingModule);



/***/ }),

/***/ "./src/app/tab-barcode-scanner/tab-barcode-scanner.module.ts":
/*!*******************************************************************!*\
  !*** ./src/app/tab-barcode-scanner/tab-barcode-scanner.module.ts ***!
  \*******************************************************************/
/*! exports provided: TabBarcodeScannerPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TabBarcodeScannerPageModule", function() { return TabBarcodeScannerPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm2015/ionic-angular.js");
/* harmony import */ var _tab_barcode_scanner_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./tab-barcode-scanner-routing.module */ "./src/app/tab-barcode-scanner/tab-barcode-scanner-routing.module.ts");
/* harmony import */ var _tab_barcode_scanner_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./tab-barcode-scanner.page */ "./src/app/tab-barcode-scanner/tab-barcode-scanner.page.ts");







let TabBarcodeScannerPageModule = class TabBarcodeScannerPageModule {
};
TabBarcodeScannerPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _tab_barcode_scanner_routing_module__WEBPACK_IMPORTED_MODULE_5__["TabBarcodeScannerPageRoutingModule"]
        ],
        declarations: [_tab_barcode_scanner_page__WEBPACK_IMPORTED_MODULE_6__["TabBarcodeScannerPage"]]
    })
], TabBarcodeScannerPageModule);



/***/ }),

/***/ "./src/app/tab-barcode-scanner/tab-barcode-scanner.page.scss":
/*!*******************************************************************!*\
  !*** ./src/app/tab-barcode-scanner/tab-barcode-scanner.page.scss ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3RhYi1iYXJjb2RlLXNjYW5uZXIvdGFiLWJhcmNvZGUtc2Nhbm5lci5wYWdlLnNjc3MifQ== */");

/***/ }),

/***/ "./src/app/tab-barcode-scanner/tab-barcode-scanner.page.ts":
/*!*****************************************************************!*\
  !*** ./src/app/tab-barcode-scanner/tab-barcode-scanner.page.ts ***!
  \*****************************************************************/
/*! exports provided: TabBarcodeScannerPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TabBarcodeScannerPage", function() { return TabBarcodeScannerPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let TabBarcodeScannerPage = class TabBarcodeScannerPage {
    constructor() { }
    ngOnInit() {
    }
};
TabBarcodeScannerPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-tab-barcode-scanner',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./tab-barcode-scanner.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/tab-barcode-scanner/tab-barcode-scanner.page.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./tab-barcode-scanner.page.scss */ "./src/app/tab-barcode-scanner/tab-barcode-scanner.page.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
], TabBarcodeScannerPage);



/***/ })

}]);
//# sourceMappingURL=tab-barcode-scanner-tab-barcode-scanner-module-es2015.js.map