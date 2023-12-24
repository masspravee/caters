const nodemailer = require("nodemailer");

export default async function sendMailToAdmin(imageData) {
  const transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "imnoa007offical@gmail.com",
      pass: "eozxugqggchxvgqf ",
    },
  });

  const mailOptions = {
    from: "imnoa007offical@gmail.com",
    to: "balathan2vijay004@gmail.com",
    subject: "user verification email",
    text: `User Verification Success \n
    Link =${imageData}`,
  };

  transport.sendMail(mailOptions, (err) => {
    console.log(err);
  });
}
