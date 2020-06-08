import React from 'react';
import WebView from 'react-native-webview';

const ResultComponent = ({ uri }) => {
  return <WebView source={{ uri }} style={{ marginTop: 40 }} />;
};

export default ResultComponent;
