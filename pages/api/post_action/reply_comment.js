import { firestore } from "@/config";
import { getDoc, doc, updateDoc } from "firebase/firestore";

export default async function (req, res) {
  const { post_id, comment_id, comment, comment_user, time } = JSON.parse(
    req.body
  );

  const docRef = doc(firestore, "comments", post_id);
  const docData = (await getDoc(docRef)).data();

  const docComment = docData.comment.find(
    (file) => file.comment_id == comment_id
  );

  const otherComments = docData.comment.filter(
    (file) => file.comment_id != comment_id
  );

  const replyData = {
    comment: comment,
    comment_id: comment_id,
    comment_user: comment_user,
    time: time,
  };

  docComment.hasReplies.push(replyData);
  otherComments.push(docComment);
  await updateDoc(docRef, { comment: otherComments });

  res.json({ message: "comment added", authType: 200 });
}
