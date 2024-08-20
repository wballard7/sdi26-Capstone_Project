import React, { useState, useEffect, useContext } from 'react';
import { getFetch } from '../utils/Fetches';
import { Input, Select, Box, Heading, Spinner, Text } from '@chakra-ui/react';
import { UserContext } from '../context/UserContext';
import { DynamicContext } from '../context/DynamicContext';
import { Pie, Line } from 'react-chartjs-2';
import 'chart.js/auto';

const ReportGeneration = () => {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [staticEntries, setStaticEntries] = useState([]);
  const [filter, setFilter] = useState({
    completed: '',
    name: '',
    personnel: '',
  });
  const [loading, setLoading] = useState(true);
  const { id } = useContext(UserContext);
  const { setDynamicList } = useContext(DynamicContext);

  useEffect(() => {
    if (!id) {
      console.warn('supervisor_id is undefined. Check if you have any personnel.');
      setLoading(false);
      return;
    }

    const fetchReports = async () => {
      try {
        setLoading(true);
        const dynamicData = await getFetch(`dynamic_entries/supervisor/${id}`);
        const staticData = await getFetch(`static_entries/supervisor/${id}`);
        setDynamicList(dynamicData);
        setReports(dynamicData);
        setStaticEntries(staticData);
        setFilteredReports(dynamicData);
      } catch (error) {
        console.error('Error fetching reports:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [id]);

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

  // Data processing for the pie chart
  const categoryCompletionData = () => {
    const categoryCounts = {};
    staticEntries.forEach((entry) => {
      categoryCounts[entry.category_name] = { completed: 0, total: 0 };
    });

    filteredReports.forEach((report) => {
      const staticEntry = staticEntries.find((entry) => entry.id === report.input_id);
      if (staticEntry) {
        const category = staticEntry.category_name;
        categoryCounts[category].total += 1;
        if (report.completed) categoryCounts[category].completed += 1;
      }
    });

    const categories = Object.keys(categoryCounts);
    const completedCounts = categories.map((category) => categoryCounts[category].completed);
    const totalCounts = categories.map((category) => categoryCounts[category].total);

    return {
      labels: categories,
      datasets: [
        {
          label: 'Completion Percentage',
          data: completedCounts.map((count, index) => (count / totalCounts[index]) * 100),
          backgroundColor: ['#4caf50', '#f44336', '#2196f3', '#ffeb3b', '#ff5722'],
        },
      ],
    };
  };

  // Data processing for the line chart
  const personnelProgressData = () => {
    const personnelProgress = {};
    filteredReports.forEach((report) => {
      const personnelName = `${report.event_owner_first_name} ${report.event_owner_last_name}`;
      if (!personnelProgress[personnelName]) {
        personnelProgress[personnelName] = { completed: 0, total: 0 };
      }
      personnelProgress[personnelName].total += 1;
      if (report.completed) personnelProgress[personnelName].completed += 1;
    });

    const personnelNames = Object.keys(personnelProgress);
    const completionRates = personnelNames.map(
      (name) => (personnelProgress[name].completed / personnelProgress[name].total) * 100,
    );

    return {
      labels: personnelNames,
      datasets: [
        {
          label: 'Completion Percentage by Personnel',
          data: completionRates,
          borderColor: '#4caf50',
          backgroundColor: '#4caf5070',
          fill: true,
        },
      ],
    };
  };

  if (loading) {
    return (
      <Box textAlign="center" mt="8">
        <Spinner size="xl" />
        <Text mt="4">Loading data...</Text>
      </Box>
    );
  }

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

      {/* Pie Chart */}
      <Box mt="8" mb="8">
        <Heading size="md" mb="4">
          Overall Completion Rate by Category
        </Heading>
        <Pie data={categoryCompletionData()} />
      </Box>

      {/* Line Chart */}
      <Box mt="8" mb="8">
        <Heading size="md" mb="4">
          Individual Task Completion Progress
        </Heading>
        <Line data={personnelProgressData()} />
      </Box>
    </Box>
  );
};

export { ReportGeneration };
