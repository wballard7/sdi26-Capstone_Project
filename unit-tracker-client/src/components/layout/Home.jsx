import { Button, Link, Box, Heading, VStack } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { getFetch } from '../../utils/Fetches';
import '../../styles/Home.css';

export const Home = () => {
  const [staticEntries, setStaticEntries] = useState([]);
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
    };

    fetchDynamicEntries();
  }, []);
  //NOTE:
  //will need to change updated buttons so it is a 1 for 1 swap
  //using a 3rd obj placeholder
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
    const onDragStart = (e, id) => {
      e.dataTransfer.setData('id', id);
    };

    const onDrop = (e, index) => {
      const id = e.dataTransfer.getData('id');
      const convertedid = Number(id);
      const draggedButton = dynamicEntries.find((btn) => btn.id === convertedid);

      const filteredButtons = dynamicEntries.filter((btn) => btn.id !== convertedid);

      const updatedButtons = [
        ...filteredButtons.slice(0, index),
        draggedButton,
        ...filteredButtons.slice(index),
      ];

      setDynamicEntries(updatedButtons);
    };

    const onDragOver = (e) => {
      e.preventDefault();
    };
    return (
      <VStack spacing={1}>
        {dynamicEntries.map((entry, index) => (
          <>
            <Box
              key={entry.id}
              onDrop={(e) => onDrop(e, index)}
              onDragOver={onDragOver}
              width="100%"
            >
              <DraggableButton id={entry.id} onDragStart={onDragStart}>
                {entry.name}
              </DraggableButton>
            </Box>
          </>
        ))}
      </VStack>
    );
  };

  return (
    <Box maxW="md" /*mx="auto"*/ mt="8" p="6" boxShadow="lg" borderRadius="lg">
      <div>
        {staticEntries.length > 0 ? (
          // <div className="gridSetup">
          <div className="gridBodyLayout">
            <button>1</button>
            <button>2</button>
            <button>3</button>
            <button>4</button>
            <div className="staticGroup">
              {staticEntries.map((entry) => (
                <h1 className="staticEntry">{entry.title}</h1>
              ))}
            </div>
            <div className="draggieboiiiz">
              <DragDropContainer />
            </div>
          </div>
        ) : (
          // </div>
          <p>No static entries found.</p>
        )}
      </div>
      <div classname="bottomButtons">
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
      </div>
    </Box>
  );
};
