import * as React from "react";

let TextAreaCounter = React.createClass({
    propTypes: {
        defaultValue: React.PropTypes.string
    },
    getDefaultProps: function () {
        return {
            text: ""
        }
    },
    getInitialState: function () {
        return {
            text: this.props.defaultValue
        }
    },
    componentWillReceiveProps: function (newProps) {
        this.setState({
            text: (<any>newProps).defaultValue
        })
    },
    _textChange: function (e: React.FormEvent<HTMLTextAreaElement>) {
        this.setState({
            text: (<HTMLTextAreaElement>e.target).value
        })
    },
    render: function () {
        return React.DOM.div(null, 
            React.DOM.textarea({
                value: this.state.text,
                onChange: this._textChange
            }),
            React.DOM.h3(null, this.state.text.length)
        )
    }
})

export {TextAreaCounter};