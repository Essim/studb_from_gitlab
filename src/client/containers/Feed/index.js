import React, {Component} from "react"
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {fetchFeed} from "./action"
import {AVAILABLE_FILTER_OPTIONS} from "../../constants";
import PostPreview from "../../components/PostPreview";


class FeedContainer extends Component {

    static propTypes = {
        fetchFeed: PropTypes.func.isRequired,

        user: PropTypes.object.isRequired,
        connected: PropTypes.bool.isRequired,
        feed: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            ...this.state,
            filter: AVAILABLE_FILTER_OPTIONS.FEED_FILTER_NEWEST,
        };

        // TODO:  Ajouter feed par cours / url / tags
        this.props.fetchFeed([]);
    }

    /**
     *  Update state context
     */
    handleChangeFilter(e) {
        const filter = e.target.value;
        this.setState({filter});
    }

    /**
     * Get documents, ordered or filtered by [state.filter]
     * @param filter
     * @returns {*}
     * TODO: with more db infos, more filtering (user, dates, ...)
     */
    getDocuments(filter) {
        const documents = this.props.feed.documents ? this.props.feed.documents : [];

        switch (filter) {
            case AVAILABLE_FILTER_OPTIONS.FEED_FILTER_POPULAR:
                return documents.map(document => {
                    const votes = document.opinions.filter(opinion => !opinion.report).reduce((acc, val) => {
                        acc[ (val.state) ? "upvotes" : "downvotes" ]++;

                        return acc;
                    }, { upvotes : 0, downvotes : 0 });

                    if ((votes.upvotes + votes.downvotes) !== 0)
                        document['$_internalOrderingKey'] = (votes.upvotes - votes.downvotes) / ((votes.upvotes + votes.downvotes)) * (Math.log10((votes.upvotes + votes.downvotes)) + 1);
                    else
                        document['$_internalOrderingKey'] = 0;

                    return document;
                }).sort((a, b) => {
                    return b['$_internalOrderingKey'] - a['$_internalOrderingKey'];
                });
            case AVAILABLE_FILTER_OPTIONS.FEED_FILTER_NEWEST:
                return documents.sort((a,b) => {
                    return (new Date(b.date).getTime()) - (new Date(a.date).getTime());
                });
            case AVAILABLE_FILTER_OPTIONS.FEED_FILTER_PERSONAL:
                if (!this.props.connected) {
                    return documents;
                }
                // TODO : CHECK IF WE HAVE COMMENTED, LIKED
                return documents.filter((document) => document.cuid_author === this.props.user.cuid);
            default:
                return documents;
        }
    }

    /**
     * Render une liste de document sur base du store
     */
    renderDocuments() {
        if (this.props.feed.loading)
            return (<p>Feed is loading</p>);

        if (this.props.feed.error)
            return (<p>Error loading feed {this.props.feed.error}</p>);

        const docs = this.filterBySearch(this.getDocuments(this.state.filter));

        if (docs.length === 0)
            return (<p>No document in this feed</p>);


        return (docs.filter(document => !document.logicalDelete).map((document) => <PostPreview showComments={ false } isRow={ true } colXs="7" colXsOffset="2" key={"preview_" + document.cuid} document={document} />));
    }

    filterBySearch(documents) {
        if (this.props.feed.search.length === 0)
            return documents;

        const filtred = [];

        documents.forEach((doc)=>{
            let haveAllTags = true;
            for(let tag of this.props.feed.search){
                let haveTag = false;

                doc.tags.map((tagObject)=>{
                    if(tagObject.name === tag.value)
                        haveTag = true;
                });

                if(haveTag ||
                    doc.description.includes(tag.value) ||
                    doc.name.includes(tag.value) ||
                    doc.name_author.includes(tag.value))
                        haveTag = true;

                if(!haveTag){
                    haveAllTags = false;
                    break;
                }
            };
            if(haveAllTags)
                filtred.push(doc);
        });
        return filtred;

    }



    /**
     * Render la page principale
     */
    render() {
        return [
            <div key="FeedContainer" className="row">
                <div className="col-xs-12">
                    <div className="form-group form-inline pull-right">
                        Trier par &nbsp;
                        <select className="form-control" defaultValue={this.state.filter}
                            onChange={this.handleChangeFilter.bind(this)}>
                        {Object.keys(AVAILABLE_FILTER_OPTIONS).map((key) =>
                            <option key={"feed_filter_" + key} value={AVAILABLE_FILTER_OPTIONS[key]}>
                                {AVAILABLE_FILTER_OPTIONS[key]}
                            </option>
                        )}
                        </select>
                    </div>
                </div>
            </div>,
            this.renderDocuments(),
        ]
    }
}

const mapStateToProps = (state) => {
    return {
        feed: state.documentFeed,
        user: state.signin.user,
        connected: state.signin.connected
    }
};

const mapDispatchToProps = {
    fetchFeed,
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedContainer);
