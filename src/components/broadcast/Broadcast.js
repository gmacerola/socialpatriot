import React, { Component } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import MyButton from "../../util/MyButton";
import DeleteBroadcast from "./DeleteBroadcast";
import BroadcastDialog from "./BroadcastDialog";
import RogerButton from "./RogerButton";

import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import SoundoffIcon from "@material-ui/icons/RecordVoiceOver";

import { connect } from "react-redux";

const styles = {
  card: {
    position: "relative",
    display: "flex",
    marginBottom: 20,
    border: "3px solid #0d47a1",
    borderRadius: 25,
  },
  image: {
    minWidth: 200,
    maxHeight: 200,
  },
  content: {
    padding: 25,
    objectFit: "cover",
  },
};

class Broadcast extends Component {
  render() {
    var relativeTime = require("dayjs/plugin/relativeTime");
    dayjs.extend(relativeTime);
    const {
      classes,
      broadcast: {
        body,
        createdAt,
        userImage,
        userHandle,
        broadcastId,
        rogerCount,
        soundOffCount,
      },
      user: {
        authenticated,
        credentials: { handle },
      },
    } = this.props;

    const deleteButton =
      authenticated && userHandle === handle ? (
        <DeleteBroadcast broadcastId={broadcastId} />
      ) : null;
    return (
      <Card elevation={10} className={classes.card}>
        <CardMedia
          image={userImage}
          title="Profile image"
          className={classes.image}
        />
        <CardContent className={classes.content}>
          <Typography
            variant="h5"
            component={Link}
            to={`/users/${userHandle}`}
            color="primary"
          >
            {userHandle}
          </Typography>
          {deleteButton}
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body1">{body}</Typography>
          <RogerButton broadcastId={broadcastId} />
          <span>{rogerCount} Rogers</span>
          <MyButton tip="soundoffs">
            <SoundoffIcon color="primary" />
          </MyButton>
          <span>{soundOffCount} Soundoffs</span>
          <BroadcastDialog
            broadcastId={broadcastId}
            userHandle={userHandle}
            openDialog={this.props.openDialog}
          />
        </CardContent>
      </Card>
    );
  }
}

Broadcast.propTypes = {
  user: PropTypes.object.isRequired,
  broadcast: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(withStyles(styles)(Broadcast));
