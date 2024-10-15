import React from 'react'
import { Link } from "react-router-dom"
import styled from 'styled-components'
import {
  Container,
} from '../components/Social'; 

const Image = styled.img`
  height: 13pc; /* Adjust the percentage as needed */
  z-index: 2;
  border-radius: 50%; /* Make the image a circle */
`;

const BlackBackground = styled.div`
  background-color: black;
  height: 100vh; /* Full height of the viewport */
  width: 100vw; /* Full width of the viewport */
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Homepage() {
  return (
    <BlackBackground>
      <Container>
        <h3>
          {/* You can remove the image tags */}
          <Link to="/home"><Image src="https://th.bing.com/th/id/OIG2.Q6uCZQBoitKFtsFKCN6J?w=1024&h=1024&rs=1&pid=ImgDetMain"/></Link>
          <Link to="http://localhost:3000"><Image src="https://th.bing.com/th/id/OIG1.kYpGzxsx8rfdUuG81AOk?pid=ImgGn"/></Link>
        </h3>
      </Container>
    </BlackBackground>
  )
}

export default Homepage;
