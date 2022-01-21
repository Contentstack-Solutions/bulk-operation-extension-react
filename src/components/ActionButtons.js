import { Component } from 'react';
import { Button } from '@contentstack/venus-components'
import { BsFillTrashFill } from "react-icons/bs";
import { FiRefreshCcw } from "react-icons/fi";

class ActionButtons extends Component {

    constructor(props) {
        super(props)

        this.state = {
            unpublishButtonLabel: 'Unpublish',
            publishButtonLabel: 'Publish',
            deletepublishButtonLabelLabel: 'Delete'
        }
    }

    unPublish = () => {
        this.props.unPublishEntries();
    }
  
    publish = () => {
        this.props.publishEntries();
    }

    delete = () => {
        this.props.deleteEntries();
    }

    render() {
        return(
            <>
                <div className="btn-row">
                    <Button variant="outlined" buttonType="secondary" isLoading={this.props.isLoadingUnpublish} loadingColor="#6c5ce7" icon="UnpublishAsset" onClick={this.unPublish}>{this.state.unpublishButtonLabel}</Button>
                    <Button variant="contained" icon="PublishWhite" isLoading={this.props.isLoadingPublish} onClick={this.publish}>{this.state.publishButtonLabel}</Button>
                    <Button className="delete-btn" variant="contained" isLoading={this.props.isLoadingDelete} color="#fff" onClick={this.delete}><BsFillTrashFill />{this.state.deletepublishButtonLabelLabel}</Button>
                    <Button className="delete-btn" variant="contained" isLoading={this.props.isRefresh} color="#fff" onClick={this.props.refreshList}><FiRefreshCcw />Refresh</Button>
                </div>
            </>
        )
    }

}

export default ActionButtons;