import React, { useState, useEffect, useContext } from 'react';
import { postFetch, getFetch, deleteFetch, putFetch } from '../utils/Fetches';
// import { SupervisorContext } from '../context/SupervisorContext';
import { UserContext } from '../context/UserContext';
import {
  Input,
  Button,
  Select,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  Textarea,
  Box,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useToast,
} from '@chakra-ui/react';
import '../styles/EditAddStaticEntries.css';

// Chakra does not have ====> import { MultiSelect } from 'primereact/multiselect';

export const EditAddStaticEntries = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [newStaticEntry, setNewStaticEntry] = useState([]);
  const [newTag, setNewTag] = useState('');
  const { my_unit_id, supervisor, id: userId } = useContext(UserContext);
  const [staticEntries, setStaticEntries] = useState([]);
  const [owners, setOwners] = useState([]);
  const [units, setUnits] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    const fetchOwners = async () => {
      const data = await getFetch('users');
      setOwners(data);
    };
    const fetchCategories = async () => {
      const data = await getFetch('categories');
      setCategories(data);
    };
    const fetchTags = async () => {
      const data = await getFetch('tags');
      setTags(data);
    };
    fetchOwners();
    fetchCategories();
    fetchTags();
  }, []);

  useEffect(() => {
    const fetchTitles = async () => {
      console.log();
      const data = await getFetch(`static-entries/owner/${userId}`);
      console.log(userId);
      setStaticEntries(data);
    };
    fetchTitles();
  }, [userId]);

  useEffect(() => {
    const fetchUnits = async () => {
      var data = await getFetch(`units`);
      console.log('data in units', data);
      let reported = data.filter((entry) => entry.reports_to === my_unit_id);
      console.log('data for reports to fetch', units);
      console.log(reported);
      setUnits(reported);
    };
    fetchUnits();
  }, [my_unit_id]);

  useEffect(() => {
    if (supervisor) {
      setNewTag((prev) => ({
        ...prev,
      }));

      setNewStaticEntry((prev) => ({
        ...prev,
        input_owner_id: userId,
      }));
    }
  }, [supervisor, userId]);

  const handleAddEntry = async () => {
    try {
      const response = await postFetch('static-entries', {
        ...newStaticEntry,
        input_owner_id: userId,
      });
      console.log('Entry submitted successfully:', response);
      toast({
        title: 'Entry Added',
        description: 'The entry has been successfully added.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error adding entry:', error);
      toast({
        title: 'Error',
        description: 'There was an error adding the entry.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleEditEntry = async () => {
    try {
      const response = await putFetch(`static-entries/${newStaticEntry.id}`, {
        ...newStaticEntry,
        input_owner_id: userId,
      });
      console.log('Entry submitted successfully:', response);
      toast({
        title: 'Entry Updated',
        description: 'The entry has been successfully updated.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error editing entry:', error);
      toast({
        title: 'Error',
        description: 'There was an error updating the entry.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleDeleteEntry = async () => {
    if (newStaticEntry.id) {
      const deleteId = Number(newStaticEntry.id);
      console.log('type of delete', typeof deleteId);
      console.log('deleteID', deleteId);
      try {
        const response = await deleteFetch(`static-entries/${deleteId}`, {});
        console.log('Entry deleted successfully:', response);
        toast({
          title: 'Entry Deleted',
          description: 'The entry has been successfully deleted.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      } catch (error) {
        console.error('Error deleting entry:', error);
        toast({
          title: 'Error',
          description: 'There was an error deleting the entry.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  const handleCreateTag = async () => {
    try {
      const response = await postFetch('tags', { tag_name: newTag });
      console.log('Entry submitted successfully:', response);
      toast({
        title: 'Tag Created',
        description: 'The tag has been successfully created.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      setNewTag('');
      onClose();
    } catch (error) {
      console.error('Error adding tag:', error);

      toast({
        title: 'Error',
        description: 'There was an error creating the tag.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleSelectChange = (e) => {
    const selectedEntryId = e.target.value;
    const selectedEntry = staticEntries.find((entry) => entry.id === parseInt(selectedEntryId));
    setNewStaticEntry((prev) => ({
      ...prev,
      id: selectedEntryId,
      title: selectedEntry ? selectedEntry.title : '',
    }));
  };

  const handleChange = (e, field) => {
    const { value } = e.target;
    setNewStaticEntry((prev) => {
      if (field === 'tag_id' || field === 'my_unit_id' || field === 'category') {
        return { ...prev, [field]: parseInt(value) || 0 };
      }
      return { ...prev, [field]: value };
    });
  };

  const unitsWithUser = [{ id: my_unit_id, name: 'Your Unit' }, ...units];

  return (
    <Box p={4}>
      <Tabs index={activeIndex} onChange={(index) => setActiveIndex(index)}>
        <TabList>
          <Tab>Edit Entries</Tab>
          <Tab>Add New Entry</Tab>
          <Button onClick={onOpen} colorScheme="teal" ml={4}>
            Add Tag
          </Button>
        </TabList>
        <TabPanels>
          <TabPanel>
            <>
              {staticEntries == [] ? (
                <h1>'No entries exist for this user'</h1>
              ) : (
                <>
                  <div className="p-field">
                    <label htmlFor="titleSelect">Select an Entry</label>
                    <Select
                      id="titleSelect"
                      value={newStaticEntry.id || ''}
                      onChange={handleSelectChange}
                      placeholder="Existing Entries"
                    >
                      {staticEntries && staticEntries.length > 0 ? (
                        staticEntries.map((staticEntry) => (
                          <option
                            key={staticEntry.id}
                            value={staticEntry.id}
                            className="dropdown-option"
                          >
                            {staticEntry.title}
                          </option>
                        ))
                      ) : (
                        <option>No entries found</option>
                      )}
                    </Select>
                  </div>
                  <div className="p-field">
                    <label htmlFor="newTitle">New Title</label>
                    <Input
                      id="newTitle"
                      value={newStaticEntry.title}
                      onChange={(e) => handleChange(e, 'title')}
                      placeholder="Enter New Title"
                    />
                  </div>
                  <div className="p-field">
                    <label htmlFor="my_unit_id">Unit</label>
                    <Select
                      id="my_unit_id"
                      value={newStaticEntry.my_unit_id}
                      onChange={(e) => handleChange(e, 'my_unit_id')}
                      placeholder="Select a unit"
                    >
                      {units == []
                        ? my_unit_id
                        : units.map((unitsWithUser) => (
                            <option
                              key={unitsWithUser.id}
                              value={unitsWithUser.id}
                              className="dropdown-option"
                            >
                              {unitsWithUser.unit_name}
                            </option>
                          ))}
                    </Select>
                  </div>
                  <div className="p-field">
                    <label htmlFor="input_owner_id">Owner</label>
                    <Select
                      id="input_owner_id"
                      value={newStaticEntry.input_owner_id} /*fetch for existing users*/
                      onChange={(e) => handleChange(e, 'input_owner_id')}
                      placeholder="Owner"
                    >
                      {owners.map((owners) => (
                        <option key={owners.uuid} value={owners.uuid} className="dropdown-option">
                          {owners.username}
                        </option>
                      ))}
                    </Select>
                  </div>
                  <div className="p-field">
                    <label htmlFor="category_id">Category</label>
                    <Select
                      id="category_id"
                      value={newStaticEntry.category_id}
                      onChange={(e) => handleChange(e, 'category_id')}
                      placeholder="Select a category"
                    >
                      {categories.map((category) => (
                        <option key={category.id} value={category.id} className="dropdown-option">
                          {category.category_name}
                        </option>
                      ))}
                    </Select>
                  </div>
                  <div className="p-field">
                    <label htmlFor="misc_notes">Notes</label>
                    <Textarea
                      id="notes"
                      value={newStaticEntry.misc_notes}
                      onChange={(e) => handleChange(e, 'misc_notes')}
                      rows={5}
                      placeholder="Enter notes"
                    />
                  </div>
                  <div className="p-field">
                    <label htmlFor="tag_id">Tags</label>
                    <Select
                      id="tag_id"
                      value={newStaticEntry.tag_id}
                      onChange={(e) => handleChange(e, 'tag_id')}
                      placeholder="Select tags"
                    >
                      {tags.map((tag) => (
                        <option key={tag.id} value={tag.id} className="dropdown-option">
                          {tag.tag_name}
                        </option>
                      ))}
                    </Select>
                  </div>
                  <>
                    <Button onClick={handleEditEntry} mt={2}>
                      Update Entry
                    </Button>{' '}
                    <Button onClick={handleDeleteEntry} mt={2}>
                      Delete Entry
                    </Button>{' '}
                  </>
                </>
              )}
            </>
          </TabPanel>

          {/* EVERYTHING BELOW IS ADD ENTRY */}

          <TabPanel>
            <div className="p-field">
              <label htmlFor="title">Title</label>
              <Input
                id="title"
                value={newStaticEntry.title}
                onChange={(e) => handleChange(e, 'title')}
                placeholder="Title (required)"
              />
            </div>

            <div className="p-field">
              <label htmlFor="my_unit_id">Unit</label>
              <Select
                id="my_unit_id"
                value={newStaticEntry.my_unit_id}
                onChange={(e) => handleChange(e, 'my_unit_id')}
                placeholder="Select a unit"
              >
                {units == []
                  ? my_unit_id
                  : units.map((unitsWithUser) => (
                      <option
                        key={unitsWithUser.id}
                        value={unitsWithUser.id}
                        className="dropdown-option"
                      >
                        {unitsWithUser.unit_name}
                      </option>
                    ))}
              </Select>
            </div>

            <div className="p-field">
              <label htmlFor="input_owner_id">Owner</label>
              <Select
                id="input_owner_id"
                value={newStaticEntry.input_owner_id}
                onChange={(e) => handleChange(e, 'input_owner_id')}
                placeholder="Owner"
              >
                {owners.map((owner) => (
                  <option key={owner.uuid} value={owner.uuid} className="dropdown-option">
                    {owner.username}
                  </option>
                ))}
              </Select>
            </div>

            <div className="p-field">
              <label htmlFor="category_id">Category</label>
              <Select
                id="category_id"
                value={newStaticEntry.category_id}
                onChange={(e) => handleChange(e, 'category_id')}
                placeholder="Select a category"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id} className="dropdown-option">
                    {category.category_name}
                  </option>
                ))}
              </Select>
            </div>

            <div className="p-field">
              <label htmlFor="misc_notes">Notes</label>
              <Textarea
                id="notes"
                value={newStaticEntry.misc_notes}
                onChange={(e) => handleChange(e, 'misc_notes')}
                rows={5}
                placeholder="Enter notes"
              />
            </div>

            <div className="p-field">
              <label htmlFor="tag_id">Tags</label>
              <Select
                id="tag_id"
                value={newStaticEntry.tag_id}
                onChange={(e) => handleChange(e, 'tag_id')}
                placeholder="Select tags"
              >
                {tags.map((tag) => (
                  <option key={tag.id} value={tag.id} className="dropdown-option">
                    {tag.tag_name}
                  </option>
                ))}
              </Select>
            </div>

            <Button onClick={handleAddEntry} mt={2}>
              Add Entry
            </Button>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="gray.800" color="white">
          <ModalHeader>Create New Tag</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Enter new tag name"
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleCreateTag}>
              Create Tag
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
