import Hero from "@/components/hero";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import Subscription from "@/components/subscription";

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
        <p className="font-bold">Dobro došli na stranicu portala poslovi.us</p>
        <p className="my-8">
          Portal poslovi.us je online berza poslova, nastao kao potreba za
          uspostavljanjem profesionalnog poslovnog sistema koji će pomoći Srbiji
          da poveća stopu zaposlenosti.
        </p>
        <p className="my-8">
          Poslovi.rs je namenjen poslodavcima i kandidatima, kao i svima onima
          koji imaju interesovanja za domen ljudskih resursa i praćenje uticaja
          koju ova oblast ima u razvoju privrede i društva u celini.
        </p>
        <p className="my-8">
          Naš cilj, od samih početaka rada portala Poslovi.rs je da pomognemo
          svojim kandidatima da nađu posao, da povećamo stopu zaposlenosti, kao
          i da postavljamo iznova standarde u oblasti ljudskih resursa. Takođe
          cilj je pomoći i olakšati poslodavcima potragu za kvalitetnim i pravim
          kadrom, koji će doprineti rastu i razvoju kompanije.
        </p>
        <p className="my-8 font-bold">
          Teoriju ćemo ostaviti drugima, a Vama ćemo pomoći da na praktičan
          način dođete do ostvarenja svog cilja - bilo da ste poslodavac ili
          budući zaposleni.
        </p>
        <p className="my-8 font-bold">
          Biće nam zadovoljstvo da budemo deo i Vašeg poslovnog uspeha.
        </p>
        <div className="flex flex-col gap-[15px]">
          <div className="flex items-center gap-[15px]">
            <FontAwesomeIcon className=" text-[#334155]" icon="clock" />
            <p className="text-[#334155]">Pon-Pet: 08:00-16:00</p>
          </div>
          <div
            className="flex items-center gap-[15px] cursor-pointer"
            onClick={() => router.push("mailto:markodumnic8@gmail.com")}
          >
            <FontAwesomeIcon className=" text-[#334155]" icon="envelope" />
            <p className="text-red-500">markodumnic8@gmail.com</p>
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
