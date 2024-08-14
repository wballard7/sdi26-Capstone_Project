import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import React, { useState, useContext } from 'react';
import { getFetch } from './utils/Fetches';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { UserContext } from './context/UserContext';
import { PersonnelContext } from './context/PersonnelContext';
import { SupervisorContext } from './context/SupervisorContext';

const apiURL = 'http://localhost:8080';

export const Login = () => {
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const { setUser, setOrg, loggedIn } = useContext(UserContext);
  const { setPersonnel } = useContext(PersonnelContext);
  const { setSupervisor } = useContext(SupervisorContext);

  const submitLogin = async () => {
    try {
      const response = await fetch(`${apiURL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usernameInput, passwordInput }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data);
        fetchUserData(data.id);
        loggedIn(true);
        fetchPersonnel(data.id);
        fetchSupervisor(data.supervisor_id);
      } else {
        console.error('Login Failed', data);
        alert('Login Failed', data);
      }
    } catch (err) {
      console.error(err);
      alert(err);
    }
  };

  const fetchSupervisor = async (sup_Id) => {
    const SupervisorResponse = await getFetch(`users/${sup_Id}`);
    setSupervisor({
      id: personnelResponse.id,
      first_name: personnelResponse.first_name,
      last_name: personnelResponse.last_name,
      supervisor_id: personnelResponse.supervisor_id,
      parent_unit_id: personnelResponse.parent_unit_id,
      supervisor: personnelResponse.supervisor,
    });
  };

  const fetchPersonnel = async (userId) => {
    const personnelResponse = await getFetch(`users/${userId}`);
    setPersonnel({
      id: personnelResponse.id,
      first_name: personnelResponse.first_name,
      last_name: personnelResponse.last_name,
      supervisor_id: personnelResponse.supervisor_id,
      parent_unit_id: personnelResponse.parent_unit_id,
      supervisor: personnelResponse.supervisor,
    });
  };

  const fetchUserData = async (userId) => {
    try {
      // Fetch user details from the user endpoint
      const userResponse = await fetch(`${apiURL}/user/${userId}`);
      const userData = await userResponse.json();

      if (userResponse.ok) {
        setUser({
          id: userData.id,
          username: userData.username,
          first_name: userData.first_name,
          last_name: userData.last_name,
          supervisor_id: userData.supervisor_id,
          parent_unit_id: userData.parent_unit_id,
          available: userData.available,
          admin: userData.admin,
          supervisor: userData.supervisor,
        });

        // Fetch organization (unit) details using the parent_unit_id
        const orgResponse = await fetch(
          `${apiURL}/units/${userData.parent_unit_id}`,
        );
        const orgData = await orgResponse.json();

        if (orgResponse.ok) {
          setOrg({
            org_id: orgData.id,
            org_name: orgData.unit_name,
            unit_level: orgData.unit_level,
            higher_unit_id: orgData.higher_unit_id,
          });

          console.log(
            `User and organization data set for user ID: ${userData.id}`,
          );
        } else {
          console.error('Failed to fetch organization data', orgData);
          alert('Failed to fetch organization data', orgData);
        }
      } else {
        console.error('Failed to fetch user data', userData);
        alert('Failed to fetch user data', userData);
      }
    } catch (err) {
      console.error('Error fetching user data', err);
      alert('Error fetching user data', err);
    }
  };

  return (
    <div>
      <h1>Login or Create an Account</h1>
      <InputText
        placeholder="Username"
        value={usernameInput}
        onChange={(e) => setUsernameInput(e.target.value)}
      />
      <Password
        placeholder="Password"
        value={passwordInput}
        onChange={(e) => setPasswordInput(e.target.value)}
        feedback={false}
        tabIndex={1}
      />
      <Button className="button" label="Login" onClick={submitLogin} />
      <Link to="/CreateAccount">
        <Button className="button" label="Create Account" />
      </Link>
    </div>
  );
};
