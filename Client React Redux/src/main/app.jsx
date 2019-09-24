import '../common/template/dependencies'
import React from 'react'

import Header from '../common/template/header'
import Messages from '../common/msg/messages'

export default props => (
    <div className='wrapper'>
        <Header />
        <div className='content-wrapper'> 
            {props.children}
        </div>
        <Messages />
    </div>
)