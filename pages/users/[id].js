import React, { useState } from "react";
import style from "/styles/blog.module.css";
import SideBar from "@/component/sideBar";
import SendData from "@/component/sendData";
export default function Profile({ userData, userPosts, sideBarData }) {
  const [userDetails, setUserDetails] = useState(userData);
  console.log(userPosts);
  return (
    <div className="container">
      <div className={style.inner}>
        <div className={style.sideBar}>
          <SideBar data={sideBarData} />
        </div>
        <div className={style.blog}>
          <div className={style.profile}>
            <div className={style.account}>
              <div className={style.left}>
                <img src={userDetails.photoUrl}></img>
              </div>
              <div className={style.right}>
                <h2>@{userDetails.username}</h2>
                <h3>{userDetails.displayName}</h3>
                <span>{userDetails.bio}</span>{" "}
              </div>
            </div>
            <ul className={style.posts}>
              {userPosts.map((post, index) => {
                return (
                  <li className={style.item} key={index}>
                    <img src={post.photoUrl[0]}></img>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className={style.sideBar}></div>
      </div>
    </div>
  );
}

//

export async function getServerSideProps(context) {
  const { id } = context.query;
  const apiUrl =
    process.env.NODE_ENV === "production"
      ? `https://caters.vercel.app/api/get-profile?user=${id}`
      : `http://localhost:3000/api/get-profile?user=${id}`;
  const response = await fetch(apiUrl);
  const res = await response.json();
  return {
    props: {
      userData: res.fetchedData,
      sideBarData: res.allUserData,
      userPosts: res.posts,
    },
  };
}
