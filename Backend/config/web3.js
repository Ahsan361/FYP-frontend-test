import { ethers } from "ethers";
import dotenv from "dotenv";

dotenv.config();

//connecting to sepolia using the url provided from alchemy / Infura for communication with smart contracts and blockchain
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);

//the account that will be used to deploy and interact with the smart contracts
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

export { provider, wallet };