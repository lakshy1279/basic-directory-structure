const express=require('express');
const cookieParser=require('cookie-parser');
const port=8000;
const app=express();
const expressLayout=require('express-ejs-layouts');
const db=require('./config/mongoose');
//require session
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const MongoStore=require('connect-mongo')(session);
app.use(express.urlencoded());
app.use(cookieParser());
app.use(expressLayout);
app.use(express.static('./assests'));
//extract styles and scripts from subpages into layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
app.set('view engine','ejs');
app.set('views','./views');

app.use(session(
    {
      name:'codeial',
      secret:'blahsomething',
      saveUninitialized:false,
      resave:false,
      cookie: 
      {
        maxAge:(1000*60*100) 
      },
      store: new MongoStore(
          {
              mongooseConnection:db,
              autoRemove:'disabled'
          },
          function(err)
          {
              if(err)
              {
                  console.log(err|| 'connect mongodb setup ok');
              }

          }
      ) 
    }
));

app.use(passport.initialize());

app.use(passport.session());
//use express router
app.use(passport.setAuthenticatedUser);
app.use('/',require('./routes'));
app.listen(port,function(err)
{
    if(err)
    {
        console.log(`error in running the server: ${err}`);
    }
   console.log(`server is running on the port:${port}`);
});