import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useThemeColors} from '@app/utils/theme';
import Select from '@app/components/Select';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import useSettings from '@app/hooks/useSettings';
import styles from '@app/styles/Settings';
import Header from '@app/components/Header';

const Settings = () => {
  const colors = useThemeColors();
  const navigation = useNavigation();
  const {selectedUnit, setSelectedUnit, saveToAsync} = useSettings();

  const options = ['Celsius', 'Fahrenheit'];

  return (
    <View style={styles.container}>
      <LinearGradient
        style={styles.gradient}
        colors={['#18213e', '#453a8e', '#9242a9']}
      />
      <Header>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" color={colors.text} size={20} />
        </TouchableOpacity>
      </Header>

      <View style={styles.content}>
        <Text style={[styles.title, {color: colors.text}]}>
          Select Temperature Unit:
        </Text>

        <Select
          options={options}
          selectedValue={selectedUnit}
          onSelect={async item => {
            setSelectedUnit(item);
            await saveToAsync('temperature_unit', item);
          }}
        />
      </View>
    </View>
  );
};

export default Settings;
