import Hero from "@/components/hero";
import Subscription from "@/components/subscription";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useRouter } from "next/router";

export default function about() {
  const router = useRouter();
  return (
    <div>
      <Hero
        title="O nama"
        description="Upoznajte se sa našim radom, javite nam se!"
        isBig="false"
      />
      <div className="container py-12 text-[#334155]">
        <p className="font-bold">
          Dobrodošli na Poslovi.us, vašu omiljenu web platformu za traženje
          poslova i pronalaženje kvalitetnih kandidata u SAD-u!{" "}
        </p>
        <p className="my-8">
          Na našoj platformi možete pronaći listu aktivnih oglasa za različita
          radna mesta, od početnih pozicija do rukovodećih funkcija, a takođe
          nudimo i opciju remote poslova.
        </p>
        <p className="my-8">
          Bez obzira da li tražite posao ili kvalifikovane kandidate za vašu
          kompaniju, naša platforma je idealno mesto za početak.
        </p>
        <p className="my-8">
          Mi smo tu da vam pomognemo u pronalaženju savršenog posla ili
          kandidata za vašu firmu. Moramo napomenuti da je naša platforma
          jednostavna za korišćenje i nudi vam mogućnost da filtrirate oglase po
          raznim kriterijumima, kao što su industrija, lokacija, iskustvo i
          drugi kriterijumi koji su vam bitni.
        </p>
        <p className="my-8">
          Onu što našu platformu čini drugačijom od ostalih je u tome što smo
          fokusirani na zajednicu ljudi sa Balkana koji traže posao u SAD-u.
          Pružamo priliku poslodavcima da dođu do kvalitetnih kandidata koji
          govore pored engleskog i ostale balkanske jezike i koji su upoznati sa
          kulturom i običajima regije.
        </p>
        <p className="my-8">
          Naša platforma takođe pruža mogućnost za pretragu remote poslova,
          odnosno onih poslova koji ne zahtevaju fizičku prisutnost na radnom
          mestui. Ovo je sjajna opcija za one koji žele da rade iz udobnosti
          svog doma ili bilo kog drugog mesta na svetu.
        </p>
        <p className="my-8">
          Mi smo tu da vam pomognemo u pronalaženju posla koji odgovara vašim
          kvalifikacijama i interesovanjima, ili kandidata koji odgovaraju
          potrebama vaše firme. Naša platforma vam nudi sve alate koji su vam
          potrebni da biste lakše i brže došli do željenih rezultata.
        </p>
        <p className="my-8 font-bold">
          Pridružite se našoj zajednici danas i otkrijte sve prednosti koje naša
          platforma nudi!
        </p>
        <div className="flex flex-col gap-[15px]">
          <div className="flex items-center gap-[15px]">
            <FontAwesomeIcon className=" text-[#334155]" icon="clock" />
            <p className="text-[#334155]">Pon-Pet: 08:00-16:00</p>
          </div>
          <div
            className="flex items-center gap-[15px] cursor-pointer"
            onClick={() => router.push("mailto:info@poslovi.us")}
          >
            <FontAwesomeIcon className=" text-[#334155]" icon="envelope" />
            <p className="text-red-500">info@poslovi.us</p>
          </div>
          <div
            className="flex items-center gap-[15px] cursor-pointer"
            onClick={() => router.push("tel:+38268836393")}
          >
            <FontAwesomeIcon className=" text-[#334155]" icon="phone" />
            <p className="text-red-500">068/836-393</p>
          </div>
        </div>
      </div>
      <Subscription />
    </div>
  );
}
