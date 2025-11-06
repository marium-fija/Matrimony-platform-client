import { useAuth } from "../provider/AuthProvider";


const Profile = () => {
   const { user } = useAuth();
console.log(user);



    if (!user) {
        return <p className="text-center py-10 text-red-500">You are not logged in</p>;
    }

    return (
        <div>
             <div className="max-w-4xl mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold text-cyan-600 mb-8 text-center">Your Profile</h2>
            <div className="bg-gray-700 shadow-md rounded-xl p-8 flex gap-8 items-center">
                <div className="w-60 h-60    flex items-center justify-center my-4">
                    <img className="rounded-3xl" src={user.photoURL} alt="" /> 
                </div>
                <div className="mt-8">
                    <h3 className="text-xl font-semibold"><strong>Name : </strong> {user.displayName || "Unnamed"}</h3>
                <p className="text-gray-500"><strong className="text-white">E-mail : </strong> {user.email}</p>
                {user.phoneNumber && <p className="mt-2 text-gray-600">Phone: {user.phoneNumber}</p>}
                </div>
            </div>
        </div>
        </div>
    );
};

export default Profile;