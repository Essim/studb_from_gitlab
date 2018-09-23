import React, {Component} from 'react';
import marked from 'marked';
import PropTypes from 'prop-types';


export default class MarkdownArea extends Component {

    static PropTypes = {
        content: PropTypes.string.isRequired,
    };

    constructor(props) {
        super(props);
        marked.setOptions({
            gfm: true,
            tables: true,
            breaks: false,
            pedantic: false,
            sanitize: true,
            smartLists: true,
            smartypants: false,
        });
    }

    render() {
        const markdown = {__html: marked(this.props.content || '')};
        return (<div dangerouslySetInnerHTML={markdown}></div>);
    }
}
