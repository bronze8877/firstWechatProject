var koa = require('koa')
var sha1 = require('sha1');
var config = {
   wechat: {
       appId: '',
       token: 'mynameisguguangbing',
       appSecret: ''

   }
}

var app = new koa();

app.use(function *(next){
    console.log(this.query)
    var token = config.wechat.token
    var signature = this.query.signature
    var nonce = this.query.nonce
    var timestamp = this.query.timestamp
    var echostr = this.query.echostr
    var str = [token, timestamp, nonce].sort().join('')
    var sha = sha1(str)
    if(sha === signature) {
        this.body = echostr + ''
    } else {
        this.body = 'error'
    }
}).listen('3100')
console.log('listening 3100')
