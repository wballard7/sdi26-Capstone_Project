import React, { useState, useEffect } from 'react';
import { postFetch, getFetch } from '../utils/Fetches';
import { Select, Input, Button, Box, Heading } from '@chakra-ui/react';
import Tree from 'react-d3-tree';

export const CreateAccount = () => {
  const [newOrg, setNewOrg] = useState(false);
  const [listOfSups, setListOfSups] = useState([]);
  const [loading, setLoading] = useState(true);
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
      setLoading(false);
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
    const rootUnits = units.filter((unit) => unit.reports_to === 0);
    const buildTree = (unit) => {
      const children = units.filter((child) => child.reports_to === unit.id);
      return {
        name: unit.unit_name,
        children: children.map(buildTree),
      };
    };
    return rootUnits.map(buildTree);
  };

  const fetchUnitSupervisors = async (id) => {
    const unitSupervisors = await getFetch(`users/supervisor/${id}`);
    setListOfSups(unitSupervisors);
  };

  return (
    <Box>
      <Heading as="h1">Account Information</Heading>
      <Input
        type="text"
        name="username"
        value={userDetails.username}
        onChange={(e) => handleChange(e, setUserDetails)}
        placeholder="Username"
        mb="4"
      />
      <Input
        name="password"
        value={userDetails.password}
        onChange={(e) => handleChange(e, setUserDetails)}
        placeholder="Password"
        type="password"
        mb="4"
      />
      <Input
        type="text"
        name="first_name"
        value={userDetails.first_name}
        onChange={(e) => handleChange(e, setUserDetails)}
        placeholder="First Name"
        mb="4"
      />
      <Input
        type="text"
        name="last_name"
        value={userDetails.last_name}
        onChange={(e) => handleChange(e, setUserDetails)}
        placeholder="Last Name"
        mb="4"
      />

      {loading ? (
        <Heading as="h3">Loading...</Heading>
      ) : (
        <Select
          name="my_unit_id"
          value={userDetails.my_unit_id}
          onChange={(e) => handleChange(e, setUserDetails)}
          placeholder="Your Unit"
          mb="4"
        >
          {units.map((unit) => (
            <option key={unit.id} value={unit.id}>
              {unit.unit_name}
            </option>
          ))}
        </Select>
      )}

      {newOrg && (
        <>
          <Heading as="h2" size="md" mb="4">
            New Organization Information
          </Heading>
          <Select
            name="reports_to"
            value={newUnit.reports_to}
            onChange={(e) => handleChange(e, setNewUnit)}
            placeholder="Reports To"
            mb="4"
          >
            {units.map((unit) => (
              <option key={unit.id} value={unit.id}>
                {unit.unit_name}
              </option>
            ))}
          </Select>

          <Heading as="h3" size="sm" mb="4">
            Units Tree
          </Heading>
          <Box mb="4" border="1px solid #ccc" borderRadius="md" p="4">
            <Tree data={transformUnitsToTree(units)} />
          </Box>

          <Heading as="h3" size="sm" mb="4">
            Add New Unit
          </Heading>
          <Input
            type="text"
            name="unit_name"
            value={newUnit.unit_name}
            onChange={(e) => handleChange(e, setNewUnit)}
            placeholder="Unit Name"
            mb="4"
          />

          <Select
            name="reports_to"
            value={newUnit.reports_to}
            onChange={(e) => handleChange(e, setNewUnit)}
            placeholder="Reports To"
            mb="4"
          >
            {units.map((unit) => (
              <option key={unit.id} value={unit.id}>
                {unit.unit_name}
              </option>
            ))}
          </Select>

          <Button colorScheme="teal" onClick={handleAddUnit} mb="4">
            Add Unit
          </Button>
        </>
      )}

      <Button colorScheme="blue" onClick={handleSubmit} mb="4">
        {newOrg ? 'Submit Account Creation and Organization' : 'Create Account'}
      </Button>
      <Button colorScheme="gray" onClick={toggleNewOrg}>
        {newOrg ? 'Back to Account Creation' : 'Create New Organization'}
      </Button>
    </Box>
  );
};
