module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TextAnchor = function (_PureComponent) {
  _inherits(TextAnchor, _PureComponent);

  function TextAnchor() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, TextAnchor);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TextAnchor.__proto__ || Object.getPrototypeOf(TextAnchor)).call.apply(_ref, [this].concat(args))), _this), _this.state = { buttonShowing: false, justCreated: true }, _this.onClick = function () {
      return _this.setState(_extends({}, _this.state, { buttonShowing: true }));
    }, _this.onDocumentMouseDown = function (e) {
      if (!_this.textBox.contains(e.target)) {
        _this.setState(_extends({}, _this.state, { buttonShowing: false }));
      }
    }, _this.onDocumentKeyDown = function (e) {
      if (e.key === "Escape" || e.keyCode === 27) {
        _this.setState(_extends({}, _this.state, { buttonShowing: false }));
      }
    }, _this.onDeleteButtonClick = function (event) {
      if (event.button === 0) {
        event.preventDefault();
        event.stopPropagation();
        _this.props.onDeleteButtonClick();
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(TextAnchor, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.mounted = true;
      this.textBox.addEventListener("click", this.onClick);
      document.addEventListener("mousedown", this.onDocumentMouseDown);
      document.addEventListener("keydown", this.onDocumentKeyDown);

      setTimeout(function () {
        if (_this2.mounted) {
          _this2.setState(_extends({}, _this2.state, { justCreated: false }));
        }
      }, 200);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.mounted = false;
      this.textBox.removeEventListener("click", this.onClick);
      document.removeEventListener("mousedown", this.onDocumentMouseDown);
      document.removeEventListener("keydown", this.onDocumentKeyDown);
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var textAnchorStyle = {
        left: this.props.x + "px",
        top: this.props.y + "px"
      };
      if (this.props.rotate) {
        textAnchorStyle.transform = "rotate(" + this.props.rotate + "rad)";
      }

      var className = "text-anchor" + (this.state.buttonShowing ? " button-showing" : "") + (this.state.justCreated ? " just-created" : "");

      return _react2.default.createElement(
        "div",
        { className: className, style: textAnchorStyle },
        _react2.default.createElement(
          "div",
          { className: "text-box", ref: function ref(e) {
              return _this3.textBox = e;
            } },
          this.props.children,
          _react2.default.createElement(
            "button",
            {
              type: "button",
              className: "delete-button",
              onClick: this.onDeleteButtonClick
              // Additional mouse-down handler means delete works cleanly if text is being edited:
              , onMouseDown: this.onDeleteButtonClick,
              ref: function ref(e) {
                return _this3.deleteButton = e;
              }
            },
            _react2.default.createElement(
              "svg",
              { className: "delete-button-svg" },
              _react2.default.createElement("path", {
                className: "delete-button-icon",
                d: "M 4 4 L 11 11 M 11 4 L 4 11"
              })
            )
          )
        )
      );
    }
  }]);

  return TextAnchor;
}(_react.PureComponent);

exports.default = TextAnchor;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _LineMeasurement = __webpack_require__(9);

var _LineMeasurement2 = _interopRequireDefault(_LineMeasurement);

var _CircleMeasurement = __webpack_require__(8);

var _CircleMeasurement2 = _interopRequireDefault(_CircleMeasurement);

var _TextAnnotation = __webpack_require__(10);

var _TextAnnotation2 = _interopRequireDefault(_TextAnnotation);

var _draftJs = __webpack_require__(5);

