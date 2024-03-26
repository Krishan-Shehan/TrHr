"use client"

import { useRouter } from "next/navigation";

const Navbar = () => {

    async function handelLogOut() {
        router.push("/")
        // console.log("🚀 ~ Navbar ~ user:", user)
        // setUser(null);
        // Cookies.remove("token");
        // localStorage.clear();
    }

    const router = useRouter();
    return (
        <div className="bg-b2 flex flex-row top-[0] z-[2] sticky p-5 justify-between border border-b-o1"> 
            <span onClick={() => router.push("/main_page")} className="text-o1 font-bold cursor-pointer">{"HOME"}</span>
            <span className="text-o1 font-bold">{"-TRAJECT-"}</span>
            <span onClick={() => router.push("/")} className="text-o1 font-bold cursor-pointer">{"-X-"}</span>
        </div>
        // <div className="self-stretch flex flex-row items-start justify-start pt-0 px-0 pb-4 box-border top-[0] z-[99] sticky max-w-full bg-b1">
        //     <header className="flex-1 rounded-lg bg-white shadow-[0px_30px_60px_rgba(32,_56,_85,_0.15)] flex flex-row items-center justify-between pt-[17px] pb-[15px] pr-[58px] pl-11 box-border gap-[20px] max-w-full text-left text-xs text-royalblue font-poppins lg:pl-[22px] lg:pr-[29px] lg:box-border">
        //         <div className="h-[60px] w-[1406px] relative rounded-lg bg-white shadow-[0px_30px_60px_rgba(32,_56,_85,_0.15)] hidden max-w-full" />
        //         <b className="relative tracking-[0.5px] leading-[15px] z-[1] cursor-default" onClick={()=> router.push("/main_page")}>HOME</b>
        //         {/* <RiLogoutCircleLine onClick={handelLogOut} size={24}/> */}
        //         <span className="text-o1 font-bold">{"-X-"}</span>
        //     </header>
        // </div>
    );
};

export default Navbar;
