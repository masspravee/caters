import style from "/styles/comments.module.css";
import moment from "moment";
import React, { useState, useRef } from "react";
import SendData from "../sendData";

export function ReplyComment({
  commentData,
  userData,
  removeShowBox,
  setReply,
  updateChildComments,
  post_id,
}) {
  const { comment_id, comment_user } = commentData;
  const commentArea = useRef();
  const [commentText, setCommentText] = useState(null);
  const [height, setHeight] = useState("auto");

  const commentFetching = (event) => {
    var commentValue = event.target.value;
    setHeight("auto"); // Reset height to auto to recalculate the height based on content
    setHeight(event.target.scrollHeight + "px");
    console.log(event.target.scrollHeight);
    setCommentText(commentValue);
  };

  const sendComment = async function (event) {
    event.preventDefault();

    if (commentText.trim()) {
      const time = new Date();
      const modifiedTime = moment(time).format("DD-MM-YYYY hh:mm a");

      const replyCommentData = {
        comment: commentText,
        comment_id: comment_id,
        comment_user: userData.username ? userData.username : "anonymous",
        time: modifiedTime,
        comment_reply: comment_user,
        post_id: post_id,
      };

      console.log(replyCommentData);

      const response = await SendData(
        "/post_action/reply_comment",
        replyCommentData
      );
      if (response.authType == 200) {
        setReply(response.message);
        updateChildComments((prev) => [...prev, replyCommentData]);
        removeShowBox(false);
      }
    } else {
      setReply("please type a comment");
    }
  };

  return (
    <>
      <form className={style.commentBox} onSubmit={sendComment}>
        <span>Replying to {comment_user}</span>
        <textarea
          onChange={commentFetching}
          required
          ref={commentArea}
          style={{ height }}
          placeholder="Add your comment"
        ></textarea>
        <button type="submit">Comment</button>
        <button type="button" onClick={() => removeShowBox(false)}>
          Cancel
        </button>
      </form>
    </>
  );
}
