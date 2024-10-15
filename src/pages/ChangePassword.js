import React, { useState } from 'react'
import axios from 'axios'

function ChangePassword() {
    const [ oldPassword, setOldPassword ] = useState("")
    const [ newPassword, setNewPassword] = useState("")


     const changePassword = () => {
        axios.put("http://localhost:3001/auth/changepassword", {
            oldPassword: oldPassword,
            newPassword: newPassword,
        },
         {
            headers: { accessToken: localStorage.getItem("accessToken") },
          }
          ).then((response) => {
            if (response.data.error) {
                alert(response.data.error)
            }
          });
     }
  return (
    <div>
        <h1>Change Your Password</h1>
        <ul>
      <li> <input type='text' placeholder='Old Password...' onChange={(Event) => {
        setOldPassword(Event.target.value)
      }}></input></li> 
      <li> <input type='text' placeholder='New Password...' onChange={(Event) => {
        setNewPassword(Event.target.value)
      }}></input></li> 
     <li> <button onClick={changePassword}> Save Changes</button> </li> 
        </ul>
    </div>
  )
}

export default ChangePassword