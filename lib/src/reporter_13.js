// 13: [function (e, t, n) {
import util from './utils_14.js'
import base from './base_1.js'
var util_r = util
  , base_a = base
  , o = ["api", "success", "time", "code", "msg", "trace", "traceId", "begin", "sid", "seq"]
  , i = function (e, t) {
    var n = e.split("::");
    return n.length > 1 ? util_r.ext({
      group: n[0],
      key: n[1]
    }, t) : util_r.ext({  
      group: "default_group",
      key: n[0]
    }, t)
  }
  , s = function (e) {
    base_a.call(this, e);
    var t;
    try {
      t = "object" == typeof performance ? performance.timing.fetchStart : Date.now()
    } catch (n) {
      t = Date.now()
    }
    return this._startTime = t,
      this
  };
s.prototype = util_r.$al(base_a.prototype),
  util_r.ext(base_a.dftCon, {
    startTime: null
  }),
  util_r.ext(s.prototype, {
    constructor: s,
    _super: base_a,
    sum: function (e, t, n) {
      try {
        return this._lg("sum", i(e, {
          val: t || 1,
          begin: Date.now()
        }), n)
      } catch (base_a) {
        util_r.warn("[retcode] can not get parseStatData: " + base_a)
      }
    },
    avg: function (e, t, n) {
      try {
        return this._lg("avg", i(e, {
          val: t || 0,
          begin: Date.now()
        }), n)
      } catch (base_a) {
        util_r.warn("[retcode] can not get parseStatData: " + base_a)
      }
    },
    percent: function (e, t, n, base_a) {
      try {
        return this._lg("percent", i(e, {
          subkey: t,
          val: n || 0,
          begin: Date.now()
        }), base_a)
      } catch (o) {
        util_r.warn("[retcode] can not get parseStatData: " + o)
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
        return util_r.warn("[retcode] invalid param e: " + e),
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
        , base_a = e.message
        , o = e.stack || "";
      t = t || {};
      var i = {
        begin: Date.now(),
        cate: n,
        msg: base_a.substring(0, 1e3),
        stack: o && o.substring(0, 1e3),
        file: t.filename || "",
        line: t.lineno || "",
        col: t.colno || "",
        err: {
          msg_raw: base_a,
          stack_raw: o
        }
      };
      return this.$ag && this.$ag("error", i),
        this._lg("error", i, 1)
    },
    api: function (e, t, n, base_a, i, s, c, u) {
      return e ? (e = "string" == typeof e ? {
        api: e,
        success: t,
        time: n,
        code: base_a,
        msg: i,
        begin: s,
        traceId: c,
        sid: u
      } : util_r.sub(e, o),
        util_r.$b6(e.api) ? (e.code = e.code || "",
          e.msg = e.msg || "",
          e.success = e.success ? 1 : 0,
          e.time = +e.time,
          e.begin = e.begin,
          e.traceId = e.traceId || "",
          e.sid = e.sid || "",
          !e.api || isNaN(e.time) ? (util_r.warn("[retcode] invalid time or api"),
            this) : (this.$ag && this.$ag("api", e),
              this._lg("api", e, e.success && this.getConfig("sample")))) : this) : (util_r.warn("[retcode] api is null"),
                this)
    },
    speed: function (e, t, n) {
      var base_a = this
        , o = this.getConfig("startTime") || this._startTime;
      return /^s(\d|1[0])$/.test(e) ? (t = "number" != typeof t ? Date.now() - o : t >= o ? t - o : t,
        base_a.$b1 = base_a.$b1 || {},
        base_a.$b1[e] = t,
        base_a.$b1.begin = o,
        clearTimeout(base_a.$b2),
        base_a.$b2 = setTimeout(function () {
          n || (base_a.$b1.page = base_a.$a7(!0)),
            base_a._lg("speed", base_a.$b1),
            base_a.$b1 = null
        }, 5e3),
        base_a) : (util_r.warn("[retcode] invalid point: " + e),
          base_a)
    }
  }),
  s._super = base_a,
  s._root = base_a,
  base_a.Reporter = s;

// t.exports = s
export default s
// }
//   , {
//   "./base": 1,
//   "./util": 14
// }],