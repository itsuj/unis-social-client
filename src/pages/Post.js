import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
import { Container, Post, Title, Body, Footer, Image, NavLink } from '../components/Social';
import styled from "styled-components";

const RightSide = styled.div`
  width: 50%;
`;

const AddCommentContainer = styled.div`
  margin-top: 20px;
`;

const CommentItemContainer = styled.div`
  color: white; 
  background-color: #333333; 
  /* Change the font color to purple */
`;

const CommentItem = ({ comment, isEditable, onDelete }) => {
  return (
    <CommentItemContainer>
      <div>{comment.commentBody}</div>
      <div>Username: {comment.username}</div>
      {isEditable && <button onClick={() => onDelete(comment.id)}>X</button>}
    </CommentItemContainer>
  );
};


const PostPage = () => {
  const { id } = useParams();
  const { authState } = useContext(AuthContext);
  const [postObject, setPostObject] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
      setPostObject(response.data);
    });

    axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
      setComments(response.data);
    });
  }, []);

  const addComment = () => {
    if (newComment.trim() !== "") {
      axios
        .post(
          "http://localhost:3001/comments",
          {
            commentBody: newComment,
            PostId: id,
          },
          {
            headers: {
              accessToken: localStorage.getItem("accessToken"),
            },
          }
        )
        .then((response) => {
          if (response.data.error) {
            console.log(response.data.error);
          } else {
            const commentToAdd = {
              id: response.data.id,
              commentBody: newComment,
              username: response.data.username,
            };
            setComments((prevComments) => [...prevComments, commentToAdd]);
            setNewComment("");
          }
        })
        .catch((error) => console.error("Error adding comment:", error));
    } else {
      console.log("Comment cannot be empty");
    }
  };

  const deleteComment = (id) => {
    axios
      .delete(`http://localhost:3001/comments/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.id !== id)
        );
      })
      .catch((error) => console.error("Error deleting comment:", error));
  };

  const deletePost = (id) => {
    axios
      .delete(`http://localhost:3001/posts/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        navigate("/");
      })
      .catch((error) => console.error("Error deleting post:", error));
  };

  const editPost = async (option) => {
    if (option === "title") {
      let newTitle = await promptAsync("Enter New Title:");
      if (newTitle !== null) {
        await axios.put(
          "http://localhost:3001/posts/title",
          {
            newTitle: newTitle,
            id: id,
          },
          {
            headers: { accessToken: localStorage.getItem("accessToken") },
          }
        );
        setPostObject({ ...postObject, title: newTitle });
      }
    } else {
      let newPostText = await promptAsync("Enter New Text:");
      if (newPostText !== null) {
        await axios.put(
          "http://localhost:3001/posts/postText",
          {
            newText: newPostText,
            id: id,
          },
          {
            headers: { accessToken: localStorage.getItem("accessToken") },
          }
        );
        setPostObject({ ...postObject, postText: newPostText });
      }
    }
  };

  const promptAsync = (message) => {
    return new Promise((resolve) => {
      let userInput = prompt(message);
      resolve(userInput);
    });
  };

  return (
    <Container className="postPage">
      <Post className="leftSide">
        <Title
          className="title"
          isEditable={authState.username === postObject.username}
          onClick={() => authState.username === postObject.username && editPost("title")}
        >
          {postObject.title}
        </Title>
        {postObject.file && <Image src={`http://localhost:3001/${postObject.file}`} alt="Post Image" />}
        <Body
          className="body"
          isEditable={authState.username === postObject.username}
          onClick={() => authState.username === postObject.username && editPost("postText")}
        >
          {postObject.postText}
        </Body>
        <Footer>
          {postObject.username}{" "}
          {authState.username === postObject.username && <button onClick={() => deletePost(postObject.id)}>Delete Post</button>}
        </Footer>
      </Post>
      <RightSide className="rightSide">
        <AddCommentContainer className="addCommentContainer">
          <input
            type="text"
            placeholder="Comment..."
            autoComplete="off"
            value={newComment}
            onChange={(event) => {
              setNewComment(event.target.value);
            }}
          />
          <button onClick={addComment}>Add Comment</button>
        </AddCommentContainer>
        <div className="listOfComments">
          {comments.map((comment, key) => (
            <CommentItem 
              key={key}
              comment={comment}
              isEditable={authState.username === comment.username}
              onDelete={deleteComment}
            />
          ))}
        </div>
      </RightSide>
    </Container>
  );
};

export default PostPage;