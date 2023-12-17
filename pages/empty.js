export default function Empty({ data }) {
  return (
    <div>
      <h1>{data}</h1>
    </div>
  );
}

export async function getStaticProps() {
  const apiUrl =
    process.env.NODE_ENV !== "production"
      ? `https://caters.vercel.app/api/empty`
      : "http://localhost:3000/api/empty";
  const response = await fetch(apiUrl);
  const res = await response.json();
  return {
    props: {
      data: res.message,
    },
  };
}
