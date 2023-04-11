import Image from "next/image";
import logoPic from "../../public/logo1.png";
import usPic from "../../public/us.svg";
import Subscription from "@/components/subscription";
import { Box, Modal } from "@material-ui/core";
import { useState } from "react";

export default function singleJob() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div className="relative ">
      <div className="py-12 bg-red-100">
        <div className="flex gap-[25px] items-center container">
          <Image
            src={logoPic}
            alt="prologs-logo"
            className="w-[96px] h-[96px] rounded-[8px]"
            placeholder="blur"
          />
          <div className="flex flex-col gap-[8px]">
            <h3 className="text-[#334155] text-[36px] leading-[40px] font-bold">
              Truck Driver
            </h3>
            <p className="text-[#334155] leading-[28px] text-[20px]">
              at Quantify
            </p>
          </div>
        </div>
      </div>
      <div className="container grid gap-12 py-12 lg:grid-cols-7">
        <div className="order-2 lg:order lg:col-span-5">
          <h2 className=" pb-4 text-[30px] leading-[36px] text-[#334155] font-bold">
            Opis posla
          </h2>
          <p className="text-[18px] leading-[32px] text-[#374151] pb-4">
            Sjajna uloga za mlade i istrajne ljude koji žele da rade izazovan i
            nagrađivan posao.
          </p>
          <p className="text-[18px] leading-[32px] text-[#374151] pb-4 font-bold">
            Vaši zadaci:
          </p>
          <ul className="list-disc text-[18px] leading-[32px] text-[#374151] pb-4 ml-[20px]">
            <li className="pb-4">
              Prevoz tereta: Vas posao bi bio da vozite kamion firme Quantify i
              prevozite robu sa jednog mesta na drugo u okolini Chicaga i po
              potrebi i sire. Teret moze biti razlicitih dimenzija i tezina, pa
              je potrebna vestina pri manevrisanju i pripremi za transport.
            </li>
            <li className="pb-4">
              Upravljanje dokumentacijom: Pre nego sto krenete na put, morate
              proveriti i pripremiti sve potrebne dokumente za prevoz tereta. To
              ukljucuje proveru ispravnosti dozvola i registarskih tablica
              kamiona, kao i osiguranje da su svi tereti i dokumentacija u
              skladu sa zakonskim propisima.
            </li>
            <li className="pb-4">
              Odrzavanje kamiona: Vozac kamiona je takodje zaduzen za odrzavanje
              kamiona. To ukljucuje proveru nivoa ulja i drugih tecnosti,
              redovno ciscenje i odrzavanje higijene kabine, kao i planiranje
              redovnih servisa.
            </li>
            <li className="pb-4">
              Sigurnost: Bezbednost je veoma bitna u ovoj poziciji. Vozac
              kamiona je odgovoran za sigurnu voznju, pridrzavanje saobracajnih
              pravila i propisa i izbegavanje potencijalnih opasnosti na putu.
            </li>
            <li>
              Ostali zadaci: Vozac kamiona u Quantify-u moze biti zaduzen i za
              druge zadatke, kao sto su: istovar i utovar tereta, pomaganje u
              pripremi i organizaciji logistike, ili neki drugi zadaci po
              potrebi.
            </li>
          </ul>
          <p className="text-[18px] leading-[32px] text-[#374151] pb-4 font-bold">
            Neophodno iskustvo:
          </p>
          <ul className="list-disc text-[18px] leading-[32px] text-[#374151] pb-4 ml-[20px]">
            <li className="pb-4">
              Iskustvo u vožnji kamiona: Potrebno je imati prethodno iskustvo u
              vožnji kamiona, kao i važeću vozačku dozvolu za kamion (klasa C).
            </li>
            <li className="pb-4">
              Poznavanje saobraćajnih propisa: Vozac kamiona u Quantify
              kompaniji u Chicagu mora biti dobro upoznat sa saobraćajnim
              propisima, kao i sa lokalnim putevima i putevima u okolini
              Chicaga.
            </li>
            <li className="pb-4">
              Razumevanje logistike i transporta: Korisno je imati razumevanje
              osnova logistike i transporta, uključujući vreme isporuke,
              optimalni put, upravljanje teretom i dokumentacijom.
            </li>
            <li className="pb-4">
              Komunikacione veštine: Vozac kamiona mora imati dobre
              komunikacione veštine kako bi se efikasno komuniciralo sa drugim
              članovima tima, a posebno sa dispečerom.
            </li>
            <li className="pb-4">
              Održavanje kamiona: Potrebno je imati osnovno razumevanje
              održavanja kamiona, uključujući proveru nivoa ulja i drugih
              tečnosti, održavanje kabine i planiranje redovnih servisa.
            </li>
            <li className="pb-4">
              Fizička kondicija: Kao vozač kamiona, potrebno je biti u dobroj
              fizičkoj kondiciji kako bi se bilo u stanju da se podigne i
              utovari teret, kao i da se izdrži dug put na putu.
            </li>
            <li className="pb-4">
              Odgovornost: Vozac kamiona mora biti odgovoran i fokusiran na
              sigurnost, poštovanje saobraćajnih pravila i propisa i izbegavanje
              potencijalnih opasnosti na putu.
            </li>
            <li>
              Timski rad: Vozac kamiona u Quantify kompaniji u Chicagu mora biti
              sposoban da radi u timu i da pruži pomoć i podršku drugim
              članovima tima po potrebi.
            </li>
          </ul>
        </div>
        <div className="relative lg:col-span-2">
          <div className="lg:sticky lg:top-[20px] z-10 w-full bg-white border-2 border-red-500 rounded-lg">
            <div className="grid px-6 py-4 gap-y-2">
              <div className="flex flex-col gap-[5px] mb-[10px] items-start justify-start">
                <p className="text-[16px] leading-[24px] text-[#334155] font-bold">
                  Lokacija
                </p>
                <div
                  className={`text-[#334155] gap-[6px] items-center bg-[#F3F4F6] text-[12px] leading-[16px] font-bold rounded-lg px-1.5 py-0.5 inline-flex`}
                >
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
              <div className="flex flex-col gap-[5px] mb-[10px]">
                <p className="text-[16px] leading-[24px] text-[#334155] font-bold">
                  Pozicija
                </p>
                <span className="text-[14px] leading-[20px] text-[#6b7280]">
                  Truck Driver
                </span>
              </div>
              <div className="flex flex-col gap-[5px] mb-[10px]">
                <p className="text-[16px] leading-[24px] text-[#334155] font-bold">
                  Tip posla
                </p>
                <span className="text-[14px] leading-[20px] text-[#6b7280]">
                  Full time
                </span>
              </div>
              <div className="flex flex-col gap-[5px] mb-[10px]">
                <p className="text-[16px] leading-[24px] text-[#334155] font-bold">
                  Plata
                </p>
                <span className="text-[14px] leading-[20px] text-[#6b7280]">
                  USD80000-/yr
                </span>
              </div>
              <div className="flex flex-col gap-[5px]">
                <p className="text-[16px] leading-[24px] text-[#334155] font-bold">
                  Datum postavljanja
                </p>
                <span className="text-[14px] leading-[20px] text-[#6b7280]">
                  10.04.2023
                </span>
              </div>
            </div>
            <div
              onClick={handleOpen}
              className=" py-3 font-bold text-center text-white bg-red-500 text-[18px] leading-[28px] cursor-pointer hover:bg-transparent hover:text-red-500 border-t-2 border-t-transparent hover:border-t-red-500 transition-all ease-in-out duration-200"
            >
              Apliciraj sada
            </div>
          </div>
        </div>
      </div>
      <Subscription />
      <Modal open={open} onClose={handleClose}>
        <Box className="border-red-500  rounded-[8px] bg-white shadow-lg absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] max-w-[500px] w-[500px] border">
          <div className="">
            <div className="p-4 flex flex-col gap-[5px] border-b bg-red-100 border-b-red-500">
              <h1 className="text-[#334155] text-[26px] leading-[32px] font-bold">
                Truck Driver
              </h1>
              <p className="text-[#334155] leading-[24px] text-[18px]">
                at Quantox
              </p>
            </div>
            <div className="p-4">
              <div className="mt-[15px] flex flex-col gap-[5px]">
                <label className="text-[14px] leading-[20px] font-bold text-[#334155]">
                  Ime i prezime
                </label>
                <input
                  className="border h-[50px] px-[14px] text-[18px] leading-[28px] text-[#334155] rounded-[8px]"
                  type="text"
                  placeholder="Vaše ime i prezime"
                ></input>
              </div>
              <div className="mt-[15px] flex flex-col gap-[5px]">
                <label className="text-[14px] leading-[20px] font-bold text-[#334155]">
                  Email
                </label>
                <input
                  className="border h-[50px] px-[14px] text-[18px] leading-[28px] text-[#334155] rounded-[8px]"
                  type="text"
                  placeholder="Vaš email"
                ></input>
              </div>
              <div className="mt-[15px] flex flex-col gap-[5px]">
                <label className="text-[14px] leading-[20px] font-bold text-[#334155]">
                  Vaše propratno pismo
                </label>
                <textarea
                rows={6}
                  className="border px-[14px] text-[18px] py-[8px] leading-[28px] text-[#334155] rounded-[8px]"
                  type="text"
                  placeholder="Vaše propratno pismo"
                />
              </div>
              <button className="mt-[25px] px-6 rounded-[10px] h-[50px] text-lg text-white bg-red-500 hover:text-red-500 hover:bg-transparent transition-all ease-in-out duration-250 border-transparent hover:border-red-500 border w-full">
                Aplicirajte
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
