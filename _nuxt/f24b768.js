(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[10],{

/***/ 705:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/foundpasswordsearch/FoundPasswordSearchResult.vue?vue&type=template&id=1dae413e&scoped=true&lang=html&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-card',{staticClass:"mx-auto",attrs:{"width":"1200"}},[_c('v-form',{ref:"form"},[_c('v-container',[_c('v-row',{attrs:{"dense":"","no-gutters":""}},[_c('v-col',{attrs:{"cols":"12","sm":"12","md":"12"}},[_c('v-card-actions',[_vm._v("\n            検索条件: "+_vm._s(_vm.searchedConditionCaption)+"\n            "),_c('v-spacer'),_vm._v(" "),(_vm.enableDownloadFileButton)?_c('v-btn',{attrs:{"disabled":_vm.fileDownloaded,"elevation":"2","small":"","outlined":"","color":"success"},on:{"click":_vm.onClickDownLoadFileButton}},[_vm._v("\n              ファイルDL\n            ")]):_vm._e(),_vm._v(" "),_c('v-spacer'),_vm._v("\n            "+_vm._s(_vm.fullCountCaption)+"\n          ")],1)],1)],1),_vm._v(" "),(_vm.enableAllMissMatchPart)?_c('v-row',{attrs:{"dense":"","no-gutters":""}},[_c('v-col',{attrs:{"cols":"12","sm":"12","md":"12"}},[_c('v-card-actions',[_c('strong',[_vm._v("”ハズレ”")]),_vm._v("が確認できたらご協力お願いします。\n            "),_c('v-spacer'),_vm._v(" "),_c('v-btn',{attrs:{"disabled":!_vm.enableSendAllMissMatchPasswordButton,"elevation":"2","small":"","outlined":"","color":"deep-orange"},on:{"click":_vm.onClickSendAllMissMatchPassword}},[_vm._v("\n              全部\"ハズレ\"として報告\n            ")])],1)],1)],1):_vm._e(),_vm._v(" "),_c('v-row',[_c('v-col',{attrs:{"cols":"12","sm":"12","md":"12"}},[_c('v-simple-table',{ref:"resultList",attrs:{"dense":"","height":"672px","fixed-header":""},on:{"scroll":function($event){return _vm.alert('test')}},scopedSlots:_vm._u([{key:"default",fn:function(){return [_c('thead',[_c('tr',[_c('th',{staticClass:"text-left"},[_vm._v("\n                  No.\n                  ")]),_vm._v(" "),_c('th',{staticClass:"text-left"},[_vm._v("\n                  パスワード\n                  ")])])]),_vm._v(" "),_c('tbody',[_vm._l((_vm.passwords),function(password){return _c('tr',{key:password.no},[_c('td',[_vm._v(_vm._s(password.no))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(password.password))])])}),_vm._v(" "),(_vm.hasReadYetPasswords)?_c('tr',[_c('td',{attrs:{"colspan":"2"}},[(_vm.hasReadYetPasswords)?_c('infinite-loading',{ref:"infiniteLoading",attrs:{"spinner":"spiral"},on:{"infinite":_vm.infiniteHandler}},[_c('div',{attrs:{"slot":"no-results"},slot:"no-results"})]):_vm._e()],1)]):_vm._e()],2)]},proxy:true}])})],1)],1)],1)],1),_vm._v(" "),_c('v-snackbar',{attrs:{"outlined":"","multi-line":"","color":_vm.snackBarColor},scopedSlots:_vm._u([{key:"action",fn:function(ref){
var attrs = ref.attrs;
return [_c('v-btn',_vm._b({attrs:{"color":"blue","text":""},on:{"click":function($event){_vm.invalidate = false}}},'v-btn',attrs,false),[_vm._v("\n        Close\n      ")])]}}]),model:{value:(_vm.invalidate),callback:function ($$v) {_vm.invalidate=$$v},expression:"invalidate"}},[_vm._v("\n    "+_vm._s(_vm.invalidateMessage)+"\n    ")]),_vm._v(" "),_c('v-overlay',{attrs:{"value":_vm.nowSearching,"absolute":""}},[_c('v-progress-circular',{attrs:{"indeterminate":"","color":"green"}}),_vm._v("\n    Now Serching...\n  ")],1)],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/foundpasswordsearch/FoundPasswordSearchResult.vue?vue&type=template&id=1dae413e&scoped=true&lang=html&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.reflect.construct.js
var es_reflect_construct = __webpack_require__(58);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__(22);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js
var classCallCheck = __webpack_require__(4);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/createClass.js
var createClass = __webpack_require__(7);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/inherits.js + 1 modules
var inherits = __webpack_require__(31);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js + 1 modules
var possibleConstructorReturn = __webpack_require__(25);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js
var getPrototypeOf = __webpack_require__(12);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/typeof.js
var esm_typeof = __webpack_require__(11);

