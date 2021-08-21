webpackJsonp([5], {
    1053: function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        function a(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        function o(e, t) {
            if (!e)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
        }
        function l(e, t) {
            if ("function" != typeof t && null !== t)
                throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }),
            t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var u = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1,
                    r.configurable = !0,
                    "value"in r && (r.writable = !0),
                    Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n),
                r && e(t, r),
                t
            }
        }()
          , c = n(1)
          , i = r(c)
          , f = n(2)
          , s = (r(f),
        n(12))
          , p = n(1102)
          , d = n(231)
          , y = n(378)
          , h = n(1103)
          , v = r(h)
          , b = n(1115)
          , m = r(b)
          , g = i.default.createElement(y.BoxHeader, null, "Новости")
          , _ = function(e) {
            function t() {
                return a(this, t),
                o(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
            }
            return l(t, e),
            u(t, [{
                key: "componentWillMount",
                value: function() {
                    var e = this.props
                      , t = e.news
                      , n = e.fetchNews;
                    t || n()
                }
            }, {
                key: "render",
                value: function() {
                    var e = this.props.news;
                    return i.default.createElement(d.Fade, null, i.default.createElement(y.Box, {
                        className: "xbox_news"
                    }, g, i.default.createElement(y.BoxBody, null, i.default.createElement(v.default, {
                        name: "news",
                        data: e,
                        view: {
                            wrapper: function(e) {
                                var t = e.children;
                                return i.default.createElement("div", {
                                    className: "news"
                                }, t)
                            },
                            component: m.default
                        },
                        length: 5
                    }))))
                }
            }]),
            t
        }(c.Component)
          , O = function(e) {
            return {
                news: e.news
            }
        };
        t.default = (0,
        s.connect)(O, {
            fetchNews: p.fetchNews
        })(_)
    },
    1084: function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.changePage = t.changeFilters = t.changeOrders = t.removeTable = t.initTable = void 0;
        var r = n(379);
        t.initTable = function(e) {
            return {
                type: r.AT.TABLE_INIT,
                payload: new Promise(function(t) {
                    t(e)
                }
                )
            }
        }
        ,
        t.removeTable = function(e) {
            return {
                type: r.AT.TABLE_REMOVE,
                payload: new Promise(function(t) {
                    t(e)
                }
                )
            }
        }
        ,
        t.changeOrders = function(e) {
            return {
                type: r.AT.TABLE_CHANGE_ORDERS,
                payload: new Promise(function(t) {
                    t(e)
                }
                )
            }
        }
        ,
        t.changeFilters = function(e) {
            return {
                type: r.AT.TABLE_CHANGE_FILTERS,
                payload: new Promise(function(t) {
                    t(e)
                }
                )
            }
        }
        ,
        t.changePage = function(e) {
            return {
                type: r.AT.TABLE_CHANGE_PAGE,
                payload: new Promise(function(t) {
                    t(e)
                }
                )
            }
        }
    },
    1102: function(e, t, n) {
        "use strict";
        function r() {
            var e = (0,
            a.post)(l.URL, (0,
            o.stringify)({
                modules: "news",
                action: "getNewsItems"
            }));
            return {
                type: l.AT.FETCH_NEWS,
                payload: e
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        t.fetchNews = r;
        var a = n(79)
          , o = n(96)
          , l = n(22)
    },
    1103: function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        function a(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        function o(e, t) {
            if (!e)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
        }
        function l(e, t) {
            if ("function" != typeof t && null !== t)
                throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }),
            t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var u = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n)
                    Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        }
          , c = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1,
                    r.configurable = !0,
                    "value"in r && (r.writable = !0),
                    Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n),
                r && e(t, r),
                t
            }
        }()
          , i = n(1)
          , f = r(i)
          , s = n(2)
          , p = (r(s),
        n(12))
          , d = n(1104)
          , y = r(d)
          , h = n(1084)
          , v = function(e) {
            function t() {
                return a(this, t),
                o(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
            }
            return l(t, e),
            c(t, [{
                key: "componentWillMount",
                value: function() {
                    var e = this.props
                      , t = e.tables
                      , n = e.name;
                    if (!t[n]) {
                        var r = this.props
                          , a = r.orders
                          , o = r.filters
                          , l = void 0 === o ? [{
                            columnValue: ""
                        }] : o
                          , u = r.length;
                        (0,
                        r.initTable)({
                            name: n,
                            orders: a,
                            filters: l,
                            length: u,
                            page: 1
                        })
                    }
                }
            }, {
                key: "componentWillUnmount",
                value: function() {
                    var e = this.props
                      , t = e.destroyOnUnmount
                      , n = e.name
                      , r = e.removeTable;
                    t && r(n)
                }
            }, {
                key: "render",
                value: function() {
                    var e = this.props
                      , t = e.tables
                      , n = e.name
                      , r = e.data
                      , a = e.columns
                      , o = e.head
                      , l = void 0 === o || o
                      , c = e.view
                      , i = e.locale
                      , s = t[n];
                    return s ? f.default.createElement(y.default, u({
                        head: l,
                        name: n,
                        columns: a,
                        data: r,
                        view: c,
                        locale: i ? i + "table." : null
                    }, s)) : null
                }
            }]),
            t
        }(i.Component);
        v.defaultProps = {
            destroyOnUnmount: !0,
            length: 10
        };
        var b = function(e) {
            return {
                tables: e.tables
            }
        };
        t.default = (0,
        p.connect)(b, {
            initTable: h.initTable,
            removeTable: h.removeTable
        })(v)
    },
    1104: function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        function a(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        function o(e, t) {
            if (!e)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
        }
        function l(e, t) {
            if ("function" != typeof t && null !== t)
                throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }),
            t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var u = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n)
                    Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        }
          , c = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1,
                    r.configurable = !0,
                    "value"in r && (r.writable = !0),
                    Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n),
                r && e(t, r),
                t
            }
        }()
          , i = n(1)
          , f = r(i)
          , s = n(2)
          , p = (r(s),
        n(12))
          , d = n(1105)
          , y = r(d)
          , h = n(1110)
          , v = r(h)
          , b = n(1111)
          , m = r(b)
          , g = n(1084)
          , _ = n(1114)
          , O = function(e) {
            function t() {
                var e, n, r, l;
                a(this, t);
                for (var u = arguments.length, c = Array(u), i = 0; i < u; i++)
                    c[i] = arguments[i];
                return n = r = o(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(c))),
                r.state = {
                    data: null,
                    columns: null
                },
                r.sortData = function(e) {
                    var t = e.data
                      , n = e.orders
                      , r = e.columns;
                    return t.sort((0,
                    _.comparator)(n, r))
                }
                ,
                r.handleData = function(e) {
                    var t = e.data
                      , n = e.filters
                      , a = e.orders
                      , o = e.columns
                      , l = e.length
                      , u = e.page;
                    o && (o = o.filter(function(e) {
                        return !e.disabled
                    })),
                    t && (n && (t = (0,
                    _.filter)(t, n)),
                    a && (t = r.sortData({
                        data: t,
                        orders: a,
                        columns: o
                    })),
                    l = Math.ceil(t.length / l),
                    u > l && r.changePage(l || 1)),
                    r.setState({
                        columns: o,
                        data: t
                    })
                }
                ,
                r.changePage = function(e) {
                    var t = r.props
                      , n = t.name;
                    (0,
                    t.changePage)({
                        name: n,
                        page: e
                    })
                }
                ,
                l = n,
                o(r, l)
            }
            return l(t, e),
            c(t, [{
                key: "componentWillMount",
                value: function() {
                    this.handleData(u({}, this.props))
                }
            }, {
                key: "componentWillReceiveProps",
                value: function(e) {
                    this.handleData(e)
                }
            }, {
                key: "render",
                value: function() {
                    var e = this.props
                      , t = e.view
                      , n = e.head
                      , r = e.name
                      , a = e.orders
                      , o = e.page
                      , l = e.length
                      , u = e.locale
                      , c = this.state
                      , i = c.columns
                      , s = c.data;
                    return f.default.createElement("div", null, t ? f.default.createElement(v.default, {
                        data: s,
                        page: o,
                        length: l,
                        view: t
                    }) : f.default.createElement(y.default, {
                        head: n,
                        name: r,
                        data: s,
                        page: o,
                        length: l,
                        columns: i,
                        orders: a,
                        locale: u
                    }), f.default.createElement(m.default, {
                        data: s,
                        page: o,
                        size: l,
                        onChange: this.changePage
                    }))
                }
            }]),
            t
        }(i.Component);
        t.default = (0,
        p.connect)(null, {
            changePage: g.changePage
        })(O)
    },
    1105: function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = n(1)
          , o = r(a)
          , l = n(2)
          , u = (r(l),
        n(1106))
          , c = r(u)
          , i = n(1108)
          , f = r(i)
          , s = function(e) {
            var t = e.name
              , n = e.columns
              , r = e.orders
              , a = e.data
              , l = e.length
              , u = e.page
              , i = e.head
              , s = e.locale;
            return o.default.createElement("div", {
                className: "table"
            }, o.default.createElement("table", null, i && o.default.createElement(c.default, {
                name: t,
                columns: n,
                orders: r,
                locale: s
            }), o.default.createElement(f.default, {
                data: a,
                columns: n,
                page: u,
                length: l,
                locale: s
            })))
        };
        t.default = s
    },
    1106: function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        function a(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        function o(e, t) {
            if (!e)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
        }
        function l(e, t) {
            if ("function" != typeof t && null !== t)
                throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }),
            t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var u = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n)
                    Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        }
          , c = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1,
                    r.configurable = !0,
                    "value"in r && (r.writable = !0),
                    Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n),
                r && e(t, r),
                t
            }
        }()
          , i = n(1)
          , f = r(i)
          , s = n(2)
          , p = (r(s),
        n(1107))
          , d = r(p)
          , y = function(e) {
            function t() {
                return a(this, t),
                o(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
            }
            return l(t, e),
            c(t, [{
                key: "render",
                value: function() {
                    var e = this.props
                      , t = e.columns
                      , n = e.name
                      , r = e.orders
                      , a = e.locale;
                    return f.default.createElement("thead", null, f.default.createElement("tr", null, t.map(function(e, t) {
                        return f.default.createElement(d.default, u({
                            key: t,
                            tableName: n,
                            orders: r,
                            locale: a
                        }, e))
                    })))
                }
            }]),
            t
        }(i.Component);
        t.default = y
    },
    1107: function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        function a(e, t) {
            var n = {};
            for (var r in e)
                t.indexOf(r) >= 0 || Object.prototype.hasOwnProperty.call(e, r) && (n[r] = e[r]);
            return n
        }
        function o(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        function l(e, t) {
            if (!e)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
        }
        function u(e, t) {
            if ("function" != typeof t && null !== t)
                throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }),
            t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var c = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n)
                    Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        }
          , i = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1,
                    r.configurable = !0,
                    "value"in r && (r.writable = !0),
                    Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n),
                r && e(t, r),
                t
            }
        }()
          , f = n(1)
          , s = r(f)
          , p = n(2)
          , d = (r(p),
        n(12))
          , y = n(59)
          , h = n(1084)
          , v = function(e) {
            function t() {
                var e, n, r, a;
                o(this, t);
                for (var u = arguments.length, c = Array(u), i = 0; i < u; i++)
                    c[i] = arguments[i];
                return n = r = l(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(c))),
                r.orderBy = function() {
                    var e = r.props
                      , t = e.orders
                      , n = e.name;
                    if (t)
                        for (var a = t.length; a--; )
                            if (t[a].name === n)
                                return !t[a].reverse;
                    return !1
                }
                ,
                a = n,
                l(r, a)
            }
            return u(t, e),
            i(t, [{
                key: "render",
                value: function() {
                    var e = this
                      , t = this.props
                      , n = t.tableName
                      , r = t.name
                      , o = t.sortable
                      , l = t.th;
                    l = void 0 === l ? {} : l;
                    var u = l.className
                      , i = l.onClick
                      , f = l.data
                      , p = a(l, ["className", "onClick", "data"])
                      , d = t.locale
                      , h = t.changeOrders;
                    return u && (u = u(this.props)),
                    o && (i = function() {
                        h({
                            name: n,
                            orders: [{
                                name: r,
                                reverse: e.orderBy()
                            }]
                        })
                    }
                    ,
                    u += " sortable"),
                    "" !== f && (f = d && r ? s.default.createElement(y.Translate, {
                        value: d + "th." + r
                    }) : f ? s.default.createElement(y.Translate, {
                        value: f
                    }) : ""),
                    s.default.createElement("th", c({}, p, {
                        className: u,
                        onClick: i
                    }), f)
                }
            }]),
            t
        }(f.Component);
        t.default = (0,
        d.connect)(null, {
            changeOrders: h.changeOrders
        })(v)
    },
    1108: function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        function a(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        function o(e, t) {
            if (!e)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
        }
        function l(e, t) {
            if ("function" != typeof t && null !== t)
                throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }),
            t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var u = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1,
                    r.configurable = !0,
                    "value"in r && (r.writable = !0),
                    Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n),
                r && e(t, r),
                t
            }
        }()
          , c = n(1)
          , i = r(c)
          , f = n(2)
          , s = (r(f),
        n(59))
          , p = n(1109)
          , d = r(p)
          , y = function(e) {
            function t() {
                var e, n, r, l;
                a(this, t);
                for (var u = arguments.length, c = Array(u), i = 0; i < u; i++)
                    c[i] = arguments[i];
                return n = r = o(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(c))),
                r._checkData = function(e) {
                    return e ? Array.isArray(e) ? e.length <= 0 && "errors.noData" : "errors.invalidData" : "errors.loading"
                }
                ,
                l = n,
                o(r, l)
            }
            return l(t, e),
            u(t, [{
                key: "render",
                value: function() {
                    var e = this.props
                      , t = e.data
                      , n = e.columns
                      , r = e.page
                      , a = e.length
                      , o = this._checkData(t);
                    if (o) {
                        var l = n.length;
                        return i.default.createElement("tbody", null, i.default.createElement("tr", null, i.default.createElement("td", {
                            colSpan: l,
                            className: "text-center"
                        }, s.I18n.t(o))))
                    }
                    return i.default.createElement("tbody", null, t.map(function(e, t) {
                        if (t >= a * (r - 1) && t < a * r)
                            return i.default.createElement(d.default, {
                                key: t,
                                columns: n,
                                item: e,
                                index: t
                            })
                    }))
                }
            }]),
            t
        }(c.Component);
        t.default = y
    },
    1109: function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        function a(e, t) {
            var n = {};
            for (var r in e)
                t.indexOf(r) >= 0 || Object.prototype.hasOwnProperty.call(e, r) && (n[r] = e[r]);
            return n
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n)
                    Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        }
          , l = n(1)
          , u = r(l)
          , c = n(2)
          , i = (r(c),
        function(e) {
            var t = e.columns
              , n = e.item;
            return u.default.createElement("tr", null, t.map(function(e, t) {
                var r = e.name
                  , l = e.td;
                l = void 0 === l ? {} : l;
                var c = l.className
                  , i = l.data
                  , f = a(l, ["className", "data"]);
                return i = i ? i(n) : n[r],
                c && (c = c(n)),
                u.default.createElement("td", o({
                    key: t,
                    className: c
                }, f), i)
            }))
        }
        );
        t.default = i
    },
    1110: function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        function a(e, t) {
            var n = {};
            for (var r in e)
                t.indexOf(r) >= 0 || Object.prototype.hasOwnProperty.call(e, r) && (n[r] = e[r]);
            return n
        }
        function o(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        function l(e, t) {
            if (!e)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
        }
        function u(e, t) {
            if ("function" != typeof t && null !== t)
                throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }),
            t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var c = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n)
                    Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        }
          , i = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1,
                    r.configurable = !0,
                    "value"in r && (r.writable = !0),
                    Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n),
                r && e(t, r),
                t
            }
        }()
          , f = n(1)
          , s = r(f)
          , p = n(2)
          , d = (r(p),
        n(59))
          , y = function(e) {
            function t() {
                var e, n, r, a;
                o(this, t);
                for (var u = arguments.length, c = Array(u), i = 0; i < u; i++)
                    c[i] = arguments[i];
                return n = r = l(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(c))),
                r.checkData = function(e) {
                    return e ? e.length ? null : "errors.noData" : "errors.loading"
                }
                ,
                a = n,
                l(r, a)
            }
            return u(t, e),
            i(t, [{
                key: "render",
                value: function() {
                    var e = this.props
                      , t = e.data
                      , n = e.view
                      , r = n.wrapper
                      , o = n.component
                      , l = a(n, ["wrapper", "component"])
                      , u = e.page
                      , i = e.length
                      , p = this.checkData(t);
                    return p ? s.default.createElement("div", {
                        className: "text-center"
                    }, d.I18n.t(p)) : (0,
                    f.createElement)(r, null, t.map(function(e, t) {
                        var n = e.children
                          , r = a(e, ["children"]);
                        if (t >= i * (u - 1) && t < i * u)
                            return (0,
                            f.createElement)(o, c({}, r, l, {
                                key: t
                            }), n)
                    }))
                }
            }]),
            t
        }(f.Component);
        t.default = y
    },
    1111: function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        function a(e, t) {
            var n = {};
            for (var r in e)
                t.indexOf(r) >= 0 || Object.prototype.hasOwnProperty.call(e, r) && (n[r] = e[r]);
            return n
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n)
                    Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        }
          , l = n(1)
          , u = r(l)
          , c = n(2)
          , i = (r(c),
        n(1112))
          , f = r(i)
          , s = function(e) {
            var t = e.data
              , n = e.size
              , r = a(e, ["data", "size"]);
            return n = t ? Math.ceil(t.length / n) : null,
            u.default.createElement(f.default, o({
                size: n
            }, r))
        };
        t.default = s
    },
    1112: function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        function a(e) {
            if (Array.isArray(e)) {
                for (var t = 0, n = Array(e.length); t < e.length; t++)
                    n[t] = e[t];
                return n
            }
            return Array.from(e)
        }
        function o(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        function l(e, t) {
            if (!e)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
        }
        function u(e, t) {
            if ("function" != typeof t && null !== t)
                throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }),
            t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var c = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n)
                    Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        }
          , i = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1,
                    r.configurable = !0,
                    "value"in r && (r.writable = !0),
                    Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n),
                r && e(t, r),
                t
            }
        }()
          , f = n(1)
          , s = r(f)
          , p = n(2)
          , d = (r(p),
        n(1113))
          , y = r(d)
          , h = function(e) {
            function t() {
                var e, n, r, u;
                o(this, t);
                for (var i = arguments.length, f = Array(i), p = 0; p < i; p++)
                    f[p] = arguments[p];
                return n = r = l(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(f))),
                r.handleChange = function(e) {
                    r.props.onChange(e)
                }
                ,
                r.renderPages = function(e, t, n, o) {
                    for (var l = r.props, u = l.page, i = l.size, f = l.pageProps, p = l.separatorProps, d = [], h = e; h < t; h++)
                        d = [].concat(a(d), [s.default.createElement(y.default, c({
                            key: h
                        }, f, {
                            isActive: u === h,
                            onClick: r.handleChange.bind(null, h)
                        }), h)]);
                    return n && (d = [s.default.createElement(y.default, c({
                        key: "first"
                    }, f, {
                        isActive: 1 === u,
                        onClick: r.handleChange.bind(null, 1)
                    }), "1"), s.default.createElement(y.default, c({
                        key: "firstDots"
                    }, p))].concat(a(d))),
                    o && (d = [].concat(a(d), [s.default.createElement(y.default, c({
                        key: "lastDots"
                    }, p)), s.default.createElement(y.default, c({
                        key: "last"
                    }, f, {
                        isActive: u === i,
                        onClick: r.handleChange.bind(null, i)
                    }), i)])),
                    d
                }
                ,
                r.pages = function() {
                    var e = r.props
                      , t = e.size
                      , n = e.step
                      , a = e.page;
                    return t < 2 * n + 6 ? r.renderPages(1, t + 1) : a < 2 * n + 1 ? r.renderPages(1, 2 * n + 4, !1, !0) : a > t - 2 * n ? r.renderPages(t - 2 * n - 2, t + 1, !0) : r.renderPages(a - n, a + n + 1, !0, !0)
                }
                ,
                r.prev = function() {
                    var e = r.props.page;
                    e > 1 && r.handleChange(e - 1)
                }
                ,
                r.next = function() {
                    var e = r.props
                      , t = e.page;
                    t < e.size && r.handleChange(t + 1)
                }
                ,
                u = n,
                l(r, u)
            }
            return u(t, e),
            i(t, [{
                key: "render",
                value: function() {
                    var e = this.props
                      , t = e.size
                      , n = e.pageProps
                      , r = e.page;
                    return !t || t < 2 ? null : s.default.createElement("div", {
                        className: "dataPages"
                    }, s.default.createElement(y.default, c({}, n, {
                        disabled: r <= 1,
                        onClick: this.prev
                    }), "<"), this.pages(), s.default.createElement(y.default, c({}, n, {
                        disabled: r >= t,
                        onClick: this.next
                    }), ">"))
                }
            }]),
            t
        }(f.Component);
        h.defaultProps = {
            separatorProps: {
                tag: "button",
                disabled: !0,
                children: "..."
            },
            page: 1,
            step: 2
        },
        t.default = h
    },
    1113: function(e, t, n) {
        "use strict";
        function r(e, t) {
            var n = {};
            for (var r in e)
                t.indexOf(r) >= 0 || Object.prototype.hasOwnProperty.call(e, r) && (n[r] = e[r]);
            return n
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = n(1)
          , o = n(2)
          , l = function(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }(o)
          , u = function(e) {
            var t = e.tag
              , n = e.children
              , o = e.isActive
              , l = e.activeClass
              , u = e.inactiveClass
              , c = r(e, ["tag", "children", "isActive", "activeClass", "inactiveClass"]);
            return o ? c.className += " " + l : u && (c.className += " " + u),
            (0,
            a.createElement)(t, c, n)
        };
        u.propTypes = {
            activeClass: l.default.string,
            children: l.default.node,
            className: l.default.string,
            tag: l.default.string
        },
        u.defaultProps = {
            tag: "button",
            className: "button button_default",
            activeClass: "button_active"
        },
        t.default = u
    },
    1114: function(e, t, n) {
        "use strict";
        function r(e, t, n) {
            var r = Object.prototype.hasOwnProperty
              , o = function(e) {
                var t = void 0 === e ? "undefined" : a(e);
                return e = "object" === t || "array" === t ? JSON.stringify(e) : "" + e,
                e.toLowerCase()
            };
            if (e && t && t.length > 0) {
                for (var l = t.length; l--; )
                    !function() {
                        var a = t[l]
                          , u = a.columnName
                          , c = a.columnValue;
                        c && (c = ("" + c).trim().toLowerCase(),
                        e = u ? e.filter(function(e) {
                            return !(!n || n[u] !== e[u]) || e[u] == c || void 0
                        }) : e.filter(function(e) {
                            for (var t in e)
                                if (r.call(e, t) && e[t] && o(e[t]).includes(c))
                                    return !0
                        }))
                    }();
                return e
            }
            return e
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        }
        : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }
        ;
        t.filter = r,
        t.comparator = function(e, t) {
            var n = function(e) {
                if (t) {
                    var n = t.find(function(t) {
                        var n = t.name
                          , r = t.compare;
                        return n === e && r
                    });
                    if (n)
                        return n.compare
                }
                return null
            }
              , r = function(e, t) {
                return "function" != typeof e && (e = function(e, t) {
                    return e === t ? 0 : e < t ? -1 : 1
                }
                ),
                t ? function(t, n) {
                    return -1 * e(t, n)
                }
                : e
            }
              , a = e.map(function(e) {
                var t = e.name
                  , a = e.reverse
                  , o = n(t);
                return {
                    name: t,
                    compare: r(o, a),
                    ownCompare: !!o
                }
            });
            return function(t, n) {
                var r = void 0
                  , o = e.length
                  , l = void 0
                  , u = void 0
                  , c = void 0
                  , i = void 0
                  , f = void 0;
                for (r = 0; r < o && (l = 0,
                u = a[r],
                c = u.name,
                u.ownCompare ? (i = t,
                f = n) : (i = t[c],
                f = n[c]),
                0 === (l = u.compare(i, f))); r++)
                    ;
                return l
            }
        }
    },
    1115: function(e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = n(1)
          , o = r(a)
          , l = n(2)
          , u = (r(l),
        n(53))
          , c = r(u);
        c.default.locale("ru");
        var i = function(e) {
            var t = e.data
              , n = e.attachment
              , r = e.title
              , a = e.timestamp;
            return n && (t = "<img src=" + n + " loading='lazy'>" + t),
            o.default.createElement("div", {
                className: "news__item"
            }, o.default.createElement("div", {
                className: "post"
            }, !!r && o.default.createElement("div", {
                className: "post__header"
            }, o.default.createElement("h3", null, r)), o.default.createElement("div", {
                className: "post__body",
                dangerouslySetInnerHTML: {
                    __html: t
                }
            }), o.default.createElement("div", {
                className: "post__footer"
            }, o.default.createElement("time", {
                className: "post__date"
            }, (0,
            c.default)(1e3 * a).format("LLLL")))))
        };
        t.default = i
    }
});
