import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import { rogerBroadcast, unRogerBroadcast } from "../redux/actions/dataActions";
import MyButton from "../util/MyButton";
import DeleteBroadcast from "./DeleteBroadcast";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import ChatIcon from "@material-ui/icons/Chat";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";

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
  },
  content: {
    padding: 25,
    objectFit: "cover",
  },
};

class Broadcast extends Component {
  rogeredBroadcast = () => {
    if (
      this.props.user.rogers &&
      this.props.user.rogers.find(
        (roger) => roger.broadcastId === this.props.broadcast.broadcastId
      )
    )
      return true;
    else {
      return false;
    }
  };

  rogerBroadcast = () => {
    this.props.rogerBroadcast(this.props.broadcast.broadcastId);
  };

  unRogerBroadcast = () => {
    this.props.unRogerBroadcast(this.props.broadcast.broadcastId);
  };

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

    const rogerButton = !authenticated ? (
      <MyButton tip="Roger">
        <Link to="/login">
          <StarBorderIcon color="primary" />
        </Link>
      </MyButton>
    ) : this.rogeredBroadcast() ? (
      <MyButton tip="Undo roger" onClick={this.unRogerBroadcast}>
        <StarIcon color="primary" />
      </MyButton>
    ) : (
      <MyButton tip="Roger" onClick={this.rogerBroadcast}>
        <StarBorderIcon color="primary" />
      </MyButton>
    );

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
          {rogerButton}
          <span>{rogerCount} Rogers</span>
          <MyButton tip="soundoffs">
            <ChatIcon color="primary" />
          </MyButton>
          <span>{soundOffCount} Soundoffs</span>
        </CardContent>
      </Card>
    );
  }
}

Broadcast.propTypes = {
  rogerBroadcast: PropTypes.func.isRequired,
  unRogerBroadcast: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  broadcast: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  rogerBroadcast,
  unRogerBroadcast,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Broadcast));
