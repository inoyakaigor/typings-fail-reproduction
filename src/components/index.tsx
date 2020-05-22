import React, {Component} from 'react'

import css from './index.styl'

class Status extends Component {
    render() {
        return <section className={`${css.page} schedule`}>
            Failed watch build
        </section>
    }
}

export default Status
