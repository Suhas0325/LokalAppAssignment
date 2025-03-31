import AsyncStorage from '@react-native-async-storage/async-storage';

const BOOKMARKS_KEY = 'bookmarked_jobs';

export const getBookmarks = async () => {
  try {
    const bookmarks = await AsyncStorage.getItem(BOOKMARKS_KEY);
    return bookmarks ? JSON.parse(bookmarks) : [];
  } catch (error) {
    console.error('Error getting bookmarks:', error);
    return [];
  }
};

export const saveBookmark = async (job) => {
  try {
    const bookmarks = await getBookmarks();
    const newBookmarks = [...bookmarks, job];
    await AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(newBookmarks));
  } catch (error) {
    console.error('Error saving bookmark:', error);
  }
};

export const removeBookmark = async (jobId) => {
  try {
    const bookmarks = await getBookmarks();
    const newBookmarks = bookmarks.filter(job => job.id !== jobId);
    await AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(newBookmarks));
  } catch (error) {
    console.error('Error removing bookmark:', error);
  }
};