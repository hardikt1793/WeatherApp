module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ['module:react-native-dotenv'],
    [
      'module-resolver',
      {
        alias: {
          '@app': './app',
          '@components': './app/components',
          '@hooks': './app/hooks',
          '@screens': './app/screens',
          '@services': './app/services',
          '@navigation': './app/navigation',
          '@types': './@types',
          '@styles': './app/styles',
          '@utils': './app/utils',
        },
      },
    ],
  ],
};
