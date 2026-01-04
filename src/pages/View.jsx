import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ExpenseTable from '../components/Table'
import FloatingAddButton from '../components/FloatingAddButton'
import axios from 'axios'
import { baseUrl } from '../api'


export default function View() {
  const[allExpenses,setAllExpenses]=useState([])
  const fetchAllExpenses=async()=>{
    try {
      const res=await axios.get(`${baseUrl}/api/expense/view-all`);
      //console.log(res.data)
      if(res.data.success){
        setAllExpenses(res.data.expenses);
      }
    } catch (error) {
      console.log(error)
    }
  };
  //useEffect(arrowFunction,dependency)
  useEffect(()=>{
    fetchAllExpenses();
  },[])
  console.log(allExpenses);
  return (
    <Box>
        <Box sx={{textAlign:"center"}}>
            <Typography varient="h4">Expense list</Typography>
        </Box>
        <Box sx={{p:2}}>
            <ExpenseTable allExpenses={allExpenses}
            fetchAllExpenses={fetchAllExpenses}/>
            <FloatingAddButton/>
        </Box>
    </Box>
  )
}
