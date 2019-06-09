14: [function (e, t, n) {
  Date.now = Date.now || function () {
    return (new Date).getTime()
  }
    ;
  var r = Date.now()
    , a = function () { }
    , o = {
      noop: a,
      warn: function () {
        var e = "object" == typeof console ? console.warn : a;
        try {
          var t = {
            warn: e
          };
          t.warn.call(t)
        } catch (n) {
          return a
        }
        return e
      }(),
      key: "__bl",
      win: "object" == typeof window && window.document ? window : undefined,
      regionMap: {
        cn: "https://arms-retcode.aliyuncs.com/r.png?",
        sg: "https://arms-retcode-sg.aliyuncs.com/r.png?",
        daily: "http://arms-retcode-daily.alibaba.net/r.png?"
      },
      defaultImgUrl: "https://arms-retcode.aliyuncs.com/r.png?",
      $al: function (e) {
        if (Object.create)
          return Object.create(e);
        var t = function () { };
        return t.prototype = e,
          new t
      },
      each: function (e, t) {
        var n = 0
          , r = e.length;
        if (this.T(e, "Array"))
          for (; n < r && !1 !== t.call(e[n], e[n], n); n++)
            ;
        else
          for (n in e)
            if (!1 === t.call(e[n], e[n], n))
              break;
        return e
      },
      $a8: function (e, t, n) {
        if ("function" != typeof e)
          return n;
        try {
          return e.apply(this, t)
        } catch (r) {
          return n
        }
      },
      T: function (e, t) {
        var n = Object.prototype.toString.call(e).substring(8).replace("]", "");
        return t ? n === t : n
      },
      $am: function (e, t) {
        if (!e)
          return "";
        if (!t)
          return e;
        var n = this
          , r = n.T(t);
        return "Function" === r ? n.$a8(t, [e], e) : "Array" === r ? (this.each(t, function (t) {
          e = n.$am(e, t)
        }),
          e) : "Object" === r ? e.replace(t.rule, t.target || "") : e.replace(t, "")
      },
      J: function (e) {
        if (!e || "string" != typeof e)
          return e;
        var t = null;
        try {
          t = JSON.parse(e)
        } catch (n) { }
        return t
      },
      pick: function (e) {
        return 1 === e || 1 === Math.ceil(Math.random() * e)
      },
      $a9: function (e) {
        if ("sample" in e) {
          var t = e.sample
            , n = t;
          t && /^\d+(\.\d+)?%$/.test(t) && (n = parseInt(100 / parseFloat(t))),
            0 < n && 1 > n && (n = parseInt(1 / n)),
            n >= 1 && n <= 100 ? e.sample = n : delete e.sample
        }
        return e
      },
      on: function (e, t, n, r) {
        return e.addEventListener ? e.addEventListener(t, function a (o) {
          r && e.removeEventListener(t, a, !1),
            n.call(this, o)
        }, !1) : e.attachEvent && e.attachEvent("on" + t, function o (a) {
          r && e.detachEvent("on" + t, o),
            n.call(this, a)
        }),
          this
      },
      off: function (e, t, n) {
        return n ? (e.removeEventListener ? e.removeEventListener(t, n) : e.detachEvent && e.detachEvent(t, n),
          this) : this
      },
      delay: function (e, t) {
        return -1 === t ? (e(),
          null) : setTimeout(e, t || 0)
      },
      ext: function (e) {
        for (var t = 1, n = arguments.length; t < n; t++) {
          var r = arguments[t];
          for (var a in r)
            Object.prototype.hasOwnProperty.call(r, a) && (e[a] = r[a])
        }
        return e
      },
      sub: function (e, t) {
        var n = {};
        return this.each(e, function (e, r) {
          -1 !== t.indexOf(r) && (n[r] = e)
        }),
          n
      },
      uu: function () {
        for (var e, t, n = 20, r = new Array(n), a = Date.now().toString(36).split(""); n-- > 0;)
          t = (e = 36 * Math.random() | 0).toString(36),
            r[n] = e % 3 ? t : t.toUpperCase();
        for (var o = 0; o < 8; o++)
          r.splice(3 * o + 2, 0, a[o]);
        return r.join("")
      },
      seq: function () {
        return (r++).toString(36)
      },
      encode: function (e, t) {
        try {
          e = t ? encodeURIComponent(e).replace(/\(/g, "%28").replace(/\)/g, "%29") : encodeURIComponent(e)
        } catch (n) { }
        return e
      },
      serialize: function (e) {
        e = e || {};
        var t = [];
        for (var n in e)
          Object.prototype.hasOwnProperty.call(e, n) && e[n] !== undefined && t.push(n + "=" + this.encode(e[n], "msg" === n));
        return t.join("&")
      },
      $b6: function (e, t) {
        if (!e || "string" != typeof e)
          return !1;
        var n = /arms-retcode[\w-]*\.aliyuncs/.test(e);
        return !n && t && (n = /(\.png)|(\.gif)|(alicdn\.com)/.test(e)),
          !n
      },
      $az: function (e) {
        return !(!e || !e.message) && !/failed[\w\s]+fetch/i.test(e.message)
      },
      $an: function (e) {
        return e && "string" == typeof e ? e.replace(/^(https?:)?\/\//, "").replace(/\?.*$/, "") : ""
      },
      $aw: function (e) {
        return function () {
          return e + "() { [native code] }"
        }
      },
      checkSameOrigin: function (e, t) {
        if (!t || !e)
          return !1;
        if (/^(http|https):\/\//.test(e)) {
          var n = e.split("/");
          return (e = n[0] + "//" + n[2]) === t
        }
        return !0
      },
      getRandIP: function () {
        for (var e = [], t = 0; t < 4; t++) {
          var n = Math.floor(256 * Math.random());
          e[t] = (n > 15 ? "" : "0") + n.toString(16)
        }
        return e.join("")
      },
      getSortNum: function (e) {
        return e ? (e += 1) >= 1e3 && e <= 9999 ? e : e < 1e3 ? e + 1e3 : e % 1e4 + 1e3 : 1e3
      },
      getRandNum: function (e) {
        return e && "string" == typeof e ? e.length < 5 ? this.getNum(5) : e.substring(e.length - 5) : this.getNum(5)
      },
      getNum: function (e) {
        for (var t = [], n = 0; n < e; n++) {
          var r = Math.floor(16 * Math.random());
          t[n] = r.toString(16)
        }
        return t.join("")
      }
    };
  t.exports = o
}
  , {}]
}, { }, [12]);