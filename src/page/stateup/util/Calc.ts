import * as React from "react";

export function tryConvert(temperature: string, convert: (i: number) => number): string {
    const input = parseFloat(temperature);

    if (isNaN(input)) {
        return ''
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
}

export function toCelsius(fahrenheit: number) {
  return (fahrenheit - 32) * 5 / 9;
}

export function toFahrenheit(celsius: number) {
  return (celsius * 9 / 5) + 32;
}