/*
 * @author RocketTheme, LLC http://www.rockettheme.com
 * @copyright Copyright (C) 2007 - 2014 RocketTheme, LLC
 * @license http://www.gnu.org/licenses/gpl-2.0.html GNU/GPLv2 only
 */
(function (c) {
    var a = {}
      , b = function (f) {
          var e = a[f];
          if (!e) {
              e = a[f] = {};
              var d = e.exports = {};
              c[f].call(d, b, e, d, window);
          }
          return e.exports;
      }
    ;
    window.moofx = b("0");
})({
    "0": function (c, e, b, f) {
        var a = c("1")
          , g = c("2");
        var d = typeof document !== "undefined" ? c("7") : c("b");
        d.requestFrame = function (h) {
            g.request(h);
            return this;
        }
        ;
        d.cancelFrame = function (h) {
            g.cancel(h);
            return this;
        }
        ;
        d.color = a;
        e.exports = d;
    },
    "1": function (j, e, w, q) {
        var k = {
            maroon: "#800000",
            red: "#ff0000",
            orange: "#ffA500",
            yellow: "#ffff00",
            olive: "#808000",
            purple: "#800080",
            fuchsia: "#ff00ff",
            white: "#ffffff",
            lime: "#00ff00",
            green: "#008000",
            navy: "#000080",
            blue: "#0000ff",
            aqua: "#00ffff",
            teal: "#008080",
            black: "#000000",
            silver: "#c0c0c0",
            gray: "#808080",
            transparent: "#0000"
        };
        var d = function (z, y, c, x) {
            if (x == null || x === "") {
                x = 1;
            }
            z = parseFloat(z);
            y = parseFloat(y);
            c = parseFloat(c);
            x = parseFloat(x);
            if (!(z <= 255 && z >= 0 && y <= 255 && y >= 0 && c <= 255 && c >= 0 && x <= 1 && x >= 0)) {
                return null;
            }
            return [Math.round(z), Math.round(y), Math.round(c), x];
        }
        ;
        var v = function (D) {
            if (D.length === 3) {
                D += "f";
            }
            if (D.length === 4) {
                var C = D.charAt(0)
                  , B = D.charAt(1)
                  , z = D.charAt(2)
                  , x = D.charAt(3);
                D = C + C + B + B + z + z + x + x;
            }
            if (D.length === 6) {
                D += "ff";
            }
            var y = [];
            for (var A = 0, c = D.length; A < c; A += 2) {
                y.push(parseInt(D.substr(A, 2), 16) / (A === 6 ? 255 : 1));
            }
            return y;
        }
        ;
        var l = function (y, x, c) {
            if (c < 0) {
                c += 1;
            }
            if (c > 1) {
                c -= 1;
            }
            if (c < 1 / 6) {
                return y + (x - y) * 6 * c;
            }
            if (c < 1 / 2) {
                return x;
            }
            if (c < 2 / 3) {
                return y + (x - y) * (2 / 3 - c) * 6;
            }
            return y;
        }
        ;
        var a = function (A, E, z, D) {
            var c, C, B;
            if (D == null || D === "") {
                D = 1;
            }
            A = parseFloat(A) / 360;
            E = parseFloat(E) / 100;
            z = parseFloat(z) / 100;
            D = parseFloat(D) / 1;
            if (A > 1 || A < 0 || E > 1 || E < 0 || z > 1 || z < 0 || D > 1 || D < 0) {
                return null;
            }
            if (E === 0) {
                c = C = B = z;
            } else {
                var x = z < 0.5 ? z * (1 + E) : z + E - z * E;
                var y = 2 * z - x;
                c = l(y, x, A + 1 / 3);
                B = l(y, x, A);
                C = l(y, x, A - 1 / 3);
            }
            return [c * 255, B * 255, C * 255, D];
        }
        ;
        var p = [];
        for (var t in k) {
            p.push(t);
        }
        var m = "(?:#([a-f0-9]{3,8}))"
          , f = "\\s*([.\\d%]+)\\s*"
          , b = "(?:,\\s*([.\\d]+)\\s*)?"
          , s = "\\(" + [f, f, f] + b + "\\)"
          , g = "(?:rgb)a?"
          , o = "(?:hsl)a?"
          , n = "(" + p.join("|") + ")";
        var h = RegExp(m, "i")
          , u = RegExp(g + s, "i")
          , i = RegExp(o + s, "i");
        var r = function (c, y) {
            if (c == null) {
                return null;
            }
            c = (c + "").replace(/\s+/, "");
            var x = k[c];
            if (x) {
                return r(x, y);
            } else {
                if (x = c.match(h)) {
                    c = v(x[1]);
                } else {
                    if (x = c.match(u)) {
                        c = x.slice(1);
                    } else {
                        if (x = c.match(i)) {
                            c = a.apply(null, x.slice(1));
                        } else {
                            return null;
                        }
                    }
                }
            }
            if (!(c && (c = d.apply(null, c)))) {
                return null;
            }
            if (y) {
                return c;
            }
            if (c[3] === 1) {
                c.splice(3, 1);
            }
            return "rgb" + (c.length === 4 ? "a" : "") + "(" + c + ")";
        }
        ;
        r.x = RegExp([n, m, g + s, o + s].join("|"), "gi");
        e.exports = r;
    },
    "2": function (c, b, f, a) {
        var h = c("3");
        var d = a.requestAnimationFrame || a.webkitRequestAnimationFrame || a.mozRequestAnimationFrame || a.oRequestAnimationFrame || a.msRequestAnimationFrame || function (k) {
            return setTimeout(k, 1000 / 60);
        }
        ;
        var i = [];
        var g = function (o) {
            var n = i.splice(0, i.length);
            for (var m = 0, k = n.length; m < k; m++) {
                n[m](o || (o = +new Date()));
            }
        }
        ;
        var j = function (l) {
            var k = h.indexOf(i, l);
            if (k > -1) {
                i.splice(k, 1);
            }
        }
        ;
        var e = function (l) {
            var k = i.push(l);
            if (k === 1) {
                d(g);
            }
            return function () {
                j(l);
            }
            ;
        }
        ;
        f.request = e;
        f.cancel = j;
    },
    "3": function (f, e, h, c) {
        var k = f("4")["array"];
        var l = ("pop,push,reverse,shift,sort,splice,unshift,concat,join,slice,toString,indexOf,lastIndexOf,forEach,every,some,filter,map,reduce,reduceRight").split(",");
        for (var g = {}, j = 0, b, a; b = l[j++];) {
            if (a = Array.prototype[b]) {
                g[b] = a;
            }
        }
        if (!g.filter) {
            g.filter = function (q, p) {
                var o = [];
                for (var n = 0, m = this.length >>> 0; n < m; n++) {
                    if (n in this) {
                        var r = this[n];
                        if (q.call(p, r, n, this)) {
                            o.push(r);
                        }
                    }
                }
                return o;
            }
            ;
        }
        if (!g.indexOf) {
            g.indexOf = function (o, p) {
                for (var m = this.length >>> 0, n = p < 0 ? Math.max(0, m + p) : p || 0; n < m; n++) {
                    if (n in this && this[n] === o) {
                        return n;
                    }
                }
                return -1;
            }
            ;
        }
        if (!g.map) {
            g.map = function (q, p) {
                var r = this.length >>> 0
                  , o = Array(r);
                for (var n = 0, m = r; n < m; n++) {
                    if (n in this) {
                        o[n] = q.call(p, this[n], n, this);
                    }
                }
                return o;
            }
            ;
        }
        if (!g.every) {
            g.every = function (p, o) {
                for (var n = 0, m = this.length >>> 0; n < m; n++) {
                    if (n in this && !p.call(o, this[n], n, this)) {
                        return false;
                    }
                }
                return true;
            }
            ;
        }
        if (!g.some) {
            g.some = function (p, o) {
                for (var n = 0, m = this.length >>> 0;
                n < m; n++) {
                    if (n in this && p.call(o, this[n], n, this)) {
                        return true;
                    }
                }
                return false;
            }
            ;
        }
        if (!g.forEach) {
            g.forEach = function (p, o) {
                for (var n = 0, m = this.length >>> 0; n < m;
                n++) {
                    if (n in this) {
                        p.call(o, this[n], n, this);
                    }
                }
            }
            ;
        }
        var d = Object.prototype.toString;
        k.isArray = Array.isArray || function (i) {
            return d.call(i) === "[object Array]";
        }
        ;
        e.exports = k.implement(g);
    },
    "4": function (d, c, e, b) {
        var a = d("5")
          , j = d("6");
        var k = Array.prototype.slice;
        var m = a({
            constructor: function m(i) {
                this.valueOf = function () {
                    return i;
                }
                ;
                this.toString = function () {
                    return i + "";
                }
                ;
                this.is = function (n) {
                    return i === n;
                }
                ;
            }
        });
        var h = function (i) {
            if (i == null || i instanceof m) {
                return i;
            }
            var n = h[j(i)];
            return n ? new n(i) : i;
        }
        ;
        var l = function () {
            var i = a({
                inherits: m
            });
            return a({
                constructor: function (n) {
                    return new i(n);
                },
                define: function (n, o) {
                    var p = o.value;
                    this[n] = function (q) {
                        return arguments.length > 1 ? p.apply(q, k.call(arguments, 1)) : p.call(q);
                    }
                    ;
                    i.prototype[n] = function () {
                        return h(p.apply(this.valueOf(), arguments));
                    }
                    ;
                    a.define(this.prototype, n, o);
                    return this;
                }
            });
        }
        ;
        for (var g = "string,number,array,object,date,function,regexp".split(","), f = g.length;
        f--;) {
            h[g[f]] = l();
        }
        c.exports = h;
    },
    "5": function (g, d, h, c) {
        var p = function (e, q) {
            return Object.hasOwnProperty.call(e, q);
        }
        ;
        var n = function (e, s, r) {
            for (var q in e) {
                if (s.call(r, e[q], q, e) === false) {
                    break;
                }
            }
            return e;
        }
        ;
        if (!{
            valueOf: 0
        }.propertyIsEnumerable("valueOf")) {
            var f = "constructor,toString,valueOf,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString".split(",");
            var l = Object.prototype;
            n = function (e, u, s) {
                for (var r in e) {
                    if (u.call(s, e[r], r, e) === false) {
                        return e;
                    }
                }
                for (var q = 0; r = f[q]; q++) {
                    var t = e[r];
                    if ((t !== l[r] || p(e, r)) && u.call(s, t, r, e) === false) {
                        break;
                    }
                }
                return e;
            }
            ;
        }
        var k = Object.create || function (e) {
            var q = function () { }
            ;
            q.prototype = e;
            return new q();
        }
        ;
        var o = Object.getOwnPropertyDescriptor;
        var j = Object.defineProperty;
        try {
            var i = {
                a: 1
            };
            o(i, "a");
            j(i, "a", {
                value: 2
            });
        } catch (m) {
            o = function (e, q) {
                return {
                    value: e[q]
                };
            }
            ;
            j = function (e, q, r) {
                e[q] = r.value;
                return e;
            }
            ;
        }
        var b = function (e) {
            n(e, function (r, q) {
                if (q !== "constructor" && q !== "define" && q !== "inherits") {
                    this.define(q, o(e, q) || {
                        writable: true,
                        enumerable: true,
                        configurable: true,
                        value: r
                    });
                }
            }, this);
            return this;
        }
        ;
        var a = function (q) {
            var r = q.inherits;
            var e = p(q, "constructor") ? q.constructor : r ? function () {
                return r.apply(this, arguments);
            }
             : function () { }
            ;
            if (r) {
                var t = r.prototype;
                var s = e.prototype = k(t);
                e.parent = t;
                s.constructor = e;
            }
            e.define = q.define || r && r.define || function (u, v) {
                j(this.prototype, u, v);
                return this;
            }
            ;
            e.implement = b;
            return e.implement(q);
        }
        ;
        a.has = p;
        a.each = n;
        a.create = k;
        a.define = j;
        d.exports = a;
    },
    "6": function (b, d, a, f) {
        var g = Object.prototype.toString
          , c = /number|object|array|string|function|date|regexp|boolean/;
        var e = function (i) {
            if (i == null) {
                return "null";
            }
            var h = g.call(i).slice(8, -1).toLowerCase();
            if (h === "number" && isNaN(i)) {
                return "null";
            }
            if (c.test(h)) {
                return h;
            }
            return "object";
        }
        ;
        d.exports = e;
    },
    "7": function (k, h, ae, d) {
        var O = k("1")
          , b = k("2");
        var ad = b.cancel
          , X = b.request;
        var E = k("5")
          , o = k("3")
          , z = k("8");
        var aj = z.camelize
          , aa = z.clean
          , P = z.capitalize;
        var N = o.map
          , c = o.forEach
          , F = o.indexOf;
        var m = k("a");
        var H = k("b");
        var R = {};
        var l = function (e) {
            return R[e] || (R[e] = z.hyphenate(e));
        }
        ;
        var ag = function (e) {
            return Math.round(e * 1000) / 1000;
        }
        ;
        var w = d.getComputedStyle ? function (ar) {
            var e = getComputedStyle(ar);
            return function (at) {
                return e ? e.getPropertyValue(l(at)) : "";
            }
            ;
        }
         : function (ar) {
             var e = ar.currentStyle;
             return function (at) {
                 return e ? e[aj(at)] : "";
             }
             ;
         }
        ;
        var s = document.createElement("div");
        var L = "border:none;margin:none;padding:none;visibility:hidden;position:absolute;height:0;";
        var ah = function (ar, e) {
            var au = ar.parentNode
              , at = 1;
            if (au) {
                s.style.cssText = L + ("width:100" + e + ";");
                au.appendChild(s);
                at = s.offsetWidth / 100;
                au.removeChild(s);
            }
            return at;
        }
        ;
        var I = function (e) {
            var ar = e.length;
            if (ar === 1) {
                e.push(e[0], e[0], e[0]);
            } else {
                if (ar === 2) {
                    e.push(e[0], e[1]);
                } else {
                    if (ar === 3) {
                        e.push(e[1]);
                    }
                }
            }
            return e;
        }
        ;
        var q = "([-.\\d]+)(%|cm|mm|in|px|pt|pc|em|ex|ch|rem|vw|vh|vm)"
          , t = q + "?"
          , ak = "none|hidden|dotted|dashed|solid|double|groove|ridge|inset|outset|inherit";
        var f = RegExp(q, "g")
          , ao = RegExp(t)
          , J = RegExp(t, "g")
          , C = RegExp(ak);
        var V = function (e) {
            return e == null ? "" : e + "";
        }
        ;
        var j = function (ar, e) {
            if (ar == null || ar === "") {
                return e ? "1" : "";
            }
            return isFinite(ar = +ar) ? ar < 0 ? "0" : ar + "" : "1";
        }
        ;
        try {
            s.style.color = "rgba(0,0,0,0.5)";
        } catch (am) { }
        var af = /^rgba/.test(s.style.color);
        var v = function (ar, e) {
            var av = "rgba(0,0,0,1)", au;
            if (!ar || !(au = O(ar, true))) {
                return e ? av : "";
            }
            if (e) {
                return "rgba(" + au + ")";
            }
            var at = au[3];
            if (at === 0) {
                return "transparent";
            }
            return !af || at === 1 ? "rgb(" + au.slice(0, 3) + ")" : "rgba(" + au + ")";
        }
        ;
        var Z = function (at, e) {
            if (at == null || at === "") {
                return e ? "0px" : "";
            }
            var ar = z.match(at, ao);
            return ar ? ar[1] + (ar[2] || "px") : at;
        }
        ;
        var i = function (at, e) {
            if (at == null || at === "") {
                return e ? "none" : "";
            }
            var ar = at.match(C);
            return ar ? at : e ? "none" : "";
        }
        ;
        var U = function (au, ar) {
            var av = "0px none rgba(0,0,0,1)";
            if (au == null || au === "") {
                return ar ? av : "";
            }
            if (au === 0 || au === "none") {
                return ar ? av : au + "";
            }
            var aw;
            au = au.replace(O.x, function (ax) {
                aw = ax;
                return "";
            });
            var at = au.match(C)
              , e = au.match(J);
            return aa([Z(e ? e[0] : "", ar), i(at ? at[0] : "", ar), v(aw, ar)].join(" "));
        }
        ;
        var u = function (ar, e) {
            if (ar == null || ar === "") {
                return e ? "0px 0px 0px 0px" : "";
            }
            return aa(I(N(aa(ar).split(" "), function (at) {
                return Z(at, e);
            })).join(" "));
        }
        ;
        var a = function (au, at, e) {
            var aw = "rgba(0,0,0,0)"
              , av = e === 3 ? aw + " 0px 0px 0px" : aw + " 0px 0px 0px 0px";
            if (au == null || au === "") {
                return at ? av : "";
            }
            if (au === "none") {
                return at ? av : au;
            }
            var ar = []
              , au = aa(au).replace(O.x, function (ax) {
                  ar.push(ax);
                  return "";
              });
            return N(au.split(","), function (aC, az) {
                var aB = v(ar[az], at)
                  , ax = /inset/.test(aC)
                  , aA = aC.match(J) || ["0px"];
                aA = N(aA, function (aD) {
                    return Z(aD, at);
                });
                while (aA.length < e) {
                    aA.push("0px");
                }
                var ay = ax ? ["inset", aB] : [aB];
                return ay.concat(aA).join(" ");
            }).join(", ");
        }
        ;
        var G = function (ar, e) {
            if (ar == null || ar === "") {
                return "";
            }
            return ar.replace(O.x, function (at) {
                return v(at, e);
            }).replace(f, function (at) {
                return Z(at, e);
            });
        }
        ;
        var p = {}
          , r = {}
          , y = {}
          , S = {};
        var M = function (e) {
            return p[e] || (p[e] = function () {
                var ar = S[e] || e
                  , at = y[e] || G;
                return function () {
                    return at(w(this)(ar), true);
                }
                ;
            }());
        }
        ;
        var Y = function (e) {
            return r[e] || (r[e] = function () {
                var ar = S[e] || e
                  , at = y[e] || G;
                return function (au) {
                    this.style[ar] = at(au, false);
                }
                ;
            }());
        }
        ;
        var A = ["Top", "Right", "Bottom", "Left"]
          , aq = ["TopLeft", "TopRight", "BottomRight", "BottomLeft"];
        c(A, function (ar) {
            var e = "border" + ar;
            c(["margin" + ar, "padding" + ar, e + "Width", ar.toLowerCase()], function (at) {
                y[at] = Z;
            });
            y[e + "Color"] = v;
            y[e + "Style"] = i;
            y[e] = U;
            p[e] = function () {
                return [M(e + "Width").call(this), M(e + "Style").call(this), M(e + "Color").call(this)].join(" ");
            }
            ;
        });
        c(aq, function (e) {
            y["border" + e + "Radius"] = Z;
        });
        y.color = y.backgroundColor = v;
        y.width = y.height = y.minWidth = y.minHeight = y.maxWidth = y.maxHeight = y.fontSize = y.backgroundSize = Z;
        c(["margin", "padding"], function (e) {
            y[e] = u;
            p[e] = function () {
                return N(A, function (ar) {
                    return M(e + ar).call(this);
                }, this).join(" ");
            }
            ;
        });
        y.borderWidth = u;
        y.borderStyle = function (ar, e) {
            if (ar == null || ar === "") {
                return e ? I(["none"]).join(" ") : "";
            }
            ar = aa(ar).split(" ");
            return aa(I(N(ar, function (at) {
                i(at, e);
            })).join(" "));
        }
        ;
        y.borderColor = function (ar, e) {
            if (!ar || !(ar = z.match(ar, O.x))) {
                return e ? I(["rgba(0,0,0,1)"]).join(" ") : "";
            }
            return aa(I(N(ar, function (at) {
                return v(at, e);
            })).join(" "));
        }
        ;
        c(["Width", "Style", "Color"], function (e) {
            p["border" + e] = function () {
                return N(A, function (ar) {
                    return M("border" + ar + e).call(this);
                }, this).join(" ");
            }
            ;
        });
        y.borderRadius = u;
        p.borderRadius = function () {
            return N(aq, function (e) {
                return M("border" + e + "Radius").call(this);
            }, this).join(" ");
        }
        ;
        y.border = U;
        p.border = function () {
            var at;
            for (var e = 0; e < A.length; e++) {
                var ar = M("border" + A[e]).call(this);
                if (at && ar !== at) {
                    return null;
                }
                at = ar;
            }
            return at;
        }
        ;
        y.zIndex = V;
        y.opacity = j;
        var ab = s.style.MsFilter != null && "MsFilter" || s.style.filter != null && "filter";
        if (ab && s.style.opacity == null) {
            var x = /alpha\(opacity=([\d.]+)\)/i;
            r.opacity = function (ar) {
                ar = (ar = j(ar)) === "1" ? "" : "alpha(opacity=" + Math.round(ar * 100) + ")";
                var e = w(this)(ab);
                return this.style[ab] = x.test(e) ? e.replace(x, ar) : e + " " + ar;
            }
            ;
            p.opacity = function () {
                var e = w(this)(ab).match(x);
                return (!e ? 1 : e[1] / 100) + "";
            }
            ;
        }
        var Q = y.boxShadow = function (ar, e) {
            return a(ar, e, 4);
        }
        ;
        var K = y.textShadow = function (ar, e) {
            return a(ar, e, 3);
        }
        ;
        c(["Webkit", "Moz", "ms", "O", null], function (e) {
            c(["transition", "transform", "transformOrigin", "transformStyle", "perspective", "perspectiveOrigin", "backfaceVisibility"], function (ar) {
                var at = e ? e + P(ar) : ar;
                if (e === "ms") {
                    R[at] = "-ms-" + l(ar);
                }
                if (s.style[at] != null) {
                    S[ar] = at;
                }
            });
        });
        var n = S.transition
          , D = S.transform;
        if (n === "OTransition") {
            n = null;
        }
        var ac, W;
        if (!n && D) {
            (function () {
                var av = k("d");
                var ar = "\\s*([-\\d\\w.]+)\\s*";
                var au = RegExp("matrix\\(" + [ar, ar, ar, ar, ar, ar] + "\\)");
                var ax = function (az) {
                    var aA = av.apply(null, az.match(au).slice(1)) || [[0, 0], 0, 0, [0, 0]];
                    return ["translate(" + N(aA[0], function (aB) {
                        return ag(aB) + "px";
                    }) + ")", "rotate(" + ag(aA[1] * 180 / Math.PI) + "deg)", "skewX(" + ag(aA[2] * 180 / Math.PI) + "deg)", "scale(" + N(aA[3], ag) + ")"].join(" ");
                }
                ;
                var at = function (az) {
                    return az || "0px";
                }
                  , e = function (az) {
                      return az || "1";
                  }
                  , ay = function (az) {
                      return az || "0deg";
                  }
                ;
                var aw = {
                    translate: function (aA) {
                        if (!aA) {
                            aA = "0px,0px";
                        }
                        var az = aA.split(",");
                        if (!az[1]) {
                            az[1] = "0px";
                        }
                        return N(az, aa) + "";
                    },
                    translateX: at,
                    translateY: at,
                    scale: function (aA) {
                        if (!aA) {
                            aA = "1,1";
                        }
                        var az = aA.split(",");
                        if (!az[1]) {
                            az[1] = az[0];
                        }
                        return N(az, aa) + "";
                    },
                    scaleX: e,
                    scaleY: e,
                    rotate: ay,
                    skewX: ay,
                    skewY: ay
                };
                W = E({
                    constructor: function (aA) {
                        var aB = this.names = [];
                        var az = this.values = [];
                        aA.replace(/(\w+)\(([-.\d\s\w,]+)\)/g, function (aD, aC, aE) {
                            aB.push(aC);
                            az.push(aE);
                        });
                    },
                    identity: function () {
                        var az = [];
                        c(this.names, function (aA) {
                            var aB = aw[aA];
                            if (aB) {
                                az.push(aA + "(" + aB() + ")");
                            }
                        });
                        return az.join(" ");
                    },
                    sameType: function (az) {
                        return this.names.toString() === az.names.toString();
                    },
                    decompose: function () {
                        var aA = this.toString();
                        s.style.cssText = L + l(D) + ":" + aA + ";";
                        document.body.appendChild(s);
                        var az = w(s)(D);
                        if (!az || az === "none") {
                            az = "matrix(1, 0, 0, 1, 0, 0)";
                        }
                        document.body.removeChild(s);
                        return ax(az);
                    }
                });
                W.prototype.toString = function (aA) {
                    var az = this.values
                      , aB = [];
                    c(this.names, function (aC, aD) {
                        var aE = aw[aC];
                        if (!aE) {
                            return;
                        }
                        var aF = aE(az[aD]);
                        if (!aA || aF !== aE()) {
                            aB.push(aC + "(" + aF + ")");
                        }
                    });
                    return aB.length ? aB.join(" ") : "none";
                }
                ;
                W.union = function (aC, aB) {
                    if (aC === aB) {
                        return;
                    }
                    var az, aA;
                    if (aC === "none") {
                        aA = new W(aB);
                        aB = aA.toString();
                        aC = aA.identity();
                        az = new W(aC);
                    } else {
                        if (aB === "none") {
                            az = new W(aC);
                            aC = az.toString();
                            aB = az.identity();
                            aA = new W(aB);
                        } else {
                            az = new W(aC);
                            aC = az.toString();
                            aA = new W(aB);
                            aB = aA.toString();
                        }
                    }
                    if (aC === aB) {
                        return;
                    }
                    if (!az.sameType(aA)) {
                        aC = az.decompose();
                        aB = aA.decompose();
                    }
                    if (aC === aB) {
                        return;
                    }
                    return [aC, aB];
                }
                ;
                ac = y.transform = function (az) {
                    if (!az || az === "none") {
                        return "none";
                    }
                    return new W(au.test(az) ? ax(az) : az).toString(true);
                }
                ;
                p.transform = function () {
                    var az = this.style;
                    return az[D] || (az[D] = ac(w(this)(D)));
                }
                ;
            })();
        }
        var an = function (at, au, ax) {
            var aw = y[au] || G
              , av = M(au).call(at)
              , ax = aw(ax, true);
            if (av === ax) {
                return;
            }
            if (aw === Z || aw === U || aw === u) {
                var e = ax.match(f)
                  , ar = 0;
                if (e) {
                    av = av.replace(f, function (aB, aE, aC) {
                        var ay = e[ar++]
                          , aD = ay.match(ao)
                          , aA = aD[2];
                        if (aC !== aA) {
                            var az = aC === "px" ? aE : ah(at, aC) * aE;
                            return ag(az / ah(at, aA)) + aA;
                        }
                        return aB;
                    });
                }
                if (ar > 0) {
                    Y(au).call(at, av);
                }
            } else {
                if (aw === ac) {
                    return W.union(av, ax);
                }
            }
            return av !== ax ? [av, ax] : null;
        }
        ;
        var T = E({
            inherits: H,
            constructor: function T(at, au) {
                var ar = M(au)
                  , e = Y(au);
                this.get = function () {
                    return ar.call(at);
                }
                ;
                this.set = function (av) {
                    return e.call(at, av);
                }
                ;
                T.parent.constructor.call(this, this.set);
                this.node = at;
                this.property = au;
            }
        });
        var ai;
        ai = E({
            inherits: T,
            constructor: function ai() {
                return ai.parent.constructor.apply(this, arguments);
            },
            start: function (at) {
                this.stop();
                if (this.duration === 0) {
                    this.cancel(at);
                    return this;
                }
                var e = an(this.node, this.property, at);
                if (!e) {
                    this.cancel(at);
                    return this;
                }
                ai.parent.start.apply(this, e);
                if (!this.cancelStep) {
                    return this;
                }
                var ar = y[this.property] || G;
                if ((ar === Q || ar === K || ar === G) && this.templateFrom !== this.templateTo) {
                    this.cancelStep();
                    delete this.cancelStep;
                    this.cancel(at);
                }
                return this;
            },
            parseEquation: function (e) {
                if (typeof e === "string") {
                    return ai.parent.parseEquation.call(this, e);
                }
            }
        });
        var ap = function (au, ar, e, av) {
            var at = F(ar, au);
            if (at !== -1) {
                ar.splice(at, 1);
                e.splice(at, 1);
                av.splice(at, 1);
            }
        }
        ;
        var al = E({
            inherits: T,
            constructor: function al(ar, at) {
                al.parent.constructor.call(this, ar, at);
                this.hproperty = l(S[at] || at);
                var e = this;
                this.bSetTransitionCSS = function (au) {
                    e.setTransitionCSS(au);
                }
                ;
                this.bSetStyleCSS = function (au) {
                    e.setStyleCSS(au);
                }
                ;
                this.bComplete = function () {
                    e.complete();
                }
                ;
            },
            start: function (ar) {
                this.stop();
                if (this.duration === 0) {
                    this.cancel(ar);
                    return this;
                }
                var e = an(this.node, this.property, ar);
                if (!e) {
                    this.cancel(ar);
                    return this;
                }
                this.to = e[1];
                this.cancelSetTransitionCSS = X(this.bSetTransitionCSS);
                return this;
            },
            setTransitionCSS: function (e) {
                delete this.cancelSetTransitionCSS;
                this.resetCSS(true);
                this.cancelSetStyleCSS = X(this.bSetStyleCSS);
            },
            setStyleCSS: function (ar) {
                delete this.cancelSetStyleCSS;
                var e = this.duration;
                this.cancelComplete = setTimeout(this.bComplete, e);
                this.endTime = ar + e;
                this.set(this.to);
            },
            complete: function () {
                delete this.cancelComplete;
                this.resetCSS();
                this.callback(this.endTime);
            },
            stop: function (e) {
                if (this.cancelExit) {
                    this.cancelExit();
                    delete this.cancelExit;
                } else {
                    if (this.cancelSetTransitionCSS) {
                        this.cancelSetTransitionCSS();
                        delete this.cancelSetTransitionCSS;
                    } else {
                        if (this.cancelSetStyleCSS) {
                            this.cancelSetStyleCSS();
                            delete this.cancelSetStyleCSS;
                            if (e) {
                                this.resetCSS();
                            }
                        } else {
                            if (this.cancelComplete) {
                                clearTimeout(this.cancelComplete);
                                delete this.cancelComplete;
                                if (e) {
                                    this.resetCSS();
                                    this.set(this.get());
                                }
                            }
                        }
                    }
                }
                return this;
            },
            resetCSS: function (ar) {
                var aw = w(this.node)
                  , av = (aw(n + "Property").replace(/\s+/g, "") || "all").split(",")
                  , au = (aw(n + "Duration").replace(/\s+/g, "") || "0s").split(",")
                  , e = (aw(n + "TimingFunction").replace(/\s+/g, "") || "ease").match(/cubic-bezier\([\d-.,]+\)|([a-z-]+)/g);
                ap("all", av, au, e);
                ap(this.hproperty, av, au, e);
                if (ar) {
                    av.push(this.hproperty);
                    au.push(this.duration + "ms");
                    e.push("cubic-bezier(" + this.equation + ")");
                }
                var at = this.node.style;
                at[n + "Property"] = av;
                at[n + "Duration"] = au;
                at[n + "TimingFunction"] = e;
            },
            parseEquation: function (e) {
                if (typeof e === "string") {
                    return al.parent.parseEquation.call(this, e, true);
                }
            }
        });
        var g = n ? al : ai;
        var B = function (e, ar) {
            return typeof e === "function" ? H(e) : m(e, ar);
        }
        ;
        m.implement({
            animate: function (au, ar, e) {
                var aA = au
                  , aB = ar;
                if (typeof au === "string") {
                    aA = {};
                    aA[au] = ar;
                    aB = e;
                }
                if (aB == null) {
                    aB = {};
                }
                var aw = typeof aB;
                aB = aw === "function" ? {
                    callback: aB
                } : aw === "string" || aw === "number" ? {
                    duration: aB
                } : aB;
                var az = aB.callback || function () { }
                  , av = 0
                  , at = 0;
                aB.callback = function (aC) {
                    if (++av === at) {
                        az(aC);
                    }
                }
                ;
                for (var ay in aA) {
                    var ax = aA[ay]
                      , ay = aj(ay);
                    this.forEach(function (aE) {
                        at++;
                        var aD = m(aE)
                          , aC = aD._animations || (aD._animations = {});
                        var aF = aC[ay] || (aC[ay] = new g(aE, ay));
                        aF.setOptions(aB).start(ax);
                    });
                }
                return this;
            },
            style: function (e, aw) {
                var ar = e;
                if (typeof e === "string") {
                    ar = {};
                    ar[e] = aw;
                }
                for (var au in ar) {
                    var at = ar[au]
                      , av = Y(au = aj(au));
                    this.forEach(function (az) {
                        var ay = m(az), ax = ay._animations, aA;
                        if (ax && (aA = ax[au])) {
                            aA.stop(true);
                        }
                        av.call(az, at);
                    });
                }
                return this;
            },
            compute: function (at) {
                at = aj(at);
                var e = this[0];
                if (at === "transform" && ac) {
                    return w(e)(D);
                }
                var ar = M(at).call(e);
                return ar != null ? ar.replace(f, function (au, aw, av) {
                    return av === "px" ? au : ah(e, av) * aw + "px";
                }) : "";
            }
        });
        B.parse = function (at, ar, e) {
            return (y[aj(at)] || G)(ar, e);
        }
        ;
        h.exports = B;
    },
    "8": function (c, d, a, e) {
        var b = c("9");
        b.implement({
            clean: function () {
                return b.trim((this + "").replace(/\s+/g, " "));
            },
            camelize: function () {
                return (this + "").replace(/-\D/g, function (f) {
                    return f.charAt(1).toUpperCase();
                });
            },
            hyphenate: function () {
                return (this + "").replace(/[A-Z]/g, function (f) {
                    return "-" + f.toLowerCase();
                });
            },
            capitalize: function () {
                return (this + "").replace(/\b[a-z]/g, function (f) {
                    return f.toUpperCase();
                });
            },
            escape: function () {
                return (this + "").replace(/([-.*+?^${}()|[\]\/\\])/g, "\\$1");
            },
            number: function () {
                return parseFloat(this);
            }
        });
        if (typeof JSON !== "undefined") {
            b.implement({
                decode: function () {
                    return JSON.parse(this);
                }
            });
        }
        d.exports = b;
    },
    "9": function (e, d, g, c) {
        var j = e("4")["string"];
        var k = ("charAt,charCodeAt,concat,contains,endsWith,indexOf,lastIndexOf,localeCompare,match,replace,search,slice,split,startsWith,substr,substring,toLocaleLowerCase,toLocaleUpperCase,toLowerCase,toString,toUpperCase,trim,valueOf").split(",");
        for (var f = {}, h = 0, b, a; b = k[h++];) {
            if (a = String.prototype[b]) {
                f[b] = a;
            }
        }
        if (!f.trim) {
            f.trim = function () {
                return (this + "").replace(/^\s+|\s+$/g, "");
            }
            ;
        }
        d.exports = j.implement(f);
    },
    a: function (g, f, h, e) {
        var d = g("5")
          , j = g("3").prototype;
        var k = 0;
        var c = function (l) {
            return l === e ? "global" : l.uniqueNumber || (l.uniqueNumber = "n:" + (k++).toString(36));
        }
        ;
        var b = {};
        var i = d({
            constructor: function i(p, o) {
                if (p == null) {
                    return this && this.constructor === i ? new a() : null;
                }
                var x = p;
                if (p.constructor !== a) {
                    x = new a();
                    var v;
                    if (typeof p === "string") {
                        if (!x.search) {
                            return null;
                        }
                        x[x.length++] = o || document;
                        return x.search(p);
                    }
                    if (p.nodeType || p === e) {
                        x[x.length++] = p;
                    } else {
                        if (p.length) {
                            var w = {};
                            for (var u = 0, r = p.length; u < r; u++) {
                                var m = i(p[u], o);
                                if (m && m.length) {
                                    for (var t = 0, s = m.length; t < s; t++) {
                                        var q = m[t];
                                        v = c(q);
                                        if (!w[v]) {
                                            x[x.length++] = q;
                                            w[v] = true;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                if (!x.length) {
                    return null;
                }
                if (x.length === 1) {
                    v = c(x[0]);
                    return b[v] || (b[v] = x);
                }
                return x;
            }
        });
        var a = d({
            inherits: i,
            constructor: function a() {
                this.length = 0;
            },
            unlink: function () {
                return this.map(function (m, l) {
                    delete b[c(m)];
                    return m;
                });
            },
            forEach: j.forEach,
            map: j.map,
            filter: j.filter,
            every: j.every,
            some: j.some
        });
        f.exports = i;
    },
    b: function (h, b, r, n) {
        var c = h("5")
          , a = h("2").request
          , k = h("c");
        var q = h("3").map;
        var g = "([\\d.]+)(s|ms)?"
          , j = "cubic-bezier\\(([-.\\d]+),([-.\\d]+),([-.\\d]+),([-.\\d]+)\\)";
        var p = RegExp(g)
          , e = RegExp(j)
          , m = RegExp(j, "g");
        var i = {
            "default": "cubic-bezier(0.25, 0.1, 0.25, 1.0)",
            linear: "cubic-bezier(0, 0, 1, 1)",
            "ease-in": "cubic-bezier(0.42, 0, 1.0, 1.0)",
            "ease-out": "cubic-bezier(0, 0, 0.58, 1.0)",
            "ease-in-out": "cubic-bezier(0.42, 0, 0.58, 1.0)"
        };
        i.ease = i["default"];
        var o = function (u, t, s) {
            return (t - u) * s + u;
        }
        ;
        var l = function (t) {
            var s = [];
            var u = (t + "").replace(/[-.\d]+/g, function (v) {
                s.push(+v);
                return "@";
            });
            return [s, u];
        }
        ;
        var f = c({
            constructor: function f(u, t) {
                this.setOptions(t);
                this.render = u || function () { }
                ;
                var s = this;
                this.bStep = function (v) {
                    return s.step(v);
                }
                ;
                this.bExit = function (v) {
                    s.exit(v);
                }
                ;
            },
            setOptions: function (s) {
                if (s == null) {
                    s = {};
                }
                if (!(this.duration = this.parseDuration(s.duration || "500ms"))) {
                    throw new Error("invalid duration");
                }
                if (!(this.equation = this.parseEquation(s.equation || "default"))) {
                    throw new Error("invalid equation");
                }
                this.callback = s.callback || function () { }
                ;
                return this;
            },
            parseDuration: function (u) {
                if (u = (u + "").match(p)) {
                    var t = +u[1]
                      , s = u[2] || "ms";
                    if (s === "s") {
                        return t * 1000;
                    }
                    if (s === "ms") {
                        return t;
                    }
                }
            },
            parseEquation: function (t, v) {
                var u = typeof t;
                if (u === "function") {
                    return t;
                } else {
                    if (u === "string") {
                        t = i[t] || t;
                        var s = t.replace(/\s+/g, "").match(e);
                        if (s) {
                            t = q(s.slice(1), function (w) {
                                return +w;
                            });
                            if (v) {
                                return t;
                            }
                            if (t.toString() === "0,0,1,1") {
                                return function (w) {
                                    return w;
                                }
                                ;
                            }
                            u = "object";
                        }
                    }
                }
                if (u === "object") {
                    return k(t[0], t[1], t[2], t[3], 1000 / 60 / this.duration / 4);
                }
            },
            cancel: function (s) {
                this.to = s;
                this.cancelExit = a(this.bExit);
            },
            exit: function (s) {
                this.render(this.to);
                delete this.cancelExit;
                this.callback(s);
            },
            start: function (x, w) {
                this.stop();
                if (this.duration === 0) {
                    this.cancel(w);
                    return this;
                }
                this.isArray = false;
                this.isNumber = false;
                var v = typeof x
                  , u = typeof w;
                if (v === "object" && u === "object") {
                    this.isArray = true;
                } else {
                    if (v === "number" && u === "number") {
                        this.isNumber = true;
                    }
                }
                var t = l(x)
                  , s = l(w);
                this.from = t[0];
                this.to = s[0];
                this.templateFrom = t[1];
                this.templateTo = s[1];
                if (this.from.length !== this.to.length || this.from.toString() === this.to.toString()) {
                    this.cancel(w);
                    return this;
                }
                delete this.time;
                this.length = this.from.length;
                this.cancelStep = a(this.bStep);
                return this;
            },
            stop: function () {
                if (this.cancelExit) {
                    this.cancelExit();
                    delete this.cancelExit;
                } else {
                    if (this.cancelStep) {
                        this.cancelStep();
                        delete this.cancelStep;
                    }
                }
                return this;
            },
            step: function (s) {
                this.time || (this.time = s);
                var y = (s - this.time) / this.duration;
                if (y > 1) {
                    y = 1;
                }
                var B = this.equation(y)
                  , z = this.from
                  , A = this.to
                  , x = this.templateTo;
                for (var v = 0, u = this.length; v < u; v++) {
                    var w = z[v]
                      , C = A[v];
                    x = x.replace("@", C !== w ? o(w, C, B) : C);
                }
                this.render(this.isArray ? x.split(",") : this.isNumber ? +x : x, y);
                if (y !== 1) {
                    this.cancelStep = a(this.bStep);
                } else {
                    delete this.cancelStep;
                    this.callback(s);
                }
            }
        });
        var d = function (t) {
            var s = new f(t);
            return {
                start: function (x, w, u) {
                    var v = typeof u;
                    s.setOptions(v === "function" ? {
                        callback: u
                    } : v === "string" || v === "number" ? {
                        duration: u
                    } : u).start(x, w);
                    return this;
                },
                stop: function () {
                    s.stop();
                    return this;
                }
            };
        }
        ;
        d.prototype = f.prototype;
        b.exports = d;
    },
    c: function (b, c, a, d) {
        c.exports = function (h, j, f, i, l) {
            var g = function (n) {
                var m = 1 - n;
                return 3 * m * m * n * h + 3 * m * n * n * f + n * n * n;
            }
            ;
            var e = function (n) {
                var m = 1 - n;
                return 3 * m * m * n * j + 3 * m * n * n * i + n * n * n;
            }
            ;
            var k = function (n) {
                var m = 1 - n;
                return 3 * (2 * (n - 1) * n + m * m) * h + 3 * (-n * n * n + 2 * m * n) * f;
            }
            ;
            return function (p) {
                var m = p, u, s, q, n, r, o;
                for (q = m,
                o = 0; o < 8; o++) {
                    n = g(q) - m;
                    if (Math.abs(n) < l) {
                        return e(q);
                    }
                    r = k(q);
                    if (Math.abs(r) < 0.000001) {
                        break;
                    }
                    q = q - n / r;
                }
                u = 0,
                s = 1,
                q = m;
                if (q < u) {
                    return e(u);
                }
                if (q > s) {
                    return e(s);
                }
                while (u < s) {
                    n = g(q);
                    if (Math.abs(n - m) < l) {
                        return e(q);
                    }
                    if (m > n) {
                        u = q;
                    } else {
                        s = q;
                    }
                    q = (s - u) * 0.5 + u;
                }
                return e(q);
            }
            ;
        }
        ;
    },
    d: function (e, d, f, b) {
        var c = function (j) {
            return Math.sqrt(j[0] * j[0] + j[1] * j[1]);
        }
        ;
        var g = function (k) {
            var j = c(k);
            return j ? [k[0] / j, k[1] / j] : [0, 0];
        }
        ;
        var a = function (k, j) {
            return k[0] * j[0] + k[1] * j[1];
        }
        ;
        var i = Math.atan2;
        var h = function (k, j, m, l) {
            return [m * k[0] + l * j[0], m * k[1] + l * j[1]];
        }
        ;
        d.exports = function (t, s, r, q, p, o) {
            if (t * q - s * r === 0) {
                return false;
            }
            var j = [p, o];
            var k = [[t, s], [r, q]];
            var l = [c(k[0])];
            k[0] = g(k[0]);
            var u = a(k[0], k[1]);
            k[1] = h(k[1], k[0], 1, -u);
            l[1] = c(k[1]);
            u /= l[1];
            var n = i(k[0][1], k[0][0]);
            return [j, n, u, l];
        }
        ;
    }
});
(function () {
    Browser.Device = {
        name: "other"
    };
    if (Browser.Platform.ios) {
        var a = navigator.userAgent.toLowerCase().match(/(ip(ad|od|hone))/)[0];
        Browser.Device[a] = true;
        Browser.Device.name = a;
    }
    if (this.devicePixelRatio == 2) {
        Browser.hasHighResolution = true;
    }
    Browser.isMobile = !["mac", "linux", "win"].contains(Browser.Platform.name);
}
).call(this);
(function () {
    [Element, Window, Document].invoke("implement", {
        hasEvent: function (f) {
            var e = this.retrieve("events")
              , g = (e && e[f]) ? e[f].values : null;
            if (g) {
                var d = g.length;
                while (d--) {
                    if (d in g) {
                        return true;
                    }
                }
            }
            return false;
        }
    });
    var c = function (e, f, d) {
        f = e[f];
        d = e[d];
        return function (h, g) {
            if (d && !this.hasEvent(g)) {
                d.call(this, h, g);
            }
            if (f) {
                f.call(this, h, g);
            }
        }
        ;
    }
    ;
    var a = function (e, d, f) {
        return function (h, g) {
            d[f].call(this, h, g);
            e[f].call(this, h, g);
        }
        ;
    }
    ;
    var b = Element.Events;
    Element.defineCustomEvent = function (d, f) {
        var e = b[f.base];
        f.onAdd = c(f, "onAdd", "onSetup");
        f.onRemove = c(f, "onRemove", "onTeardown");
        b[d] = e ? Object.append({}, f, {
            base: e.base,
            condition: function (h, g) {
                return (!e.condition || e.condition.call(this, h, g)) && (!f.condition || f.condition.call(this, h, g));
            },
            onAdd: a(f, e, "onAdd"),
            onRemove: a(f, e, "onRemove")
        }) : f;
        return this;
    }
    ;
    Element.enableCustomEvents = function () {
        Object.each(b, function (e, d) {
            if (e.onEnable) {
                e.onEnable.call(e, d);
            }
        });
    }
    ;
    Element.disableCustomEvents = function () {
        Object.each(b, function (e, d) {
            if (e.onDisable) {
                e.onDisable.call(e, d);
            }
        });
    }
    ;
})();
Browser.Features.Touch = (function () {
    try {
        document.createEvent("TouchEvent").initTouchEvent("touchstart");
        return true;
    } catch (a) { }
    return false;
})();
Browser.Features.iOSTouch = (function () {
    var a = "cantouch"
      , c = document.html
      , f = false;
    if (!c.addEventListener) {
        return false;
    }
    var d = function () {
        c.removeEventListener(a, d, true);
        f = true;
    }
    ;
    try {
        c.addEventListener(a, d, true);
        var e = document.createEvent("TouchEvent");
        e.initTouchEvent(a);
        c.dispatchEvent(e);
        return f;
    } catch (b) { }
    d();
    return false;
})();
(function () {
    var a = function (c) {
        if (!c.target || c.target.tagName.toLowerCase() != "select") {
            c.preventDefault();
        }
    }
    ;
    var b;
    Element.defineCustomEvent("touch", {
        base: "touchend",
        condition: function (c) {
            if (b || c.targetTouches.length != 0) {
                return false;
            }
            var e = c.changedTouches[0]
              , d = document.elementFromPoint(e.clientX, e.clientY);
            do {
                if (d == this) {
                    return true;
                }
            } while (d && (d = d.parentNode)); return false;
        },
        onSetup: function () {
            this.addEvent("touchstart", a);
        },
        onTeardown: function () {
            this.removeEvent("touchstart", a);
        },
        onEnable: function () {
            b = false;
        },
        onDisable: function () {
            b = true;
        }
    });
})();
if (Browser.Features.iOSTouch) {
    (function () {
        var a = "click";
        delete Element.NativeEvents[a];
        Element.defineCustomEvent(a, {
            base: "touchend"
        });
    })();
}
if (Browser.Features.Touch) {
    (function () {
        var a = "pinch", d = a + ":threshold", c, e;
        var b = {
            touchstart: function (f) {
                if (f.targetTouches.length == 2) {
                    e = true;
                }
            },
            touchmove: function (g) {
                if (c || !e) {
                    return;
                }
                g.preventDefault();
                var f = this.retrieve(d, 0.5);
                if (g.scale < (1 + f) && g.scale > (1 - f)) {
                    return;
                }
                e = false;
                g.pinch = (g.scale > 1) ? "in" : "out";
                this.fireEvent(a, g);
            }
        };
        Element.defineCustomEvent(a, {
            onSetup: function () {
                this.addEvents(b);
            },
            onTeardown: function () {
                this.removeEvents(b);
            },
            onEnable: function () {
                c = false;
            },
            onDisable: function () {
                c = true;
            }
        });
    })();
}
(function () {
    var a = "swipe"
      , c = a + ":distance"
      , f = a + ":cancelVertical"
      , g = 50;
    var b = {}, e, d;
    var h = function () {
        d = false;
    }
    ;
    var i = {
        touchstart: function (j) {
            if (j.touches.length > 1) {
                return;
            }
            var k = j.touches[0];
            d = true;
            b = {
                x: k.pageX,
                y: k.pageY
            };
        },
        touchmove: function (l) {
            if (e || !d) {
                return;
            }
            var p = l.changedTouches[0]
              , j = {
                  x: p.pageX,
                  y: p.pageY
              };
            if (this.retrieve(f) && Math.abs(b.y - j.y) > 10) {
                d = false;
                return;
            }
            var o = this.retrieve(c, g)
              , n = j.x - b.x
              , m = n < -o
              , k = n > o;
            if (!k && !m) {
                return;
            }
            l.preventDefault();
            d = false;
            l.direction = (m ? "left" : "right");
            l.start = b;
            l.end = j;
            this.fireEvent(a, l);
        },
        touchend: h,
        touchcancel: h
    };
    Element.defineCustomEvent(a, {
        onSetup: function () {
            this.addEvents(i);
        },
        onTeardown: function () {
            this.removeEvents(i);
        },
        onEnable: function () {
            e = false;
        },
        onDisable: function () {
            e = true;
            h();
        }
    });
})();
(function () {
    var b = "touchhold", e = b + ":delay", d, f;
    var a = function (g) {
        clearTimeout(f);
    }
    ;
    var c = {
        touchstart: function (g) {
            if (g.touches.length > 1) {
                a();
                return;
            }
            f = (function () {
                this.fireEvent(b, g);
            }
            ).delay(this.retrieve(e) || 750, this);
        },
        touchmove: a,
        touchcancel: a,
        touchend: a
    };
    Element.defineCustomEvent(b, {
        onSetup: function () {
            this.addEvents(c);
        },
        onTeardown: function () {
            this.removeEvents(c);
        },
        onEnable: function () {
            d = false;
        },
        onDisable: function () {
            d = true;
            a();
        }
    });
})();
((function () {
    if (typeof this.RokBox == "undefined") {
        this.RokBox = {};
    }
    this.RokBox.Media = new Class({
        Implements: [Options, Events],
        options: {
            data: "rokbox",
            formats: {
                image: {
                    matcher: /(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp)((\?|#).*)?$)/i,
                    params: {},
                    type: "image"
                },
                iframe: {
                    matcher: "",
                    params: {},
                    type: "iframe"
                },
                audio: {
                    matcher: /(\.(mp3|wav|ogg)((\?|#).*)?$)/i,
                    params: {
                        autoplay: "autoplay",
                        controls: "controls"
                    },
                    type: "audio"
                },
                video: {
                    matcher: /(\.(ogm|ogv|webm|mp4|swf)((\?|#).*)?$)/i,
                    params: {
                        autoplay: "autoplay",
                        controls: "controls"
                    },
                    type: "video"
                },
                youtube: {
                    matcher: /(youtube\.com|youtu\.be|youtube-nocookie\.com)\/(watch\?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*)).*/i,
                    params: {
                        autoplay: 1,
                        autohide: 1,
                        fs: 1,
                        rel: 0,
                        hd: 1,
                        vq: "hd1080",
                        wmode: "opaque",
                        enablejsapi: 1
                    },
                    type: "iframe",
                    url: "//www.youtube.com/embed/$3"
                },
                vimeo: {
                    matcher: /(?:vimeo(?:pro)?.com)\/(?:[^\d]+)?(\d+)(?:.*)/,
                    params: {
                        autoplay: 1,
                        hd: 1,
                        show_title: 1,
                        show_byline: 1,
                        show_portrait: 0,
                        fullscreen: 1
                    },
                    type: "iframe",
                    url: "//player.vimeo.com/video/$1"
                },
                metacafe: {
                    matcher: /metacafe.com\/(?:watch|fplayer)\/([\w\-]{1,10})/,
                    params: {
                        flashVars: "playerVars=autoPlay=yes"
                    },
                    type: "swf",
                    aspect: {
                        w: 600,
                        h: 338
                    },
                    url: function (b, c, a) {
                        return "//www.metacafe.com/fplayer/" + b[1] + "/.swf";
                    }
                },
                dailymotion: {
                    matcher: /dailymotion.com\/video\/(.*)\/?(.*)/,
                    params: {
                        additionalInfos: 0,
                        autoStart: 1
                    },
                    type: "swf",
                    url: "//www.dailymotion.com/swf/video/$1"
                },
                twitvid: {
                    matcher: /(twitvid|telly)\.com\/([a-zA-Z0-9_\-\?\=]+)/i,
                    params: {
                        autoplay: 1
                    },
                    type: "iframe",
                    url: "//www.$1.com/embed.php?guid=$2"
                },
                spotify: {
                    matcher: /open\.spotify\.com\/([a-zA-Z0-9\/]+)/i,
                    params: {},
                    type: "iframe",
                    aspect: {
                        w: 300,
                        h: 380
                    },
                    url: function (a, b) {
                        return "//embed.spotify.com/?uri=" + a[1].split("/").join(":");
                    }
                },
                twitpic: {
                    matcher: /twitpic\.com\/(?!(?:place|photos|events)\/)([a-zA-Z0-9\?\=\-]+)/i,
                    type: "image",
                    url: "//twitpic.com/show/full/$1/"
                },
                instagram: {
                    matcher: /(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,
                    type: "image",
                    url: "//$1/p/$2/media/?size=l"
                },
                google_maps: {
                    matcher: /maps\.google\.([a-z]{2,3}(\.[a-z]{2})?)\/(\?ll=|maps\?)(.*)/i,
                    type: "iframe",
                    aspect: {
                        w: 640,
                        h: 480
                    },
                    url: function (a, b) {
                        return "//maps.google." + a[1] + "/" + a[3] + "" + a[4] + "&output=" + (a[4].indexOf("layer=c") > 0 ? "svembed" : "embed");
                    }
                }
            }
        },
        initialize: function (a) {
            this.setOptions(a);
        },
        format: function (a) {
            var c = this.getFormat(a)
              , b = a.match(c.matcher ? c.matcher : "")
              , d = c.params || {};
            if (typeof c.url == "function") {
                return c.url.call(this, b, d);
            }
            a = c.url || a;
            b.forEach(function (f, e) {
                a = a.replace("$" + e, f || "");
            }, this);
            d = Object.toQueryString(d);
            if (d.length) {
                a += (a.indexOf("?") > 0 ? "&" : "?") + d;
            }
            return a;
        },
        getFormat: function (a) {
            var b;
            Object.forEach(this.options.formats, function (d, c) {
                if (d.matcher && a.match(d.matcher)) {
                    b = d;
                }
            });
            return b || "iframe";
        },
        getType: function (b) {
            var a;
            Object.forEach(this.options.formats, function (d, c) {
                if (d.matcher && b.match(d.matcher)) {
                    a = d.type;
                }
            });
            return a || "iframe";
        },
        getAspect: function (b) {
            var a;
            Object.forEach(this.options.formats, function (d, c) {
                if (d.matcher && b.match(d.matcher)) {
                    a = d.aspect;
                }
            });
            return a || this.options.formats.iframe.aspect || {
                w: 1280,
                h: 720
            };
        },
        getParams: function (b) {
            var a;
            Object.forEach(this.options.formats, function (d, c) {
                if (d.matcher && b.match(d.matcher)) {
                    a = d.params;
                }
            });
            return a || {};
        }
    });
})());
((function () {
    if (typeof this.rokbox != "undefined") {
        return;
    }
    if (typeof this.RokBox == "undefined") {
        this.RokBox = {};
    }
    var c = this.RokBox;
    var b = navigator.userAgent.match(/Webkit/i)
      , a = navigator.userAgent.match(/Version\/6.+Safari/i)
      , e = navigator.userAgent.match(/MSIE\s8.0.+Trident/i)
      , d = (navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false);
    String.implement({
        htmlEncode: function () {
            return this.replace(/&[^(#\d+;|a-z+;)]/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
        },
        htmlDecode: function () {
            return this.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"');
        }
    });
    this.RokBox.Class = new Class({
        Implements: [Options, Events],
        options: {
            data: "rokbox"
        },
        initialize: function (f) {
            this.setOptions(f, RokBoxSettings || {});
            Browser.Features.Touch = (function () {
                return !!("ontouchstart" in window);
            })();
            this.bound = {
                resize: null
            };
            this._build();
            this.attach();
            this.isFitting = false;
            this.isTouch = Browser.Features.Touch;
            if (this.isTouch) {
                this.wrapper.addClass("touch-device");
            }
            this.media = new c.Media();
        },
        attach: function () {
            if (document.retrieve(this.options.data + ":attached", false)) {
                return;
            }
            var m = 0;
            var i = document.retrieve(this.options.data + ":open", function (o, n) {
                if (o && (o.shift || o.meta || o.rightClick)) {
                    return true;
                }
                if (o) {
                    o.preventDefault();
                }
                this.open(n);
            }
            .bind(this))
              , l = document.retrieve(this.options.data + ":close", function (o, n) {
                  if ((!this.isOpen && !this.isOpening) || (o && o.rightClick)) {
                      return true;
                  }
                  if (o.target && !o.target.get("data-rokboxclose") && (o.target == this.container || this.container.contains(o.target))) {
                      return true;
                  }
                  if (o.target && !o.target.get("data-rokboxclose") && ((o.target == this.header || this.header.contains(o.target)) || (o.target == this.footer || this.footer.contains(o.target)))) {
                      return true;
                  }
                  this.close();
                  o.stop();
              }
            .bind(this))
              , g = document.retrieve(this.options.data + ":fitscreen", function (o, n) {
                  if (o && o.rightClick) {
                      return true;
                  }
                  this.fitscreen(n);
              }
            .bind(this))
              , j = document.retrieve(this.options.data + ":unfitscreen", function (o, n) {
                  if (o && o.rightClick) {
                      return true;
                  }
                  this.unfitscreen(n);
              }
            .bind(this))
              , h = document.retrieve(this.options.data + ":toggleFitscreen", function (o, n) {
                  if (o && o.rightClick) {
                      return true;
                  }
                  this[(this.isFitting) ? "unfitscreen" : "fitscreen"](n);
              }
            .bind(this))
              , f = document.retrieve(this.options.data + ":navigation", function (p, n) {
                  var o;
                  if (p && p.rightClick) {
                      return true;
                  }
                  if (!n && (p.key == "left" || p.key == "right")) {
                      n = document.getElement("[data-rokbox" + (p.key == "left" ? "previous" : "next") + "]");
                  }
                  if (!n && (p.direction == "left" || p.direction == "right")) {
                      n = document.getElement("[data-rokbox" + (p.direction == "left" ? "previous" : "next") + "]");
                  }
                  o = document.getElement("[href=" + n.get("data-rokboxnavigation") + "][data-rokbox-album=" + n.get("data-rokboxnavigation-album") + "]");
                  if (o) {
                      this.load(o);
                  }
              }
            .bind(this));
            if (Browser.Features.Touch && !Browser.Platform.win) {
                document.addEvent("touchstart:relay([data-rokbox])", function (n) {
                    if (n.touches.length > 1) {
                        return;
                    }
                    var o = n.touches[0];
                    m = {
                        x: o.pageX,
                        y: o.pageY
                    };
                });
                document.addEvent("touchend:relay([data-rokbox])", function (o) {
                    if (o.changedTouches && o.changedTouches.length > 1) {
                        return;
                    }
                    var p = o.changedTouches[0], n;
                    n = {
                        x: p.pageX,
                        y: p.pageY
                    };
                    if (n.x == m.x && n.y == m.y) {
                        if (o.target.get("data-rokbox") == null) {
                            o.target = o.target.getParent("[data-rokbox]");
                        }
                        return i(o, o.target);
                    } else {
                        return true;
                    }
                });
                var k;
                document.getElements(".gf-menu li a").addEvent("touchstart", function (n) {
                    if (this.getParent(".gf-menu-device-wrapper")) {
                        return;
                    }
                    if (!this.getParent("li").hasClass("parent")) {
                        this.click();
                        n.stop();
                    }
                    if (k === this || this.getParent("li").hasClass("grouped") || this.getParent("li").hasClass("modules")) {
                        return this.click();
                    }
                    k = this;
                    return true;
                });
                document.getElements(".gf-menu li a").addEvent("touchend", function (n) {
                    if (this.getParent(".gf-menu-device-wrapper")) {
                        return;
                    }
                    return false;
                });
            } else {
                document.addEvent("click:relay([data-rokbox])", i);
            }
            document.addEvents({
                "keyup:keys(esc)": l,
                "click:relay([data-rokboxwrapper])": l,
                "keydown:keys(f)": h,
                "click:relay([data-rokboxfitscreen])": g,
                "click:relay([data-rokboxunfitscreen])": j,
                "click:relay([data-rokboxprevious], [data-rokboxnext])": f,
                "keydown:keys(right)": f,
                "keydown:keys(left)": f,
                swipe: f
            });
            document.store(this.options.data + ":attached", true);
            document.store("swipe:cancelVertical", true);
            $$("[data-rokbox]").addEvent(this.isTouch ? "touchstart" : "click", function (n) {
                if (n) {
                    n.preventDefault();
                }
            });
        },
        detach: function () {
            if (!document.retrieve(this.options.data + ":attached", true)) {
                return;
            }
            var h = document.retrieve(this.options.data + ":open")
              , j = document.retrieve(this.options.data + ":close")
              , g = document.retrieve(this.options.data + ":fitscreen")
              , i = document.retrieve(this.options.data + ":unfitscreen")
              , f = document.retrieve(this.options.data + ":navigation");
            document.removeEvents({
                "click:relay([data-rokbox])": h,
                "keyup:keys(esc)": j,
                "click:relay([data-rokboxwrapper])": j,
                "click:relay([data-rokboxfitscreen])": g,
                "click:relay([data-rokboxunfitscreen])": i,
                "click:relay([data-rokboxprevious], [data-rokboxnext])": f
            });
            document.store(this.options.data + ":attached", false);
        },
        open: function (f) {
            if (this.isOpening) {
                return this;
            }
            if (this.isOpen) {
                return this.load(f);
            }
            this.isOpening = true;
            this._openAndFixJump();
            moofx(this.wrapper).style({
                display: "block"
            }).animate({
                opacity: 1
            }, {
                duration: 300
            });
            this.containerCaption.set("html", "").addClass("rokbox-hidden");
            this.footer.setStyle("display", "none");
            moofx(this.container).style({
                top: "-50%",
                opacity: 0
            }).animate({
                top: 0,
                opacity: 1
            }, {
                duration: 300,
                callback: function () {
                    this.load(f);
                }
                .bind(this)
            });
        },
        close: function (f) {
            moofx(this.wrapper).animate({
                opacity: 0
            }, {
                duration: 300,
                callback: function () {
                    window.removeEvent("resize", this.bound.resize);
                    this.wrapper.setStyle("display", "none");
                    this.container.setStyles({
                        maxWidth: null,
                        maxHeight: null
                    });
                    if (!this.isTouch) {
                        this.containerControls.setStyle("display", "none");
                    }
                    this.containerContent.setStyles({
                        maxWidth: null,
                        maxHeight: null,
                        width: null,
                        height: null
                    }).empty();
                    this.object = null;
                    this.isOpen = false;
                    this.isOpening = false;
                    document.body.setStyle("margin-right", 0).removeClass("rokbox-opened");
                }
                .bind(this)
            });
        },
        load: function (n) {
            if (!n) {
                return;
            }
            var i = n.get("href"), j = this.media.format(i), t = this.media.getType(i), g = this.media.getAspect(i), l, r, m = {}, k, v, s = true, f;
            window.removeEvent("resize", this.bound.resize);
            this.setNavigation(n);
            this.showSpinner();
            this.setFitting();
            if (n.get("data-rokbox-element")) {
                t = "element";
            }
            v = n.get("data-rokbox-size") ? n.get("data-rokbox-size").split(" ") : false;
            m = {
                href: j,
                element: n,
                type: t,
                aspect: g,
                size: v
            };
            switch (t) {
                case "image":
                    l = new Image();
                    break;
                case "element":
                    l = new Element("div");
                    m.rule = n.get("data-rokbox-element");
                    s = false;
                    break;
                case "audio":
                    f = v ? {
                        width: v[0],
                        height: v[1]
                    } : {
                        width: 300,
                        height: 30
                    };
                    if (i.match(/\.mp3$/i) && Browser.firefox) {
                        l = new Element("object", {
                            data: i,
                            type: "application/x-mplayer-2",
                            width: f.width,
                            height: f.height + 60
                        }).set("html", '<param name="filename" value="' + i + '"><param name="ShowControls" value="1"><param name="AutoStart" value="true"><embed type="application/x-mplayer-2" src="' + i + '" width="' + f.width + '" height="' + (f.height + 60) + '" showcontrols="true" autostart="true"></embed>').setStyles({
                            width: f.width,
                            height: f.height
                        });
                        m.html5 = false;
                    } else {
                        var p = i.match(/\.mp3$/i) ? "video" : "audio";
                        l = new Element(p).set("html", "Your browser does not support the <code><audio></code> element.");
                        k = this.media.getParams(i);
                        l.set("src", i).set("width", f.width).set("height", f.height + 60);
                        Object.forEach(k, function (h, w) {
                            l.set(w, h);
                        }, this);
                        if (p == "video") {
                            l.set("type", "audio/mpeg");
                        }
                        m.html5 = true;
                    }
                    s = false;
                    break;
                case "video":
                    f = v ? {
                        width: v[0],
                        height: v[1]
                    } : {
                        width: 600,
                        height: 400
                    };
                    if (i.match(/\.swf$/i) && Browser.firefox) {
                        l = new Element("object", {
                            classid: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
                            codebase: "http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0",
                            width: f.width,
                            height: f.height
                        }).set("html", '<param name="movie" value="' + i + '"><param name="quality" value="high"><embed src="' + i + '" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" width="' + f.width + '" height="' + f.height + '" type="application/x-shockwave-flash"></embed>').setStyles({
                            width: f.width,
                            height: f.height
                        });
                        m.html5 = false;
                        s = false;
                    } else {
                        l = new Element("video").set("html", "Your browser does not support the <code>video</code> element.");
                        k = this.media.getParams(i);
                        if (i.match(/\.mp4$/i) && l.canPlayType("video/mp4").length) {
                            l.set("src", j);
                        }
                        if (i.match(/\.webm$/i) && l.canPlayType("video/webm").length) {
                            l.set("src", j);
                        }
                        if (i.match(/\.ogg$/i) && l.canPlayType("video/ogg").length) {
                            l.set("src", j);
                        }
                        if (i.match(/\.ogv$/i) && l.canPlayType("video/ogv").length) {
                            l.set("src", j);
                        }
                        if (v) {
                            l.setStyles(f);
                        } else {
                            l.setStyles({
                                width: "100%",
                                height: "auto"
                            });
                        }
                        Object.forEach(k, function (h, w) {
                            l.set(w, h);
                        }, this);
                        m.html5 = true;
                        s = true;
                    }
                    break;
                case "swf":
                    var u = Math.min(window.getSize().x - 100, g.w)
                      , o = u * g.h / g.w;
                    if (v) {
                        u = v[0];
                        o = v[1];
                    }
                    var q = new Element("embed", {
                        src: j,
                        type: "application/x-shockwave-flash",
                        width: u,
                        height: o
                    });
                    k = this.media.getParams(i);
                    l = new Element("object", {
                        classid: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
                        width: "100%",
                        height: "100%"
                    });
                    l.adopt(new Element("param", {
                        name: "move",
                        value: j
                    }));
                    Object.forEach(k, function (h, w) {
                        new Element("param").set(w, h);
                        q.set(w, h);
                    }, this);
                    q.inject(l);
                    this.bound.resize = this._resizeObject.pass([l, m], this);
                    if (!b) {
                        window.addEvent("resize", this.bound.resize);
                    }
                    s = false;
                    break;
                case "iframe":
                default:
                    var u = Math.min(window.getSize().x - 100, g.w)
                      , o = u * g.h / g.w;
                    if (v) {
                        u = v[0];
                        o = v[1];
                    }
                    l = new IFrame({
                        resize: true,
                        frameborder: 0,
                        webkitAllowFullScreen: true,
                        mozallowfullscreen: true,
                        allowFullScreen: true,
                        width: u,
                        height: o
                    });
                    this.bound.resize = this._resizeObject.pass([l, m], this);
                    if (!b) {
                        window.addEvent("resize", this.bound.resize);
                    }
                    if (j.match(/\.pdf$/)) {
                        s = false;
                        l.set("src", j);
                    }
                    break;
            }
            document.id(l).inject(document.body).setStyle("display", "none");
            if (s) {
                if (m.html5 && m.type == "video") {
                    l.addEventListener("canplay", function () {
                        m.videoSize = {
                            width: l.videoWidth,
                            height: l.videoHeight
                        };
                        this["_load" + t.capitalize()](l, m);
                    }
                    .bind(this), false);
                    if (d) {
                        m.videoSize = {
                            width: l.videoWidth,
                            height: l.videoHeight
                        };
                        this["_load" + t.capitalize()](l, m);
                        l.play();
                    }
                } else {
                    l.addEvent("load", this["_load" + t.capitalize()].pass([l, m], this));
                    l.set("src", j);
                }
                if (Browser.firefox && !!i.match(/\.mp4$/i)) {
                    if (!l.canPlayType("video/mp4")) {
                        new Element("source").set("src", i).set("type", "video/mp4").inject(l, "top");
                        new Element("source").set("src", i.replace(/\.mp4/, ".ogg")).set("type", "video/ogg").inject(l, "top");
                        new Element("source").set("src", i.replace(/\.mp4/, ".ogv")).set("type", "video/ogv").inject(l, "top");
                        new Element("source").set("src", i.replace(/\.mp4/, ".webm")).set("type", "video/webm").inject(l, "top").onerror = this._setError.pass([l, m], this);
                    }
                }
                l.onerror = this._setError.pass([l, m], this);
            } else {
                this["_load" + t.capitalize()](l, m);
            }
        },
        fitscreen: function (h) {
            var i = (this.containerContent.getElement("img") || this.containerContent.getElement("iframe"));
            if (!i) {
                return;
            }
            var g = {
                maxWidth: this.containerContent.getStyle("maxWidth"),
                maxHeight: this.containerContent.getStyle("maxHeight"),
                width: i ? i.getStyle("width").toInt() || "auto" : "auto",
                height: i ? i.getStyle("height").toInt() || "auto" : "auto"
            }
              , f = window.getSize();
            if (a) {
                moofx(i).style({
                    width: "inherit"
                });
            }
            this.container.store(this.options.data + ":fitscreen-size", {
                maxWidth: g.maxWidth,
                maxHeight: g.maxHeight,
                width: g.width,
                height: g.height,
                viewport: f
            });
            moofx(this.containerContent).style({
                maxWidth: null,
                maxHeight: null
            });
            moofx(i).style({
                width: null,
                height: null
            });
            moofx(this.container).style({
                maxWidth: "100%",
                maxHeight: "100%"
            });
            document.getElement("[data-rokboxfitscreen]").setStyle("display", "none");
            document.getElement("[data-rokboxunfitscreen]").setStyle("display", "block");
            (function () {
                if (a || e) {
                    moofx(i).style({
                        width: "100%"
                    });
                }
            }
            .bind(this)).delay(5);
            this.isFitting = true;
        },
        unfitscreen: function (h) {
            var g = {
                maxWidth: this.container.retrieve(this.options.data + ":fitscreen-size").maxWidth,
                maxHeight: this.container.retrieve(this.options.data + ":fitscreen-size").maxHeight,
                width: this.container.retrieve(this.options.data + ":fitscreen-size").width,
                height: this.container.retrieve(this.options.data + ":fitscreen-size").height
            }
              , f = this.container.retrieve(this.options.data + ":fitscreen-size").viewport;
            if (a || e) {
                moofx(this.containerContent.getElement("img")).style({
                    width: "inherit"
                });
            }
            this.containerContent.setStyles({
                maxWidth: g.maxWidth,
                maxHeight: g.maxHeight
            });
            moofx(this.container).style({
                maxWidth: null,
                maxHeight: null
            });
            moofx(this.containerContent.getElement("img") || this.containerContent.getElement("iframe")).style({
                width: g.width,
                height: g.height
            });
            document.getElement("[data-rokboxunfitscreen]").setStyle("display", "none");
            document.getElement("[data-rokboxfitscreen]").setStyle("display", "block");
            if (a || e) {
                moofx(this.containerContent.getElement("img")).style({
                    width: "100%"
                });
            }
            this.isFitting = false;
        },
        setNavigation: function (g) {
            var n = g.get("data-rokbox-album")
              , m = document.getElements("[data-rokboxprevious], [data-rokboxnext]")
              , h = document.getElements("[data-rokboxprevious]")
              , l = document.getElements("[data-rokboxnext]");
            if (!n) {
                m.setStyle("display", "none");
                return this;
            }
            var f = document.getElements("[data-rokbox-album=" + n + "]")
              , k = f.indexOf(g)
              , j = f[k - 1]
              , i = f[k + 1];
            if (k == -1 || f.length == 1) {
                m.setStyle("display", "none");
                this.footer.setStyle("display", "none");
                return this;
            }
            if (typeof j == "undefined") {
                j = f[f.length - 1];
            }
            if (typeof i == "undefined") {
                i = f[0];
            }
            h.set("data-rokboxnavigation", j.get("href")).set("data-rokboxnavigation-album", j.get("data-rokbox-album"));
            l.set("data-rokboxnavigation", i.get("href")).set("data-rokboxnavigation-album", i.get("data-rokbox-album"));
            m.setStyle("display", "block");
            if (Browser.Features.Touch) {
                this.footer.setStyle("display", "block");
            }
            return this;
        },
        setType: function (f) {
            this.container.removeClass(this.options.data + "-type-" + this.type);
            this.type = f;
            this.container.addClass(this.options.data + "-type-" + this.type);
        },
        setFitting: function () {
            document.getElements(this.isFitting ? "[data-rokboxunfitscreen]" : "[data-rokboxfitscreen]").setStyle("display", "none");
        },
        showSpinner: function () {
            this.container.addClass("rokbox-loading");
        },
        hideSpinner: function () {
            this.container.removeClass("rokbox-loading");
        },
        _build: function () {
            if (this.wrapper || document.getElement("[data-rokboxwrapper]")) {
                return this;
            }
            var g = ["outer", "row", "inner", "container"], f = ["loader", "content", "controls"], h = {
                x: "close",
                p: "previous",
                n: "next",
                d: "fitscreen",
                w: "unfitscreen"
            }, i;
            this.wrapper = new Element("div[data-rokboxwrapper]." + this.options.data + "-wrapper").inject(document.body);
            g.forEach(function (k, j) {
                this[k] = new Element("div[data-" + this.options.data + k + "]." + this.options.data + "-" + k).inject(this[g[j - 1]] || this.wrapper);
            }, this);
            f.forEach(function (j) {
                this["container" + j.capitalize()] = new Element("div[data-" + this.options.data + j + "]." + this.options.data + "-" + j).inject(this.container);
            }, this);
            ["header", "footer"].forEach(function (k, j) {
                this[k] = new Element("div[data-" + this.options.data + k + "]." + this.options.data + "-" + k).inject(this.row, !j ? "before" : "after");
            }, this);
            Object.forEach(h, function (j, k) {
                i = j.capitalize();
                if (k != "p" && k != "n") {
                    this["controls" + i] = new Element('div[data-rokboxicon="' + k + '"][data-' + this.options.data + j + "]." + this.options.data + "-" + j).inject(this.containerControls);
                } else {
                    this["controls" + i] = new Element("div[data-" + this.options.data + j + "]." + this.options.data + "-" + j).inject(this.containerControls);
                    new Element('div[data-rokboxicon="' + k + '"]').inject(this["controls" + i]);
                }
                if (["p", "n"].contains(k)) {
                    this["controls" + i].clone().inject(this.footer);
                }
                if (k == "x") {
                    this["controls" + i].clone().inject(this.header);
                }
            }, this);
            this.containerLoader.adopt(new Element("div." + this.options.data + "-loader-image"));
            this.containerCaption = new Element("div[data-" + this.options.data + "caption]." + this.options.data + "-caption").inject(this.container);
        },
        _loadImage: function (m, o) {
            var n = this.containerContent.getSize(), s, j, g = {};
            this.setType(o.type);
            if (e) {
                var k = m.clone().inject(document.body).setStyles({
                    display: "block",
                    visibility: "visible",
                    position: "absolute",
                    top: "-30000px"
                });
                g = {
                    width: k.width,
                    height: k.height
                };
                k.dispose();
            }
            moofx(m).style({
                opacity: 0,
                visibility: "hidden",
                display: "block"
            });
            if (a || e) {
                moofx(m).style({
                    width: "inherit"
                });
            }
            if (o.size) {
                moofx(m).style({
                    width: o.size[0],
                    height: o.size[1]
                });
            }
            m.inject(this.containerContent.empty());
            if (o.type != "element" && o.type != "audio" && o.type != "video") {
                this.containerContent.adopt(new Element("div.rokbox-contentborder"));
            }
            moofx(this.containerContent).style({
                maxWidth: null,
                maxHeight: null
            });
            if (o.size && this.isFitting) {
                moofx(m).style({
                    width: null,
                    height: null
                });
            }
            this.containerCaption.set("html", o.element.get("data-rokbox-caption") || "").removeClass("rokbox-hidden");
            s = this.containerContent.getSize();
            if (o.videoSize) {
                s = {
                    x: o.videoSize.width || s.x,
                    y: o.videoSize.height || s.y
                };
            }
            j = this.container.getComputedSize({
                styles: ["padding", "border", "margin"]
            }).totalHeight;
            if (!s.x) {
                return;
            }
            moofx(m).style({
                display: "none"
            });
            moofx(this.containerCaption.addClass("rokbox-hidden")).style({
                opacity: 0
            });
            if (a || e) {
                moofx(m).style({
                    width: "100%"
                });
            }
            moofx(this.containerContent).style({
                width: !this.isOpen ? this.containerContent.getSize().x : n.x,
                height: !this.isOpen ? this.containerContent.getSize().y : n.y
            });
            var q = window.getSize()
              , i = this.containerContent.getSize();
            if (j >= q.y) {
                var l = this.container.getStyle("margin-bottom").toInt()
                  , r = document.getElement("[data-rokboxcaption]")
                  , p = r ? r.getSize().y : 0
                  , f = Math.round(q.y * s.y / j) - p - l
                  , h = Math.round(s.x * f / s.y);
                if (!this.isFitting) {
                    s.x = h;
                    s.y = f;
                }
            }
            if (!o.error && o.type != "element") {
                document.getElements(this.isFitting ? "[data-rokboxunfitscreen]" : "[data-rokboxfitscreen]").setStyle("display", m.width == s.x ? "none" : "block");
            } else {
                document.getElements(this.isFitting ? "[data-rokboxunfitscreen]" : "[data-rokboxfitscreen]").setStyle("display", "none");
            }
            if (!o.error && o.element.get("data-rokbox-caption") && o.element.get("data-rokbox-caption").length) {
                moofx(this.containerCaption.removeClass("rokbox-hidden")).animate({
                    opacity: 1
                });
            }
            moofx(this.containerContent)["animate"]({
                width: s.x,
                height: s.y
            }, {
                duration: 250,
                callback: function () {
                    moofx(m).style({
                        display: "block",
                        visibility: "visible"
                    });
                    if (o.html5 && m.play) {
                        m.play();
                    }
                    moofx(m).style({
                        maxWidth: (m.naturalWidth || g.width || m.width || m.videoWidth || s.x) + "px",
                        maxHeight: (m.naturalHeight || g.height || m.height || m.videoHeight || s.y) + "px"
                    });
                    moofx(m)[!e ? "animate" : "style"]({
                        opacity: 1
                    });
                    this.containerContent.setStyles({
                        maxWidth: s.x,
                        maxHeight: s.y,
                        width: null,
                        height: null
                    });
                    if (!this.isTouch) {
                        this.containerControls.setStyle("display", "block");
                    }
                    if (this.isFitting) {
                        this.fitscreen();
                    }
                    this.container.store(this.options.data + ":fitscreen-size", {
                        maxWidth: h || s.x,
                        maxHeight: f || s.y
                    });
                }
                .bind(this)
            });
            this.isOpen = true;
            this.isOpening = false;
            this.object = m;
            this.hideSpinner();
        },
        _loadIframe: function (k, m) {
            var l = this.containerContent.getSize(), q, h;
            k.removeEvents("load");
            this.setType(m.type);
            k.setStyles({
                visibility: "hidden",
                display: "block"
            });
            k.inject(this.containerContent.empty());
            if (e) {
                k.setStyle("max-width", "inherit");
            }
            moofx(this.containerContent).style({
                maxWidth: null,
                maxHeight: null
            });
            this.containerCaption.set("html", m.element.get("data-rokbox-caption") || "").removeClass("rokbox-hidden");
            q = this.containerContent.getSize();
            if (q.x <= parseInt(k.get("width"), 10)) {
                q.x = parseInt(k.get("width"), 10);
            }
            h = this.container.getComputedSize({
                styles: ["padding", "border", "margin"]
            }).totalHeight || this.container.getSize().y;
            if (!q.x) {
                return;
            }
            q.y = q.y || 100;
            k.setStyles({
                display: "none"
            });
            moofx(this.containerCaption.addClass("rokbox-hidden")).style({
                opacity: 0
            });
            moofx(this.containerContent).style({
                width: !this.isOpen ? this.containerContent.getSize().x : l.x,
                height: !this.isOpen ? this.containerContent.getSize().y : l.y
            });
            var o = window.getSize()
              , i = this.containerContent.getSize();
            if (h >= o.y) {
                var j = this.container.getStyle("margin-bottom").toInt()
                  , p = document.getElement("[data-rokboxcaption]")
                  , n = p ? p.getSize().y : 0
                  , f = Math.round(o.y * q.y / h) - n - j
                  , g = Math.round(q.x * f / q.y);
                if (!this.isFitting) {
                    q.x = g;
                    q.y = f;
                }
            }
            document.getElements(this.isFitting ? "[data-rokboxunfitscreen]" : "[data-rokboxfitscreen]").setStyle("display", "none");
            if (m.element.get("data-rokbox-caption") && m.element.get("data-rokbox-caption").length) {
                moofx(this.containerCaption.removeClass("rokbox-hidden")).animate({
                    opacity: 1
                });
            }
            moofx(this.containerContent).animate({
                width: q.x,
                height: q.y
            }, {
                duration: 250,
                callback: function () {
                    k.setStyles({
                        display: "block",
                        visibility: "visible",
                        width: q.x,
                        height: q.y
                    });
                    this.containerContent.setStyles({
                        maxWidth: q.x,
                        maxHeight: q.y,
                        width: null,
                        height: null
                    });
                    if (!this.isTouch) {
                        this.containerControls.setStyle("display", "block");
                    }
                    this.container.store(this.options.data + ":fitscreen-size", {
                        maxWidth: g || q.x,
                        maxHeight: f || q.y
                    });
                }
                .bind(this)
            });
            this.isOpen = true;
            this.isOpening = false;
            this.hideSpinner();
        },
        _loadSwf: function (f, g) {
            this._loadIframe(f, g);
        },
        _loadAudio: function (f, g) {
            this[g.html5 ? "_loadImage" : "_loadIframe"](f, g);
        },
        _loadVideo: function (f, g) {
            this[g.html5 ? "_loadImage" : "_loadIframe"](f, g);
        },
        _loadElement: function (f, h) {
            var g = document.getElement(h.rule);
            if (!g) {
                return this._setError(f, h);
            }
            f.adopt(g.clone(true, true).cloneEvents(g).setStyle("display", "block").addClass("rokbox-content-element"));
            this._loadImage(f, h);
        },
        _setError: function (g, h) {
            var f = new Element("div#rokbox-error.rokbox-error" + h.type);
            if (h.type == "element") {
                f.set("html", "<h3>Error</h3><p>The " + h.type + " <code>" + h.rule + "</code> was not found in the DOM.</p>");
            } else {
                if (h.type == "video" && h.html5 && Browser.firefox && h.href.match(/\.mp4/i)) {
                    f.set("html", "<h3>Error</h3><p>An error occurred while trying to load the " + h.type + " link: <br /> <code>" + h.href + '</code> <br />Note that Firefox does not support MP4 files. Try adding a WebM or Ogg converted file at the same location of the video above (<a target="_blank" href="https://developer.mozilla.org/en-US/docs/HTML/Supported_media_formats?redirectlocale=en-US&redirectslug=Media_formats_supported_by_the_audio_and_video_elements#WebM">More details</a>).</p>');
                } else {
                    f.set("html", "<h3>Error</h3><p>An error occurred while trying to load the " + h.type + " link: <br /> <code>" + h.href + "</code></p>");
                }
            }
            h.error = true;
            this["_load" + (h.type == "element" ? "Image" : h.type.capitalize())](f, h);
        },
        _resizeObject: function (h, k) {
            var j = this.container.getStyle("margin-bottom").toInt()
              , g = document.getElement("[data-rokboxcaption]")
              , i = g ? g.getSize().y : 0
              , f = window.getSize()
              , l = this.containerContent.getSize()
              , m = this.container.getComputedSize({
                  styles: ["padding", "border", "margin"]
              }).totalHeight || this.container.getSize().y;
            size = {};
            size.y = Math.round(f.y * l.y / m) - i - j;
            size.x = Math.round(f.x * size.y / f.y);
            moofx(this.containerContent).style({
                maxWidth: size.x,
                maxHeight: size.y
            });
            moofx(h).style({
                maxWidth: size.x,
                maxHeight: size.y
            });
        },
        _openAndFixJump: function () {
            var g = afterSize = document.body.scrollWidth
              , f = 0;
            document.body.addClass("rokbox-opened");
            afterSize = document.body.scrollWidth;
            f = afterSize - g;
            document.body.setStyle("margin-right", f);
        }
    });
    window.addEvent("domready", function () {
        this.rokbox = new c.Class();
    });
})());
