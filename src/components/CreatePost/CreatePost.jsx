import React from "react";
import { Input } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import "./CreatePost.css";
import { useState, useEffect } from "react";
import M from "materialize-css";
import axios from "axios";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  let navigate = useNavigate();

  useEffect(() => {
    postbody();
  }, [url]);

  const postpic = async () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "social-media");
    data.append("cloud_name", "ayush5555");
    await fetch("	https://api.cloudinary.com/v1_1/ayush5555/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)

        setUrl(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const postbody = () => {
    fetch("http://localhost:5000/createpost", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        title: title,
        body: body,
        pic: url,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          M.toast({ html: data.error, classes: "#c62828 red darken-3" });
        } else {
          M.toast({ html: "Created Post" });
          navigate("/home");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const submit = () => {
    postpic();
  };

  return (
    <div>
      <div style={{ paddingTop: "9rem" }}>
        <div className="media_card">
          <h1 className="brand-logo" style={{ margin: "0 auto" }}>
            Chit-Chat
          </h1>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <Input
              type="text"
              placeholder="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Input
              type="text"
              placeholder="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
            <Input type="file" onChange={(e) => setImage(e.target.files[0])} />
            <Button
              variant="contained"
              color="secondary"
              style={{ width: "9rem", margin: "0px auto" }}
              onClick={() => submit()}
            >
              Submit post
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
