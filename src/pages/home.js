import React, { Component } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";

import Broadcast from "../components/Broadcast";

class home extends Component {
  state = {
    broadcasts: null,
  };

  componentDidMount() {
    axios
      .get("/broadcasts")
      .then((res) => {
        this.setState({
          broadcasts: res.data,
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    let recentBroadcastsMarkup = this.state.broadcasts ? (
      this.state.broadcasts.map((broadcast) => (
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
          <p>Profile</p>
        </Grid>
      </Grid>
    );
  }
}

export default home;
