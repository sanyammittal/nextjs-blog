import classes from "./Categories.module.css";
import Topics from "./filter/Topics";
import Filters from "./filter/Filters";
import Blog from "./blog/Blog";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { useEffect, useState } from "react";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Categories() {
  const [updatedBlogs, setUpdatedBlogs] = useState([]);
  const [category, setCategory] = useState("All");

  const categoryHandler = (category) => {
    setCategory(category);
  };

  const getData = async (text) => {
    let allData = [];
    const collectionRef = collection(db, "blog");
    const data = await getDocs(collectionRef);
    if (category === "All") {
      allData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    } else {
      data.docs.map((doc) => {
        if (doc.data().category === category) {
          allData.push({ ...doc.data(), id: doc.id });
        }
      });
    }

    setUpdatedBlogs(
      allData.filter((blog) =>
        blog.title.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  useEffect(() => {
    getData("");
  }, [category]);

  const searchHandler = (text) => {
    getData(text);
  };

  return (
    <div className={classes.categories_container}>
      <Topics className={classes.topic} onCategoryClick={categoryHandler} />
      <div className={classes.categories}>
        <div className={classes.category_title}>
          <h1>{`${category} Blogs`}</h1>
          <button>
            <FontAwesomeIcon icon={faBars} className={classes.bars} />
          </button>
        </div>
        <Filters onSearch={searchHandler} />
        {updatedBlogs.length === 0 ? (
          <p className={classes.noBlog}>No blog is posted yet !!</p>
        ) : (
          updatedBlogs.map((blog) => <Blog key={blog.id} blog={blog} />)
        )}
      </div>
    </div>
  );
}
