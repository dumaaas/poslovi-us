export default function placeholderBlogCard() {
  return (
    <div className="w-full flex flex-col rounded-xl overflow-hidden p-4 transition-all duration-200 ease-in-out relative h-[181px] bg-white shadow-[0_0_10px_rgba(0,0,0,0.1)]">
      <div className="flex gap-[15px] items-center">
        <div className="shine-anim min-w-[100px] max-w-[100px] h-[100px] rounded-[8px] bg-gray-300"></div>
        <div className="flex flex-col gap-[10px] w-full h-full">
          <div className="shine-anim w-[40%] h-[24px] rounded-[8px] bg-gray-300"></div>
          <div className="shine-anim w-full h-full rounded-[8px] bg-gray-300"></div>
        </div>
      </div>
      <div className="flex flex-row gap-[10px] items-center mt-[15px]">
        <div className="shine-anim w-[96px] h-[28px] rounded-[8px] bg-gray-300"></div>
      </div>
    </div>
  );
}
