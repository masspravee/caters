export default function (req, res) {
  console.log(process.env.VERCEL_URL);
  res.json({ message: "Hello world!" });
}
