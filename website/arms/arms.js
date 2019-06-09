!function () {
  function e (t, n, r) {
    function a (i, s) {
      if (!n[i]) {
        if (!t[i]) {
          var c = "function" == typeof require && require;
          if (!s && c)
            return c(i, !0);
          if (o)
            return o(i, !0);
          var u = new Error("Cannot find module '" + i + "'");
          throw u.code = "MODULE_NOT_FOUND",
          u
        }
        var f = n[i] = {
          exports: {}
        };
        t[i][0].call(f.exports, function (e) {
          return a(t[i][1][e] || e)
        }, f, f.exports, e, t, n, r)
      }
      return n[i].exports
    }
    for (var o = "function" == typeof require && require, i = 0; i < r.length; i++) {
      console.log(i, "!!!")
      a(r[i]);
    }
    return a
  }
  return e
}()({
  1: [function (e, t, n) {
    var r = e("./util")
      , a = function (e) {
        return this.ver = "1.5.1",
          this._conf = r.ext({}, a.dftCon),
          this.$a5 = {},
          this.$a1 = [],
          this.hash = r.seq(),
          this.$a6(),
          this.setConfig(e),
          this.rip = r.getRandIP(),
          this.record = 999,
          this["EagleEye-TraceID"] = this.getTraceId()["EagleEye-TraceID"],
          this._common = {},
          this
      };
    a.dftCon = {
      sample: 1,
      tag: "",
      imgUrl: "https://arms-retcode.aliyuncs.com/r.png?",
      region: null
    },
      a.prototype = {
        constructor: a,
        $a2: function (e) {
          return e()
        },
        $a7: function () {
          var e = this._conf.page;
          return r.$a8(e, [], e + "")
        },
        setPage: function () { },
        setConfig: function (e) {
          e && "object" == typeof e && (r.$a9(e),
            e = this.$aa(e),
            this._conf = r.ext({}, this._conf, e))
        },
        $aa: function (e) {
          var t = e.region
            , n = e.imgUrl;
          if (t) {
            var a = r.regionMap[t];
            return e.imgUrl = a || r.defaultImgUrl,
              e
          }
          return n && (e.imgUrl = n),
            e
        },
        $ab: function (e) {
          return true
          if (this.getConfig("debug"))
            return !0;
          var t = r.regionMap
            , n = !1;
          for (var a in t)
            if (t[a] === e) {
              n = !0;
              break
            }
          return !n && r.warn("[retcode] invalid url: " + e),
            n
        },
        $ac: function () { },
        $ad: function () { },
        $ae: function () {
          return {}
        },
        setCommonInfo: function (e) {
          e && "object" == typeof e && (this._common = r.ext({}, this._common, e))
        },
        $a6: function () {
          this.session = r.uu(),
            this.sBegin = Date.now()
        },
        getTraceId: function () {
          var e = this.rip
            , t = Date.now()
            , n = r.getSortNum(this.record)
            , a = e + t + n + r.getRandNum(this._conf.pid);
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
          return e ? this._conf[e] : r.ext({}, this._conf)
        },
        $af: function (e) {
          return 1 === e || ("boolean" == typeof this.$a5[e] ? this.$a5[e] : (this.$a5[e] = r.pick(e),
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
          return this.$ab(a.imgUrl) && t && !a.disabled && a.pid ? n && !this.$af(n) ? this : (t = r.ext({
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
              z: r.seq()
            }),
            function (e, t) {
              var n;
              "error" === t.t && (n = e.$a1[0]) && "error" === n.t && t.msg === n.msg ? n.times++ : (e.$a1.unshift(t),
                e.$a2(function () {
                  e.$a3 = r.delay(function () {
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
          return r.each(e, function (e, t) {
            return !(n = t && t.length <= 20) && r.warn("[retcode] invalid key: " + t),
              a["x-" + t] = e,
              n
          }),
            n ? this._lg("custom", a, t || 1) : this
        }
      },
      t.exports = a
  }
    , {
    "./util": 14
  }],
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
  3: [function (e, t, n) {
    var r = e("../util")
      , a = 500;
    t.exports = function (e, t, n) {
      function o (e, t, n) {
        var r = 0
          , a = e.tagName;
        if ("SCRIPT" !== a && "STYLE" !== a && "META" !== a && "HEAD" !== a) {
          var i = e.children ? e.children.length : 0;
          if (i > 0)
            for (var c = e.children, u = i - 1; u >= 0; u--)
              r += o(c[u], t + 1, r > 0);
          if (r <= 0 && !n) {
            if (!(e.getBoundingClientRect && e.getBoundingClientRect().top < s))
              return 0
          }
          r += 1 + .5 * t
        }
        return r
      }
      function i (e) {
        for (var t = 1; t < e.length; t++)
          if (e[t].score < e[t - 1].score)
            return e.splice(t, 1),
              i(e);
        return e
      }
      var s = t.innerHeight || 0
        , c = []
        , u = null
        , f = 0;
      r.ext(e.prototype, {
        $aj: function (e) {
          var a = this;
          if (!a._conf || !a._conf.useFmp)
            return null;
          if (!t.MutationObserver)
            return r.warn("[retcode] first meaningful paint can not be retrieved"),
              a.$au(),
              null;
          r.on(t, "beforeunload", function () {
            a.$av(0, !0)
          });
          var i = t.MutationObserver;
          return (u = new i(function () {
            !function (e) {
              var t = Date.now() - e
                , r = n.querySelector("body");
              if (r) {
                var a = 0;
                a += o(r, 1, !1),
                  c.push({
                    score: a,
                    t: t
                  })
              } else
                c.push({
                  score: 0,
                  t: t
                })
            }(a._startTime)
          }
          )).observe(document, {
            childList: !0,
            subtree: !0
          }),
            f = 1,
            a.$a2(function () {
              a.$av(e)
            }),
            u
        },
        $av: function (e, t) {
          var n = this;
          if (u && f)
            if (t || !function (e, t) {
              var n = Date.now() - e;
              return !(n > t || n - (c && c.length && c[c.length - 1].t || 0) > 2 * a)
            }(n._startTime, e)) {
              u.disconnect(),
                f = 0,
                c = i(c);
              for (var o = null, s = 1; s < c.length; s++)
                if (c[s].t >= c[s - 1].t) {
                  var l = c[s].score - c[s - 1].score;
                  (!o || o.rate <= l) && (o = {
                    t: c[s].t,
                    rate: l
                  })
                }
              o && o.t > 0 ? n.$au({
                fmp: o.t
              }) : n.$au()
            } else
              r.delay(function () {
                n.$av(e)
              }, a)
        }
      })
    }
  }
    , {
    "../util": 14
  }],
  4: [function (e, t, n) {
    t.exports = function (t, n) {
      var r = e("../util")
        , a = n.history || {}
        , o = n.document
        , i = function (e, t) {
          var r;
          n.CustomEvent ? r = new CustomEvent(e, {
            detail: t
          }) : ((r = o.createEvent("HTMLEvents")).initEvent(e, !1, !0),
            r.detail = t),
            n.dispatchEvent(r)
        }
        , s = function (e) {
          var t = a[e];
          "function" == typeof t && (a[e] = function (n, o, s) {
            var c = 1 === arguments.length ? [arguments[0]] : Array.apply(null, arguments)
              , u = location.href
              , f = t.apply(a, c);
            if (!s || "string" != typeof s)
              return f;
            if (s === u)
              return f;
            try {
              var l = u.split("#")
                , p = s.split("#")
                , h = r.$an(l[0])
                , g = r.$an(p[0])
                , d = l[1] && l[1].replace(/^\/?(.*)/, "$1")
                , v = p[1] && p[1].replace(/^\/?(.*)/, "$1");
              h !== g ? i("historystatechange", g) : d !== v && i("historystatechange", v)
            } catch (m) {
              r.warn("[retcode] error in " + e + ": " + m)
            }
            return f
          }
            ,
            a[e].toString = r.$aw(e))
        };
      r.ext(t.prototype, {
        $ax: function () {
          return this.$ay ? this : (s("pushState"),
            s("replaceState"),
            this.$ay = !0,
            this)
        }
      })
    }
  }
    , {
    "../util": 14
  }],
  5: [function (e, t, n) {
    t.exports = function (t, n, r) {
      var a = e("../util")
        , o = e("../common/perf")
        , i = e("../common/res")
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
  }
    , {
    "../common/perf": 8,
    "../common/res": 10,
    "../util": 14
  }],
  6: [function (e, t, n) {
    t.exports = function (t, n) {
      var r = e("../util")
        , a = null
        , o = function (e, t, n, a, o, i, s, c, u, f) {
          var l = r.J(o) || null
            , p = r.$a8(t, [l, a], null);
          if (!p)
            return !1;
          var h = p.code || i
            , g = !("success" in p) || p.success;
          e.api(n, g, s, h, p.msg, c, u, f)
        }
        , i = "fetch"
        , s = "__oFetch_"
        , c = "__oXMLHttpRequest_"
        , u = "XMLHttpRequest";
      return r.ext(t.prototype, {
        removeHook: function (e, t) {
          return a && (t || this === a) ? (n[s] && (n[i] = n[s],
            delete n[s]),
            n[c] && (n[u] = n[c],
              delete n[c]),
            a = null,
            this) : this
        },
        addHook: function (e) {
          return !e && a ? this : (a || (function () {
            if ("function" == typeof n[i]) {
              var e = n[i];
              n[s] = e,
                n[i] = function (t, i) {
                  var s = 1 === arguments.length ? [arguments[0]] : Array.apply(null, arguments)
                    , c = a;
                  if (!c || !c.api)
                    return e.apply(n, s);
                  if (i && ("HEAD" === i.method || "no-cors" === i.mode))
                    return e.apply(n, s);
                  var u = Date.now()
                    , f = c._conf
                    , l = (t && "string" != typeof t ? t.url : t) || ""
                    , p = l;
                  if (l = r.$an(l),
                    !r.$b6(l, !0))
                    return e.apply(n, s);
                  l = r.$am(l, f.ignoreApiPath);
                  var h = f.enableLinkTrace
                    , g = ""
                    , d = ""
                    , v = c.getConfig("pid");
                  if (h) {
                    var m = "";
                    try {
                      m = location.origin ? location.origin : location.protocol + "//" + location.hostname + (location.port ? ":" + location.port : "")
                    } catch (w) {
                      m = ""
                    }
                    if (r.checkSameOrigin(p, m)) {
                      if (t && "string" != typeof t)
                        try {
                          if (s[0].headers && "function" == typeof s[0].headers.get && "function" == typeof s[0].headers.append) {
                            var y = s[0].headers.get("EagleEye-TraceID")
                              , $ = s[0].headers.get("EagleEye-SessionID")
                              , b = s[0].headers.get("EagleEye-pAppName");
                            y ? g = y : (g = c.getTraceId()["EagleEye-TraceID"],
                              s[0].headers.append("EagleEye-TraceID", g)),
                              $ ? d = $ : (d = c.getSessionId()["EagleEye-SessionID"],
                                s[0].headers.append("EagleEye-SessionID", d)),
                              b || s[0].headers.append("EagleEye-pAppName", v)
                          }
                        } catch (E) {
                          r.warn("[retcode] fetch failed to set header, exception is :\n" + E)
                        }
                      i && (i.headers = i.headers ? i.headers : {},
                        i.headers["EagleEye-TraceID"] ? g = i.headers["EagleEye-TraceID"] : (g = c.getTraceId()["EagleEye-TraceID"],
                          i.headers["EagleEye-TraceID"] = g),
                        i.headers["EagleEye-SessionID"] ? d = i.headers["EagleEye-SessionID"] : (d = c.getSessionId()["EagleEye-SessionID"],
                          i.headers["EagleEye-SessionID"] = d),
                        i.headers["EagleEye-pAppName"] || (i.headers["EagleEye-pAppName"] = v))
                    }
                  }
                  return e.apply(n, s).then(function (e) {
                    if (!c || !c.api)
                      return e;
                    var t = e.clone()
                      , n = t.headers;
                    if (n && "function" == typeof n.get) {
                      var r = n.get("content-type");
                      if (r && !/(text)|(json)/.test(r))
                        return e
                    }
                    var a = Date.now() - u;
                    return t.ok ? t.text().then(function (e) {
                      o(c, f.parseResponse, l, p, e, t.status || 200, a, u, g, d)
                    }) : c.api(l, !1, a, t.status || 404, t.statusText, u, g, d),
                      e
                  })["catch"](function (e) {
                    if (!c || !c.api)
                      throw e;
                    var t = Date.now() - u;
                    throw c.api(l, !1, t, e.name || "Error", e.message, u, g, d),
                    e
                  })
                }
                ,
                n[i].toString = r.$aw(i)
            }
          }(),
            function () {
              if ("function" == typeof n[u]) {
                var e = n[u];
                n[c] = e,
                  n[u] = function (t) {
                    var n = new e(t)
                      , i = a;
                    if (!i || !i.api || !n.addEventListener)
                      return n;
                    var s, c, u, f = n.send, l = n.open, p = n.setRequestHeader, h = i._conf, g = i.getConfig("enableLinkTrace"), d = "", v = "", m = "";
                    return n.open = function (e, t) {
                      var a = 1 === arguments.length ? [arguments[0]] : Array.apply(null, arguments);
                      if (l.apply(n, a),
                        u = t || "",
                        c = r.$an(u),
                        c = c ? r.$am(c, h.ignoreApiPath) : "",
                        g) {
                        var o = "";
                        try {
                          o = location.origin ? location.origin : location.protocol + "//" + location.hostname + (location.port ? ":" + location.port : "")
                        } catch (s) {
                          o = ""
                        }
                        r.checkSameOrigin(u, o) && p && "function" == typeof p && (d = i.getTraceId()["EagleEye-TraceID"],
                          p.apply(n, ["EagleEye-TraceID", d]),
                          v = i.getSessionId()["EagleEye-SessionID"],
                          p.apply(n, ["EagleEye-SessionID", v]),
                          m = i.getConfig("pid"),
                          p.apply(n, ["EagleEye-pAppName", m]))
                      }
                    }
                      ,
                      n.send = function () {
                        s = Date.now();
                        var e = 1 === arguments.length ? [arguments[0]] : Array.apply(null, arguments);
                        f.apply(n, e)
                      }
                      ,
                      r.on(n, "readystatechange", function () {
                        if (c && 4 === n.readyState) {
                          var e = Date.now() - s;
                          if (n.status >= 200 && n.status <= 299) {
                            var t = n.status || 200;
                            if ("function" == typeof n.getResponseHeader) {
                              var r = n.getResponseHeader("Content-Type");
                              if (r && !/(text)|(json)/.test(r))
                                return
                            }
                            n.responseType && "text" !== n.responseType ? i.api(c, !0, e, t, "", s, d, v) : o(i, h.parseResponse, c, u, n.responseText, t, e, s, d, v)
                          } else
                            i.api(c, !1, e, n.status || "FAILED", n.statusText, s, d, v)
                        }
                      }),
                      n
                  }
                  ,
                  n[u].toString = r.$aw(u)
              }
            }()),
            a = this,
            this)
        },
        $ai: function () {
          return this.$b7 ? this : (this.getConfig("disableHook") || this.addHook(),
            this.$b7 = !0,
            this)
        }
      }),
        t
    }
  }
    , {
    "../util": 14
  }],
  7: [function (e, t, n) {
    n.TIMING_KEYS = ["", "fetchStart", "domainLookupStart", "domainLookupEnd", "connectStart", "connectEnd", "requestStart", "responseStart", "responseEnd", "", "domInteractive", "", "domContentLoadedEventEnd", "", "loadEventStart", "", "msFirstPaint", "secureConnectionStart"]
  }
    , {}],
  8: [function (e, t, n) {
    var r = e("../util")
      , a = e("./constants").TIMING_KEYS;
    t.exports = function () {
      var e = r.win || {}
        , t = e.performance;
      if (!t || "object" != typeof t)
        return null;
      var n = {}
        , o = t.timing || {}
        , i = Date.now()
        , s = 1;
      if ("function" == typeof e.PerformanceNavigationTiming) {
        var c = t.getEntriesByType("navigation")[0];
        c && (o = c,
          s = 2)
      }
      r.each({
        dns: [3, 2],
        tcp: [5, 4],
        ssl: [5, 17],
        ttfb: [7, 6],
        trans: [8, 7],
        dom: [10, 8],
        res: [14, 12],
        firstbyte: [7, 2],
        fpt: [8, 1],
        tti: [10, 1],
        ready: [12, 1],
        load: [14, 1]
      }, function (e, t) {
        var r = o[a[e[1]]]
          , i = o[a[e[0]]];
        if (2 === s || r > 0 && i > 0) {
          var c = Math.round(i - r);
          c >= 0 && c < 36e5 && (n[t] = c)
        }
      });
      var u = e.navigator.connection
        , f = t.navigation || {};
      n.ct = u ? u.effectiveType || u.type : "";
      var l = u ? u.downlinkMax || u.bandwidth || -1 : -1;
      return l = l > 999 ? 999 : l,
        n.bandwidth = l,
        n.navtype = 1 === f.type ? "Reload" : "Other",
        1 === s && o[a[16]] > 0 && o[a[1]] > 0 && (n.fpt = o[a[16]] - o[a[1]]),
        1 === s && o[a[1]] > 0 ? n.begin = o[a[1]] : 2 === s && n.load > 0 ? n.begin = i - n.load : n.begin = i,
        n
    }
  }
    , {
    "../util": 14,
    "./constants": 7
  }],
  9: [function (e, t, n) {
    var r = e("../util")
      , a = "object" == typeof window ? window : {}
      , o = a.__oXMLHttpRequest_ || a.XMLHttpRequest;
    o = "function" == typeof o ? o : undefined,
      t.exports = function (e, t) {
        try {
          var n = new o;
          n.open("POST", t, !0),
            n.setRequestHeader("Content-Type", "text/plain"),
            n.send(JSON.stringify(e))
        } catch (a) {
          r.warn("[retcode] Failed to log, exception is :\n" + a)
        }
      }
  }
    , {
    "../util": 14
  }],
  10: [function (e, t, n) {
    var r = e("../util")
      , a = e("./constants").TIMING_KEYS;
    t.exports = function () {
      var e = r.win || {}
        , t = e.performance;
      if (!t || "object" != typeof t || "function" != typeof t.getEntriesByType)
        return null;
      var n = {}
        , o = t.timing || {}
        , i = t.getEntriesByType("resource") || [];
      if (n.begin = o[a[1]] || Date.now(),
        "function" == typeof e.PerformanceNavigationTiming) {
        var s = t.getEntriesByType("navigation")[0];
        s && (o = s)
      }
      return r.each({
        dom: [10, 8],
        load: [14, 1]
      }, function (e, t) {
        var r = o[a[e[1]]]
          , i = o[a[e[0]]];
        if (r > 0 && i > 0) {
          var s = Math.round(i - r);
          s >= 0 && s < 36e5 && (n[t] = s)
        }
      }),
        n.res = JSON.stringify(i),
        n
    }
  }
    , {
    "../util": 14,
    "./constants": 7
  }],
  11: [function (e, t, n) {
    var r = e("../util")
      , a = "object" == typeof window ? window : {}
      , o = a.__oFetch_ || a.fetch;
    o = "function" == typeof o ? o : undefined,
      t.exports = function (e, t) {
        var n = -1;
        "object" == typeof e && (n = e.z,
          e = r.serialize(e));
        var i = t + e;
        if (o)
          return o(i, {
            method: "HEAD",
            mode: "no-cors"
          })["catch"](r.noop);
        if (a.document && a.document.createElement) {
          var s = "__request_hold_" + n
            , c = a[s] = new Image;
          c.onload = c.onerror = function () {
            a[s] = undefined
          }
            ,
            c.src = i,
            c = null
        }
      }
  }
    , {
    "../util": 14
  }],
  12: [function (e, t, n) {
    "use strict";
    function r (e, t) {
      var n = a[i] = new o(e);
      n.$ak(t);
      var r = n._conf;
      return !1 !== r.autoSendPv && n.$ar(),
        r && r.useFmp || n.$au(),
        r && r.sendResource && n.$b0(),
        a[s] = !0,
        n
    }
    var a = window
      , o = a.BrowserLogger = e("./biz.browser/clazz")
      , i = e("./util").key
      , s = "__hasInitBlSdk";
    o.singleton = function (e, t) {
      return a[s] ? a[i] : r(e, t)
    }
      ;
    debugger
    "object" == typeof window && !!window.navigator && a[i] && (o.bl = function () {
      if (a[s])
        return a[i];
      var e = {}
        , t = [];
      debugger
      return i in a && (e = a[i].config || {},
        t = a[i].pipe || []),
        r(e, t)
    }(a.__hasInitBlSdk)),
      t.exports = o
  }
    , {
    "./biz.browser/clazz": 2,
    "./util": 14
  }],
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
}, {}, [12]);