__webpack_require__(15);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MeasurementLayerBase = function (_PureComponent) {
	_inherits(MeasurementLayerBase, _PureComponent);

	function MeasurementLayerBase() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, MeasurementLayerBase);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = MeasurementLayerBase.__proto__ || Object.getPrototypeOf(MeasurementLayerBase)).call.apply(_ref, [this].concat(args))), _this), _this.createdId = null, _this.enabled = true, _this.doubleClicked = [], _this.createMeasurementComponent = function (measurement) {
			if (measurement.type === "line") {
				return _react2.default.createElement(_LineMeasurement2.default, {
					doubleClicked: _this.doubleClicked,
					key: measurement.id,
					line: measurement,
					parentWidth: _this.props.widthInPx,
					parentHeight: _this.props.heightInPx,
					measureLine: _this.props.measureLine,
					onDoubleClick: _this.onDoubleClick,
					onChange: _this.onChange,
					onCommit: _this.props.onCommit,
					onDeleteButtonClick: _this.delete,
					onMidMouse: _this.onMidMouse
				});
			} else if (measurement.type === "circle") {
				return _react2.default.createElement(_CircleMeasurement2.default, {
					key: measurement.id,
					circle: measurement,
					parentWidth: _this.props.widthInPx,
					parentHeight: _this.props.heightInPx,
					measureCircle: _this.props.measureCircle,
					onChange: _this.onChange,
					onCommit: _this.props.onCommit,
					onDeleteButtonClick: _this.delete
				});
			} else if (measurement.type === "text") {
				return _react2.default.createElement(_TextAnnotation2.default, {
					key: measurement.id,
					text: measurement,
					parentWidth: _this.props.widthInPx,
					parentHeight: _this.props.heightInPx,
					onChange: _this.onChange,
					onCommit: _this.props.onCommit,
					onDeleteButtonClick: _this.delete
				});
			} else {
				return false;
			}
		}, _this.keydown = function (e) {
			// delete key
			if (e.keyCode == 8) {
				_this.props.onChange(_this.props.measurements.filter(function (n) {
					return !_this.doubleClicked.includes(n.id);
				}));
				_this.doubleClicked = [];
				_this.enabled = true;
			}
		}, _this.onDoubleClick = function (enable, m) {
			if (enable) {
				_this.doubleClicked.push(m.id);
			} else {
				_this.doubleClicked = _this.doubleClicked.filter(function (n) {
					return n !== m.id;
				});
			}
		}, _this.onMouseDown = function (event) {
			if (_this.doubleClicked.length > 0) {
				return;
			}

			_this.finishAnyTextEdit();
			if (event.button === 0 && _this.enabled) {
				if (_this.props.mode === "line" || _this.props.mode === null) {
					event.preventDefault();
					_this.lineCreationInProgress = true;
					_this.mouseXAtPress = event.clientX;
					_this.mouseYAtPress = event.clientY;
				} else if (_this.props.mode === "circle") {
					event.preventDefault();
					_this.circleCreationInProgress = true;
					_this.mouseXAtPress = event.clientX;
					_this.mouseYAtPress = event.clientY;
				}
			}
		}, _this.onMidMouse = function (state) {
			if (_this.doubleClicked.length > 0) {
				return;
			}
			if (state == "enter") {
				_this.enabled = false;
			} else {
				_this.enabled = true;
			}
		}, _this.onMouseMove = function (event) {
			if (_this.doubleClicked.length > 0) {
				return;
			}
			if (_this.lineCreationInProgress) {
				var rect = _this.root.getBoundingClientRect();
				var endX = _this.clamp((event.clientX - rect.left) / _this.props.widthInPx);
				var endY = _this.clamp((event.clientY - rect.top) / _this.props.heightInPx);
				if (_this.createdId === null) {
					_this.createdId = _this.getNextId();
					var startX = _this.clamp((_this.mouseXAtPress - rect.left) / _this.props.widthInPx);
					var startY = _this.clamp((_this.mouseYAtPress - rect.top) / _this.props.heightInPx);
					var line = {
						id: _this.createdId,
						type: "line",
						startX: startX,
						startY: startY,
						endX: endX,
						endY: endY
					};
					_this.root.classList.add("line-end-dragged");
					_this.props.onChange([].concat(_toConsumableArray(_this.props.measurements), [line]));
				} else {
					var _line = _this.props.measurements.filter(function (a) {
						return a.id === _this.createdId;
					})[0];
					_this.onChange(_extends({}, _line, { endX: endX, endY: endY }));
				}
			} else if (_this.circleCreationInProgress) {
				var _rect = _this.root.getBoundingClientRect();
				var cursorX = event.clientX - _rect.left;
				var cursorY = event.clientY - _rect.top;
				if (_this.createdId === null) {
					_this.createdId = _this.getNextId();
					var centerX = _this.clamp((_this.mouseXAtPress - _rect.left) / _this.props.widthInPx);
					var centerY = _this.clamp((_this.mouseYAtPress - _rect.top) / _this.props.heightInPx);
					var radius = _this.calculateRadius(cursorX, cursorY, centerX, centerY);
					var circle = {
						id: _this.createdId,
						type: "circle",
						centerX: centerX,
						centerY: centerY,
						radius: radius
					};
					_this.root.classList.add("circle-stroke-dragged");
					_this.props.onChange([].concat(_toConsumableArray(_this.props.measurements), [circle]));
				} else {
					var _circle = _this.props.measurements.filter(function (a) {
						return a.id === _this.createdId;
					})[0];
					var _radius = _this.calculateRadius(cursorX, cursorY, _circle.centerX, _circle.centerY);
					_this.onChange(_extends({}, _circle, { radius: _radius }));
				}
			}
		}, _this.calculateRadius = function (cursorX, cursorY, centerX, centerY) {
			var deltaX = cursorX - centerX * _this.props.widthInPx;
			var deltaY = cursorY - centerY * _this.props.heightInPx;
			var radiusInPx = Math.max(Math.hypot(deltaX, deltaY), _CircleMeasurement.minRadiusInPx);
			var radius = radiusInPx / Math.sqrt(_this.props.widthInPx * _this.props.widthInPx);

			if (centerX + radius > 1) {
				radius = 1 - centerX;
			}
			if (centerX - radius < 0) {
				radius = centerX;
			}
			if (centerY + radius > 1) {
				radius = 1 - centerY;
			}
			if (centerY - radius < 0) {
				radius = centerY;
			}
			return radius;
		}, _this.onMouseUp = function (event) {
			return _this.endDrag();
		}, _this.endDrag = function () {
			if (_this.lineCreationInProgress) {
				_this.lineCreationInProgress = false;
				if (_this.createdId !== null) {
					_this.root.classList.remove("line-end-dragged");
				}
			} else if (_this.circleCreationInProgress) {
				_this.circleCreationInProgress = false;
				if (_this.createdId !== null) {
					_this.root.classList.remove("circle-stroke-dragged");
				}
			}
			if (_this.createdId !== null) {
				_this.props.onCommit(_this.props.measurements.filter(function (a) {
					return a.id === _this.createdId;
				})[0]);
				_this.createdId = null;
			}
		}, _this.onClick = function (event) {
			if (_this.doubleClicked.length > 0) {
				return;
			}
			if (_this.props.mode === "text") {
				var id = _this.getNextId();
				var rect = _this.root.getBoundingClientRect();
				var arrowX = (event.clientX - rect.left) / _this.props.widthInPx;
				var arrowY = (event.clientY - rect.top) / _this.props.heightInPx;
				var xOffsetDirection = arrowX < 0.8 ? 1 : -1;
				var yOffsetDirection = arrowY < 0.8 ? 1 : -1;
				var textX = arrowX + xOffsetDirection * 0.05;
				var textY = arrowY + yOffsetDirection * 0.07;
				var text = {
					id: id,
					type: "text",
					arrowX: arrowX,
					arrowY: arrowY,
					textX: textX,
					textY: textY,
					editorState: null,
					editable: true
				};
				_this.props.onChange([].concat(_toConsumableArray(_this.props.measurements), [text]));
				_this.props.onCommit(text);
			}
		}, _this.getNextId = function () {
			return _this.props.measurements.length > 0 ? Math.max.apply(Math, _toConsumableArray(_this.props.measurements.map(function (a) {
				return a.id;
			}))) + 1 : 0;
		}, _this.onChange = function (m) {
			if (_this.doubleClicked.length > 0) {
				return;
			}
			_this.props.onChange(_this.props.measurements.map(function (n) {
				return m.id === n.id ? m : n;
			}));
		}, _this.delete = function (m) {
			_this.props.onChange(_this.props.measurements.filter(function (n) {
				return n.id !== m.id;
			}));
			_this.props.onCommit(m);
		}, _this.clamp = function (value) {
			return Math.min(1, Math.max(0, value));
		}, _this.finishAnyTextEdit = function () {
			var editable = _this.props.measurements.filter(function (m) {
				return m.type === "text" && m.editable;
			})[0];
			if (editable) {
				_this.props.onChange(_this.props.measurements.map(function (m) {
					return m === editable ? _this.finishEdit(m) : m;
				}));
			}
		}, _this.finishEdit = function (text) {
			return _extends({}, text, {
				editorState: _draftJs.EditorState.moveFocusToEnd(_draftJs.EditorState.moveSelectionToEnd(text.editorState)),
				editable: false
			});
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(MeasurementLayerBase, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			this.root.addEventListener("mousedown", this.onMouseDown);
			this.root.addEventListener("click", this.onClick);
			document.addEventListener("mousemove", this.onMouseMove);
			window.addEventListener("mouseup", this.onMouseUp);
			window.addEventListener("blur", this.endDrag);
			window.addEventListener("keydown", this.keydown);

			if (this.props.event) {
				this.onMouseDown(event);
			}
		}
	}, {
		key: "componentWillUnmount",
		value: function componentWillUnmount() {
			this.root.removeEventListener("mousedown", this.onMouseDown);
			this.root.removeEventListener("click", this.onClick);
			document.removeEventListener("mousemove", this.onMouseMove);
			window.removeEventListener("mouseup", this.onMouseUp);
			window.removeEventListener("blur", this.endDrag);
			window.removeEventListener("keydown", this.keydown);
		}
	}, {
		key: "render",
		value: function render() {
			var _this2 = this;

			var className = "measurement-layer-base" + (this.props.mode ? " any-mode-on" : "");

			if (this.props.disabled) {
				this.doubleClicked = [];
				this.enabled = true;
			}

			return _react2.default.createElement(
				"div",
				{ className: className, ref: function ref(e) {
						return _this2.root = e;
					} },
				this.props.measurements.map(this.createMeasurementComponent)
			);
		}
	}]);

	return MeasurementLayerBase;
}(_react.PureComponent);

exports.default = MeasurementLayerBase;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			var styleTarget = fn.call(this, selector);
			// Special case to return head of iframe instead of iframe itself
			if (styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[selector] = styleTarget;
		}
		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(16);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("draft-js");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _MeasurementLayerBase = __webpack_require__(2);

var _MeasurementLayerBase2 = _interopRequireDefault(_MeasurementLayerBase);

__webpack_require__(14);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MeasurementLayer = function (_PureComponent) {
	_inherits(MeasurementLayer, _PureComponent);

	function MeasurementLayer() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, MeasurementLayer);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = MeasurementLayer.__proto__ || Object.getPrototypeOf(MeasurementLayer)).call.apply(_ref, [this].concat(args))), _this), _this.state = { mode: null }, _this.add = function () {
			_this.setState({ mode: "line" });
		}, _this.disable = function () {
			_this.setState({ mode: null, disabled: true });
		}, _this.enable = function () {
			_this.setState({ mode: null, disabled: false });
		}, _this.start = function (event) {
			_this.setState({ event: event });
		}, _this.onCommit = function (measurement) {
			_this.setState({ mode: null });
			if (_this.props.onCommit) {
				_this.props.onCommit(measurement);
			}
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(MeasurementLayer, [{
		key: "render",
		value: function render() {
			var _this2 = this;

			var hasSize = this.props.widthInPx > 0 && this.props.heightInPx > 0;
			return hasSize && _react2.default.createElement(
				"div",
				{ className: "measurement-layer", ref: function ref(e) {
						return _this2.root = e;
					} },
				_react2.default.createElement(_MeasurementLayerBase2.default, {
					disabled: this.state.disabled,
					measurements: this.props.measurements,
					onChange: this.props.onChange,
					widthInPx: this.props.widthInPx,
					heightInPx: this.props.heightInPx,
					measureLine: this.props.measureLine,
					measureCircle: this.props.measureCircle,
					mode: this.state.mode,
					onCommit: this.onCommit,
					onMidMouse: this.props.onMidMouse
				})
			);
		}
	}]);

	return MeasurementLayer;
}(_react.PureComponent);

exports.default = MeasurementLayer;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var calculateDistance = exports.calculateDistance = function calculateDistance(line, physicalWidth, physicalHeight) {
  var deltaX = (line.endX - line.startX) * physicalWidth;
  var deltaY = (line.endY - line.startY) * physicalHeight;
  return Math.hypot(deltaX, deltaY);
};

