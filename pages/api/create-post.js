import { IncomingForm } from "formidable";
import uploadImage from "@/component/uploadImage";
import moment from "moment";
import { inngestClient } from "@/worker/workLoad";

const fs = require("fs");

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

const post = async (req, res) => {
  const form = new IncomingForm();
  try {
    form.parse(req, async (err, fields, files) => {
      console.log(files);
      var urls = [];
      var postName = `${catersProfId}-${timer()}`;
      var filesKey = Object.keys(files);
      var caption = fields.caption[0];
      var username = fields.username[0];

      var info = {
        postName: postName,
        caption: caption,
        photoUrl: [],
        username: username,
        uid: catersProfId,
        time: setDate(),
      };

      inngestClient.send({
        name: "post-handler",
        id: "post-handler",

        data: { info, files },
      });
      res.json({ message: "post uploading...", authType: 200 });
    });
  } catch (err) {
    console.log(err);
    res.json({ message: "error" });
  }
};

const timer = () => {
  var timerId = new Date().getTime();
  return timerId;
};

const setDate = () => {
  var nowDate = new Date();
  var newDate = moment(nowDate).format("DD-MM-YYYY hh:mm a");
  return newDate;
};
