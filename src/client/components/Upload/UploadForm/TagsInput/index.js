import React, { Component } from 'react'
import {Creatable} from "react-select";
import PropTypes from 'prop-types';

export default class TagsInput extends Component {

    static propTypes = {
        tags: PropTypes.array.isRequired,
        selectedTags: PropTypes.array.isRequired,
        onSelectTag: PropTypes.func.isRequired,
    };

    static defaultProps = {
        tags: [],
        selectedTags: [],
    };

    constructor(props) {
        super(props);

        this.ref   = null;
        this.state = {
            newTags: []
        };

        props.selectedTags.forEach(tag => {
            if (tag instanceof String || typeof tag === "string") {
                this.state.newTags.push({
                    value: tag,
                    label: tag,
                });
            }
        });

        this.createNewOption = this.createNewOption.bind(this);
    }

    isValidNewOption = ({ label }) => {
        return !!label && label.length < 25;
    };

    onKeyDown = ({keyCode}) => {
        switch (keyCode) {
            case 9:   // TAB
            case 13:  // ENTER
            case 188: // COMMA
                return true;
            default:
                return false;
        }
    };

    textCreator = (value) => {
       return  "Utiliser un nouveau tag : '" + value + "'"
    };

    onNewOption = (option) => {
        if (option.label.indexOf('Utiliser un nouveau tag : \'') === 0) {
            return option;
        }

        const label = option.label.trim().split(" ").map((str) => {
            if (str.length > 1)
                return str.charAt(0).toUpperCase() + str.slice(1);

            return str.toUpperCase();
        }).join("");

        return {
            label,
            value: label,
        }
    };

    createNewOption(option) {
        this.state.newTags.push(option);

        this.setState({
            newTags: this.state.newTags
        }, () => {
            this.ref.select.selectValue([ option ]);
        });

        return true;
    }

    render () {
        return <Creatable
            ref={(ref) => this.ref = ref }
            value={ this.props.selectedTags }
            options={ this.props.tags
                .filter(tag => !tag.division && !tag.course && !tag.logicalDelete)
                .map(tag => { return { value: tag._id, label: tag.name }})
                .concat(this.state.newTags) }
            multi={true}
            clearable={false}
            onChange={this.props.onSelectTag}
            required
            promptTextCreator={this.textCreator}
            shouldKeyDownEventCreateNewOption={this.onKeyDown}
            newOptionCreator={this.onNewOption}
            onNewOptionClick={this.createNewOption}
            isValidNewOption={this.isValidNewOption}
        />

    }

}
