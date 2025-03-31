// screens/BookmarksScreen.js
import React, { useContext } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { BookmarksContext } from '../context/BookmarksContext';
import JobCard from '../components/Jobcard';
import EmptyState from '../components/EmptyState';
import colors from '../constants/colors';

const BookmarksScreen = ({ navigation }) => {
  const { bookmarkedJobs } = useContext(BookmarksContext);

  const handleJobPress = (job) => {
    navigation.navigate('JobDetail', { job });
  };

  if (bookmarkedJobs.length === 0) {
    return (
      <EmptyState 
        message="No bookmarked jobs" 
        subMessage="Save jobs you're interested in by tapping the bookmark icon"
      />
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={bookmarkedJobs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <JobCard 
            job={item} 
            onPress={() => handleJobPress(item)} 
          />
        )}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <Text style={styles.headerText}>{bookmarkedJobs.length} Bookmarked Jobs</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    padding: 16,
  },
  headerText: {
    fontSize: 16,
    color: colors.gray,
    marginBottom: 16,
    paddingLeft: 8,
  },
});

export default BookmarksScreen;