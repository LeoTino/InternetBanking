var express = require('express'),
    axios = require('axios'),
    nodemailer = require('nodemailer');
    var userRepo = require('../repos/userRepo');
    var otpRepo = require('../repos/otpRepo');

    
var router = express.Router();

// {
//   "tenDangNhap":"admin"
// }
router.post('/send', (req, res) => {
    var otpCode = createNumberRandom(6);
    var user;
    userRepo.findByTenDangNhap(req.body.tenDangNhap)
    .then(userReponse => {
      user = userReponse;
      console.log("userReponse"+userReponse);
      console.log("user la "+ user);
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'anhlanguoingungoc3@gmail.com',
          pass: '16081997'
        }
      });
      otpRepo.add(req.body.tenDangNhap,otpCode);
      var content = `<div>${user.Ten},</div>
                    <div>You have selected ${user.Email}<br>verification page:    </div> 
                     <h1>${otpCode}</h1>
                     <div>This code will expire three hours after this email was sent</div>
                     <div>Why you received this email. Apple requires verification whenever an email address</div>
                     <div>If you did not make this request, you can ignore this email</div>`
      var mailOptions = {
        from: 'anhlanguoingungoc3@gmail.com',
        to: `${user.Email}`,
        subject: 'OTP Code',
        html: content

      };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      res.statusCode = 201;
            res.json(req.body);
  })
  .catch(err => {
      console.log(err);
      res.statusCode = 500;
      res.end();
  });
    
    
});

router.post('/compare', (req, res) => {
    otpRepo.compare(req.body)
        .then(repoRes => {
          var dataReponse =false;
          if(repoRes.length>0){
              dataReponse=true;
          }
            console.log("gia tri reponse "+dataReponse.toString());
            if(dataReponse===null || dataReponse===[]){
              console.log("gia tri null a "+dataReponse);
            }
            var resData ={
              "result":dataReponse
            }
            res.statusCode = 200;
            res.json(resData);
        })
        .catch(err => {
            console.log(err);
            res.statusCode = 500;
            res.end();
        });
});

function createNumberRandom(number){
  var numberStr ="1";
  for (let index = 0; index <= number; index++) {
    numberStr+="0";
  }

  return Math.floor(Math.random()*parseInt(numberStr))
}

module.exports = router;