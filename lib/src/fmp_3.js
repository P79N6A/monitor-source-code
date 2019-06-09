import util from './utils_14.js'
var r = util
  , a = 500;
export default function (e, t, n) {
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
// }
//   , {
//   "../util": 14
// }],