import * as React from "react";

interface TextareaState {
    value: string
}

const defaultValue: string = "hello\nworld";

export class Textarea extends React.Component<undefined, TextareaState> {
    constructor() {
        super()
        this.state = {
            value: defaultValue
        }
    }

    changeHandler(e: React.ChangeEvent<HTMLTextAreaElement>) {
       this.setState({
           value: e.target.value
       }) 
    }
    render() {
        return <div>
            <textarea defaultValue={defaultValue} onChange={this.changeHandler.bind(this)}></textarea>
            <p>value: </p>
            <pre>{this.state.value}</pre>
        </div>
    }

}