var calculateArea = exports.calculateArea = function calculateArea(circle, physicalWidth, physicalHeight) {
  return Math.PI * circle.radius * circle.radius * physicalWidth * physicalHeight;
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.minRadiusInPx = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _TextAnchor = __webpack_require__(1);

var _TextAnchor2 = _interopRequireDefault(_TextAnchor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var minRadiusInPx = exports.minRadiusInPx = 3;
var textOffset = 16;

var CircleMeasurement = function (_PureComponent) {
  _inherits(CircleMeasurement, _PureComponent);

  function CircleMeasurement() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, CircleMeasurement);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CircleMeasurement.__proto__ || Object.getPrototypeOf(CircleMeasurement)).call.apply(_ref, [this].concat(args))), _this), _this.onStrokeMouseDown = function (event) {
      if (event.button === 0) {
        _this.strokeDragInProgress = true;
        event.preventDefault();
        _this.onDragBegin(event.clientX, event.clientY);
      }
    }, _this.onFillMouseDown = function (event) {
      if (event.button === 0) {
        _this.fillDragInProgress = true;
        event.preventDefault();
        _this.onDragBegin(event.clientX, event.clientY);
      }
    }, _this.onDragBegin = function (eventX, eventY) {
      _this.mouseXAtPress = eventX;
      _this.mouseYAtPress = eventY;
      _this.circleAtPress = _this.props.circle;
      _this.centerXAtPress = _this.props.circle.centerX * _this.props.parentWidth;
      _this.centerYAtPress = _this.props.circle.centerY * _this.props.parentHeight;

      var rect = _this.root.getBoundingClientRect();
      var centerClientX = _this.centerXAtPress + rect.left;
      var centerClientY = _this.centerYAtPress + rect.top;
      var radiusAtPress = _this.props.circle.radius * Math.sqrt(_this.props.parentWidth * _this.props.parentHeight);
      var theta = Math.atan2(_this.mouseYAtPress - centerClientY, _this.mouseXAtPress - centerClientX);
      _this.pointXAtPress = radiusAtPress * Math.cos(theta);
      _this.pointYAtPress = radiusAtPress * Math.sin(theta);
    }, _this.onMouseMove = function (event) {
      return _this.onDrag(event.clientX, event.clientY);
    }, _this.onDrag = function (eventX, eventY) {
      if ((_this.fillDragInProgress || _this.strokeDragInProgress) && !_this.dragOccurred) {
        _this.dragOccurred = true;
        _this.toggleDragStyles();
      }

      if (_this.strokeDragInProgress) {
        var newPointX = _this.pointXAtPress + eventX - _this.mouseXAtPress;
        var newPointY = _this.pointYAtPress + eventY - _this.mouseYAtPress;
        var radiusInPixels = Math.max(Math.hypot(newPointX, newPointY), minRadiusInPx);
        var radius = radiusInPixels / Math.sqrt(_this.props.parentWidth * _this.props.parentHeight);

        if (_this.props.circle.centerX + radius > 1) {
          radius = 1 - _this.props.circle.centerX;
        }
        if (_this.props.circle.centerX - radius < 0) {
          radius = _this.props.circle.centerX;
        }
        if (_this.props.circle.centerY + radius > 1) {
          radius = 1 - _this.props.circle.centerY;
        }
        if (_this.props.circle.centerY - radius < 0) {
          radius = _this.props.circle.centerY;
        }
        _this.props.onChange(_extends({}, _this.props.circle, { radius: radius }));
      } else if (_this.fillDragInProgress) {
        var centerX = (_this.centerXAtPress + eventX - _this.mouseXAtPress) / _this.props.parentWidth;
        var centerY = (_this.centerYAtPress + eventY - _this.mouseYAtPress) / _this.props.parentHeight;

        if (centerX + _this.props.circle.radius > 1) {
          centerX = 1 - _this.props.circle.radius;
        } else if (centerX - _this.props.circle.radius < 0) {
          centerX = _this.props.circle.radius;
        }
        if (centerY + _this.props.circle.radius > 1) {
          centerY = 1 - _this.props.circle.radius;
        } else if (centerY - _this.props.circle.radius < 0) {
          centerY = _this.props.circle.radius;
        }
        _this.props.onChange(_extends({}, _this.props.circle, { centerX: centerX, centerY: centerY }));
      }
    }, _this.onMouseUp = function (event) {
      return _this.endDrag();
    }, _this.endDrag = function () {
      if (_this.dragOccurred) {
        _this.toggleDragStyles();
        _this.dragOccurred = false;
      }
      var anyDragAttempted = _this.strokeDragInProgress || _this.fillDragInProgress;
      if (_this.strokeDragInProgress) {
        _this.strokeDragInProgress = false;
      }
      if (_this.fillDragInProgress) {
        _this.fillDragInProgress = false;
      }
      if (anyDragAttempted && _this.didValuesChange()) {
        _this.props.onCommit(_this.props.circle);
      }
    }, _this.didValuesChange = function () {
      return _this.props.circle.centerX !== _this.circleAtPress.centerX || _this.props.circle.centerY !== _this.circleAtPress.centerY || _this.props.circle.radius !== _this.circleAtPress.radius;
    }, _this.getAnnotationLayerClassList = function () {
      return _this.root.parentElement.classList;
    }, _this.toggleDragStyles = function () {
      if (_this.strokeDragInProgress) {
        _this.circle.classList.toggle("dragged");
        _this.stroke.classList.toggle("dragged");
        _this.getAnnotationLayerClassList().toggle("circle-stroke-dragged");
      }
      if (_this.fillDragInProgress) {
        _this.circle.classList.toggle("dragged");
        _this.fill.classList.toggle("dragged");
        _this.getAnnotationLayerClassList().toggle("circle-fill-dragged");
      }
      _this.getAnnotationLayerClassList().toggle("any-dragged");
    }, _this.onDeleteButtonClick = function () {
      return _this.props.onDeleteButtonClick(_this.props.circle);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(CircleMeasurement, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.fill.addEventListener("mousedown", this.onFillMouseDown);
      this.stroke.addEventListener("mousedown", this.onStrokeMouseDown);
      document.addEventListener("mousemove", this.onMouseMove);
      window.addEventListener("mouseup", this.onMouseUp);
      window.addEventListener("blur", this.endDrag);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.fill.removeEventListener("mousedown", this.onFillMouseDown);
      this.stroke.removeEventListener("mousedown", this.onStrokeMouseDown);
      document.removeEventListener("mousemove", this.onMouseMove);
      document.removeEventListener("touchmove", this.onTouchMove);
      window.removeEventListener("mouseup", this.onMouseUp);
      window.removeEventListener("blur", this.endDrag);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var centerX = this.props.circle.centerX * this.props.parentWidth;
      var centerY = this.props.circle.centerY * this.props.parentHeight;
      var radius = this.props.circle.radius * Math.sqrt(this.props.parentWidth * this.props.parentHeight);
      var textY = centerY + radius + textOffset;
      var text = this.props.measureCircle(this.props.circle);

      return _react2.default.createElement(
        "div",
        { className: "circle-measurement", ref: function ref(e) {
            return _this2.root = e;
          } },
        _react2.default.createElement(
          _TextAnchor2.default,
          {
            x: centerX,
            y: textY,
            onDeleteButtonClick: this.onDeleteButtonClick
          },
          _react2.default.createElement(
            "div",
            { className: "measurement-text", ref: function ref(e) {
                return _this2.text = e;
              } },
            text
          )
        ),
        _react2.default.createElement(
          "svg",
          { className: "measurement-svg" },
          _react2.default.createElement(
            "g",
            { className: "grabber-group" },
            _react2.default.createElement("circle", {
              className: "fill-grabber",
              cx: centerX,
              cy: centerY,
              r: radius,
              ref: function ref(e) {
                return _this2.fill = e;
              }
            }),
            _react2.default.createElement("circle", {
              className: "stroke-grabber",
              cx: centerX,
              cy: centerY,
              r: radius,
              ref: function ref(e) {
                return _this2.stroke = e;
              }
            }),
            _react2.default.createElement("circle", {
              className: "circle",
              cx: centerX,
              cy: centerY,
              r: radius,
              ref: function ref(e) {
                return _this2.circle = e;
              }
            })
          )
        )
      );
    }
  }]);

  return CircleMeasurement;
}(_react.PureComponent);

exports.default = CircleMeasurement;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _TextAnchor = __webpack_require__(1);

