import React, { Component } from "react";

export class SortRow extends Component {

    render() {
        return (
            <div className="row">
                <div className="col-xs-9"> </div>
                <div className="col-xs-3">
                    <div className="form-group form-inline">
                        Trier par &nbsp;
                        <select className="form-control">
                            <option>Nouveau</option>
                            <option>Populaire</option>
                            <option>Mes contributions</option>
                        </select>
                    </div>
                </div>
            </div>
        );
    }
}

export default SortRow;
