webpackJsonp([24],{1054:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function a(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function s(e){return{servers:e.store.data.servers}}Object.defineProperty(t,"__esModule",{value:!0});var c=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=n(1),f=r(u),p=n(78),m=r(p),v=n(60),d=n(12),y=n(21),b=function(e){function t(){return o(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return l(t,e),c(t,[{key:"render",value:function(){var e=this.props,t=e.servers,n=e.params.serverID,r=e.children,o=(0,y.findByProp)(t,"id",parseInt(n));if(!o)return null;var i=location.pathname.split("/")[3],l=[{name:"Игроки",value:"players"}];return o.map&&(l=[].concat(a(l),[{name:"Карта",value:"map"}])),o.stats&&(l=[].concat(a(l),[{name:"Статистика",value:"stats"}])),o.bans&&(l=[].concat(a(l),[{name:"Баны",value:"bans"}])),f.default.createElement(m.default,{className:"animated",component:"div",transitionName:"example",transitionAppear:!0,transitionAppearTimeout:500,transitionEnterTimeout:500,transitionLeaveTimeout:500},f.default.createElement("div",{className:"xbox xbox_server"},f.default.createElement("div",{className:"xbox__header"},f.default.createElement("h4",null,o.hostname)),f.default.createElement("div",{className:"xbox__body"},f.default.createElement("div",{className:"server-navigation"},f.default.createElement("nav",{className:"nav nav-pills flex-column flex-md-row"},f.default.createElement(v.Link,{className:"nav-link text-md-center"+(i?"":" active"),to:"/servers/"+n},"Информация"),l.map(function(e,t){var r=e.name,a=e.value;return f.default.createElement(v.Link,{key:t,className:"nav-link text-md-center"+(i===a?" active":""),to:"/servers/"+n+"/"+a},r)}))),r)))}}]),t}(u.Component);b.contextTypes={router:u.PropTypes.object},t.default=(0,d.connect)(s)(b)}});