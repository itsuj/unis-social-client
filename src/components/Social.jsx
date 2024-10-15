import styled from 'styled-components';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';


import { Link } from 'react-router-dom';



export const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
background-color: #000;
`;

export const Post = styled.div`
  width: 90%; /* Adjusted width */
  max-width: 400px; /* Maximum width */
  min-height: 300px; /* Adjusted min-height */
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  margin-top: 50px;

  background-color: #000;
  font-family: Arial, Helvetica, sans-serif;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 0 10px 0 rgba(255, 255, 255, 0.5);
    cursor: pointer;
  }
`;

export const Posted = styled.div`
  width: 90%; /* Adjusted width */
  max-width: 400px; /* Maximum width */
  min-height: 300px; /* Adjusted min-height */
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  margin-top: 50px;

  background-color: #000;
  font-family: Arial, Helvetica, sans-serif;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 0 10px 0 rgba(255, 255, 255, 0.5);
    cursor: pointer;
  }
`;

export const Title = styled.div`
  flex: 20%;
  border-bottom: 1px solid #cecace;
  background-color: #333;
  display: grid;
  place-content: center;
  color: white;
`;

export const Body = styled.div`
  flex: 60%;


  place-content: center;
  background-color: white;
  padding: 20px; /* Adjusted padding */
`;

export const Footer = styled.div`
  flex: 20%;
  display: flex;
  align-items: center;
  justify-content: space-between; /* Adjusted alignment */
  padding: 0 15px; /* Adjusted padding */
  background-color: #333;
  color: white;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

export const Image = styled.img`
  width: 100%;
  height: auto; /* Ensures image maintains aspect ratio */
  object-fit: cover;
`;

export const PostText = styled.div`
  color: white;
`;

export const NavLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  margin-right: 20px;
  font-weight: bold;
  transition: color 0.3s ease;

  &:hover {
    color: #ffa500;
  }
`;

export const NavContainer = styled.nav`
  display: flex;
  background-color: #333;
  padding: 10px 0;
  width: 100%;
`;

export const NavLinks = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

export const Like = styled(ThumbUpAltIcon)`
  
`;

export const ButtonsLabel = styled.label`
  margin-right: 20px;
  margin-left: 10px;
`;

import React from 'react'

function Social() {
  return (
    <div>Social</div>
  )
}

export default Social

