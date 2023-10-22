import {
    Box,
    Button,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    Input,
    useMediaQuery,
  } from '@chakra-ui/react';
  import React, { useState, useEffect } from 'react';
  import axios from 'axios';
  import { Link } from 'react-router-dom';
  import Reservation from './Reservation';
  
  const Hotel = () => {
    const [hotels, setHotels] = useState([]);
    const [num, setNum] = useState(''); // Setting the default limit to empty string
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [singlePage, setSinglePage] = useState(null);
    const itemsPerPage = 5;
    const [isSmallScreen] = useMediaQuery('(max-width: 600px)');
  
    useEffect(() => {
        // fetching data (already installed axios by doing npm i )
      axios
        .get(`http://localhost:8080/hotel`)
        .then((res) => res.data)
        .then((data) => {
          setHotels(data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }, []);
  
    const handleNumChange = (e) => {
      const newNum = e.target.value;
      setNum(newNum);
    };
  
    const filteredHotels = hotels.filter((hotel) =>
      hotel.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
    const totalPages = Math.ceil(filteredHotels.length / num);
  
    const handlePreviousPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };
  
    const handleNextPage = () => {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      }
    };
  
    const startIndex = (currentPage - 1) * (num || 5); // Use 5 as the default if num is empty
    const endIndex = startIndex + (num || 5); // Use 5 as the default if num is empty
  
    const currentHotels = filteredHotels.slice(startIndex, endIndex);
  
    return (
      <Box>
        <Box
          style={{ marginTop: isSmallScreen ? '10vh' : '0', width: '80%' }}
          display={{ md: 'flex', base: 'block' }}
          gap="10vh"
        >
          <Box>
            <Input
              type="text"
              placeholder="Search hotels"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Input
              type="number"
              placeholder="Maximum results to display"
              value={num}
              onChange={handleNumChange}
            />
  
            <Table>
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Address</Th>
                  <Th>City, State</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {currentHotels.map((el) => (
                  <Tr key={el.id}>
                    <Td>{el.name}</Td>
                    <Td>{el.address}</Td>
                    <Td>{`${el.city}, ${el.state}`}</Td>
                    <Td>
                      <Link to={`/hotels/${el.id}`}>
                        <Button
                          colorScheme="green"
                          onClick={() => setSinglePage(el)}
                        >
                          View Hotel
                        </Button>
                      </Link>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
  
            <Button
              colorScheme={currentPage === 1 ? 'gray' : 'green'}
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              &lt;&lt; Previous
            </Button>
  
            <Button
              colorScheme={currentPage === totalPages ? 'gray' : 'green'}
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next &gt;&gt;
            </Button>
          </Box>
          <Box
            style={{ marginTop: '20vh', height: '100%' }}
            display={{ md: 'block', base: 'none' }}
          >
            <Reservation singlePage={singlePage} />
          </Box>
        </Box>
      </Box>
    );
  };
  
  export default Hotel;
  