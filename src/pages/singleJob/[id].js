import Image from "next/image";
import logoPic from "../../../public/logo1.png";
import usPic from "../../../public/us.svg";
import Subscription from "@/components/subscription";
import { Box, Modal } from "@material-ui/core";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { set } from "nprogress";

export default function singleJob() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const router = useRouter();
  const { id } = router.query;
  const [job, setJob] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [letter, setLetter] = useState("");

  useEffect(() => {
    getJob();
  }, []);

  function checkEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  const submitForm = () => {
    console.log("Obradi zahtjev...");
  };

  const getJob = async () => {
    const docRef = doc(db, "jobs", id);
    // Get a document, forcing the SDK to fetch from the offline cache.
    try {
      const doc = await getDoc(docRef);
      setJob(doc.data());
    } catch (e) {
      console.log("Error getting cached document:", e);
    }
  };

  const takeInitials = (name) => {
    let result = "";
    for (let i = 0; i < name.length; i++) {
      const currentChar = name.charAt(i);

      if (
        currentChar === currentChar.toUpperCase() &&
        currentChar.match(/[A-Z]/)
      ) {
        result += currentChar;

        if (result.length === 2) {
          break;
        }
      }
    }
    return result;
  };

  return (
    <div>
      {job && (
        <div className="relative ">
          <div className="py-12 bg-red-100">
            <div className="flex gap-[25px] items-center container">
              {job.offer_type === "offer" && (
                <div className="flex items-center justify-center p-2 rounded-[8px] border border-white w-[120px] h-[120px]">
                  <img
                    src={job.url}
                    alt="prologs-logo"
                    className="w-auto h-auto rounded-[8px]"
                  />
                </div>
              )}

              {job.offer_type === "offering" && (
                <div className="flex items-center justify-center p-2 rounded-[8px] border border-white w-[120px] h-[120px]">
                  <p className="text-[32px] font-bold text-[#334155]">
                    {takeInitials(job.name)}
                  </p>
                </div>
              )}

              <div className="flex flex-col gap-[8px]">
                <h3 className="text-[#334155] text-[36px] leading-[40px] font-bold">
                  {job.position}
                </h3>
                <p className="text-[#6b7280] leading-[20px] text-[14px]">
                  {job.job_type} - {job.name}
                </p>
              </div>
            </div>
          </div>
          <div className="container grid gap-12 py-12 lg:grid-cols-7">
            <div className="order-2 lg:order lg:col-span-5">
              <div dangerouslySetInnerHTML={{ __html: job.content }} />
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
                      {job.location}
                    </div>
                  </div>
                  <div className="flex flex-col gap-[5px] mb-[10px]">
                    <p className="text-[16px] leading-[24px] text-[#334155] font-bold">
                      Pozicija
                    </p>
                    <span className="text-[14px] leading-[20px] text-[#6b7280]">
                      {job.position}
                    </span>
                  </div>
                  <div className="flex flex-col gap-[5px] mb-[10px]">
                    <p className="text-[16px] leading-[24px] text-[#334155] font-bold">
                      Tip posla
                    </p>
                    <span className="text-[14px] leading-[20px] text-[#6b7280]">
                      {job.job_type}
                    </span>
                  </div>
                  <div className="flex flex-col gap-[5px] mb-[10px]">
                    <p className="text-[16px] leading-[24px] text-[#334155] font-bold">
                      Plata
                    </p>
                    <span className="text-[14px] leading-[20px] text-[#6b7280]">
                      {job.salary}
                    </span>
                  </div>
                  <div className="flex flex-col gap-[5px]">
                    <p className="text-[16px] leading-[24px] text-[#334155] font-bold">
                      Datum postavljanja
                    </p>
                    <span className="text-[14px] leading-[20px] text-[#6b7280]">
                      {job.published_at.toDate().toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div
                  onClick={handleOpen}
                  className=" py-3 font-bold text-center text-white bg-red-500 text-[18px] leading-[28px] cursor-pointer hover:bg-transparent hover:text-red-500 border-t-2 border-t-transparent hover:border-t-red-500 transition-all ease-in-out duration-200"
                >
                  {job.offer_type === "offer"
                    ? "Apliciraj sada"
                    : "Pošaljite ponudu"}
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
                    {job.position}
                  </h1>
                  <p className="text-[#6b7280] leading-[20px] text-[14px]">
                    {job.job_type} - {job.name}
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
                      value={name}
                      onChange={(e) => setName(e.target.value)}
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                      value={letter}
                      onChange={(e) => setLetter(e.target.value)}
                    />
                  </div>
                  <button
                    style={{
                      opacity:
                        !name.length ||
                        !email.length ||
                        !letter.length ||
                        !checkEmail(email)
                          ? "0.4"
                          : "",
                    }}
                    disabled={
                      !name.length ||
                      !email.length ||
                      !letter.length ||
                      !checkEmail(email)
                    }
                    onClick={submitForm}
                    className="mt-[25px] px-6 rounded-[10px] h-[50px] text-lg text-white bg-red-500 hover:text-red-500 hover:bg-transparent transition-all ease-in-out duration-250 border-transparent hover:border-red-500 border w-full"
                  >
                    {job.offer_type === "offer"
                      ? "Aplicirajte"
                      : "Pošaljite ponudu"}
                  </button>
                </div>
              </div>
            </Box>
          </Modal>
        </div>
      )}
      {!job && (
        <div className="h-[calc(100vh-100px)] w-full bg-red-100 flex items-center justify-center text-[40px] leading-[50px] text-red-500">
          Loading...
        </div>
      )}
    </div>
  );
}
