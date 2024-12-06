import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  absoluteBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 2,
  },
  gradientAbsolute: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  location: {
    fontSize: 16,
    color: 'gray',
    paddingHorizontal: 16,
  },
  currentWeather: {
    paddingTop: 30,
    paddingBottom: 20,
  },
  currentTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  forecastTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 16,
    marginTop: 24,
  },
  hourlyForecast: {},
  hourlyItem: {
    padding: 16,
    borderRadius: 48,
    width: 120,
    alignItems: 'center',
    gap: 8,
    overflow: 'hidden',
    borderWidth: 1,
  },
  currentItem: {
    backgroundColor: '#e0f7fa',
    borderColor: '#00796b',
    borderWidth: 2,
  },
  icon: {
    width: 64,
    height: 64,
  },
  timeText: {
    fontSize: 14,
  },
  tempText: {
    fontSize: 16,
    fontWeight: '700',
  },
  conditionText: {
    fontSize: 12,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    width: '80%',
    maxHeight: '70%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
});

export default styles;
