import React,{useEffect,useState} from 'react'
import { Table,TableHead,TableBody,TableRow,TableCell,styled,Button,Box } from "@mui/material";
import { getUsers,deleteUser,sendData } from "../service/api.js";
import { Link } from 'react-router-dom';
import axios from 'axios';


const StyledTable = styled(Table)`
width:90%;
margin:50px auto 0 auto
`

const THead= styled(TableRow)`
background:black;
&>th{
color:white;
cont-size:20px;
}
`

const TBody= styled(TableRow)`
&>td{
  font-size:20px
}

`
const BtnStyled=styled('button')`
width:100%;
margin-top:50px;
border:none;
background:transparent;
justify-content:center;
align-items:center;
`


const AllUsers = () => {


  const [users,setUsers]=useState([])
  useEffect(()=>{
    getAllUsers()
  },[])
  const getAllUsers= async()=>{
    let response= await getUsers()
    setUsers(response.data)

  }

  const deleteUserDetails = async(id)=>{
    await deleteUser(id)
    getAllUsers()

  }


  

  const [data, setData] = useState(null);

  const handleSend = async() => {
    console.log("real");
    // Extract data from selected rows
    const rows = document.querySelectorAll('.MuiTableRow-root');
    
    const extractedData = [];
    
    for (let i = 1; i < rows.length; i++) { // Skip the first row (the headings row)
      const selectButton = rows[i].querySelector('input[type="checkbox"]');
      
      if (selectButton.checked) {
        const cells = rows[i].querySelectorAll('.MuiTableCell-root');
        const rowData = [];
        for (let j = 2; j < cells.length-1; j++) {
          rowData.push(cells[j].innerHTML);
        }
        extractedData.push(rowData);
      }
    }
    console.log(JSON.stringify(extractedData));

    // Send data to backend server
    await axios.post('https://emailer2-api.onrender.com/senddata', { data: extractedData })
      .then(res => {
        console.log("sent");
        setData(res.data);
        sendData(extractedData)
      })
      .catch(error => console.error(error));

  };


  return (<>
    <StyledTable>
      <TableHead>
        <THead>
         <TableCell>Select</TableCell>

          <TableCell>Id</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Username</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Phone</TableCell>
          <TableCell>Hobbies</TableCell>

          
          <TableCell></TableCell>
        </THead>
      </TableHead>
      <TableBody>
        {
          users.map(user=>(
            <TBody key={user._id}>
            <TableCell><input type="checkbox" className="selection" /></TableCell>

              <TableCell>{user._id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{user.hobbies}</TableCell>

              <TableCell>
                <Button variant="contained" style={{marginRight:10}} component={Link} to={`/edit/${user._id}`}>Edit</Button>
                <Button variant="contained" color='secondary' onClick={()=>deleteUserDetails(user._id)}>Delete</Button>

              </TableCell>

              
            </TBody>
          ))
        }
      </TableBody>
    </StyledTable>
    <BtnStyled>
    <Button variant="contained" onClick={()=>handleSend()}>Send</Button>
    </BtnStyled>
    
    
    </>

    
  )
}

export default AllUsers