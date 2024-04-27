export default function (req, res) {
  console.log(req.cookies);
  res.json({ message: "access denied" });
}
