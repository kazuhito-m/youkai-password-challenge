(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[25],{

/***/ 656:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _src_components_VGrid_grid_sass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(211);
/* harmony import */ var _src_components_VGrid_grid_sass__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_src_components_VGrid_grid_sass__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(212);


/* harmony default export */ __webpack_exports__["a"] = (Object(_grid__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])('layout'));

/***/ }),

/***/ 750:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/tech/_slug.vue?vue&type=template&id=13ae11f3&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-layout',[_c('v-container',[_c('v-row',{attrs:{"justify":"center","align":"center"}},[_c('v-col',{attrs:{"cols":"12","sm":"8","md":"8"}},[_c('v-card',[_c('v-card-title',{staticClass:"headline"},[_vm._v("\n            "+_vm._s(_vm.article.title)+"\n          ")]),_vm._v(" "),_c('v-card-subtitle',{staticStyle:{"cursor":"pointer"},on:{"click":function($event){return _vm.$router.push('/doc')}}},[_vm._v("\n            記事一覧へ\n          ")]),_vm._v(" "),_c('v-card-text',[_c('nuxt-content',{attrs:{"document":_vm.article}})],1)],1)],1)],1)],1)],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/pages/tech/_slug.vue?vue&type=template&id=13ae11f3&

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__(22);

// EXTERNAL MODULE: ./node_modules/regenerator-runtime/runtime.js
var runtime = __webpack_require__(67);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--13-0!./node_modules/ts-loader??ref--13-1!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/tech/_slug.vue?vue&type=script&lang=ts&


/* harmony default export */ var _slugvue_type_script_lang_ts_ = ({
  asyncData: function asyncData(_ref) {
    return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var $content, params, article;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              $content = _ref.$content, params = _ref.params;
              _context.next = 3;
              return $content('tech', params.slug).fetch();

            case 3:
              article = _context.sent;
              return _context.abrupt("return", {
                article: article
              });

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  }
});
// CONCATENATED MODULE: ./src/pages/tech/_slug.vue?vue&type=script&lang=ts&
 /* harmony default export */ var tech_slugvue_type_script_lang_ts_ = (_slugvue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(65);

// EXTERNAL MODULE: ./node_modules/vuetify-loader/lib/runtime/installComponents.js
var installComponents = __webpack_require__(103);
var installComponents_default = /*#__PURE__*/__webpack_require__.n(installComponents);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VCard/VCard.js
var VCard = __webpack_require__(683);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VCard/index.js
var components_VCard = __webpack_require__(646);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VGrid/VCol.js
var VCol = __webpack_require__(741);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VGrid/VContainer.js
var VContainer = __webpack_require__(640);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VGrid/VLayout.js
var VLayout = __webpack_require__(656);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VGrid/VRow.js
var VRow = __webpack_require__(742);

// CONCATENATED MODULE: ./src/pages/tech/_slug.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  tech_slugvue_type_script_lang_ts_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var _slug = __webpack_exports__["default"] = (component.exports);

/* vuetify-loader */









installComponents_default()(component, {VCard: VCard["a" /* default */],VCardSubtitle: components_VCard["b" /* VCardSubtitle */],VCardText: components_VCard["c" /* VCardText */],VCardTitle: components_VCard["d" /* VCardTitle */],VCol: VCol["a" /* default */],VContainer: VContainer["a" /* default */],VLayout: VLayout["a" /* default */],VRow: VRow["a" /* default */]})


/***/ })

}]);