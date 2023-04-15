export default function ClientsHero(props) {
  return (
    <div>
      {props.clients && (
        <div className="container py-12">
          <div className="flex items-stretch flex-wrap gap-[40px] justify-between">
            {props.clients.map((item, index) => {
              return (
                <a href={item.link} target="_blank"
                  key={index}
                  className="overflow-hidden shadow-none hover:shadow-[0_0_0_2px_rgba(239,68,68,1)] transition-all ease-in-out duration-200 group cursor-pointer relative flex flex-[30%] h-[300px] max-h-[300px] flex-col py-4 bg-red-100 rounded-[8px] gap-4 items-center justify-center text-center"
                >
                  <div className="group-hover:bg-opacity-0 transition-all ease-in-out duration-200 rounded-[8px] absolute top-0 left-0 z-20 w-full h-full bg-black bg-opacity-70"></div>
                  <div className="flex flex-col gap-[20px] group-hover:z-20 transition-all ease-in-out duration-200 z-10 flex items-center justify-center h-full w-full absolute group-hover:top-[50%] group-hover:left-[50%] group-hover:rotate-0 transform translate-x-0 traslate-y-0 group-hover:translate-x-[-50%] group-hover:translate-y-[-50%] top-[36%] left-[49%] rotate-[29deg]">
                    <img alt="img" className="" src={item.url} />
                    <p className="opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-500 text-red-500 text-[24px] leading-[30px] font-bold">
                        {item.name}
                    </p>
                  </div>
                  <p className="opacity-1 group-hover:opacity-0 transform scale-100 group-hover:scale-75 transition-all ease-in-out duration-200 text-[24px] leading-[30px] font-bold text-white px-[34px] py-[8px] z-30 bg-red-500 rounded-[8px]">
                    {item.name}
                  </p>
                </a>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