var _TextAnchor2 = _interopRequireDefault(_TextAnchor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var edgeLength = 15;
var textOffset = 16;
var quarterCircle = Math.PI / 2;

var LineMeasurement = function (_PureComponent) {
  _inherits(LineMeasurement, _PureComponent);

  function LineMeasurement() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, LineMeasurement);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = LineMeasurement.__proto__ || Object.getPrototypeOf(LineMeasurement)).call.apply(_ref, [this].concat(args))), _this), _this.state = { midHover: false, doubleClick: false }, _this.onStartMouseDown = function (event) {
      if (_this.state.doubleClick) {
        return;
      }
      if (event.button === 0) {
        _this.startDragInProgress = true;
        event.preventDefault();
        _this.onDragBegin(event.clientX, event.clientY);
      }
    }, _this.onMidMouseDown = function (event) {
      if (_this.state.doubleClick) {
        return;
      }
      if (event.button === 0) {
        _this.midDragInProgress = true;
        event.preventDefault();
        _this.onDragBegin(event.clientX, event.clientY);
      }
    }, _this.onEndMouseDown = function (event) {
      if (_this.state.doubleClick) {
        return;
      }
      if (event.button === 0) {
        _this.endDragInProgress = true;
        event.preventDefault();
        _this.onDragBegin(event.clientX, event.clientY);
      }
    }, _this.onDragBegin = function (eventX, eventY) {
      _this.mouseXAtPress = eventX;
      _this.mouseYAtPress = eventY;
      _this.lineAtPress = _this.props.line;
      _this.startXAtPress = _this.props.line.startX * _this.props.parentWidth;
      _this.startYAtPress = _this.props.line.startY * _this.props.parentHeight;
      _this.endXAtPress = _this.props.line.endX * _this.props.parentWidth;
      _this.endYAtPress = _this.props.line.endY * _this.props.parentHeight;
    }, _this.onMouseMove = function (event) {
      if (_this.state.doubleClick) {
        return;
      }
      _this.onDrag(event.clientX, event.clientY);
    }, _this.onDrag = function (eventX, eventY) {
      if ((_this.startDragInProgress || _this.endDragInProgress || _this.midDragInProgress) && !_this.dragOccurred) {
        _this.dragOccurred = true;
        _this.toggleDragStyles();
      }

      if (_this.startDragInProgress) {
        var startX = _this.clamp(_this.getXAfterDrag(_this.startXAtPress, eventX));
        var startY = _this.clamp(_this.getYAfterDrag(_this.startYAtPress, eventY));
        _this.props.onChange(_extends({}, _this.props.line, { startX: startX, startY: startY }));
      } else if (_this.endDragInProgress) {
        var endX = _this.clamp(_this.getXAfterDrag(_this.endXAtPress, eventX));
        var endY = _this.clamp(_this.getYAfterDrag(_this.endYAtPress, eventY));
        _this.props.onChange(_extends({}, _this.props.line, { endX: endX, endY: endY }));
      } else if (_this.midDragInProgress) {
        var _startX = _this.getXAfterDrag(_this.startXAtPress, eventX);
        var _startY = _this.getYAfterDrag(_this.startYAtPress, eventY);
        var _endX = _this.getXAfterDrag(_this.endXAtPress, eventX);
        var _endY = _this.getYAfterDrag(_this.endYAtPress, eventY);
        var deltaX = _endX - _startX;
        var deltaY = _endY - _startY;

        // Don't let the line be dragged outside the layer bounds:
        if (_startX < 0) {
          _startX = 0;
          _endX = deltaX;
        } else if (_startX > 1) {
          _startX = 1;
          _endX = 1 + deltaX;
        }
        if (_startY < 0) {
          _startY = 0;
          _endY = deltaY;
        } else if (_startY > 1) {
          _startY = 1;
          _endY = 1 + deltaY;
        }
        if (_endX < 0) {
          _startX = -deltaX;
          _endX = 0;
        } else if (_endX > 1) {
          _startX = 1 - deltaX;
          _endX = 1;
        }
        if (_endY < 0) {
          _startY = -deltaY;
          _endY = 0;
        } else if (_endY > 1) {
          _startY = 1 - deltaY;
          _endY = 1;
        }
        _this.props.onChange(_extends({}, _this.props.line, { startX: _startX, startY: _startY, endX: _endX, endY: _endY }));
      }
    }, _this.onDoubleClick = function (event) {
      if (_this.state.doubleClick) {
        _this.setState(_extends({}, _this.state, { doubleClick: false, midHover: false }));
        _this.props.onDoubleClick(false, _this.props.line);
      } else {
        _this.setState(_extends({}, _this.state, { doubleClick: true, midHover: false }));
        _this.getAnnotationLayerClassList().toggle("double-click");
        _this.props.onDoubleClick(true, _this.props.line);
      }
    }, _this.getXAfterDrag = function (xAtPress, clientX) {
      return (xAtPress + clientX - _this.mouseXAtPress) / _this.props.parentWidth;
    }, _this.getYAfterDrag = function (yAtPress, clientY) {
      return (yAtPress + clientY - _this.mouseYAtPress) / _this.props.parentHeight;
    }, _this.onMouseUp = function (event) {
      if (_this.state.doubleClick) {
        return;
      }
      _this.endDrag();
    }, _this.endDrag = function () {
      if (_this.state.doubleClick) {
        return;
      }
      if (_this.dragOccurred) {
        _this.toggleDragStyles();
        _this.dragOccurred = false;
      }
      var anyDragAttempted = _this.startDragInProgress || _this.midDragInProgress || _this.endDragInProgress;
      if (_this.startDragInProgress) {
        _this.startDragInProgress = false;
      }
      if (_this.midDragInProgress) {
        _this.midDragInProgress = false;
      }
      if (_this.endDragInProgress) {
        _this.endDragInProgress = false;
      }
      if (anyDragAttempted && _this.didValuesChange()) {
        _this.props.onCommit(_this.props.line);
      }
    }, _this.didValuesChange = function () {
      return _this.props.line.startX !== _this.lineAtPress.startX || _this.props.line.startY !== _this.lineAtPress.startY || _this.props.line.endX !== _this.lineAtPress.endX || _this.props.line.endY !== _this.lineAtPress.endY;
    }, _this.onMidMouseEnter = function (event) {
      if (_this.state.doubleClick) {
        return;
      }
      _this.props.onMidMouse("enter");
      _this.setState(_extends({}, _this.state, { midHover: true }));
    }, _this.onMidMouseLeave = function (event) {
      if (_this.state.doubleClick) {
        return;
      }
      _this.props.onMidMouse("leave");
      _this.setState(_extends({}, _this.state, { midHover: false }));
    }, _this.getAnnotationLayerClassList = function () {
      return _this.root.parentElement.classList;
    }, _this.clamp = function (value) {
      return Math.min(1, Math.max(0, value));
    }, _this.toggleDragStyles = function () {
      if (_this.startDragInProgress) {
        _this.startLine.classList.toggle("dragged");
        _this.startGrabber.classList.toggle("dragged");
        _this.getAnnotationLayerClassList().toggle("line-start-dragged");
      }
      if (_this.midDragInProgress) {
        _this.startLine.classList.toggle("dragged");
        _this.midLine.classList.toggle("dragged");
        _this.endLine.classList.toggle("dragged");
        _this.startGrabber.classList.toggle("dragged");
        _this.midGrabber.classList.toggle("dragged");
        _this.endGrabber.classList.toggle("dragged");
        _this.getAnnotationLayerClassList().toggle("line-mid-dragged");
      }
      if (_this.endDragInProgress) {
        _this.endLine.classList.toggle("dragged");
        _this.endGrabber.classList.toggle("dragged");
        _this.getAnnotationLayerClassList().toggle("line-end-dragged");
      }
      _this.getAnnotationLayerClassList().toggle("any-dragged");
    }, _this.onDeleteButtonClick = function () {
      return _this.props.onDeleteButtonClick(_this.props.line);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(LineMeasurement, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.startGrabber.addEventListener("mousedown", this.onStartMouseDown);
      this.startGrabber.addEventListener("mouseenter", this.onMidMouseEnter);
      this.startGrabber.addEventListener("mouseleave", this.onMidMouseLeave);
      this.midGrabber.addEventListener("mousedown", this.onMidMouseDown);
      this.midGrabber.addEventListener("mouseenter", this.onMidMouseEnter);
      this.midGrabber.addEventListener("mouseleave", this.onMidMouseLeave);
      this.midGrabber.addEventListener("dblclick", this.onDoubleClick);
      this.endGrabber.addEventListener("mousedown", this.onEndMouseDown);
      this.endGrabber.addEventListener("mouseenter", this.onMidMouseEnter);
      this.endGrabber.addEventListener("mouseleave", this.onMidMouseLeave);
      document.addEventListener("mousemove", this.onMouseMove);
      window.addEventListener("mouseup", this.onMouseUp);
      window.addEventListener("blur", this.endDrag);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.startGrabber.removeEventListener("mousedown", this.onStartMouseDown);
      this.startGrabber.removeEventListener("mouseenter", this.onMidMouseEnter);
      this.startGrabber.removeEventListener("mouseleave", this.onMidMouseLeave);
      this.midGrabber.removeEventListener("mousedown", this.onMidMouseDown);
      this.midGrabber.removeEventListener("mouseenter", this.onMidMouseEnter);
      this.midGrabber.removeEventListener("mouseleave", this.onMidMouseLeave);
      this.midGrabber.removeEventListener("dblclick", this.onDoubleClick);
      this.endGrabber.removeEventListener("mousedown", this.onEndMouseDown);
      this.endGrabber.removeEventListener("mouseenter", this.onMidMouseEnter);
      this.endGrabber.removeEventListener("mouseleave", this.onMidMouseLeave);
      document.removeEventListener("mousemove", this.onMouseMove);
      window.removeEventListener("mouseup", this.onMouseUp);
      window.removeEventListener("blur", this.endDrag);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      // Line layout:
      var startX = this.props.line.startX * this.props.parentWidth;
      var startY = this.props.line.startY * this.props.parentHeight;
      var endX = this.props.line.endX * this.props.parentWidth;
      var endY = this.props.line.endY * this.props.parentHeight;
      var deltaX = endX - startX;
      var deltaY = endY - startY;
      var rotate = Math.atan2(deltaY, deltaX);
      var edgeX = edgeLength * Math.sin(rotate) / 2.0;
      var edgeY = edgeLength * Math.cos(rotate) / 2.0;

      if (this.state.doubleClick && this.props.doubleClicked.length == 0) {
        this.state.doubleClick = false;
      }

      // Text layout (make sure the text is never rotated so much to be upside down):
      var centerX = (startX + endX) / 2;
      var centerY = (startY + endY) / 2;
      var rotateIsSmall = Math.abs(rotate) <= quarterCircle;
      var offsetX = (rotateIsSmall ? -1 : 1) * textOffset * Math.sin(rotate);
      var offsetY = (rotateIsSmall ? 1 : -1) * textOffset * Math.cos(rotate);
      var textX = centerX + offsetX;
      var textY = centerY + offsetY;
      var textRotate = Math.atan2(offsetY, offsetX) - quarterCircle;

      var text = this.props.measureLine(this.props.line);
      var rootClassName = "line-measurement" + (this.state.midHover ? " mid-hover" : "");
      var lineClassName = this.state.doubleClick ? " double-click" : " line";
      var handlerClassName = this.state.doubleClick ? " double-click" : "";
      var grabberClassName = this.state.doubleClick ? " double-click" : " mid-grabber";

      return _react2.default.createElement(
        "div",
        { className: rootClassName, ref: function ref(e) {
            return _this2.root = e;
          } },
        _react2.default.createElement(
          "svg",
          { className: "measurement-svg" },
          _react2.default.createElement(
            "g",
            { className: "grabber-group" },
            _react2.default.createElement("line", {
              className: "grabber" + grabberClassName,
              x1: startX,
              y1: startY,
              x2: endX,
              y2: endY,
              ref: function ref(e) {
                return _this2.midGrabber = e;
              }
            }),
            _react2.default.createElement("line", {
              className: "mid-line" + lineClassName,
              x1: startX,
              y1: startY,
              x2: endX,
              y2: endY,
              ref: function ref(e) {
                return _this2.midLine = e;
              }
            })
          ),
          _react2.default.createElement(
            "g",
            { className: "grabber-group" },
            _react2.default.createElement("line", {
              className: "grabber start-grabber",
              x1: startX - edgeX,
              y1: startY + edgeY,
              x2: startX + edgeX,
              y2: startY - edgeY,
              ref: function ref(e) {
                return _this2.startGrabber = e;
              }
            }),
            _react2.default.createElement("line", {
              className: "line start-line" + handlerClassName,
              x1: startX - edgeX,
              y1: startY + edgeY,
              x2: startX + edgeX,
              y2: startY - edgeY,
              ref: function ref(e) {
                return _this2.startLine = e;
              }
            })
          ),
          _react2.default.createElement(
            "g",
            { className: "grabber-group" },
            _react2.default.createElement("line", {
              className: "grabber end-grabber",
              x1: endX - edgeX,
              y1: endY + edgeY,
              x2: endX + edgeX,
              y2: endY - edgeY,
              ref: function ref(e) {
                return _this2.endGrabber = e;
              }
            }),
            _react2.default.createElement("line", {
              className: "line end-line" + handlerClassName,
              x1: endX - edgeX,
              y1: endY + edgeY,
              x2: endX + edgeX,
              y2: endY - edgeY,
              ref: function ref(e) {
                return _this2.endLine = e;
              }
            })
          )
        ),
        _react2.default.createElement(
          _TextAnchor2.default,
          {
            x: textX,
            y: textY,
            rotate: textRotate,
            onDeleteButtonClick: this.onDeleteButtonClick
          },
          _react2.default.createElement(
            "div",
            { className: "measurement-text" + handlerClassName, ref: function ref(e) {
                return _this2.text = e;
              } },
            text
          )
        )
      );
    }
  }]);

  return LineMeasurement;
}(_react.PureComponent);

