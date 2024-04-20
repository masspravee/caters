import { firestore } from "@/config";
import { doc, setDoc, arrayUnion, getDoc, updateDoc } from "firebase/firestore";
export default async function (req, res) {
  const commentData = JSON.parse(req.body);
  const docRef = doc(firestore, "comment", commentData.post_id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    await updateDoc(docRef, {
      comment: arrayUnion(commentData),
    });
  } else {
    await setDoc(docRef, {
      comment: [commentData],
    });
  }

  res.json({ message: "comment added", authType: 200 });
}
