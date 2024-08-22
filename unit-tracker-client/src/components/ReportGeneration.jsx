import React, { useState, useEffect, useContext } from 'react';
import { getFetch } from '../utils/Fetches';
import { Input, Select, Box, Heading, Spinner, Text } from '@chakra-ui/react';
import { UserContext } from '../context/UserContext';
import { PersonnelContext } from '../context/PersonnelContext';
import { Pie, Line } from 'react-chartjs-2';
import 'chart.js/auto';

// exports.up = function (knex) {
//   return knex.schema.createTable('dynamic_entries', (table) => {
//     table.increments().primary();
//     table.string('title').notNullable();
//     table.integer('static_id');
//     table.integer('audience_id');
//     table.date('start_date').notNullable();
//     table.date('end_date').notNullable();
//     table.date('complete_date');
//     table.string('recurrence').notNullable();
//     table.uuid('completed_by_id');
//     table.uuid('event_owner_id');
//     table.integer('tag_id');
//     table.string('notes');

//     table.foreign('static_id').references('id').inTable('static_entries').onDelete('SET NULL');
//     table.foreign('audience_id').references('id').inTable('join_audience').onDelete('SET NULL');
//     table.foreign('event_owner_id').references('id').inTable('users').onDelete('SET NULL');
//     table.foreign('completed_by_id').references('id').inTable('users').onDelete('SET NULL');
//     table.foreign('tag_id').references('id').inTable('tags').onDelete('SET NULL');
//   });
// };

const ReportGeneration = () => {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [staticEntries, setStaticEntries] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [filter, setFilter] = useState({
    completed: '',
    title: '',
    personnel: '',
  });
  const [loading, setLoading] = useState(true);
  const { id } = useContext(UserContext);
  const { personnelList } = useContext(PersonnelContext);

  useEffect(() => {
    if (!id) {
      console.warn('User ID is undefined. Ensure the user is properly logged in.');
      setLoading(false);
      return;
    }

    const fetchReports = async () => {
      try {
        setLoading(true);

        // Fetch categories and tags from the backend
        const categoryData = await getFetch('categories');
        const tagData = await getFetch('tags');

        setCategories(categoryData);
        setTags(tagData);

        const staticData = await getFetch(`static-entries/supervisor/${id}`);
        setStaticEntries(staticData);
        const dynamicData = await getFetch(`dynamic-entries/supervisor/${id}`);

        // Determine completion status based on the presence of complete_date
        const updatedDynamicData = dynamicData.map((report) => ({
          ...report,
          completed: Boolean(report.complete_date),
        }));

        setReports(updatedDynamicData);
        setFilteredReports(updatedDynamicData);
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

      if (filter.title !== '') {
        filtered = filtered.filter((report) =>
          report.title.toLowerCase().includes(filter.title.toLowerCase()),
        );
      }

      if (filter.personnel !== '') {
        filtered = filtered.filter((report) => {
          const personnel = personnelList.find((person) => person.id === report.event_owner_id);
          return (
            personnel &&
            `${personnel.first_name} ${personnel.last_name}`
              .toLowerCase()
              .includes(filter.personnel.toLowerCase())
          );
        });
      }

      setFilteredReports(filtered);
    };

    applyFilters();
  }, [filter, reports, personnelList]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));
  };

  // Function to get category name by ID
  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : 'Unknown Category';
  };

  // Function to get tag name by ID
  const getTagName = (tagId) => {
    const tag = tags.find((tag) => tag.id === tagId);
    return tag ? tag.name : 'Unknown Tag';
  };

  // Data processing for the pie chart
  const categoryCompletionData = () => {
    const categoryCounts = {};
    staticEntries.forEach((entry) => {
      const categoryName = getCategoryName(entry.category_id);
      if (!categoryCounts[categoryName]) {
        categoryCounts[categoryName] = { completed: 0, total: 0 };
      }
    });

    filteredReports.forEach((report) => {
      const staticEntry = staticEntries.find((entry) => entry.id === report.static_id);
      if (staticEntry) {
        const categoryName = getCategoryName(staticEntry.category_id);
        categoryCounts[categoryName].total += 1;
        if (report.completed) categoryCounts[categoryName].completed += 1;
      }
    });

    const categoryLabels = Object.keys(categoryCounts);
    const completedCounts = categoryLabels.map((category) => categoryCounts[category].completed);
    const totalCounts = categoryLabels.map((category) => categoryCounts[category].total);

    return {
      labels: categoryLabels,
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
      const personnel = personnelList.find((person) => person.id === report.event_owner_id);
      if (personnel) {
        const personnelName = `${personnel.first_name} ${personnel.last_name}`;
        if (!personnelProgress[personnelName]) {
          personnelProgress[personnelName] = { completed: 0, total: 0 };
        }
        personnelProgress[personnelName].total += 1;
        if (report.completed) personnelProgress[personnelName].completed += 1;
      }
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
        value={filter.title}
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
          filteredReports.map((report) => {
            const staticEntry = staticEntries.find((entry) => entry.id === report.static_id);
            return (
              <Box key={report.id} borderWidth="1px" borderRadius="lg" padding="4" mb="4">
                <p>
                  <strong>{report.title}</strong>
                </p>
                <p>Start Date: {report.start_date}</p>
                <p>End Date: {report.end_date}</p>
                <p>Completed: {report.completed ? 'Yes' : 'No'}</p>
                <p>
                  Personnel:{' '}
                  {`${
                    personnelList.find((person) => person.id === report.event_owner_id)?.first_name
                  } ${
                    personnelList.find((person) => person.id === report.event_owner_id)?.last_name
                  }`}
                </p>
                <p>Category: {getCategoryName(staticEntry?.category_id)}</p>
                <p>Tag: {getTagName(report.tag_id)}</p>
                <p>Notes: {report.notes}</p>
              </Box>
            );
          })
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
