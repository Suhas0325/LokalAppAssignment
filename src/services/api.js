import axios from 'axios';

export const fetchJobs = async (page = 1) => {
  try {
    const response = await axios.get(`https://testapi.getlokalapp.com/common/jobs?page=${page}`);
    
    // Validate and transform the response data
    if (!response.data || !response.data.results) {
      console.warn('API returned unexpected format:', response.data);
      return [];
    }

    // Ensure each job has required fields
    return response.data.results.map(job => ({
      id: job.id || Math.random().toString(36).substr(2, 9),
      title: job.title || 'No Title Available',
      company_name: job.company_name || 'Unknown Company',
      primary_details: {
        Place: job.primary_details?.Place || 'Location Not Specified',
        Salary: job.primary_details?.Salary || 'Salary Not Specified',
        ...job.primary_details
      },
      whatsapp_no: job.whatsapp_no || '',
      job_tags: job.job_tags || [],
      creatives: job.creatives || [],
      ...job
    }));
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};