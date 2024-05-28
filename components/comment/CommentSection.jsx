"use client";
import Comment from "./read-comments/Comment";
import classes from "./CommentSection.module.css";
import NewComment from "./write-comment/NewComment";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function CommentSection() {
  const [comments, setComments] = useState([]);
  const [updatedComments, setUpdatedComments] = useState();
  const pathname = usePathname();

  const getComments = async () => {
    let allData = [];
    // console.log(pathname.split("/")[2]);
    const collectionRef = collection(db, "blog_comments");
    const data = await getDocs(collectionRef);
    data.docs.map((doc) => {
      if (doc.data().blog_id === pathname.split("/")[2]) {
        allData.push({ ...doc.data(), id: doc.id });
      }
    });
    setComments(allData);
  };
  const commentUpdateHandler = (commentStatus) => {
    setUpdatedComments(commentStatus);
  };
  useEffect(() => {
    getComments();
  }, [updatedComments]);
  return (
    <>
      <div className={classes.container}>
        <h1>Comments</h1>
        <NewComment onNewComment={commentUpdateHandler} />
        {comments.length === 0 ? (
          <p className={classes.noComment}>No comments yet !!</p>
        ) : (
          comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))
        )}
        <div className={classes.extraSpace} />
      </div>
    </>
  );
}