exports.default = LineMeasurement;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _draftJs = __webpack_require__(5);

var _TextAnchor = __webpack_require__(1);

var _TextAnchor2 = _interopRequireDefault(_TextAnchor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var headWidth = 8;
var headHeight = 5;
var headHoverWidth = 10;
var headHoverHeight = 6;
var headHoverOffset = 1.5;
var headGrabberWidth = 15;
var headGrabberHeight = 9;
var headGrabberOffset = 3;

var TextAnnotation = function (_PureComponent) {
  _inherits(TextAnnotation, _PureComponent);

  function TextAnnotation() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, TextAnnotation);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TextAnnotation.__proto__ || Object.getPrototypeOf(TextAnnotation)).call.apply(_ref, [this].concat(args))), _this), _this.propagateTextChanges = false, _this.state = {
      lineHover: false,
      headHover: false,
      lineDragged: false,
      headDragged: false,
      textDragged: false
    }, _this.drawHead = function (pointX, pointY, w, h, rotate, offset, cos, sin) {
      var x = pointX + offset * cos;
      var y = pointY + offset * sin;
      var path = "M " + (x - w) + " " + (y - h) + " L " + x + " " + y + " L " + (x - w) + " " + (y + h) + " Z";
      var rotateInDegrees = rotate * 180 / Math.PI;
      var transform = "rotate(" + rotateInDegrees + " " + x + " " + y + ")";
      return { path: path, transform: transform };
    }, _this.updateMask = function () {
      var rootBox = _this.root.getBoundingClientRect();
      var textBox = _this.text.getBoundingClientRect();

      _this.maskRect.setAttribute("x", textBox.left - rootBox.left);
      _this.maskRect.setAttribute("y", textBox.top - rootBox.top);
      _this.maskRect.setAttribute("width", textBox.width);
      _this.maskRect.setAttribute("height", textBox.height);
    }, _this.onTextMouseDown = function (event) {
      if (_this.props.text.editable) {
        event.stopPropagation();
      } else if (event.button === 0) {
        _this.textDragInProgress = true;
        event.preventDefault();
        _this.onDragBegin(event.clientX, event.clientY);
      }
    }, _this.onLineMouseDown = function (event) {
      if (event.button === 0) {
        _this.lineDragInProgress = true;
        event.preventDefault();
        _this.onDragBegin(event.clientX, event.clientY);
        if (_this.props.text.editable) {
          event.stopPropagation();
        }
      }
    }, _this.onHeadMouseDown = function (event) {
      if (event.button === 0) {
        _this.headDragInProgress = true;
        event.preventDefault();
        _this.onDragBegin(event.clientX, event.clientY);
        if (_this.props.text.editable) {
          event.stopPropagation();
        }
      }
    }, _this.onDragBegin = function (eventX, eventY) {
      _this.mouseXAtPress = eventX;
      _this.mouseYAtPress = eventY;
      _this.textAtPress = _this.props.text;
      _this.arrowXAtPress = _this.props.text.arrowX * _this.props.parentWidth;
      _this.arrowYAtPress = _this.props.text.arrowY * _this.props.parentHeight;
      _this.textXAtPress = _this.props.text.textX * _this.props.parentWidth;
      _this.textYAtPress = _this.props.text.textY * _this.props.parentHeight;
    }, _this.onMouseMove = function (event) {
      return _this.onDrag(event.clientX, event.clientY);
    }, _this.onDrag = function (eventX, eventY) {
      if ((_this.textDragInProgress || _this.lineDragInProgress || _this.headDragInProgress) && _this.props.text.editable) {
        _this.finishEdit();
      }

      if ((_this.textDragInProgress || _this.lineDragInProgress || _this.headDragInProgress) && !_this.dragOccurred) {
        _this.dragOccurred = true;
        _this.toggleDragStyles();
      }

      if (_this.headDragInProgress) {
        var arrowX = _this.clamp(_this.getXAfterDrag(_this.arrowXAtPress, eventX));
        var arrowY = _this.clamp(_this.getYAfterDrag(_this.arrowYAtPress, eventY));
        _this.props.onChange(_extends({}, _this.props.text, { arrowX: arrowX, arrowY: arrowY }));
      } else if (_this.textDragInProgress) {
        var textX = _this.clamp(_this.getXAfterDrag(_this.textXAtPress, eventX));
        var textY = _this.clamp(_this.getYAfterDrag(_this.textYAtPress, eventY));
        _this.props.onChange(_extends({}, _this.props.text, { textX: textX, textY: textY }));
      } else if (_this.lineDragInProgress) {
        var _arrowX = _this.getXAfterDrag(_this.arrowXAtPress, eventX);
        var _arrowY = _this.getYAfterDrag(_this.arrowYAtPress, eventY);
        var _textX = _this.getXAfterDrag(_this.textXAtPress, eventX);
        var _textY = _this.getYAfterDrag(_this.textYAtPress, eventY);
        var deltaX = _textX - _arrowX;
        var deltaY = _textY - _arrowY;

        if (_arrowX < 0) {
          _arrowX = 0;
          _textX = deltaX;
        } else if (_arrowX > 1) {
          _arrowX = 1;
          _textX = 1 + deltaX;
        }
        if (_arrowY < 0) {
          _arrowY = 0;
          _textY = deltaY;
        } else if (_arrowY > 1) {
          _arrowY = 1;
          _textY = 1 + deltaY;
        }
        if (_textX < 0) {
          _arrowX = -deltaX;
          _textX = 0;
        } else if (_textX > 1) {
          _arrowX = 1 - deltaX;
          _textX = 1;
        }
        if (_textY < 0) {
          _arrowY = -deltaY;
          _textY = 0;
        } else if (_textY > 1) {
          _arrowY = 1 - deltaY;
          _textY = 1;
        }
        _this.props.onChange(_extends({}, _this.props.text, { arrowX: _arrowX, arrowY: _arrowY, textX: _textX, textY: _textY }));
      }
    }, _this.getXAfterDrag = function (xAtPress, clientX) {
      return (xAtPress + clientX - _this.mouseXAtPress) / _this.props.parentWidth;
    }, _this.getYAfterDrag = function (yAtPress, clientY) {
      return (yAtPress + clientY - _this.mouseYAtPress) / _this.props.parentHeight;
    }, _this.onMouseUp = function (event) {
      return _this.endDrag();
    }, _this.endDrag = function () {
      if (_this.dragOccurred) {
        _this.toggleDragStyles();
        _this.dragOccurred = false;
      }

      var anyDragAttempted = _this.textDragInProgress || _this.lineDragInProgress || _this.headDragInProgress;
      if (_this.textDragInProgress) {
        _this.textDragInProgress = false;
      }
      if (_this.lineDragInProgress) {
        _this.lineDragInProgress = false;
      }
      if (_this.headDragInProgress) {
        _this.headDragInProgress = false;
      }
      if (anyDragAttempted && _this.didValuesChange()) {
        _this.props.onCommit(_this.props.text);
      }
    }, _this.didValuesChange = function () {
      return _this.props.text.arrowX !== _this.textAtPress.arrowX || _this.props.text.arrowY !== _this.textAtPress.arrowY || _this.props.text.textX !== _this.textAtPress.textX || _this.props.text.textY !== _this.textAtPress.textY;
    }, _this.toggleDragStyles = function () {
      _this.getAnnotationLayerClassList().toggle("any-dragged");
      if (_this.textDragInProgress) {
        _this.getAnnotationLayerClassList().toggle("text-dragged");
        _this.setState(_extends({}, _this.state, { textDragged: !_this.state.textDragged }));
      } else if (_this.lineDragInProgress) {
        _this.getAnnotationLayerClassList().toggle("arrow-line-dragged");
        _this.setState(_extends({}, _this.state, { lineDragged: !_this.state.lineDragged }));
      } else if (_this.headDragInProgress) {
        _this.getAnnotationLayerClassList().toggle("arrow-head-dragged");
        _this.setState(_extends({}, _this.state, { headDragged: !_this.state.headDragged }));
      }
    }, _this.onLineMouseEnter = function (event) {
      return _this.setState(_extends({}, _this.state, { lineHover: true }));
    }, _this.onLineMouseLeave = function (event) {
      return _this.setState(_extends({}, _this.state, { lineHover: false }));
    }, _this.onHeadMouseEnter = function (event) {
      return _this.setState(_extends({}, _this.state, { headHover: true }));
    }, _this.onHeadMouseLeave = function (event) {
      return _this.setState(_extends({}, _this.state, { headHover: false }));
    }, _this.getAnnotationLayerClassList = function () {
      return _this.root.parentElement.classList;
    }, _this.clamp = function (value) {
      return Math.min(1, Math.max(0, value));
    }, _this.onDoubleClick = function (event) {
      if (event.button === 0) {
        event.preventDefault();
        _this.startEdit();
      }
    }, _this.onTextChange = function (editorState) {
      if (_this.propagateTextChanges) {
        _this.props.onChange(_extends({}, _this.props.text, { editorState: editorState }));
      }
    }, _this.startEdit = function () {
      if (!_this.props.text.editable) {
        _this.contentStateOnEditStart = _this.props.text.editorState.getCurrentContent();
        _this.setEditState(true);
      }
    }, _this.finishEdit = function () {
      if (_this.props.text.editable) {
        _this.setEditState(false);
        if (_this.contentStateOnEditStart !== _this.props.text.editorState.getCurrentContent()) {
          _this.props.onCommit(_this.props.text);
        }
      }
    }, _this.setEditState = function (editable) {
      _this.propagateTextChanges = editable;
      // Note: selection change is also important when we finish editing because it clears the selection.
      var editorState = _draftJs.EditorState.moveFocusToEnd(_draftJs.EditorState.moveSelectionToEnd(_this.props.text.editorState));
      _this.props.onChange(_extends({}, _this.props.text, { editorState: editorState, editable: editable }));
    }, _this.onDocumentKeyDown = function (event) {
      if (_this.props.text.editable && (event.keyCode === 27 || event.keyCode === 13 && !event.shiftKey)) {
        event.stopPropagation();
        _this.finishEdit();
      }
    }, _this.onDeleteButtonClick = function () {
      return _this.props.onDeleteButtonClick(_this.props.text);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(TextAnnotation, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.text.addEventListener("mousedown", this.onTextMouseDown);
      this.lineGrabber.addEventListener("mousedown", this.onLineMouseDown);
      this.lineGrabber.addEventListener("mouseenter", this.onLineMouseEnter);
      this.lineGrabber.addEventListener("mouseleave", this.onLineMouseLeave);
      this.headGrabber.addEventListener("mousedown", this.onHeadMouseDown);
      this.headGrabber.addEventListener("mouseenter", this.onHeadMouseEnter);
      this.headGrabber.addEventListener("mouseleave", this.onHeadMouseLeave);
      this.root.addEventListener("dblclick", this.onDoubleClick);
      document.addEventListener("mousemove", this.onMouseMove);
      document.addEventListener("keydown", this.onDocumentKeyDown, true);
      window.addEventListener("mouseup", this.onMouseUp);
      window.addEventListener("blur", this.endDrag);
      this.updateMask();

      if (this.props.text.editable) {
        this.propagateTextChanges = true;
        this.editor.focus();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.text.removeEventListener("mousedown", this.onTextMouseDown);
      this.lineGrabber.removeEventListener("mousedown", this.onLineMouseDown);
      this.lineGrabber.removeEventListener("mouseenter", this.onLineMouseEnter);
      this.lineGrabber.removeEventListener("mouseleave", this.onLineMouseLeave);
      this.headGrabber.removeEventListener("mousedown", this.onHeadMouseDown);
      this.headGrabber.removeEventListener("mouseenter", this.onHeadMouseEnter);
      this.headGrabber.removeEventListener("mouseleave", this.onHeadMouseLeave);
      this.root.removeEventListener("dblclick", this.onDoubleClick);
      this.root.removeEventListener("touchstart", this.onRootTouchStart);
      document.removeEventListener("mousemove", this.onMouseMove);
      document.removeEventListener("keydown", this.onDocumentKeyDown, true);
      window.removeEventListener("mouseup", this.onMouseUp);
      window.removeEventListener("blur", this.endDrag);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.updateMask();
      if (!this.props.text.editable) {
        this.propagateTextChanges = false;
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var pointX = this.props.text.arrowX * this.props.parentWidth;
      var pointY = this.props.text.arrowY * this.props.parentHeight;
      var textX = this.props.text.textX * this.props.parentWidth;
      var textY = this.props.text.textY * this.props.parentHeight;
      var rotate = Math.atan2(pointX - textX, textY - pointY) - Math.PI / 2;
      var cos = Math.cos(rotate);
      var sin = Math.sin(rotate);

      var lineEndX = pointX - (headWidth - 1) * cos;
      var lineEndY = pointY - (headWidth - 1) * sin;
      var lineClass = "arrow-line" + (this.state.lineHover ? " hover" : "") + (this.state.lineDragged ? " dragged" : "");
      // Extra 'M -1 -1' is a workaround for a chrome bug where the line dissapears if straight, even if outside the mask's clip area:
      var linePath = "M -1 -1 M " + textX + " " + textY + " L " + lineEndX + " " + lineEndY;

      var showLargerHead = this.state.lineHover || this.state.headHover || this.state.lineDragged || this.state.headDragged;
      var headGrabber = this.drawHead(pointX, pointY, headGrabberWidth, headGrabberHeight, rotate, headGrabberOffset, cos, sin);
      var head = showLargerHead ? this.drawHead(pointX, pointY, headHoverWidth, headHoverHeight, rotate, headHoverOffset, cos, sin) : this.drawHead(pointX, pointY, headWidth, headHeight, rotate, 0, 0, 0);

      var editorState = this.props.text.editorState;
      var hasText = editorState != null && editorState.getCurrentContent() != null && editorState.getCurrentContent().hasText();
      var textVisible = hasText || this.props.text.editable;
      var rootClass = "text-annotation" + (!hasText ? " no-text" : "") + (this.props.text.editable ? " editable" : "");

      var lineMaskId = "lineMask" + this.props.text.id;
      var lineMask = textVisible ? "url(#" + lineMaskId + ")" : "";

      var lineGrabberClass = "arrow-line-grabber" + (this.state.lineDragged ? " dragged" : "");
      var headGrabberClass = "arrow-head-grabber" + (this.state.headDragged ? " dragged" : "");

      return _react2.default.createElement(
        "div",
        { className: rootClass, ref: function ref(e) {
            return _this2.root = e;
          } },
        _react2.default.createElement(
          "svg",
          { className: "measurement-svg" },
          _react2.default.createElement(
            "defs",
            null,
            _react2.default.createElement(
              "mask",
              { id: lineMaskId },
              _react2.default.createElement("rect", { x: "0", y: "0", width: "100%", height: "100%", fill: "white" }),
              _react2.default.createElement("rect", { fill: "black", ref: function ref(e) {
                  return _this2.maskRect = e;
                } })
            )
          ),
          _react2.default.createElement("line", {
            className: lineGrabberClass,
            x1: lineEndX,
            y1: lineEndY,
            x2: textX,
            y2: textY,
            ref: function ref(e) {
              return _this2.lineGrabber = e;
            }
          }),
          _react2.default.createElement("path", {
            className: headGrabberClass,
            d: headGrabber.path,
            transform: headGrabber.transform,
            ref: function ref(e) {
              return _this2.headGrabber = e;
            }
          }),
          _react2.default.createElement("path", {
            className: "arrow-head",
            d: head.path,
            transform: head.transform,
            ref: function ref(e) {
              return _this2.head = e;
            }
          }),
          _react2.default.createElement("path", {
            className: lineClass,
            d: linePath,
            ref: function ref(e) {
              return _this2.line = e;
            },
            mask: lineMask
          })
        ),
        _react2.default.createElement(
          _TextAnchor2.default,
          {
            x: textX,
            y: textY,
            onDeleteButtonClick: this.onDeleteButtonClick
          },
          _react2.default.createElement(
            "div",
            { className: "text", ref: function ref(e) {
                return _this2.text = e;
              } },
            _react2.default.createElement(_draftJs.Editor, {
              editorState: editorState ? editorState : _draftJs.EditorState.createEmpty(),
              readOnly: !this.props.text.editable,
              onChange: this.onTextChange,
              onBlur: this.finishEdit,
              ref: function ref(e) {
                return _this2.editor = e;
              }
            })
          )
        )
      );
    }
  }]);

  return TextAnnotation;
}(_react.PureComponent);

