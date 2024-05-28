"use client";
import Image from "next/image";
import classes from "./Header.module.css";
import icon from "@/images/icon.png";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  return (
    <header className={classes.header}>
      <Image
        src={icon}
        alt="Icon is loading"
        width={150}
        className={classes.image}
      />
      <ul>
        <li>
          <Link href={`/${pathname.split("/")[1]}`}>Home</Link>
        </li>
        <li>
          <Link href={`/${pathname.split("/")[1]}/create`}>Create</Link>
        </li>
        <li>
          <Link href={`/${pathname.split("/")[1]}/your-blogs`}>Your-Blogs</Link>
        </li>
      </ul>
    </header>
  );
}
