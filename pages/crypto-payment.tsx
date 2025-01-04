import React, { useEffect, useState } from "react";

export default function PaymentPage() {
  const [paymentId, setPaymentId] = useState("");
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);

  useEffect(() => {
    // Initialize a payment session
    const initiateSession = async () => {
      const response = await fetch("/api/initiate-payment");
      const data = await response.json();
      setPaymentId(data.paymentId);
    };

    initiateSession();
  }, []);

  const verifyPayment = async () => {
    const response = await fetch("/api/verify-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        walletAddress: "0x60b5f8d1cec31e036f3994554f8d424d869768fa",
        expectedAmount: "0.01",
      }),
    });
    const data = await response.json();

    if (data.success) {
      setPaymentConfirmed(true);
    }
  };

  return (
    <div>
      <h1>Payment ID: {paymentId}</h1>
      {paymentConfirmed ? (
        <h2>Payment Confirmed! 🎉 Download your file.</h2>
      ) : (
        <button onClick={verifyPayment}>Check Payment Status</button>
      )}
    </div>
  );
}
