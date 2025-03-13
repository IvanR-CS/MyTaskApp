import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { faArrowLeft, faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from '@react-navigation/native';

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStars = rating - fullStars >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStars;

  return (
    <View style={styles.starContainer}>
      {[...Array(fullStars)].map((_, index) => (
        <FontAwesomeIcon key={`full-${index}`} icon={faStar} size={20} color="#FFD700" />
      ))}
      {[...Array(halfStars)].map((_, index) => (
        <FontAwesomeIcon key={`half-${index}`} icon={faStarHalf} size={20} color="#FFD700" />
      ))}
      {[...Array(emptyStars)].map((_, index) => (
        <FontAwesomeIcon key={`empty-${index}`} icon={faStar} size={20} color="#FFD700" style={{ opacity: 0.3 }} />
      ))}
    </View>
  );
};

const MovieDetailScreen = ({ route }) => {
  const { imdbID } = route.params;
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    fetchMovieDetails();
  }, [imdbID]);

  const fetchMovieDetails = async () => {
    try {
      const response = await axios.get(`https://www.omdbapi.com/?apikey=ce9440d9&i=${imdbID}`);
      setMovie(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="black" />;
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: movie.Poster }} style={styles.poster} />
      <View style={styles.topIcons}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('HomeScreen')}>
          <FontAwesomeIcon icon={faArrowLeft} size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{movie.Title} ({movie.Year})</Text>
        <StarRating rating={parseFloat(movie.imdbRating) / 2} />
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.genreScrollView}
          contentContainerStyle={styles.genreContentContainer}
        >
          {movie.Genre.split(', ').map((genre) => (
            <View key={genre} style={styles.genreBadge}>
              <Text style={styles.genreText}>{genre}</Text>
            </View>
          ))}
        </ScrollView>
        <ScrollView
          style={styles.scrollViewStoryline}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContentContainer}
        >
          <Text style={styles.storylineHeader}>Storyline</Text>
          <Text style={styles.storyline}>{movie.Plot}</Text>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0E2F63',
    borderRadius: 20,
    overflow: 'hidden',
    margin: 20,
  },
  poster: {
    height: 300,
    justifyContent: 'space-between',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  infoContainer: {
    padding: 20,
    backgroundColor: '#0E2F63',
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'Bebas Neue', // Updated to Roboto for title consistency
    marginTop: -5,
  },
  starContainer: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  genreScrollView: {
    marginVertical: 10,
  },
  genreContentContainer: {
    paddingVertical: 5,
    flexDirection: 'row',
    marginBottom: 5,
  },
  genreBadge: {
    backgroundColor: '#444',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginRight: 5,
  },
  genreText: {
    color: 'white',
    fontFamily: 'A', 
    fontSize: 15,
    fontWeight: 'bold',
  },
  storylineHeader: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
  },
  storyline: {
    fontSize: 14,
    color: '#aaa',
    fontFamily: 'Roboto Flex', 
  },
  scrollViewStoryline: {
    maxHeight: 150,
    marginVertical: 10,
  },
  scrollContentContainer: {
    paddingVertical: -10,
  },
  topIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    position: 'absolute',
    top: 0,
    width: '100%',
  },
  iconButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 5,
  },
});

export default MovieDetailScreen;