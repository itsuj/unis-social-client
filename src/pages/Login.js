
import React, { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from "../helpers/AuthContext";
import styled from "styled-components";



const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 20px;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: teal;
  text-align: center;
`;



function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext);
  const navigate = useNavigate();

  const login = () => {
    const data = { username: username, password: password };
    axios.post("http://localhost:3001/auth/login", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        localStorage.setItem("accessToken", response.data.token);
        setAuthState({ username: response.data.username, id: response.data.id, status: true });
        navigate("/");
      }
    });
  };
  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        
        <label>Username:</label>
        <Input
          type="text"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
         <label>Password:</label>
        <Input
          type="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <Button onClick={login}>Login</Button>

      
        <NavLink to="/registrations">Register</NavLink>
      
       
       
      
      </Wrapper>
    </Container>
  );
}

export default Login;