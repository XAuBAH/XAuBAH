webpackJsonp([19], {
    1046: function(e, t, n) {
        "use strict";

        function a(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }

        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        function o(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
        }

        function u(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }

        function l(e) {
            var t = e.user,
                n = e.filters;
            return {
                bonuses: t.bonuses,
                filters: n.bonuses
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var s = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var a = t[n];
                        a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(e, a.key, a)
                    }
                }
                return function(t, n, a) {
                    return n && e(t.prototype, n), a && e(t, a), t
                }
            }(),
            i = n(1),
            c = a(i),
            f = n(78),
            d = a(f),
            p = n(12),
            m = n(146),
            h = n(374),
            y = a(h),
            b = n(145),
            v = a(b),
            E = n(1092),
            _ = a(E),
            g = c.default.createElement("div", {
                key: 0
            }, "Изменение администратором"),
            k = c.default.createElement("div", {
                className: "xbox__header"
            }, c.default.createElement("h4", null, "Бонусы")),
            B = c.default.createElement(_.default, null),
            w = function(e) {
                function t() {
                    r(this, t);
                    var e = o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
                    return e._fetchBonuses = function() {
                        e.setState({
                            loading: !0
                        }), e.props.fetchBonuses().then(function() {
                            e.setState({
                                loading: !1
                            })
                        })
                    }, e._renderData = function(e) {
                        var t = e.data;
                        switch (e.type) {
                            case 1:
                            case 2:
                            case 3:
                                return [g, c.default.createElement("div", {
                                    key: 1
                                }, "с " + t[0] + " RUB на " + t[1] + " RUB")];
                            case 4:
                                return [c.default.createElement("div", {
                                    key: 0
                                }, "Отмена покупки #" + t[0]), c.default.createElement("div", {
                                    key: 1
                                }, "Товар: " + (t[2] > 1 ? t[2] + " x " : "") + '"' + t[1] + '"')];
                            case 5:
                            case 6:
                                return [c.default.createElement("div", {
                                    key: 0
                                }, "Отмена администратором покупки #" + t[0]), c.default.createElement("div", {
                                    key: 1
                                }, "Товар: " + (t[2] > 1 ? t[2] + " x " : "") + '"' + t[1] + '"')];
                            case 7:
                                return [c.default.createElement("div", {
                                    key: 0
                                }, 'Бонус по промокоду "' + t[0] + '"'), c.default.createElement("div", {
                                    key: 1
                                }, "с " + t[1] + " RUB на " + t[2] + " RUB")];
                            case 8:
                                return [c.default.createElement("div", {
                                    key: 0
                                }, "Зачисление начального бонуса"), c.default.createElement("div", {
                                    key: 1
                                }, "с " + t[0] + " RUB на " + t[1] + " RUB")];
                            case 9:
                                return [c.default.createElement("div", {
                                    key: 0
                                }, "Перевод средств #" + t[3]), c.default.createElement("div", {
                                    key: 1
                                }, "с " + t[1] + " RUB на " + t[2] + " RUB")];
                            case 10:
                                return [c.default.createElement("div", {
                                    key: 0
                                }, c.default.createElement("span", null, "Бонус за платеж " + t[0])), c.default.createElement("div", {
                                    key: 1
                                }, "с " + t[1] + " RUB на " + t[2] + " RUB")];
                            case 11:
                                return [c.default.createElement("div", {
                                    key: 0
                                }, c.default.createElement("span", null, "Бонус за подписку на наш VK")), c.default.createElement("div", {
                                    key: 1
                                }, "с " + t[0] + " RUB на " + t[1] + " RUB")];
                            case 12:
                                return [c.default.createElement("div", {
                                    key: 0
                                }, c.default.createElement("span", null, "Бонус за подписку на наш Discord")), c.default.createElement("div", {
                                    key: 1
                                }, "с " + t[0] + " RUB на " + t[1] + " RUB")];
                            case 13:
                                return [c.default.createElement("div", {
                                    key: 0
                                }, c.default.createElement("span", null, "Зачисление бонуса")), c.default.createElement("div", {
                                    key: 1
                                }, "с " + t[0] + " RUB на " + t[1] + " RUB")];
                            default:
                                return [c.default.createElement("div", {
                                    key: 0
                                }, c.default.createElement("span", null, "Прочие зачисления")), c.default.createElement("div", {
                                    key: 1
                                }, "с " + t[0] + " RUB на " + t[1] + " RUB")];
                        }
                    }, e._renderSum = function(e) {
                        var t = e.data,
                            n = e.type,
                            a = e.sum;
                        switch (n) {
                            case 1:
                            case 2:
                            case 3:
                                return t[1] - t[0] + " RUB"
                        }
                        return a + " RUB"
                    }, e.state = {
                        loading: !1
                    }, e
                }
                return u(t, e), s(t, [{
                    key: "componentWillMount",
                    value: function() {
                        this.props.bonuses || this._fetchBonuses()
                    }
                }, {
                    key: "render",
                    value: function() {
                        var e = this.props,
                            t = e.bonuses,
                            n = e.filters,
                            a = this.state.loading,
                            r = [{
                                name: "id",
                                title: "ID",
                                width: "1%",
                                sort: !0,
                                thSortingClass: "sorting"
                            }, {
                                name: "sum",
                                title: "Сумма",
                                data: this._renderSum,
                                sort: !0,
                                thSortingClass: "sorting"
                            }, {
                                name: "data",
                                title: "Описание",
                                data: this._renderData
                            }, {
                                name: "timestamp",
                                title: "Дата",
                                width: "1%",
                                data: function(e) {
                                    return e.humanDate
                                },
                                sort: !0,
                                thSortingClass: "sorting"
                            }];
                        return c.default.createElement(d.default, {
                            component: "div",
                            className: "animated",
                            transitionName: "fadeInUp",
                            transitionAppear: !0,
                            transitionAppearTimeout: 500,
                            transitionEnterTimeout: 500,
                            transitionLeaveTimeout: 500
                        }, c.default.createElement("div", {
                            className: "xbox xbox_bonuses"
                        }, k, c.default.createElement("div", {
                            className: "xbox__body"
                        }, c.default.createElement("div", {
                            className: "btn-toolbar mb-3"
                        }, c.default.createElement(v.default, {
                            className: "btn btn-success",
                            loading: a,
                            onClick: this._fetchBonuses
                        }, "Обновить")), B, c.default.createElement(y.default, {
                            data: t,
                            columns: r,
                            pageLength: 5,
                            filters: n,
                            order: [{
                                name: "id",
                                reverse: !0
                            }]
                        }))))
                    }
                }]), t
            }(i.Component);
        t.default = (0, p.connect)(l, {
            fetchBonuses: m.fetchBonuses
        })(w)
    },
    1092: function(e, t, n) {
        "use strict";

        function a(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        function r(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
        }

        function o(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }

        function u(e) {
            return {
                filters: e.filters.bonuses
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var l = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var a = t[n];
                        a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(e, a.key, a)
                    }
                }
                return function(t, n, a) {
                    return n && e(t.prototype, n), a && e(t, a), t
                }
            }(),
            s = n(1),
            i = function(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }(s),
            c = n(12),
            f = n(148),
            d = i.default.createElement("div", {
                className: "input-group-addon"
            }, i.default.createElement("i", {
                className: "fa fa-search"
            })),
            p = function(e) {
                function t() {
                    var e, n, o, u;
                    a(this, t);
                    for (var l = arguments.length, s = Array(l), i = 0; i < l; i++) s[i] = arguments[i];
                    return n = o = r(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(s))), o._changeFilters = function(e, t) {
                        o.props.changeBonusesFilters({
                            column: e,
                            value: t
                        })
                    }, u = n, r(o, u)
                }
                return o(t, e), l(t, [{
                    key: "render",
                    value: function() {
                        var e = this,
                            t = this.props.filters;
                        return i.default.createElement("div", {
                            className: "form-group"
                        }, i.default.createElement("div", {
                            className: "input-group"
                        }, d, i.default.createElement("input", {
                            type: "search",
                            className: "form-control",
                            value: t[0].columnValue,
                            placeholder: "Введите номер или сумму бонуса",
                            autoComplete: "off",
                            onChange: function(t) {
                                e._changeFilters(0, t.target.value)
                            }
                        })))
                    }
                }]), t
            }(s.Component);
        t.default = (0, c.connect)(u, {
            changeBonusesFilters: f.changeBonusesFilters
        })(p)
    }
});