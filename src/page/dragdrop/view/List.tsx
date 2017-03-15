import * as React from "react";
import * as ReactDOM from "react-dom"

import "../style/List.scss";

interface ListProps {
    list: string[],
    draggable: boolean
}

interface ListItem {
    item: string,
}

interface RealElement {
    idx: number,
    height: number
}

interface ListStates {
    currentIdx: number
    above: boolean
    list: ListItem[]
    start: number
    extraKey: number
}

export class DndList extends React.Component<ListProps, ListStates> {
    constructor(props: ListProps) {
        super(props);
        this.state = {
            currentIdx: null,
            above: null,
            start: null,
            list: this.props.list.map((item, idx) => {
                return { item };
            }),
            extraKey: this.props.list.length
        }
    }
    dragStart(idx: number, e: React.DragEvent<HTMLElement>) {
        // e.dataTransfer.effectAllowed = 'move';
        // e.dataTransfer.setData("text/html", e.currentTarget.toString());
        let div = document.createElement("div")
        div.classList.add("dnd-list-item");
        this.setState({
            start: idx
        })
        console.log('start');
    }
    dragEnd(e: DragEvent) {
        console.log('start');
    }
    dragEnter(idx: number, e: DragEvent) {
        console.log('enter');
        this.setState({
            currentIdx: idx
        })
        e.preventDefault();
    }
    dragOver(idx: number, e: React.DragEvent<HTMLElement>) {
        e.preventDefault();
        console.log('over');
        let isabove = this.isAbove(idx, e);
        this.setState({
            above: isabove
        });
    }
    dragDrop(e: DragEvent) {
        let sourceIdx = this.state.start;
        let targetIdx = this.state.currentIdx + (this.state.above? 0: 1);
        let currentList:ListItem[] = Object.create(this.state.list);
        let item = currentList.splice(sourceIdx, 1)[0];
        currentList.splice(targetIdx, 0, item);
        console.log(currentList);
        this.setState({
            list: currentList,
            currentIdx: null,
            above: null,
            start: null
        })
        console.log("drop");
    }
    isAbove(idx: number, e: any): boolean {
        let mouseY = e.nativeEvent.offsetY,
            clientHeight = ReactDOM.findDOMNode(this.refs[idx]).clientHeight,
            middle = clientHeight / 2;
        return mouseY <= middle;
    }
    _dragKeep(e: React.DragEvent<HTMLElement>) {
        e.preventDefault();
    }
    render() {
        return <ul className="dnd-list" >
            {
                this.state.list.map((li, idx) => {
                    let hovered = idx === this.state.currentIdx
                    let hided = idx === this.state.start;
                    let content = <li 
                            draggable={this.props.draggable} 
                            key={idx} 
                            ref={idx.toString()}
                            className={`dnd-list-item ${hovered ? 'hover': ''} ${hided? 'hide':''}`}
                            onDragStart={this.dragStart.bind(this, idx)}
                            onDragOver={this.dragOver.bind(this, idx)}
                            onDragEnter={this.dragEnter.bind(this, idx)}
                            onDrop={this.dragDrop.bind(this)}
                        >{li.item }</li>

                    let placeholder = <li 
                        key={this.state.extraKey} 
                        onDragEnter={this._dragKeep}
                        onDragOver={this._dragKeep}
                        onDrop={this.dragDrop.bind(this)}
                        className="dnd-list-item empty"
                    ></li>

                    if (hovered) {
                        if (this.state.above) {
                            return ( <div key={'z'}>
                                    { placeholder }
                                    { content }
                                </div>)
                        } else {
                            return ( <div key={'z'}>
                                    { content }
                                    { placeholder }
                                </div>)
                        }
                    } else {
                        return content;
                    }
                })
            }
        </ul>;
    }
}