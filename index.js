const fs = require('fs');
const path = require('path');
const less = require('less');
const notifier = require('node-notifier');
const tlog = require('talog');

//node a.js source-dir src dist-dir dist
let arr = process.argv;
let sourceDir = arr[3];
let distDir   = arr[5];
fs.readdir(path.join(__dirname,sourceDir),(err,files)=>{
  if(err){
    notifier.notify({
      'title':'error',
      'sound':true,
      'icon':path.join(__dirname,'eric.png'),
      //O(∩_∩)O
      'message':'CMD里输入的命令有问题~~~'
    });
  }else{
    if(files.length > 0){
      files.forEach((fileName,index)=>{
        if(fileName.slice(-5) === '.less'){
          fs.readFile(path.join(__dirname,sourceDir,fileName),'utf-8',(err,data)=>{
            if(err){
              throw err;
            }
            less.render(data,(err,output)=>{
              if(err){
                throw err;
              }
              fs.writeFile(path.join(__dirname,distDir,fileName.replace('.less','.css')),output.css,(err)=>{
                if(err){
                  throw err;
                }
                tlog('[I] 成功编译less文件"%s"', fileName);
              });
            })
          });
        }
      });
    }
  }
});
