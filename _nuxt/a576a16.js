(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[12],{

/***/ 665:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return HexText; });
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(36);
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_string_match_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(133);
/* harmony import */ var core_js_modules_es_string_match_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_match_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(69);
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(49);
/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(57);
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(74);
/* harmony import */ var core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_string_trim_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(66);
/* harmony import */ var core_js_modules_es_string_trim_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_trim_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _domain_youkai_checkdigit_state_Password__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(48);











var HexText = /*#__PURE__*/function () {
  function HexText() {
    Object(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(this, HexText);
  }

  Object(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(HexText, null, [{
    key: "parseHex",
    value: function parseHex(hexText) {
      var hexChars = hexText.replace(/\s+/g, "").match(/.{2}/g);
      if (!hexChars) return _domain_youkai_checkdigit_state_Password__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"].empty();
      var charCodes = hexChars.map(function (hex) {
        return parseInt(hex, 16);
      });
      if (charCodes.includes(NaN)) return _domain_youkai_checkdigit_state_Password__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"].empty();
      var password = new _domain_youkai_checkdigit_state_Password__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"](charCodes);
      return password.isInvalid() ? _domain_youkai_checkdigit_state_Password__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"].empty() : password;
    }
  }, {
    key: "validationPasswordHex",
    value: function validationPasswordHex(event) {
      var inputChar = event.key.toUpperCase();
      var charOk = event.code === 'Space' || HexText.HEX_CHARS.indexOf(inputChar) > 0;
      var input = event.currentTarget;
      var nowValue = input.value;
      var hex = nowValue.replace(/\s+/g, "");
      var lengthOk = hex.length < _domain_youkai_checkdigit_state_Password__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"].MAX_CHARS_LENGTH * 2;
      return charOk && lengthOk;
    }
  }, {
    key: "fixPasswordHexWhenInvalid",
    value: function fixPasswordHexWhenInvalid(hex) {
      if (!hex) return ""; // ×ボタンで、なぜかNullになるため。

      return hex.trim().toUpperCase().replace(/\s+/g, " ");
    }
  }]);

  return HexText;
}();


HexText.HEX_CHARS = " 0123456789ABCDEF";

/***/ })

}]);