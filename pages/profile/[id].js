import React, { useState } from "react";
import style from "/styles/blog.module.css";
import blogStyle from "/styles/blog.module.css";
import SideBar from "@/component/sideBar";
import { defaultImage, VerifiedLogo } from "@/component/smallComponents";
export default function Profile({ userData, userPosts, sideBarData }) {
  const userDetails = userData;

  return (
    <div className="container">
      <div className={blogStyle.inner}>
        <div className={blogStyle.sideBar}>
          <SideBar data={sideBarData} />
        </div>
        <div className={blogStyle.blog}>
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
                  <h3>{userDetails.displayName}</h3>
                  <span className={style.userposts}>
                    {userPosts.length + " "}posts
                  </span>
                  <span className={style.follow}>10 following</span>
                </div>

                <div className={style.contact}>
                  <span>{userDetails.bio}</span>
                  <span>contact - {userDetails.email}</span>
                  <span>
                    {userDetails.phone
                      ? `contact - ${userDetails.phone}`
                      : null}
                    <span>
                      {userDetails.location
                        ? userDetails.location.toString()
                        : null}
                    </span>
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
