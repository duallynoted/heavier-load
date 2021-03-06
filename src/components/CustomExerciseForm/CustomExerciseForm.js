import React, { Component } from 'react';
import { connect } from 'react-redux';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import NewDayForm from '../NewDayForm/NewDayForm';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PositionedSnackbar from '../PositionedSnackBar/PositionedSnackBar';

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 4,
        paddingBottom: theme.spacing.unit * 3,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 'flex',
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
});

class CustomExerciseForm extends Component {
    state = {
        newExercise: {
            title: '',
            weight_load: 0,
            rep_scheme: '',
            day_id: 0,
        },
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
    };

    handleChangeFor = propertyName => event => {
        console.log('event logging')
        this.setState({
            newExercise: {
                ...this.state.newExercise,
                [propertyName]: event.target.value,
            }
        });
    };
    handleSelectChange = (event) => {
        this.setState({
            newExercise: {
                ...this.state.newExercise,
                day_id: Number(event.target.value),
            }
        });

        console.log('DAY', event.target.value);

    }

    handleExerciseSubmit = (event) => {
        event.preventDefault();
        this.props.dispatch({ type: 'ADD_EXERCISE', payload: this.state.newExercise })
        this.setState({
            newExercise: {
                ...this.state.newExercise,
                title: '',
                weight_load: 0,
                rep_scheme: '',
            },
            open: true,
        });
        console.log('LOOOOK', this.state.newExercise);
    };

    handleClothes = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes } = this.props;
        return (
            <div>
                <NewDayForm />
                <br />
                <br />
                <Typography id="weightRoom" variant="h5" component="h3">
                    Create Your Exercise with a Title, Weight Load, Rep Scheme, and Workout Day
                     </Typography>
                <form>
                    <FormControl className={classes.container} noValidate autoComplete="off">
                        <TextField
                            label="Exercise"
                            className={classes.textField}
                            value={this.state.newExercise.title}
                            onChange={this.handleChangeFor('title')}
                            margin="normal"
                        />
                        <TextField
                            label="Weight"
                            className={classes.textField}
                            value={this.state.newExercise.weight_load}
                            onChange={this.handleChangeFor('weight_load')}
                            margin="normal"
                        />
                        <TextField
                            label="Rep Scheme (2x15, 3x10, etc)"
                            className={classes.textField}
                            value={this.state.newExercise.rep_scheme}
                            onChange={this.handleChangeFor('rep_scheme')}
                            margin="normal"
                        />
                        <Select value={this.state.newExercise.day_id} onChange={this.handleSelectChange}>
                            <MenuItem value={0}>{this.props.reduxState.user.first_name}'s next exercise</MenuItem>
                            {this.props.reduxState.daysReducer.map(day => {
                                return <MenuItem value={day.id} key={day.id}>{day.name}</MenuItem>
                            })}
                        </Select>
                        <Button onClick={this.handleExerciseSubmit} type="submit" value='Submit' color="primary">Add Exercise</Button>
                    </FormControl>
                    <PositionedSnackbar
                        message={"Exercise Created. Let's do this!"}
                        vertical={this.state.vertical}
                        horizontal={this.state.horizontal}
                        open={this.state.open}
                        handleClothes={this.handleClothes}
                    />
                </form>
            </div>
        );
    }
}

CustomExerciseForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = reduxState => ({
    reduxState,
});

const customExerciseStyles = withStyles(styles)(CustomExerciseForm)


export default connect(mapStateToProps)(customExerciseStyles);