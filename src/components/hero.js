import cover from "../../public/bgCover.jpg";

export default function Hero(props) {
  return (
    <div className="relative">
      <div
        className="absolute top-0 left-0 z-10 w-full h-full"
        style={{
          backgroundImage: `url(${cover.src})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      ></div>
      <div className="absolute top-0 left-0 z-20 w-full h-full bg-black bg-opacity-80"></div>
      <div className={`relative z-30 container flex flex-col justify-between items-start ${props.isBig === 'true' ? 'py-[100px] md:py-[80px] py-[60px]' : 'py-[50px]'}`}>
        {props.label && (
          <span className="text-red-500 border-2 border-red-500 inline-flex font-display text-brand-primary px-2 py-0.5 lg:px-3 lg:py-1 rounded-xl font-medium text-sm lg:text-lg">
            {props.label}
          </span>
        )}
        <h1 className={`xl:max-w-[75%] max-w-[95%] font-semibold font-display  !leading-tight text-white ${props.isBig === 'true' ? 'mt-4 text-[40px] lg:text-6xl xl:text-7xl' : 'mt-0 lg:text-5xl xl:text-5xl text-[32px]'}`}>
          {props.title}
        </h1>
        <p className={` text-red-500  ${props.isBig === 'true' ? 'text-lg lg:text-xl xl:text-3xl mt-8' : 'mt-6 text-md lg:text-lg xl:text-xl'}`}>
          {props.description}
        </p>
      </div>
    </div>
  );
}
