import * as React from "react";
import * as ReactDOM from "react-dom";

import {Input} from "./view/Input";
import {Textarea} from "./view/Textarea";
import {Select} from "./view/Select";

const selected = "move";

ReactDOM.render(
    <div>
        <Input />
        <Textarea />
        <Select selectValue={selected}/>
    </div>,
    document.getElementById("app"));