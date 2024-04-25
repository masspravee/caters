import { firestore } from "@/config";
import { getDoc, doc } from "firebase/firestore";

export default async function (req, res) {
  const { post_id } = JSON.parse(req.body);

  try {
    const docRef = doc(firestore, "comment", post_id);

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const docData = docSnap.data();
      console.log(docData);

      res.json({ comment: docData.comment, authType: 200 });
    } else {
      res.json({ comment: [], authType: 400 });
    }
  } catch (err) {
    console.log(err);
    res.json({ comment: [], authType: 404 });
  }
}
