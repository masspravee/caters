import React, { Component } from "react";
import { useRouter } from "next/router";
export default function Profile() {
  const { id } = useRouter().query;
  return (
    <div className="container">
      <h1>Hello World! {id}</h1>
    </div>
  );
}
