export function CommentList({ commentData, userData, setNotify }) {
  console.log(commentData);
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [isCommentShow, setIsCommentShow] = useState(false);
  const [commentChild, setCommentChild] = useState(
    commentData.hasReplies ? commentData.hasReplies : []
  );

  const commentHandler = () => {
    setIsCommentShow((prev) => !prev);
  };

  const showBox = () => {
    setShowReplyBox(true);
  };

  const hideBox = () => {
    setShowReplyBox(false);
  };
  return (
    <div className={style.comment_item}>
      <div className={style.comment_item_top}>
        <div className={style.left}>
          <img src={defaultImage(commentData.comment_user)}></img>
        </div>
        <div className={style.right}>
          <span>{commentData.comment_user}</span>
          <p>{commentData.comment}</p>
        </div>
      </div>
      <div className={style.comment_item_bottom}>
        <div className={style.button_container}>
          {!showReplyBox ? <button onClick={showBox}>Reply</button> : null}
          {commentChild.length > 0 ? (
            <button onClick={commentHandler}>
              {isCommentShow ? "hide replies" : "see all comments"}
            </button>
          ) : null}
        </div>
        <div>
          {isCommentShow
            ? commentChild.map((ele, index) => {
                return <SingleReply commentData={ele} key={index} />;
              })
            : null}
        </div>
        <div>
          {showReplyBox ? (
            <ReplyComment
              commentData={commentData}
              userData={userData}
              setNotify={setNotify}
              updateChildComments={setCommentChild}
              removeShowBox={setShowReplyBox} //hide after comment
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function ReplyComment({
  commentData,
  userData,
  removeShowBox,
  setNotify,
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
        course_id: course_id,
        time: modifiedTime,
        video_id: video_id,
      };

      const response = await SendData(
        "/video_action/reply_comment",
        replyCommentData
      );
      if (response.authType == 200) {
        setNotify(response.message);
        updateChildComments((prev) => [...prev, replyCommentData]);
        removeShowBox(false);
      }
    } else {
      setNotify("please type a comment");
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

export function SingleReply({ commentData }) {
  console.log(commentData);
  return (
    <div className={style.reply_comment}>
      <div className={style.comment_item_top}>
        <div className={style.left}>
          <img src={defaultImage(commentData.comment_user)}></img>
        </div>
        <div className={style.right}>
          <span>{commentData.comment_user}</span>
          <p>{commentData.comment}</p>
        </div>
      </div>
      <div className={style.comment_item_bottom}>
        <div className={style.button_container}></div>

        <div></div>
      </div>
    </div>
  );
}
