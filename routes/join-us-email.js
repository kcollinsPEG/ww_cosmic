var joinTeam = (app) => {

    var Busboy = require('busboy');
    var request = require('request');

  app.post('/join-us-email', function (req, res) {
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
    var transporter = nodemailer.createTransport({transport: 'direct'});
    //var transporter = nodemailer.createTransport('smtps://chris@opmi-tx.com:f@ct0ry33@smtp.gmail.com');

    var busboy = new Busboy({ headers: req.headers });
      req.pipe(busboy);
      var attachments = [];
      var recaptcha='';

      var  messageBody = '<p>Dear Admin</p>' +
      '<p>User with following details has posted for Join our team on Women Wealth</p>' +
      '<p>';

      var mailOptions = {
      from: "sajjid@besthivepk.com", // sender address
      subject: "A new inquiry was posted on Women Wealth", // Subject line
      to:toEmail
    };

      busboy.on('file', function(fieldname, file, filename, encoding, mimetype){

        file.fileRead = [];
        file.on('data', function(chunk) {
            file.fileRead.push(chunk);
        });
        file.on('end', function() {
            var data = Buffer.concat(file.fileRead);
            attachments.push({
                filename: filename,
                content: data,
                encoding: 'base64',
            });
        });
        file.resume();

        })
      busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
        if(fieldname!="join-us-email-submit" && fieldname!="to_email" && fieldname!="g-recaptcha-response" ) {
            messageBody += fieldname + ' : ' + val + '<br>';
        }
        // if(fieldname=="to_email" ) {
        //     mailOptions.to= val;
        // }
        if(fieldname=="g-recaptcha-response" ) {
            recaptcha= val;
        }
      })
      busboy.on('finish', function() {
        messageBody+='</p>';
        mailOptions.html = messageBody // html body
        mailOptions.attachments = attachments;

        if(typeof recaptcha === undefined || recaptcha === '' || recaptcha === null) {
            return res.json({success: 2});
        }
        var secretKey = "6LdfJjEUAAAAAF1fImzF9Mskry3BLc5JtOskwAXn";
        var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + recaptcha + "&remoteip=";

        request(verificationUrl,function(error,response,body) {
          // Success will be true or false depending upon captcha validation.
          if(body.success !== undefined && !body.success) {
              return res.json({success: 2});
          }
        });
        transporter.sendMail(mailOptions, function(error, info) {
          if(error) {
              console.log(error);
              res.json({success: 0});
          } else {
              console.log('Message sent: ' + info.messageId);
              res.json({success: 1});
          }
        });
      });
  })
}

module.exports = joinTeam;
