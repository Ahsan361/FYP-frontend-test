import dotenv from "dotenv";
import { ethers } from "ethers";
import { wallet } from "../config/web3.js";
import nftAbi from "./abi/ArtifactNFT.json" with { type: "json" };
import marketAbi from "./abi/Marketplace.json" with { type: "json" };
dotenv.config();

export const nftContract = new ethers.Contract(
    process.env.NFT_CONTRACT, 
    nftAbi.abi, 
    wallet,
);

export const marketContract = new ethers.Contract(
    process.env.MARKETPLACE_CONTRACT,
    marketAbi.abi,
    wallet,
);

export const mintNFT = async (to , uri)=> {
    const tx = await nftContract.mint(to, uri);
    await tx.wait();
    return tx.hash;
};

export const listNFT = async (tokenId , price) => {
    const tx = await marketContract.list(tokenId , price);
    await tx.wait();
    return tx.hash;
};

export const confirmSale = async (tokenId, buyer) => {
    const tx = await marketContract.confirmSale(tokenId, buyer);
    await tx.wait();
    return tx.hash;
};