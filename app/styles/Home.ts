import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
    gap: 20,
  },
  cityText: {
    fontSize: 24,
    fontWeight: '600',
  },
  countryText: {
    fontSize: 16,
  },
  weatherCard: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  temperatureText: {
    fontSize: 60,
    fontWeight: '500',
  },
  weatherIcon: {
    width: 64,
    height: 64,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 16,
    borderRadius: 10,
    fontSize: 16,
    paddingVertical: 16,
    width: '100%',
  },
  suggestionItem: {
    padding: 10,
    backgroundColor: '#fff',
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  gradient: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    justifyContent: 'flex-end',
    width: '100%',
  },
  suggestionsList: {
    position: 'absolute',
    top: 60,
    width: '100%',
    zIndex: 1,
    maxHeight: 400,
  },
  locationCard: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {height: 0, width: 1},
    shadowOpacity: 0.3,
    shadowRadius: 10,
    overflow: 'hidden',
  },
  locationCardGradient: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  locationCardContent: {
    gap: 8,
    maxWidth: '60%',
  },
  dateText: {
    fontSize: 12,
    fontWeight: '600',
    fontStyle: 'italic',
  },
  mapImage: {
    height: 100,
    width: 100,
    borderRadius: 12,
  },
  weatherCardContainer: {
    paddingVertical: 20,
    gap: 20,
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  weatherCardGradient: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  weatherConditionText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  astroDataContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  astroDataText: {
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: '600',
  },
  divider: {
    height: 2,
    backgroundColor: '#ddd',
    width: '100%',
  },
  seeMoreButton: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  seeMoreText: {
    fontSize: 16,
    fontWeight: 'bold',
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
});

export default styles;
