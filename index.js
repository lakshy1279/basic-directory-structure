const express=require('express');
//set up cookie
const cookieParser=require('cookie-parser');
const port=7000;
const app=express();
//including layouts
const expressLayout=require('express-ejs-layouts');
app.use(expressLayout);
//get database
const db=require('./config/mongoose');
//require session
const session=require('express-session');
//set library passport.js for authentication
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
//to store the session in the database
const MongoStore=require('connect-mongo')(session);
//include sass middleware
const sassMiddleware=require('node-sass-middleware');
app.use(sassMiddleware(
    {
        src:'./assests/scss',
        dest:'./assests/css',
        debug:true,
        outputStyle:'extended',
        prefix:'/css'
}));
//encode data of post request
app.use(express.urlencoded());
//use cookie parser to read and write to cookie
app.use(cookieParser());
app.use(express.static('./assests'));
//extract styles and scripts from subpages into layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
//set up the view engine
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
//authenticate the session set by the express session
//change the req.user
app.use(passport.session());
//set current user information to locals
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