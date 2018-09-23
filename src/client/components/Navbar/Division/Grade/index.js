import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { Nav, NavText } from 'react-sidenav';
import styled from "styled-components";
import {searchFeed} from "../../../../containers/Feed/action";

const SpanGrade = styled.span`
    color : #444;
    text-decoraction : none;
    background-color : transparent;
    box-sizing : border-box;
    font-weight : 600;
    line-height : 1;
    font-size : 16px;
    font-family : 'Montserrat',sans-serif;
`;

const SpanLengthCourse = styled.span`
    margin-right : 25px;
    float : left!important;
    display : inline;
`;
const ACourse = styled.a`
    margin-right : 25px;
    float : left!important;
    display : inline;
`;


class Grade extends Component {

    static propTypes = {
        grade: PropTypes.object.isRequired,
        user: PropTypes.object,
        connected: PropTypes.bool.isRequired,
    };

    constructor(props){
        super(props);
        this.read = true;
    }

    updateSearch(grade,name){
        let toAddName = true;
        let toAddGrade = true;
        let toAdd = [];
        this.props.feed.search.forEach((option)=>{
            if(!option.nav) {
                toAdd.push(option);
                if(option.value === name)
                    toAddName = false;
                if(option.value === grade)
                    toAddGrade = false;
            }
        });

        if(toAddName)
            toAdd.unshift({label:name,value:name,nav:true});
        if(toAddGrade)
            toAdd.unshift({label:grade,value:grade,nav:true});
        if(toAdd.length > 0)
            this.props.searchFeed([...toAdd]);
    }

    render() {
        if (this.props.connected && this.props.user.grades.indexOf(this.props.grade.grade) === -1) {
            return '';
        }

        return (
            <Nav id={this.props.grade.name}>
                <NavText>
                    <SpanLengthCourse className={this.read ? "label label-primary pull-left" : "label bg-green pull-left"}>
                        {this.props.grade.courses.filter(course => !course.logicalDelete).length}
                    </SpanLengthCourse>
                    <SpanGrade>{this.props.grade.name}</SpanGrade>
                </NavText>
                {this.props.grade.courses.filter(course => !course.logicalDelete).map((course) =>
                    <Nav key={"NavCourse"+this.props.grade.name+course.name} id={this.props.grade.name+course.name}>
                        <NavText className="full-width-nav">
                            <a onClick={()=>{this.updateSearch(this.props.grade.name,course.name);}} className="full-width-nav">
                            <span className={this.read ? "label label-primary pull-left" : "label bg-green pull-left"}>
                                {course.length}
                            </span>
                                {course.name}
                                <span className="pull-right-container collapse">
                                <small className="label pull-right bg-green">new</small>
                            </span>
                            </a>
                        </NavText>
                    </Nav>
                )}
            </Nav>
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

export default connect(mapStateToProps, mapDispatchToProps)(Grade);
