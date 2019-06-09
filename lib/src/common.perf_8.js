// 8: [function (e, t, n) {
import util from './utils_14.js'
import constantskey from './constants_7.js'
var r = util
  , a = constantskey.TIMING_KEYS;
export default function () {
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
// }
//   , {
//   "../util": 14,
//   "./constants": 7
// }],