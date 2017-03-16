import * as React from "react";

interface SelectState {
    value: string
}

interface SelectProp {
    selectValue: string
}

export class Select extends React.Component<SelectProp, SelectState> {
    constructor(props: SelectProp) {
        super(props)
        this.state = {
            value: props.selectValue || ""
        }
    }
    _onChange(event: React.ChangeEvent<HTMLSelectElement>) {
        this.setState({
            value: event.target.value
        })
    }

    render() {
        return <div>
            <select defaultValue={this.state.value} onChange={this._onChange.bind(this)}>
                <option value="stay">Should i stay</option>
                <option value="move">or should i go</option>
                <option value="trouble">if i stay it will be trouble</option>
            </select>
            <pre>{this.state.value}</pre>
        </div>
    }
}