import transporter from "../CONFIG/nodemailer.js";
import {createWelcomeEmailTemplate} from "../emails/emailtemplate.js";
import dotenv from "dotenv";
dotenv.config();
export const sendWelcomeEmail = async (email, name,clientURL) => {
  try {
    const html = createWelcomeEmailTemplate(name, clientURL);


    await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Welcome to Talksy 🎉",
      html,
    });

    console.log("Welcome email sent successfully!");
  } catch (error) {
    console.error("Error sending welcome email:", error);
  }
};
