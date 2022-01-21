import './App.scss';
import ContentTypeSelectList from './components/ContentTypeSelectList';
import React, { Component } from 'react';
import EntryTable from './components/EntryTable';
import EnvironmentSelectList from './components/EnvironmentSelectList';
import LocalesSelectList from './components/LocalesSelectList';
import { format } from "date-fns";
import '@contentstack/venus-components/build/main.css'
import ActionButtons from './components/ActionButtons';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
        e: props.csExtension,
        contentTypes: null,
        contentType: null,
        entries: null,
        environments: null,
        environment: null,
        locales: null,
        locale: null,
        publishedConfirmation: null,
        isLoading: false,
        selectedEntries: null,
        isLoadingDelete: false,
        isLoadingPublish: false,
        isLoadingUnpublish: false,
        isRefresh: false
    }
    this.onSelectedContentType = this.onSelectedContentType.bind(this);
  }

  getContentTypes() {
    this.state.e.stack.getContentTypes().then(res => {
      this.setState({
          contentTypes: res.content_types,
          contentType: res.content_types[0].uid
      });
      this.getEntries(res.content_types[0].uid); 
    })
  }

  getEnvironments() {
    this.state.e.stack.getEnvironments().then(res => {
      // console.log(res.environments);
      this.setState({
        environments: res.environments,
        environment: res.environments[0].name
      });
    })
  }

  getLocales() {
    this.state.e.stack.getLocales().then(res => {
      // console.log(res.locales);
      const locales  = res.locales.reverse();
      this.setState({
        locales: res.locales,
        locale: locales[0].code
      });
    })
  }

  mapItems = (item) => {
    // console.log(item);

    let result = {
      uid: item.uid,
      title: item.title,
      version: item._version,
      createdAt: format(new Date(item.created_at), "MMM d h:mm a"),
      updatedAt: format(new Date(item.updated_at), "MMM d h:mm a")
    }

    return result;
  }

  getEntries(contentTypeUid) {
    this.setState({
      isLoading: true
    });

    const x = this.state.e.stack.ContentType(contentTypeUid).Entry.Query();
    x.find().then((res) => {
      // console.log(res)      
      let result = res.entries.map(this.mapItems);

      this.setState({
        entries: result,
        isLoading: false
      });

    });
  }

  onSelectedContentType = (contentType) => {
    // console.log(contentType);
    this.setState({
      contentType: contentType
    })
    this.getEntries(contentType);
  }

  onSelectedEnvironment = (environment) => {
    // console.log(environment)
    this.setState({
      environment: environment
    })
  }

  onSelectedLocale = (locale) => {
    // console.log(locale)
    this.setState({
      locale: locale
    })
  }

  onPublishEntries = () => {

    if (this.state.selectedEntries.length) {
      this.setState({
        isLoadingPublish: true
      })

      for (const uid of this.state.selectedEntries) {
        this.state.e.stack.ContentType(this.state.contentType).Entry(uid).publish({
          "entry": {
              "environments": [this.state.environment],
              "locales": [this.state.locale]
          },
          "locale": this.state.locale,
          // "version": 1,
          // "scheduled_at": "2019-02-14T18:30:00.000Z"
        }).then(res => {
          this.getEntries(this.state.contentType);

          setTimeout(() => {
            this.setState({
              isLoadingPublish: false
            })
          }, 500)
          

        }).catch(error => {
          // console.log(error);
          this.setState({
            publishedConfirmation: 'Failed to publish entry'
          })
        });
      }
    }
  }

  onDeleteEntries = () => {
    if (this.state.selectedEntries.length) {
      this.setState({
        isLoadingDelete: true
      });

      for (const uid of this.state.selectedEntries) {
        this.state.e.stack.ContentType(this.state.contentType).Entry(uid).delete().then(res => {
          this.getEntries(this.state.contentType);
          setTimeout(() => {
            this.setState({
              isLoadingDelete: false
            })
          }, 500)
        }).catch(error => {
          // console.log(error);
          this.setState({
            publishedConfirmation: 'Failed to publish entry'
          })
        });
      }
    }
  }

  onUnPublishEntries = () => {

    if (this.state.selectedEntries.length) {
      this.setState({
        isLoadingUnpublish: true
      })

      for (const uid of this.state.selectedEntries) {
        this.state.e.stack.ContentType(this.state.contentType).Entry(uid).unpublish({
          "entry": {
              "environments": [this.state.environment],
              "locales": [this.state.locale]
          },
          "locale": this.state.locale,
          // "version": 1,
          // "scheduled_at": "2019-02-14T18:30:00.000Z"
        }).then(res => {
          this.getEntries(this.state.contentType);
          setTimeout(() => {
            this.setState({
              isLoadingUnpublish: false
            })
          }, 500)
        }).catch(error => {
          console.log(error);
        });
      }
    }
  }

  onRefresh = () => {
    this.setState({
      isRefresh: true
    })
    this.getEntries(this.state.contentType);
    setTimeout(() => {
      this.setState({
        isRefresh: false
      })
    }, 500)
  }

  setSelectedEntries = (event) => {
    this.setState({
      selectedEntries: event
    })
  }

  componentDidMount() {
    this.getContentTypes();   
    this.getEnvironments();
    this.getLocales();
  }

  render() {

    if (!this.state.contentTypes) {
      return <div />
    }

    if (!this.state.contentType) {
      return <div />
    }

    if (!this.state.entries) {
      return <div />
    }

    const styles = {
      height: '807px'
    }

    return (
      <>
        <div className="container" style={styles}>          
          <ContentTypeSelectList sendContentType={this.onSelectedContentType} contentType={this.state.contentType ? this.state.contentType : ''} contentTypes={this.state.contentTypes ? this.state.contentTypes : []} />
          <EnvironmentSelectList selectedEnvironment={this.onSelectedEnvironment} environment={this.state.environment ? this.state.environment : ''} environments={this.state.environments ? this.state.environments : ''}/>
          <LocalesSelectList selectLocale={this.onSelectedLocale} locale={this.state.locale ? this.state.locale : ''} locales={this.state.locales ? this.state.locales : []} />
          <ActionButtons publishEntries={this.onPublishEntries} unPublishEntries={this.onUnPublishEntries} deleteEntries={this.onDeleteEntries} refreshList={this.onRefresh} isLoadingDelete={this.state.isLoadingDelete} isLoadingPublish={this.state.isLoadingPublish} isLoadingUnpublish={this.state.isLoadingUnpublish} isRefresh={this.state.isRefresh} />
          {this.state.isLoading ? <div className="dot-flashing" id="dot-flashing"></div> : null}
          {this.state.publishedConfirmation ? <p>{this.state.publishedConfirmation}</p> : null}
          <EntryTable entries={this.state.entries ? this.state.entries : []} setSelectedEntries={this.setSelectedEntries} isLoading={this.state.isLoading} />
        </div>
      </>
    );
    
  }

}

export default App;
