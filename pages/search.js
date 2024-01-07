export default function Search({ data }) {
  console.log(data);
  return (
    <div className="container">
      <div className=""></div>
    </div>
  );
}

export async function getServerSideProps() {
  const apiUrl =
    process.env.NODE_ENV === "production"
      ? `https://caters.vercel.app/api/search`
      : "http://localhost:3000/api/search";
  const response = await fetch(apiUrl);
  const res = await response.json();
  return {
    props: {
      data: res,
    },
  };
}
