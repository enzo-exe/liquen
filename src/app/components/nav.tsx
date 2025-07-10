// components/Navbar.jsx
import Link from "next/link";
import { deleteSessionToken } from "../libs/auth";

export default function Navbar() {
  return (
    <header className=" relative bg-white h-[10%] border- flex items-center">
      <div className="w-full h-[60%] flex items-center justify-between px-4 text-black">

        <img src="/LogoLiquen.svg" alt="logo" className="h-full object-contain mt-[4px]" />


        <nav className="w-[30%] flex justify-around p-0" >

          <ul className="flex items-center justify-center gap-5" >
            <li><Link href={"/Home"} className="hover:underline" >Home</Link ></li>
            <li><a href={"mailto:enzunqueira@gmail.com"} className="hover:underline" >Contato</a></li>
            <li><form action={deleteSessionToken}>
              <button type="submit" className=" hover:text-red-500 hover:underline">Logout</button>
            </form></li>
          </ul>

        </nav>

      </div>
    </header>
  );
}

