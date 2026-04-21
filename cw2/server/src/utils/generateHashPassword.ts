import bcrypt from "bcryptjs";

export const generateHashPassword = async (password: string) => {
	const hashedPassword = await bcrypt.hash(password, 10);
	return hashedPassword;
};
