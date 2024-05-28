"use client";
import Blog from "@/components/categories/blog/Blog";
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import classes from "./page.module.css";

export default function YourBlogs() {
  const pathname = usePathname();
  const [blogsList, setBlogList] = useState([]);

  const getData = async () => {
    let allData = [];
    const collectionRef = collection(db, "blog");
    const data = await getDocs(collectionRef);
    data.docs.map((doc) => {
      if (doc.data().user_id === pathname.split("/")[1]) {
        allData.push({ ...doc.data(), id: doc.id });
      }
    });
    setBlogList(allData);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <h1 className={classes.title}>Blogs posted by you</h1>
      {blogsList.length === 0 ? (
        <p className={classes.noBlog}>No blog posted yet !!</p>
      ) : (
        blogsList.map((blog) => <Blog id={blog.id} blog={blog} />)
      )}
    </>
  );
}