exports.default = TextAnnotation;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _MeasurementLayer = __webpack_require__(6);

var _MeasurementLayer2 = _interopRequireDefault(_MeasurementLayer);

var _MeasurementLayerBase = __webpack_require__(2);

var _MeasurementLayerBase2 = _interopRequireDefault(_MeasurementLayerBase);

var _MeasurementUtils = __webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  MeasurementLayer: _MeasurementLayer2.default,
  MeasurementLayerBase: _MeasurementLayerBase2.default,
  calculateDistance: _MeasurementUtils.calculateDistance,
  calculateArea: _MeasurementUtils.calculateArea
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// imports


// module
exports.push([module.i, "/*---------- General Layout ----------*/\n\n.measurement-layer {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  top: 0px;\n  left: 0px;\n}\n\n/*---------- Buttons ----------*/\n\n.measurement-layer .button-bar {\n  position: absolute;\n  display: flex;\n  height: 21px;\n  top: 5px;\n  right: 5px;\n  opacity: 0;\n  transition: opacity 0.2s;\n}\n\n.measurement-layer:hover .button-bar,\n.measurement-layer .button-bar.pressed,\n.measurement-layer .button-bar:focus-within {\n  opacity: 1;\n}\n\n.measurement-layer .button-bar button {\n  background-color: rgba(0, 0, 0, 0.8);\n  border-radius: 0;\n  margin: 0;\n  padding: 3px;\n  border: none;\n  cursor: pointer;\n  outline: none;\n}\n\n.measurement-layer .button-bar button:hover,\n.measurement-layer .button-bar button:focus {\n  background-color: rgba(70, 60, 50, 0.9);\n}\n\n.measurement-layer .button-bar button.pressed {\n  background-color: rgba(130, 120, 110, 0.9);\n}\n\n.measurement-layer .circle-icon {\n  stroke: white;\n  fill: none;\n  stroke-width: 2;\n}\n\n.measurement-layer .ruler-icon,\n.measurement-layer .text-icon {\n  stroke: none;\n  fill: white;\n}\n", ""]);

