import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { reducer as toastrReducer } from 'react-redux-toastr'

import TabReducer from '../common/tab/tabReducer'
import PatientReducer from '../patient/patientReducer'

const rootReducer = combineReducers({
    tab: TabReducer,
    patient: PatientReducer,
    form: formReducer,
    toastr: toastrReducer
})

export default rootReducer