"use client";
import { cn, getInitials } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avtar";
import { Session } from "next-auth";

const Header = ({ session }: { session: Session }) => {
  const pathname = usePathname();

  console.log();

  return (
    <header className="my-10 flex justify-between gap-5">
      <Link href="/">
        <Image src="/icons/logo.svg" alt="logo" width={40} height={40} />
      </Link>

      <ul className="flex flex-row items-center gap-8">
        <li>
          <Link
            href="/library"
            className={cn(
              "text-base cursor-pointer capitalize",
              pathname === "/library" ? "text-light-200" : "text-light-100"
            )}
          >
            Library
          </Link>
        </li>

        <li>
          {session?.user && session?.user?.name ? (
            <Link href="/my-profile" className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback className=" bg-amber-100 font-bold">
                  {getInitials(session?.user?.name)}
                </AvatarFallback>
              </Avatar>

              <span className="text-white">
                {session?.user?.name
                  ?.split(" ")
                  .slice(0, 1)
                  .join("")
                  .toUpperCase()}
              </span>
            </Link>
          ) : null}
        </li>
      </ul>
    </header>
  );
};

export default Header;
