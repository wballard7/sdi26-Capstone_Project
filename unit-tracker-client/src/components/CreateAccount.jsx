import React, { useState, useEffect, useContext } from 'react';
import { postFetch, getFetch } from '../utils/Fetches';
import { Select, Input, Button, Box, Heading, Link, Checkbox } from '@chakra-ui/react';
import Tree from 'react-d3-tree';
import { useNavigate } from 'react-router-dom';
// Import User context
import { UserContext } from '../context/UserContext';

export const CreateAccount = () => {
  const { admin, loggedIn } = useContext(UserContext); // Assume loggedIn is available in the context
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
    supervisor_id: null,
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
    admin ? navigate('/Home') : navigate('/');
  };

  const handleAddUnit = async () => {
    const addedUnit = await postFetch('units', newUnit);
    setUnits((prevUnits) => [...prevUnits, addedUnit]);
    navigate('/Home');
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
    const unitId = e.target.value;

    if (unitId) {
      setLoadingSups(true);
      await fetchUnitSupervisors(unitId);
      setLoadingSups(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newOrg) {
      await handleAddUnit();
    }
    await handleCreateAccount();
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

  const renderUnitSelect = () => (
    <Select
      name="my_unit_id"
      value={userDetails.my_unit_id}
      onChange={handleUnitChange}
      placeholder="Your Unit"
      mb="4"
      bg="black"
      color="white"
      _placeholder={{ color: 'white' }}
      sx={{
        '& > option': {
          bg: 'black',
          color: 'white',
        },
      }}
    >
      {units.map((unit) => (
        <option key={unit.id} value={unit.id}>
          {unit.unit_name}
        </option>
      ))}
    </Select>
  );

  const renderSupervisorSelect = () => (
    <Select
      name="supervisor_id"
      value={userDetails.supervisor_id}
      onChange={(e) => handleChange(e, setUserDetails)}
      placeholder="Unit Supervisors"
      mb="4"
      bg="black"
      color="white"
      _placeholder={{ color: 'white' }}
      sx={{
        '& > option': {
          bg: 'black',
          color: 'white',
        },
      }}
    >
      {listOfSups.map((supervisor) => (
        <option key={supervisor.id} value={supervisor.id}>
          {supervisor.first_name} {supervisor.last_name}
        </option>
      ))}
    </Select>
  );

  const renderReportsToSelect = () => (
    <Select
      name="reports_to"
      value={newUnit.reports_to}
      onChange={(e) => handleChange(e, setNewUnit)}
      placeholder="Reports To"
      mb="4"
      bg="black"
      color="white"
      _placeholder={{ color: 'white' }}
      sx={{
        '& > option': {
          bg: 'black',
          color: 'white',
        },
      }}
    >
      {units.map((unit) => (
        <option key={unit.id} value={unit.id}>
          {unit.unit_name}
        </option>
      ))}
    </Select>
  );

  // Custom node component for the tree
  const renderCustomNodeElement = ({ nodeDatum }) => (
    <g>
      <circle r={10} fill="#2d3748" />
      <text fill="#87CEFA" x={20} dy=".31em" strokeWidth="1" stroke="#87CEFA" paintOrder="stroke">
        {nodeDatum.name}
      </text>
    </g>
  );
  return (
    <Box>
      <Link href="/">
        <Button>Go Back</Button>
      </Link>
      <Heading as="h1" mb="4">
        Account Information
      </Heading>
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
      {admin && (
        <Checkbox
          type="checkbox"
          onChange={(e) =>
            setUserDetails((prev) => ({
              ...prev,
              supervisor: e.target.checked,
            }))
          }
          mb="4"
        >
          Is A Supervisor?
        </Checkbox>
      )}

      {loadingUnits ? <Heading as="h3">Loading Units...</Heading> : renderUnitSelect()}

      {loadingSups ? <Heading as="h3">Loading Supervisors...</Heading> : renderSupervisorSelect()}

      {admin && (
        <>
          {newOrg && (
            <>
              <Heading as="h2" size="md" mb="4">
                New Organization Information
              </Heading>
              {renderReportsToSelect()}
              <Heading as="h3" size="sm" mb="4">
                Units Tree
              </Heading>
              <Box
                mb="4"
                border="1px solid #ccc"
                borderRadius="md"
                p="4"
                height="400px"
                width="100%"
                overflowY="auto"
                bg="gray.800"
                boxShadow="lg"
              >
                <Tree
                  data={transformUnitsToTree(units)}
                  orientation="vertical"
                  pathFunc="step"
                  translate={{ x: 100, y: 50 }}
                  separation={{ siblings: 1.5, nonSiblings: 2.5 }}
                  renderCustomNodeElement={renderCustomNodeElement}
                  pathClassFunc={() => 'custom-path'}
                />
              </Box>

              <style jsx global>{`
                .custom-path {
                  stroke: #87cefa;
                  stroke-width: 2px;
                  fill: none;
                }

                .rd3t-label__title {
                  font-size: 16px;
                  font-weight: bold;
                  fill: #87cefa;
                }

                .rd3t-label__attributes {
                  font-size: 12px;
                  fill: #87cefa;
                }

                .rd3t-node {
                  cursor: pointer;
                  stroke: #3282b8;
                  stroke-width: 1.5px;
                }

                .rd3t-node circle {
                  fill: #2d3748;
                }

                .rd3t-node text {
                  font-family: 'Roboto', sans-serif;
                  fill: #87cefa;
                }
              `}</style>

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
              {renderReportsToSelect()}
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
        </>
      )}

      {!loggedIn ? (
        <Button colorScheme="blue" onClick={handleSubmit} m="4">
          Create Account
        </Button>
      ) : (
        <></>
      )}
    </Box>
  );
};
