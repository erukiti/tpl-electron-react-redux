import React from 'react'

export default class App extends React.Component {
    render() {
        return <div>
            <span>{this.props.count}</span>
            <button onClick={this.props.handleAdd}>ADD</button>
        </div>
    }
}
