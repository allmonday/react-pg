import * as React from "react";

interface InputStates {
    value: string
    default: string
}

export class Input extends React.Component<undefined, InputStates> {
    constructor() {
        super()
        this.state = {
            value: '',
            default: ''
        };
    }
    log(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            value: event.target.value,
            default: event.target.defaultValue
        })
    }
    render() {
        return <div>
                <p>value and defaultValue</p>
                <input defaultValue="hello" onChange={this.log.bind(this)} />
                <p>value: {this.state.value}</p>
                <p>defaultValue: {this.state.default}</p>
            </div>
    }
}