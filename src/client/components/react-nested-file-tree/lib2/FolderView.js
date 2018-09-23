'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FileView = require('./FileView');

var _FileView2 = _interopRequireDefault(_FileView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FolderView = function (_Component) {
  _inherits(FolderView, _Component);

  function FolderView(props) {
    _classCallCheck(this, FolderView);

    var _this = _possibleConstructorReturn(this, (FolderView.__proto__ || Object.getPrototypeOf(FolderView)).call(this, props));

    _this.state = {
      open: props.expended || false
    };
    return _this;
  }

  _createClass(FolderView, [{
    key: 'toggleFolder',
    value: function toggleFolder() {
      var _this2 = this;

      var open = this.state.open;
      var _props = this.props,
          name = _props.name,
          parentPath = _props.parentPath,
          folderObj = _props.folderObj;

      var currentPath = parentPath + '/' + name;

      this.setState({ open: !open }, function () {
        var fn = _this2.props.folderClickHandler;
        fn && fn(name, currentPath, folderObj);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          level = _props2.level,
          name = _props2.name,
          parentPath = _props2.parentPath,
          folderObj = _props2.folderObj,
          maxFolderLevel = _props2.maxFolderLevel,
          expended = _props2.expended,
          folderTemplate = _props2.folderTemplate,
          fileTemplate = _props2.fileTemplate,
          fileClassName = _props2.fileClassName,
          folderClassName = _props2.folderClassName,
          fileClickHandler = _props2.fileClickHandler,
          selectedFilePath = _props2.selectedFilePath,
          folderClickHandler = _props2.folderClickHandler;
      var open = this.state.open;

      var styl = open ? { 'display': 'block' } : { 'display': 'none' };
      var cns = (folderClassName || '') + ' subFolder';
      var passedFolderProps = {
        maxFolderLevel: maxFolderLevel,
        expended: expended,
        folderTemplate: folderTemplate,
        fileTemplate: fileTemplate,
        fileClickHandler: fileClickHandler,
        fileClassName: fileClassName,
        folderClassName: folderClassName,
        selectedFilePath: selectedFilePath,
        folderClickHandler: folderClickHandler
      };

      return _react2.default.createElement(
        'li',
        { key: 'folder-' + name, className: open ? 'open ' + cns : cns },
        folderTemplate && folderTemplate({
          name: name,
          folderObj: folderObj,
          currentPath: parentPath + '/' + name,
          onclick: this.toggleFolder.bind(this)
        }) || _react2.default.createElement(
          'a',
          { onClick: this.toggleFolder.bind(this) },
          '/',
          name
        ),
        _react2.default.createElement(
          'ul',
          { style: styl, 'data-level': level },
          folderObj && folderObj['_contents'].map(function (f) {
            return _react2.default.createElement(_FileView2.default, {
              key: 'file-' + f.path,
              file: f,
              fileTemplate: fileTemplate,
              fileClickHandler: fileClickHandler,
              fileClassName: fileClassName,
              selectedFilePath: selectedFilePath });
          }),
          parseInt(maxFolderLevel) && maxFolderLevel > level || isNaN(parseInt(maxFolderLevel)) ? folderObj && Object.keys(folderObj).filter(function (k) {
            return k !== '_contents';
          }).map(function (prop) {
            return _react2.default.createElement(FolderView, _extends({
              key: 'folder-' + name + '-' + prop,
              level: level + 1,
              name: prop,
              parentPath: parentPath + '/' + name,
              folderObj: folderObj[prop]
            }, passedFolderProps));
          }) : _react2.default.createElement(
            'span',
            { className: 'more' },
            '...'
          )
        )
      );
    }
  }]);

  return FolderView;
}(_react.Component);

exports.default = FolderView;