// EXTERNAL MODULE: ./node_modules/regenerator-runtime/runtime.js
var runtime = __webpack_require__(67);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.get-own-property-descriptor.js
var es_object_get_own_property_descriptor = __webpack_require__(15);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.concat.js
var es_array_concat = __webpack_require__(33);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.map.js
var es_array_map = __webpack_require__(49);

// EXTERNAL MODULE: ./node_modules/vue-property-decorator/lib/index.js + 14 modules
var lib = __webpack_require__(132);

// EXTERNAL MODULE: ./node_modules/nuxt-property-decorator/lib/nuxt-property-decorator.umd.js
var nuxt_property_decorator_umd = __webpack_require__(51);

// EXTERNAL MODULE: ./node_modules/vue-infinite-loading/dist/vue-infinite-loading.js
var vue_infinite_loading = __webpack_require__(701);
var vue_infinite_loading_default = /*#__PURE__*/__webpack_require__.n(vue_infinite_loading);

// EXTERNAL MODULE: ./src/store/FoundConditionSearchStatus.ts + 1 modules
var FoundConditionSearchStatus = __webpack_require__(172);

// EXTERNAL MODULE: ./src/store/index.ts + 1 modules
var store = __webpack_require__(166);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--13-0!./node_modules/ts-loader??ref--13-1!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/foundpasswordsearch/FoundPasswordSearchResult.vue?vue&type=script&lang=ts&










function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = Object(getPrototypeOf["a" /* default */])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = Object(getPrototypeOf["a" /* default */])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return Object(possibleConstructorReturn["a" /* default */])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }





