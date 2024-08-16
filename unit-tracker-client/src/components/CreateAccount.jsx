import React, { useState, useEffect } from 'react';
import { postFetch, getFetch } from '../utils/Fetches';
import { Select, Input, Button, Box } from '@chakra-ui/react';
import Tree from 'react-d3-tree';

export const CreateAccount = () => {
  const [newOrg, setNewOrg] = useState(false);
  const [listOfSups, setListOfSups] = useState([]);
  const [userDetails, setUserDetails] = useState({
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    my_unit_id: '',
    supervisor_id: '',
  });
  const [units, setUnits] = useState([]);
  const [newUnit, setNewUnit] = useState({
    unit_name: '',
    reports_to: '',
  });

  useEffect(() => {
    const fetchUnits = async () => {
      const fetchedUnits = await getFetch('units');
      setUnits(fetchedUnits);
    };

    fetchUnits();
  }, []);

  const handleCreateAccount = async () => {
    await postFetch(`users`, userDetails);
  };

  const handleAddUnit = async () => {
    const addedUnit = await postFetch('units', newUnit);
    setUnits((prevUnits) => [...prevUnits, addedUnit]);
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
      await handleAddUnit();
    }
  };

  const toggleNewOrg = () => {
    setNewOrg((prev) => !prev);
  };

  const transformUnitsToTree = (units) => {
    const rootUnits = units.filter((unit) => unit.reports_to_id === 0);
    const buildTree = (unit) => {
      const children = units.filter((child) => child.reports_to_id === unit.id);
      return {
        name: unit.unit_name,
        children: children.map(buildTree),
      };
    };
    return rootUnits.map(buildTree);
  };

  const fetchUnitSupervisors = async (id) => {
    const unitSupervisors = await getFetch(`users/supervisor/${id}`);
    setListOfSups({
      id: unitSupervisors.id,
      first_name: unitSupervisors.first_name,
      last_name: unitSupervisors.last_name,
    });
  };

  return (
    <Box>
      <h1>Account Information</h1>
      <Input
        type="text"
        name="username"
        value={userDetails.username}
        onChange={(e) => handleChange(e, setUserDetails)}
        placeholder="Username"
      />
      <Input
        name="password"
        value={userDetails.password}
        onChange={(e) => handleChange(e, setUserDetails)}
        placeholder="Password"
      />
      <Input
        type="text"
        name="first_name"
        value={userDetails.first_name}
        onChange={(e) => handleChange(e, setUserDetails)}
        placeholder="First Name"
      />
      <Input
        type="text"
        name="last_name"
        value={userDetails.last_name}
        onChange={(e) => handleChange(e, setUserDetails)}
        placeholder="Last Name"
      />

      {newOrg && (
        <>
          <h2>New Organization Information</h2>
          <Select
            value={userDetails.my_unit_id}
            onChange={(e) => handleChange(e, setUserDetails)}
            options={units.map((unit) => ({ label: unit.unit_name, value: unit.id }))}
            placeholder="Select Your Unit"
          />
          some function to fetchUnitSupervisors based on unit selected
          <h3>Units Tree</h3>
          <Tree data={transformUnitsToTree(units)} />
          <h3>Add New Unit</h3>
          <Input
            type="text"
            name="unit_name"
            value={newUnit.unit_name}
            onChange={(e) => handleChange(e, setNewUnit)}
            placeholder="Unit Name"
          />
          <Select
            value={newUnit.reports_to}
            onChange={(e) => handleChange(e, setNewUnit)}
            options={units.map((unit) => ({ label: unit.unit_name, value: unit.id }))}
            placeholder="Your Unit"
          />
          <Button label="Add Unit" onClick={handleAddUnit} />
        </>
      )}

      <Button
        label={newOrg ? 'Submit Account Creation and Organization' : 'Create Account'}
        onClick={handleSubmit}
      >
        {newOrg ? 'Submit Account Creation and Organization' : 'Create Account'}
      </Button>
      <Button
        label={newOrg ? 'Back to Account Creation' : 'Create New Organization'}
        onClick={toggleNewOrg}
      >
        {' '}
        {newOrg ? 'Back to Account Creation' : 'Create New Organization'}
      </Button>
    </Box>
  );
};
