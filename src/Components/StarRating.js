import StarRating from 'react-native-star-rating';
import React from 'react';
import { View } from 'react-native';

const StarRatingComponent = ({ initialValue }) => {

  return (
    <View style={{flexDirection: 'row', justifyContent:'flex-end', marginBottom: 8}}>
      <StarRating
        disabled={true} 
        maxStars={5}
        rating={initialValue}
        starSize={20}
        fullStarColor="gold"
        emptyStarColor="gold"
      />
    </View>
  );
};

export default StarRatingComponent;
