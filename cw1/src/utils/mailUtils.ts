export const sendEmail = async (to: string, subject: string, body: string) => {
  console.log(`[EMAIL SENT] To: ${to} | Subject: ${subject}`);
  console.log(`[BODY]: ${body}`);
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
