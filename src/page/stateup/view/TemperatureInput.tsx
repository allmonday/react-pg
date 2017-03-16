import * as React from "react";
import {ScaleName} from "../model/CalcModel" 

interface InputProp {
    temperature: string
    scale: string
    onTemperatureChange: (value: string) => void
}

export class TemperatureInput extends React.Component<InputProp, undefined> {
    constructor(props: InputProp) {
        super()
    }
    handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.props.onTemperatureChange(e.target.value);
    } 

    render() {
        const temperature = this.props.temperature;
        const scale = this.props.scale;
        return (
            <fieldset>
                <legend>Enter temperature in { ScaleName[scale] }</legend>
                <input value={temperature} onChange={this.handleChange.bind(this)}/>
            </fieldset>
        )
    }
}