import style from "/styles/comments.module.css";
import moment from "moment";
import React, { useState, useRef } from "react";
import SendData from "./sendData";
import { defaultImage } from "./smallComponents";

import { TimeSetter } from "./smallComponents";

export function CommentList({ commentData, userData, setReply, post_name }) {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [isCommentShow, setIsCommentShow] = useState(false);
  const [commentChild, setCommentChild] = useState(
    commentData.hasReplies ? commentData.hasReplies : []
  );

  const commentHandler = () => {
    setIsCommentShow((prev) => !prev);
  };

  const showBox = () => {
    setShowReplyBox((prev) => !prev);
  };

  return (
    <div className={style.comment_item}>
      <div className={style.comment_item_top}>
        <div className={style.left}>
          <img src={defaultImage(commentData.comment_user)}></img>
        </div>
        <div className={style.right}>
          <div className={style.right_top}>
            <span>{commentData.comment_user}</span>
            <span className={style.comment_time}>
              {TimeSetter(commentData.time)}
            </span>
            <p>{commentData.comment}</p>
          </div>
          <div className={style.comment_item_bottom}>
            <div className={style.button_container}>
              <span onClick={showBox}>{!showReplyBox ? "Reply" : "Hide"} </span>
              {commentChild.length > 0 ? (
                <span onClick={commentHandler}>
                  {isCommentShow ? "hide replies" : "see all comments"}
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <div>
        {isCommentShow
          ? commentChild.map((ele, index) => {
              return (
                <SingleReply
                  commentData={ele}
                  key={index}
                  userData={userData}
                  setReply={setReply}
                  updateChildComments={setCommentChild}
                  course_id={course_id}
                  video_id={video_id}
                />
              );
            })
          : null}
      </div>
      {showReplyBox ? (
        <ReplyComment
          commentData={commentData}
          userData={userData}
          setReply={setReply}
          updateChildComments={setCommentChild}
          removeShowBox={setShowReplyBox} //hide after comment
          course_id={course_id}
          video_id={video_id}
        />
      ) : null}
    </div>
  );
}

export function ReplyComment({
  commentData,
  userData,
  removeShowBox,
  setReply,
  updateChildComments,
}) {
  const { video_id, course_id, comment_id, comment_user } = commentData;
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
      const modifiedTime = moment(time).format("DD-MM-YYYY hh:mm-A");

      const replyCommentData = {
        comment: commentText,
        comment_id: comment_id,
        comment_user: userData ? userData.username : "anonymous",
        time: modifiedTime,
        comment_reply: comment_user,
        course_id: course_id,
        video_id: video_id,
      };

      console.log(replyCommentData);

      const response = await SendData(
        "/video_action/reply_comment",
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
        <button onClick={() => removeShowBox(false)}>Cancel</button>
      </form>
    </>
  );
}
