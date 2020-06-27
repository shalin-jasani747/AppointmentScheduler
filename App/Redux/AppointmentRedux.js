import * as _ from 'lodash'
import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  updateAppointment: ['data'],
})

export const AppointmentTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  payload: [
    {id: 1, time: '09:00 am', title: 'Appiontment 1', description: 'Available', isSlotAvailable: true},
    {id: 2, time: '10:00 am', title: 'Appiontment 2', description: 'Available', isSlotAvailable: true},
    {id: 3, time: '11:00 am', title: 'Appiontment 3', description: 'Available', isSlotAvailable: true},
    {id: 4, time: '12:00 pm', title: 'Appiontment 4', description: 'Available', isSlotAvailable: true},
    {id: 5, time: '01:00 pm', title: 'Appiontment 5', description: 'Available', isSlotAvailable: true},
    {id: 6, time: '02:00 pm', title: 'Appiontment 6', description: 'Available', isSlotAvailable: true},
    {id: 7, time: '03:00 pm', title: 'Appiontment 7', description: 'Available', isSlotAvailable: true},
    {id: 8, time: '04:00 pm', title: 'Appiontment 8', description: 'Available', isSlotAvailable: true},
    {id: 9, time: '05:00 pm', title: 'Appiontment 9', description: 'Available', isSlotAvailable: true},
  ]
})

/* ------------- Selectors ------------- */

export const AppointmentSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */


// successful api lookup
export const success = (state, { data }) => {
  const updatedData = _.reject(state.payload,(appointment) => appointment.id == data.id);
  return state.merge({ fetching: false, error: null, payload: _.orderBy([...updatedData, data], ['id'], ['asc'])})
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.UPDATE_APPOINTMENT]: success
})
