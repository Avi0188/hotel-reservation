import { Box, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';

const ViewReservation = () => {
    const [hotels, setHotels] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:8080/booking`)
          .then((res) => res.data)
          .then((data) => {
            console.log(data);
            setHotels(data);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
      }, []);
      
  return (
    <Box>
       <Table>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Check-in Date</Th>
                <Th>Check-out-Date</Th>
              </Tr>
            </Thead>
            <Tbody>
              {hotels.map((el) => (
                <Tr>
                  <Td>{el.name}</Td>
                  <Td>{el.email}</Td>
                  <Td>{el.checkin}</Td>
                  <Td>{el.checkout}</Td>
                  <Td>
                  
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
    </Box>
  )
}

export default ViewReservation
