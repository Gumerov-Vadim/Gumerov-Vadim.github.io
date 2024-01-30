import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect,useState } from 'react';
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function App() {
  const [table,setTable]=useState([])
  const [input,setInput]=useState("")
  useEffect(()=>{fetch("https://dummyjson.com/users").then((res)=>res.json()).then((res)=>{setTable(res)})},[])
  useEffect(()=>{console.log(table)},[table])
  function search(e){
      const newValue = e.target.value;
      setInput(newValue);
      fetch(`https://dummyjson.com/users/search?q=${newValue}`)
      .then(res => res.json())
      .then(res=>setTable(res));
  }
  return (
    <>
    <header>
        <span>возьмите меня стажером :-) </span>
        <input onChange={search} value={input}></input>
    </header>
    <TableContainer className='table' component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {/* ФИО, возраст, пол, номер телефона и адрес (город и название улицы).  */}
          {table?.users?.map((user) => (
            <TableRow
              key={user.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
              {user.firstName} {user.lastName} {user.maidenName}
              </TableCell>
              <TableCell align="right">{user.age}</TableCell>
              <TableCell align="right">{user.gender}</TableCell>
              <TableCell align="right">{user.phone}</TableCell>
              <TableCell align="right">{user.address.city}, {user.address.address}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </>
  );
}