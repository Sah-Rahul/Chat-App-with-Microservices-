import { sendEmail } from "../emailTemplates/sendEmail";
import { WelcomeEmailTemplate } from "../emailTemplates/welcomeEmail";

export const sendWelcomeEmail = async (email: string, userName: string) => {
  const dashboardUrl = `${process.env.CLIENT}/dashboard`;

  await sendEmail({
    email,
    subject: `Welcome to Educate LMS, ${userName}!`,
    html: WelcomeEmailTemplate(userName, dashboardUrl),
  });
};
