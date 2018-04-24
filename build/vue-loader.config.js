module.exports = (isDev)=>{
  return {
    preserveWhitepace: true, // 检测代码中的空格
    extractCSS: !isDev,// 把.vue中的css文件单独打包
    cssModules:{
      localIndetName: '[path]-[name]-[hash:base64:5]',
      camelCase: true
    },
    // hotReload: false, // 根据环境变量生成
  }
}