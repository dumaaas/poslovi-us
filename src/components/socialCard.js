import Image from "next/image";

export default function socialCard(props) {
  return (
    <a
      href={props.card.href}
      target="_blank"
      className="rounded-[8px] transition-all ease-in-out duration-200 bg-[#F8FAFC] hover:bg-gray-200 p-4 relative cursor-pointer flex"
    >
      <div className="">
        <p className="text-[14px] leading-[20px] font-bold text-[#334155]">
          {props.card.title}
        </p>
        <span className="text-[14px] leading-[20px] text-[#6b7280]">
          {props.card.tag}
        </span>
      </div>
      <Image
        className="w-[70px] h-[70px] absolute top-[50%] transform translate-y-[-50%] right-4 opacity-10"
        src={props.card.icon}
        alt="instagram-icon"
      />
    </a>
  );
}
