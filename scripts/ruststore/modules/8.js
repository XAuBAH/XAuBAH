webpackJsonp([8],{1050:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}function r(e,t){var n={};for(var a in e)t.indexOf(a)>=0||Object.prototype.hasOwnProperty.call(e,a)&&(n[a]=e[a]);return n}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function c(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),s=n(1),i=a(s),f=n(2),d=(a(f),n(12)),p=n(60),m=n(53),b=a(m),h=n(231),g=n(378),y=n(145),v=a(y),_=n(374),k=a(_),E=n(1078),O=a(E),w=n(1080),N=a(w),j=n(1081),T=a(j),P=n(1082),x=a(P),C=n(1083),M=a(C),S=n(148),I=n(377),B=n(21),F=i.default.createElement("div",{className:"xbox__header"},i.default.createElement("h4",null,"Обратная связь")),D=i.default.createElement("div",{className:"pull-right"},i.default.createElement(p.Link,{to:"/feedback/add",className:"btn btn-primary"},"Создать обращение")),L=i.default.createElement(T.default,null),R=function(e){function t(){var e,n,a,r;o(this,t);for(var c=arguments.length,u=Array(c),s=0;s<c;s++)u[s]=arguments[s];return n=a=l(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(u))),a.state={loading:!1},a._fetchTickets=function(){var e=a.props.fetchTickets;a.setState({loading:!0}),e().then(function(){a.setState({loading:!1})})},a._handleSuccess=function(e){var t=e.ticketID,n=e.status;a._fetchTickets(),(0,B.alertSuccess)("Обращение #"+t+" успешно "+(n?"закрыто":"открыто")+".")},r=n,l(a,r)}return c(t,e),u(t,[{key:"componentWillMount",value:function(){this.props.tickets||this._fetchTickets()}},{key:"render",value:function(){var e=this,t=this.props,n=t.changeFeedbackFilters,a=t.openTicket,o=t.closeTicket,l=t.user,c=t.tickets,u=t.filters,s=this.state.loading,f=[{title:"",data:function(e){var t=e.userImage,n=e.userName,a=e.steamID;return i.default.createElement(M.default,{steamID:a},i.default.createElement(x.default,{image:t,username:n}))},width:"1%"},{name:"userName",title:"Пользователь",data:function(e){var t=e.userName,n=e.steamID;return i.default.createElement(M.default,{steamID:n},t)},sort:!0,thSortingClass:"sorting"},{name:"subject",title:"Тема",data:function(e){var t=e.userNotice,n=e.staffNotice,a=e.ticketID,r=e.subject,o="";return t&&(o=l.permissions.feedbackModerator?" (не прочитано)":" (есть ответ)"),n&&(o=l.permissions.feedbackModerator?" (есть ответ)":" (не прочитано)"),i.default.createElement(p.Link,{to:"/feedback/"+a},""+r+o)},sort:!0,thSortingClass:"sorting"},{name:"edited",title:"Последний ответ",data:function(e){var t=e.status,n=e.warning,a=e.edited,r=(0,b.default)(1e3*a).fromNow();return t&&n?i.default.createElement("b",{className:"text-danger"},r):r},sort:!0,thSortingClass:"sorting"},{name:"status",title:"Состояние",width:"1%",data:function(t){var n=r(t,[]),l=t.ticketID,c=t.status;return i.default.createElement(N.default,{item:n,data:{ticketID:l},body:"Вы уверены что хотите "+(c?"закрыть":"открыть")+" обращение #"+l+"?",actionButton:{className:"btn "+(c?"btn-success":"btn-secondary")+" btn-block",title:c?"Закрыть обращение":"Открыть обращение",disabled:s},action:c?o:a,successCallback:e._handleSuccess,errorCallback:B.alertError},c?"Открыто":"Закрыто")},sort:!0,thSortingClass:"sorting"}];return i.default.createElement(h.Fade,null,i.default.createElement(g.Box,{className:"xbox_feedback"},F,i.default.createElement(g.BoxBody,null,l.loaded?[i.default.createElement("div",{key:0,className:"feedback-tools"},i.default.createElement(v.default,{className:"btn btn-success",loading:s,onClick:this._fetchTickets},"Обновить"),D),i.default.createElement(O.default,{key:1,filters:u,changeFilters:n}),i.default.createElement(k.default,{key:2,data:c,columns:f,pageLength:10,filters:u,order:[{name:"status",reverse:!0},{name:l.permissions.feedbackModerator?"staffNotice":"userNotice",reverse:!0},{name:"edited",reverse:!0}]})]:L)))}}]),t}(s.Component),A=function(e){var t=e.user,n=e.feedback,a=e.filters;return{user:t,tickets:n.list,filters:a.feedback}};t.default=(0,d.connect)(A,{changeFeedbackFilters:S.changeFeedbackFilters,fetchTickets:I.fetchTickets,openTicket:I.openTicket,closeTicket:I.closeTicket})(R)},1078:function(e,t,n){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),c=n(1),u=function(e){return e&&e.__esModule?e:{default:e}}(c),s=u.default.createElement("span",{className:"input-group-addon"},u.default.createElement("i",{className:"fa fa-search"})),i=function(e){function t(){return a(this,t),r(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return o(t,e),l(t,[{key:"render",value:function(){var e=this.props,t=e.filters,n=e.changeFilters,a=e.children;return u.default.createElement("div",{className:"form-group"},u.default.createElement("div",{className:"input-group"},s,u.default.createElement("input",{type:"search",className:"form-control",value:t[0].columnValue,placeholder:"Поиск",onChange:function(e){n({column:0,value:e.target.value})}}),a&&u.default.createElement("span",{className:"input-group-btn"},a)))}}]),t}(c.Component);t.default=i},1080:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}function r(e,t){var n={};for(var a in e)t.indexOf(a)>=0||Object.prototype.hasOwnProperty.call(e,a)&&(n[a]=e[a]);return n}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function c(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},s=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),i=n(1),f=a(i),d=n(37),p=n(145),m=a(p),b=function(e){function t(){o(this,t);var e=l(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return e._submit=function(){var t=e.props,n=t.action,a=t.successCallback,r=t.errorCallback,o=t.data,l=t.item;e.setState({loading:!0}),n(o).then(function(t){e.setState({loading:!1}),"success"===t.payload.data.status?(e._toggle(),a(l,t.payload.data)):r(t.payload.data.message)})},e._toggle=function(){e.setState({isOpen:!e.state.isOpen})},e.state={isOpen:!1,loading:!1},e}return c(t,e),s(t,[{key:"render",value:function(){var e=this.props,t=e.body,n=e.title,a=e.actionButton,o=e.confirmButton,l=o.confirmText,c=r(o,["confirmText"]),s=e.cancelButton,i=s.cancelText,p=r(s,["cancelText"]),b=e.children,h=this.state,g=h.loading,y=h.isOpen;return f.default.createElement("button",u({},a,{onClick:this._toggle}),b,f.default.createElement(d.Modal,{isOpen:y,backdrop:!g||"static",keyboard:!g,toggle:this._toggle},f.default.createElement("div",{className:"modal-header"},f.default.createElement("h5",{className:"modal-title"},n)),f.default.createElement(d.ModalBody,null,f.default.createElement("div",{className:"text-center"},t)),f.default.createElement(d.ModalFooter,null,f.default.createElement("button",u({},p,{disabled:g,onClick:this._toggle}),i),f.default.createElement("div",{className:"ml-auto"},f.default.createElement(m.default,u({},c,{loading:g,onClick:this._submit}),l)))))}}]),t}(i.Component);b.defaultProps={title:"Подтвердите действие",confirmButton:{className:"btn btn-success",confirmText:"Подтвердить"},cancelButton:{className:"btn btn-secondary",cancelText:"Отмена"},actionButton:{className:"btn btn-danger"},children:f.default.createElement("span",null,"Действие")},t.default=b},1081:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(1),r=function(e){return e&&e.__esModule?e:{default:e}}(a),o=r.default.createElement("div",{className:"text-center"},"Пожалуйста, авторизуйтесь на сайте."),l=function(){return o};t.default=l},1082:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(1),r=function(e){return e&&e.__esModule?e:{default:e}}(a),o=function(e){var t=e.image,n=e.username;return r.default.createElement("img",{className:"avatar",src:t||"//i.imgur.com/mj5N737.png",alt:'Изображение пользователя "'+n+'"',title:n,onError:function(e){e.target.src="//i.imgur.com/mj5N737.png"}})};t.default=o},1083:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(1),r=function(e){return e&&e.__esModule?e:{default:e}}(a),o=function(e){var t=e.steamID,n=e.children;return r.default.createElement("a",{href:"//steamcommunity.com/profiles/"+t,target:"_blank",rel:"noopener noreferrer"},n)};t.default=o}});