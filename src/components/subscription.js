import logoPic from "../../public/logo.png";
import companyPic from "../../public/logo1.png";
import usPic from "../../public/us.svg";

import Image from "next/image";
export default function subscription() {
  return (
    <div className="pt-[60px] bg-red-100">
      <div className="p-[40px] pb-0 rounded-[12px] bg-white flex gap-[80px] items-center justify-center container">
        <div class="w-[350px] h-[390px]">
          <div
            class="border-t h-full !border-b-0 bg-white border-gray-900 relative"
            style={{
              borderWidth: "18px",
              borderTopLeftRadius: "45px",
              borderTopRightRadius: "45px",
            }}
          >
            <div className="absolute top-0 flex items-center justify-center w-40 h-8 -translate-x-1/2 bg-black left-1/2 rounded-b-xl">
              <div className="w-20 h-1 bg-white rounded-[20px]"></div>
            </div>
            <div className="w-[270px] mt-[60px] mx-auto text-black">
              <Image
                src={logoPic}
                alt="prologs-logo"
                className="lg:w-[120px] w-[120px]"
                placeholder="blur"
              />
              <p className="mt-[15px] text-[14px] leading-[20px] text-[#6b7280]">
                Hejaa! Stiže lista sa posljednjim dostupnim poslovima
              </p>
              <div className="flex flex-col mt-[20px] justify-start items-start border-b">
                <div className="flex gap-[15px] items-center">
                  <Image
                    src={companyPic}
                    alt="company-logo"
                    className="w-[36px] h-[36px] rounded-[8px]"
                    placeholder="blur"
                  />
                  <div className="flex flex-col">
                    <h3 className="text-[#334155] text-[14px] leading-[20px] font-bold">
                      Quantify
                    </h3>
                    <p className="text-[#6b7280] leading-[16px] text-[12px]">
                      Full-time / Senior
                    </p>
                  </div>
                </div>
                <div className="my-[15px] text-[#334155] gap-[6px] items-center text-[12px] leading-[16px] font-bold rounded-lg border px-1.5 py-0.5 inline-flex">
                  <div className="w-[12px] h-[12px]">
                    <Image
                      src={usPic}
                      alt="us-logo"
                      className="w-full h-full"
                    />
                  </div>
                  Chicago, USA
                </div>
              </div>
              <div className="flex flex-col mt-[20px] justify-start items-start border-b">
                <div className="flex gap-[15px] items-center">
                  <Image
                    src={companyPic}
                    alt="company-logo"
                    className="w-[36px] h-[36px] rounded-[8px]"
                    placeholder="blur"
                  />
                  <div className="flex flex-col">
                    <h3 className="text-[#334155] text-[14px] leading-[20px] font-bold">
                      Quantify
                    </h3>
                    <p className="text-[#6b7280] leading-[16px] text-[12px]">
                      Full-time / Senior
                    </p>
                  </div>
                </div>
                <div className="my-[15px] text-[#334155] gap-[6px] items-center text-[12px] leading-[16px] font-bold rounded-lg border px-1.5 py-0.5 inline-flex">
                  <div className="w-[12px] h-[12px]">
                    <Image
                      src={usPic}
                      alt="us-logo"
                      className="w-full h-full"
                    />
                  </div>
                  Chicago, USA
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[15px] w-full max-w-3xl pb-[25px]">
          <span className="text-red-500 text-[18px] leading-[28px] font-bold">
            Dobijajte obaveštenja o poslovima
          </span>
          <h1 className="text-[30px] leading-[36px] text-[#334155] font-bold">Preplatite se kako bi dobijali obavještenja o poslovima</h1>
          <div className="mt-[15px] flex flex-col gap-[5px]">
            <label className="text-[14px] leading-[20px] font-bold text-[#334155]">Ime</label>
            <input className="border h-[50px] px-[14px] text-[18px] leading-[28px] text-[#334155] rounded-[8px]" type="text" placeholder="Vaše ime"></input>
          </div>
          <div className="mt-[10px] flex flex-col gap-[5px]">
            <label className="text-[14px] leading-[20px] font-bold text-[#334155]">Email</label>
            <input className="border h-[50px] px-[14px] text-[18px] leading-[28px] text-[#334155] rounded-[8px]" type="text" placeholder="Vaš email"></input>
          </div>
          <button className="mt-[15px] px-6 rounded-[10px] h-[50px] text-lg text-white bg-red-500 hover:text-red-500 hover:bg-transparent transition-all ease-in-out duration-250 border-transparent hover:border-red-500 border">
            Preplatite se!
          </button>
        </div>
      </div>
    </div>
  );
}
