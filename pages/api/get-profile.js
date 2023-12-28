import { firestore } from "@/config";
import { getDocs, getDoc, collection, query, where } from "firebase/firestore";
export default async function (req, res) {
  let { user } = req.query;

  try {
    const usersData = collection(firestore, "users");
    const postData = collection(firestore, "post");

    const userFetchedData = await getDocs(usersData); // get docs from users collection

    //all usernames
    const allUserData = userFetchedData.docs.map((doc) => doc.data().username);

    const specifiedUser = await getDocs(
      query(usersData, where("username", "==", user))
    );
    //specified single user account details
    const fetchedSpecifiedUser = specifiedUser.docs[0].data();
    //specific user posts doc
    const specificPost = await getDocs(
      query(postData, where("username", "==", user))
    );
    // specific user posts data
    const userPosts = specificPost.docs.map((doc) => doc.data());

    res.json({
      message: "success",
      fetchedData: fetchedSpecifiedUser,
      posts: userPosts,
      allUserData: allUserData,
    });
  } catch (err) {
    res.json({ error: err.message });
  }
}

/*
  const allPosts = await getDocs(postData);
  const userDocPosts = allPosts.docs.filter(
    (doc) => doc.data().username == user
  );
  const userPosts = userDocPosts.map((doc) => doc.data());
  console.log(userPosts);
  */
