import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import LoadingComponent from '../common/LoadingComponent';

const Profile = ({ user, onLogout }) => {
  if (!user) {
    return <LoadingComponent />;
  }
  return (
    <View style={styles.container}>
      <Text>ID: {user && user.username}</Text>
      <Text>NAME: {user && user.name}</Text>
      <Button title="로그아웃" onPress={onLogout} />
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

export default Profile;
