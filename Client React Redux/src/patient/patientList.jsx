import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getList, showUpdate, showDelete } from './patientActions'

class PatientList extends Component {

    componentWillMount() {
        this.props.getList()
    }
    
    renderRows() {
        const list = this.props.list || []
        return list.map(pat => (
            <tr key={pat.id}>
                <td>{pat.nome}</td>
                <td>{pat.telefone}</td>
                <td>{pat.email}</td>
                <td>
                    <button className='btn btn-warning' onClick={() => this.props.showUpdate(pat)}>
                        <i className='fa fa-pencil'></i>
                    </button>
                    <button className='btn btn-danger' onClick={() => this.props.showDelete(pat)}>
                        <i className='fa fa-trash-o'></i>
                    </button>
                </td>
            </tr>
        ))
    }

    render() {
        return (
            <div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Telefone</th>
                            <th>Email</th>
                            <th className='table-actions'>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderRows()}
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = state => ({list: state.patient.list})
const mapDispatchToProps = dispatch => bindActionCreators({getList, showUpdate, showDelete}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(PatientList)