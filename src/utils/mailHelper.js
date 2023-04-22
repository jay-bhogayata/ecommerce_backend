import config from "../config/index.js";
import transporter from "../config/transporter.config.js";

const mailHelper = async (options) => {
  const message = {
    from: config.SMTP_SENDER_EMAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(message);
};

export default mailHelper;
