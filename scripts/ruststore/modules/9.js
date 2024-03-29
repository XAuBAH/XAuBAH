webpackJsonp([9], {
    1061: function(e, t, a) {
        "use strict";
        function n(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        function r(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        function l(e, t) {
            if (!e)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
        }
        function o(e, t) {
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
        function s(e) {
            var t = e.store
              , a = e.user
              , n = e.stats;
            return {
                user: a,
                store: t.data,
                playerData: n.player.data
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = function() {
            function e(e, t) {
                for (var a = 0; a < t.length; a++) {
                    var n = t[a];
                    n.enumerable = n.enumerable || !1,
                    n.configurable = !0,
                    "value"in n && (n.writable = !0),
                    Object.defineProperty(e, n.key, n)
                }
            }
            return function(t, a, n) {
                return a && e(t.prototype, a),
                n && e(t, n),
                t
            }
        }()
          , u = a(1)
          , c = n(u)
          , m = a(78)
          , f = n(m)
          , d = a(12)
          , p = a(148)
          , h = a(1079)
          , v = a(110)
          , _ = n(v)
          , y = a(1122)
          , E = n(y)
          , g = a(1123)
          , b = n(g)
          , w = a(1124)
          , k = n(w)
          , S = a(1125)
          , P = n(S)
          , T = c.default.createElement(_.default, null)
          , N = c.default.createElement("td", {
            width: "50%"
        }, "Профиль")
          , O = c.default.createElement("td", {
            width: "50%"
        }, "Коэффициент")
          , A = function(e) {
            function t() {
                r(this, t);
                var e = l(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
                return e._fetchPlayerStats = function(t) {
                    e.setState({
                        loading: !0
                    }),
                    e.props.fetchPlayerStats(t).then(function() {
                        e.setState({
                            loading: !1
                        })
                    })
                }
                ,
                e._renderBody = function(t) {
                    var a = e.props.params;
                    switch (e.state.id) {
                    case 1:
                        return c.default.createElement(E.default, {
                            playerData: t
                        });
                    case 2:
                        return c.default.createElement(k.default, {
                            params: a
                        });
                    case 3:
                        return c.default.createElement(P.default, {
                            params: a
                        })
                    }
                }
                ,
                e._changeBody = function(t) {
                    e.setState({
                        id: t
                    })
                }
                ,
                e.state = {
                    loading: !1,
                    id: 1
                },
                e
            }
            return o(t, e),
            i(t, [{
                key: "componentWillMount",
                value: function() {
                    this._fetchPlayerStats(this.props.params)
                }
            }, {
                key: "componentWillReceiveProps",
                value: function(e) {
                    this.props.params.steamID !== e.params.steamID && (this.props.resetPlayerStats(),
                    this._fetchPlayerStats(e.params))
                }
            }, {
                key: "componentWillUnmount",
                value: function() {
                    this.props.resetPlayerStats()
                }
            }, {
                key: "render",
                value: function() {
                    var e = this.props
                      , t = e.playerData
                      , a = e.params.steamID
                      , n = this.state.id;
                    if (!t)
                        return T;
                    var r = t.username
                      , l = t.kills_player
                      , o = t.deaths_total
                      , s = [{
                        name: "Убийства",
                        value: "kills_player"
                    }, {
                        name: "Смерти",
                        value: "deaths_total"
                    }, {
                        name: "Проведено на сервере",
                        value: "playtime"
                    }, {
                        name: "Очки в топе",
                        value: "points"
                    }, {
                        name: "Первая активность",
                        value: "register"
                    }, {
                        name: "Последняя активность",
                        value: "activity"
                    }];
                    return c.default.createElement(f.default, {
                        component: "div",
                        className: "animated",
                        transitionName: "fadeInUp",
                        transitionAppear: !0,
                        transitionAppearTimeout: 500,
                        transitionEnterTimeout: 500,
                        transitionLeaveTimeout: 500
                    }, c.default.createElement("div", {
                        className: "xbox xbox_player"
                    }, c.default.createElement("div", {
                        className: "xbox__header"
                    }, c.default.createElement("h4", null, 'Профиль игрока "' + (r || a) + '"')), c.default.createElement("div", {
                        className: "xbox__body"
                    }, c.default.createElement("div", {
                        className: "player-stats__profile"
                    }, c.default.createElement("div", {
                        className: "row"
                    }, c.default.createElement("div", {
                        className: "col-lg-4 col-xl-3 hidden-md-down"
                    }, c.default.createElement("div", {
                        className: "player-stats__avatar"
                    }, c.default.createElement("img", {
                        src: t.image || "//i.imgur.com/mj5N737.png",
                        alt: 'Изображение пользователя "' + (r || a) + '"',
                        title: r || a,
                        onError: function(e) {
                            e.target.src = "//i.imgur.com/mj5N737.png"
                        }
                    }))), c.default.createElement("div", {
                        className: "col-lg-8 col-xl-9"
                    }, c.default.createElement("table", {
                        className: "table table-striped"
                    }, c.default.createElement("tbody", null, c.default.createElement("tr", null, N, c.default.createElement("td", null, c.default.createElement("a", {
                        href: "//steamcommunity.com/profiles/" + a,
                        target: "_blank",
                        rel: "noopener noreferrer"
                    }, a))), c.default.createElement("tr", null, O, c.default.createElement("td", null, o ? (l / o).toFixed(2) : l)), s.map(function(e, a) {
                        var n = e.name
                          , r = e.value;
                        return c.default.createElement("tr", {
                            key: a
                        }, c.default.createElement("td", {
                            width: "50%"
                        }, n), c.default.createElement("td", null, t[r]))
                    })))))), c.default.createElement(b.default, {
                        id: n,
                        changeBody: this._changeBody
                    }), this._renderBody(t)), c.default.createElement("div", {
                        className: "xbox__footer"
                    }, c.default.createElement("button", {
                        className: "btn btn-secondary",
                        onClick: this.context.router.goBack
                    }, "Назад"))))
                }
            }]),
            t
        }(u.Component);
        A.contextTypes = {
            router: u.PropTypes.object
        },
        t.default = (0,
        d.connect)(s, {
            resetPlayerStats: h.resetPlayerStats,
            fetchPlayerStats: h.fetchPlayerStats,
            changeServerStatsFilters: p.changeServerStatsFilters
        })(A)
    },
    1079: function(e, t, a) {
        "use strict";
        function n(e) {
            var t = (0,
            m.post)(d.URL, (0,
            f.stringify)(c({
                modules: "statistics",
                action: "getData"
            }, e)));
            return {
                type: d.AT.FETCH_SERVER_STATS,
                payload: t
            }
        }
        function r(e) {
            var t = (0,
            m.post)(d.URL, (0,
            f.stringify)(c({
                modules: "banlist",
                action: "getData"
            }, e)));
            return {
                type: d.AT.FETCH_SERVER_BANS,
                payload: t
            }
        }
        function l() {
            var e = new Promise(function(e) {
                e()
            }
            );
            return {
                type: d.AT.RESET_SERVER_BANS,
                payload: e
            }
        }
        function o(e) {
            var t = (0,
            m.post)(d.URL, (0,
            f.stringify)(c({
                modules: "statistics",
                action: "getData"
            }, e)));
            return {
                type: d.AT.FETCH_PLAYER_STATS,
                payload: t
            }
        }
        function s(e) {
            var t = (0,
            m.post)(d.URL, (0,
            f.stringify)(c({
                modules: "statistics",
                action: "killsHistory"
            }, e)));
            return {
                type: d.AT.FETCH_PLAYER_KILLS,
                payload: t
            }
        }
        function i() {
            var e = new Promise(function(e) {
                e()
            }
            );
            return {
                type: d.AT.RESET_PLAYER_STATS,
                payload: e
            }
        }
        function u() {
            var e = new Promise(function(e) {
                e()
            }
            );
            return {
                type: d.AT.RESET_SERVER_STATS,
                payload: e
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var c = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var a = arguments[t];
                for (var n in a)
                    Object.prototype.hasOwnProperty.call(a, n) && (e[n] = a[n])
            }
            return e
        }
        ;
        t.fetchServerStats = n,
        t.fetchServerBans = r,
        t.resetServerBans = l,
        t.fetchPlayerStats = o,
        t.fetchPlayerKills = s,
        t.resetPlayerStats = i,
        t.resetServerStats = u;
        var m = a(79)
          , f = a(96)
          , d = a(22)
    },
    1122: function(e, t, a) {
        "use strict";
        function n(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        function r(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        function l(e, t) {
            if (!e)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
        }
        function o(e, t) {
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
        var s = function() {
            function e(e, t) {
                for (var a = 0; a < t.length; a++) {
                    var n = t[a];
                    n.enumerable = n.enumerable || !1,
                    n.configurable = !0,
                    "value"in n && (n.writable = !0),
                    Object.defineProperty(e, n.key, n)
                }
            }
            return function(t, a, n) {
                return a && e(t.prototype, a),
                n && e(t, n),
                t
            }
        }()
          , i = a(1)
          , u = n(i)
          , c = a(78)
          , m = n(c)
          , f = u.default.createElement("tr", null, u.default.createElement("th", {
            colSpan: "2"
        }, "Убийства игроков"))
          , d = u.default.createElement("tr", null, u.default.createElement("th", {
            colSpan: "2"
        }, "Убийства животных"))
          , p = u.default.createElement("tr", null, u.default.createElement("th", {
            colSpan: "2"
        }, "Смерти"))
          , h = u.default.createElement("tr", null, u.default.createElement("th", {
            colSpan: "2"
        }, "Уничтожение объектов"))
          , v = u.default.createElement("td", {
            width: "50%"
        }, "Строения")
          , _ = u.default.createElement("td", {
            width: "50%"
        }, "Бочки")
          , y = u.default.createElement("td", {
            width: "50%"
        }, "Вертолеты")
          , E = u.default.createElement("tr", null, u.default.createElement("th", {
            colSpan: "2"
        }, "Сбор ресурсов"))
          , g = function(e) {
            function t() {
                r(this, t);
                var e = l(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
                return e._toggleDeaths = function() {
                    e.setState({
                        showDeaths: !e.state.showDeaths
                    })
                }
                ,
                e._togglePlayerKills = function() {
                    e.setState({
                        showPlayerKills: !e.state.showPlayerKills
                    })
                }
                ,
                e._toggleAnimalKills = function() {
                    e.setState({
                        showAnimalKills: !e.state.showAnimalKills
                    })
                }
                ,
                e._toggleResources = function() {
                    e.setState({
                        showResources: !e.state.showResources
                    })
                }
                ,
                e._toggleEntities = function() {
                    e.setState({
                        showEntities: !e.state.showEntities
                    })
                }
                ,
                e.state = {
                    showPlayerKills: !1,
                    showAnimalKills: !1,
                    showDeaths: !1,
                    showResources: !1,
                    showEntities: !1
                },
                e
            }
            return o(t, e),
            s(t, [{
                key: "render",
                value: function() {
                    var e = this.props.playerData
                      , t = this.state
                      , a = t.showPlayerKills
                      , n = t.showAnimalKills
                      , r = t.showResources
                      , l = t.showEntities
                      , o = t.showDeaths
                      , s = [{
                        name: "Всего",
                        value: "deaths_total"
                    }, {
                        name: "Игроки",
                        value: "deaths_player"
                    }, {
                        name: "Животные",
                        value: "deaths_animal"
                    }, {
                        name: "Вертолеты",
                        value: "deaths_helicopter"
                    }, {
                        name: "Ловушки",
                        value: "deaths_traps"
                    }, {
                        name: "Падения",
                        value: "deaths_fall"
                    }, {
                        name: "Радиация",
                        value: "deaths_radiation"
                    }, {
                        name: "Самоубийства",
                        value: "deaths_suicide"
                    }]
                      , i = [{
                        name: "Всего",
                        value: "kills_player"
                    }, {
                        name: "Огнестрельное оружие",
                        value: "kills_bullet"
                    }, {
                        name: "Холодное оружие",
                        value: "kills_melee"
                    }, {
                        name: "Лук",
                        value: "kills_arrow"
                    }, {
                        name: "В голову",
                        value: "kills_headshot"
                    }, {
                        name: "Раненых",
                        value: "kills_wounded"
                    }, {
                        name: "Спящих",
                        value: "kills_sleeping"
                    }]
                      , c = [{
                        name: "Всего",
                        value: "kills_animal"
                    }, {
                        name: "Медведи",
                        value: "kills_bear"
                    }, {
                        name: "Волки",
                        value: "kills_wolf"
                    }, {
                        name: "Кабаны",
                        value: "kills_boar"
                    }, {
                        name: "Курицы",
                        value: "kills_chicken"
                    }, {
                        name: "Лошади",
                        value: "kills_horse"
                    }, {
                        name: "Олени",
                        value: "kills_stag"
                    }]
                      , g = [{
                        name: "Древесина",
                        value: "harvests_wood"
                    }, {
                        name: "Камень",
                        value: "harvests_stones"
                    }, {
                        name: "Железная руда",
                        value: "harvests_metal_ore"
                    }, {
                        name: "Высококачественная железная руда",
                        value: "harvests_hq_metal_ore"
                    }, {
                        name: "Ткань",
                        value: "harvests_cloth"
                    }, {
                        name: "Кожа",
                        value: "harvests_leather"
                    }, {
                        name: "Сера",
                        value: "harvests_sulfur_ore"
                    }, {
                        name: "Мякоть кактуса",
                        value: "harvests_cactusflesh"
                    }, {
                        name: "Животный жир",
                        value: "harvests_fat_animal"
                    }, {
                        name: "Обломки костей",
                        value: "harvests_bone_fragments"
                    }, {
                        name: "Медвежье мясо",
                        value: "harvests_bearmeat"
                    }, {
                        name: "Волчье мясо",
                        value: "harvests_wolfmeat_raw"
                    }, {
                        name: "Кабанье мясо",
                        value: "harvests_meat_boar"
                    }, {
                        name: "Куриное мясо",
                        value: "harvests_chicken_raw"
                    }, {
                        name: "Человеческое мясо",
                        value: "harvests_humanmeat_raw"
                    }, {
                        name: "Грибы",
                        value: "harvests_mushroom"
                    }, {
                        name: "Человеческие черепа",
                        value: "harvests_skull_human"
                    }, {
                        name: "Волчьи черепа",
                        value: "harvests_skull_human"
                    }, {
                        name: "Тыквы",
                        value: "harvests_pumpkin"
                    }, {
                        name: "Кукуруза",
                        value: "harvests_corn"
                    }, {
                        name: "Семена тыквы",
                        value: "harvests_seed_pumpkin"
                    }, {
                        name: "Семена кукурузы",
                        value: "harvests_seed_corn"
                    }, {
                        name: "Семена конопли",
                        value: "harvests_seed_hemp"
                    }];
                    return u.default.createElement(m.default, {
                        component: "div",
                        className: "player-stats",
                        transitionName: "fadeInUp",
                        transitionAppear: !0,
                        transitionAppearTimeout: 300,
                        transitionEnterTimeout: 300,
                        transitionLeaveTimeout: 300
                    }, u.default.createElement("div", {
                        className: "player-stats__playerKills"
                    }, u.default.createElement("table", {
                        className: "table table-striped"
                    }, u.default.createElement("thead", {
                        onClick: this._togglePlayerKills
                    }, f), a ? u.default.createElement(m.default, {
                        component: "tbody",
                        transitionName: "fadeInUp",
                        transitionAppear: !0,
                        transitionAppearTimeout: 300,
                        transitionEnterTimeout: 300,
                        transitionLeaveTimeout: 300
                    }, i.map(function(t, a) {
                        var n = t.name
                          , r = t.value;
                        return u.default.createElement("tr", {
                            key: a
                        }, u.default.createElement("td", {
                            width: "50%"
                        }, n), u.default.createElement("td", null, e[r]))
                    })) : null)), u.default.createElement("div", {
                        className: "player-stats__animalKills"
                    }, u.default.createElement("table", {
                        className: "table table-striped"
                    }, u.default.createElement("thead", {
                        onClick: this._toggleAnimalKills
                    }, d), n ? u.default.createElement(m.default, {
                        component: "tbody",
                        transitionName: "fadeInUp",
                        transitionAppear: !0,
                        transitionAppearTimeout: 300,
                        transitionEnterTimeout: 300,
                        transitionLeaveTimeout: 300
                    }, c.map(function(t, a) {
                        var n = t.name
                          , r = t.value;
                        return u.default.createElement("tr", {
                            key: a
                        }, u.default.createElement("td", {
                            width: "50%"
                        }, n), u.default.createElement("td", null, e[r]))
                    })) : null)), u.default.createElement("div", {
                        className: "player-stats__deaths"
                    }, u.default.createElement("table", {
                        className: "table table-striped"
                    }, u.default.createElement("thead", {
                        onClick: this._toggleDeaths
                    }, p), o ? u.default.createElement(m.default, {
                        component: "tbody",
                        transitionName: "fadeInUp",
                        transitionAppear: !0,
                        transitionAppearTimeout: 300,
                        transitionEnterTimeout: 300,
                        transitionLeaveTimeout: 300
                    }, s.map(function(t, a) {
                        var n = t.name
                          , r = t.value;
                        return u.default.createElement("tr", {
                            key: a
                        }, u.default.createElement("td", {
                            width: "50%"
                        }, n), u.default.createElement("td", null, e[r]))
                    })) : null)), u.default.createElement("div", {
                        className: "player-stats__entities"
                    }, u.default.createElement("table", {
                        className: "table table-striped"
                    }, u.default.createElement("thead", {
                        onClick: this._toggleEntities
                    }, h), l ? u.default.createElement(m.default, {
                        component: "tbody",
                        transitionName: "fadeInUp",
                        transitionAppear: !0,
                        transitionAppearTimeout: 300,
                        transitionEnterTimeout: 300,
                        transitionLeaveTimeout: 300
                    }, u.default.createElement("tr", null, v, u.default.createElement("td", null, e.kills_building)), u.default.createElement("tr", null, _, u.default.createElement("td", null, e.kills_barrel)), u.default.createElement("tr", null, y, u.default.createElement("td", null, e.kills_helicopter))) : null)), u.default.createElement("div", {
                        className: "player-stats__resources"
                    }, u.default.createElement("table", {
                        className: "table table-striped"
                    }, u.default.createElement("thead", {
                        onClick: this._toggleResources
                    }, E), r ? u.default.createElement(m.default, {
                        component: "tbody",
                        transitionName: "fadeInUp",
                        transitionAppear: !0,
                        transitionAppearTimeout: 300,
                        transitionEnterTimeout: 300,
                        transitionLeaveTimeout: 300
                    }, g.map(function(t, a) {
                        var n = t.name
                          , r = t.value;
                        return u.default.createElement("tr", {
                            key: a
                        }, u.default.createElement("td", {
                            width: "50%"
                        }, n), u.default.createElement("td", null, e[r]))
                    })) : null)))
                }
            }]),
            t
        }(i.Component);
        t.default = g
    },
    1123: function(e, t, a) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = a(1)
          , r = function(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }(n)
          , l = function(e) {
            var t = e.id
              , a = e.changeBody;
            return r.default.createElement("div", {
                className: "player-stats__navigation"
            }, r.default.createElement("nav", {
                className: "nav nav-pills flex-column flex-md-row"
            }, r.default.createElement("a", {
                href: "#",
                className: "nav-link text-md-center" + (1 === t ? " active" : ""),
                onClick: function(e) {
                    e.preventDefault(),
                    a(1)
                }
            }, "Статистика"), r.default.createElement("a", {
                href: "#",
                className: "nav-link text-md-center" + (2 === t ? " active" : ""),
                onClick: function(e) {
                    e.preventDefault(),
                    a(2)
                }
            }, "История убийств"), r.default.createElement("a", {
                href: "#",
                className: "nav-link text-md-center" + (3 === t ? " active" : ""),
                onClick: function(e) {
                    e.preventDefault(),
                    a(3)
                }
            }, "История смертей")))
        };
        t.default = l
    },
    1124: function(e, t, a) {
        "use strict";
        function n(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        function r(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        function l(e, t) {
            if (!e)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
        }
        function o(e, t) {
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
        function s(e) {
            return {
                playerKills: e.stats.player.kills
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = function() {
            function e(e, t) {
                for (var a = 0; a < t.length; a++) {
                    var n = t[a];
                    n.enumerable = n.enumerable || !1,
                    n.configurable = !0,
                    "value"in n && (n.writable = !0),
                    Object.defineProperty(e, n.key, n)
                }
            }
            return function(t, a, n) {
                return a && e(t.prototype, a),
                n && e(t, n),
                t
            }
        }()
          , u = a(1)
          , c = n(u)
          , m = a(78)
          , f = n(m)
          , d = a(60)
          , p = a(12)
          , h = a(1079)
          , v = a(21)
          , _ = a(374)
          , y = n(_)
          , E = function(e) {
            function t() {
                r(this, t);
                var e = l(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
                return e._fetchPlayerKills = function() {
                    var t = e.props
                      , a = t.params
                      , n = t.fetchPlayerKills;
                    e.setState({
                        loading: !0
                    }),
                    n(a).then(function() {
                        e.setState({
                            loading: !1
                        })
                    })
                }
                ,
                e.state = {
                    loading: !1
                },
                e
            }
            return o(t, e),
            i(t, [{
                key: "componentWillMount",
                value: function() {
                    this.props.playerKills || this._fetchPlayerKills()
                }
            }, {
                key: "render",
                value: function() {
                    var e = this.props
                      , t = e.playerKills
                      , a = e.params
                      , n = a.serverID
                      , r = a.steamID
                      , l = null;
                    t && (l = t.filter(function(e) {
                        if (e.killer === r)
                            return !0
                    }));
                    var o = [{
                        name: "victim",
                        title: "",
                        width: "1%",
                        data: function(e) {
                            var t = e.victim
                              , a = e.victimData
                              , n = a.username
                              , r = a.image;
                            return c.default.createElement("a", {
                                href: "//steamcommunity.com/profiles/" + t,
                                target: "_blank",
                                rel: "noopener noreferrer"
                            }, c.default.createElement("img", {
                                className: "avatar",
                                src: r || "//i.imgur.com/mj5N737.png",
                                alt: 'Изображение игрока "' + (n || t) + '"',
                                title: n || t,
                                onError: function(e) {
                                    e.target.src = "//i.imgur.com/mj5N737.png"
                                }
                            }))
                        }
                    }, {
                        name: "victim",
                        title: "Жертва",
                        data: function(e) {
                            var t = e.victim
                              , a = e.victimData.username;
                            return c.default.createElement(d.Link, {
                                to: "/servers/" + n + "/" + t
                            }, a)
                        },
                        sort: !0,
                        thSortingClass: "sorting"
                    }, {
                        name: "weapon",
                        title: "Оружие",
                        sort: !0,
                        thSortingClass: "sorting"
                    }, {
                        name: "bone",
                        title: "Часть тела",
                        data: function(e) {
                            var t = e.bone;
                            return (0,
                            v.getBoneName)(t)
                        },
                        sort: !0,
                        thSortingClass: "sorting"
                    }, {
                        name: "humanDate",
                        title: "Дата",
                        sort: !0,
                        thSortingClass: "sorting"
                    }];
                    return c.default.createElement(f.default, {
                        component: "div",
                        className: "server-player__death-history",
                        transitionName: "fadeInUp",
                        transitionAppear: !0,
                        transitionAppearTimeout: 300,
                        transitionEnterTimeout: 300,
                        transitionLeaveTimeout: 300
                    }, c.default.createElement(y.default, {
                        data: l,
                        columns: o,
                        pageLength: 5,
                        order: [{
                            name: "time",
                            reverse: !0
                        }]
                    }))
                }
            }]),
            t
        }(u.Component);
        t.default = (0,
        p.connect)(s, {
            fetchPlayerKills: h.fetchPlayerKills
        })(E)
    },
    1125: function(e, t, a) {
        "use strict";
        function n(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        function r(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        function l(e, t) {
            if (!e)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
        }
        function o(e, t) {
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
        function s(e) {
            return {
                playerKills: e.stats.player.kills
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = function() {
            function e(e, t) {
                for (var a = 0; a < t.length; a++) {
                    var n = t[a];
                    n.enumerable = n.enumerable || !1,
                    n.configurable = !0,
                    "value"in n && (n.writable = !0),
                    Object.defineProperty(e, n.key, n)
                }
            }
            return function(t, a, n) {
                return a && e(t.prototype, a),
                n && e(t, n),
                t
            }
        }()
          , u = a(1)
          , c = n(u)
          , m = a(78)
          , f = n(m)
          , d = a(60)
          , p = a(12)
          , h = a(1079)
          , v = a(21)
          , _ = a(374)
          , y = n(_)
          , E = function(e) {
            function t() {
                r(this, t);
                var e = l(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
                return e._fetchPlayerKills = function() {
                    var t = e.props
                      , a = t.params
                      , n = t.fetchPlayerKills;
                    e.setState({
                        loading: !0
                    }),
                    n(a).then(function() {
                        e.setState({
                            loading: !1
                        })
                    })
                }
                ,
                e.state = {
                    loading: !1
                },
                e
            }
            return o(t, e),
            i(t, [{
                key: "componentWillMount",
                value: function() {
                    this.props.playerKills || this._fetchPlayerKills()
                }
            }, {
                key: "render",
                value: function() {
                    var e = this.props
                      , t = e.playerKills
                      , a = e.params
                      , n = a.serverID
                      , r = a.steamID
                      , l = null;
                    t && (l = t.filter(function(e) {
                        if (e.victim === r)
                            return !0
                    }));
                    var o = [{
                        name: "killer",
                        title: "",
                        width: "1%",
                        data: function(e) {
                            var t = e.killer
                              , a = e.killerData
                              , n = a.username
                              , r = a.image;
                            return c.default.createElement("a", {
                                href: "//steamcommunity.com/profiles/" + t,
                                target: "_blank",
                                rel: "noopener noreferrer"
                            }, c.default.createElement("img", {
                                className: "avatar",
                                src: r || "//i.imgur.com/mj5N737.png",
                                alt: 'Изображение игрока "' + (n || t) + '"',
                                title: n || t,
                                onError: function(e) {
                                    e.target.src = "//i.imgur.com/mj5N737.png"
                                }
                            }))
                        }
                    }, {
                        name: "killer",
                        title: "Убийца",
                        data: function(e) {
                            var t = e.killer
                              , a = e.killerData.username;
                            return c.default.createElement(d.Link, {
                                to: "/servers/" + n + "/" + t
                            }, a)
                        },
                        sort: !0,
                        thSortingClass: "sorting"
                    }, {
                        name: "weapon",
                        title: "Оружие",
                        sort: !0,
                        thSortingClass: "sorting"
                    }, {
                        name: "bone",
                        title: "Часть тела",
                        data: function(e) {
                            var t = e.bone;
                            return (0,
                            v.getBoneName)(t)
                        },
                        sort: !0,
                        thSortingClass: "sorting"
                    }, {
                        name: "humanDate",
                        title: "Дата",
                        sort: !0,
                        thSortingClass: "sorting"
                    }];
                    return c.default.createElement(f.default, {
                        component: "div",
                        className: "server-player__death-history",
                        transitionName: "fadeInUp",
                        transitionAppear: !0,
                        transitionAppearTimeout: 300,
                        transitionEnterTimeout: 300,
                        transitionLeaveTimeout: 300
                    }, c.default.createElement(y.default, {
                        data: l,
                        columns: o,
                        pageLength: 5,
                        order: [{
                            name: "time",
                            reverse: !0
                        }]
                    }))
                }
            }]),
            t
        }(u.Component);
        t.default = (0,
        p.connect)(s, {
            fetchPlayerKills: h.fetchPlayerKills
        })(E)
    }
});
