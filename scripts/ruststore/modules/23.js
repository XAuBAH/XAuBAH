webpackJsonp([23], {
    1042: function(e, t, l) {
        "use strict";
        function a(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        function n(e) {
            return {
                user: e.user
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = l(1)
          , u = a(r)
          , d = l(78)
          , m = a(d)
          , c = l(12)
          , o = l(21)
          , f = l(110)
          , s = a(f)
          , i = u.default.createElement(s.default, null)
          , E = u.default.createElement("div", {
            className: "xbox__header"
        }, u.default.createElement("h4", null, "Профиль"))
          , yournick = u.default.createElement("th", null, "Ваш ник")
          , b = u.default.createElement("th", null, "SteamID")
          , p = u.default.createElement("th", null, "Баланс")
          , _ = u.default.createElement("th", null, "Бонусы")
          , v = u.default.createElement("th", null, "Скидка");
        var x = function(e) {
            var t = e.user;
		  var nickB64 = "";
			try {
				nickB64 = decodeURIComponent(escape(window.atob(t.steamData[0])));
			} catch (e) {}
            return t.loaded ? u.default.createElement(m.default, {
                className: "animated",
                component: "div",
                transitionName: "fadeInUp",
                transitionAppear: !0,
                transitionAppearTimeout: 500,
                transitionEnterTimeout: 500,
                transitionLeaveTimeout: 500
            }, u.default.createElement("div", {
                className: "xbox xbox_profile"
            }, E, u.default.createElement("div", {
                className: "xbox__body"
            }, u.default.createElement("div", {
                className: "col-lg-4 col-xl-3 hidden-md-down xbox_profile_ava_main"
            }, u.default.createElement("div", {
                className: "player-stats__avatar xbox_profile_ava"
            }, u.default.createElement("img", {
                                className: "avatar profile_ava",
                                src: t.steamData[1] || "//steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/b5/b5bd56c1aa4644a474a2e4972be27ef9e82e517e_full.jpg",
                                alt: 'Ваше изображение',
                                onError: function(e) {
                                    e.target.src = "//steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/b5/b5bd56c1aa4644a474a2e4972be27ef9e82e517e_full.jpg";
                                    e.target.onerror = null;
                                }
                            }))), u.default.createElement("div", {
                className: "col-lg-8 col-xl-9 xbox_profile_specs"
            }, u.default.createElement("table", {
                className: "table table-striped"
            }, u.default.createElement("tbody", null, u.default.createElement("tr", null, yournick, u.default.createElement("td", null, u.default.createElement("a", {
                href: "//steamcommunity.com/profiles/" + t.steamID,
                target: "_blank",
                rel: "noopener noreferrer"
            }, nickB64))), u.default.createElement("tr", null, b, u.default.createElement("td", null, t.steamID)), u.default.createElement("tr", null, p, u.default.createElement("td", null, (0,
            o.getFloorNumber)(t.balance) + " RUB")), u.default.createElement("tr", null, _, u.default.createElement("td", null, (0,
            o.getFloorNumber)(t.bonus) + " RUB")), u.default.createElement("tr", null, v, u.default.createElement("td", null, t.discount + "%")))))))) : i
        };
        t.default = (0,
        c.connect)(n)(x)
    }
});
