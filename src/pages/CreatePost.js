import React, { useContext, useEffect, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from "../helpers/AuthContext";

import styled from 'styled-components'; // Import styled-components
import { NavContainer, NavLinks, NavLink } from "../components/Social";

const CreatePostContainer = styled.div`
  background-image: url("https://designerapp.officeapps.live.com/designerapp/Media.ashx/?id=e9d9cbd2-6e6d-4d03-b861-2b69c1340cce.zip&fileToken=07268cf4-65c0-4fdc-8d65-68b2c195a639&dcHint=KoreaCentral");
  color: black;
  padding: 20px;
  width: 100%;
  height: 100%;
  background-size: cover; /* Adjust background size */
  background-position: center; /* Adjust background position */
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FormContainer = styled.div`
  width: 50%;
`;

const InputField = styled(Field)`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: teal;
  color: white;
  border: none;
  cursor: pointer;
`;

const Label = styled.label`
  margin-bottom: 5px;
`;

function CreatePost() {
  const { authState, setAuthState} = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const inputRef = useRef(null); // Corrected useRef initialization

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, status: false });
  };
  let navigate = useNavigate();

  const initialValues = {
    title: "",
    postText: "",
    file: "",
  };

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    }
  }, []);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("You must input a Title!"),
    postText: Yup.string().required(),
    file: Yup.mixed()
  });

  const onSubmit = (values) => {
    const { title, postText, } = values; // Retrieve title and postText from Formik values
    const formData = new FormData();
    formData.append("title", title);
    formData.append("postText", postText);
    formData.append("file", file);
    axios
      .post("http://localhost:3001/posts", formData, {
        headers: { 
          accessToken: localStorage.getItem("accessToken"),
          // Ensure correct content type for file upload
        },
      })
      .then((response) => {
        navigate("/home");
      });
  };

  return (
    <>
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
      
      <CreatePostContainer>
        <FormContainer>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            <Form>
              <Label>Title: </Label>
              <ErrorMessage name="title" component="span" />
              <InputField 
                autoComplete="off" // Corrected attribute name
                id="inputCreatePost"
                name="title"
                placeholder="(Ex. Title...)"
              />
              <Label>Post: </Label>
              <ErrorMessage name="postText" component="span" />
              <InputField 
                autoComplete="off" // Corrected attribute name
                id="inputCreatePost"
                name="postText"
                placeholder="(Ex. Post...)"
              />
              <Label>Image: </Label>
              <input type="file" name="file" ref={inputRef} onChange={(e) => setFile(e.target.files[0])} />
              <ErrorMessage name="file" component="span" />
              
              <Button type="submit">Create Post</Button>
            </Form>
          </Formik>
        </FormContainer>
      </CreatePostContainer>
    </>
  );
}

export default CreatePost;
