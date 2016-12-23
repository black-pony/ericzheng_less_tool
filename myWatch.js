//作为第三方模块暴露出去
const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');
const less_tool = require('./less_tool');

module.exports = (sourceDir,distDir) => {
  chokidar.watch(path.join(__dirname,sourceDir),{ignored: /(^|[\/\\])\../}).on("all",(event,filePath)=>{
    if(filePath.slice(-5) === '.less'){
      less_tool(filePath,filePath.replace('.less','.css').replace(sourceDir,distDir));
    }
  });
};
