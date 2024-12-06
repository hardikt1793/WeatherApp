import {useThemeColors} from '@app/utils/theme';
import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

interface IKeyValueItem {
  label: string;
  value: string;
}

const KeyValueItem = ({label, value}: IKeyValueItem) => {
  const colors = useThemeColors();
  return (
    <View style={styles.container}>
      <Text style={[styles.label, {color: colors.text}]}>{label}</Text>
      <Text style={[styles.value, {color: colors.text}]}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 16,
  },
});
export default KeyValueItem;
