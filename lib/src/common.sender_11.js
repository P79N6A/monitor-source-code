// 11: [function (e, t, n) {
import util from './utils_14.js'
var r = util
  , a = "object" == typeof window ? window : {}
  , o = a.__oFetch_ || a.fetch;
o = "function" == typeof o ? o : undefined;
export default function (e, t) {
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
// }
//   , {
//   "../util": 14
// }],