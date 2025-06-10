import React from "react";
import { CgWebsite } from "react-icons/cg";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaRegCopyright } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const handleAdmin = () => {
    navigate("/admin");
  };

  return (
    <footer className="w-full bg-gray-200 p-4 mt-10">
      {/* Top row - Icons and Links */}
      <div className="container mx-auto flex flex-wrap items-center justify-evenly gap-2">
        <a
          href="https://shivambca.netlify.app"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-sm font-semibold"
        >
          <CgWebsite className="text-2xl text-green-500" />
          <span className="hidden md:inline">Portfolio</span>
        </a>

        <a
          href="http://www.linkedin.com/in/technical-shivam"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-sm font-semibold"
        >
          <FaLinkedin className="text-2xl text-blue-700" />
          <span className="hidden md:inline">LinkedIn</span>
        </a>

        <a
          href="https://github.com/shivam-sd"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-sm font-semibold"
        >
          <FaGithub className="text-2xl text-black" />
          <span className="hidden md:inline">GitHub</span>
        </a>

        <a
          href="https://www.instagram.com/mr.shivam__06?igsh=MW9xbDdpdnE0YnRuMQ=="
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-sm font-semibold"
        >
          <FaSquareInstagram className="text-2xl text-pink-600" />
          <span className="hidden md:inline">Instagram</span>
        </a>
      </div>

      {/* Bottom row - Copyright */}
      <div className="flex items-center justify-center mt-3 gap-2 font-bold text-sm">
        <FaRegCopyright
          className="text-base cursor-pointer"
          onClick={handleAdmin}
          title="Admin Login"
        />
        <span>2025 | Reserved by Shivam</span>
      </div>
    </footer>
  );
};

export default Footer;
