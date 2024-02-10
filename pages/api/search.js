import { firestore } from "@/config";
import { getDocs, collection, where, query } from "firebase/firestore";
export default async function (req, res) {
  try {
    const allClients = collection(firestore, "users");
    const allClientsPersonalDoc = await getDocs(
      query(allClients, where("client", "==", true))
    );

    const allClientsPersonalData = allClientsPersonalDoc.docs.map((doc) =>
      doc.data()
    );
    console.log(allClientsPersonalData);
    res.json({ message: "success", documents: allClientsPersonalData });
  } catch (err) {
    res.json({ message: "success" });
  }
}
