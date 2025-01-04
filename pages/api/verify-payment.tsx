import { NextApiRequest, NextApiResponse } from "next";
import { ethers } from "ethers";

// Connect to Ganache
const provider = new ethers.JsonRpcProvider("http://peaceful_germain:8545");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { walletAddress, expectedAmount } = req.body;

  // Validate input
  if (!walletAddress || !expectedAmount) {
    return res.status(400).json({ message: "Missing walletAddress or expectedAmount" });
  }

  try {
    // Fetch wallet balance
    const balance = await provider.getBalance(walletAddress);
    const balanceInEth = ethers.formatEther(balance);

    // Compare with the expected amount
    if (parseFloat(balanceInEth) >= parseFloat(expectedAmount)) {
      return res.status(200).json({ success: true, message: "Payment received" });
    } else {
      return res.status(200).json({ success: false, message: "Payment not received" });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    return res.status(500).json({ message: "Failed to verify payment" });
  }
}
