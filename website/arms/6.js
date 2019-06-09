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