var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : Object(esm_typeof["a" /* default */])(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var FoundPasswordSearchResultvue_type_script_lang_ts_FoundPasswordSearchResult = /*#__PURE__*/function (_Vue) {
  Object(inherits["a" /* default */])(FoundPasswordSearchResult, _Vue);

  var _super = _createSuper(FoundPasswordSearchResult);

  function FoundPasswordSearchResult() {
    var _this;

    Object(classCallCheck["a" /* default */])(this, FoundPasswordSearchResult);

    _this = _super.apply(this, arguments);
    _this.invalidate = false;
    _this.invalidateMessage = '';
    _this.snackBarColor = '';
    _this.fileDownloaded = false;
    _this.missMatchPasswordSent = false;
    _this.scrolledPasswordsAllEnd = false;
    return _this;
  }

  Object(createClass["a" /* default */])(FoundPasswordSearchResult, [{
    key: "passwords",
    get: function get() {
      return store["FoundConditionSearchStatusStore"].nowPasswords;
    }
  }, {
    key: "fullCount",
    get: function get() {
      return store["FoundConditionSearchStatusStore"].nowSearchedFullCount;
    }
  }, {
    key: "searchedDateTime",
    get: function get() {
      return store["FoundConditionSearchStatusStore"].nowSearchedDateTime;
    }
  }, {
    key: "raiseError",
    get: function get() {
      return store["FoundConditionSearchStatusStore"].nowSearchedError;
    }
  }, {
    key: "nowSearching",
    get: function get() {
      return store["FoundConditionSearchStatusStore"].nowSearching;
    }
  }, {
    key: "enableDownloadFileButton",
    get: function get() {
      return this.passwords.length > 0;
    }
  }, {
    key: "enableAllMissMatchPart",
    get: function get() {
      var count = this.fullCount;
      return count > 0 && count <= 200;
    }
  }, {
    key: "enableSendAllMissMatchPasswordButton",
    get: function get() {
      return this.scrolledPasswordsAllEnd && !this.missMatchPasswordSent && this.passwords.length >= this.fullCount;
    }
  }, {
    key: "searchedConditionCaption",
    get: function get() {
      if (store["FoundConditionSearchStatusStore"].nowSearchedCondition === null) return '';
      var condition = store["FoundConditionSearchStatusStore"].nowSearchedCondition;
      var order = condition.reverse ? '(逆順)' : '';
      return "\"".concat(condition.query, "\" ").concat(order);
    }
  }, {
    key: "fullCountCaption",
    get: function get() {
      if (store["FoundConditionSearchStatusStore"].nowSearchedCondition === null) return '';
      var count = this.fullCount.toLocaleString();
      return "\u5F15\u3063\u304B\u304B\u3063\u305F\u7DCF\u4EF6\u6570 : ".concat(count, " \u4EF6");
    }
  }, {
    key: "passwordTableDiv",
    get: function get() {
      // FIXME だいぶ「構造を知っている」ので、もうちょっと抽象的にしたい。
      var resultList = this.$refs.resultList;
      return resultList.$el.getElementsByTagName('div')[0];
    }
  }, {
    key: "onChangeSearchedDateTime",
    value: function onChangeSearchedDateTime() {
      var limitCount = FoundConditionSearchStatus["default"].VIEW_LIMIT_COUNT;
      if (this.fullCount > limitCount) this.showWarn("".concat(limitCount.toLocaleString(), "\u4EF6\u4EE5\u4E0A\u306F\u8868\u793A\u3067\u304D\u307E\u305B\u3093\u3002"));
      this.fileDownloaded = false;
      this.missMatchPasswordSent = false;
      this.scrolledPasswordsAllEnd = false;
      this.passwordTableDiv.scrollTop = 0;
      this.onScrollPasswordTableDiv();
    }
  }, {
    key: "onChangeRaiseError",
    value: function onChangeRaiseError() {
      if (!this.raiseError) return;
      this.showError('通信エラーが発生しました。データが取得できません。');
    }
  }, {
    key: "hasReadYetPasswords",
    get: function get() {
      return store["FoundConditionSearchStatusStore"].hasReadYetPasswords;
    }
  }, {
    key: "infiniteHandler",
    value: function () {
      var _infiniteHandler = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var infiniteLoading;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (this.hasReadYetPasswords) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return");

              case 2:
                _context.next = 4;
                return store["FoundConditionSearchStatusStore"].searchRemainPasswordsAsync();

              case 4:
                infiniteLoading = this.$refs.infiniteLoading;

                if (infiniteLoading) {
                  _context.next = 7;
                  break;
                }

                return _context.abrupt("return");

              case 7:
                infiniteLoading.stateChanger.loaded();

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function infiniteHandler() {
        return _infiniteHandler.apply(this, arguments);
      }

      return infiniteHandler;
    }()
  }, {
    key: "mounted",
    value: function mounted() {
      var div = this.passwordTableDiv;
      div.addEventListener('scroll', this.onScrollPasswordTableDiv, false);
    }
  }, {
    key: "onScrollPasswordTableDiv",
    value: function onScrollPasswordTableDiv() {
      if (!this.enableAllMissMatchPart) return;
      var div = this.passwordTableDiv;
      if (div.scrollHeight - Math.round(div.scrollTop) !== div.clientHeight) return;
      this.scrolledPasswordsAllEnd = true;
    }
  }, {
    key: "onClickDownLoadFileButton",
    value: function onClickDownLoadFileButton() {
      this.fileDownloaded = true;
      this.trackClickEvent("FoundPasswordSearchResult", "onClickDownLoadFileButton");
      var nowCondition = store["FoundConditionSearchStatusStore"].nowSearchedCondition;
      if (!nowCondition) return;
      var service = this.foundPasswordService;
      var download = service.downloadFileOf(nowCondition, this.passwords[0].password);
      this.downloadByUrl(download.downloadUrl);
    }
  }, {
    key: "downloadByUrl",
    value: function downloadByUrl(url) {
      var link = document.createElement('a');
      link.href = url;
      link.target = "_blank";
      link.click();
    }
  }, {
    key: "onClickSendAllMissMatchPassword",
    value: function () {
      var _onClickSendAllMissMatchPassword = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var service, target, result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.missMatchPasswordSent = true;
                this.trackClickEvent("FoundPasswordSearchResult", "onClickSendAllMissMatchPassword");
                service = this.hazurePasswordService;
                target = this.passwords.map(function (i) {
                  return i.password;
                });
                _context2.next = 6;
                return service.register(target);

              case 6:
                result = _context2.sent;

                if (result) {
                  _context2.next = 11;
                  break;
                }

                this.showError('通信エラーが発生しました。ハズレパスワードの登録に失敗しました。');
                this.missMatchPasswordSent = false;
                return _context2.abrupt("return");

              case 11:
                this.showInfomation("".concat(this.fullCount, "\u4EF6\u306E\u30D1\u30B9\u30EF\u30FC\u30C9\u3092\u201D\u30CF\u30BA\u30EC\u201D\u5831\u544A\u3057\u307E\u3057\u305F\u3002\u3042\u308A\u304C\u3068\u3046\u3054\u3056\u3044\u307E\u3059\u3002"));
                this.missMatchPasswordSent = true;

              case 13:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function onClickSendAllMissMatchPassword() {
        return _onClickSendAllMissMatchPassword.apply(this, arguments);
      }

      return onClickSendAllMissMatchPassword;
    }()
  }, {
    key: "showError",
    value: function showError(message) {
      this.snackBarColor = 'red';
      this.showSnackBar(message);
    }
  }, {
    key: "showWarn",
    value: function showWarn(message) {
      this.snackBarColor = 'secondary';
      this.showSnackBar(message);
    }
  }, {
    key: "showInfomation",
    value: function showInfomation(message) {
      this.snackBarColor = 'success';
      this.showSnackBar(message);
    }
  }, {
    key: "showSnackBar",
    value: function showSnackBar(message) {
      this.invalidateMessage = message;
      this.invalidate = true;
    }
  }, {
    key: "trackClickEvent",
    value: function trackClickEvent(action, label) {
      this.$gtag('event', 'click', {
        'event_category': action,
        'event_label': label,
        'value': 1
      });
    }
  }]);

  return FoundPasswordSearchResult;
}(lib["Vue"]);

__decorate([Object(lib["Inject"])()], FoundPasswordSearchResultvue_type_script_lang_ts_FoundPasswordSearchResult.prototype, "foundPasswordService", void 0);

__decorate([Object(lib["Inject"])()], FoundPasswordSearchResultvue_type_script_lang_ts_FoundPasswordSearchResult.prototype, "hazurePasswordService", void 0);

__decorate([Object(nuxt_property_decorator_umd["Watch"])('searchedDateTime')], FoundPasswordSearchResultvue_type_script_lang_ts_FoundPasswordSearchResult.prototype, "onChangeSearchedDateTime", null);

__decorate([Object(nuxt_property_decorator_umd["Watch"])('raiseError')], FoundPasswordSearchResultvue_type_script_lang_ts_FoundPasswordSearchResult.prototype, "onChangeRaiseError", null);

FoundPasswordSearchResultvue_type_script_lang_ts_FoundPasswordSearchResult = __decorate([Object(lib["Component"])({
  components: {
    InfiniteLoading: vue_infinite_loading_default.a
  }
})], FoundPasswordSearchResultvue_type_script_lang_ts_FoundPasswordSearchResult);
/* harmony default export */ var FoundPasswordSearchResultvue_type_script_lang_ts_ = (FoundPasswordSearchResultvue_type_script_lang_ts_FoundPasswordSearchResult);
// CONCATENATED MODULE: ./src/components/foundpasswordsearch/FoundPasswordSearchResult.vue?vue&type=script&lang=ts&
 /* harmony default export */ var foundpasswordsearch_FoundPasswordSearchResultvue_type_script_lang_ts_ = (FoundPasswordSearchResultvue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(65);

// EXTERNAL MODULE: ./node_modules/vuetify-loader/lib/runtime/installComponents.js
var installComponents = __webpack_require__(103);
var installComponents_default = /*#__PURE__*/__webpack_require__.n(installComponents);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VBtn/VBtn.js
var VBtn = __webpack_require__(670);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VCard/VCard.js
var VCard = __webpack_require__(684);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VCard/index.js
var components_VCard = __webpack_require__(646);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VGrid/VCol.js
var VCol = __webpack_require__(744);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VGrid/VContainer.js
var VContainer = __webpack_require__(640);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VForm/VForm.js
var VForm = __webpack_require__(721);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VOverlay/VOverlay.js
var VOverlay = __webpack_require__(198);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VProgressCircular/VProgressCircular.js
var VProgressCircular = __webpack_require__(630);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VGrid/VRow.js
var VRow = __webpack_require__(745);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VDataTable/VSimpleTable.js
var VSimpleTable = __webpack_require__(746);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VSnackbar/VSnackbar.js
var VSnackbar = __webpack_require__(671);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VGrid/VSpacer.js
var VSpacer = __webpack_require__(643);

// CONCATENATED MODULE: ./src/components/foundpasswordsearch/FoundPasswordSearchResult.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  foundpasswordsearch_FoundPasswordSearchResultvue_type_script_lang_ts_,
  render,
  staticRenderFns,
  false,
  null,
  "1dae413e",
  null
  
)

/* harmony default export */ var foundpasswordsearch_FoundPasswordSearchResult = __webpack_exports__["default"] = (component.exports);

/* vuetify-loader */













installComponents_default()(component, {VBtn: VBtn["a" /* default */],VCard: VCard["a" /* default */],VCardActions: components_VCard["a" /* VCardActions */],VCol: VCol["a" /* default */],VContainer: VContainer["a" /* default */],VForm: VForm["a" /* default */],VOverlay: VOverlay["a" /* default */],VProgressCircular: VProgressCircular["a" /* default */],VRow: VRow["a" /* default */],VSimpleTable: VSimpleTable["a" /* default */],VSnackbar: VSnackbar["a" /* default */],VSpacer: VSpacer["a" /* default */]})


/***/ }),

