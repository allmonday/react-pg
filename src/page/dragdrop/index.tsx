import * as React from "react";
import * as ReactDOM from "react-dom";
import { DndList } from "./view/List";

const list = ["a", "b", "c", "d", "e"];

ReactDOM.render(
    <div>
        <DndList list={list} draggable={true}/>
        <br/>
        {/*<DndList list={list} draggable={false}/>*/}
    </div>,
    document.getElementById("app")
)