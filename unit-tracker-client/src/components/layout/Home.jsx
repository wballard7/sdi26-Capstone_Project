import { Button, Link, Box, Heading, VStack, Card } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { getFetch } from '../../utils/Fetches';
import '../../styles/Home.css';

const apiURL = 'http://localhost:8080';

export const Home = () => {
  const [staticEntries, setStaticEntries] = useState({
    title: '',
    unit_id: 0,
    category_id: 0,
    input_owner_id: '',
    tag_id: 0,
    notes: '',
  });
  const [dynamicEntries, setDynamicEntries] = useState([]);
  useEffect(() => {
    const fetchStaticEntries = async () => {
      try {
        const fetchedStaticEntries = await getFetch(`static_entries`);
        // console.log(fetchedStaticEntries);
        setStaticEntries(fetchedStaticEntries);
      } catch (err) {
        // console.log(err);
      }
    };
    fetchStaticEntries();
  }, []);
  useEffect(() => {
    const fetchDynamicEntries = async () => {
      const fetchedDynamicEntries = await getFetch('dynamic_entries');
      setDynamicEntries(fetchedDynamicEntries);
      console.log(fetchedDynamicEntries);
    };

    fetchDynamicEntries();
    console.log(dynamicEntries);
  }, []);

  //dragie boi
  const DraggableButton = ({ id, children, onDragStart }) => (
    <Button
      draggable
      onDragStart={(e) => onDragStart(e, id)}
      bg="blue.500"
      color="white"
      _hover={{ bg: 'blue.400' }}
      width="100%"
    >
      {children}
    </Button>
  );

  const DragDropContainer = () => {
    const [buttons, setButtons] = useState([
      { id: '1', content: 'Button 1' },
      { id: '2', content: 'Button 2' },
      { id: '3', content: 'Button 3' },
    ]);

    const onDragStart = (e, id) => {
      e.dataTransfer.setData('id', id);
    };

    const onDrop = (e, index) => {
      const id = e.dataTransfer.getData('id');
      const draggedButton = buttons.find((btn) => btn.id === id);
      const filteredButtons = buttons.filter((btn) => btn.id !== id);

      const updatedButtons = [
        ...filteredButtons.slice(0, index),
        draggedButton,
        ...filteredButtons.slice(index),
      ];

      setButtons(updatedButtons);
    };

    const onDragOver = (e) => {
      e.preventDefault();
    };

    return (
      <VStack spacing={1}>
        {dynamicEntries.map((entry, index) => (
          <Box key={entry.id} onDrop={(e) => onDrop(e, index)} onDragOver={onDragOver} width="100%">
            <DraggableButton id={entry.id} onDragStart={onDragStart}>
              {entry.name}
            </DraggableButton>
          </Box>
        ))}
      </VStack>
    );
  };
  //end draggie boi

  return (
    <Box maxW="md" mx="auto" mt="8" p="6" boxShadow="lg" borderRadius="lg">
      <Heading as="h1" size="lg" mb="6">
        Home
      </Heading>
      <div>
        {staticEntries.length > 0 ? (
          <div className="gridaLayout">
            <div className="staticGroup">
              {staticEntries.map((entry) => (
                <h1 className="staticEntry">{entry.title}</h1>
              ))}
            </div>
            <div className="draggieboiiiz"></div>
          </div>
        ) : (
          <p>No static entries found.</p>
        )}
      </div>

      <DragDropContainer />
      <Link href="/StaticEntries" style={{ textDecoration: 'none' }}>
        <Button width="full" colorScheme="teal" size="lg">
          Entries
        </Button>
      </Link>
      <Link href="/DynamicEntries" style={{ textDecoration: 'none' }}>
        <Button width="full" colorScheme="teal" size="lg">
          Task
        </Button>
      </Link>
    </Box>
  );
};
