import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faHeart,
  faComment,
  faPaperPlane,
  faBookmark,
  faCaretLeft,
  faCaretRight,
} from "@fortawesome/free-solid-svg-icons";
import { VerifiedLogo } from "./smallComponents";
import React, { useState, useContext, useEffect } from "react";
import { defaultImage } from "./smallComponents";
import style from "/styles/blog.module.css";
import { useRouter } from "next/router";
import CommentBox from "./commentBox";
import { UserCredProvider, ReplyProvider } from "@/pages/_app";
import { CommentList } from "./commentComponents";
import SendData from "./sendData";

export default function SinglePost({ data }) {
  const navi = useRouter();
  const postImage = data.photoUrl;
  const [currentImage, setCurrentImage] = useState(postImage[0]);
  const [count, setCount] = useState(0);
  const totalLength = postImage.length;
  const profile = data.profileUrl;
  const { postName } = data;
  const [reply, setReply] = useContext(ReplyProvider);
  const [arrowDecide, setArrowDecide] = useState(
    totalLength > 1 ? true : false
  );
  const [commentData, setCommentData] = useState([]);
  const [userData, setUserData] = useContext(UserCredProvider);
  const parsedUserData = JSON.parse(userData);
  const [showComment, setShowComment] = useState(false);
  const [commentFetching, setCommentFetching] = useState([]);
  const gotoPost = () => {
    navi.push(`/posts/${postName}`);
  };

  const nextImage = () => {
    if (totalLength != 0 && count >= 0 && count < totalLength - 1) {
      setCount(() => {
        setCurrentImage(postImage[count + 1]);
        return count + 1;
      });
    } else {
      setCount(() => {
        setCurrentImage(postImage[0]);
        return 0;
      });
    }
  };

  const prevImage = () => {
    if (totalLength != 0 && count > 0) {
      setCount(() => {
        setCurrentImage(postImage[count - 1]);
        return count - 1;
      });
    } else {
      setCount(() => {
        setCurrentImage(postImage[totalLength - 1]);
        return totalLength - 1;
      });
    }
  };

  const fetchComments = async function () {
    var data = {
      post_name: postName,
    };
    const response = await SendData("post_action/fetch_comments", data);

    if (response.authType === 200) {
      console.log(response);
      setCommentFetching(response.comment);
    }
  };

  return (
    <div className={style.post} onDoubleClick={gotoPost}>
      <div className={style.post_title}>
        <div className={style.post_left}>
          <div className={style.image}>
            <img src={profile ? profile : defaultImage(data.username)} />
          </div>
          <div className={style.details}>
            <a href={`/profile/${data.username}`} className={style.name}>
              {data.username}
            </a>
            {data.isVerified ? <VerifiedLogo /> : null}
          </div>
        </div>
        <div className={style.post_right}>
          <FontAwesomeIcon className={style.icon} icon={faEllipsisVertical} />
        </div>
      </div>
      <div className={style.post_content}>
        {arrowDecide ? (
          <>
            <FontAwesomeIcon
              icon={faCaretLeft}
              onClick={prevImage}
              className={style.caretLeft}
            />
            <span className={style.hoverText}>
              {count + 1}/{totalLength}{" "}
            </span>
            <img src={postImage.length > 0 ? currentImage : null} alt="post" />

            <FontAwesomeIcon
              icon={faCaretRight}
              onClick={nextImage}
              className={style.caretRight}
            />
          </>
        ) : (
          <>
            <img src={postImage.length > 0 ? currentImage : null} alt="post" />
          </>
        )}
      </div>
      <div className={style.post_footer}>
        <div className={style.like_share_comment}>
          <FontAwesomeIcon className={style.icon} icon={faHeart} />

          <FontAwesomeIcon className={style.icon} icon={faComment} />

          <FontAwesomeIcon className={style.icon} icon={faPaperPlane} />
        </div>
        <div className={style.save}>
          <FontAwesomeIcon className={style.icon} icon={faBookmark} />
        </div>
      </div>
      <div className={style.post_footer_content}>
        <span className={style.likes}>100 likes</span>
        <p>
          <a href={`/profile/${data.username}`} className={style.name}>
            {data.username}
          </a>
          <span className={style.caption}> {data.caption}</span>
        </p>

        <span className={style.comments} onClick={fetchComments}>
          view all comments
        </span>
        <span className={style.posting_time}>2 hours ago</span>
      </div>
      <div>
        <CommentBox
          commentData={commentData}
          post_id={postName}
          userData={parsedUserData}
          setReply={setReply}
        />
      </div>
      <div>
        {commentFetching.map((ele) => {
          return (
            <CommentList
              commentData={ele}
              userData={userData}
              post_name={postName}
              setReply={setReply}
            />
          );
        })}
      </div>
    </div>
  );
}
