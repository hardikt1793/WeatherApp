import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Button,
  ScrollView,
  Pressable,
  Image,
  ActivityIndicator,
} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {useThemeColors} from '@app/utils/theme';
import Header from '@app/components/Header';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import styles from '@app/styles/Details';
import KeyValueItem from '@app/components/KeyValueItem';
import GradientView from '@app/components/GradientView';
import useDetails from '@app/hooks/useDetails';
import {HourlyForecast} from '@app/types/api';

const Details = () => {
  const {params} = useRoute<RouteProp<{params: {city: string}}>>();
  const {city} = params;
  const navigation = useNavigation();
  const colors = useThemeColors();

  const {data, selectedHour, tempUnit, loading, setSelectedHour} =
    useDetails(city);

  const getTemperature = (tempCelsius: number, tempFahrenheit: number) => {
    return tempUnit === 'Celsius' ? `${tempCelsius}°C` : `${tempFahrenheit}°F`;
  };

  const currentTime = new Date(
    data?.current?.time_epoch * 1000,
  ).toLocaleTimeString();

  if (data === null) {
    return (
      <LinearGradient
        style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0}}
        colors={['#18213e', '#453a8e', '#9242a9']}
      />
    );
  }

  return (
    <View style={[styles.container]}>
      <GradientView />
      {loading && (
        <View style={styles.absoluteBackground}>
          <ActivityIndicator size={'large'} color={colors.text} />
        </View>
      )}

      <Header>
        <Pressable onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" color={colors.text} size={20} />
        </Pressable>
        <View>
          <Text style={[styles.title, {color: colors.text}]}>
            {data.location.name}
          </Text>
        </View>
        <View style={{width: 16}} />
      </Header>

      <Text style={[styles.forecastTitle, {color: colors.text}]}>
        Hourly Forecast
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={[styles.hourlyForecast, {maxHeight: 180}]}
        contentContainerStyle={{gap: 20, maxHeight: 180}}>
        {data.forecast.forecastday[0].hour.map((hour: any) => (
          <HourlyForecastItem
            key={hour.time_epoch}
            hour={hour}
            currentTime={currentTime}
            tempUnit={tempUnit}
            onClick={setSelectedHour}
          />
        ))}
      </ScrollView>

      <View style={styles.currentWeather}>
        <KeyValueItem label="Humidity" value={`${data.current.humidity}%`} />
        <KeyValueItem
          label="Precipitation"
          value={`${data.current.precip_mm} mm`}
        />
        <KeyValueItem
          label="Feels like"
          value={getTemperature(
            data.current.feelslike_c,
            data.current.feelslike_f,
          )}
        />
        <KeyValueItem label="Gust" value={`${data.current.gust_mph} mph`} />
        <KeyValueItem label="UV Index" value={data.current.uv.toString()} />
        <KeyValueItem
          label="Wind"
          value={`${data.current.wind_mph} mph (${data.current.wind_dir})`}
        />
      </View>

      {selectedHour && (
        <Modal
          transparent={true}
          visible={!!selectedHour}
          onRequestClose={() => setSelectedHour(null)}>
          <View style={[styles.modalOverlay]}>
            <View
              style={[styles.modalContent, {backgroundColor: colors.primary}]}>
              <Text style={[styles.modalTitle, {color: colors.text}]}>
                Weather Details at{' '}
                {new Date(selectedHour.time_epoch * 1000).toLocaleTimeString()}
              </Text>
              <KeyValueItem
                label="Condition"
                value={selectedHour.condition.text}
              />
              <KeyValueItem
                label="Temperature"
                value={getTemperature(selectedHour.temp_c, selectedHour.temp_f)}
              />
              <KeyValueItem
                label="Wind"
                value={`${selectedHour.wind_mph} mph (${selectedHour.wind_dir})`}
              />
              <KeyValueItem
                label="Humidity"
                value={`${selectedHour.humidity}%`}
              />
              <KeyValueItem
                label="Feels like"
                value={getTemperature(
                  selectedHour.feelslike_c,
                  selectedHour.feelslike_f,
                )}
              />
              <KeyValueItem
                label="Wind Chill"
                value={getTemperature(
                  selectedHour.windchill_c,
                  selectedHour.windchill_f,
                )}
              />
              <KeyValueItem
                label="Heat Index"
                value={getTemperature(
                  selectedHour.heatindex_c,
                  selectedHour.heatindex_f,
                )}
              />
              <KeyValueItem
                label="Dewpoint"
                value={getTemperature(
                  selectedHour.dewpoint_c,
                  selectedHour.dewpoint_f,
                )}
              />
              <KeyValueItem
                label="Gust"
                value={`${selectedHour.gust_mph} mph`}
              />
              <Button title="Close" onPress={() => setSelectedHour(null)} />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const HourlyForecastItem = ({
  hour,
  tempUnit,
  onClick,
}: {
  hour: HourlyForecast;
  currentTime: string;
  tempUnit: string;
  onClick: (hour: HourlyForecast) => void;
}) => {
  const colors = useThemeColors();

  const getTemperature = (tempCelsius: number, tempFahrenheit: number) => {
    return tempUnit === 'Celsius' ? `${tempCelsius}°C` : `${tempFahrenheit}°F`;
  };

  return (
    <TouchableOpacity
      style={[styles.hourlyItem, {backgroundColor: colors.card}]}
      onPress={() => onClick(hour)}>
      <LinearGradient
        style={styles.gradientAbsolute}
        colors={['#9D52AC', '#3E2D8F']}
      />
      <Image
        source={{uri: `https:${hour.condition.icon}`}}
        style={styles.icon}
      />
      <Text style={[styles.timeText, {color: colors.text}]}>
        {new Date(hour.time_epoch * 1000).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </Text>
      <Text style={[styles.tempText, {color: colors.text}]}>
        {getTemperature(hour.temp_c, hour.temp_f)}
      </Text>
      <Text style={[styles.conditionText, {color: colors.text}]}>
        {hour.condition.text}
      </Text>
    </TouchableOpacity>
  );
};

export default Details;
