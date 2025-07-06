import { ethers } from "ethers";
import jwt from "jsonwebtoken";

export const verifySignature = async (
  address: string,
  signature: string,
  message: string
) => {
  const signer = ethers.utils.verifyMessage(message, signature);
  return signer.toLowerCase() === address.toLowerCase();
};

export const generateToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: "7d" });
};
