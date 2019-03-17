import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Col, Row, Container } from "../Grid/index"; 
import { Mood, PersonAdd, CheckBox, AccountBox  } from '@material-ui/icons';


const styles = {
  card: {
    minWidth: 275,
    minHeight: 400,
       
    
  },

  title: {
    fontSize: 14,
  },
 
};

function SimpleCard(props) {
  const { classes } = props;



  return (
      <Row>
          <Col size="md-4">
    <Card >
      <CardContent>
        <Typography variant="h5" component="h2">
          Log in to 
        </Typography>
        <Typography variant="h5" component="h2">
        
          Save My Spot
        </Typography>
        <AccountBox color="secondary" />
        
       
      </CardContent>
      
    </Card>
    </Col>
    <Col size="md-4">
    <Card >
      <CardContent>
        <Typography variant="h5" component="h2">
         Secure your 
        </Typography>
        <Typography variant="h5" component="h2">
         place in line
        </Typography>
        <PersonAdd color="secondary" />
        
      </CardContent>
     
    </Card>
    </Col>
    <Col size="md-4">
    <Card >
      <CardContent>
        <Typography variant="h5" component="h2">
        Arrive at your
        </Typography>
        <Typography variant="h5" component="h2">
        designated time
        </Typography>
        <Mood color="secondary" />
        
      </CardContent>
    </Card>
    </Col>
    </Row>


  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);