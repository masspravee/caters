import { IncomingForm } from "formidable";
const fs = require("fs");
import sendMailToAdmin from "@/component/mailer";
import uploadImage from "@/component/uploadImage";
import { setDoc, doc } from "firebase/firestore";
import { firestore } from "@/config";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function (req, res) {
  const { catersProfId } = req.cookies;
  console.log("request");
  await post(req, res, catersProfId);
  res.json({ message: "post created successfully" });
}

const post = async (req, res, fileName) => {
  const form = new IncomingForm();
  form.parse(req, async (err, fields, files) => {
    const data = JSON.parse(fields.data[0]);
    const image = files.file[0];
    var imageUrl = await saveFile(image, fileName);
    data.imageUrl = imageUrl;
    await sendMailToAdmin(imageUrl);
    await setDoc(doc(firestore, "proof", fileName), data);
  });
};

async function saveFile(file, fileName) {
  var newFileName = `${fileName}_proof.jpg`;
  const data = fs.readFileSync(file.filepath);
  var imageUrl = await uploadImage(data, "/proof", newFileName);
  return imageUrl;
}
