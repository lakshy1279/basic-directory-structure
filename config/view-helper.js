const path=require('path');
const env=require('./environment');
const fs=require('fs');
module.exports=(app)=> {
    app.locals.assestPath=function(filePath)
    {
         if(env.name=='development')
         {
             return filePath;
         }
          return '/'+JSON.parse(fs.readFileSync(path.join(__dirname,'../public/assests/rev-manifest.json')))[filePath];
    }
}