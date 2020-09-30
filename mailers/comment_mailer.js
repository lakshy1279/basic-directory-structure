const nodeMailer = require("../config/nodemailer");

//this is another way of exporting method
exports.newComment = (Comment) => {
  // console.log('inside new comment mailer',Comment);
  let htmlString = nodeMailer.renderTemplate(
    { comment: Comment },
    "/comments/new_comment.ejs"
  );
  nodeMailer.transporter.sendMail(
    {
      from: "luckyron1279@gmail.com",
      to: Comment.user.email,
      subject: "new comment published",
      html: htmlString,
    },
    (err, info) => {
      if (err) {
        console.log("error in sending email");
        return;
      }
      // console.log('Message Sent',info);
      return;
    }
  );
};
