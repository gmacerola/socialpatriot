import React, { Component } from "react";
import MyButton from "../../util/MyButton";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";

import { connect } from "react-redux";
import {
  rogerBroadcast,
  unRogerBroadcast,
} from "../../redux/actions/dataActions";

class RogerButton extends Component {
  rogeredBroadcast = () => {
    if (
      this.props.user.rogers &&
      this.props.user.rogers.find(
        (roger) => roger.broadcastId === this.props.broadcastId
      )
    )
      return true;
    else {
      return false;
    }
  };

  rogerBroadcast = () => {
    this.props.rogerBroadcast(this.props.broadcastId);
  };

  unRogerBroadcast = () => {
    this.props.unRogerBroadcast(this.props.broadcastId);
  };

  render() {
    const { authenticated } = this.props.user;
    const rogerButton = !authenticated ? (
      <Link to="/login">
        <MyButton tip="Roger">
          <StarBorderIcon color="primary" />
        </MyButton>
      </Link>
    ) : this.rogeredBroadcast() ? (
      <MyButton tip="Undo roger" onClick={this.unRogerBroadcast}>
        <StarIcon color="primary" />
      </MyButton>
    ) : (
      <MyButton tip="Roger" onClick={this.rogerBroadcast}>
        <StarBorderIcon color="primary" />
      </MyButton>
    );
    return rogerButton;
  }
}

RogerButton.propTypes = {
  user: PropTypes.object.isRequired,
  broadcastId: PropTypes.string.isRequired,
  rogerBroadcast: PropTypes.func.isRequired,
  unRogerBroadcast: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  rogerBroadcast,
  unRogerBroadcast,
};

export default connect(mapStateToProps, mapActionsToProps)(RogerButton);
