import { Button } from 'primereact/button'
import { Link } from 'react-router-dom'
import React, { useState, useContext } from 'react'
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { UserContext } from './context/UserContext'

const apiURL = 'http://localhost:5080'
//this port?

export const Login = () => {
  const [usernameInput, setUsernameInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const { setUser, loggedIn } = useContext(UserContext)


  const submitLogin = async () => {
    try {
      const response = await fetch(`${apiURL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usernameInput, passwordInput })
      })
      const data = await response.json()
      if (response.ok) {
        console.log(data)
        fetchUserData(usernameInput)
        loggedIn(true)
      } else {
        console.error('Login Failed', data)
        alert('Login Failed', data)
      }
    } catch (err) {
      console.error(err)
      alert(err)
    }
  }
  const fetchUserData = async (username) => {
    fetch(`${apiURL}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data)
        console.log(`Your user id is set to ${data.id}`);
      })
      .catch(err => {
        console.log(`Error storing user data`)
      })
      return
  }

  return (
    <div>
      <h1>Login In or Create an Account</h1>
      <InputText placeholder='Username' value={usernameInput} onChange={(e) => setUsernameInput(e.target.value)} />
      <Password placeholder='Password' value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} feedback={false} tabIndex={1} />
      <Button className="button" label="Login" onClick={submitLogin} />
      <Link to='/CreateAccount'><Button className="button" label="Create Account" /></Link>
    </div>
  )
}