var merge = require('webpack-merge')
var prodEnv = require('./prod.env')
if(process.argv[2]){
    module.exports = {
      NODE_ENV: '"'+(process.argv[2]?process.argv[2]:'development')+'"',
      NODE_ENV: '"dev"'
    }
}else{
    module.exports = merge(prodEnv, {
        NODE_ENV: '"development"'
    })
}
