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
  "object" == typeof window && !!window.navigator && a[i] && (o.bl = function () {
    if (a[s])
      return a[i];
    var e = {}
      , t = [];
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