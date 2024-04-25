import React, { useState, useEffect } from "react";
import CommentBox from "./commentBox";
import SendData from "../sendData";
import { OneCommentList } from "./commentComponents";
import style from "/styles/comments.module.css";

export default function MainComment({ userData, setReply, post_id }) {
  const [commentData, setCommentData] = useState([]);
  const [getComments, setGetComments] = useState(false);
  const [message, setMessage] = useState(null);

  const fetchComments = async function () {
    var data = {
      post_id: post_id,
    };
    const response = await SendData("post_action/fetch_comments", data);

    if (response.authType === 200) {
      console.log(response);
      setCommentData(response.comment);
    } else if (response.authType === 400) {
      console.log(response);
      setMessage("be the first comment");
      setCommentData([]);
    }
  };

  const handleCommentFetch = () => {
    console.log("sdjjdij");
    setGetComments((prev) => !prev);
  };

  useEffect(() => {
    if (getComments) {
      fetchComments();
    }
  }, [getComments]);

  return (
    <div>
      <span onClick={handleCommentFetch}>
        {!getComments ? "View Comments" : "Hide Comments"}
      </span>
      <p>{message}</p>
      <CommentBox
        userData={userData}
        setReply={setReply}
        post_id={post_id}
        setCommentData={setCommentData}
      />
      <div className={style.comment_list}>
        {getComments
          ? commentData.map((ele, index) => {
              return (
                <OneCommentList
                  commentData={ele}
                  key={index}
                  userData={userData}
                  setReply={setReply}
                  post_id={post_id}
                />
              );
            })
          : null}
      </div>
    </div>
  );
}
