import { db } from '@/components/firebaseObj/firebase';
import { doc, deleteDoc } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      // ------------------ api route authentication
      const url = `${req.headers["x-forwarded-proto"]}://${req.headers.host}/api/auth/session`;
      const sessionRes = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Cookie': req.headers.cookie || ''
        }
      });
      if (!sessionRes.ok) {
        console.error('Failed to fetch session:', sessionRes.status, sessionRes.statusText);
        return res.status(401).json({ message: 'Not authenticated' });
      }
      const session = await sessionRes.json();
      if (!session || !session.user) {
        return res.status(401).json({ message: 'Not authenticated' });
      }
      // ------------------ end of api route authentication

      const { docRef, orderId } = req.body;
      if (!docRef || !orderId) {
        return res.status(400).json({ error: "docRef and orderId are required" });
      }

      const orderDocRef = doc(db, "users", docRef, "orders", orderId);
      await deleteDoc(orderDocRef);

      res.status(200).json({ message: "Order deleted successfully" });
    } catch (error: any) {
      console.error('Failed to delete order:', error);
      res.status(500).json({ error: "Failed to delete order", details: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}