/***/ 721:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(57);
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(74);
/* harmony import */ var core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_object_values_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(216);
/* harmony import */ var core_js_modules_es_object_values_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_values_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(16);
/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(17);
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_web_timers_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(86);
/* harmony import */ var core_js_modules_web_timers_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_timers_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(117);
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(18);
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(13);
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptor_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(15);
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptor_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_own_property_descriptor_js__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptors_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(24);
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptors_js__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_own_property_descriptors_js__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _util_mixins__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(21);
/* harmony import */ var _mixins_binds_attrs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(110);
/* harmony import */ var _mixins_registrable__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(136);


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }












// Mixins



/* @vue/component */

/* harmony default export */ __webpack_exports__["a"] = (Object(_util_mixins__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"])(_mixins_binds_attrs__WEBPACK_IMPORTED_MODULE_13__[/* default */ "a"], Object(_mixins_registrable__WEBPACK_IMPORTED_MODULE_14__[/* provide */ "b"])('form')
/* @vue/component */
).extend({
  name: 'v-form',
  provide: function provide() {
    return {
      form: this
    };
  },
  inheritAttrs: false,
  props: {
    disabled: Boolean,
    lazyValidation: Boolean,
    readonly: Boolean,
    value: Boolean
  },
  data: function data() {
    return {
      inputs: [],
      watchers: [],
      errorBag: {}
    };
  },
  watch: {
    errorBag: {
      handler: function handler(val) {
        var errors = Object.values(val).includes(true);
        this.$emit('input', !errors);
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    watchInput: function watchInput(input) {
      var _this = this;

      var watcher = function watcher(input) {
        return input.$watch('hasError', function (val) {
          _this.$set(_this.errorBag, input._uid, val);
        }, {
          immediate: true
        });
      };

      var watchers = {
        _uid: input._uid,
        valid: function valid() {},
        shouldValidate: function shouldValidate() {}
      };

      if (this.lazyValidation) {
        // Only start watching inputs if we need to
        watchers.shouldValidate = input.$watch('shouldValidate', function (val) {
          if (!val) return; // Only watch if we're not already doing it

          if (_this.errorBag.hasOwnProperty(input._uid)) return;
          watchers.valid = watcher(input);
        });
      } else {
        watchers.valid = watcher(input);
      }

      return watchers;
    },

    /** @public */
    validate: function validate() {
      return this.inputs.filter(function (input) {
        return !input.validate(true);
      }).length === 0;
    },

    /** @public */
    reset: function reset() {
      this.inputs.forEach(function (input) {
        return input.reset();
      });
      this.resetErrorBag();
    },
    resetErrorBag: function resetErrorBag() {
      var _this2 = this;

      if (this.lazyValidation) {
        // Account for timeout in validatable
        setTimeout(function () {
          _this2.errorBag = {};
        }, 0);
      }
    },

    /** @public */
    resetValidation: function resetValidation() {
      this.inputs.forEach(function (input) {
        return input.resetValidation();
      });
      this.resetErrorBag();
    },
    register: function register(input) {
      this.inputs.push(input);
      this.watchers.push(this.watchInput(input));
    },
    unregister: function unregister(input) {
      var found = this.inputs.find(function (i) {
        return i._uid === input._uid;
      });
      if (!found) return;
      var unwatch = this.watchers.find(function (i) {
        return i._uid === found._uid;
      });

      if (unwatch) {
        unwatch.valid();
        unwatch.shouldValidate();
      }

      this.watchers = this.watchers.filter(function (i) {
        return i._uid !== found._uid;
      });
      this.inputs = this.inputs.filter(function (i) {
        return i._uid !== found._uid;
      });
      this.$delete(this.errorBag, found._uid);
    }
  },
  render: function render(h) {
    var _this3 = this;

    return h('form', {
      staticClass: 'v-form',
      attrs: _objectSpread({
        novalidate: true
      }, this.attrs$),
      on: {
        submit: function submit(e) {
          return _this3.$emit('submit', e);
        }
      }
    }, this.$slots.default);
  }
}));

/***/ })

}]);