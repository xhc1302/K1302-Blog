const withCss = require('@zeit/next-css')
const { Module } = require('module')

if(typeof require !== 'undefined'){
    Module._extensions['.css']=file=>{}
}

module.exports = withCss({})