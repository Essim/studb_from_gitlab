import React, { Component } from "react";
import DocViewer from '../../local_modules/itsa-react-docviewer/src/component';
import {connect} from "react-redux";
import PropTypes from "prop-types";

export class FilePreview extends Component {
    componentDidMount(){
        
    }

    render() {
        if (!this.props.selected_file) { // evaluates to true if currentVideo is null
            return <div>Loading...</div>;
        }
        if(this.props.selected_file.type.split("/")[0]==="image"){
            return (
                <div className="divImgPreview">
                    <img   src={this.props.selected_file.path} alt={this.props.selected_file.name} />
                </div>
            );
        }
        return (
            <div>
                <DocViewer src={this.props.selected_file.path} allowFullScreen={false} />
            </div>
        );
    }
    //  <DocViewer src={this.props.selected_file.path} allowFullScreen={false} />

}
FilePreview.propTypes = {
    doc_cuid: PropTypes.string.isRequired,
    selected_file:PropTypes.object.isRequired,
};

function mapStateToProps(state,ownprops) {
    let selected_file = typeof ownprops.selected_file === "function" ? ownprops.selected_file() : ownprops.selected_file;
    if(state.documentFeed.documents!==undefined){
        state.documentFeed.documents.forEach(function (document) {
            if(document.cuid === ownprops.doc_cuid && document.selected_file!==undefined){
               selected_file = (typeof document.selected_file === "function"
                   ? document.selected_file()
                   : document.selected_file);
            }
        });
    }

    return {
        selected_file,
    };

}
export default connect(mapStateToProps)(FilePreview);

