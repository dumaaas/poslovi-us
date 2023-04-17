export default function placeholderCard() {
  return (
    <div className="lg:flex-[30%] md:flex-[45%] flex-[100%] flex flex-col rounded-xl overflow-hidden p-4 transition-all duration-200 ease-in-out relative h-[257px] bg-white shadow-[0_0_10px_rgba(0,0,0,0.1)]">
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
      <div className="flex flex-col gap-[12px] justify-between flex-1">
        <div className="shine-anim w-[100px] h-[28px] rounded-[8px] bg-gray-300"></div>
        <div className="shine-anim w-full h-[40px] rounded-[8px] bg-gray-300"></div>
        <div className="flex items-center justify-between mt-[3px]">
          <div className="shine-anim w-[80px] h-[28px] rounded-[8px] bg-gray-300"></div>
          <div className="shine-anim w-[60px] h-[28px] rounded-[8px] bg-gray-300"></div>
        </div>
      </div>
    </div>
  );
}
