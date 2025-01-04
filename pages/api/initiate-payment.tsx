
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { v4 as uuidv4 } from "uuid";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    // Start a new session with a unique payment ID
    const paymentId = uuidv4();
    return res.status(200).json({ paymentId });
  }

  // Reuse existing session
  return res.status(200).json({ paymentId: session.paymentId });
}
