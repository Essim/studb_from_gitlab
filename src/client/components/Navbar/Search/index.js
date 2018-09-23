import React, { Component } from "react";
import {connect} from 'react-redux';
import { Redirect } from "react-router-dom";

import VirtualizedSelect from 'react-virtualized-select';
import styled from 'styled-components';
import {searchFeed} from "../../../containers/Feed/action";

const DivSearch = styled.div`
    padding : 5px;
`;

/*
    TODO: IMPLEMENT SEARCH LOGIC
 */
/*
    TODO: IMPLEMENT SEARCH BY TAG
 */

class Search extends Component {

    constructor(props){
        super(props);
        this.state = {options:[],showDropdown:false};
    }

    componentDidMount(){
        this.urlToSearch(this.props.location.pathname);
    }

    urlToSearch(pathname){
        if(!pathname || !pathname.includes("search") || pathname.split("/").length != 3)
            return;
        const searchTag = pathname.split("/")[2].split("&");
        searchTag.forEach((tag)=>{
            if(tag)
                this.props.feed.search.push({
                    label:tag,
                    value:tag
                });
        });

    }

    generateSearchTag(){
        if (!this.props.feed.loading && this.state.options.length == 0) {

            const docs = this.props.feed.documents;
            const keywords = [];

            docs.map((doc) => {
                doc.tags.map((tag) => {
                    if (!keywords.includes(tag.name)){
                        keywords.push(tag.name);
                        this.state.options.push({
                            label:tag.name,
                            value:tag.name
                        });
                    }
                });

                [...doc.description.split(" "),
                    ...(doc.name_author ? doc.name_author.split(" ") : []),
                    ...doc.name.split(" ")].map((word) => {
                        if (!keywords.includes(word)) {
                            keywords.push(word);
                            this.state.options.push({
                               label:word,
                               value:word
                            });
                        }
                });
            });


        }
    }

    rewriteUrl(){
        let options = this.props.feed.search;

        if(options.length == 0 && this.props.location.pathname.includes("search"))
            return <Redirect to="/"/>;

        else if(options.length > 0) {
            let path = "/search/";
            options.forEach((option) => {
                path += option.value + "&";
            });
            return <Redirect to={path.substring(0, path.length - 1)}/>;
        }
    }

    showDropdown(input) {
        this.setState((prevState) => {
            return {...prevState,showDropdown: input.length>2};
        });
    }


    render() {
        this.generateSearchTag();
        return (
            <DivSearch>
                {this.rewriteUrl()}
                <VirtualizedSelect
                    options={this.state.options}
                    onChange={(selectValue) => {
                        this.props.searchFeed(selectValue);
                    }}
                    value={this.props.feed.search}
                    noResultsText="Nous n'avons rien trouvé...."
                    placeholder="Rechercher..."
                    delimiter=" "
                    multi={true}
                    autoBlur={true}
                    className={this.state.showDropdown?"":"hide-options"}
                    onInputChange={this.showDropdown.bind(this)}
                    autoFocus={true}
                />
            </DivSearch>
    );
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
    searchFeed
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
