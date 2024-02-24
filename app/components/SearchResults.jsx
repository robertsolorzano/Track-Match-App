// SearchResults.jsx
import React from 'react';
import { ScrollView } from 'react-native';
import TrackDisplay from './TrackDisplay'; // Adjust the import path as necessary

const SearchResults = ({ results }) => {
  return (
    <ScrollView>
      {/* Assuming TrackDisplay is designed to take the entire results object */}
      <TrackDisplay data={results} />
    </ScrollView>
  );
};

export default SearchResults;
