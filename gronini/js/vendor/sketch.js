var Sketch = function () {
    function d(r) {
        r = v(r || {}, f);
        var s = "sketch-" + e++,
            o = document.createElement("canvas");
        switch (r.type) {
            case n:
                try {
                    i = o.getContext("webgl", r)
                } catch (u) {}
                try {
                    i = i || o.getContext("experimental-webgl", r)
                } catch (u) {}
                if (!i) throw "WebGL not supported";
                break;
            case t:
                try {
                    i = o.getContext("2d", r)
                } catch (u) {}
                if (!i) throw "Canvas not supported";
                break;
            default:
                o = i = document.createElement("div")
        }
        return i.canvas = o, o.className = "sketch", o.id = s, r.container.appendChild(o), v(self, l), v(i, r), v(i, c), g(), b(), a.push(i), i.autostart && setTimeout(i.start, 0), i
    }
    function v(e, t) {
        for (var n in t) e.hasOwnProperty(n) || (e[n] = t[n]);
        return e
    }
    function m(e) {
        function n(e, t) {
            return function () {
                e.call(t, arguments)
            }
        }
        var t = {};
        for (var r in e) typeof e[r] == "function" ? t[r] = n(e[r], e) : t[r] = e[r];
        return t
    }
    function g() {
        function n(t) {
            return e[t] || String.fromCharCode(t)
        }
        function r(e) {
            i.mouse.ox = i.mouse.x, i.mouse.oy = i.mouse.y, i.mouse.x = e.x, i.mouse.y = e.y, i.mouse.dx = i.mouse.x - i.mouse.ox, i.mouse.dy = i.mouse.y - i.mouse.oy
        }
        function o(e) {
            var t, n = m(e);
            n.original = e;
            for (var r = i.canvas, o = 0, u = 0; r; r = r.offsetParent) o += r.offsetLeft, u += r.offsetTop;
            if (n.touches && !! n.touches.length) for (var a = n.touches.length - 1, f; a >= 0; a--) f = n.touches[a], f.x = f.pageX - o, f.y = f.pageY - u, t = s[a] || f, f.dx = f.x - t.x, f.dy = f.y - t.x, f.ox = t.x, f.oy = t.y, s[a] = m(f);
            else n.x = n.pageX - o, n.y = n.pageY - u, t = s.mouse || n, n.dx = n.x - t.x, n.dy = n.y - t.y, n.ox = t.x, n.oy = t.y, s.mouse = n;
            return n
        }
        function u(e) {
            e.preventDefault(), e = o(e), i.touches = e.touches, r(i.touches[0]), i.touchstart && i.touchstart(e), i.mousedown && i.mousedown(e)
        }
        function a(e) {
            e = o(e), i.touches = e.touches, r(i.touches[0]), i.touchmove && i.touchmove(e), i.mousemove && i.mousemove(e)
        }
        function f(e) {
            e = o(e);
            if (!e.touches.length) s = {};
            else for (var t in s) e.touches[t] || delete s[t];
            i.touchend && i.touchend(e), i.mouseup && i.mouseup(e)
        }
        function l(e) {
            e = o(e), i.mouseover && i.mouseover(e)
        }
        function d(e) {
            e = o(e), i.dragging || (p(i.canvas, "mousemove", v), p(i.canvas, "mouseup", y), h(document, "mousemove", v), h(document, "mouseup", y), i.dragging = !0), i.touches = [e], i.touchstart && i.touchstart(e), i.mousedown && i.mousedown(e)
        }
        function v(e) {
            e = o(e), r(e), i.touches = [e], i.touchmove && i.touchmove(e), i.mousemove && i.mousemove(e)
        }
        function g(e) {
            e = o(e), i.mouseout && i.mouseout(e)
        }
        function y(e) {
            e = o(e), i.dragging && (p(document, "mousemove", v), p(document, "mouseup", y), h(i.canvas, "mousemove", v), h(i.canvas, "mouseup", y), i.dragging = !1), delete s.mouse, i.touchend && i.touchend(e), i.mouseup && i.mouseup(e)
        }
        function w(e) {
            e = o(e), i.click && i.click(e)
        }
        function E(e) {
            i.keys[n(e.keyCode)] = !0, i.keys[e.keyCode] = !0, i.keydown && i.keydown(e)
        }
        function S(e) {
            i.keys[n(e.keyCode)] = !1, i.keys[e.keyCode] = !1, i.keyup && i.keyup(e)
        }
        var e = {
            8: "BACKSPACE",
            9: "TAB",
            13: "ENTER",
            16: "SHIFT",
            27: "ESCAPE",
            32: "SPACE",
            37: "LEFT",
            38: "UP",
            39: "RIGHT",
            40: "DOWN"
        };
        for (var t in e) c.keys[e[t]] = !1;
        var s = {};
        h(i.canvas, "touchstart", u), h(i.canvas, "touchmove", a), h(i.canvas, "touchend", f), h(i.canvas, "mouseover", l), h(i.canvas, "mousedown", d), h(i.canvas, "mousemove", v), h(i.canvas, "mouseout", g), h(i.canvas, "mouseup", y), h(i.canvas, "click", w), h(document, "keydown", E), h(document, "keyup", S), h(window, "resize", b)
    }
    function y(e) {
        s || (i.dt = (e = e || Date.now()) - i.now, i.millis += i.dt, i.now = e, i.update && i.update(i.dt), i.autoclear && i.clear(), i.draw && i.draw(i)), s = ++s % i.interval, o = requestAnimationFrame(y)
    }
    function b(e) {
        var t = i.type === r ? i.style : i.canvas;
        i.fullscreen ? (i.height = t.height = window.innerHeight, i.width = t.width = window.innerWidth) : (t.height = i.height, t.width = i.width), i.resize && i.resize()
    }
    var e = 0,
        t = "canvas",
        n = "web-gl",
        r = "dom",
        i, s = 0,
        o = -1,
        u = {}, a = [],
        f = {
            fullscreen: !0,
            autostart: !0,
            autoclear: !0,
            autopause: !0,
            container: document.body,
            interval: 1,
            type: t
        }, l = {
            PI: Math.PI,
            TWO_PI: Math.PI * 2,
            HALF_PI: Math.PI / 2,
            QUARTER_PI: Math.PI / 4,
            abs: Math.abs,
            acos: Math.acos,
            asin: Math.asin,
            atan2: Math.atan2,
            atan: Math.atan,
            ceil: Math.ceil,
            cos: Math.cos,
            exp: Math.exp,
            floor: Math.floor,
            log: Math.log,
            max: Math.max,
            min: Math.min,
            pow: Math.pow,
            round: Math.round,
            sin: Math.sin,
            sqrt: Math.sqrt,
            tan: Math.tan,
            random: function (e, t) {
                return e && typeof e.length == "number" && !! e.length ? e[Math.floor(Math.random() * e.length)] : (typeof t != "number" && (t = e || 1, e = 0), e + Math.random() * (t - e))
            }
        }, c = {
            millis: 0,
            now: NaN,
            dt: NaN,
            keys: {},
            mouse: {
                x: 0,
                y: 0,
                ox: 0,
                oy: 0,
                dx: 0,
                dy: 0
            },
            touches: [],
            initialized: !1,
            dragging: !1,
            running: !1,
            start: function () {
                if (i.running) return;
                i.setup && !i.initialized && (i.autopause && (h(window, "focus", i.start), h(window, "blur", i.stop)), i.setup()), i.initialized = !0, i.running = !0, i.now = Date.now(), y()
            },
            stop: function () {
                cancelAnimationFrame(o), i.running = !1
            },
            toggle: function () {
                (i.running ? i.stop : i.start)()
            },
            clear: function () {
                i.canvas && (i.canvas.width = i.canvas.width)
            },
            destroy: function () {
                var e, t, n, r, s, o;
                a.splice(a.indexOf(i), 1), i.stop();
                for (t in u) {
                    n = u[t];
                    for (s = 0, o = n.length; s < o; s++) e = n[s], p(e.el, t, e.fn);
                    delete u[t]
                }
                i.container.removeChild(i.canvas);
                for (r in i) i.hasOwnProperty(r) && delete i[r]
            }
        }, h = function () {
            function e(e, t, n) {
                u[t] || (u[t] = []), u[t].push({
                    el: e,
                    fn: n
                })
            }
            return window.addEventListener ? function (t, n, r) {
                t.addEventListener(n, r, !1), e(t, n, r)
            } : window.attachEvent ? function (t, n, r) {
                t.attachEvent("on" + n, r), e(t, n, r)
            } : function (t, n, r) {
                t["on" + n] = r, e(t, n, r)
            }
        }(),
        p = function () {
            function e(e, t, n) {
                if (u[t]) {
                    var r;
                    for (var i = u[t].length - 1; i >= 0; i--) r = u[t][i], r.el === e && r.fn === n && u[t].splice(i, 1)
                }
            }
            if (window.removeEventListener) return function (t, n, r) {
                t.removeEventListener(n, r, !1), e(t, n, r)
            };
            if (window.detachEvent) return function (t, n, r) {
                t.detachEvent("on" + n, r), e(t, n, r)
            };
            el["on" + ev] = null, e(el, ev, fn)
        }();
    return {
        CANVAS: t,
        WEB_GL: n,
        DOM: r,
        instances: a,
        create: d
    }
}();
Date.now || (Date.now = function () {
    return +(new Date)
}),
function () {
    for (var e = 0, t = ["ms", "moz", "webkit", "o"], n = 0; n < t.length && !window.requestAnimationFrame; ++n) window.requestAnimationFrame = window[t[n] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[t[n] + "CancelAnimationFrame"] || window[t[n] + "CancelRequestAnimationFrame"];
    window.requestAnimationFrame || (window.requestAnimationFrame = function (t) {
        var n = Date.now(),
            r = Math.max(0, 16 - (n - e)),
            i = window.setTimeout(function () {
                t(n + r)
            }, r);
        return e = n + r, i
    }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function (e) {
        clearTimeout(e)
    })
}();