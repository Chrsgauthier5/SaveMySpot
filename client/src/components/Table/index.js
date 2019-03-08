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
function createData(name, phonenumber, waiting, eta, notes) {
  id += 1;
  return { id, name, phonenumber, waiting, eta, notes };
}

const rows = [
  createData("Diane S", 5551234545, 15, 5, "none"),
  createData("Chris G", 5551234545, 10, 10, "none"),
  createData("Jeff B", 5551234545, 5, 15, "none"),
  createData("Steph S", 5551234545, 0, 20, "difficult customer"),
  createData("Phil s", 5551234545, 0, 25, "good tipper")
];

function SimpleTable(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Phone number</TableCell>
            <TableCell align="right">Waiting </TableCell>
            <TableCell align="right">ETA</TableCell>
            <TableCell align="right">Notes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.phonenumber}</TableCell>
              <TableCell align="right">{row.waiting}</TableCell>
              <TableCell align="right">{row.eta}</TableCell>
              <TableCell align="right">{row.notes}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>--
    </Paper>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleTable);
