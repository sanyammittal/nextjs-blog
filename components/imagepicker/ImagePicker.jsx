import Image from "next/image";
import classes from "./ImagePicker.module.css";
import { useRef, useState } from "react";

export default function ImagePicker({ label, onImageChange }) {
  const [imageUrl, setImageUrl] = useState();
  const imageInput = useRef();
  const handlePickClick = () => {
    imageInput.current.click();
  };
  const imageHandler = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(file);
    onImageChange(event);
  };

  return (
    <>
      <label>{label}</label>
      <div className={classes.imageContainer}>
        <div className={classes.preview}>
          {!imageUrl ? (
            <p>Select a image for preview</p>
          ) : (
            <Image
              className={classes.image}
              src={imageUrl}
              alt="The image selected by the user !!"
              fill
            />
          )}
        </div>
        <input
          type="file"
          accept="image/png"
          onChange={imageHandler}
          ref={imageInput}
          required
        />
        <button type="button" onClick={handlePickClick}>
          Choose Image
        </button>
      </div>
    </>
  );
}
