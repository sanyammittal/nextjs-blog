"use client";
import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import classes from "./page.module.css";
import CommentSection from "@/components/comment/CommentSection";

export default function BlogSlug({ params }) {
  const [blog, setBlog] = useState({
    title: "",
    category: "",
    content: "",
    summary: "",
    image: "",
  });
  const getData = async () => {
    const docRef = doc(db, "blog", params.slug);
    const docSnap = await getDoc(docRef);
    setBlog(docSnap.data());
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className={classes.container}>
        <h1>{blog.title}</h1>
        <div className={classes.image}>
          <img src={blog.image} alt="Image is loading" />
        </div>
        <p className={classes.category}>{`${blog.category} Blog`}</p>
        <p className={classes.content}>{blog.content}</p>
        <p className={classes.name}>{`-- ${blog.name} | ${blog.date}`}</p>
      </div>
      <CommentSection />
    </>
  );
}
