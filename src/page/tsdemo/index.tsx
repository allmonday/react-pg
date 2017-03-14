import * as React from "react";
import * as ReactDOM from "react-dom";

import { Hello } from "./view/Hello";


ReactDOM.render(
    <Hello compiler="TypeScript" framework="React" />,
    document.getElementById("app")
);