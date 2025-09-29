import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useAuth } from "../provider/AuthProvider";
import useAxios from "../hooks/useAxios";

const Checkout = () => {
  const { biodataId } = useParams();
 console.log("biodataId =", biodataId);
  const { user } = useAuth();
  const axios = useAxios();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const [clientSecret, setClientSecret] = useState("");
  const [biodata, setBiodata] = useState(null);

  //  Fetch biodata from backend
  useEffect(() => {
  if (!biodataId) return;

  const fetchBiodata = async () => {
    try {
      const res = await axios.get(`/biodatas/id/${parseInt(biodataId)}`);
      setBiodata(res.data);
    } catch (err) {
        console.log(err);
        
      Swal.fire("Error", "Biodata not found", "error");
    }
  };

  fetchBiodata();
}, [axios, biodataId]);

  //  Create Stripe payment intent
  useEffect(() => {
    axios
      .post("/create-payment-intent", { amount: 5 })
      .then((res) => setClientSecret(res.data.clientSecret));
  }, [axios]);

  //  Handle payment submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      Swal.fire("Error", error.message, "error");
      return;
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

    if (confirmError) {
      Swal.fire("Error", confirmError.message, "error");
      return;
    }

    if (paymentIntent.status === "succeeded") {
     const requestData = {
  biodataId: biodata?.biodataId || "",
  name: biodata?.name || "",
  contactEmail: biodata?.contactEmail || "",
  mobileNumber: biodata?.mobileNumber || "",
  amount: 5,
  status: "pending",
  transactionId: paymentIntent.id,
};


      try {
        const res = await axios.post("/contactRequests", requestData);
        if (res.data.insertedId) {
          Swal.fire(
            "Success",
            "Payment successful. Contact request submitted!",
            "success"
          );
          navigate("/dashboard/contact-request")
        }
      } catch (err) {
        Swal.fire("Error", "Failed to save contact request", "error");
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-transparent rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Checkout Contact Information</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={biodata?.biodataId || ""}
          readOnly
          className="input input-bordered bg-transparent rounded-2xl w-full"
        />
        <input
          type="text"
          value={user?.email}
          readOnly
          className="input input-bordered bg-transparent rounded-2xl w-full"
        />
        <div className="border bg-white p-3 rounded-2xl">
          <CardElement />
        </div>
        <button
          type="submit"
          className="bg-lime-400 hover:bg-lime-600 text-black px-3 py-2 rounded-2xl w-full cursor-pointer"
          disabled={!stripe || !clientSecret}
        >
          Pay $5 for Contact Request
        </button>
      </form>
    </div>
  );
};

export default Checkout;
