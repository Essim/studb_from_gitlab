import React, { Component } from 'react';
import { connect } from 'react-redux';
import { documentChangeVersion } from "./action";
import Timeline from "../../components/Timeline/index";
import PostPreview from "../../components/PostPreview/index";
import {fetchFeed} from "../Feed/action";


export class Document extends Component {
    constructor(props) {
        super(props);
        //this.props.match.params.cuidDoc
        this.state = {
            docByCuid : new Map(),
            docByMainVersionCuid : new Map(),
            versions:[],
        };
        this.props.documentChangeVersion(this.props.match.params.cuidDoc);
    }

    componentDidMount(){
        this.setState({
            docByCuid : new Map(),
            docByMainVersionCuid : new Map(),
            versions:[],
        });
        if(this.props.feed.documents.length == 0)
            this.props.fetchFeed([]);
    }

    generateMap(){

        const docs = this.props.feed.documents;

        docs.map((doc)=>{
            this.state.docByCuid.set(doc.cuid,doc);
            if(!this.state.docByMainVersionCuid.get(doc.mainVersion))
                this.state.docByMainVersionCuid.set(doc.mainVersion,[doc]);
            else
                this.state.docByMainVersionCuid.get(doc.mainVersion).push(doc);
        });

        //set number of child
        this.state.docByMainVersionCuid.forEach((docsSameVersion, mainCuid)=>{
            docsSameVersion.forEach((doc)=>{
                if(doc.parent_version != "") {
                    const numberChild = this.state.docByCuid.get(doc.parent_version).numberChild;
                    this.state.docByCuid.get(doc.parent_version).numberChild = !numberChild ? 1 : numberChild + 1;
                }else{
                    const numberChild = this.state.docByCuid.get(doc.cuid).numberChild;
                    this.state.docByCuid.get(doc.cuid).numberChild = !numberChild ? 1 : numberChild + 1;
                }
            });
        });
    }

    findLastVersion(){
        const mainVersion = this.state.docByCuid.get(this.props.documentPage.versionCuid).mainVersion;

        //find last version (no child)
        this.state.docByMainVersionCuid.get(mainVersion).forEach((doc)=>{
            if(!doc.numberChild) {
                const temp = [];
                let current = doc;
                // eslint-disable-next-line no-constant-condition
                while(true) {
                    temp.push(current);
                    if(current.parent_version == "")
                        break;
                    current = this.state.docByCuid.get(current.parent_version);
                }
                this.setState({versions:temp});

            }
        });

    }

    renderTimeline(){
        return (<Timeline user={this.props.connected ?this.props.user.cuid:""} versions={this.state.versions} current={this.props.documentPage.versionCuid}/>);
    }

    render(){

        if(this.props.feed.documents.length == 0 && !this.props.feed.loading)
            this.props.fetchFeed([]);


        if( this.props.documentPage.versionCuid != "" && this.props.feed.documents.length != 0){
            if(this.state.docByCuid.size != this.props.feed.documents.length || !this.state.docByCuid.get(this.props.documentPage.versionCuid)){
                this.generateMap();
                this.findLastVersion();
            }
        }

        if(!this.props.documentPage.versionCuid || this.state.docByCuid.size <= 0)
            return(
                <p>loading...</p>
            );
        else {
            return (
                <div className="row">
                    <PostPreview
                        showComments={ true }
                        isRow={false}
                        colXs="9"
                        colXsOffset="0"
                        key={"previewDocumentPage_" + this.state.docByCuid.get(this.props.documentPage.versionCuid).cuid}
                        document={this.props.feed.documents.filter(document => document.cuid == this.props.documentPage.versionCuid)[0]}/>
                    <div className="col-xs-3">
                        {this.renderTimeline()}
                    </div>
                </div>
            )
        }
    }

}

const mapStateToProps = (state) => {
    return {
        documentPage: state.documentPage,
        feed: state.documentFeed,
        user: state.signin.user,
        connected: state.signin.connected,
    };
};

const mapDispatchToProps = {
    documentChangeVersion,
    fetchFeed
};

export default connect(mapStateToProps, mapDispatchToProps)(Document);
