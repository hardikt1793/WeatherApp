import React, {} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  TouchableHighlight,
  ActivityIndicator,
} from 'react-native';
import styles from '@styles/Home';
import Header from '@components/Header';
import _debounce from 'lodash/debounce';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import LinearGradient from 'react-native-linear-gradient';
import useHome from '@app/hooks/useHome';

interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  windSpeed: number;
  precipitation: number;
  humidity: number;
  weatherCondition: string;
  windDirection: string;
  icon: string;
}

interface AstroData {
  sunrise: string;
  sunset: string;
}

const Home = () => {
  const {
    weatherData,
    astroData,
    query,
    setQuery,
    suggestions,
    loading,
    permissionGranted,
    debouncedFetchCitySuggestions,
    temperatureUnit,
    colors,
    navigation,
    setSuggestions,
    fetchWeatherData,
    handleLocationPress,
    setcurrentCity,
    currentCity
  } = useHome();
  

  return (
    <View style={styles.container}>
      <LinearGradient
        style={styles.gradient}
        colors={['#18213e', '#453a8e', '#9242a9']}
      />
      <Header>
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <Icon name="settings" color={colors.text} size={20} />
          </TouchableOpacity>
        </View>
      </Header>

      {loading && (
        <View style={styles.absoluteBackground}>
          <ActivityIndicator size={'large'} color={colors.text} />
        </View>
      )}
      <View style={styles.searchContainer}>
        <TextInput
          style={[
            styles.searchInput,
            {backgroundColor: colors.card, color: colors.background},
          ]}
          placeholder="Search by city..."
          placeholderTextColor={colors.overlay}
          value={query}
          onChangeText={text => {
            setQuery(text);
            debouncedFetchCitySuggestions(text);
          }}
        />

        <TouchableOpacity
          onPress={handleLocationPress}
          style={{position: 'absolute', right: 16}}>
          <FontAwesome6
            name="location-crosshairs"
            size={20}
            color={colors.background}
          />
        </TouchableOpacity>
        {query && (
          <FlatList
            style={styles.suggestionsList}
            data={suggestions}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <TouchableHighlight
                onPress={() => {
                  setQuery(item.name);
                  fetchWeatherData(item.name);
                  setSuggestions([]);
                  setcurrentCity(item.name);
                  setQuery('');
                }}>
                <View
                  style={[
                    styles.suggestionItem,
                    {backgroundColor: colors.card},
                  ]}>
                  <Text style={{color: colors.background}}>
                    {item.name}, {item.region} ({item.country})
                  </Text>
                </View>
              </TouchableHighlight>
            )}
          />
        )}
      </View>

      <View style={styles.locationCard}>
        <LinearGradient
          style={styles.locationCardGradient}
          colors={['#3E2D8F', '#735FB5', '#805CCB']}
        />
        <View style={styles.locationCardContent}>
          <Text style={[styles.cityText, {color: colors.text}]}>
            {permissionGranted === false && !weatherData
              ? 'GPS disabled'
              : weatherData?.city || 'Fetching Location...'}
          </Text>
          <Text style={[styles.countryText, {color: colors.text}]}>
            {permissionGranted === false && !weatherData
              ? 'You can check the weather of any city using the search box.'
              : weatherData?.country || '...'}
          </Text>
          <Text style={[styles.dateText, {color: colors.text}]}>
            {new Date().toLocaleDateString()}
          </Text>
        </View>
        <Image source={require('../img/map.png')} style={styles.mapImage} />
      </View>

      {weatherData && (
        <View style={styles.weatherCardContainer}>
          <LinearGradient
            style={styles.weatherCardGradient}
            colors={['#9D52AC', '#3E2D8F']}
            start={{x: 0, y: 1}}
            end={{x: 1, y: 0}}
          />
          <View style={styles.weatherCard}>
            <Image
              source={{uri: weatherData.icon}}
              style={styles.weatherIcon}
            />
            <Text style={[styles.weatherConditionText, {color: colors.text}]}>
              {weatherData.weatherCondition}
            </Text>
            <Text style={[styles.temperatureText, {color: colors.text}]}>
              {weatherData.temperature.toFixed(1)}°
              {temperatureUnit === 'Celsius' ? 'C' : 'F'}
            </Text>
          </View>
          {astroData && (
            <View style={styles.astroDataContainer}>
              <Text style={[styles.astroDataText, {color: colors.text}]}>
                Sunrise{'\n'}
                {astroData.sunrise}
              </Text>
              <Text style={[styles.astroDataText, {color: colors.text}]}>
                Sunset{'\n'}
                {astroData.sunset}
              </Text>
            </View>
          )}
          <View style={styles.divider} />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Details', {city: weatherData.city});
            }}
            style={styles.seeMoreButton}>
            <Text style={[styles.seeMoreText, {color: colors.text}]}>
              See More
            </Text>
            <FontAwesome6 name="angle-right" size={20} color={colors.text} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Home;
