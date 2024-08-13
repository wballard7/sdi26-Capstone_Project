import React, { useState } from 'react';
import { postFetch } from './utils/Fetches';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';

export const CreateAccount = () => {
  const [newOrg, setNewOrg] = useState(false);
  const [userDetails, setUserDetails] = useState({
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    parent_unit_id: '',
  });
  const [orgDetails, setOrgDetails] = useState({
    name: '',
    levels: 1,
  });

  const handleCreateAccount = async () => {
    await postFetch(`https://users/`, userDetails);
  };

  const handleCreateOrg = async () => {
    await postFetch(`https://org/`, orgDetails);
  };

  const handleChange = (e, setter) => {
    const { name, value } = e.target;
    setter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleCreateAccount();
    if (newOrg) {
      await handleCreateOrg();
    }
  };

  const toggleNewOrg = () => {
    setNewOrg((prev) => !prev);
  };

  return (
    <>
      <h1>Account Information</h1>
      <InputText
        type="text"
        name="username"
        value={userDetails.username}
        onChange={(e) => handleChange(e, setUserDetails)}
        placeholder="Username"
      />
      <Password
        name="password"
        value={userDetails.password}
        onChange={(e) => handleChange(e, setUserDetails)}
        placeholder="Password"
      />
      <InputText
        type="text"
        name="first_name"
        value={userDetails.first_name}
        onChange={(e) => handleChange(e, setUserDetails)}
        placeholder="First Name"
      />
      <InputText
        type="text"
        name="last_name"
        value={userDetails.last_name}
        onChange={(e) => handleChange(e, setUserDetails)}
        placeholder="Last Name"
      />

      {newOrg && (
        <>
          <h2>New Organization Information</h2>
          <p>
            {`The number of levels you want your organization to have, e.g., parent org (your level) -> child org ->
            grandchild org = 3 levels`}
          </p>
        </>
      )}

      <Button
        label={newOrg ? 'Submit Admin Account Creation and Organization' : 'Create Account'}
        onClick={handleSubmit}
      />
      <Button label={newOrg ? 'Back to Account Creation' : 'Create New Organization'} onClick={toggleNewOrg} />
    </>
  );
};
