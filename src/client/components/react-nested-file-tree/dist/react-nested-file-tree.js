!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("react")):"function"==typeof define&&define.amd?define(["react"],t):"object"==typeof exports?exports.NestedFileTreeView=t(require("react")):e.NestedFileTreeView=t(e.React)}(this,function(e){return function(e){function t(r){if(l[r])return l[r].exports;var n=l[r]={exports:{},id:r,loaded:!1};return e[r].call(n.exports,n,n.exports,t),n.loaded=!0,n.exports}var l={};return t.m=e,t.c=l,t.p="",t(0)}([function(e,t,l){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=l(4),a=r(n);l(5),t.default=a.default},function(t,l){t.exports=e},function(e,t,l){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=l(1),a=r(n),o=function(e){var t=e.file,l=e.fileClickHandler,r=e.selectedFilePath,n=e.fileTemplate,o=(e.fileClassName||"")+" item",i=e.selectedClassName||"active",s=r===t.path?i+" "+o:o,f=function(){l&&l(t)};return a.default.createElement("li",{key:"file-"+t.path,className:s,onClick:f},n&&n({name:t.name})||a.default.createElement("a",null,"|__",t.name))};t.default=o},function(e,t,l){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var l=arguments[t];for(var r in l)Object.prototype.hasOwnProperty.call(l,r)&&(e[r]=l[r])}return e},s=function(){function e(e,t){for(var l=0;l<t.length;l++){var r=t[l];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,l,r){return l&&e(t.prototype,l),r&&e(t,r),t}}(),f=l(1),c=r(f),u=l(2),d=r(u),p=function(e){function t(e){n(this,t);var l=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return l.state={open:e.expended||!1},l}return o(t,e),s(t,[{key:"toggleFolder",value:function(){var e=this,t=this.state.open,l=this.props,r=l.name,n=l.parentPath,a=l.folderObj,o=n+"/"+r;this.setState({open:!t},function(){var t=e.props.folderClickHandler;t&&t(r,o,a)})}},{key:"render",value:function(){var e=this.props,l=e.level,r=e.name,n=e.parentPath,a=e.folderObj,o=e.maxFolderLevel,s=e.expended,f=e.folderTemplate,u=e.fileTemplate,p=e.fileClassName,m=e.folderClassName,y=e.fileClickHandler,h=e.selectedFilePath,b=e.folderClickHandler,v=this.state.open,P=v?{display:"block"}:{display:"none"},C=(m||"")+" subFolder",_={maxFolderLevel:o,expended:s,folderTemplate:f,fileTemplate:u,fileClickHandler:y,fileClassName:p,folderClassName:m,selectedFilePath:h,folderClickHandler:b};return c.default.createElement("li",{key:"folder-"+r,className:v?"open "+C:C},f&&f({name:r,folderObj:a,currentPath:n+"/"+r,onclick:this.toggleFolder.bind(this)})||c.default.createElement("a",{onClick:this.toggleFolder.bind(this)},"/",r),c.default.createElement("ul",{style:P,"data-level":l},a&&a._contents.map(function(e){return c.default.createElement(d.default,{key:"file-"+e.path,file:e,fileTemplate:u,fileClickHandler:y,fileClassName:p,selectedFilePath:h})}),parseInt(o)&&o>l||isNaN(parseInt(o))?a&&Object.keys(a).filter(function(e){return"_contents"!==e}).map(function(e){return c.default.createElement(t,i({key:"folder-"+r+"-"+e,level:l+1,name:e,parentPath:n+"/"+r,folderObj:a[e]},_))}):c.default.createElement("span",{className:"more"},"...")))}}]),t}(f.Component);t.default=p},function(e,t,l){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function n(e){var t=e.directory,l=e.maxFolderLevel,r=e.expended,n=e.className,o=e.fileClickHandler,s=e.folderClickHandler,c=e.fileClassName,d=e.folderClassName,p=e.selectedFilePath,m=e.selectedClassName,y=e.fileTemplate,h=e.folderTemplate,b={fileClickHandler:o,fileClassName:c,folderClassName:d,selectedFilePath:p,selectedClassName:m,fileTemplate:y};return i.default.createElement("ul",{"data-level":"0",className:n},t&&t._contents.map(function(e){return i.default.createElement(f.default,a({key:"root-file-"+e.path,file:e},b))}),t&&Object.keys(t).filter(function(e){return"_contents"!==e}).map(function(e){return i.default.createElement(u.default,a({key:"root-folder-"+e,level:1,expended:r,maxFolderLevel:l,folderObj:t[e],name:e,parentPath:"",folderClickHandler:s,folderTemplate:h},b))}))}Object.defineProperty(t,"__esModule",{value:!0});var a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var l=arguments[t];for(var r in l)Object.prototype.hasOwnProperty.call(l,r)&&(e[r]=l[r])}return e},o=l(1),i=r(o),s=l(2),f=r(s),c=l(3),u=r(c);n.propTypes={directory:o.PropTypes.object.isRequired,maxFolderLevel:o.PropTypes.number,expended:o.PropTypes.bool,className:o.PropTypes.string,fileClickHandler:o.PropTypes.func,folderClickHandler:o.PropTypes.func,fileClassName:o.PropTypes.string,folderClassName:o.PropTypes.string,selectedFilePath:o.PropTypes.string,selectedClassName:o.PropTypes.string,folderTemplate:o.PropTypes.func,fileTemplate:o.PropTypes.func},t.default=n},function(e,t){}])});
//# sourceMappingURL=react-nested-file-tree.js.map