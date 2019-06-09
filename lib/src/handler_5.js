import util from './utils_14.js'
import perf from './common.perf_8.js'
import res from './common.res_10.js'
export default function (t, n, r) {
  var a = util
    , o = perf
    , i = res
    , s = null
    , c = r.documentElement
    , u = n.innerWidth || c.clientWidth || r.body.clientWidth
    , f = n.innerHeight || c.clientHeight || r.body.clientHeight
    , l = n.navigator.connection
    , p = {
      sr: screen.width + "x" + screen.height,
      vp: u + "x" + f,
      ct: l ? l.effectiveType || l.type : ""
    }
    , h = {}
    , g = function (e, t, n, o, i) {
      if (t === undefined) {
        var s, c;
        if (!h[e]) {
          s = new RegExp(e + "=([^;]+)");
          try {
            c = s.exec(r.cookie)
          } catch (f) {
            return a.warn("[retcode] can not get cookie:", f),
              null
          }
          c && (h[e] = c[1])
        }
        return h[e]
      }
      var u = e + "=" + t;
      o && (u += "; domain=" + o),
        u += "; path=" + (i || "/"),
        n && (u += "; max-age=" + n);
      try {
        return r.cookie = u,
          !!r.cookie
      } catch (f) {
        return a.warn("[retcode] can not set cookie: ", f),
          !1
      }
    }
    , d = function (e) {
      var t = e._conf.uid || g("_nk_") || g("_bl_uid");
      if (!t) {
        t = a.uu();
        if (!g("_bl_uid", t, 15552e3))
          return null
      }
      return t
    };
  return a.ext(t.prototype, {
    activeErrHandler: function (e) {
      return s && !e ? this : (s = this,
        this)
    },
    errorHandler: function (e) {
      if (!e)
        return this;
      var t = e.type;
      return "error" === t ? this.error(e.error || {
        message: e.message
      }, e) : "unhandledrejection" === t && a.T(e.reason, "Error") && a.$az(e.reason) && this.error(e.reason),
        this
    },
    $au: function (e) {
      var t = this;
      t.$a2(function () {
        var n = o();
        n && (n.page = t.$a7(!0),
          e && (n = a.ext(n, e)),
          t._lg("perf", n, t.getConfig("sample")))
      })
    },
    $b0: function (e) {
      var t = this;
      t.$a2(function () {
        var n = i();
        n && (n.load && n.load <= 2e3 || n.load && n.load <= 8e3 && Math.random() > .05 || (n.page = t.$a7(!0),
          n.dl = location.href,
          e && (n = a.ext(n, e)),
          t._lg("res", n, t.getConfig("sample"))))
      })
    },
    $ar: function () {
      var e = this;
      e.$a2(function () {
        var t = function (e) {
          var t = d(e)
            , a = n.devicePixelRatio || 1;
          return {
            uid: t,
            dt: r.title,
            dl: location.href,
            dr: r.referrer,
            dpr: a.toFixed(2),
            de: (r.characterSet || r.defaultCharset || "").toLowerCase(),
            ul: c.lang,
            begin: Date.now()
          }
        }(e);
        t && t.uid && e._lg("pv", t)
      })
    },
    $ae: function () {
      return p.uid = d(this),
        p
    },
    $aq: function (e) {
      var t = Date.now();
      if (t - this._lastUnload < 200)
        return this;
      this._lastUnload = t,
        this.$at(e),
        this.$b1 && (this._lg("speed", this.$b1),
          this.$b1 = null,
          clearTimeout(this.$b2)),
        this.$a4()
    },
    $as: function (e) {
      var t = this;
      if (!e ^ t.$b3)
        return t;
      e ? (t.$ax(),
        t.$b3 = function (e) {
          var n = t._conf.parseHash(location.hash);
          n && t.setPage(n, !1 !== e)
        }
        ,
        t.$b4 = function (e) {
          var n = t._conf.parseHash(e.detail);
          n && t.setPage(n)
        }
        ,
        a.on(n, "hashchange", t.$b3),
        a.on(n, "historystatechange", t.$b4),
        t.$b3(!1)) : (a.off(n, "hashchange", t.$b3),
          a.off(n, "historystatechange", t.$b4),
          t.$b3 = null,
          t.$b4 = null)
    },
    $ah: function () {
      var e = this;
      if (e.$b5)
        return e;
      var t = e._conf;
      return a.on(n, "beforeunload", function () {
        e.$aq(0)
      }),
        e.$as(t.enableSPA),
        e.activeErrHandler(!1),
        e.$b5 = !0,
        e
    }
  }),
    a.on(n, "error", function (e) {
      s && s.errorHandler(e)
    }).on(n, "unhandledrejection", function (e) {
      s && s.errorHandler(e)
    }),
    t
}
