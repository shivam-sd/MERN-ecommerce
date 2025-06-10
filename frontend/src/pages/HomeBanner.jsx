import React from "react";
import imageM1 from "../assets/banner/img1_mobile.jpg";
import imageM2 from "../assets/banner/img2_mobile.webp";
import imageM3 from "../assets/banner/img3_mobile.jpg";
import imageM4 from "../assets/banner/img4_mobile.jpg";
import imageM5 from "../assets/banner/img5_mobile.png";
import imageD1 from "../assets/banner/img1.webp";
import imageD2 from "../assets/banner/img2.webp";
import imageD3 from "../assets/banner/img3.jpg";
import imageD4 from "../assets/banner/img5.webp";

const MobileImages = [imageM1, imageM2, imageM3, imageM4, imageM5];

const DesktopImages = [imageD1, imageD2, imageD3, imageD4];

const HomeBanner = () => {
  return (
    <div
      className="mt-4 bg-gray-200 w-fu
     h-96 px-4 py-2 rounded-sm flex items-center justify-center"
    >
      {DesktopImages.map((images, index) => {
        return (
          <div className="mt-4 bg-gray-200 w-full h-full py-2 rounded-sm flex gap-4" key={index}>
            <img src={images} alt="" className="w-full h-full object-cover rounded-md transition-all duration-500" />
          </div>
        );
      })}
    </div>
  );
};

export default HomeBanner;
