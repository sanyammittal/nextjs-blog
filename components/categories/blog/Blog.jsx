"use client";
import classes from "./Blog.module.css";
import { usePathname, useRouter } from "next/navigation";

export default function Blog({ blog }) {
  const pathname = usePathname();
  const navigate = useRouter();
  const readBlogHandler = () => {
    navigate.push(`/${pathname.split("/")[1]}/${blog.id}`);
  };
  return (
    <div className={classes.blog_div}>
      <img src={blog.image} className={classes.image} alt="Image is loading" />
      <div>
        <h2>{blog.title}</h2>
        <p className={classes.content}>{blog.summary}</p>
        <p className={classes.category}>{blog.category}</p>
        <button onClick={readBlogHandler}>Read</button>
      </div>
    </div>
  );
}
