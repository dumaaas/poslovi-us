export default function placeholderSecondaryCard() {
  return (
    <div className="w-full flex flex-col rounded-xl overflow-hidden p-4 transition-all duration-200 ease-in-out relative h-[117px] bg-white shadow-[0_0_10px_rgba(0,0,0,0.1)]">
      <div className="flex gap-[15px] items-center">
        <div className="shine-anim w-[48px] h-[48px] rounded-[8px] bg-gray-300"></div>
        <div className="flex flex-col gap-[5px]">
          <div className="shine-anim w-[70px] h-[18px] rounded-[8px] bg-gray-300"></div>
          <div className="shine-anim w-[60px] h-[16px] rounded-[8px] bg-gray-300"></div>
        </div>
      </div>
      <div className="flex flex-row gap-[10px] items-center my-[15px]">
        <div className="shine-anim w-[60px] h-[18px] rounded-[8px] bg-gray-300"></div>
        <div className="shine-anim w-[60px] h-[18px] rounded-[8px] bg-gray-300"></div>
      </div>
    </div>
  );
}
