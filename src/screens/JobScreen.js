import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, Text } from 'react-native';
import JobCard from '../components/Jobcard';
import { fetchJobs } from '../services/api';

const JobsScreen = ({ navigation }) => {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const loadJobs = async () => {
    if (loading || !hasMore) return;
    
    try {
      setLoading(true);
      const newJobs = await fetchJobs(page);
      
      if (newJobs.length === 0) {
        setHasMore(false);
      } else {
        setJobs(prev => [...prev, ...newJobs]);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, [page]);

  const handleJobPress = (job) => {
    navigation.navigate('JobDetail', { 
      job: {
        ...job,
        // Ensure critical fields exist
        id: job.id || Math.random().toString(),
        title: job.title || 'No Title',
        company_name: job.company_name || 'No Company',
        primary_details: job.primary_details || {}
      }
    });
  };

  const handleRefresh = () => {
    setJobs([]);
    setPage(1);
    setHasMore(true);
    setError(null);
  };

  const keyExtractor = (item) => {
    return item.id.toString();
  };

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
        <Text style={styles.retryText} onPress={handleRefresh}>
          Tap to retry
        </Text>
      </View>
    );
  }

  if (jobs.length === 0 && !loading) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>No jobs available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={jobs}
        keyExtractor={keyExtractor}
        renderItem={({ item }) => (
          <JobCard 
            job={item} 
            onPress={handleJobPress}
          />
        )}
        onEndReached={() => hasMore && setPage(prev => prev + 1)}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading ? <ActivityIndicator size="large" color="#3498db" /> : null
        }
        refreshing={loading && page === 1}
        onRefresh={handleRefresh}
      />
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 10,
  },
  retryText: {
    color: '#3498db',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
};

export default JobsScreen;