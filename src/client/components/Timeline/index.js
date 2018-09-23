import React, {Component} from 'react';
import VersionTimeline from "./VersionTimeline";
import LikeTimeline from "./LikeTimeline/index";
import DislikeTimeline from "./DislikeTimeline/index";
import CommentTimeline from "./CommentTimeline/index";
import {genericPrintDate} from "../../util/dateHandler";

export default class Timeline extends Component{

    constructor(props){
        super(props);
    }

    allVersion(){
        return this.props.versions.map((version, i)=>{
            const numberVersion = this.props.versions.length-i;

            const likes = version.opinions.filter((opinion) =>
                opinion.logicalDelete === false && opinion.report === false && opinion.state === true
            );
            const liked = (this.props.user != "" ? likes.filter(opinion => opinion.cuid_author == this.props.user).length:0)>0;

            const dislikes = version.opinions.filter((opinion) =>
                opinion.logicalDelete === false && opinion.report === false && opinion.state === false
            );
            const disliked = (this.props.user != "" ? dislikes.filter(opinion => opinion.cuid_author == this.props.user).length:0)>0;

            const comments = version.comments.filter((comment) => comment.logicalDelete === false);
            const commented = (this.props.user != "" ? comments.filter(comment => comment.cuid_author == this.props.user).length:0)>0;

            return [
            <VersionTimeline key={"versionTimeline"+numberVersion} cuid={version.cuid} version={numberVersion} current={version.cuid == this.props.current}/>,
                likes.length>0?<LikeTimeline key={"likeTimeline"+numberVersion} current={version.cuid == this.props.current} dateLastLike={genericPrintDate(likes.reverse()[0].date)} version={numberVersion} like={likes.length} liked={liked}/>:"",
                dislikes.length>0?<DislikeTimeline key={"dislikeTimeline"+numberVersion} current={version.cuid == this.props.current} dateLastDisLike={genericPrintDate(dislikes.reverse()[0].date)} version={numberVersion} dislike={dislikes.length} disliked={disliked}/>:"",
                comments.length>0?<CommentTimeline key={"commentTimeline"+numberVersion} current={version.cuid == this.props.current} dateLastComment={genericPrintDate(comments.reverse()[0].date)} version={numberVersion} comment={comments.length} commented={commented}/>:"",
        ]});
    }

    render(){
        return (
            <ul className="timeline">
                {this.allVersion()}
                <li>
                    <i className="fa fa-clock-o bg-gray"></i>
                </li>
            </ul>
        )
    }
}