// import React, { useContext } from 'react'

// function Book(props) {
//   return (
//     <li>
//       <h2>{props.title}</h2>
//       <div>{props.author}</div>
//     </li>
//   )
// }

// export default Book;



import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// core components
import styles from "../assets/jss/material-dashboard-react/components/tableStyle.js";

const useStyles = makeStyles(styles);

export default function CustomTable(props) {
  const classes = useStyles();
  const { tableHead, tableData, tableHeaderColor } = props;
  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow className={classes.tableHeadRow}>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={key}
                  >
                    {prop}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          
           
              <TableRow  className={classes.tableBodyRow}>
                
                
                    <TableCell text-indent= "5em" className={classes.tableCell} >
                      
                      {props.title}
                     
                    
                    </TableCell>

                    <TableCell text-indent= "5em" className={classes.tableCell} >
                      
                    {props.author}
                     
                    
                    </TableCell>

                    <TableCell text-indent= "5em" className={classes.tableCell} >
                      
                    {props.fellow}
                     
                    
                    </TableCell>

                    <TableCell text-indent= "5em" className={classes.tableCell} >
                      
                    {props.fellowship}
                     
                    
                    </TableCell>
                    <TableCell text-indent= "5em" className={classes.tableCell} >
                      
                    {props.feller}
                     
                    
                    </TableCell>
                    <TableCell text-indent= "5em" className={classes.tableCell} >
                      
                    {props.loca}
                     
                    
                    </TableCell>
                    <TableCell text-indent= "5em" className={classes.tableCell} >
                      
                    {props.repla}
                     
                    
                    </TableCell>
                    <TableCell text-indent= "5em" className={classes.tableCell} >
                      
                    {props.stoc}
                     
                    
                    </TableCell>

                    
                     
                     
                  
               
              </TableRow>
            
          
        </TableBody>
      </Table>
    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray",
};

CustomTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray",
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
};
