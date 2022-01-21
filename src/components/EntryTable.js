import { Component } from 'react';
import { InfiniteScrollTable } from '@contentstack/venus-components'

class EntryTable extends Component {

  constructor(props) {
    super(props)

    this.state = {
      isRowSelect: true,
      fullRowSelect: true,
      loading: false,
      equalWidthColumns: true,
      canSearch: false,
      canRefresh: false,
      viewSelector: true,
      columnSelector:false
    }
  }

  onSelection = (event) => {
    this.props.setSelectedEntries(event);
  }

  unSelectRows = () => {
    return false;
  }
  
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      entries: nextProps.entries,
    })
  }

  createItemStatusMap(entries) {
    let itemStatusMap = {};

    for (let i = 0; i < entries.length; i++) {
      itemStatusMap[i] = 'loaded';
    }

    return itemStatusMap;
  }

  render() {
    let mappedEntries =  this.createItemStatusMap(this.props.entries);

    const columns = [
      {
        Header: 'UID',
        accessor: 'uid',
        default: true,
        columnWidthMultiplier: 2,
      },
      {
        Header: 'Title',
        accessor: 'title',
        default: false,
        columnWidthMultiplier: 4,
      },
      {
        Header: 'Version',
        accessor: 'version',
        default: false,
        columnWidthMultiplier: 2,
      },
      {
        Header: 'Created At',
        accessor: 'createdAt',
        default: false,
        columnWidthMultiplier: 2,
      },
      {
        Header: 'Updated At',
        accessor: 'updatedAt',
        default: false,
        columnWidthMultiplier: 2,
      }
    ]

    return (
      <> 
        <InfiniteScrollTable 
          viewSelector={this.state.viewSelector} 
          isRowSelect={this.state.isRowSelect} 
          fullRowSelect={this.state.fullRowSelect} 
          data={this.props.entries}
          fetchTableData={() => undefined}
          loadMoreItems={() => undefined}
          itemStatusMap={
            mappedEntries
          }
          totalCounts={this.props.entries.length}
          loading={this.props.isLoading}
          columns={columns}
          equalWidthColumns={this.state.equalWidthColumns}
          canSearch={this.state.canSearch}
          tableHeight={490}
          // searchPlaceholder={'Search for an Entry'}
          // searchValue={'Jeep'}
          canRefresh={this.state.canRefresh}
          getSelectedRow={(i) => this.onSelection(i)}
          // searchValue={'Weld'}
          columnSelector={false}
          uniqueKey={'uid'}
        />
      </>
    ) 
  }
}

export default EntryTable;