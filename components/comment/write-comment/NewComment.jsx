"use client";
import { useRef, useState } from "react";
import classes from "./NewComment.module.css";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase";
import { usePathname } from "next/navigation";

export default function NewComment({ onNewComment }) {
  const comment = useRef();

  const [commentUpdated, setCommentUpdated] = useState(false);
  const pathname = usePathname();
  const getDate = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();
    today = dd + "/" + mm + "/" + yyyy;
    return today;
  };

  const commentPostHandler = async () => {
    const collectionRef = collection(db, "blog_comments");
    await addDoc(collectionRef, {
      blog_id: pathname.split("/")[2],
      user_id: pathname.split("/")[1],
      data: comment.current.value,
      date: getDate(),
    });
    comment.current.value = "";
    setCommentUpdated(!commentUpdated);
    onNewComment(commentUpdated);
  };

  return (
    <div className={classes.add_comment}>
      <input
        type="text"
        placeholder="Write your comment"
        className={classes.input}
        ref={comment}
      />
      <button onClick={commentPostHandler}>Post</button>
    </div>
  );
}
