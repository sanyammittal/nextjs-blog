"use client";
import Image from "next/image";
import blogImage from "@/images/blogTitle.png";
import classes from "./page.module.css";
import Categories from "@/components/categories/Categories";
import { usePathname, useRouter } from "next/navigation";
export default function Home() {
  const navigate = useRouter();
  const pathname = usePathname();
  const createHandler = () => navigate.push(`${pathname}/create`);

  return (
    <main>
      <div className={classes.new_blog_container}>
        <Image
          src={blogImage}
          className={classes.image}
          alt="Image is loading"
          priority
        />
        <div>
          <p>A Blog Is Only As Interesting As The Interest Shows In Other !!</p>
          <button onClick={createHandler}>Create your blog TODAY</button>
        </div>
      </div>
      <Categories />
    </main>
  );
}
