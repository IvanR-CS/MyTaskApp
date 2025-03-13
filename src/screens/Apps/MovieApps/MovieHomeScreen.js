import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const MovieHomeScreen = ({ navigation }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [error, setError] = useState(null);
  const [numColumns, setNumColumns] = useState(2);
  const [searchVisible, setSearchVisible] = useState(false); 

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`https://www.omdbapi.com/?apikey=ce9440d9&s=${search || 'Batman'}`);
      
      if (response.data.Response === 'False') {
        throw new Error(response.data.Error);
      }

      const movieList = response.data.Search || [];
      const detailedMovies = await Promise.all(movieList.map(async (movie) => {
        const detailsResponse = await axios.get(`https://www.omdbapi.com/?apikey=ce9440d9&i=${movie.imdbID}`);

        if (detailsResponse.data.Response === 'False') {
          throw new Error(detailsResponse.data.Error);
        }

        return {
          ...movie,
          imdbRating: detailsResponse.data.imdbRating,
          Plot: detailsResponse.data.Plot,
        };
      }));

      setMovies(detailedMovies);
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleNumColumns = () => {
    setNumColumns((prevNumColumns) => (prevNumColumns === 1 ? 2 : 1));
  };

  const toggleSearchVisibility = () => {
    setSearchVisible((prevVisible) => !prevVisible);
  };

  const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const halfStars = rating - fullStars >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    const renderStars = (count, icon, color, opacity = 1) => (
      [...Array(count)].map((_, index) => (
        <FontAwesomeIcon
          key={`${icon}-${index}`}
          icon={icon}
          size={20}
          color={color}
          style={{ opacity }}
        />
      ))
    );

    return (
      <View style={styles.starContainer}>
        {renderStars(fullStars, faStar, '#FFD700')}
        {renderStars(halfStars, faStarHalf, '#F5B530')}
        {renderStars(emptyStars, faStar, '#F5B530', 0.3)}
      </View>
    );
  };

  const renderMovieItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('MovieDetails', { imdbID: item.imdbID })}>
      <View style={[styles.card, { width: numColumns === 1 ? width - 30 : (width / 2) - 30 }]}>
        <Image source={{ uri: item.Poster }} style={styles.image} />
        <Text style={styles.cardTitle}>
          {item.Title} ({item.Year})
        </Text>
        <Text style={styles.rating}>IMDb Rating: {item.imdbRating}</Text>
        <StarRating rating={parseFloat(item.imdbRating) / 2} />
        <Text style={styles.plot}>{item.Plot}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Watch Now</Text>
          <TouchableOpacity onPress={toggleSearchVisibility}>
            <FontAwesomeIcon icon={faSearch} size={28} style={styles.searchIcon} />
          </TouchableOpacity>
        </View>
        {searchVisible && (
          <TextInput
            style={styles.searchBox}
            placeholder="Search Movies..."
            placeholderTextColor="gray"
            onChangeText={setSearch}
            onSubmitEditing={fetchMovies}
          />
        )}
        <TouchableOpacity onPress={toggleNumColumns} style={styles.toggleColButton}>
          <Text style={styles.toggleColText}>
            {numColumns === 1 ? 'List View' : 'Grid View'}
          </Text>
        </TouchableOpacity>
        {loading ? (
          <ActivityIndicator size="large" color="black" />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <FlatList
            data={movies}
            renderItem={renderMovieItem}
            numColumns={numColumns}
            keyExtractor={(item) => item.imdbID}
            contentContainerStyle={styles.movieList}
            key={numColumns}
            columnWrapperStyle={numColumns > 1 && { justifyContent: 'space-between' }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    bottom: 10,
  },
  title: {
    color: 'black',
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'Bebas Neue', // Changed to Roboto for consistency
    paddingTop: 35,
    paddingHorizontal: 20,
  },
  searchIcon: {
    color: 'black',
    right: 25,
    top: 15,
  },
  searchBox: {
    backgroundColor: 'white',
    color: 'black',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 0,
    marginVertical: 10,
    fontFamily: 'Roboto', // Ensure consistency for input
  },
  toggleColButton: {
    backgroundColor: '#0E2F63',
    padding: 11,
    borderRadius: 20,
    marginVertical: 10,
    position: 'absolute',
    top: 10,
    right: 60,
    zIndex: 1000,
  },
  toggleColText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Roboto', // Ensuring button text is clear
  },
  movieList: {
    padding: 10,
  },
  card: {
    backgroundColor: '#0E2F63',
    margin: 5,
    borderRadius: 20,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 300,
  },
  image: {
    width: '100%',
    height: 140,
    borderRadius: 0,
    marginBottom: 150,
    resizeMode: 'cover',
    aspectRatio: 2 / 3,
    position: 'absolute',
    top: 0,
  },
  cardTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 5,
    fontFamily: 'Bebas Neue', // Utilizing Open Sans for readability in titles
    textAlign: 'center',
    flexWrap: 'wrap',
  },
  rating: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
    fontFamily: 'Open Sans', // Use Open Sans for consistent readability
    flexWrap: 'wrap',
  },
  plot: {
    color: 'white',
    fontSize: 10,
    textAlign: 'center',
    padding: 10,
    fontFamily: 'Open Sans', // Continuity in description text
    flexWrap: 'wrap',
    maxHeight: 50,
  },
  errorText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: 'Open Sans', // Keeping error text legible and consistent
  },
  starContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 5,
  },
});

export default MovieHomeScreen;