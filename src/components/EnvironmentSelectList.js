import { Component } from 'react';
import { Select } from '@contentstack/venus-components'

class EnvironmentSelectList extends Component {

    constructor(props) {
        super(props);
      
        this.state = {
            environments: props.environments,
            selectedEnvironment: props.environment,
            selectLabel: 'Environments',
            isMulti: false,
            isClearable: false,
            isSearchable: true,
            isDisabled: false,
            hideSelectedOptions: true,
            width: 150,
            maxMenuHeight: 100
        }
    }

    mapItems = (item) => {
        let result = {
            label: item.name,
            value: item.name,
        }
        return result;
    }

    mappedItems = (props) => {
        let environments = props.map(this.mapItems);
        this.setState({
            environments: environments
        });
    }

    handleChange = (event) => {
        this.props.selectedEnvironment(event.value);
        this.setState({
            selectedEnvironment: event.value
        });
    };

    componentDidMount() {
        this.mappedItems(this.props.environments);
    }

    render() {
        return (
            <>
                <Select 
                    selectLabel={this.state.selectLabel}
                    onChange={this.handleChange}
                    options={this.state.environments} 
                    isMulti={this.state.isMulti}
                    isClearable={this.state.isClearable}
                    placeholder={this.state.selectedEnvironment}
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

export default EnvironmentSelectList;