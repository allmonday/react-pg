import * as React from "react";

let Excel = React.createClass({
    displayName: "Excel",
    getInitialState: function() {
        return { 
            data: this.props.initialData,
            sortby: null,
            descending: false
        }
    },
    propTypes: {
        headers: React.PropTypes.arrayOf(React.PropTypes.string),
        initialData: React.PropTypes.arrayOf(
            React.PropTypes.arrayOf(
                React.PropTypes.string
            )
        )
    },
    _sort: function (e: React.MouseEvent<HTMLTableHeaderCellElement>) {
        let column = (<HTMLTableHeaderCellElement>e.target).cellIndex;
        let data = this.state.data.slice();
        let descending = this.state.sortby === column && !this.state.descending;
        data.sort((a:string[], b:string[]) => {
            return descending? 
                a[column] > b[column]:
                a[column] < b[column]
        });
        this.setState({
            data: data,
            sortby: column,
            descending: descending
        })
    },
    render: function () {
        return (
            React.DOM.table(null, 
                React.DOM.thead({ onClick: this._sort }, 
                    React.DOM.tr(null, 
                        this.props.headers.map((title: string, idx: number) => {
                            return React.DOM.th({key: idx}, title);
                        })
                    )
                ),
                React.DOM.tbody(null, 
                    this.state.data.map((row: any, idx: number) => {
                        return (
                            React.DOM.tr({key: idx},
                                row.map((cell: string, idx: number) => {
                                    return React.DOM.td({ key: idx}, cell);
                                })
                            )
                        )
                    })
                ) 
            )
        )
    }
})

export {Excel};