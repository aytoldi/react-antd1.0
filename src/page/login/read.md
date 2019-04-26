/*
* 登录的逻辑，提交按钮点击之后，我们的请求去服务器；
* 然后服务器返回一个token
*
* 客户端做的事情
* token返回来客户端之后
* 先token存储浏览器本地存储
* 派发一个action ，
* 然后使用redux，state中定义一个token属性，然后token赋值给本地的localstorage中的token值
*
* */
