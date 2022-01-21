import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import ContentstackUIExtension from "@contentstack/ui-extensions-sdk";

ContentstackUIExtension.init().then((extension) => {

  const e = extension;
  e.window.enableAutoResizing();
  // e.window.updateHeight(400);

  ReactDOM.render(
    <App csExtension={e} />
    ,
    document.getElementById('root')
  );

})

