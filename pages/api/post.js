import { firestore } from "@/config";
import { getDocs, collection } from "firebase/firestore";
export default async function (req, res) {
  const collectionData = collection(firestore, "post");
  const data = await getDocs(collectionData, req);
  const allDocs = data.docs.map((doc) => {
    return doc.data();
  });

  res.json({ message: allDocs });
}
