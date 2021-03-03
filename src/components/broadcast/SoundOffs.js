import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import dayjs from "dayjs";

import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const styles = (theme) => ({
  ...theme.spreadThis,
  soundOffImage: {
    maxWidth: "100%",
    height: 100,
    objectFit: "cover",
    borderRadius: "50%",
    // padding: 30,
  },
  soundOffData: {
    marginLeft: 20,
  },
  soundOffContainer: {
    paddingLeft: 40,
    paddingRight: 40,
  },
});

class SoundOffs extends Component {
  render() {
    const { soundoffs, classes } = this.props;
    return (
      <Grid container className={classes.soundOffContainer}>
        {soundoffs.map((soundoff, index) => {
          const { body, createdAt, userImage, userHandle } = soundoff;
          return (
            <Fragment key={createdAt}>
              <Grid item sm={12}>
                <Grid container>
                  <Grid item sm={3}>
                    <img
                      src={userImage}
                      alt="soundoff"
                      className={classes.soundOffImage}
                    />
                  </Grid>
                  <Grid item sm={9}>
                    <div className={classes.soundOffData}>
                      <Typography
                        variant="h5"
                        component={Link}
                        to={`/users/${userHandle}`}
                        color="primary"
                      >
                        {userHandle}
                      </Typography>
                      <Typography variant="body2" color="secondary">
                        {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
                      </Typography>
                      <hr className={classes.invisibleSeparator} />
                      <Typography variant="body1">{body}</Typography>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              {index !== soundoffs.length - 1 && (
                <hr className={classes.visibleSeparator} />
              )}
            </Fragment>
          );
        })}
      </Grid>
    );
  }
}

SoundOffs.propTypes = {
  soundoffs: PropTypes.array.isRequired,
};

export default withStyles(styles)(SoundOffs);
