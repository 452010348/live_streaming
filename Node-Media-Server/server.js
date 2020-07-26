var express = require('express');
var app = express()

const ip = require('ip')
const IP = ip.address();

app.use(express.static('./public'))
var server = app.listen(4111,function(){
    var port = server.address().port
    console.info('复制打开浏览器', 'http://'+IP+':'+port)
})