import React, { useState, useEffect } from 'react';
import { postFetch, getFetch } from '../utils/Fetches';
import { Select, Input, Button, Box, Heading } from '@chakra-ui/react';
import Tree from 'react-d3-tree';
import { useNavigate } from 'react-router-dom';

export const CreateAccount = () => {
  const [newOrg, setNewOrg] = useState(false);
  const [listOfSups, setListOfSups] = useState([]);
  const [loadingUnits, setLoadingUnits] = useState(true);
  const [loadingSups, setLoadingSups] = useState(false);
  const [userDetails, setUserDetails] = useState({
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    my_unit_id: '',
    supervisor_id: '',
    availability: true,
    admin: false,
    supervisor: false,
  });
  const [units, setUnits] = useState([]);
  const [newUnit, setNewUnit] = useState({
    unit_name: '',
    reports_to: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const fetchedUnits = await getFetch('units');
        setUnits(fetchedUnits);
      } catch (error) {
        console.error('Error fetching units:', error);
      } finally {
        setLoadingUnits(false);
      }
    };

    fetchUnits();
  }, []);

  const handleCreateAccount = async () => {
    await postFetch('users', userDetails);
    navigate('/home');
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

  const handleUnitChange = async (e) => {
    handleChange(e, setUserDetails);
    let unit = e.target.value;
    console.log(`Line 60, handleUnitChange, CreateAccount.jsx. Getting ${unit} for target.value`);
    // Fetch supervisors only when a unit is selected
    if (unit) {
      setLoadingSups(true);
      await fetchUnitSupervisors(e.target.value);
      setLoadingSups(false);
    }
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

  const fetchUnitSupervisors = async (unitId) => {
    try {
      const supervisors = await getFetch(`users/unit_supervisors/${unitId}`);
      setListOfSups(supervisors);
    } catch (error) {
      console.error('Error fetching unit supervisors:', error);
    }
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

      {loadingUnits ? (
        <Heading as="h3">Loading Units...</Heading>
      ) : (
        <Select
                    bg="black"
            color="white"
          name="my_unit_id"
          value={userDetails.my_unit_id}
          onChange={handleUnitChange}
          placeholder="Your Unit"
          mb="4"
          s
        >
          {units.map((unit) => (
            <option key={unit.id} value={unit.id}>
              {unit.unit_name}
            </option>
          ))}
        </Select>
      )}

      {loadingSups ? (
        <Heading as="h3">Loading Supervisors...</Heading>
      ) : (
        <Select
                    bg="white"
            color="black"
          name="supervisor_id"
          value={userDetails.supervisor_id}
          onChange={(e) => handleChange(e, setUserDetails)}
          placeholder="Unit Supervisors"
          mb="4"
        >
          {listOfSups.map((supervisor) => (
            <option key={supervisor.id} value={supervisor.id}>
              {supervisor.first_name} {supervisor.last_name}
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
            bg="white"
            color="black"
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

      <Button colorScheme="blue" onClick={handleSubmit} m="4">
        {newOrg ? 'Submit Account Creation and Organization' : 'Create Account'}
      </Button>
      <Button colorScheme="gray" onClick={toggleNewOrg} m="4">
        {newOrg ? 'Back to Account Creation' : 'Create New Organization'}
      </Button>
    </Box>
  );
};
