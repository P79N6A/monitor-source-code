import util from './utils_14.js'
var util_r = util
  , a = function (e) {
    return this.ver = "1.5.1",
      this._conf = util_r.ext({}, a.dftCon),
      this.$a5 = {},
      this.$a1 = [],
      this.hash = util_r.seq(),
      this.$a6(),
      this.setConfig(e),
      this.rip = util_r.getRandIP(),
      this.record = 999,
      this["EagleEye-TraceID"] = this.getTraceId()["EagleEye-TraceID"],
      this._common = {},
      this
  };
a.dftCon = {
  sample: 1,
  tag: "",
  imgUrl: "https://arms-retcode.aliyuncs.com/util_r.png?",
  region: null
},
  a.prototype = {
    constructor: a,
    $a2: function (e) {
      return e()
    },
    $a7: function () {
      var e = this._conf.page;
      return util_r.$a8(e, [], e + "")
    },
    setPage: function () { },
    setConfig: function (e) {
      e && "object" == typeof e && (util_r.$a9(e),
        e = this.$aa(e),
        this._conf = util_r.ext({}, this._conf, e))
    },
    $aa: function (e) {
      var t = e.region
        , n = e.imgUrl;
      if (t) {
        var a = util_r.regionMap[t];
        return e.imgUrl = a || util_r.defaultImgUrl,
          e
      }
      return n && (e.imgUrl = n),
        e
    },
    $ab: function (e) {
      return true
      if (this.getConfig("debug"))
        return !0;
      var t = util_r.regionMap
        , n = !1;
      for (var a in t)
        if (t[a] === e) {
          n = !0;
          break
        }
      return !n && util_r.warn("[retcode] invalid url: " + e),
        n
    },
    $ac: function () { },
    $ad: function () { },
    $ae: function () {
      return {}
    },
    setCommonInfo: function (e) {
      e && "object" == typeof e && (this._common = util_r.ext({}, this._common, e))
    },
    $a6: function () {
      this.session = util_r.uu(),
        this.sBegin = Date.now()
    },
    getTraceId: function () {
      var e = this.rip
        , t = Date.now()
        , n = util_r.getSortNum(this.record)
        , a = e + t + n + util_r.getRandNum(this._conf.pid);
      return this["EagleEye-TraceID"] = a,
        this.record = n,
        {
          "EagleEye-TraceID": a
        }
    },
    getSessionId: function () {
      return {
        "EagleEye-SessionID": this.session
      }
    },
    getConfig: function (e) {
      return e ? this._conf[e] : util_r.ext({}, this._conf)
    },
    $af: function (e) {
      return 1 === e || ("boolean" == typeof this.$a5[e] ? this.$a5[e] : (this.$a5[e] = util_r.pick(e),
        this.$a5[e]))
    },
    $a4: function () {
      var e;
      for (clearTimeout(this.$a3),
        this.$a3 = null; e = this.$a1.pop();)
        "res" === e.t ? this.$ad(e, "res") : "error" === e.t ? this.$ad(e, "err") : this.$ac(e);
      return this
    },
    _lg: function (e, t, n) {
      var a = this._conf;
      return this.$ab(a.imgUrl) && t && !a.disabled && a.pid ? n && !this.$af(n) ? this : (t = util_r.ext({
        t: e,
        times: 1,
        page: this.$a7(),
        tag: a.tag || "",
        begin: Date.now()
      }, t, this.$ae(), this._common, {
          pid: a.pid,
          _v: this.ver,
          sid: this.session,
          sampling: n || 1,
          z: util_r.seq()
        }),
        function (e, t) {
          var n;
          "error" === t.t && (n = e.$a1[0]) && "error" === n.t && t.msg === n.msg ? n.times++ : (e.$a1.unshift(t),
            e.$a2(function () {
              e.$a3 = util_r.delay(function () {
                e.$a4()
              }, "error" === t.t ? 3e3 : -1)
            }))
        }(this, t)) : this
    },
    custom: function (e, t) {
      if (!e || "object" != typeof e)
        return this;
      var n = !1
        , a = {
          begin: Date.now()
        };
      return util_r.each(e, function (e, t) {
        return !(n = t && t.length <= 20) && util_r.warn("[retcode] invalid key: " + t),
          a["x-" + t] = e,
          n
      }),
        n ? this._lg("custom", a, t || 1) : this
    }
  }

export default a