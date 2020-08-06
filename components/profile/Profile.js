import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useSelector } from 'react-redux';

const Profile = () => {
  const { user } = useSelector(({ user }) => ({ user: user.user }));

  return (
    <View style={styles.container}>
      <Text>ID: {user && user.username}</Text>
      <Text>NAME: {user && user.name}</Text>
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
