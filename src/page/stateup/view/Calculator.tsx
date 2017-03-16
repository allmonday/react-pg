import * as React from "react";
import {CalcState } from "../model/CalcModel";
import {TemperatureInput} from "./TemperatureInput"
import {tryConvert, toCelsius, toFahrenheit} from "../util/Calc"

function BoilingVerdict(props: {celsius: number}) {
    if (props.celsius >= 100) {
        return <p>The water would boil.</p>;
    }
    return <p>The water would not boil.</p>;
}

export class Calculator extends React.Component<undefined, CalcState> {
    constructor() {
        super()
        this.state = {
            temperature: '',
            scale: 'c'
        }
    }
    handleCelsiusChange(temerature: string) {
        this.setState({ scale: 'c', temperature: temerature})
    }
    handleFahrenheitChange(temerature: string) {
        this.setState({ scale: 'f', temperature: temerature})
    }

    render() {
        const scale = this.state.scale;
        const temperature = this.state.temperature;
        const celsius = scale === 'f' ? tryConvert(temperature, toCelsius): temperature;
        const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit): temperature ;

        return (
            <div>
                <TemperatureInput scale="c" temperature={celsius} onTemperatureChange={this.handleCelsiusChange.bind(this)}/>
                <TemperatureInput scale="c" temperature={fahrenheit} onTemperatureChange={this.handleFahrenheitChange.bind(this)}/>
                <BoilingVerdict celsius={parseInt(temperature)}/>
            </div>
        )
    }
}