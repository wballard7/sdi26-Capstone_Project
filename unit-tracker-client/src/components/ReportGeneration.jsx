import React, { useState, useEffect, useContext } from 'react';
import { getFetch } from '../utils/Fetches';
import { Input, Select, Box, Heading } from '@chakra-ui/react';
import { PersonnelContext } from '../context/PersonnelContext';
import { DynamicContext } from '../context/DynamicContext';

const ReportGeneration = () => {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [filter, setFilter] = useState({
    completed: '',
    name: '',
    personnel: '',
  });
  const { supervisor_id: me } = useContext(PersonnelContext);
  const { setDynamicList } = useContext(DynamicContext);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const data = await getFetch(`dynamic_entries/${me}`);
        setReports(data);
        setFilteredReports(data); // Initialize filtered reports with all reports
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };

    fetchReports();
  }, [me]);

  useEffect(() => {
    const applyFilters = () => {
      let filtered = reports;

      if (filter.completed !== '') {
        filtered = filtered.filter((report) => report.completed === (filter.completed === 'true'));
      }

      if (filter.name !== '') {
        filtered = filtered.filter((report) =>
          report.name.toLowerCase().includes(filter.name.toLowerCase()),
        );
      }

      if (filter.personnel !== '') {
        filtered = filtered.filter((report) =>
          `${report.event_owner_first_name} ${report.event_owner_last_name}`
            .toLowerCase()
            .includes(filter.personnel.toLowerCase()),
        );
      }

      setFilteredReports(filtered);
    };

    applyFilters();
  }, [filter, reports]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));
  };

  return (
    <Box padding="4" maxW="3xl" margin="auto">
      <Heading mb="4">Report Generation</Heading>
      <Input
        placeholder="Filter by Report Name"
        name="name"
        value={filter.name}
        onChange={handleFilterChange}
        mb="4"
      />
      <Input
        placeholder="Filter by Personnel Name"
        name="personnel"
        value={filter.personnel}
        onChange={handleFilterChange}
        mb="4"
      />
      <Select
        placeholder="Filter by Completion Status"
        name="completed"
        value={filter.completed}
        onChange={handleFilterChange}
        mb="6"
      >
        <option value="">All</option>
        <option value="true">Completed</option>
        <option value="false">Not Completed</option>
      </Select>

      <Box>
        <Heading size="md" mb="2">
          Filtered Reports
        </Heading>
        {filteredReports.length > 0 ? (
          filteredReports.map((report) => (
            <Box key={report.id} borderWidth="1px" borderRadius="lg" padding="4" mb="4">
              <p>
                <strong>{report.name}</strong>
              </p>
              <p>Start Date: {report.start_date}</p>
              <p>End Date: {report.end_date}</p>
              <p>Completed: {report.completed ? 'Yes' : 'No'}</p>
              <p>
                Personnel: {report.event_owner_first_name} {report.event_owner_last_name}
              </p>
              <p>Tag: {report.tag_name}</p>
            </Box>
          ))
        ) : (
          <p>No reports found matching your filters.</p>
        )}
      </Box>
    </Box>
  );
};

export { ReportGeneration };
