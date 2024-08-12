import React, { useState } from 'react'
import { postFetch } from './utils/Fetches'
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { Toast } from 'primereact/toast';


export const CreateAccount = () => {
  const [newOrg, setNewOrg] = useState(false);
  const [userDetails, setUserDetails] = useState({
    username: '',
    first_name: '',
    last_name: '',
    parent_unit_id: '',
  })
  const [orgDetails, setOrgDetails] = useState({
    username: '',
    first_name: '',
    last_name: '',
    parent_unit_id: '',
  })

  const handleCreateAccount = async (userdetails) => {
    await postFetch(`https://users/ `, userdetails)
    return
  }

  const handleAcctChange =(e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    })
  }

  const handleCreateOrg = async (orgDetails) => {
    await postFetch(`https://org/ `, orgDetails)
    return
  }

  const handleOrgChange =(e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...orgDetails,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await handleCreateAccount(userDetails)
    await handleCreateOrg(orgDetails)
  }



  return (


    <>
      {newOrg === true ? (
        <>
        <h1>Account Information</h1>
        <InputText type="text" name="username" value={userDetails.username} onChange={handleAcctChange} placeholder="username" />
        <Password  name="password" value={userDetails.password} onChange={handleAcctChange} placeholder="password" />
        <InputText type="text" name="first_name" value={userDetails.first_name} onChange={handleAcctChange} placeholder="First Name" />
        <InputText type="text" name="last_name" value={userDetails.last_name} onChange={handleAcctChange} placeholder="last Name" />
        <h1>New Organization Information</h1>

        <Button type="submit" onClick={handleSubmit}/>
        </>
      ) : (
        <>
        <h1>Account Information</h1>
        <InputText type="text" name="username" value={orgDetails.username} onChange={handleAcctChange} placeholder="username" />
        <Password  name="password" value={orgDetails.password} onChange={handleAcctChange} placeholder="password" />
        <InputText type="text" name="first_name" value={orgDetails.first_name} onChange={handleAcctChange} placeholder="First Name" />
        <InputText type="text" name="last_name" value={orgDetails.last_name} onChange={handleAcctChange} placeholder="last Name" />
        <Button label="Create Account and Organization" onclick={() =>setNewOrg(true)}/>
        <Button type="submit" onClick={handleSubmit} label="submit"/>
        </>
      )}

    </>
  )
}

