// 10: [function (e, t, n) {
import util from './utils_14.js'
import constantskey from './constants_7.js'
var r = util
  , a = constantskey.TIMING_KEYS;
export default function () {
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
// }
//   , {
//   "../util": 14,
//   "./constants": 7
// }],