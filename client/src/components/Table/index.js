import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  }
});

let id = 0;
function createData(firstName, lastName, email) {
  id += 1;
  return { id, firstName, lastName, email };
}

const rows = [
  createData("No one waiting yet...", "", "")
];

const SimpleTable = (props) => {

  // confirm we have the waitlist passed in successfully
  console.log("busInfo:" + props.busInfo);
  const { id, businessName, numWaiting, waitTime, waitlist } = props.busInfo[0];
  console.log("Bus:" + businessName);
  console.log(waitlist);
  console.log(waitlist[0]);
  console.log(waitlist[0].firstName);
  console.log(waitlist.length);
  const xlength = waitlist.length;
  console.log(xlength);

  const { classes } = props;
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        {/* set up the table on businessPage */}
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell align="right">Last Name</TableCell>
            <TableCell align="right">eMail </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* display (loop through) the waitlist that we passed in */}
          {waitlist.map(row => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">{row.firstName}</TableCell>
              <TableCell align="right">{row.lastName}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleTable);
