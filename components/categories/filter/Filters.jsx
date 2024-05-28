import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import classes from "./Filters.module.css";
export default function Filters({ onSearch }) {
  const searchHandler = (event) => {
    onSearch(event.target.value);
  };

  return (
    <div className={classes.search_div}>
      <div className={classes.search}>
        <input type="text" placeholder="Search Blog" onChange={searchHandler} />
        <FontAwesomeIcon icon={faMagnifyingGlass} className={classes.magIcon} />
      </div>
    </div>
  );
}
