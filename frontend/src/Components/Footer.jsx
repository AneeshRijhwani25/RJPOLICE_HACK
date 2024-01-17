import React from "react";
import Image from "next/image";
import { MdOutlineEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-[#5bd343] py-14 text-white">
      <div className="grid place-items-center sm:text-left text-center lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
        <Image src="/logo.png" width={50} height={20} />
        <div className="sm:mt-0 mt-14">
          <h1 className="font-bold capitalize sm:pt-0 pt-8 pb-4">company</h1>
          <ul>
            <li>
              <a href="/">About Us</a>
            </li>
            <li>
              <a href="/">Contact Us</a>
            </li>
            <li>
              <a href="/">Terms and Conditions</a>
            </li>
            <li>
              <a href="/">Careers</a>
            </li>
          </ul>
        </div>
        <div>
          <h1 className="font-bold capitalize sm:pt-0 pt-8 pb-4">Connect</h1>
          <ul>
            <li>
              <a href="/">Twitter</a>
            </li>
            <li>
              <a href="/">Facebook</a>
            </li>
            <li>
              <a href="/">Linkedin</a>
            </li>
            <li>
              <a href="/">Youtube</a>
            </li>
            <li>
              <a href="/">RSS</a>
            </li>
          </ul>
        </div>
        <div>
          <h1 className="font-bold capitalize sm:pt-0 pt-8 pb-4">Contact Us</h1>
          <ul>
            <li className="flex items-center gap-1">
              <MdOutlineEmail />
              <a href="mailto:rajpolice@gov.in">rajpolice@gov.in</a>
            </li>
            <li className="flex items-center gap-1">
              <FaPhone />
              <a href="tel:+9170XXXXXXX8">+91-70XXXXXXX8</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
