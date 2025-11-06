import React, { useEffect, useState } from 'react';
import useAxios from '../hooks/useAxios';
import { useAuth } from '../provider/AuthProvider';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router';

const EditBiodata = () => {
    const {user} = useAuth();
     const axios = useAxios();
     const navigate = useNavigate();

  const [formData, setFormData] = useState(
    {
    biodataType: "",
    name: "",
    profileImage: "",
    dob: "",
    height: "",
    weight: "",
    age: "",
    occupation: "",
    race: "",
    fatherName: "",
    motherName: "",
    permanentDivision: "",
    presentDivision: "",
    expectedPartnerAge: "",
    expectedPartnerHeight: "",
    expectedPartnerWeight: "",
    contactEmail: user?.email || "", 
    mobileNumber: "",
    about: "",
  }
);
// console.log(formData);


useEffect(() => {
    const fetchData = async () => {
     try {
      const res = await axios.get(`/biodatas/email/${user?.email}`);
      setFormData(res.data); 
    } catch (err) {
      if (err.response && err.response.status === 404) {
    
        console.log("Biodata not found, ready to create new");
      } else {
        console.error(err);
      }
    }
  };
  if (user?.email) {
    fetchData();
  }
  }, [user, axios]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     try {
    // Check if biodata exists
    let existingData;
    try {
      const res = await axios.get(`/biodatas/email/${user?.email}`);
      existingData = res.data;
    } catch (err) {
      if (err.response?.status === 404) {
        existingData = null;
      } else {
        throw err;
      }
    }

    if (!existingData) {
      await axios.post("/biodatas", formData);
    } else {
      await axios.put(`/biodatas/email/${user?.email}`, formData);
    }

    Swal.fire("Success", "Biodata saved successfully!", "success");
    navigate(`/dashboard/view-biodata/email/${user.email}`)
  } catch (err) {
    console.error(err);
    Swal.fire("Error", err.message, "error");
  }
  };
    return (
        <div>
            <form onSubmit={handleSubmit} className="max-w-5xl mx-auto p-6 bg-slate-800 text-white rounded-lg shadow-lg space-y-6">
  <h2 className="text-4xl font-bold mb-4">Edit Biodata</h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Name */}
    <div>
      <label className="block mb-1">Your Name</label>
      <input value={formData.name} 
  onChange={handleChange}  type="text" name="name" className="w-full p-2 border rounded bg-transparent" />
    </div>
    {/* Profile Image */}
    <div>
      <label className="block mb-1">Profile Image URL</label>
      <input value={formData.profileImage} 
  onChange={handleChange}  type="text" name="profileImage" className="w-full p-2 border rounded bg-transparent " />
    </div>

    {/* Gender */}
    <div>
      <label className="block mb-1">Gender</label>
      <select value={formData.biodataType} 
  onChange={handleChange}  name="biodataType" className="w-full p-2 border rounded bg-transparent text-gray-500">
        <option value="">Select</option>
        <option value="Female">Female</option>
        <option value="Male">Male</option>
      </select>
    </div>

    {/* Height */}
    <div>
      <label className="block mb-1">Height</label>
      <select value={formData.height} 
  onChange={handleChange}  name="height" className="w-full p-2 border rounded bg-transparent text-gray-500">
        <option value="">Select</option>
        <option value="160 cm">160 cm</option>
        <option value="165 cm">165 cm</option>
        <option value="170 cm">170 cm</option>
        <option value="175 cm">175 cm</option>
        <option value="180 cm">180 cm</option>
        <option value="185 cm">185 cm</option>
        <option value="190 cm">190 cm</option>
        <option value="195 cm">195 cm</option> 
      </select>
    </div>

    {/* Weight */}
    <div>
      <label className="block mb-1">Weight</label>
      <select value={formData.weight} 
  onChange={handleChange}  name="weight" className="w-full p-2 border rounded bg-transparent text-gray-500">
        <option>40 kg</option>
        <option>45 kg</option>
        <option>50 kg</option>
        <option>60 kg</option>
        <option>70 kg</option>
        <option>80 kg</option>
        <option>85 kg</option>
      </select>
    </div>

    {/* Age */}
    <div>
      <label className="block mb-1">Age</label>
      <input value={formData.age} 
  onChange={handleChange}  type="number" name="age" className="w-full p-2 border rounded bg-transparent text-gray-500" />
    </div>

    {/* Occupation */}
    <div>
      <label className="block mb-1">Occupation</label>
  <select value={formData.occupation} 
  onChange={handleChange}  type="text" name="occupation" className="w-full p-2 border rounded bg-transparent text-gray-500">
  <option value="engineer">Engineer</option>
  <option value="student">Lawyer</option>
  <option value="doctor">Doctor</option>
  <option value="teacher">Teacher</option>
  <option value="businessman">Businessman / Entrepreneur</option>
  <option value="govt-service">Government Service</option>
</select>
    </div>

    {/* Race */}
    <div>
      <label className="block mb-1">Race</label>
      <select value={formData.race} 
  onChange={handleChange}  name="race" className="w-full p-2 border rounded bg-transparent text-gray-500">
        <option>Asian</option>
        <option>Fair</option>
        <option>Dark</option>
      </select>
    </div>

    {/* Father's Name */}
    <div>
      <label className="block mb-1">Father's Name</label>
      <input value={formData.fatherName} 
  onChange={handleChange}  type="text" name="fatherName" className="w-full p-2 border rounded bg-transparent" />
    </div>

    {/* Mother's Name */}
    <div>
      <label className="block mb-1">Mother's Name</label>
      <input value={formData.motherName} 
  onChange={handleChange}  type="text" name="motherName" className="w-full p-2 border rounded bg-transparent text-gray-500" />
    </div>

    {/* Permanent Division */}
    <div>
      <label className="block mb-1">Permanent Division</label>
      <select value={formData.permanentDivision} 
  onChange={handleChange}  name="permanentDivision" className="w-full p-2 border rounded bg-transparent text-gray-500">
        <option>Dhaka</option>
        <option>Chattagram</option>
        <option>Rangpur</option>
        <option>Barisal</option>
        <option>Khulna</option>
        <option>Mymensingh</option>
        <option>Sylhet</option>
      </select>
    </div>

    {/* Present Division */}
    <div>
      <label className="block mb-1">Present Division</label>
      <select value={formData.presentDivision} 
  onChange={handleChange}  name="presentDivision" className="w-full p-2 border rounded bg-transparent text-gray-500">
        <option>Dhaka</option>
        <option>Chattagram</option>
        <option>Rangpur</option>
        <option>Barisal</option>
        <option>Khulna</option>
        <option>Mymensingh</option>
        <option>Sylhet</option>
      </select>
    </div>

    {/* Expected Partner Age */}
    <div>
      <label className="block mb-1">Expected Partner Age</label>
      <select value={formData.expectedPartnerAge} 
  onChange={handleChange}  type="number" name="expectedPartnerAge" className="w-full p-2 border rounded bg-transparent text-gray-500">
        <option>19 Year</option>
        <option>20 Year</option>
        <option>21 Year</option>
        <option>22 Year</option>
        <option>23 Year</option>
        <option>24 Year</option>
        <option>25 Year</option>
        <option>26 Year</option>
        <option>27 Year</option>
        <option>28 Year</option>
        <option>29 Year</option>
        <option>30 Year</option>
        <option>31 Year</option>
        <option>32 Year</option>
        <option>33 Year</option>
        <option>34 Year</option>
        <option>35 Year</option>
        <option>36 Year</option>
        <option>37 Year</option>
        <option>38 Year</option>
        <option>39 Year</option>
        <option>40 Year</option>   
      </select>
    </div>

    {/* Expected Partner Height */}
    <div>
      <label className="block mb-1">Expected Partner Height</label>
      <select value={formData.expectedPartnerHeight} 
  onChange={handleChange}  type="text" name="expectedPartnerHeight" className="w-full p-2 border rounded bg-transparent text-gray-500">
        <option value="">Select</option>
        <option value="160 cm">160 cm</option>
        <option value="165 cm">165 cm</option>
        <option value="170 cm">170 cm</option>
        <option value="175 cm">175 cm</option>
        <option value="180 cm">180 cm</option>
        <option value="185 cm">185 cm</option>
        <option value="190 cm">190 cm</option>
        <option value="195 cm">195 cm</option>  
      </select>
    </div>

    {/* Expected Partner Weight */}
    <div>
      <label className="block mb-1">Expected Partner Weight</label>
      <select value={formData.expectedPartnerWeight} 
  onChange={handleChange}  type="text" name="expectedPartnerWeight" className="w-full p-2 border rounded bg-transparent text-gray-500">
        <option>40 kg</option>
        <option>45 kg</option>
        <option>50 kg</option>
        <option>60 kg</option>
        <option>70 kg</option>
        <option>80 kg</option>
        <option>85 kg</option>
      </select>
    </div>

    {/* Email */}
    <div>
      <label className="block mb-1">Contact Email</label>
      <input value={formData.contactEmail} 
  onChange={handleChange}  type="email" name="contactEmail" readOnly className="w-full p-2 border rounded text-gray-500 bg-transparent" />
    </div>

    {/* Mobile */}
    <div>
      <label className="block mb-1">Phone</label>
      <input required value={formData.mobileNumber} 
  onChange={handleChange}  type="text" name="mobileNumber" className="w-full p-2 border rounded bg-transparent text-gray-500" />
    </div>

    {/* Date of Birth */}
    <div>
      <label className="block mb-1">Date of Birth</label>
      <input value={formData.dob} 
  onChange={handleChange}  type="date" name="dob" className="w-full p-2 border rounded bg-transparent text-gray-500" />
    </div>
  </div>

  {/* About */}
  <div>
    <label className="block mb-1">About</label>
    <textarea value={formData.about} 
  onChange={handleChange}  name="about" rows="3" className="w-full p-2 border rounded bg-transparent"></textarea>
  </div>

  <button type="submit" className="mt-4 bg-indigo-500 px-6 py-2 rounded-full text-white font-bold">
    Save
  </button>
</form>
        </div>
    );
};

export default EditBiodata;