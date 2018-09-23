import React, {Component} from 'react';

export default class DislikeTimeline extends Component{

    render(){
        return(
            <li className={"version"+this.props.version+ (this.props.current?" collapse in":" collapse")}>
                <i className="fa fa-thumbs-down bg-red" data-toggle="collapse" data-target={"#dislikeTime"+this.props.version}></i>

                <div id={"dislikeTime"+this.props.version} className="timeline-item collapse in">
                    <span className="time"><i className="fa fa-clock-o"></i> {this.props.dateLastDislike}</span>

                    <h3 className="timeline-header"><a className="text-red">{this.props.dislike}</a> Dislike pour cette version </h3>
                    {this.props.disliked ?
                        <div className="timeline-body">
                            Vous avez dislike cette version
                        </div>
                        : ""}
                </div>
            </li>
        );
    }
}