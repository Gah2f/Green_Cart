import React, { useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { useLocation } from "react-router-dom";
import loaderImg from '../assets/greencart_assets/cropped_image.png'

function Loading() {
    const { navigate } = useAppContext();
    let { search } = useLocation();

    const query = new URLSearchParams(search);

    const nextUrl= query.get('next');
    useEffect(()=>{
        if(nextUrl) {
            setTimeout(()=>{
                navigate(`/${nextUrl}`)
            },5000)
        }
    },[nextUrl])
  return (
    // <div className="flex justify-center items-center h-screen">
    //   <div className="animate-spin rounded-full h-24 w-24 border-4 border-gray-300 border-t-primary"> </div>
    // </div>

    <div className="flex items-center justify-center h-screen bg-primary-dull">
    <div className="relative w-24 h-24 animate-spin-slow">
      <img
        src={loaderImg}
        alt="Loading..."
        className="w-full h-full"
      />
      <div className="absolute inset-0 rounded-full border-4 border-dashed border-yellow-400 animate-spin"></div>
    </div>
    <p className="ml-4 text-xl font-bold text-orange-600 animate-pulse">Baking your order...</p>
  </div>
  );
}

export default Loading;
