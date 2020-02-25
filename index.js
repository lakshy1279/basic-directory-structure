const express=require('express');
const port=8000;
const app=express();
const expressLayout=require('express-ejs-layouts');
app.use(expressLayout);
//use express router
app.use(express.static('./assests'));
//extract styles and scripts from subpages into layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
app.use('/',require('./routes/index'));
app.set('view engine','ejs');
app.set('views','./views');
app.listen(port,function(err)
{
    if(err)
    {
        console.log(`error in running the server: ${err}`);
    }
   console.log(`server is running on the port:${port}`);
});