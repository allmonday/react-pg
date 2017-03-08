import * as React from "react";
import * as ReactDOM from "react-dom";

let MyComponent = React.createClass({
    propTypes: {
        name: React.PropTypes.string.isRequired
    },
    getDefaultProps: function () {
        return {
            name: "tangkikodo"
        }
    },
    render: function () {
        return React.DOM.span(null, "my name is " + this.props.name)
    }
})

ReactDOM.render(
    React.createElement(MyComponent, {
        name: "tangkikodo"
    }), 
    document.getElementById("app")
)

// ReactDOM.render(
//     React.DOM.h1({
//         id: "hello-world",
//         style: {
//             background: "black",
//             color: "#fff",
//             textAlign: "center"
//         }
//     }, "Hello world"),
//     document.getElementById("app")
// )