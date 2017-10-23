var subscriberEmail = (app) => {
  var request = require('request');
  var bodyParser = require('body-parser');
  app.use(bodyParser.json()); // support json encoded bodies
  app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

  app.post('/signup-email', function (req, res) {
    var toEmail='';
    var cosmicCallUrl = "https://api.cosmicjs.com/v1/wealthwomantest/object/contact-info?pretty=true&hide_metafields=true";
    request(cosmicCallUrl,function(error,response,body) {
      body = JSON.parse(body);
      var contact_info=body.object.metadata.email;
      if(typeof contact_info!="undefined" && contact_info!='' && contact_info!=null){
        toEmail=body.object.metadata.email;
      }else{
        toEmail="info@wealthwoman.com"
      }
    });
    var nodemailer = require("nodemailer");
    //var transporter = nodemailer.createTransport({direct: true, debug: true});
    //var transporter = nodemailer.createTransport('smtps://chris@opmi-tx.com:f@ct0ry33@smtp.gmail.com');
    var transporter = nodemailer.createTransport({transport: 'direct'});
    //let toEmail=req.body.to_email;
    let messageBody = '<p>Dear Admin</p>' +
      '<p>User with following details SignUp newsLetter on Women Wealth </p>' +
      '<p>' +
      'Name: ' + req.body.fullName + '<br/>' +
      'Email: ' + req.body.email + '<br/>' +
      '</p>';

    var mailOptions = {
      from: "Webmaster <"+req.body.email+">", // sender address
      to: toEmail, // list of receivers
      subject: "A new subscriber on Women Wealth", // Subject line
      html: messageBody // html body
    };

    transporter.sendMail(mailOptions, function(error, info) {
      if(error) {
        console.log(error);
        res.json({success: 0});
      } else {
        console.log('Message sent: ' + info.messageId);
        res.json({success: 1});
      }
    });
  })
};

module.exports = subscriberEmail;
