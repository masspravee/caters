import { storage, app } from "@/config";
import { uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";

export default async function uploadImage(file, path, fileName) {
  try {
    const storageRef = ref(storage, `${path}/${fileName}.jpg`);
    const uploadTask = await uploadBytesResumable(storageRef, file, {
      contentType: "image/jpeg",
    });
    var imageUrl = await getDownloadURL(storageRef);
    return imageUrl;
  } catch (e) {
    console.log(e);
  }
}
