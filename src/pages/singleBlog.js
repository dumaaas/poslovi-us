import Image from "next/image";
import logoPic from "../../public/logo1.png";
import usPic from "../../public/us.svg";
import Subscription from "@/components/subscription";

export default function singleBlog() {
  return (
    <div className="">
      <div className="py-12 bg-red-100">
        <div className="flex gap-[25px] items-center container">
          <Image
            src={logoPic}
            alt="prologs-logo"
            className="w-[96px] h-[96px] rounded-[8px]"
            placeholder="blur"
          />
          <div className="flex flex-col gap-[8px]">
            <h3 className="text-[#334155] text-[40px] leading-[44px] font-bold">
              Besplatna radionica „Povezivanje tabela u Excelu“
            </h3>
          </div>
        </div>
      </div>
      <div className="container py-12">
        <div className="">
          <h2 className=" pb-4 text-[30px] leading-[36px] text-[#334155] font-bold">
            Besplatna radionica „Povezivanje tabela u Excelu“
          </h2>
          <p className="text-[18px] leading-[32px] text-[#374151] pb-4">
            Dragi naši kao što smo i obećali, i ovog meseca nastavljamo sa
            druženjem, a ovoga puta na besplatnoj radionici „Povezivanje tabela
            u Excelu“ imaćemo prilike da se pozabavimo različitim mogućnostima
            koje su nam na raspolaganju kada podatke iz drugih izvora treba
            prepisati u „našu“ tabelu… ali i greškama koje uvek mogu da se jave
            prilikom ovog zadatka.
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
      </div>
      <Subscription />
    </div>
  );
}
