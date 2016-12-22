const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');
const less_tool = require('./less_tool');
let arr = process.argv;
if(arr.length <= 2){
  throw '参数个数不对';
}
let sourceDir = arr[3];
let distDir   = arr[5];
chokidar.watch(path.join(__dirname,sourceDir),{ignored: /(^|[\/\\])\../}).on("all",(event,filePath)=>{
  if(filePath.slice(-5) === '.less'){
    less_tool(filePath,filePath.replace('.less','.css').replace(sourceDir,distDir));
  }
});
