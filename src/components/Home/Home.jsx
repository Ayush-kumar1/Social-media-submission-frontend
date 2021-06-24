import React, { useState, useEffect } from "react";
import "./Home.css";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownAltIcon from "@material-ui/icons/ThumbDownAlt";
import { IconButton, Input } from "@material-ui/core";
import { useMedia } from "../../MediaContext";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from "react-router-dom";
function Home() {
  const { state } = useMedia();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/allpost", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.posts);
        setData(data.posts);
      })
      .catch((err) => console.log(err));
  }, []);

  const postLikes = (id) => {
    fetch("http://localhost:5000/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);

        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });

        setData(newData);
      })
      .catch((err) => console.log(err));
  };

  const postUnlikes = (id) => {
    fetch("http://localhost:5000/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result)

        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });

        setData(newData);
      })
      .catch((err) => console.log(err));
  };

  const postComment = (text, id) => {
    fetch("http://localhost:5000/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        text,
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);

        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });

        setData(newData);
      })
      .catch((err) => console.log(err));
  };

  const deletePost = (postId) => {
    fetch(`http://localhost:5000/delete/${postId}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);

        const newData = data.filter((elem) => {
          return elem._id !== result._id;
        });

        setData(newData);
      })
      .catch((err) => console.log(err));
  };

  // console.log(data)
  return (
    <div className="body">
      <div className="media_content">
        {/* Card */}

        {data &&
          data.map((elem) => {
            return (
              <div className="media-card">
                <div>
                  <div
                    style={{
                      backgroundColor: "white",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <h5
                      style={{ paddingLeft: "0.5rem", paddingBottom: "1rem" }}
                    >
                      {" "}
                      <Link
                        to={
                          elem.postedBy._id !== state._id
                            ? "/profile/" + elem.postedBy._id
                            : "/profile"
                        }
                      >
                        {elem.postedBy.name}
                      </Link>{" "}
                    </h5>
                    <IconButton>
                    <DeleteIcon onClick={()=>deletePost(elem._id)}  />
                    </IconButton>

                  </div>
                  <img src={elem.photo} alt="" />
                  <h3 style={{ paddingLeft: "0.5rem" }}>{elem.title}</h3>

                  {elem.likes.includes(state._id) ? (
                    <IconButton>
                      <ThumbDownAltIcon onClick={() => postUnlikes(elem._id)} />
                    </IconButton>
                  ) : (
                    <IconButton>
                      <ThumbUpIcon onClick={() => postLikes(elem._id)} />
                    </IconButton>
                  )}

                  <h5 style={{ paddingLeft: "0.5rem" }}>
                    {elem.likes.length} likes
                  </h5>

                  <h5 style={{ paddingLeft: "0.5rem" }}>{elem.body}</h5>

                  {elem.comments.map((item) => {
                    return (
                      <h5>
                        {" "}
                        <span
                          style={{ fontWeight: "400", paddingLeft: "0.5rem" }}
                        >
                          {item.postedBy.name}-
                        </span>{" "}
                        {item.text}
                      </h5>
                    );
                  })}

                  <form
                    action=""
                    onSubmit={(e) => {
                      e.preventDefault();
                      postComment(e.target[0].value, elem._id);
                      e.target[0].value=""
                    }}
                  >
                    <Input
                      style={{ paddingLeft: "0.5rem" }}
                      placeholder="Add a comment"
                    />
                  </form>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Home;