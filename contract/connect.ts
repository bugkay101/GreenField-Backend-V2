import { contractAddress } from "./address";
import abi from "./abi.json";
import { ethers } from "ethers";

// const PRIVATE_KEY = process.env.PRIVATE_KEY;
// const RPC_URL = process.env.RPC_URL;
// const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

// const connectEther = () => {
//   try {
//     const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
//     const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
//     const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, wallet);
//     return contract;
//   } catch (error) {
//     console.error("Error connecting to contract:", error);
//     throw new Error(`Failed to initialize contract connection`);
//   }
// };
export const connectEther = () => {
  try {
    const provider = new ethers.providers.JsonRpcProvider(
      "https://sepolia-eth.w3node.com/73c1c8769381adf0e5969d8f8e44af73ad0a55053c466f1d965d5e1bbf0765ff/api"
    );
    const signer = provider.getSigner(
      "0x26EEd5c3dAc025DCF79de1af74a4f5f8d9f3158a"
    );
    const mintrise = new ethers.Contract(contractAddress, abi, signer);
    return mintrise;
  } catch (error) {
    console.log(error);
    throw new Error(`Failed to initialize contract`);
  }
};
