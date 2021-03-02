import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Broadcast from "../components/broadcast/Broadcast";
import StaticProfile from "../components/profile/StaticProfile";

import Grid from "@material-ui/core/Grid";

import { connect } from "react-redux";
import { getUserData } from "../redux/actions/dataActions";

class user extends Component {
  state = {
    profile: null,
    broadcastIdParam: null,
  };

  componentDidMount() {
    const handle = this.props.match.params.handle;
    const broadcastId = this.props.match.params.broadcastId;

    if (broadcastId) this.setState({ broadcastIdParam: broadcastId });

    this.props.getUserData(handle);
    axios
      .get(`/user/${handle}`)
      .then((res) => {
        this.setState({
          profile: res.data.user,
        });
      })
      .catch((err) => console.log(err));
  }
  render() {
    const { broadcasts, loading } = this.props.data;
    const { broadcastIdParam } = this.state;

    const broadcastsMarkup = loading ? (
      <p>Loading data...</p>
    ) : broadcasts === null ? (
      <p>No broadcasts from this user</p>
    ) : !broadcastIdParam ? (
      broadcasts.map((broadcast) => (
        <Broadcast key={broadcast.broadcastId} broadcast={broadcast} />
      ))
    ) : (
      broadcasts.map((broadcast) => {
        if (broadcast.broadcastId !== broadcastIdParam)
          return (
            <Broadcast key={broadcast.broadcastId} broadcast={broadcast} />
          );
        else
          return (
            <Broadcast
              key={broadcast.broadcastId}
              broadcast={broadcast}
              openDialog
            />
          );
      })
    );

    return (
      <Grid container spacing={10}>
        <Grid item sm={8} xs={12}>
          {broadcastsMarkup}
        </Grid>
        <Grid item sm={4} xs={10}>
          {this.state.profile === null ? (
            <p>Loading profile...</p>
          ) : (
            <StaticProfile profile={this.state.profile} />
          )}
        </Grid>
      </Grid>
    );
  }
}

user.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getUserData })(user);
