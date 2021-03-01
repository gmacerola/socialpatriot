import React, { Component, Fragment } from "react";
import MyButton from "../../util/MyButton";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

import { connect } from "react-redux";
import { deleteBroadcast } from "../../redux/actions/dataActions";

const styles = {
  deleteButton: {
    position: "absolute",
    left: "90%",
    top: "10%",
  },
};

class DeleteBroadcast extends Component {
  state = {
    open: false,
  };
  handleOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  deleteBroadcast = () => {
    this.props.deleteBroadcast(this.props.broadcastId);
    this.setState({
      open: false,
    });
  };
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <MyButton
          tip="Delete Broadcast"
          onClick={this.handleOpen}
          btnClassName={classes.deleteButton}
        >
          <DeleteOutlineIcon color="secondary" />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>
            Are you sure you want to delete this broadcast?
          </DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={this.deleteBroadcast} color="primary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

DeleteBroadcast.propTypes = {
  deleteBroadcast: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  broadcastId: PropTypes.string.isRequired,
};

export default connect(null, { deleteBroadcast })(
  withStyles(styles)(DeleteBroadcast)
);
