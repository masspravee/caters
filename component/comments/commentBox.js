import style from "/styles/comments.module.css";
import React, { useState, useRef } from "react";
import SendData from "../sendData";
import { v4 } from "uuid";
import { getPostTime } from "../smallComponents";

export default function CommentBox({
  setReply,
  userData,
  post_id,
  setCommentData,
}) {
  const [comment, setComment] = useState([]);
  const commentArea = useRef();
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [height, setHeight] = useState("auto");

  const sendComment = async (event) => {
    event.preventDefault();
    var data = {
      post_id: post_id,
      comment: comment,
      comment_id: v4(),
      comment_user: userData ? userData.username : "anonymous",
      comment_time: getPostTime(),
      hasReplies: [],
    };
    setCommentData((prev) => [...prev, data]);
    const response = await SendData("/post_action/add_comment", data);
    if (response.message) {
      commentArea.current.value = "";
      setReply("Comment Added");
    }
  };

  const handleToggler = () => {
    setShowCommentBox((prev) => !prev);
  };

  const commentFetching = (event) => {
    var commentValue = event.target.value;
    setHeight("auto"); // Reset height to auto to recalculate the height based on content
    setHeight(event.target.scrollHeight + "px");
    console.log(event.target.scrollHeight);
    setComment(commentValue);
  };

  return (
    <div className={style.comment}>
      <form className={style.commentBox} onSubmit={sendComment}>
        <span>Leave a Comment</span>
        <textarea
          onChange={commentFetching}
          required
          ref={commentArea}
          style={{ height }}
          placeholder="Add your comment"
        ></textarea>
        <button type="submit">Comment</button>
        <button>Cancel</button>
      </form>
      <span className={style.toggler} onClick={handleToggler}>
        Show Comments
      </span>
    </div>
  );
}
