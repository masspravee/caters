import style from "/styles/forms.module.css";
import React, { useState, useContext } from "react";
import SendData from "@/component/sendData";
import { LoaderProvider, ReplyProvider } from "@/pages/_app";
import { useRouter } from "next/router";
export default function Forms() {
  const [loader, setLoader] = useContext(LoaderProvider);
  const [reply, setReply] = useContext(ReplyProvider);
  const navi = useRouter();
  const [formData, setFormData] = useState({
    company_name: null,
    company_owner_name: null,
    company_manager_name: null,
    company_address: null,
    company_experience: null,
    company_workers_no: null,
  });
  const [file, setFile] = useState({ file: [] });
  const getForm = async (event) => {
    event.preventDefault();
    setLoader(true);
    const newForm = new FormData();
    newForm.append("data", JSON.stringify(formData));
    newForm.append("file", file);
    var response = await SendData(
      "form_data",
      newForm,
      "multipart/form-data",
      false
    );
    setReply(response.message);
    setLoader(false);
    if (response.authType == "form200") {
      navi.push("/client/info");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFile = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <div className="container">
      <div className={style.form_container}>
        <form className={style.form} onSubmit={getForm}>
          <h1>Enter Your Info</h1>
          <div className={style.input_group}>
            <label>Company Name</label>
            <input onChange={handleChange} name="company_name" required></input>
          </div>
          <div className={style.input_group}>
            <label>Owner Name</label>
            <input
              onChange={handleChange}
              name="company_owner_name"
              required
            ></input>
          </div>
          <div className={style.input_group}>
            <label>Co founder or manager</label>
            <input
              onChange={handleChange}
              name="company_manager_name"
              required
            ></input>
          </div>

          <div className={style.input_group}>
            <label>Address</label>
            <input
              onChange={handleChange}
              name="company_address"
              required
            ></input>
          </div>
          <div className={style.input_group}>
            <label>Experience In Years</label>
            <input
              onChange={handleChange}
              name="company_experience"
              required
            ></input>
          </div>
          <div className={style.input_group}>
            <label>No of Workers</label>
            <input
              onChange={handleChange}
              name="company_workers_no"
              required
            ></input>
          </div>
          <div className={style.input_group}>
            <label>Proof (aadhar or licence)</label>
            <input type="file" onChange={handleFile}></input>
          </div>
          <div className={style.input_group}>
            <input type="submit" value={"Submit"}></input>
          </div>
        </form>
      </div>
    </div>
  );
}
