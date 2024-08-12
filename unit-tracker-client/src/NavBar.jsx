import { Button } from 'primereact/button'
import { Link } from 'react-router-dom'
import React, { useContext } from 'react'
import { UserContext } from './context/UserContext'
export const NavBar = () => {
  const { admin, username } = useContext(UserContext)
  return (
    <>
      {admin === true ? (
        <>
        <Link to = '/Admin'><Button className = "button" label = "Admin" /></Link >
        <Link to = '/Home'><Button className = "button" label = "Home" /></Link >
        <Link to='/UserProfile'><Button className="button" label={`${username}'s Profile`} /></Link>
        </>

      ):(

          <>
    <Link to = '/Home'><Button className = "button" label = "Home" /></Link >
    <Link to='/UserProfile'><Button className="button" label={`${username}'s Profile`} /></Link>
    </>
    )}
    </>
  )

}