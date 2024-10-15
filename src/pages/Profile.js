import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
import { Container, Post, Title, Body, Footer, Like, NavContainer, Image, NavLinks, NavLink } from '../components/Social';

function Profile() {
  let { id } = useParams();
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [listOfPosts, setListOfPosts] = useState([]);
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    axios.get(`http://localhost:3001/auth/basicinfo/${id}`).then((response) => {
      setUsername(response.data.username);
    });

    axios.get(`http://localhost:3001/posts/byuserId/${id}`).then((response) => {
      setListOfPosts(response.data);
    });
  }, []);

  return (
    <div className="profilePageContainer">
      <div className="basicInfo">
        <h1> Username: {username} </h1>
        {authState.username === username && (
          <button
            onClick={() => {
              navigate("/changepassword");
            }}
          >
            Change My Password
          </button>
        )}
      </div>
      <Container>
        {listOfPosts.map((value, key) => (
          <Post key={key}>
            <Title>{value.title}</Title>
            {value.file && <Image src={`http://localhost:3001/${value.file}`} alt="Post Image" />}
            <Body onClick={() => navigate(`/post/${value.id}`)}>{value.postText}</Body>
            <Footer>
              <div className="username">{value.username}</div>
              <div className="buttons">
              <Like />
            {value.Likes.length}
              </div>
            </Footer>
          </Post>
        ))}
      </Container>
    </div>
  );
}

export default Profile;
