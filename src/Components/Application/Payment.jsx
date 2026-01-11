import axios from "axios";
import { PAYMENT_API } from "../../config";

const Payment = () => {
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
          await axios.post(
            `${PAYMENT_API}/verify`,
            response,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );

          alert("Payment successful 🎉");
          window.location.href = "/dashboard";
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
