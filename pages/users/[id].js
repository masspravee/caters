import React, { useState } from "react";
import style from "/styles/blog.module.css";
import SideBar from "@/component/sideBar";
import { defaultImage, VerifiedLogo } from "@/component/smallComponents";
import post from "../api/post";
export default function Profile({ userData, userPosts, sideBarData }) {
  const userDetails = userData;

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
                <img
                  src={
                    userDetails.photoUrl
                      ? userDetails.photoUrl
                      : defaultImage(userDetails.username)
                  }
                ></img>
              </div>
              <div className={style.right}>
                <div className={style.topContainer}>
                  <div className={style.namespace}>
                    <span className={style.displayName}>
                      {userDetails.username}
                    </span>
                    {userDetails.isVerified ? <VerifiedLogo /> : null}
                  </div>
                  <button>Follow</button>
                </div>
                <div className={style.infos}>
                  <span>{userPosts.length}posts</span>
                  <span>10 following</span>
                </div>
                <h3>{userDetails.displayName}</h3>
                <span>{userDetails.bio}</span>
                <div className={style.contact}>
                  <span>contact - {userDetails.email}</span>
                  <span>
                    {userDetails.phone
                      ? `contact - ${userDetails.phone}`
                      : null}
                  </span>
                </div>
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
