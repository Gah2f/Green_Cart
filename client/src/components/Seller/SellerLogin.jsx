import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

function SellerLogin() {
  const { navigate, isSeller, setIsSeller , axios} = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
   try {
     e.preventDefault();
     const { data } = await axios.post('/api/seller/login', {
        email,
        password,
     })

     if (data.success) {
      setIsSeller(true);
      navigate("/seller");
     } else {
      toast.error(data.message);
     }
   } catch (error) {
    console.log(error.message);
    toast.error("Something went wrong, please try again later.");
   }

  };
  useEffect(() => {
    if (isSeller) {
      navigate("/seller");
    }
  }, [isSeller]);
  return (
    !isSeller && (
      <form
        onSubmit={onSubmitHandler}
        className="min-h-screen flex items-center text-sm text-gray-600"
      >
        <div className="flex flex-col gap-5 m-auto items-start p-8 py-12 min-w-[80] sm:min-w-[88] rounded-lg shadow-xl border border-gray-200">
          <p className="text-2xl font-medium m-auto">
            <span className="text-primary">Seller </span>
            Login
          </p>
          <div className="w-full">
            <p>Email</p>
            <input
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
              type="email"
              placeholder="Email address"
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
              required
            />
          </div>

          <div className="w-full">
            <p>Password</p>
            <input
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
              required
            />
          </div>
          <button className="w-full bg-primary hover:bg-primary-dull text-white  py-2 rounded-md cursor-pointer"> Login </button>
        </div>
      </form>
    )
  );
}

export default SellerLogin;
