import styles from "../styles/Home.module.css";
import axios from "axios";

import React, { useRef, useState, useEffect } from "react";
export default function Home({ result }) {
  const inputEl2 = useRef(null);
  const field = "entry.1270815861";
  const [loanding, setLoading] = useState(false);
  const [linkSet, SetLink] = useState(result);
  const handleOnClick = async () => {
    const value = inputEl2.current.value;
    const value1 = value.toString();
    const form = new FormData();
    form.append(field, value1);
    const URL = `https://docs.google.com/forms/u/0/d/e/1FAIpQLSf2NiQBfteWKQIqyVH5DpHz9OYqg37DytjdXW5Cek0o3wan_Q/formResponse`;
    setLoading(true);
    try {
      const { data } = await axios({
        method: "post",
        url: URL,
        data: form,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (data) {
        window.location.reload();
      }

      return;
    } catch (err) {
      window.location.reload();
    }
  };
  return (
    // <div className={styles.container}>
    <div className="App">
      <input
        style={{
          padding: "12px 24px",
          display: "block",
          marginLeft: " auto",
          marginRight: " auto",
          marginTop: "32px",

          width: "80%",
        }}
        ref={inputEl2}
      ></input>
      <br />
      <button
        style={{
          padding: "12px 24px",
          background: "yellow",
          padding: "12px 24px",
          background: "yellow",
          display: "block",
          margin: " auto",
          marginBottom: "20px",
        }}
        onClick={handleOnClick}
      >
        Nhấn vào đây
      </button>
      <div style={{ width: "fit-content", margin: "auto" }}>
        {linkSet.map((post, index) => (
          <a
            style={{ display: "block" }}
            key={index}
            href={post}
            target="blank"
          >
            {post}
          </a>
        ))}
      </div>
      <div
        style={loanding ? { visibility: "visible" } : { visibility: "hidden" }}
        className={styles.loader}
      ></div>
    </div>
    // </div>
  );
}

Home.getInitialProps = async (ctx) => {
  let result = [];
  try {
    const { data } = await axios({
      method: "get",
      url: `https://docs.google.com/spreadsheets/d/1YB3VqV0mLDUQ3tDcW5PQNoD50YmXkUsumCt-UU1lIDY/edit?resourcekey#gid=14178850`,
    });
    let arrayTemp = [];
    if (data) {
      let textChange = data.split(`<div class="softmerge-inner" style="width:`);
      textChange.map((item, index) => {
        if (index == 0) {
        } else {
          let aa = item.slice(17, item.length);

          let temp = aa.split(`</div>`);
          arrayTemp.push(temp[0]);
        }
      });
      const arratMain = [arrayTemp.pop()];
      result = arratMain;
    }

    return { result: result };
  } catch (err) {}

  return { result: result };
};
