import React, { useContext, useEffect, useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from "../helpers/AuthContext";
import { Container, Post, Title, Body, Footer, Like, NavContainer,Image, NavLinks, NavLink } from '../components/Social';

function Home() {
  const [listOfPosts, setListOfPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const { authState, setAuthState } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    } else {
      axios.get("http://localhost:3001/posts", {
        headers: { accessToken: localStorage.getItem("accessToken") }
      }).then((response) => {
        setListOfPosts(response.data.listOfPosts);
        setLikedPosts(response.data.likedPosts.map((like) => like.PostId));
      });
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, status: false });
  };

  const likePost = (PostId) => {
    axios.post("http://localhost:3001/like", { PostId: PostId }, {
      headers: { accessToken: localStorage.getItem("accessToken") }
    }).then((response) => {
      setListOfPosts(listOfPosts.map((post) => {
        if (post.id === PostId) {
          return { ...post, Likes: response.data.liked ? [...post.Likes, 0] : post.Likes.slice(0, -1) };
        } else {
          return post;
        }
      }));
      setLikedPosts(response.data.liked ? [...likedPosts, PostId] : likedPosts.filter((id) => id !== PostId));
    });
  };

  return (
    <Container>
      <NavContainer>
        <NavLinks>
          {!authState.status ? (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/registrations">Registration</NavLink>
            </>
          ) : (
            <>
              <NavLink to="/">Home Page</NavLink>
              <NavLink to="/createpost">Create A Post</NavLink>
            </>
          )}
        </NavLinks>
        <div className="loggedInContainer">
          <span>{authState.username}</span>
          {authState.status && <button onClick={logout}>Logout</button>}
        </div>
      </NavContainer>
      
      {/* Render the list of posts */}
      {listOfPosts.map((value, key) => (
        <Post key={key}>
          <Title>{value.title}</Title>
          {/* Check if the post has an image */}
          <div className='zip'  onClick={() => {
                navigate(`/post/${value.id}`);
              }}>
          {value.file && <Image src={`http://localhost:3001/${value.file}`} alt="Post Image" />}
          </div>
          <Body>{value.postText}</Body>
          <Footer>
            <Link to={`/profile/${value.UserId}`}>{value.username}</Link>
            <Like onClick={() => { likePost(value.id)}} className={likedPosts.includes(value.id) ? "unlikeBttn" : "likeBttn"} />
            {value.Likes.length}
          </Footer>
        </Post>
      ))}
    </Container>
  );
}

export default Home;
