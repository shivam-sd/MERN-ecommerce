import React from "react";
import { CgWebsite } from "react-icons/cg";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaRegCopyright } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="absolute bottom-0 w-full">
      <footer className="w-full bg-gray-200 h-auto p-4">
        <div className="container mx-auto flex items-center justify-evenly p-1">
          <Link
            to="https://shivambca.netlify.app"
            target="_blank"
            className="flex items-center lg:gap-2 gap-1 text-sm font-semibold"
          >
            <CgWebsite className="text-2xl text-green-500" />
            <span className="hidden lg:block md:block">Portfolio</span>
          </Link>
          <Link
            to="http://www.linkedin.com/in/technical-shivam"
            target="_blank"
            className="flex items-center lg:gap-2 gap-1 text-sm font-semibold "
          >
            <FaLinkedin className="text-2xl text-blue-700" />
            <span className="hidden lg:block md:block">Linkdien</span>
          </Link>
          <Link
            to="https://github.com/shivam-sd"
            target="_black"
            className="flex items-center lg:gap-2 gap-1 text-sm font-semibold "
          >
            <FaGithub className="text-2xl text-black" />
            <span className="hidden md:block lg:block">Github</span>
          </Link>
          <Link
            to="https://www.instagram.com/mr.shivam__06?igsh=MW9xbDdpdnE0YnRuMQ=="
            target="_blank"
            className="flex items-center lg:gap-2 gap-1 text-sm font-semibold "
          >
            <FaSquareInstagram className="text-2xl text-pink-600" />
            <span className="hidden lg:block md:block">Instagram</span>
          </Link>
        </div>
        <div className="flex items-center justify-center mt-2 gap-2 font-bold">
          <FaRegCopyright className="text-sm text-black font-bold" /> Copyright
          2025 | Reserverd by Shivam
        </div>
      </footer>
    </div>
  );
};

export default Footer;
