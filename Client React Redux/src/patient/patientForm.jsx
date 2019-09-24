import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm, Field, formValueSelector } from 'redux-form'

import { init } from './patientActions'
import LabelAndInput from '../common/form/labelAndInput'

class PatientForm extends Component {

    render() {
        const { handleSubmit } = this.props
        return (
            <form role='form' onSubmit={handleSubmit}>
                <div className='box-body'>
                    <Field name='nome' 
                        component={LabelAndInput} 
                        label='Nome' 
                        cols='12 4' 
                        placeholder='Informe o nome' />
                    <Field name='cpf' 
                        component={LabelAndInput} 
                        label='Cpf' 
                        cols='12 4' 
                        placeholder='Informe o CPF' />
                    <Field name='nascimento' 
                        component={LabelAndInput} 
                        label='Nascimento' 
                        cols='12 4' 
                        placeholder='Informe a data de nasimento' />
                    <Field name='email' 
                        component={LabelAndInput} 
                        type='email' 
                        label='Email' 
                        cols='12 4' 
                        placeholder='Informe o email' />
                    <Field name='telefone' 
                        component={LabelAndInput} 
                        label='Telefone' 
                        cols='12 4' 
                        placeholder='Informe o telefone' />
                    <Field name='plano' 
                        component={LabelAndInput}  
                        label='Plano' 
                        cols='12 4' 
                        placeholder='Informe o plano/convênio' />
                    <Field name='nrCarteira' 
                        component={LabelAndInput}  
                        label='Nrº Carteira' 
                        cols='12 4' 
                        placeholder='Informe o nrº carteira do plano/convênio' />
                </div>
                <div className='box-footer'>
                    <button type='submit' className={`btn btn-${this.props.submitClass}`}>
                        {this.props.submitLabel}
                    </button>
                    <button type='button' className='btn btn-default'
                        onClick={this.props.init}>Cancelar</button>
                </div>
            </form>
        )
    }
}

PatientForm = reduxForm({form: 'patientForm', destroyOnUnmount: false})(PatientForm)
const selector = formValueSelector('patientForm')
const mapStateToProps = state => ({
    id: selector(state, 'id')
})
const mapDispatchToProps = dispatch => bindActionCreators({init}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(PatientForm)