import * as React from "react";

let Excel = React.createClass({
    displayName: "Excel",
    getInitialState: function() {
        return { 
            data: this.props.initialData,
            sortby: null,
            descending: false,
            edit: null, // [row index, cell index]
            search: false
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
    _preSearchData: null,
    _toggleSearch: function () {
        if (this.state.search) {
            this.setState({
                data: this._preSearchData,
                search: false
            });
            this._preSearchData = null;
        } else {
            this._preSearchData = this.state.data;
            this.setState({
                search: true
            });
        }
    },
    _search: function (e: any) {
        let needle = e.target.value.toLowerCase();
        if (!needle) {
            this.setState({data: this._preSearchData});
            return;
        }
        let idx = e.target.dataset.idx;
        let searchdata = this._preSearchData.filter(function(row: any) {
            return row[idx].toString().toLowerCase().indexOf(needle) > -1;
        });
        this.setState({data: searchdata});
    },
    _sort: function (e: React.MouseEvent<HTMLTableHeaderCellElement>) {
        let column = (<HTMLTableHeaderCellElement>e.target).cellIndex;
        let data = this.state.data.slice();
        let descending = this.state.sortby === column && !this.state.descending;
        data.sort((a:string[], b:string[]) => {
            return descending? 
                (a[column] > b[column] ? 1: -1):
                (a[column] < b[column] ? 1: -1)
        });
        this.setState({
            data: data,
            sortby: column,
            descending: descending
        })
    },
    _showEditor: function (e: React.MouseEvent<HTMLTableDataCellElement>) {
        this.setState({ edit: {
            row: parseInt(<string>(<HTMLTableDataCellElement>e.target).dataset.row, 10),
            cell: (<HTMLTableDataCellElement>e.target).cellIndex
        }})
    },
    _save: function (e:any) {
        e.preventDefault();
        let input = e.target.firstChild;
        let data = this.state.data.slice();
        data[this.state.edit.row][this.state.edit.cell] = input.value;
        this.setState({
            edit: null,
            data: data
        })
    },
    _renderToolbar: function () {
        return React.DOM.div({className: 'toolbar'}, 
            React.DOM.button(
                {
                    onClick: this._toggleSearch,
                    className: 'toolbar',
                }, 
                "search"
            ),
            React.DOM.a({
                onClick: this._download.bind(this, 'json'),
                href: 'data.json'
            }, "expot json "),
            React.DOM.a({
                onClick: this._download.bind(this, 'csv'),
                href: 'data.csv'
            }, "expot csv ")
        )
    },
    _renderSearch: function () {
        if (!this.state.search) {
            return null;
        }
        return (
            React.DOM.tr({onChange: this._search}, 
                this.props.headers.map(function (_: string, idx: number) {
                    return React.DOM.td({ key:  idx }, 
                        React.DOM.input(<any>{
                            type: "text",
                            "data-idx": idx
                        })
                    );
                })
            )
        )
    },
    _download: function(format: string, ev: Event) {
          var contents = format === 'json'
            ? JSON.stringify(this.state.data)
            : this.state.data.reduce(function(result: string, row: string[]) {
                return result
                + row.reduce(function(rowresult, cell, idx) {
                    return rowresult
                        + '"'
                        + cell.replace(/"/g, '""')
                        + '"'
                        + (idx < row.length - 1 ? ',' : '');
                    }, '')
                + "\n";
            }, '');

        var URL = window.URL; //|| window.webkitURL;
        var blob = new Blob([contents], {type: 'text/' + format});
        (<HTMLAnchorElement>ev.target).href = URL.createObjectURL(blob);
        (<HTMLAnchorElement>ev.target).download = 'data.' + format;
    },
    _renderTable: function () {
        return (
            React.DOM.table(null, 
                React.DOM.thead({ onClick: this._sort }, 
                    React.DOM.tr(null, 
                        this.props.headers.map((title: string, idx: number) => {
                            if (this.state.sortby === idx) {
                                title += this.state.descending ? ' \u2191' : ' \u2193';
                            }
                            return React.DOM.th({key: idx}, title);
                        }, this)
                    )
                ),
                React.DOM.tbody({ onDoubleClick: this._showEditor }, 
                    this._renderSearch(),
                    this.state.data.map((row: any, rowidx: number) => {
                        return (
                            React.DOM.tr({key: rowidx},
                                row.map((cell: string, idx: number) => {
                                    let content: string | any = cell;
                                    let edit = this.state.edit;

                                    if (edit && edit.row === rowidx && edit.cell === idx) {
                                        content = React.DOM.form({ onSubmit: this._save },
                                            React.DOM.input({
                                                type: "text",
                                                defaultValue: content
                                            })
                                        )
                                    }
                                    return React.DOM.td(<any>{ 
                                        key: idx,
                                        'data-row': rowidx
                                    }, content);
                                }, this)
                            )
                        )
                    }, this)
                ) 
            )
        )
    },
    render: function () {
        return (
            React.DOM.div(null, 
                this._renderToolbar(),
                this._renderTable()
            )
        ) 
    }
})

export {Excel};