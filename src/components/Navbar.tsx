import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import UserAccountnav from "./UserAccountnav";

const Navbar = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className=" bg-gray-100 py-2 z-10 border-b border-gray-300 w-full top-0 flex items-center justify-between px-10 relative">
      <Link href="/">
        <Image src="/logo.jpeg" width={50} height={50} alt={"bleh"} className="rounded-full"/>
      </Link>

      {session?.user ? (
        <UserAccountnav />
      ) : (
        <Link href="/auth" className="text-black">Sign in</Link>
      )}
    </div>
  );
};

export default Navbar;
