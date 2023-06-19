import './PsychotropicMonitoringSection.css';
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import {useState, useEffect} from 'react';
import SearchBar from "../../searchBar/searchBar";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Navigation from '../../Navigation/navigation';
import Footer from '../../Footer/Footer';
import Data from "../../searchBar/Data.json";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.success.main,
    color:theme.palette.common.white,
    fontWeight:'bold',
    fontStyle:'italic',
    textDecorationLine:'underline',
    
  
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function PsychotropicMonitoringSection() {

  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:8887/api/psychotropicmonitoringsection')
        .then(response => {
          setData(response.data)
          console.log(response.data[0]);
        })
        .catch(error => {
          console.log(error);
        });
  }, []);

  if(data.length > 0)
  {
  return (
    <>
      <Navigation />
      <SearchBar placeholder="Search" data={Data} />
      <br></br>
    <div id="Psychotropic">
      <Accordion id="firstAccordionPsychotropic">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography id ="psychotropicSubject"><b>Psychotropic Monitoring</b></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <TableContainer component={Paper} >
                  <Table sx={{ minWidth: 700 }} aria-label="customized table" id="psychotropicMonitoringTable" >
                    <TableHead >
                      <TableRow >
                        <StyledTableCell  >Name</StyledTableCell>
                        <StyledTableCell >Antipsychotics</StyledTableCell>
                        <StyledTableCell >Lithium</StyledTableCell>
                        <StyledTableCell >Valproate</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data.map((dataObj, index) => (
                        <StyledTableRow key={index} >
                          <StyledTableCell component="th" scope="row">
                            {dataObj.Name}
                          </StyledTableCell>
                          <StyledTableCell >{dataObj[`Antipsychotics`]}</StyledTableCell>
                          <StyledTableCell >{dataObj[`Lithium`]}</StyledTableCell>
                          <StyledTableCell >{dataObj[`Valproate`]}</StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer><br></br>
              <p><b>Key:</b>ACI: as clinically indicated, BL: baseline, m: month mark (eg. 6m: 6 month mark).  <b>NOTES</b>: these are meant to be minimum screening requirements, more frequent investigation may be necessary based on clinical judgment  </p>
          </Typography>
        </AccordionDetails>
      </Accordion>
      
    </div>
    <Footer />
    </>
  );
}
};