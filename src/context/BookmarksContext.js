import React, { createContext, useState, useEffect } from 'react';
import { getBookmarks, saveBookmark, removeBookmark } from '../services/Database';

export const BookmarksContext = createContext();

export const BookmarksProvider = ({ children }) => {
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);

  useEffect(() => {
    const loadBookmarks = async () => {
      const savedBookmarks = await getBookmarks();
      setBookmarkedJobs(savedBookmarks);
    };
    loadBookmarks();
  }, []);

  const addBookmark = async (job) => {
    await saveBookmark(job);
    setBookmarkedJobs(prev => [...prev, job]);
  };

  const deleteBookmark = async (jobId) => {
    await removeBookmark(jobId);
    setBookmarkedJobs(prev => prev.filter(job => job.id !== jobId));
  };

  const isBookmarked = (jobId) => {
    return bookmarkedJobs.some(job => job.id === jobId);
  };

  return (
    <BookmarksContext.Provider
      value={{
        bookmarkedJobs,
        addBookmark,
        deleteBookmark,
        isBookmarked,
      }}
    >
      {children}
    </BookmarksContext.Provider>
  );
};