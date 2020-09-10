import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import LoadingComponent from '../common/LoadingComponent';
import { styles } from './StyleContainer';

const Profile = ({ colorScheme, ProfileMenuList, user, handleItemPress }) => {
  const MenuItem = ({ item }) => (
    <ListItem
      containerStyle={
        colorScheme === 'dark' ? styles.darkBody : styles.lightBody
      }
      title={item.name}
      titleStyle={colorScheme === 'dark' ? styles.darkText : styles.lightText}
      onPress={() => handleItemPress(item.id)}
      bottomDivider
      chevron
    />
  );
  if (!user) {
    return <LoadingComponent />;
  }
  return (
    <View
      style={[
        styles.container,
        colorScheme === 'dark'
          ? { ...styles.darkBody }
          : { ...styles.lightBody },
      ]}
    >
      <View style={styles.userContainer}>
        <View>
          <Text
            style={[
              styles.username,
              colorScheme === 'dark'
                ? { ...styles.darkText }
                : { ...styles.lightText },
            ]}
          >
            {user && user.username}
          </Text>
          <Text
            style={[
              styles.name,
              colorScheme === 'dark'
                ? { ...styles.darkSubText }
                : { ...styles.lightSubText },
            ]}
          >
            {user && user.name}
          </Text>
        </View>
        <View>
          <Avatar
            size="medium"
            rounded
            overlayContainerStyle={{
              backgroundColor:
                colorScheme === 'dark'
                  ? styles.darkSubText.color
                  : styles.darkSubText.color,
            }}
            icon={{ name: 'user', type: 'font-awesome' }}
            onPress={() => console.log('Works!')}
            activeOpacity={0.7}
          />
        </View>
      </View>
      <View style={styles.menu}>
        <FlatList
          data={ProfileMenuList}
          keyExtractor={(item) => item.id}
          renderItem={MenuItem}
        />
      </View>
    </View>
  );
};

export default Profile;
