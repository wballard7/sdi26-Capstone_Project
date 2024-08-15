import React, { useState, useEffect } from 'react';
import { postFetch, getFetch } from '../utils/Fetches';
import { Select, Input, Button, Box } from '@chakra-ui/react';
import Tree from 'react-d3-tree';

export const CreateAccount = () => {
  const [newOrg, setNewOrg] = useState(false);
  const [userDetails, setUserDetails] = useState({
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    parent_unit_id: '',
  });
  const [units, setUnits] = useState([]);
  const [newUnit, setNewUnit] = useState({
    unit_level: '',
    unit_name: '',
    higher_unit_id: '',
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
    const rootUnits = units.filter((unit) => unit.higher_unit_id === 0);
    const buildTree = (unit) => {
      const children = units.filter((child) => child.higher_unit_id === unit.id);
      return {
        name: unit.unit_name,
        children: children.map(buildTree),
      };
    };
    return rootUnits.map(buildTree);
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
            value={userDetails.parent_unit_id}
            onChange={(e) => handleChange(e, setUserDetails)}
            options={units.map((unit) => ({ label: unit.unit_name, value: unit.id }))}
            placeholder="Select Higher Unit"
          />

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
          <Input
            type="number"
            name="unit_level"
            value={newUnit.unit_level}
            onChange={(e) => handleChange(e, setNewUnit)}
            placeholder="Unit Level"
          />

          <Select
            value={newUnit.higher_unit_id}
            onChange={(e) => handleChange(e, setNewUnit)}
            options={units.map((unit) => ({ label: unit.unit_name, value: unit.id }))}
            placeholder="Select Higher Unit"
          />
          <Button label="Add Unit" onClick={handleAddUnit} />
        </>
      )}

      <Button
        label={newOrg ? 'Submit Admin Account Creation and Organization' : 'Create Account'}
        onClick={handleSubmit}
      />
      <Button
        label={newOrg ? 'Back to Account Creation' : 'Create New Organization'}
        onClick={toggleNewOrg}
      />
    </Box>
  );
};
