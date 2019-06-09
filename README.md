## 简介

此为海豚运维提供的项目前端监控脚本，lib/src为脚本的源文件，lib/dist为生成的文件，进入lib目录，执行npm install，然后运行npm run dev就可以开发了

website目录中是一个引用脚本测试的样例，可以先安装一个静态服务器```npm install http-server -g```,然后运行```http-server ./ --cors -c -p 30015```，进入目录观察上报的数据