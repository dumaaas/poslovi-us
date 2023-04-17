import facebookIcon from "../../public/facebook-header-icon.svg";
import instagramIcon from "../../public/instagram-header-icon.svg";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="py-4 bg-red-500">
      <div className="container flex justify-between text-white gap-[10px] text-[14px] leading-[18px]">
        <p>Copyright © 2023 • poslovi.us • All Rights Reserved</p>
        <div className="text-white sm:flex gap-[10px] items-center hidden">
          <a href="#">
            <Image
              className="fill-white color-white"
              src={facebookIcon}
              alt="facebook-icon"
            />
          </a>
          <a href="#">
            <Image src={instagramIcon} alt="instagram-icon" />
          </a>
        </div>
      </div>
    </footer>
  );
}
