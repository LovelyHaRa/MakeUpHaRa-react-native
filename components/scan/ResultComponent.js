import React from 'react';
import WebView from 'react-native-webview';

const ResultComponent = () => {
  return (
    <WebView
      source={{ uri: 'http://39.113.253.217:4000/' }}
      style={{ marginTop: 40 }}
    />
  );
};

export default ResultComponent;
