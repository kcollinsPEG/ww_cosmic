var bookEmail = (app) => {
  var bodyParser = require('body-parser');
  var request = require('request');
  app.use(bodyParser.json()); // support json encoded bodies
  app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

  app.post('/book-now-email', function (req, res) {
    var toEmail='';
    var cosmicCallUrl = "https://api.cosmicjs.com/v1/wealth-woman/object/contact-info?pretty=true&hide_metafields=true";
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

    let recaptcha=req.body['g-recaptcha-response'];
    if(typeof recaptcha === undefined || recaptcha === '' || recaptcha === null) {
      return res.json({success: 2});
    }
    var secretKey = "6LdfJjEUAAAAAF1fImzF9Mskry3BLc5JtOskwAXn";
    var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;

    request(verificationUrl,function(error,response,body) {
      body = JSON.parse(body);
      // Success will be true or false depending upon captcha validation.
      if(body.success !== undefined && !body.success) {
        return res.json({success: 2});
      }
    });

    var transporter = nodemailer.createTransport({transport: 'direct'});
    //var transporter = nodemailer.createTransport({direct: true, debug: true});
    //var transporter = nodemailer.createTransport('smtps://chris@opmi-tx.com:f@ct0ry33@smtp.gmail.com');
    //let toEmail=req.body.to_email;
    let topic=req.body.topic;
    if(req.body.topic=='Other/Custom'){
      topic=req.body.custom;
    }

    let messageBody = '<p>Dear Admin</p>' +
      '<p>Client with following details has posted for booking on Women Wealth</p>' +
      '<p>' +
      'Full Name: ' + req.body.firstName +' '+ req.body.lastName + '<br/>' +
      'Email: ' + req.body.email + '<br/>' +
      'Phone: ' + req.body.phone + '<br/>' +
      'Date: ' + req.body.eventDate + '<br/>' +
      'Location: ' + req.body.eventLocation + '<br/>' +
      'Topic: ' + topic + '<br/>' +
      '</p>';

    var mailOptions = {
      from: "Webmaster <"+req.body.email+">", // sender address
      to: toEmail, // list of receivers
      subject: "A new inquiry was posted on Women Wealth", // Subject line
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

module.exports = bookEmail;
