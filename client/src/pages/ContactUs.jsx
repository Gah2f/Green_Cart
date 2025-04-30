import React from "react";
import { assets } from "../assets/greencart_assets/assets.js";

function ContactUs() {
  return (
    <div>
      <div className="mt-16 pb-16 relative">
        <img src={assets.bottom_banner_image} alt="" />
        <div className="absolute inset-0 flex flex-col items-end md:items-end justify-end md:justify-center pb-25 md:pb-0 px-4 md:pr-12 lg:pr-24">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center md:text-left max-w-[18rem] md:max-w-[400px] leading-tight lg:leading-15">
         <span className="text-primary"> Get in Touch </span>  <br />  We're Here to Help! {" "}
          </h1>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
