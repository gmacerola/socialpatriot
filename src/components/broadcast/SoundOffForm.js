import React, { Component } from "react";
import PropTypes from "prop-types";

import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import { connect } from "react-redux";
import { submitSoundOff } from "../../redux/actions/dataActions";

const styles = (theme) => ({
  ...theme.spreadThis,
});

class SoundOffForm extends Component {
  state = {
    body: "",
    errors: {},
  };

  static getDerivedStateFromProps(props) {
    if (props.UI.errors) {
      return {
        errors: props.UI.errors,
      };
    }
    return null;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.UI.errors !== this.props.UI.errors && !this.props.UI.errors) {
      this.setState({
        errors: {},
        body: "",
      });
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.submitSoundOff(this.props.broadcastId, {
      body: this.state.body,
    });
    this.setState({
      body: "",
    });
  };

  render() {
    const { classes, authenticated } = this.props;
    const { errors } = this.state;
    const soundOffFormMarkup = authenticated ? (
      <Grid item sm={12} style={{ textAlign: "center", paddingBottom: "20px" }}>
        <form onSubmit={this.handleSubmit}>
          <TextField
            name="body"
            type="text"
            label="Soundoff on broadcast"
            error={errors ? true : false}
            helperText={errors.comment}
            value={this.state.body}
            onChange={this.handleChange}
            fullWidth
            className={classes.TextField}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Submit
          </Button>
        </form>
        <hr className={classes.visibleSeparator} />
      </Grid>
    ) : null;
    return soundOffFormMarkup;
  }
}

SoundOffForm.propTypes = {
  submitSoundOff: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  broadcastId: PropTypes.string.isRequired,
  authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps, { submitSoundOff })(
  withStyles(styles)(SoundOffForm)
);