// exports


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// imports


// module
exports.push([module.i, "/*---------- General Layout ----------*/\n\n.measurement-layer-base {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  top: 0px;\n  left: 0px;\n  outline: none;\n  font-size: 10pt;\n}\n\n.line-measurement,\n.circle-measurement,\n.text-annotation,\n.measurement-svg {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n}\n\n/*---------- Colors ----------*/\n\n.line-measurement .line,\n.circle-measurement .circle,\n.text-annotation .arrow-line {\n  stroke: yellow;\n}\n\n.line-measurement .double-click {\n  color: red;\n  stroke: red;\n  stroke-width: 5px;\n}\n\n.text-annotation .arrow-head {\n  fill: yellow;\n}\n\n.measurement-text,\n.text-annotation .text {\n  color: yellow;\n  background-color: rgba(0, 0, 0, 0.7);\n}\n\n.measurement-layer-base .text-anchor.button-showing .delete-button,\n.measurement-layer-base .text-annotation.editable .delete-button {\n  background-color: rgba(50, 45, 40, 0.9);\n}\n\n.measurement-layer-base .text-anchor.button-showing .delete-button:hover,\n.measurement-layer-base .text-annotation.editable .delete-button:hover,\n.measurement-layer-base .text-anchor .delete-button:focus {\n  background-color: rgba(70, 60, 50, 0.9);\n}\n\n.measurement-layer-base .text-anchor.button-showing .delete-button-icon,\n.measurement-layer-base .text-annotation.editable .delete-button-icon,\n.measurement-layer-base .text-anchor .delete-button:focus .delete-button-icon {\n  stroke: yellow;\n}\n\n/*---------- General Measurement & Text Styling ----------*/\n\n.line-measurement .line,\n.circle-measurement .circle,\n.text-annotation .arrow-line {\n  stroke-width: 2px;\n  stroke-linecap: butt;\n  fill: none;\n}\n\n.text-annotation .arrow-head {\n  stroke: none;\n}\n\n.measurement-text {\n  position: relative;\n  padding: 1px 4px;\n  white-space: pre;\n  cursor: default;\n  /* Use color transitions rather than opacity, which blurs text for some reason. */\n  transition: color 0.3s, background-color 0.3s;\n}\n\n.measurement-layer-base.line-end-dragged\n  .text-anchor.just-created\n  .measurement-text,\n.measurement-layer-base.circle-stroke-dragged\n  .text-anchor.just-created\n  .measurement-text {\n  color: transparent;\n  background-color: transparent;\n}\n\n.text-annotation .text {\n  position: relative;\n  padding: 1px 4px;\n}\n\n.line-measurement .grabber-group:hover .line,\n.line-measurement.mid-hover .grabber-group .line,\n.line-measurement .line.dragged,\n.circle-measurement .grabber-group:hover .circle,\n.circle-measurement .circle.dragged,\n.text-annotation .arrow-line.hover,\n.text-annotation .arrow-line.dragged {\n  stroke-width: 3px;\n}\n\n.text-annotation .public-DraftEditor-content {\n  /* Ensures the blinking cursor is always visible when the text is editable but empty. */\n  min-width: 1px;\n}\n\n.text-annotation .public-DraftStyleDefault-block {\n  white-space: pre;\n  text-align: center;\n}\n\n.text-annotation.no-text .text-anchor {\n  visibility: hidden;\n}\n\n.text-annotation.no-text.editable .text-anchor {\n  visibility: visible;\n}\n\n/*---------- Grabbers ----------*/\n\n.line-measurement .grabber,\n.text-annotation .arrow-line-grabber {\n  stroke: transparent;\n  stroke-width: 11px;\n  stroke-linecap: butt;\n}\n\n.line-measurement .grabber.start-grabber,\n.line-measurement .grabber.end-grabber {\n  stroke-linecap: square;\n}\n\n.circle-measurement .stroke-grabber {\n  stroke: transparent;\n  stroke-width: 11px;\n  fill: none;\n}\n\n.circle-measurement .fill-grabber {\n  fill: transparent;\n  stroke: none;\n}\n\n.text-annotation .arrow-head-grabber {\n  stroke: transparent;\n  fill: transparent;\n}\n\n/*---------- Text Anchor & Delete Button ----------*/\n\n.measurement-layer-base .text-anchor {\n  /* Zero-size flexbox allows us to center text without using transforms,\n  which can lead to sub-pixel positioning (blurry lines). */\n  position: absolute;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 0px;\n  height: 0px;\n}\n\n.measurement-layer-base .text-box {\n  position: relative;\n  display: flex;\n}\n\n.measurement-layer-base .delete-button {\n  position: absolute;\n  right: -18px;\n  background-color: transparent;\n  border-radius: 0;\n  border-style: none;\n  outline: none;\n  width: 18px;\n  height: 100%;\n  top: 0;\n  margin: 0;\n  padding: 0;\n  transition: background-color 0.2s, border-color 0.2s;\n}\n\n.measurement-layer-base .delete-button-svg {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  width: 15px;\n  height: 15px;\n}\n\n.measurement-layer-base.any-dragged .delete-button-svg,\n.measurement-layer-base.any-mode-on .delete-button-svg {\n  background-color: transparent;\n  border-color: transparent;\n}\n\n.measurement-layer-base .delete-button-icon {\n  stroke: transparent;\n  stroke-width: 2px;\n  stroke-linecap: square;\n  fill: none;\n  transition: stroke 0.2s;\n}\n\n.measurement-layer-base.any-dragged .delete-button-icon,\n.measurement-layer-base.any-mode-on .delete-button-icon {\n  stroke: transparent;\n}\n\n/*---------- Cursors ----------*/\n\n.line-measurement .mid-grabber,\n.circle-measurement .fill-grabber,\n.text-annotation .arrow-line-grabber,\n.measurement-layer-base.line-mid-dragged,\n.measurement-layer-base.circle-fill-dragged,\n.measurement-layer-base.arrow-line-dragged {\n  cursor: pointer;\n}\n\n.line-measurement .start-grabber,\n.line-measurement .end-grabber,\n.circle-measurement .stroke-grabber,\n.text-annotation .text,\n.text-annotation .arrow-head-grabber,\n.measurement-layer-base.line-start-dragged,\n.measurement-layer-base.line-end-dragged,\n.measurement-layer-base.circle-stroke-dragged,\n.measurement-layer-base.arrow-head-dragged,\n.measurement-layer-base.text-dragged,\n.measurement-layer-base .delete-button {\n  cursor: pointer;\n}\n\n.text-annotation.editable .text {\n  cursor: text;\n}\n\n/*---------- Pointer Events & Drag ----------*/\n\n.line-measurement,\n.line-measurement .line,\n.circle-measurement,\n.circle-measurement .circle,\n.text-annotation,\n.text-annotation .arrow-line,\n.measurement-svg {\n  pointer-events: none;\n}\n\n.measurement-layer-base .grabber-group {\n  pointer-events: painted;\n}\n\n.measurement-layer-base .text,\n.measurement-layer-base .arrow-head-grabber,\n.measurement-layer-base .arrow-line-grabber,\n.measurement-layer-base .text-box,\n.measurement-layer-base .text-anchor.button-showing .delete-button,\n.measurement-layer-base .editable .delete-button,\n.measurement-layer-base.any-dragged .grabber-group .start-grabber.dragged,\n.measurement-layer-base.any-dragged .grabber-group .mid-grabber.dragged,\n.measurement-layer-base.any-dragged .grabber-group .end-grabber.dragged,\n.measurement-layer-base.any-dragged .grabber-group .fill-grabber.dragged,\n.measurement-layer-base.any-dragged .grabber-group .stroke-grabber.dragged,\n.measurement-layer-base.any-dragged .arrow-head-grabber.dragged,\n.measurement-layer-base.any-dragged .arrow-line-grabber.dragged {\n  pointer-events: auto;\n}\n\n.measurement-layer-base.any-dragged .grabber-group,\n.measurement-layer-base.any-dragged .text,\n.measurement-layer-base.any-dragged .arrow-head-grabber,\n.measurement-layer-base.any-dragged .arrow-line-grabber,\n.measurement-layer-base.any-dragged .text-box,\n.measurement-layer-base.any-dragged .delete-button,\n.measurement-layer-base.any-mode-on .grabber-group,\n.measurement-layer-base.any-mode-on .text,\n.measurement-layer-base.any-mode-on .arrow-head-grabber,\n.measurement-layer-base.any-mode-on .arrow-line-grabber,\n.measurement-layer-base.any-mode-on .text-box,\n.measurement-layer-base .delete-button {\n  pointer-events: none;\n}\n", ""]);

// exports


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(12);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(4)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!./MeasurementLayer.css", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!./MeasurementLayer.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(13);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(4)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!./MeasurementLayerBase.css", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!./MeasurementLayerBase.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 16 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map