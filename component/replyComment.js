import style from "/styles/comments.module.css";
import moment from "moment";
import React, { useState, useRef } from "react";
import SendData from "./sendData";
import { defaultImage } from "./smallComponents";
import { TimeSetter } from "./smallComponents";
import { ReplyComment } from "./comments/replyComment";

export function SingleReply({
  commentData,
  userData,
  setReply,
  setCommentChild,
  post_id,
}) {
  const [showReplyBox, setShowReplyBox] = useState(false);

  return (
    <div className={style.reply_comment}>
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
            <p>
              {" "}
              <span className={style.user_mention}>
                {commentData.comment_reply}
              </span>
              {commentData.comment}
            </p>
          </div>

          <div className={style.comment_item_bottom}>
            <div className={style.button_container}>
              <span onClick={() => setShowReplyBox((prev) => !prev)}>
                Reply
              </span>
            </div>
          </div>
        </div>
      </div>
      {showReplyBox ? (
        <ReplyComment
          commentData={commentData}
          userData={userData}
          setReply={setReply}
          updateChildComments={setCommentChild}
          post_id={post_id}
          removeShowBox={setShowReplyBox}
        />
      ) : null}
    </div>
  );
}
