import React, { useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BookmarksContext } from '../context/BookmarksContext';
import colors from '../constants/colors';

const BookmarkButton = ({ job }) => {
  const { isBookmarked, addBookmark, deleteBookmark } = useContext(BookmarksContext);

  const handlePress = () => {
    if (isBookmarked(job.id)) {
      deleteBookmark(job.id);
    } else {
      addBookmark(job);
    }
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Ionicons 
        name={isBookmarked(job.id) ? "bookmark" : "bookmark-outline"} 
        size={24} 
        color={isBookmarked(job.id) ? colors.primary : colors.gray} 
      />
    </TouchableOpacity>
  );
};

export default BookmarkButton;