const fs = require('fs');
const less = require('less');
const notifier = require('node-notifier');
const tlog = require('talog');
module.exports = (sourceFilePath,distFilePath) => {
  console.log(sourceFilePath,distFilePath);
  fs.readFile(sourceFilePath,'utf-8',(err,data)=>{
  if(err){
    throw err;
  }
  less.render(data,(err,output)=>{
    if(err){
      throw err;
    }
    fs.writeFile(distFilePath,output.css,(err)=>{
      if(err){
        throw err;
      }
      tlog('[I] 成功编译less文件"%s"', distFilePath);
    });
  })
})
}
