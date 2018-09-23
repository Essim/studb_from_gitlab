import React, {Component} from 'react';
import { connect } from 'react-redux';
import Datatable from 'react-bs-datatable';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { Button } from 'reactstrap';

import { genericPrintDate } from "../../../util/dateHandler";

import { fetchUsers, fetchDivisions, banUser, toggleRefresh, unBanUser, toggleModalUser } from "../action";
import ModifyUser from "./ModifyUser";

class ZoneUsers extends Component {
    constructor(props) {
        super(props);
        this.handleBan = this.handleBan.bind(this);
        this.handleUnBan = this.handleUnBan.bind(this);
        this.state = {
            header: [
                { title: 'Pseudo', prop: 'pseudo', sortable: true, filterable: true },
                { title: 'Email', prop: 'email', sortable: true, filterable: true },
                { title: 'Type Bachelier', prop:'division', sortable: true, filterable: true },
                { title: 'Année de cours', prop: 'group', sortable: true, filterable: true},
                { title: 'Date Inscription', prop: 'signup' },
                { title: '', prop: 'modify'},
                { title: '', prop: 'ban'}
            ],
            body: [],
        }
    }

    componentDidMount() {
        if(!this.props.admin.refreshUsers)
            this.props.toggleRefresh();
    }

    handleUnBan(user) {
        this.props.unBanUser(user, this.props.admin.users);
    }

    handleBan(user) {
        this.props.banUser(user, this.props.admin.users);
    }

    componentDidUpdate() {
        if(this.props.admin.refreshUsers) {
            const temp = [];
            this.props.admin.users.forEach((user) => {
                const select = user.group.map((grade) => {
                   return {value: String(grade), label: String(grade)};
                });
                let division = '';
                this.props.admin.divisions.forEach((div) => {
                    if(div.cuid === user.cuid_division)
                        division = div.acronym; // Get the user's division acronym
                });
                let banButton = '';
                if(user.logicalDelete)
                    banButton = <Button color="success" onClick={() => this.handleUnBan(user)}>DéBannir</Button>;
                else
                    banButton = <Button color="danger" onClick={() => this.handleBan(user)}>Bannir</Button>;
                const entry = {
                    pseudo: user.name,
                    email: user.email,
                    division: division,
                    group: <Select
                        value={select}
                        options={[{value: '1', label: '1'}, {value: '2', label: '2'}, {value: '3', label: '3'}]}
                        multi={true}
                        clearable={false}
                        disabled
                    />,
                    signup: genericPrintDate(new Date(user.date_creation)),
                    modify: <Button color="primary" onClick={() => this.props.toggleModalUser(user) }>Modifier</Button>,
                    ban: banButton,
                };
                temp.push(entry);
            });
            if(temp.length !== 0) {
                this.setState({ body: temp });
                this.props.toggleRefresh();
            }
        }
    }

    render() {
        return(
            <div>
                <Datatable
                    tableHeader={this.state.header}
                    tableBody={this.state.body}
                    keyName="usersTable"
                    tableClass="table table-bordered table-hover"
                    rowsPerPage={5}
                    rowsPerPageOption={[5,10,15,20]}
                    initialSort={{ prop: 'pseudo', isAscending: true }}
                />
                <ModifyUser />
            </div>
        );
    }
}

ZoneUsers.propTypes = {
    fetchUsers: PropTypes.func.isRequired,
    fetchDivisions: PropTypes.func.isRequired,
    banUser: PropTypes.func.isRequired,
    unBanUser: PropTypes.func.isRequired,
    toggleRefresh: PropTypes.func.isRequired,
    toggleModalUser: PropTypes.func.isRequired,
    admin: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        admin: state.admin,
    };
};

const mapDispatchToProps = {
    fetchUsers,
    fetchDivisions,
    banUser,
    unBanUser,
    toggleRefresh,
    toggleModalUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(ZoneUsers)