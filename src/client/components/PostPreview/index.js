import React, {Component} from "react";
import { connect } from "react-redux";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import Gravatar from 'react-gravatar';
import FilePreview from "../FilePreview/index";
import PostComment from "../PostComment/index";
import Comments from "../Comments/index";
import Opinions from "../Opinions/index";
import {getDivision, getCourse} from "../Navbar/reducer";
import {genericPrintDate} from "../../util/dateHandler";
import BrowserFile from "../BrowserFile";
import {searchFeed} from "../../containers/Feed/action";
import {SERVER_URL} from "../../constants";
import MarkdownArea from "../MarkdownArea";

export class PostPreview extends Component {

    static propTypes = {
        document: PropTypes.object.isRequired,
        divisions: PropTypes.array.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            showComments : this.props.showComments,
        };

        this.toggleComments = this.toggleComments.bind(this);
    }

    toggleComments(e) {
        e.preventDefault();
        this.setState({
            showComments: !this.state.showComments
        });
    }

    chooseFileToPreview(){
        if(this.props.document.isRep){
            return this.props.document.files._contents[0];

        }
        return this.props.document.files;
    }

    chooseFileToDownload(){
        return this.props.document.path + (this.props.document.isRep ? ".zip" : "");
    }

    renderFilebrower(){
        if(this.props.document.isRep){
            return( <BrowserFile doc_cuid={this.props.document.cuid} files={this.props.document.files}/>)
        }
    }

    renderComments () {

        if (!this.state.showComments) {
            return (<div className="box-footer">
                <a href="#" className="text-center" onClick={this.toggleComments}>
                    Afficher les commentaires
                </a>
            </div>)
        }
        return [
            (<div className="box-footer box-comments">
                <Comments comments={this.props.document.comments} mainComments />
            </div>),
            (<div className="box-footer">
                <PostComment document={this.props.document.cuid}/>
            </div>)
        ];
    }

    updateSearch(name){
        let toAddName = true;
        console.log(this.props);
        this.props.feed.search.forEach((option)=>{
            if(option.value === name)
                toAddName = false;
        });

        if(toAddName)
            this.props.searchFeed([...this.props.feed.search,{label:name,value:name}]);
    }

    render() {
        const division = getDivision(
            this.props.divisions,
            this.props.document.cuid_division);


        const course = getCourse(this.props.divisions,
            this.props.document.cuid_division,
            this.props.document.cuid_course);

        return (
            <div className={this.props.isRow?"row":""}>
                <div className={"col-xs-"+this.props.colXs+" col-xs-offset-"+this.props.colXsOffset}>
                    <div className="box box-widget">
                        <div className="box-header with-border">
                            <div className="user-block">
                                <Gravatar email={this.props.document.name_author} default="identicon" className="img-circle" />
                                <span className="username">
                                    <Link to={`/user/stats/${this.props.document.name_author}`}>
                                        { this.props.document.name_author }
                                    </Link>
                                </span>
                                <span className="description">
                                    { division ? division.acronym + " - " : ""}
                                    { course ? course.name: (<i>Cours inconnu</i>) } -
                                    { genericPrintDate(this.props.document.date) }
                                </span>
                                <span className="comment">
                                    { this.props.document.tags.map((tag) => {
                                        return (<a  onClick={()=>{this.updateSearch(tag.name);}} key={"linkto"+tag.cuid} style={{cursor : "pointer"}}>#{tag.name}</a>);
                                    }).reduce((prev, curr) => [prev, ' ', curr], "") }
                                </span>
                            </div>
                            <div className="box-tools">
                                <button type="button" className="btn btn-box-tool" data-toggle="tooltip" title="Consulter">
                                    <Link to={{
                                        pathname: '/document/'+this.props.document.cuid,
                                        state: { document: this.props.document } }}>
                                        <i className="fa fa-expand"/>
                                    </Link>
                                </button>
                            </div>
                        </div>
                        <div className="box-body with-border">
                            <Link to={{
                                pathname: '/document/'+this.props.document.cuid,
                                state: { document: this.props.document } }}>
                                <h2>
                                    {this.props.document.name}
                                    {this.props.document.revisionNumber > 0
                                        ? <small>&nbsp;(Révision n° {this.props.document.revisionNumber})</small>
                                        : ""
                                    }
                                </h2>
                            </Link>
                            <MarkdownArea content={this.props.document.description} />

                        </div>
                        <FilePreview doc_cuid={this.props.document.cuid} selected_file={this.chooseFileToPreview()} />

                        <div className="box-body with-border">
                            <Opinions
                                document={this.props.document}
                                key={"Opinions"+this.props.document.cuid}
                                opinions={this.props.document.opinions}
                                comments={this.props.document.comments}
                                document_cuid={this.props.document.cuid}
                                file_path={this.chooseFileToDownload()}
                                isZip={this.props.document.isRep}
                            />
                        </div>
                        {this.renderFilebrower()}
                        {this.renderComments()}
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        divisions: state.divisions.divisions,
        feed: state.documentFeed,
    }
};

const mapDispatchToProps = {
    searchFeed
};

export default connect(mapStateToProps, mapDispatchToProps)(PostPreview);
