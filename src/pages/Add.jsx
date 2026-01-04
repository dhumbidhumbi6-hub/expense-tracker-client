import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from"axios"
import { toast } from 'react-toastify';
import { baseUrl } from '../api';

export default function Add() {
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    amount: 0,
    category: '',
  });
  const[isLoading,setIsLoading]=useState(false);
  const handleSubmit =async() => {
    //console.log(formData);
    setIsLoading(true);
    try {
      const res=await axios.post(`${baseUrl}/api/expense/insert`,
        formData
      );
     // console.log(res)
     if (res.data.success) {
    toast(res.data.message);
      setTimeout(()=>{
        navigate("/")
      },2000);
     } else {
      toast(res.data.message);
     }
    } catch (error) {
      console.log(error)
    }
    finally{
      setTimeout(()=>{
        setIsLoading(false)
      },2000);
    }
  };
  return (
    <Box>
      <Box>
        <Typography varient="h4">Add Expense Details</Typography>
      </Box>
      <Box sx={{
        p: 4, display: "flex",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
      }}>
        <Paper sx={{ width: "70%", p: 3 }}>
          <TextField
          value={formData.title}
            fullWidth
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            label="enter expense title"
            placeholder='enter expense title here'
            sx={{ mb: 2 }} />
          <TextField
           value={formData.amount}
            fullWidth
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            label="enter expense amount"
            placeholder='enter expense amount here'
            type='number'
            sx={{ mb: 2 }} />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Select expense category</InputLabel>
            <Select
             value={formData.category}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              //value={age}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              label="Select expense category"
              //onChange={handleChange}
              sx={{ mb: 2 }}
            >
              <MenuItem value={"Transport"}>Transport</MenuItem>
              <MenuItem value={"food"}>food</MenuItem>
              <MenuItem value={"others"}>others</MenuItem>
            </Select>
          </FormControl>
          <Button
            onClick={handleSubmit}
            sx={{ mb: 1 }} variant="contained"
            loading={isLoading}
            fullWidth>Submit</Button>
          <Button component={Link} to={"/"} sx={{ mb: 1 }} variant='outlined' color="secondary" fullWidth>view detail</Button>
        </Paper>
      </Box>
    </Box>

  )
}
