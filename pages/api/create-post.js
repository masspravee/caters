import { IncomingForm } from "formidable";
import uploadImage from "@/component/uploadImage";
const fs = require("fs");
import { firestore } from "@/config";
import moment from "moment";
import { doc, setDoc, getDoc } from "firebase/firestore";

export const config = {
  api: {
    bodyParser: false,
  },
};

let catersProfId = null;

export default async function (req, res) {
  if (req.method === "POST") {
    catersProfId = req.cookies.catersProfId;
    post(req, res);
  }
}

const timer = () => {
  var timerId = new Date().getTime();
  return timerId;
};

const setDate = () => {
  var nowDate = new Date();
  var newDate = moment(nowDate).format("h:mm A D-MMM-yy");
  return newDate;
};

const post = async (req, res) => {
  const form = new IncomingForm();
  try {
    form.parse(req, async (err, fields, files) => {
      var urls = [];
      var postName = `${catersProfId}-${timer()}`;
      var filesKey = Object.keys(files);
      var caption = fields.caption[0];
      var username = fields.username[0];

      const promiseUrl = filesKey.map(async (file, index) => {
        var singleUrl = await saveFile(files[file][0]);

        return singleUrl;
      });

      var resolvedUrl = await Promise.all(promiseUrl);

      var data = {
        postName: postName,
        caption: caption,
        photoUrl: resolvedUrl,
        username: username,
        uid: catersProfId,
        time: setDate(),
      };

      await setDoc(doc(firestore, "post", postName), data);

      res.json({ message: "success" });
    });
  } catch (err) {
    console.log(err);
    res.json({ message: "error" });
  }
};

async function saveFile(file) {
  const data = fs.readFileSync(file.filepath);
  var newFileName = `${catersProfId}-${timer()}`;
  var imageUrl = await uploadImage(data, "/post", newFileName);
  return imageUrl;
}
