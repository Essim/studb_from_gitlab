import React, {Component} from 'react';

export default class LikeTimeline extends Component{

    render(){
        return(
            <li className={"version"+this.props.version+ (this.props.current?" collapse in":" collapse")}>
                <i className="fa fa-thumbs-up bg-green" data-toggle="collapse" data-target={"#likeTime"+this.props.version}></i>

                <div id={"likeTime"+this.props.version} className="timeline-item collapse in">
                    <span className="time"><i className="fa fa-clock-o"></i> {this.props.dateLastLike}</span>

                    <h3 className="timeline-header"><a className="text-green">{this.props.like}</a> Like pour cette version </h3>
                    {this.props.liked ?
                        <div className="timeline-body">
                            Vous avez like cette version
                        </div>
                    : ""}
                </div>
            </li>
        );
    }
}