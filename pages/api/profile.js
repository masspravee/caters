import { IncomingForm } from "formidable";
import uploadImage from "@/component/uploadImage";
import { firestore } from "@/config";
import { getDoc, doc, updateDoc } from "firebase/firestore";

const fs = require("fs");

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function (req, res) {
  if (req.method === "POST") {
    const { catersProfId } = req.cookies;
    post(req, res, catersProfId);
  }
}

const post = async (req, res, fileName) => {
  const form = new IncomingForm();
  form.parse(req, async (err, fields, files) => {
    console.log(files);
    await saveFile(files.file[0], fileName);
    res.json({ message: "success" });
  });
};

async function saveFile(file, fileName) {
  const data = fs.readFileSync(file.filepath);
  console.log(data);
  var imageUrl = await uploadImage(data, "/profile", fileName);
  UpdateDocument(imageUrl, fileName);
}

async function UpdateDocument(url, uid) {
  await updateDoc(doc(firestore, "users", uid), {
    photoUrl: url,
  });
}
