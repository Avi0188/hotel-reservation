import { Box, Button, FormControl, FormLabel, Input, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook

const Reservation = ({ singlePage }) => {
  const initialFormData = {
    email: '',
    checkin: '',
    checkout: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const navigate = useNavigate(); // Use the useNavigate hook

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...formData,
      name: singlePage.name,
    };

    axios.post('http://localhost:8080/booking', data)
      .then((response) => {
        console.log('Form data submitted successfully:', response.data);
        alert("Booking Successful");
        // Clear the form data
        setFormData(initialFormData);
        
        // Redirect to another page
        navigate('/booking'); 
      })
      .catch((error) => {
        console.error('Error submitting form data:', error);
      });
  };

  if (!singlePage) {
    return (
      <Box style={{ backgroundColor: "skyblue" }}>
        <h2 style={{ backgroundColor: "skyblue" }}>Hotel Details</h2>
      </Box>
    );
  }

  return (
    <Box style={{ backgroundColor: "gray", padding: "10px" }}>
      <h1 style={{ backgroundColor: "skyblue" }}>Hotel Details</h1>
      {singlePage ? (
        <form onSubmit={handleSubmit}>
          <Box>
            <h3>Hotel Name: {singlePage.name}</h3>
            <p>Address: {singlePage.address}</p>
            <p>Price: {singlePage.rate}</p>
          </Box>
          <Box>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel>Check-in Date</FormLabel>
              <Input
                type="date"
                name="checkin"
                value={formData.checkin}
                onChange={handleChange}
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel>Check-out Date</FormLabel>
              <Input
                type="date"
                name="checkout"
                value={formData.checkout}
                onChange={handleChange}
                required
              />
            </FormControl>
          </Box>
          <Button type="submit" colorScheme="green">
            Place Reservation
          </Button>
        </form>
      ) :   <Box style={{ backgroundColor: "skyblue" }}>
      <h2 style={{ backgroundColor: "skyblue" }}>Hotel Details</h2>
    </Box>}
    </Box>
  );
};

export default Reservation;
