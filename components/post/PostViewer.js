import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const PostViewer = () => {
  return (
    <View style={styles.container}>
      <Text>Post Viewer</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PostViewer;
