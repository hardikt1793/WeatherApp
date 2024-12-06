# Mentory 🌤️

Welcome to **Mentory**, your friendly neighborhood weather app! Whether you’re planning a trip, heading out for a walk, or just curious about the weather, Mentory has you covered with accurate and real-time updates.

---

## You can watch the demo of the app in action here:

[![Watch the video]](https://raw.githubusercontent.com/hardikt1793/WeatherApp/blob/main/video/WeatherApp.mp4)

---

## 🚀 What Makes Mentory Special?

- **Live Weather Updates**: Get the latest weather conditions, temperature, and more.
- **Location-Based Forecasts**: Using your location, Mentory provides hyper-local weather predictions.
- **Minimal & Clean Design**: A simple interface that gets you the information you need, fast.
- **Customizable Alerts**: Stay prepared with notifications for severe weather.

---

## 🛠 How Does It Work?

Mentory is built with:

- **React Native** with **TypeScript** for a seamless, cross-platform experience.
- **Geolocation** powered by `@react-native-community/geolocation` to fetch your local weather.
- **Clean Architecture**: Organized and efficient code for better performance and scalability.
- **Weather API**: [documentation](https://www.weatherapi.com/)

---

## 🛠 Setting Up Mentory

Ready to check out the weather? Let’s get you started:

### Prerequisites

1. Make sure you’ve efficient setup to run React Native project.

---

## Installation

1. **Clone the Repository and Install the Dependencies:**

```bash
npm install
# or
yarn install
```

2. Set Up Your API Key:

- Create a .env file in the project root.

- Add the following line with your weather API key:

```
WEATHER_API_TOKEN=your-api-key-here
```

- For iOS:

&nbsp;&nbsp;&nbsp;&nbsp;Open the ios/Podfile, ensure dependencies are updated, and run:

```bash
cd ios
pod install
cd ..
```

3. Run the App:

- On **iOS**:

```bash
npx react-native run-ios
```

- On **Android**:

```bash
npx react-native run-android
```
