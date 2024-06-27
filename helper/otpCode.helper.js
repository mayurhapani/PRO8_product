const mailer = require("nodemailer");

const otpVerify = (userEmail) => {
  return new Promise((resolve, reject) => {
    let otp = Math.floor(Math.random() * 900000);

    const transporter = mailer.createTransport({
      service: "gmail",
      auth: {
        user: "hapanimayur@gmail.com",
        pass: "ofwo yiky rskz wxkt",
      },
    });

    const sendMail = {
      from: "hapanimayur@gmail.com",
      to: userEmail,
      subject: "Reset Password",
      text: otp.toString(),
    };

    transporter.sendMail(sendMail, (err, info) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        console.log(info);
        resolve(otp);
      }
    });
  });
};

module.exports = otpVerify;
