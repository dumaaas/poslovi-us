import { useSelector } from "react-redux";

export default function LogoutToast() {
  const showLogOutMsg = useSelector((state) => state.showLogOutMsg);
  const logOutMsg = useSelector((state) => state.logOutMsg);
  return (
    <div
      className={`${
        showLogOutMsg
          ? "opacity-1 scale-100 z-[99999999]"
          : "z-[-1] opacity-0 scale-75"
      } transform sca transition-all ease-out duration-300 fixed top-4 right-4  bg-green-500 text-green-100 px-[12px] py-[8px] rounded-lg`}
    >
      {logOutMsg}
    </div>
  );
}
