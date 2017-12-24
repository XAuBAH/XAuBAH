function initSnow() {
                function n(n) {
                    A = n,
                    r = (new Date).getTime() + n,
                    null != d && clearTimeout(d),
                    d = setTimeout(e, n + 50)
                }
                function e() {
                    var n = (new Date).getTime();
                    if (n < r)
                        d = setTimeout(e, r - n + 50);
                    else {
                        i = !0;
                        try {
                            document.onIdle && document.onIdle()
                        } catch (n) {}
                    }
                }
                function t(e) {
                    var t = (new Date).getTime();
                    r = t + A,
                    i && n(A),
                    i && document.onBack && document.onBack(i),
                    i = !1
                }
                var a = document.createElement("style");
                a.type = "text/css",
                a.innerHTML = "#snowflakesCanvas {width: 100%;position: fixed;top: 0;pointer-events: none;z-index: 99999;}",
                document.getElementsByTagName("head")[0].appendChild(a);
                var o = {
                    snowflakes: "200"
                }
                  , A = 1e3
                  , i = !1
                  , r = null
                  , d = null
                  , u = jQuery(document);
                u.ready(function() {
                    u.mousemove(t);
                    try {
                        u.mouseenter(t)
                    } catch (n) {}
                    try {
                        u.scroll(t)
                    } catch (n) {}
                    try {
                        u.keydown(t)
                    } catch (n) {}
                    try {
                        u.click(t)
                    } catch (n) {}
                    try {
                        u.dblclick(t)
                    } catch (n) {}
                }),
                function() {
                    "use strict";
                    function n() {
                        e.width = window.innerWidth,
                        e.height = window.innerHeight
                    }
                    var e = null
                      , t = null
                      , a = function() {
                        function n(n) {
                            return window.requestAnimationFrame ? window.requestAnimationFrame(n) : window.msRequestAnimationFrame ? window.msRequestAnimationFrame(n) : window.webkitRequestAnimationFrame ? window.webkitRequestAnimationFrame(n) : window.mozRequestAnimationFrame ? window.mozRequestAnimationFrame(n) : setTimeout(n, c)
                        }
                        function e() {
                            for (var t = new Date, a = 0; a < i.length; a++)
                                i[a] && i[a](r[a]);
                            d && (o = n(e));
                            var c = new Date;
                            if (w += c - t,
                            ++h >= g) {
                                w /= g;
                                var s = Math.floor(1e3 / w);
                                s > 60 && (s = 60),
                                !0 === u && console.log({
                                    fps: s,
                                    snowflakes: A.dynamicSnowflakesCount ? A.count() : ""
                                }),
                                w = 0,
                                h = 0
                            }
                        }
                        function t() {
                            d || (o = n(e),
                            d = !0)
                        }
                        function a() {
                            d && (clearInterval(o),
                            d = !1)
                        }
                        var o, i = [], r = [], d = !1, u = !1, c = 16.7, w = 0, g = 60, h = 0;
                        return {
                            addFrameRenderer: function(n, e) {
                                n && "function" == typeof n && (i.push(n),
                                r.push(e))
                            },
                            start: t,
                            stop: a,
                            toggle: function() {
                                (d ? a : t)()
                            },
                            getRequestAnimationFrame: n
                        }
                    }()
                      , A = function() {
                        function n(n, t) {
                            var A = new Image;
                            A.onload = function() {
                                for (r = 0; r < u; r++) {
                                    var i = document.createElement("canvas");
                                    i.width = c,
                                    i.height = w,
                                    i.getContext("2d").drawImage(A, r * c, 0, c, w, 0, 0, c, w),
                                    d.push(i)
                                }
                                n && (o = n),
                                t || (a = []);
                                for (var r = 0; r < o; r++)
                                    a.push(e())
                            }
                            ,
                            A.src = r
                        }
                        function e() {
                            var n = Math.random() * (f - v) + v;
                            return {
                                x: Math.random() * g.width,
                                y: Math.random() * g.height,
                                vv: Math.random() * (s - h) + h,
                                hv: Math.random() * (m - l) + l,
                                sw: n * c,
                                sh: n * w,
                                mhd: Math.random() * (y - p) + p,
                                hd: 0,
                                hdi: Math.random() / (m * p),
                                o: Math.random() * (V - B) + B,
                                oi: Math.random() / q,
                                si: Math.ceil(Math.random() * (u - 1)),
                                nl: !1
                            }
                        }
                        function t() {
                            for (var n = 0; n < a.length; n++) {
                                var e = a[n];
                                e.y += e.vv * C,
                                e.x += (e.hd + e.hv) * C,
                                e.hd += e.hdi,
                                (e.hd < -e.mhd || e.hd > e.mhd) && (e.hdi = -e.hdi),
                                e.o += e.oi,
                                (e.o > V || e.o < B) && (e.oi = -e.oi),
                                e.o > V && (e.o = V),
                                e.o < B && (e.o = B);
                                var t = !1;
                                e.y > g.height + w / 2 && (e.y = 0,
                                t = !0),
                                e.y < 0 && (e.y = g.height,
                                t = !0),
                                e.x > g.width + c / 2 && (e.x = 0,
                                t = !0),
                                e.x < 0 && (e.x = g.width,
                                t = !0),
                                t && (e.nl = !1)
                            }
                        }
                        var a = []
                          , o = 1e3
                          , A = .1
                          , i = 2
                          , r = "data:image/png;base64,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"
                          , d = []
                          , u = 5
                          , c = 20
                          , w = 20
                          , g = {
                            width: window.innerWidth,
                            height: window.innerHeight
                        }
                          , h = 1
                          , s = 4
                          , l = -1
                          , m = 3
                          , v = .2
                          , f = 1.25
                          , p = 2
                          , y = 3
                          , B = .2
                          , V = .9
                          , q = 50
                          , C = 1;
                        return {
                            generate: n,
                            add: function(e) {
                                e || (e = a.length * A),
                                n(e, !0)
                            },
                            remove: function(n) {
                                n || (n = a.length * A * i),
                                a.length - n > 0 && (a = a.slice(0, a.length - n))
                            },
                            render: function(n) {
                                t(),
                                n.clearRect(0, 0, n.canvas.width, n.canvas.height);
                                for (var e = 0; e < a.length; e++) {
                                    var o = a[e];
                                    n.globalAlpha = o.o,
                                    n.drawImage(d[o.si], 0, 0, c, w, o.x, o.y, o.sw, o.sh)
                                }
                            },
                            count: function() {
                                return a.length
                            },
                            updateBounds: function() {
                                g.width = window.innerWidth,
                                g.height = window.innerHeight
                            },
                            dynamicSnowflakesCount: !1
                        }
                    }();
                    e = jQuery('<canvas id="snowflakesCanvas" />'),
                    jQuery("body").append(e),
                    t = (e = document.getElementById("snowflakesCanvas")).getContext("2d"),
                    A.generate(o.snowflakes),
                    a.addFrameRenderer(A.render, t),
                    a.start(),
                    n(),
                    window.addEventListener("resize", function() {
                        n()
                    })
                }()
            }
            var jqueryScript = document.createElement("script");
            jqueryScript.addEventListener("load", function() {
                initSnow()
            }),
            jqueryScript.src = "https://cdnjs.cloudflare.com/ajax/libs/jquery/1.7.1/jquery.min.js",
            document.body.append(jqueryScript);
