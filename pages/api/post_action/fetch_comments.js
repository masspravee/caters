import { firestore } from "@/config";
import { getDoc, doc } from "firebase/firestore";

const commentData = {
  comment: [
    {
      comment: "hello world",
      comment_id: "c4e3dac8-a5e9-4ae0-8fb8-dae8b8cc388e",
      comment_time: "20-04-2024 07:01 pm",
      comment_user: "missy_makima",
      hasChildren: [],
      post_id: "a2FfBVXfGUexXIVN2dq5Q6jqxuC2-1703749095003",
    },

    {
      comment: "first",
      comment_id: "c4e3dac8-a5e9-4ae0-8fb8-dae8b8cc388e",
      comment_time: "20-04-2024 07:01 pm",
      comment_user: "missy_makima",
      hasChildren: [],
      post_id: "a2FfBVXfGUexXIVN2dq5Q6jqxuC2-1703749095003",
    },
  ],
};
export default async function (req, res) {
  const { post_name } = JSON.parse(req.body);

  //const docRef = doc(firestore, "comment", post_name);
  //const docData = (await getDoc(docRef)).data();
  //console.log(docData);

  res.json({ comment: commentData.comment, authType: 200 });
}
