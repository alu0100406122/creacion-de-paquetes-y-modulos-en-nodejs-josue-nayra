const myArgs = require('minimist')(process.argv.slice(2));
const fs = require('fs-extra');
const ejs = require('ejs');
const path = require('path');

// var ncp = require('ncp').ncp;

fs.mkdirp(path.join(__dirname, '../../../'+`${myArgs.d}`), function(err){
    if(err){
        console.error(err);
    }
    else{
    //   fs.copy('./template/gulpfile.js', './'+`${myArgs.d}`+'/gulpfile.js');
    //   console.log("File:"+path.join(__dirname,'../template','gulpfile.js'));
       fs.copy(path.join(__dirname,'../template','gulpfile.js'), path.join(__dirname, '../../../'+`${myArgs.d}`, 'gulpfile.js'));
       fs.copy(path.join(__dirname,'../template','README.md'), path.join(__dirname, '../../../'+`${myArgs.d}`, 'README.md'));   
       fs.copy(path.join(__dirname, '../template', 'VERSION'), path.join(__dirname, '../../../'+`${myArgs.d}`, 'VERSION'));   
       
       fs.mkdirp(path.join(__dirname, '../../../'+`${myArgs.d}`, 'scripts'), function (err) {
          if (err) {
            console.error(err);
          } else {
            console.log("Construyendo scripts ok");
          }
       });
    //   ncp('./template/scripts','./'+`${myArgs.d}`+'/scripts',function(err)
    //   {
    //       if(err) 
    //       {
    //           return console.error(err);    
    //       }
    //   });
       
        fs.copy(path.join(__dirname, '../template', 'scripts') , path.join(__dirname, '../../../'+`${myArgs.d}`,'scripts'), function(err){
            if(err) return console.error(err)
            console.log("Scripts copiada!");
        });  
       
       fs.mkdirp(path.join(__dirname, '../../../'+`${myArgs.d}`, '/txt'), function (err) {
          if (err) {
            console.error(err);
          }
          else {
            console.log("Construyendo txt ok");
            fs.copy(path.join(__dirname, '../template', 'txt' , 'SUMMARY.md'), path.join(__dirname, '../../../'+`${myArgs.d}`, 'txt', 'SUMMARY.md'));
            fs.copy(path.join(__dirname,'../template', 'txt', 'section1'), path.join(__dirname, '../../../'+`${myArgs.d}`, 'txt', 'section1'), function(err){
                if(err) return console.error(err)
                console.log("Seccion1 copiada!");
            });   
            
            ejs.renderFile(path.join(__dirname, '../template', 'txt', 'README.ejs'), { name_gitbook: `${myArgs.name}`}, function(err,str) {
               if(err) {
                   console.error(err);
                   throw err;
               }
               else {
                  if(str) {
                    //   console.log(str);
                      //Creamos y escribimos en el fichero README.md
                      fs.writeFileSync(path.join(__dirname,'../../../'+`${myArgs.d}`,'txt', 'README.md'), str);
                  }
               }
            });
          }
        });
    }
});

ejs.renderFile(path.join(__dirname, '../template', 'package.ejs'), { autor: `${myArgs.autor}` , name_gitbook: `${myArgs.name}`, url: `${myArgs.url}`, url_bugs: `${myArgs.url}`, url_wiki: `${myArgs.url}`+'.wiki.git'}, function(err,str){
    if(err) {
        console.error("ERROR:"+err);
    }
    if(str) {
        // console.error("STR:"+str);
        // fs.writeFileSync('./'+`${myArgs.d}`+'/package.json', str);
        fs.writeFileSync(path.join(__dirname, '../../../'+`${myArgs.d}`, 'package.json'), str);

    }
    console.log("Renderfile ok");
});
