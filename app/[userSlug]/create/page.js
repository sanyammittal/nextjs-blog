"use client";
import { useState } from "react";
import classes from "./page.module.css";
import { addDoc, collection } from "firebase/firestore";
import { db, imgDb } from "@/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import ImagePicker from "@/components/imagepicker/ImagePicker";
import { usePathname, useRouter } from "next/navigation";

export default function Create() {
  const [name, setName] = useState("");
  const [summary, setSummary] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Business");
  const [image, setImage] = useState("");
  const pathname = usePathname();
  const navigate = useRouter();

  const nameHandler = (event) => setName(event.target.value);
  const summaryHandler = (event) => setSummary(event.target.value);
  const titleHandler = (event) => setTitle(event.target.value);
  const contentHandler = (event) => setContent(event.target.value);
  const categoryHandler = (event) => setCategory(event.target.value);

  const imageHandler = (event) => {
    const imgs = ref(imgDb, `Imgs/${v4()}`);
    uploadBytes(imgs, event.target.files[0]).then((data) =>
      getDownloadURL(data.ref).then((url) => setImage(url))
    );
  };

  const getDate = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();
    today = dd + "/" + mm + "/" + yyyy;
    return today;
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const collectionRef = collection(db, "blog");
    await addDoc(collectionRef, {
      name,
      category,
      title,
      summary,
      content,
      image,
      date: getDate(),
      user_id: pathname.split("/")[1],
    });
    setName("");
    setSummary("");
    setTitle("");
    setContent("");
    setCategory("Business");
    setImage("");
    navigate.push(`/${pathname.split("/")[1]}`);
  };

  return (
    <div className={classes.container}>
      <h1>Create your blog</h1>
      <p>Share your thoughts and Research with others</p>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="name">
            YOUR NAME
            <input type="text" onChange={nameHandler} value={name} required />
          </label>
          <label htmlFor="category" className={classes.categoryLabel}>
            CHOOSE CATEGORY
            <select onChange={categoryHandler} required>
              <option>Business</option>
              <option>Personal</option>
              <option>Food</option>
              <option>Health</option>
              <option>Lifestyle</option>
              <option>Finance</option>
              <option>Technology</option>
              <option>Fashion</option>
              <option>Travel</option>
              <option>Sports</option>
            </select>
          </label>
        </div>
        <label htmlFor="title">TITLE</label>
        <input type="text" onChange={titleHandler} value={title} required />
        <label htmlFor="summary">SUMMARY</label>
        <input type="text" onChange={summaryHandler} value={summary} required />
        <label htmlFor="content">CONTENT</label>
        <textarea
          type="text"
          onChange={contentHandler}
          value={content}
          required
        />
        <ImagePicker label="SELECT IMAGE" onImageChange={imageHandler} />
        <button type="submit" className={classes.submitButton}>
          SUBMIT
        </button>
      </form>
    </div>
  );
}
