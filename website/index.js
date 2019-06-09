window.setTimeout(function () {
  console.log(c.b)
}, 5000)
window.setTimeout(function () {
  $.ajax({
    url: "http://127.0.0.1:3000/api/v1/wallpaper",
    method: 'get'
  }).done(function () {
    console.log('ajax加载完毕')
  });
}, 5000)