import classes from "./Comment.module.css";

export default function Comment({ comment }) {
  return (
    <div className={classes.comment}>
      <p className={classes.comment_date}>{comment.date}</p>
      <p className={classes.comment_data}>{comment.data}</p>
    </div>
  );
}
