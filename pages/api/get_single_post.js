import { firestore } from "@/config";
import { getDocs, getDoc, collection, query, where } from "firebase/firestore";
export default async function (req, res) {
  let { postName } = req.query;
  console.log(postName);

  try {
    const collectionData = collection(firestore, "post");
    const postData = await getDocs(
      query(collectionData, where("postName", "==", postName))
    );
    const postDataFetched = postData.docs[0].data();
    res.json({ message: "post", data: postDataFetched });
  } catch (err) {
    console.log(err);
    res.json({ message: "error", data: err });
  }
}
