import React, { Component } from 'react';
import { Select } from '@contentstack/venus-components'

class LocalesSelectList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            locales: props.locales,
            selectedLocale: props.locale,
            selectLabel: 'Locales',
            isMulti: false,
            isClearable: false,
            isSearchable: true,
            isDisabled: false,
            hideSelectedOptions: true,
            width: 100,
            height: 100
        }
    }

    mapItems = (item) => {
        let result = {
            label: item.code,
            value: item.code,
        }
        return result;
    }

    mappedItems = (props) => {
        let locales = props.map(this.mapItems);
        this.setState({
            locales: locales
        });
    }


    handleChange = (event) => {
        this.props.selectLocale(event.value);
        this.setState({
            selectedLocale: event.value
        });
    };

    componentDidMount() {
        this.mappedItems(this.props.locales);
    }

    render() {        
        return (
            <>
                <Select 
                    selectLabel={this.state.selectLabel}
                    onChange={this.handleChange}
                    options={this.state.locales} 
                    isMulti={this.state.isMulti}
                    isClearable={this.state.isClearable}
                    placeholder={this.state.selectedLocale}
                    isSearchable={this.state.isSearchable}
                    isDisabled={this.state.isDisabled}
                    hideSelectedOptions={this.state.hideSelectedOptions}
                    width={this.state.width}
                    maxMenuHeight={this.state.height}
                    noOptionsMessage={() => 'No lables created yet'}
                />
            </>
        )
    }

}

export default LocalesSelectList;