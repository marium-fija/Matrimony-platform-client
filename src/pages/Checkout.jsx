import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useAuth } from '../provider/AuthProvider';
import Swal from 'sweetalert2';
import useAxios from '../hooks/useAxios';

const Checkout = () => {
    const { biodataId } = useParams();
  const { user } = useAuth();
  const axios = useAxios();
  const [cardNumber, setCardNumber] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Dummy Payment (Stripe later integrate করতে পারো)
    if (cardNumber.length < 8) {
      Swal.fire("Error", "Enter valid card number", "error");
      return;
    }

    const requestData = {
      biodataId,
      selfEmail: user?.email,
      name: user?.displayName,
      status: "pending",
      amount: 5,
    };

    try {
      const res = await axios.post('/contactRequests', requestData);
      if (res.data.insertedId) {
        Swal.fire("Success", "Contact request submitted! Wait for admin approval.", "success");
      }
    } catch (error) {
        console.log(error);
        
      Swal.fire("Error", "Something went wrong!", "error");
    }
  };
    return (
        <div>
            <div className="max-w-lg mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Checkout Contact Information</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" value={biodataId} readOnly className="input input-bordered w-full" />
        <input type="text" value={user?.email} readOnly className="input input-bordered w-full" />
        <input
          type="text"
          placeholder="Stripe Card Number"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          className="input input-bordered w-full"
        />
        <button type="submit" className="btn btn-primary w-full">
          Pay $5 & Request Contact
        </button>
      </form>
    </div>
        </div>
    );
};

export default Checkout;