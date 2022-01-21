import React, { Component } from 'react';
import { Select } from '@contentstack/venus-components'

class ContentTypeSelectList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            contentTypes: props.contentTypes,
            selectedContentType: props.contentType,
            selectLabel: 'Content Types',
            isMulti: false,
            isClearable: false,
            isSearchable: true,
            isDisabled: false,
            hideSelectedOptions: true,
            width: 200,
            maxMenuHeight: 100
        }
    }

    mapItems = (item) => {
        let result = {
            label: item.uid,
            value: item.uid,
        }
        return result;
    }

    mappedItems = (props) => {
        let contentTypes = props.map(this.mapItems);
        this.setState({
            contentTypes: contentTypes
        });
    }

    handleChange = (event) => {
        this.props.sendContentType(event.value);
        this.setState({
            selectedContentType: event.value
        });
    };

    componentDidMount() {
        this.mappedItems(this.props.contentTypes);
    }

    render() {        
        return (
            <>
                <Select 
                    selectLabel={this.state.selectLabel}
                    onChange={this.handleChange}
                    options={this.state.contentTypes} 
                    isMulti={this.state.isMulti}
                    isClearable={this.state.isClearable}
                    placeholder={this.state.selectedContentType}
                    isSearchable={this.state.isSearchable}
                    isDisabled={this.state.isDisabled}
                    hideSelectedOptions={this.state.hideSelectedOptions}
                    width={this.state.width}
                    maxMenuHeight={this.state.maxMenuHeight}
                    noOptionsMessage={() => 'No lables created yet'}
                />
            </>
        )
    }

}

export default ContentTypeSelectList;