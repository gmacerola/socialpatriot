import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";

import Broadcast from "../components/broadcast/Broadcast";
import Profile from "../components/profile/Profile";

import { connect } from "react-redux";
import { getBroadcasts } from "../redux/actions/dataActions";

class home extends Component {
  componentDidMount() {
    this.props.getBroadcasts();
  }

  render() {
    const { broadcasts, loading } = this.props.data;
    let recentBroadcastsMarkup = !loading ? (
      broadcasts.map((broadcast) => (
        <Broadcast key={broadcast.broadcastId} broadcast={broadcast} />
      ))
    ) : (
      <p>Loading...</p>
    );
    return (
      <Grid container spacing={2}>
        <Grid item sm={8} xs={12}>
          {recentBroadcastsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

home.propTypes = {
  getBroadcasts: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getBroadcasts })(home);
