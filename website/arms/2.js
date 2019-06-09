2: [function (e, t, n) {
  var r = e("../util")
    , a = e("../reporter")
    , o = e("../common/sender")
    , i = e("../common/post")
    , s = r.win
    , c = s.document
    , u = /^(error|api|speed|sum|avg|percent|custom|msg|setPage|setConfig)$/
    , f = function (e) {
      var t = this;
      return a.call(t, e),
        t._initialPage = e.page && r.$a8(e.page, [], e.page + "") || null,
        t._health = {
          errcount: 0,
          apisucc: 0,
          apifail: 0
        },
        t.$ag = function (e, n) {
          "error" === e ? t._health.errcount++ : "api" === e && t._health[n.success ? "apisucc" : "apifail"]++
        }
        ,
        t.$ah(),
        t.$ai(),
        t.$aj(1e4),
        Object.defineProperty && s.addEventListener && Object.defineProperty(t, "pipe", {
          set: t.$ak
        }),
        t
    };
  f.prototype = r.$al(a.prototype),
    r.ext(a._root.dftCon, {
      uid: null,
      ignoreUrlPath: [{
        rule: /\/([a-z\-_]+)?\d{2,20}/g,
        target: "/$1**"
      }, /\/$/],
      ignoreApiPath: {
        rule: /(\w+)\/\d{2,}/g,
        target: "$1"
      },
      ignoreUrlCase: !0,
      imgUrl: "https://arms-retcode.aliyuncs.com/r.png?",
      disableHook: !1,
      autoSendPv: !0,
      enableSPA: !1,
      enableLinkTrace: !1,
      sendResource: !0,
      parseHash: function (e) {
        return (e ? r.$an(e.replace(/^#\/?/, "")) : "") || "[index]"
      },
      parseResponse: function (e) {
        if (!e || "object" != typeof e)
          return {};
        var t = e.code
          , n = e.msg || e.message || e.subMsg || e.errorMsg || e.ret || e.errorResponse || "";
        return "object" == typeof n && (t = t || n.code,
          n = n.msg || n.message || n.info || n.ret || JSON.stringify(n)),
          {
            msg: n,
            code: t,
            success: !0
          }
      }
    }),
    r.ext(f.prototype, {
      constructor: f,
      _super: a,
      $a2: function (e) {
        var t = this;
        if (t.hasReady)
          return e();
        "complete" === c.readyState ? (t.hasReady = !0,
          e()) : r.on(s, "load", function () {
            t.hasReady = !0,
              e()
          }, !0)
      },
      $a7: function (e) {
        var t = this._conf
          , n = t.page
          , a = location
          , o = a.host + a.pathname;
        return n && !e ? r.$a8(n, [], n + "") : this._initialPage || r.$am(t.ignoreUrlCase ? o.toLowerCase() : o, t.ignoreUrlPath)
      },
      setPage: function (e, t) {
        var n = this
          , r = n.$ao;
        if (!1 !== t) {
          if (!e || e === r)
            return n;
          n.$ao = e,
            clearTimeout(n.$ap),
            n.$aq(1),
            n.$a6(),
            n.$ap = setTimeout(function () {
              n.$ar()
            }, 10)
        } else
          n.$ao = e;
        return n._conf.page = e,
          n
      },
      setConfig: function (e, t) {
        if (e && "object" == typeof e) {
          r.$a9(e),
            e = this.$aa(e);
          var n = this._conf;
          if (this._conf = r.ext({}, n, e),
            !t) {
            var a = "disableHook";
            a in e && n[a] !== e[a] && (e[a] ? this.removeHook() : this.addHook()),
              (a = "enableSPA") in e && n[a] !== e[a] && this.$as(e[a])
          }
        }
      },
      $ac: function (e) {
        o(e, this.getConfig("imgUrl"))
      },
      $ad: function (e, t) {
        var n = {};
        n[t] = e[t],
          delete e[t];
        var a = "";
        "object" == typeof e && (a = r.serialize(e)),
          i(n, this.getConfig("imgUrl") + a + "&post_res=")
      },
      $ak: function (e) {
        var t = this;
        if (!e || !e.length)
          return t;
        try {
          if ("Array" === r.T(e[0]))
            return r.each(e, function (e) {
              return t.$ak(e)
            });
          if ("Array" !== r.T(e))
            return t;
          var n = e.shift();
          if (!u.test(n))
            return t;
          t[n].apply(t, e)
        } catch (a) {
          return r.warn("[retcode] error in sendPipe", a),
            t
        }
      },
      $at: function () {
        var e = r.ext({}, this._health);
        e.healthy = e.errcount > 0 ? 0 : 1,
          e.begin = Date.now();
        var t = e.begin - this.sBegin;
        e.stay = t,
          this._lg("health", e, 1),
          this._health = {
            errcount: 0,
            apisucc: 0,
            apifail: 0
          }
      },
      createInstance: function (e) {
        e = r.ext({
          pid: this._conf.pid
        }, e);
        var t = this.__proto__.constructor(e);
        return e.page && t.$ar(),
          t
      }
    }),
    e("./handler")(f, s, c),
    e("./fmp")(f, s, c),
    e("./hook")(f, s),
    e("./hack")(f, s),
    f._super = a,
    f._root = a._root,
    a.Browser = f,
    t.exports = f
}
  , {
  "../common/post": 9,
  "../common/sender": 11,
  "../reporter": 13,
  "../util": 14,
  "./fmp": 3,
  "./hack": 4,
  "./handler": 5,
  "./hook": 6
}],