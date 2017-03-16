export interface CalcState {
    temperature: string
    scale: string
}

export const ScaleName: { [key: string]: string} = {
    c: 'Celsius',
    f: 'Fahrenheit'
}