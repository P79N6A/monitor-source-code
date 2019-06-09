13: [function (e, t, n) {
  var r = e("./util")
    , a = e("./base")
    , o = ["api", "success", "time", "code", "msg", "trace", "traceId", "begin", "sid", "seq"]
    , i = function (e, t) {
      var n = e.split("::");
      return n.length > 1 ? r.ext({
        group: n[0],
        key: n[1]
      }, t) : r.ext({
        group: "default_group",
        key: n[0]
      }, t)
    }
    , s = function (e) {
      a.call(this, e);
      var t;
      try {
        t = "object" == typeof performance ? performance.timing.fetchStart : Date.now()
      } catch (n) {
        t = Date.now()
      }
      return this._startTime = t,
        this
    };
  s.prototype = r.$al(a.prototype),
    r.ext(a.dftCon, {
      startTime: null
    }),
    r.ext(s.prototype, {
      constructor: s,
      _super: a,
      sum: function (e, t, n) {
        try {
          return this._lg("sum", i(e, {
            val: t || 1,
            begin: Date.now()
          }), n)
        } catch (a) {
          r.warn("[retcode] can not get parseStatData: " + a)
        }
      },
      avg: function (e, t, n) {
        try {
          return this._lg("avg", i(e, {
            val: t || 0,
            begin: Date.now()
          }), n)
        } catch (a) {
          r.warn("[retcode] can not get parseStatData: " + a)
        }
      },
      percent: function (e, t, n, a) {
        try {
          return this._lg("percent", i(e, {
            subkey: t,
            val: n || 0,
            begin: Date.now()
          }), a)
        } catch (o) {
          r.warn("[retcode] can not get parseStatData: " + o)
        }
      },
      msg: function (e, t) {
        if (e && !(e.length > 180))
          return this.custom({
            msg: e
          }, t)
      },
      error: function (e, t) {
        if (!e)
          return r.warn("[retcode] invalid param e: " + e),
            this;
        1 === arguments.length ? ("string" == typeof e && (e = {
          message: e
        },
          t = {}),
          "object" == typeof e && (t = e = e.error || e)) : ("string" == typeof e && (e = {
            message: e
          }),
            "object" != typeof t && (t = {}));
        var n = e.name || "CustomError"
          , a = e.message
          , o = e.stack || "";
        t = t || {};
        var i = {
          begin: Date.now(),
          cate: n,
          msg: a.substring(0, 1e3),
          stack: o && o.substring(0, 1e3),
          file: t.filename || "",
          line: t.lineno || "",
          col: t.colno || "",
          err: {
            msg_raw: a,
            stack_raw: o
          }
        };
        return this.$ag && this.$ag("error", i),
          this._lg("error", i, 1)
      },
      api: function (e, t, n, a, i, s, c, u) {
        return e ? (e = "string" == typeof e ? {
          api: e,
          success: t,
          time: n,
          code: a,
          msg: i,
          begin: s,
          traceId: c,
          sid: u
        } : r.sub(e, o),
          r.$b6(e.api) ? (e.code = e.code || "",
            e.msg = e.msg || "",
            e.success = e.success ? 1 : 0,
            e.time = +e.time,
            e.begin = e.begin,
            e.traceId = e.traceId || "",
            e.sid = e.sid || "",
            !e.api || isNaN(e.time) ? (r.warn("[retcode] invalid time or api"),
              this) : (this.$ag && this.$ag("api", e),
                this._lg("api", e, e.success && this.getConfig("sample")))) : this) : (r.warn("[retcode] api is null"),
                  this)
      },
      speed: function (e, t, n) {
        var a = this
          , o = this.getConfig("startTime") || this._startTime;
        return /^s(\d|1[0])$/.test(e) ? (t = "number" != typeof t ? Date.now() - o : t >= o ? t - o : t,
          a.$b1 = a.$b1 || {},
          a.$b1[e] = t,
          a.$b1.begin = o,
          clearTimeout(a.$b2),
          a.$b2 = setTimeout(function () {
            n || (a.$b1.page = a.$a7(!0)),
              a._lg("speed", a.$b1),
              a.$b1 = null
          }, 5e3),
          a) : (r.warn("[retcode] invalid point: " + e),
            a)
      }
    }),
    s._super = a,
    s._root = a,
    a.Reporter = s,
    t.exports = s
}
  , {
  "./base": 1,
  "./util": 14
}],