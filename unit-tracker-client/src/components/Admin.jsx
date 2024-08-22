import React, { useContext, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Text,
  Heading,
  Link,
  Select,
  Input,
  Checkbox,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  useDisclosure,
  Spinner,
} from '@chakra-ui/react';
import { getFetch, putFetch } from '../utils/Fetches';
import { PersonnelContext } from '../context/PersonnelContext';
import Swal from 'sweetalert2';
import { UserContext } from '../context/UserContext';
import '../styles/admin.css';

export const Admin = () => {
  const { org, id } = useContext(UserContext);
  const { personnelList } = useContext(PersonnelContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [loading, setLoading] = useState(false); // Loading state
  const [personBeingUpdated, setPersonBeingUpdated] = useState({
    id: null,
    first_name: '',
    last_name: '',
    username: '',
    password: '',
    supervisor_id: '',
    supervisor: false,
    admin: false,
    availability: false,
  });

  const [listOfUsers, setListOfUsers] = useState([]);
  const [listOfSups, setListOfSups] = useState([]);

  useEffect(() => {
    const fetchUnitSupervisors = async () => {
      setLoading(true); // Start loading
      try {
        const supervisors = await getFetch(`users/unit_supervisors/${org.id}`);
        setListOfSups(supervisors);
      } catch (error) {
        console.error('Error fetching unit supervisors:', error);
      } finally {
        setLoading(false); // End loading
      }
    };

    const fetchUsers = async () => {
      setLoading(true); // Start loading
      try {
        const users = await getFetch(`users/unit/${org.id}`);
        const data = users.filter((people) => people.id !== id);
        setListOfUsers(data);
      } catch (error) {
        console.error('Error fetching unit users:', error);
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchUnitSupervisors();
    fetchUsers();
  }, [org.id]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPersonBeingUpdated((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSupervisorChange = (event) => {
    setPersonBeingUpdated((prev) => ({
      ...prev,
      supervisor_id: event.target.value,
    }));
  };

  const handleUserSelect = (user) => {
    setPersonBeingUpdated(user);
    onOpen(); // Open the modal when a user is selected
  };

  const updateUser = async () => {
    setLoading(true); // Start loading
    console.log(personBeingUpdated);
    try {
      const response = await putFetch(`users/${personBeingUpdated.id}`, personBeingUpdated);

      if (response) {
        Swal.fire({
          title: 'Success!',
          text: 'Update successful',
          icon: 'success',
          confirmButtonText: 'OK',
        });
        onClose(); // Close the modal after a successful update
      } else {
        const errorData = await response.json();
        Swal.fire({
          title: 'Error!',
          text: errorData.message,
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'An unexpected error occurred',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <Box className="admin-container">
      <Box display="flex" justifyContent="space-between" alignItems="center" p={4}>
        <Heading>Admin Portal</Heading>
        <Link href="/CreateAccount" style={{ textDecoration: 'none' }}>
          <Button>Create User/Unit</Button>
        </Link>
      </Box>
      <Box className="content">
        <Box className="sidebar">
          <Box className="unit-buttons">
            <Button className="edit-unit-button">Edit Unit</Button>
          </Box>
          <Box className="unit-info">
            <Text fontSize="lg" color="white">
              Unit Info
            </Text>
            <Text color="white">Where unit info is displayed</Text>
          </Box>
        </Box>

        <Box className="main-content">
          <Box className="user-management">
            <Box className="users-list">
              <Text fontSize="lg" color="white">
                Users List
              </Text>
              {/* Conditional rendering for loading */}
              {loading ? (
                <Spinner size="xl" color="white" />
              ) : (
                listOfUsers.map((user) => (
                  <Box key={user.id} mt={2} p={2} bg="gray.700" borderRadius="md">
                    <Text color="white">
                      {user.first_name} {user.last_name}
                    </Text>
                    <Button mt={2} colorScheme="blue" onClick={() => handleUserSelect(user)}>
                      Edit User
                    </Button>
                  </Box>
                ))
              )}
            </Box>

            {/* Modal for Editing User Info */}
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader color="black">Edit User Information</ModalHeader>
                <ModalCloseButton color="black" />
                <ModalBody>
                  <FormControl mb={4}>
                    <FormLabel color="black">First Name</FormLabel>
                    <Input
                      name="first_name"
                      value={personBeingUpdated.first_name}
                      onChange={handleInputChange}
                      placeholder="First Name"
                      color="black"
                    />
                  </FormControl>

                  <FormControl mb={4}>
                    <FormLabel color="black">Last Name</FormLabel>
                    <Input
                      name="last_name"
                      value={personBeingUpdated.last_name}
                      onChange={handleInputChange}
                      placeholder="Last Name"
                      color="black"
                    />
                  </FormControl>

                  <FormControl mb={4}>
                    <FormLabel color="black">Username</FormLabel>
                    <Input
                      name="username"
                      value={personBeingUpdated.username}
                      onChange={handleInputChange}
                      placeholder="Username"
                      color="black"
                    />
                  </FormControl>

                  <FormControl mb={4}>
                    <FormLabel color="black">Supervisor</FormLabel>
                    <Select
                      name="supervisor_id"
                      placeholder="Select supervisor"
                      value={personBeingUpdated.supervisor_id}
                      onChange={handleSupervisorChange}
                      color="black"
                    >
                      {listOfSups.map((sup) => (
                        <option key={sup.id} value={sup.id}>
                          {sup.first_name} {sup.last_name}
                        </option>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl display="flex" alignItems="center" mb={4}>
                    <Checkbox
                      name="supervisor"
                      isChecked={personBeingUpdated.supervisor}
                      onChange={handleInputChange}
                      color="black"
                    >
                      Supervisor
                    </Checkbox>
                  </FormControl>

                  <FormControl display="flex" alignItems="center" mb={4}>
                    <Checkbox
                      name="admin"
                      isChecked={personBeingUpdated.admin}
                      onChange={handleInputChange}
                      color="black"
                    >
                      Admin
                    </Checkbox>
                  </FormControl>

                  <FormControl display="flex" alignItems="center" mb={4}>
                    <Checkbox
                      name="availability"
                      isChecked={personBeingUpdated.availability}
                      onChange={handleInputChange}
                      color="black"
                    >
                      Availability
                    </Checkbox>
                  </FormControl>
                </ModalBody>

                <ModalFooter>
                  <Button
                    colorScheme="blue"
                    mr={3}
                    onClick={updateUser}
                    isLoading={loading} // Show loading spinner on the save button during an update
                  >
                    Save
                  </Button>
                  <Button variant="ghost" onClick={onClose}>
                    Cancel
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Admin;
