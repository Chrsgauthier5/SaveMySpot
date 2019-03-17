import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
 
  lightTooltip: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
  

 
});

class CustomizedTooltips extends React.Component {
 

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Tooltip title="Add" classes={{ tooltip: classes.lightTooltip }}>
          <Button className={classes.button}>Light</Button>
        </Tooltip>
        <Tooltip
          title={
            <React.Fragment>
              Add
              <span className={classes.arrow} ref={this.handleArrowRef} />
            </React.Fragment>
          }
          classes={{ popper: classes.arrowPopper }}
          PopperProps={{
            popperOptions: {
              modifiers: {
                arrow: {
                  enabled: Boolean(this.state.arrowRef),
                  element: this.state.arrowRef,
                },
              },
            },
          }}
        >
          <Button className={classes.button}>Arrow</Button>
        </Tooltip>
        <Tooltip
          title={
            <React.Fragment>
              Add
              <span className={classes.arrow} ref={this.handleArrowRef} />
            </React.Fragment>
          }
          classes={{
            tooltip: classes.bootstrapTooltip,
            popper: classes.bootstrapPopper,
            tooltipPlacementLeft: classes.bootstrapPlacementLeft,
            tooltipPlacementRight: classes.bootstrapPlacementRight,
            tooltipPlacementTop: classes.bootstrapPlacementTop,
            tooltipPlacementBottom: classes.bootstrapPlacementBottom,
          }}
          PopperProps={{
            popperOptions: {
              modifiers: {
                arrow: {
                  enabled: Boolean(this.state.arrowRef),
                  element: this.state.arrowRef,
                },
              },
            },
          }}
        >
          <Button className={classes.button}>Bootstrap</Button>
        </Tooltip>
        <Tooltip
          classes={{
            popper: classes.htmlPopper,
            tooltip: classes.htmlTooltip,
          }}
          PopperProps={{
            popperOptions: {
              modifiers: {
                arrow: {
                  enabled: Boolean(this.state.arrowRef),
                  element: this.state.arrowRef,
                },
              },
            },
          }}
          title={
            <React.Fragment>
              <Typography color="inherit">Tooltip with HTML</Typography>
              <em>{"And here's"}</em> <b>{'some'}</b> <u>{'amazing content'}</u>.{' '}
              {"It's very engaging. Right?"}
              <span className={classes.arrow} ref={this.handleArrowRef} />
            </React.Fragment>
          }
        >
          <Button className={classes.button}>HTML</Button>
        </Tooltip>
      </div>
    );
  }
}

CustomizedTooltips.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedTooltips);