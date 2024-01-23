const Quene = require("bull");
export default function (req, res) {
  console.log(req.query);
  const quene = new Quene("test");
  const main = async () => {
    await quene.add(req.query);
  };
  quene.process((job, done) => {
    console.log(job.data);
    done();
  });
  main().catch((err) => {
    {
      console.error(err);
    }
  });
  res.json({ message: "Hello world!" });
}
