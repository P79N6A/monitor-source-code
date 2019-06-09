import util from './utils_14.js'
export default function (t, n) {
  var r = util
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
// }
//   , {
//   "../util": 14
// }],