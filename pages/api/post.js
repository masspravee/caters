import { firestore } from "@/config";
import { getDocs, collection } from "firebase/firestore";
export default async function (req, res) {
  try {
    const collectionData = collection(firestore, "post");
    const userData = collection(firestore, "users");

    const data = await getDocs(collectionData);
    const userFetchedData = await getDocs(userData);
    const allDocs = data.docs.map((doc) => {
      return doc.data();
    });
    //filtering clients who are true cients
    const allUserData = userFetchedData.docs
      .filter((doc) => {
        return doc.data().client;
      })
      .map((doc) => {
        return doc.data();
      });

    const allUsernames = allUserData.map((data) => {
      return data.username;
    });

    let newRefinedData = [];

    for (let i = 0; i < allDocs.length; i++) {
      for (let j = 0; j < allUserData.length; j++) {
        if (allDocs[i].uid === allUserData[j].uid) {
          var tempData = {
            ...allDocs[i],
            profileUrl: allUserData[j].photoUrl,
            isVerified: allUserData[j].isVerified,
          };
          newRefinedData.push(tempData);
        }
      }
    }

    res.json({ postData: newRefinedData, allUsernames: allUsernames });
  } catch (err) {
    res.json({ error: "error" });
  }
}
