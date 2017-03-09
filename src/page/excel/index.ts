import * as React from "react";
import * as ReactDOM from "react-dom";
import {data, headers} from "./model/Table";
import {TextAreaCounter} from "./view/TextAreaCounter";
import {Excel} from "./view/Excel";

// var myTextAreaCounter = ReactDOM.render(
//     React.createElement(TextAreaCounter, <any>{
//         defaultValue: "tangkikodo"
//     }), 
//     document.getElementById("app")
// )

ReactDOM.render(
    React.createElement(Excel, {
        headers: headers,
        initialData: data,
    }),
    document.getElementById("app")
)