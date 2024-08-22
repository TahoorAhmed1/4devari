import React from "react";
import classes from "./forum-card.module.css";

function ForumCard() {
  return (
    <div className={classes.card_body}>
      <p className={classes.title}>Buying Property</p>
      <p className={classes.description}>11k Topics | 2 New Topics</p>
    </div>
  );
}

export default ForumCard;
