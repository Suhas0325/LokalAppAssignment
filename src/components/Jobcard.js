import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import BookmarkButton from './BookmarkButton';

const JobCard = ({ job, onPress }) => {
  // Create a clean, normalized job object
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

  return (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => onPress(normalizedJob)}
    >
      <View style={styles.header}>
        <Text style={styles.title} numberOfLines={2}>{normalizedJob.title}</Text>
        <BookmarkButton job={normalizedJob} />
      </View>
      
      <Text style={styles.company}>{normalizedJob.company_name}</Text>
      <Text style={styles.location}>{normalizedJob.primary_details.Place}</Text>
      <Text style={styles.salary}>
        {normalizedJob.primary_details.Salary || 
         (normalizedJob.salary_min && normalizedJob.salary_max ? 
          `₹${normalizedJob.salary_min} - ₹${normalizedJob.salary_max}` : 
          'Salary Not Specified')}
      </Text>
      
      {normalizedJob.job_tags.length > 0 && (
        <View style={styles.tagsContainer}>
          {normalizedJob.job_tags.map((tag, index) => (
            <View key={index} style={[styles.tag, { backgroundColor: tag.bg_color }]}>
              <Text style={[styles.tagText, { color: tag.text_color }]}>
                {tag.value}
              </Text>
            </View>
          ))}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 8,
  },
  company: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  salary: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2ecc71',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 12,
  },
});

export default JobCard;