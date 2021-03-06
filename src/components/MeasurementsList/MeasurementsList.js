import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TrackChangesIcon from '@material-ui/icons/TrackChanges';


const styles = theme => ({
    root: {
        width: '62%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
        //change below
        height: 'auto',
        margin: '20px auto',
        padding: '2px',
        borderRadius: '2px',
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    table: {
        minWidth: 100,
        marginRight: theme.spacing.unit * 4,
    },
    tableBody: {
        width: 'flex',
    },
});


class MeasurementsList extends Component {
    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_USER', payload: this.props.reduxState.user })
        console.log('MEASUREMENTSREDUXSTATE: ', this.props.reduxState.user);

    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow >
                                <TableCell><TrackChangesIcon /></TableCell>
                                <TableCell numeric>Body Area</TableCell>
                                <TableCell numeric>Measurement</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className={classes.tableBody}>
                            {this.props.reduxState.measurementsListReducer.map(measurement => {
                                return (
                                    <TableRow key={measurement.id}>
                                        <TableCell></TableCell>
                                        <TableCell >{measurement.body_area}</TableCell>
                                        <TableCell numeric>{measurement.measurement}''</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        );
    }
}
MeasurementsList.propTypes = {
    classes: PropTypes.object.isRequired,
};
const measurementTable = withStyles(styles)(MeasurementsList);

const mapStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapStateToProps)(measurementTable);







