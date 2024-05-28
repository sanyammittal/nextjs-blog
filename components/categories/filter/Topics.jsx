import { useState } from "react";
import classes from "./Topics.module.css";

export default function Topics({ onCategoryClick }) {
  const [category, setCategory] = useState("All");
  const categoryClickHandler = (event) => {
    setCategory(event.target.innerHTML);
    onCategoryClick(event.target.innerHTML);
  };

  return (
    <div className={classes.topic}>
      <p>TOPICS</p>
      <ul onClick={categoryClickHandler} className={classes.link}>
        <li>All</li>
        <li>Business</li>
        <li>Personal</li>
        <li>Food</li>
        <li>Health</li>
        <li>Lifestyle</li>
        <li>Finance</li>
        <li>Technology</li>
        <li>Fashion</li>
        <li>Travel</li>
        <li>Sports</li>
      </ul>
    </div>
  );
}
