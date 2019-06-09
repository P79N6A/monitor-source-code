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