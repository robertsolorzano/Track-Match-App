// SearchResults.jsx
import React from 'react';
import { ScrollView } from 'react-native';
import TrackDisplay from './TrackDisplay'; 

const SearchResults = ({ results }) => {
  return (
    <ScrollView>
      <TrackDisplay data={results} />
    </ScrollView>
  );
};

export default SearchResults;
