// 2: [function (e, t, n) {
import util from './utils_14.js'
import reporter from './reporter_13.js'
import sender from '././common.sender_11.js'
import post from './common.post_9.js'
import handler from './handler_5.js'
import fmp from './fmp_3.js'
import hook from './hook_6.js'
import hack from './hack_4.js'
var util_r = util
  , reporter_a = reporter
  , sender_o = sender
  , post_i = post
  , util_r_win_s = util_r.win
  , c = util_r_win_s.document
  , u = /^(error|api|speed|sum|avg|percent|custom|msg|setPage|setConfig)$/
  , f = function (e) {
    var t = this;
    return reporter_a.call(t, e),
      t._initialPage = e.page && util_r.$a8(e.page, [], e.page + "") || null,
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
      Object.defineProperty && util_r_win_s.addEventListener && Object.defineProperty(t, "pipe", {
        set: t.$ak
      }),
      t
  };
f.prototype = util_r.$al(reporter_a.prototype),
  util_r.ext(reporter_a._root.dftCon, {
    uid: null,
    ignoreUrlPath: [{
      rule: /\/([reporter_a-z\-_]+)?\d{2,20}/g,
      target: "/$1**"
    }, /\/$/],
    ignoreApiPath: {
      rule: /(\w+)\/\d{2,}/g,
      target: "$1"
    },
    ignoreUrlCase: !0,
    imgUrl: "https://arms-retcode.aliyuncs.com/util_r.png?",
    disableHook: !1,
    autoSendPv: !0,
    enableSPA: !1,
    enableLinkTrace: !1,
    sendResource: !0,
    parseHash: function (e) {
      return (e ? util_r.$an(e.replace(/^#\/?/, "")) : "") || "[index]"
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
  util_r.ext(f.prototype, {
    constructor: f,
    _super: reporter_a,
    $a2: function (e) {
      var t = this;
      if (t.hasReady)
        return e();
      "complete" === c.readyState ? (t.hasReady = !0,
        e()) : util_r.on(util_r_win_s, "load", function () {
          t.hasReady = !0,
            e()
        }, !0)
    },
    $a7: function (e) {
      var t = this._conf
        , n = t.page
        , reporter_a = location
        , sender_o = reporter_a.host + reporter_a.pathname;
      return n && !e ? util_r.$a8(n, [], n + "") : this._initialPage || util_r.$am(t.ignoreUrlCase ? sender_o.toLowerCase() : sender_o, t.ignoreUrlPath)
    },
    setPage: function (e, t) {
      var n = this
        , util_r = n.$ao;
      if (!1 !== t) {
        if (!e || e === util_r)
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
        util_r.$a9(e),
          e = this.$aa(e);
        var n = this._conf;
        if (this._conf = util_r.ext({}, n, e),
          !t) {
          var reporter_a = "disableHook";
          reporter_a in e && n[reporter_a] !== e[reporter_a] && (e[reporter_a] ? this.removeHook() : this.addHook()),
            (reporter_a = "enableSPA") in e && n[reporter_a] !== e[reporter_a] && this.$as(e[reporter_a])
        }
      }
    },
    $ac: function (e) {
      sender_o(e, this.getConfig("imgUrl"))
    },
    $ad: function (e, t) {
      var n = {};
      n[t] = e[t],
        delete e[t];
      var reporter_a = "";
      "object" == typeof e && (reporter_a = util_r.serialize(e)),
        post_i(n, this.getConfig("imgUrl") + reporter_a + "&post_res=")
    },
    $ak: function (e) {
      var t = this;
      if (!e || !e.length)
        return t;
      try {
        if ("Array" === util_r.T(e[0]))
          return util_r.each(e, function (e) {
            return t.$ak(e)
          });
        if ("Array" !== util_r.T(e))
          return t;
        var n = e.shift();
        if (!u.test(n))
          return t;
        t[n].apply(t, e)
      } catch (reporter_a) {
        return util_r.warn("[retcode] error in sendPipe", reporter_a),
          t
      }
    },
    $at: function () {
      var e = util_r.ext({}, this._health);
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
      e = util_r.ext({
        pid: this._conf.pid
      }, e);
      var t = this.__proto__.constructor(e);
      return e.page && t.$ar(),
        t
    }
  }),
  handler(f, util_r_win_s, c),
  fmp(f, util_r_win_s, c),
  hook(f, util_r_win_s),
  hack(f, util_r_win_s),
  f._super = reporter_a,
  f._root = reporter_a._root,
  reporter_a.Browser = f

export default f
  // t.exports = f
// }
//   , {
//   "../common/post": 9,
//   "../common/sender": 11,
//   "../reporter": 13,
//   "../util": 14,
//   "./fmp": 3,
//   "./hack": 4,
//   "./handler": 5,
//   "./hook": 6
// }],