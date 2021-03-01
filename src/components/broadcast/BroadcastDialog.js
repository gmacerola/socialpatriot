import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import MyButton from "../../util/MyButton";
import dayjs from "dayjs";
import RogerButton from "./RogerButton";
import SoundOffs from "./SoundOffs";
import SoundOffForm from "./SoundOffForm";

import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import UnfoldMore from "@material-ui/icons/UnfoldMore";
import ChatIcon from "@material-ui/icons/Chat";

import { connect } from "react-redux";
import { getBroadcast, clearErrors } from "../../redux/actions/dataActions";

const styles = (theme) => ({
  ...theme.spreadThis,
  profileImage: {
    maxWidth: 200,
    height: 200,
    borderRadius: "50%",
    objectFit: "cover",
  },
  dialogContent: {
    padding: 20,
  },
  closeButton: {
    position: "absolute",
    left: "90%",
  },
  expandButton: {
    position: "absolute",
    left: "90%",
  },
  spinnerDiv: {
    textAlign: "center",
    marginTop: 50,
    marginBottom: 50,
  },
});

class BroadcastDialog extends Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({
      open: true,
    });
    this.props.getBroadcast(this.props.broadcastId);
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
    this.props.clearErrors();
  };

  render() {
    const {
      classes,
      broadcast: {
        broadcastId,
        body,
        createdAt,
        rogerCount,
        soundOffCount,
        userImage,
        userHandle,
        soundoffs,
      },
      UI: { loading },
    } = this.props;

    const dialogMarkup = loading ? (
      <div className={classes.spinnerDiv}>
        <CircularProgress size={200} thickness={2} />
      </div>
    ) : (
      <Grid container spacing={16}>
        <Grid item sm={5}>
          <img src={userImage} alt="Profile" className={classes.profileImage} />
        </Grid>
        <Grid item sm={7}>
          <Typography
            component={Link}
            color="primary"
            variant="h5"
            to={`/users/${userHandle}`}
          >
            @{userHandle}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant="body2" color="secondary">
            {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant="body1">{body}</Typography>
          <RogerButton broadcastId={broadcastId} />
          <span>{rogerCount} rogers</span>
          <MyButton tip="soundoffs">
            <ChatIcon color="primary" />
          </MyButton>
          <span>{soundOffCount} Soundoffs</span>
        </Grid>
        <hr className={classes.visibleSeparator} />
        <SoundOffForm broadcastId={broadcastId} />
        <SoundOffs broadcastId={broadcastId} soundoffs={soundoffs} />
      </Grid>
    );
    return (
      <Fragment>
        <MyButton
          tip="Expand the broadcast"
          onClick={this.handleOpen}
          tipClassName={classes.expandButton}
        >
          <UnfoldMore color="primary" />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <MyButton
            tip="Close"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogContent className={classes.dialogContent}>
            {dialogMarkup}
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

BroadcastDialog.propTypes = {
  getBroadcast: PropTypes.func.isRequired,
  broadcastId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  broadcast: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  broadcast: state.data.broadcast,
  UI: state.UI,
});

const mapActionsToProps = {
  getBroadcast,
  clearErrors,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(BroadcastDialog));
