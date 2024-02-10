import SinglePost from "@/component/singlePost";
import style from "/styles/blog.module.css";
export default function Pages({ data }) {
  return (
    <div className="container">
      <div className={style.inner}>
        <div className={style.sideBar}></div>
        <div className={style.blog}>
          <div className={style.post_wrapper}>
            <SinglePost data={data} />;
          </div>
        </div>
        <div className={style.sideBar}></div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  const apiUrl =
    process.env.NODE_ENV === "production"
      ? `https://caters.vercel.app/api/get_single_post?postName=${id}`
      : `http://localhost:3000/api/get_single_post?postName=${id}`;
  const response = await fetch(apiUrl);
  const res = await response.json();

  return {
    props: { data: res.data },
  };
}
