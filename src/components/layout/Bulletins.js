import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";

import BulletinsIcon from "@material-ui/icons/Notifications";
import StarIcon from "@material-ui/icons/Star";
import ChatIcon from "@material-ui/icons/Chat";

import { connect } from "react-redux";
import { markBulletinsRead } from "../../redux/actions/userActions";

class Bulletins extends Component {
  state = {
    anchorEl: null,
  };

  handleOpen = (event) => {
    this.setState({
      anchorEl: event.target,
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };

  onMenuOpened = () => {
    let unreadBulletinsIds = this.props.bulletins
      .filter((not) => !not.read)
      .map((not) => not.bulletinId);
    this.props.markBulletinsRead(unreadBulletinsIds);
  };

  render() {
    const bulletins = this.props.bulletins;
    const anchorEl = this.state.anchorEl;

    dayjs.extend(relativeTime);

    let bulletinsIcon;
    if (bulletins && bulletins.length > 0) {
      bulletins.filter((not) => not.read === false).length > 0
        ? (bulletinsIcon = (
            <Badge
              badgeContent={
                bulletins.filter((not) => not.read === false).length
              }
              color="secondary"
            >
              <BulletinsIcon />
            </Badge>
          ))
        : (bulletinsIcon = <BulletinsIcon />);
    } else {
      bulletinsIcon = <BulletinsIcon />;
    }

    let bulletinsMarkup =
      bulletins && bulletins.length > 0 ? (
        bulletins.map((not) => {
          const verb = not.type === "roger" ? "rogered" : "sounded off";
          const time = dayjs(not.createdAt).fromNow();
          const iconColor = not.read ? "primary" : "secondary";
          const icon =
            not.type === "roger" ? (
              <StarIcon color={iconColor} style={{ marginRight: 10 }} />
            ) : (
              <ChatIcon color={iconColor} style={{ marginRight: 10 }} />
            );

          return (
            <MenuItem key={not.createdAt} onClick={this.handleClose}>
              {icon}
              <Typography
                component={Link}
                color="FFFFFF"
                variant="body1"
                to={`/users/${not.recipent}/broadcast/${not.broadcastId}`}
              >
                {not.sender} {verb} your broadcast {time}
              </Typography>
            </MenuItem>
          );
        })
      ) : (
        <MenuItem onClick={this.handleClose}>You have no bulletins</MenuItem>
      );
    return (
      <Fragment>
        <Tooltip placement="top" title="Bulletins">
          <IconButton
            aria-owns={anchorEl ? "simple-menu" : undefined}
            aria-haspopup="true"
            onClick={this.handleOpen}
          >
            {bulletinsIcon}
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          onEntered={this.onMenuOpened}
        >
          {bulletinsMarkup}
        </Menu>
      </Fragment>
    );
  }
}

Bulletins.propTypes = {
  markBulletinsRead: PropTypes.func.isRequired,
  bulletins: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  bulletins: state.user.bulletins,
});

export default connect(mapStateToProps, { markBulletinsRead })(Bulletins);
