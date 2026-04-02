import React from "react";
import axios from "axios";
import { PAYMENT_API } from "../../config";

const Payment = () => {
  const [isSuccess, setIsSuccess] = React.useState(false);

  const handleDownloadInvoice = async (paymentId) => {
    try {
      const res = await axios.get(`${PAYMENT_API}/download-invoice/${paymentId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Invoice_${paymentId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Failed to download invoice", err);
    }
  };

  const handlePayment = async () => {
    try {
      // 1️⃣ Create order
      const { data } = await axios.post(
        `${PAYMENT_API}/create-order`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // 2️⃣ Razorpay options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY, // rzp_test_xxx
        amount: data.amount,
        currency: data.currency,
        name: "Hindusthan Admission",
        description: "Application Processing Fee",
        order_id: data.id,

        handler: async function (response) {
          // 3️⃣ Verify payment
          const verifyRes = await axios.post(
            `${PAYMENT_API}/verify`,
            response,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );

          setIsSuccess(true);

          // Trigger automatic download
          if (verifyRes.data.paymentId) {
            await handleDownloadInvoice(verifyRes.data.paymentId);
          }
        },

        theme: { color: "#0d47a1" },

        modal: {
          ondismiss: async function () {
            try {
              await axios.post(
                `${PAYMENT_API}/cancel`,
                {},
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                }
              );
              alert("Payment Cancelled.");
            } catch (err) {
              console.error("Cancellation logging failed", err);
            }
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.error("Payment Error Full:", err);
      const msg = err.response?.data?.error || err.message || "Payment init failed";
      alert(`Payment Error: ${msg}`);
    }
  };

  if (isSuccess) {
    return (
      <div className="form-subsection" style={{ textAlign: "center", padding: "60px 40px", background: "#f0fdf4", borderRadius: "12px", border: "1px solid #bbf7d0" }}>
        <div style={{ fontSize: "4rem", marginBottom: "20px" }}>✅</div>
        <h2 style={{ fontSize: "2rem", fontWeight: "800", color: "#166534", marginBottom: "10px" }}>Payment Successful!</h2>
        <p style={{ color: "#15803d", marginBottom: "30px", fontSize: "1.1rem", fontWeight: "500" }}>
          Thank you! Your application fee has been received successfully.
          <br /> Your receipt has been downloaded and also sent to your email.
        </p>

        <button
          className="btn-primary"
          onClick={() => window.location.href = "/dashboard"}
          style={{ width: "250px", background: "#166534", border: "none" }}
        >
          Go to Dashboard
        </button>

        <p style={{ marginTop: "20px", fontSize: "0.85rem", color: "#65a30d" }}>
          You can now track your application or pay tuition fees from the dashboard.
        </p>
      </div>
    );
  }

  return (
    <div className="form-subsection" style={{ textAlign: "center", padding: "40px", background: "rgba(99, 102, 241, 0.03)" }}>
      <div style={{ fontSize: "3rem", marginBottom: "20px" }}>💳</div>
      <h2 style={{ fontSize: "2.5rem", fontWeight: "800", color: "var(--primary-color)", margin: "0" }}>₹500</h2>
      <p style={{ color: "var(--text-muted)", marginBottom: "30px", fontWeight: "600" }}>Application Processing Fee</p>

      <button className="btn-primary" onClick={handlePayment} style={{ width: "200px" }}>
        Pay & Submit
      </button>

      <p style={{ marginTop: "20px", fontSize: "0.85rem", color: "var(--text-muted)" }}>
        Secure payment powered by Razorpay
      </p>
    </div>
  );
};

export default Payment;
