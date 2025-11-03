const mailer = require(`nodemailer`);

const SendEmail = async (option) => {
  const transport = mailer.createTransport({
    host: `smtp.gmail.com`,
    port: 465,
    secure: true,
    auth: {
      user: `modeeemod444@gmail.com`,
      pass: `gzirmtmnpogmhnap`,
    },
  });
  const mailtops = {
    from: `"${"Ecommerce " || "My Shop"}" <${"modeeemod444@gmail.com"}`,
    to: option.email,
    subject: option.subject,
    text: option.text,
  };
  await transport.sendMail(mailtops);
};

module.exports = SendEmail;
