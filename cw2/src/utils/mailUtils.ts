export const sendEmail = async (to: string, subject: string, body: string) => {
  console.log(`Email sent To: ${to} | Subject: ${subject}`);
  console.log(`BODY: ${body}`);
  return true;
};

export const notifyWinner = async (email: string, name: string) => {
  const subject = "Congratulations! You are the Alumni of the Day!";
  const body = `Hi ${name},\n\nYour bid was the highest, and you have been selected as the Alumni of the Day! Your profile is now featured on our platform.\n\nBest regards,\nAlumni Influencers Team`;
  return sendEmail(email, subject, body);
};

export const notifyLoser = async (email: string, name: string) => {
  const subject = "Bidding Update - Alumni of the Day";
  const body = `Hi ${name},\n\nThe bidding for the Alumni of the Day has closed. Unfortunately, you were not the highest bidder this time. Better luck next time!\n\nBest regards,\nAlumni Influencers Team`;
  return sendEmail(email, subject, body);
};

export const sendVerificationEmail = async (
  email: string,
  name: string | null = "User",
  token: string,
  id: string,
) => {
  const subject = "Verify Your Email";
  const body = `Hi ${name},\n\nPlease verify your email by clicking on the link below:\n\nhttp://localhost:5000/email-verification?id=${id}&token=${token}\n\nBest regards,\nAlumni Influencers Team`;
  return sendEmail(email, subject, body);
};

export const sendPasswordResetEmail = async (
  email: string,
  name: string | null = "User",
  token: string,
) => {
  const subject = "Reset Your Password";
  const body = `Hi ${name},\n\nPlease reset your password by clicking on the link below:\n\n${token}\n\nBest regards,\nAlumni Influencers Team`;
  return sendEmail(email, subject, body);
};
