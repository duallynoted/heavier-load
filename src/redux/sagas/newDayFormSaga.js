import axios from 'axios';
import { put, takeLatest, call } from 'redux-saga/effects';


function* addNewDay(action) {
    try {
        yield call(axios.post, `/profile/days/${action.payload.id}`, action.payload);
        yield put({ type: 'FETCH_USER' });
        console.log('ACTIONDOTPAYLOAD', action.payload);
        
    } catch (error) {
        console.log('error adding measurement', error);
    }
};

function* addDay() {
    yield takeLatest('ADD_DAY', addNewDay);
  }

export default addDay;
