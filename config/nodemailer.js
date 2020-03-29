const nodemailer=require('nodemailer');
const ejs=require('ejs');
const path=require('path');

let transporter=nodemailer.createTransport({
    service:'gmail',
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    auth:{
        user:'luckyron1279@gmail.com',
        pass:'Lakshy@12'
    }
});
transporter.verify(function(error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });

  let renderTemplate=(data,relativePath) =>{
      let mailHtml;
      ejs.renderFile(
          path.join(__dirname,'../views/mailers',relativePath),
          data,
          function(err,template)
          {
              if(err)
              {
                  console.log('error in rending template',err);
                  return;
              }
              mailHtml=template;
          }
      )
      return mailHtml;
}

module.exports={
    transporter:transporter,
    renderTemplate:renderTemplate
}
