// 9: [function (e, t, n) {
import util from './utils_14.js'
var r = util
  , a = "object" == typeof window ? window : {}
  , o = a.__oXMLHttpRequest_ || a.XMLHttpRequest;
o = "function" == typeof o ? o : undefined;
export default function (e, t) {
  try {
    var n = new o;
    n.open("POST", t, !0),
      n.setRequestHeader("Content-Type", "text/plain"),
      n.send(JSON.stringify(e))
  } catch (a) {
    r.warn("[retcode] Failed to log, exception is :\n" + a)
  }
}
// }
//   , {
//   "../util": 14
// }],