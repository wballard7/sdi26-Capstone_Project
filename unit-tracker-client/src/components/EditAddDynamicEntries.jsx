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

export const EditAddDynamicEntries = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [newDynamicEntry, setNewDynamicEntry] = useState([]);

  const [dynamicEntries, setDynamicEntries] = useState([]);
  const { supervisor, id: userId } = useContext(UserContext);
  const [staticEntries, setStaticEntries] = useState([]);
  const [users, setUsers] = useState([]);
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getFetch('users');
      setUsers(data);
    };
    const fetchTags = async () => {
      const data = await getFetch('tags');
      setTags(data);
    };
    fetchUsers();
    fetchTags();
  }, []);

  useEffect(() => {
    const fetchStatics = async () => {
      console.log();
      const data = await getFetch(`static-entries/owner/${userId}`);
      console.log(userId);
      setStaticEntries(data);
    };
    const fetchTitles = async () => {
      console.log();
      const data = await getFetch(`dynamic-entries/owner/${userId}`);
      console.log(userId);
      setDynamicEntries(data);
    };
    fetchStatics();
    fetchTitles();
  }, [userId]);

  useEffect(() => {
    if (supervisor) {
      setNewDynamicEntry((prev) => ({
        ...prev,
        event_owner_id: userId,
      }));
    }
  }, [supervisor, userId]);

  const handleAddEntry = async () => {
    try {
      const response = await postFetch('dynamic-entries', {
        ...newDynamicEntry,
        event_owner_id: userId,
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
      const response = await putFetch(`dynamic-entries/${newDynamicEntry.id}`, {
        ...newDynamicEntry,
        event_owner_id: userId,
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
    if (newDynamicEntry.id) {
      const deleteId = Number(newDynamicEntry.id);
      console.log('type of delete', typeof deleteId);
      console.log('deleteID', deleteId);
      try {
        const response = await deleteFetch(`dynamic-entries/${deleteId}`, {});
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
    const selectedEntry = dynamicEntries.find((entry) => entry.id === parseInt(selectedEntryId));
    setNewDynamicEntry((prev) => ({
      ...prev,
      id: selectedEntryId,
      title: selectedEntry ? selectedEntry.title : '',
    }));
  };

  const handleChange = (e, field) => {
    const { value } = e.target;
    setNewDynamicEntry((prev) => {
      if (field === 'tag_id' || field === 'static_id') {
        return { ...prev, [field]: parseInt(value) || 0 };
      }
      return { ...prev, [field]: value };
    });
  };

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
              {dynamicEntries == [] ? (
                <h1>'No entries exist for this user'</h1>
              ) : (
                <>
                  <div className="p-field">
                    <label htmlFor="titleSelect">Select an Existing Entry</label>
                    <Select
                      id="titleSelect"
                      value={newDynamicEntry.id || ''}
                      onChange={handleSelectChange}
                      placeholder=" "
                    >
                      {dynamicEntries && dynamicEntries.length > 0 ? (
                        dynamicEntries.map((dynamicEntry) => (
                          <option
                            key={dynamicEntry.id}
                            value={dynamicEntry.id}
                            className="dropdown-option"
                          >
                            {dynamicEntry.title}
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
                      value={newDynamicEntry.title}
                      onChange={(e) => handleChange(e, 'title')}
                      placeholder="Enter New Title"
                    />
                  </div>
                  <div className="p-field">
                    <label htmlFor="static_id">Parent Static Entry</label>
                    <Select
                      id="static_id"
                      value={newDynamicEntry.static_id}
                      onChange={(e) => handleChange(e, 'static_id')}
                      placeholder=" "
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
                    <label htmlFor="completed_by_id">Task Assignment</label>
                    <Select
                      id="completed_by_id"
                      value={newDynamicEntry.completed_by_id}
                      onChange={(e) => handleChange(e, 'completed_by_id')}
                      placeholder=" "
                    >
                      {users.map((user) => (
                        <option key={user.id} value={user.id} className="dropdown-option">
                          {user.username}
                        </option>
                      ))}
                    </Select>
                  </div>

                  <div className="p-field">
                    <label htmlFor="start_date">Start Date</label>
                    <Input
                      id="start_date"
                      value={newDynamicEntry.start_date}
                      onChange={(e) => handleChange(e, 'start_date')}
                      placeholder="Please type your start date as: YYYYMMDD"
                    />
                  </div>

                  <div className="p-field">
                    <label htmlFor="end_date">End Date</label>
                    <Input
                      id="end_date"
                      value={newDynamicEntry.end_date}
                      onChange={(e) => handleChange(e, 'end_date')}
                      placeholder="Please type your end date as: YYYYMMDD"
                    />
                  </div>

                  <div className="p-field">
                    <label htmlFor="recurrence">Recurrence</label>
                    <Input
                      id="recurrence"
                      value={newDynamicEntry.recurrence}
                      onChange={(e) => handleChange(e, 'recurrence')}
                      placeholder="Frequency of Event"
                    />
                  </div>

                  <div className="p-field">
                    <label htmlFor="event_owner_id">Entry Owner</label>
                    <Select
                      id="event_owner_id"
                      value={newDynamicEntry.input_owner_id}
                      onChange={(e) => handleChange(e, 'event_owner_id')}
                      placeholder=" "
                    >
                      {users.map((users) => (
                        <option key={users.id} value={users.id} className="dropdown-option">
                          {users.username}
                        </option>
                      ))}
                    </Select>
                  </div>
                  <div className="p-field">
                    <label htmlFor="tag_id">Tags</label>
                    <Select
                      id="tag_id"
                      value={newDynamicEntry.tag_id}
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
                  <div className="p-field">
                    <label htmlFor="notes">Notes</label>
                    <Textarea
                      id="notes"
                      value={newDynamicEntry.notes}
                      onChange={(e) => handleChange(e, 'notes')}
                      rows={5}
                      placeholder="Enter notes"
                    />
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
                value={newDynamicEntry.title}
                onChange={(e) => handleChange(e, 'title')}
                placeholder="Title (required)"
              />
            </div>
            <div className="p-field">
              <label htmlFor="static_id">Parent Static Entry</label>
              <Select
                id="static_id"
                value={newDynamicEntry.static_id}
                onChange={(e) => handleChange(e, 'static_id')}
                placeholder=" "
              >
                {staticEntries && staticEntries.length > 0 ? (
                  staticEntries.map((staticEntry) => (
                    <option key={staticEntry.id} value={staticEntry.id} className="dropdown-option">
                      {staticEntry.title}
                    </option>
                  ))
                ) : (
                  <option>No entries found</option>
                )}
              </Select>
            </div>
            <div className="p-field">
              <label htmlFor="completed_by_id">Task Assignment</label>
              <Select
                id="completed_by_id"
                value={newDynamicEntry.completed_by_id}
                onChange={(e) => handleChange(e, 'completed_by_id')}
                placeholder=" "
              >
                {users.map((user) => (
                  <option key={user.id} value={user.id} className="dropdown-option">
                    {user.username}
                  </option>
                ))}
              </Select>
            </div>
            <div className="p-field">
              <label htmlFor="start_date">Start Date</label>
              <Input
                id="start_date"
                value={newDynamicEntry.start_date}
                onChange={(e) => handleChange(e, 'start_date')}
                placeholder="Please type your start date as: YYYYMMDD"
              />
            </div>

            <div className="p-field">
              <label htmlFor="end_date">End Date</label>
              <Input
                id="end_date"
                value={newDynamicEntry.end_date}
                onChange={(e) => handleChange(e, 'end_date')}
                placeholder="Please type your end date as: YYYYMMDD"
              />
            </div>
            <div className="p-field">
              <label htmlFor="recurrence">Recurrence</label>
              <Input
                id="recurrence"
                value={newDynamicEntry.recurrence} /*fetch for existing users*/
                onChange={(e) => handleChange(e, 'recurrence')}
                placeholder="Frequency of Event"
              ></Input>
            </div>

            <div className="p-field">
              <label htmlFor="event_owner_id">Entry Owner</label>
              <Select
                id="event_owner_id"
                value={newDynamicEntry.event_owner_id}
                onChange={(e) => handleChange(e, 'event_owner_id')}
                placeholder=" "
              >
                {users.map((users) => (
                  <option key={users.id} value={users.id} className="dropdown-option">
                    {users.username}
                  </option>
                ))}
              </Select>
            </div>

            <div className="p-field">
              <label htmlFor="notes">Notes</label>
              <Textarea
                id="notes"
                value={newDynamicEntry.notes}
                onChange={(e) => handleChange(e, 'notes')}
                rows={5}
                placeholder="Enter notes"
              />
            </div>

            <div className="p-field">
              <label htmlFor="tag_id">Tags</label>
              <Select
                id="tag_id"
                value={newDynamicEntry.tag_id}
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
