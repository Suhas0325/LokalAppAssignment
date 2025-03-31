import React, { useContext } from 'react';
import { View, ScrollView, Text, TouchableOpacity, Linking, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BookmarksContext } from '../context/BookmarksContext';

const JobDetailScreen = ({ route }) => {
  const { job } = route.params;
  
  // Normalize job data in case it wasn't properly normalized before
  const normalizedJob = {
    id: job?.id || Math.random().toString(),
    title: job?.title || 'No Title Available',
    company_name: job?.company_name || 'Unknown Company',
    primary_details: {
      Place: job?.primary_details?.Place || 'Location Not Specified',
      Salary: job?.primary_details?.Salary || 'Salary Not Specified',
      Job_Type: job?.primary_details?.Job_Type || '',
      Experience: job?.primary_details?.Experience || '',
      Qualification: job?.primary_details?.Qualification || ''
    },
    whatsapp_no: job?.whatsapp_no || '',
    job_tags: job?.job_tags || [],
    creatives: job?.creatives || [],
    salary_min: job?.salary_min,
    salary_max: job?.salary_max,
    other_details: job?.other_details || 'No details available'
  };

  const { isBookmarked, addBookmark, deleteBookmark } = useContext(BookmarksContext);

  const toggleBookmark = () => {
    if (isBookmarked(normalizedJob.id)) {
      deleteBookmark(normalizedJob.id);
    } else {
      addBookmark(normalizedJob);
    }
  };

  const handleCall = () => {
    if (normalizedJob.whatsapp_no) {
      Linking.openURL(`tel:${normalizedJob.whatsapp_no}`);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{normalizedJob.title}</Text>
          <Text style={styles.company}>{normalizedJob.company_name}</Text>
        </View>
        <TouchableOpacity onPress={toggleBookmark} style={styles.bookmarkButton}>
          <Ionicons 
            name={isBookmarked(normalizedJob.id) ? "bookmark" : "bookmark-outline"} 
            size={28} 
            color={isBookmarked(normalizedJob.id) ? "#e74c3c" : "#95a5a6"} 
          />
        </TouchableOpacity>
      </View>

      {normalizedJob.creatives.length > 0 && (
        <Image 
          source={{ uri: normalizedJob.creatives[0].file }} 
          style={styles.image}
          resizeMode="cover"
        />
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Job Details</Text>
        <DetailRow icon="location-outline" label="Location" value={normalizedJob.primary_details.Place} />
        <DetailRow icon="cash-outline" label="Salary" value={normalizedJob.primary_details.Salary || 
          (normalizedJob.salary_min && normalizedJob.salary_max ? 
           `₹${normalizedJob.salary_min} - ₹${normalizedJob.salary_max}` : 
           'Not Specified')} />
        <DetailRow icon="briefcase-outline" label="Job Type" value={normalizedJob.primary_details.Job_Type} />
        <DetailRow icon="school-outline" label="Qualification" value={normalizedJob.primary_details.Qualification} />
        <DetailRow icon="time-outline" label="Experience" value={normalizedJob.primary_details.Experience} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{normalizedJob.other_details}</Text>
      </View>

      {normalizedJob.whatsapp_no && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          <DetailRow icon="call-outline" label="Phone Number" value={normalizedJob.whatsapp_no} />
          <TouchableOpacity style={styles.callButton} onPress={handleCall}>
            <Ionicons name="call" size={20} color="#fff" />
            <Text style={styles.buttonText}>Call Now</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const DetailRow = ({ icon, label, value }) => {
  if (!value) return null;
  
  return (
    <View style={styles.detailRow}>
      <Ionicons name={icon} size={20} color="#3498db" style={styles.detailIcon} />
      <View style={styles.detailTextContainer}>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={styles.detailValue}>{value}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 16,
    backgroundColor: '#fff',
    marginBottom: 1,
  },
  titleContainer: {
    flex: 1,
    marginRight: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#2c3e50',
  },
  company: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  bookmarkButton: {
    padding: 4,
  },
  image: {
    width: '100%',
    height: 200,
    backgroundColor: '#ecf0f1',
  },
  section: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#2c3e50',
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
    paddingBottom: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailIcon: {
    marginRight: 12,
  },
  detailTextContainer: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 16,
    color: '#2c3e50',
  },
  description: {
    fontSize: 16,
    color: '#34495e',
    lineHeight: 24,
  },
  callButton: {
    backgroundColor: '#2ecc71',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
    marginTop: 12,
  },
  buttonText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default JobDetailScreen;