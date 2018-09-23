import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Doughnut } from 'react-chartjs-2';
import Gravatar from 'react-gravatar';
import PropTypes from 'prop-types';
import { genericPrintDate } from "../../util/dateHandler";

export class ProfileStatsPage extends Component {
    constructor(props) {
        super(props);
        /* State used to handle the doughnuts charts */
        this.state= {
            ratioLikesDislikes: {
                labels: [
                    'Likes',
                    'Dislikes'
                ],
                datasets: [{
                    data: [0, 0],
                    backgroundColor: [
                        '#00a65a',
                        '#dd4b39'
                    ],
                    hoverBackgroundColor: [
                        '#00a65a',
                        '#dd4b39'
                    ]
                }]
            },
            appreciationDocs: {
                labels: [
                    'Likes',
                    'Dislikes'
                ],
                datasets: [{
                    data: [0, 0],
                    backgroundColor: [
                        '#00a65a',
                        '#dd4b39'
                    ],
                    hoverBackgroundColor: [
                        '#00a65a',
                        '#dd4b39'
                    ]
                }]
            }
        };
    }

    componentDidUpdate() {
        const documents = this.props.profile.documents
            .filter((document) => document.cuid_author === this.props.profile.user.cuid);
        //Management of the appreciationDocs Doughnut
        let aprecLikes = 0;
        documents.forEach((document) => aprecLikes += document.opinions.filter((opinion) => opinion.state).length);
        let aprecDislikes = 0;
        documents.forEach((document) => aprecDislikes += document.opinions.filter((opinion) => !opinion.state).length);
        //If likes / dislikes are different from the current state then setState
        if(this.state.appreciationDocs.datasets[0].data[0] !== aprecLikes ||
            this.state.appreciationDocs.datasets[0].data[1] !== aprecDislikes) {
            const appreciationDocs = Object.assign({}, this.state.appreciationDocs);
            appreciationDocs.datasets[0].data = [aprecLikes, aprecDislikes];
            this.setState({ appreciationDocs: appreciationDocs });
        }
        //Management of the ratioLikesDislikes Doughnut
        const likes = this.props.profile.documents
            .filter((document) => document.opinions
                .filter((opinion) => opinion.cuid_author === this.props.profile.user.cuid && opinion.state).length !== 0).length;
        const dislikes = this.props.profile.documents
            .filter((document) => document.opinions
                .filter((opinion) => opinion.cuid_author === this.props.profile.user.cuid && !opinion.state).length !== 0).length;
        //If likes / dislikes are different from the current state then setState
        if(this.state.ratioLikesDislikes.datasets[0].data[0] !== likes ||
            this.state.ratioLikesDislikes.datasets[0].data[1] !== dislikes) {
            const ratioLikesDislikes = Object.assign({}, this.state.ratioLikesDislikes);
            ratioLikesDislikes.datasets[0].data = [likes, dislikes];
            this.setState({ ratioLikesDislikes: ratioLikesDislikes });
        }
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="box box-widget widget-user">
                            <div className="widget-user-header bg-light-blue-active">
                                <h3 className="widget-user-username">{ this.props.profile.user.pseudo }</h3>
                                <h5 className="widget-user-desc">{ this.props.profile.user.email }</h5>
                            </div>
                            <div className="widget-user-image">
                                <Gravatar className="img-circle" email={this.props.profile.user.pseudo} default="identicon" />
                            </div>
                            <div className="box-body">
                                <br />
                                <br />
                                <p>Nombre de synthèses mises en ligne : {this.props.profile.documents.
                                filter((document) => document.cuid_author === this.props.profile.user.cuid).length}</p>
                                <p>Dernière connexion : { genericPrintDate(new Date(this.props.profile.user.dateSignIn)) }</p>
                                <p>Membre depuis le : { genericPrintDate(new Date(this.props.profile.user.dateSignUp)) }</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="box box-primary">
                            <div className="box-header with-border">
                                <h3 className="box-title">Ratio de Likes / Dislikes</h3>
                            </div>
                            <div className="box-body chart-responsive">
                                <div className="chart" id="opinions_chart">
                                    <Doughnut
                                        data={this.state.ratioLikesDislikes}
                                        options={{
                                            maintainAspectRatio: false
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="box box-primary">
                            <div className="box-header with-border">
                                <h3 className="box-title">Appréciation des Documents</h3>
                            </div>
                            <div className="box-body chart-responsive">
                                <div className="chart" id="opinions_chart">
                                    <Doughnut
                                        data={this.state.appreciationDocs}
                                        options={{
                                            maintainAspectRatio: false
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ProfileStatsPage.propTypes = {
    profile: PropTypes.object.isRequired,
};

const mapStateToProps= (state) => {
    return {
        profile: state.profile,
    };
};

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileStatsPage);