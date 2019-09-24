import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import { reset as resetForm, initialize } from 'redux-form'
import { showTabs, selectTab } from '../common/tab/tabActions'

const BASE_URL = 'https://unwk79lpn0.execute-api.us-east-2.amazonaws.com/dev'
const INITIAL_VALUES = { 
    id: '',
    nome : '',
    cpf: '',
    nascimento: '',
    email: '',
    telefone: '',
    plano: '',
    nrCarteira: ''
}

export function getList() {
    const request = axios.get(`${BASE_URL}/patients`)
    return {
        type: 'PATIENT_FETCHED',
        payload: request
    }
}

export function create(values) {
    return dispatch => {
        axios['post'](`${BASE_URL}/patient`, values)
            .then(resp => {
                toastr.success('Sucesso', 'Operação Realizada com sucesso.')
                dispatch(init())
            })
            .catch(e => {
                e.response.data.errors.forEach(error => toastr.error('Erro', error))
            })
    }
}

export function update(values) {
    return submit(values, 'put')
}

export function remove(values) {
    return submit(values, 'delete')
}

function submit(values, method) {
    return dispatch => {
        const id = values.id ? values.id : ''
        axios[method](`${BASE_URL}/patient/${id}`, values)
            .then(resp => {
                toastr.success('Sucesso', 'Operação Realizada com sucesso.')
                dispatch(init())
            })
            .catch(e => {
                e.response.data.errors.forEach(error => toastr.error('Erro', error))
            })
    }
}

export function showUpdate(patient) {
    return [
        showTabs('tabUpdate'),
        selectTab('tabUpdate'),
        initialize('patientForm', patient)
    ]
}

export function showDelete(patient) {
    return [
        showTabs('tabDelete'),
        selectTab('tabDelete'),
        initialize('patientForm', patient)
    ]
}

export function init() {
    return [
        showTabs('tabList', 'tabCreate'),
        selectTab('tabList'),
        getList(),
        initialize('patientForm', INITIAL_VALUES)
    ]
}