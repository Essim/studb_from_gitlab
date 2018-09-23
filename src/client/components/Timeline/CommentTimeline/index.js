import React, {Component} from 'react';

export default class CommentTimeline extends Component{

    render(){
        return(
            <li className={"version"+this.props.version+ (this.props.current?" collapse in":" collapse")}>
                <i className="fa fa-comments bg-blue" data-toggle="collapse" data-target={"#commentTime"+this.props.version}></i>

                <div id={"commentTime"+this.props.version} className="timeline-item collapse in">
                    <span className="time"><i className="fa fa-clock-o"></i> {this.props.dateLastComment}</span>

                    <h3 className="timeline-header"><a className="text-blue">{this.props.comment}</a> Commentaires pour cette version </h3>
                    {this.props.commented ?
                        <div className="timeline-body">
                            Vous avez commenté cette version
                        </div>
                        : ""}
                </div>
            </li>
        );
    }
}