import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import {useThemeColors} from '@app/utils/theme';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface SelectProps {
  options: string[];
  selectedValue: string;
  onSelect: (item: string) => void;
}

const Select: React.FC<SelectProps> = ({options, selectedValue, onSelect}) => {
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const colors = useThemeColors();
  const insets = useSafeAreaInsets();

  const handleSelect = (item: string) => {
    onSelect(item);
    setModalVisible(false);
  };

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 20,
      }}>
      <View style={styles.selectContainer}>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={[styles.selectButton, {backgroundColor: colors.card}]}>
          <Text style={{color: colors.background}}>{selectedValue}</Text>
        </TouchableOpacity>

        <Modal
          visible={isModalVisible}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}>
          <TouchableOpacity
            style={styles.modalOverlay}
            onPress={() => setModalVisible(false)}>
            <View
              style={[
                styles.modalContent,
                {backgroundColor: colors.card, paddingBottom: insets.bottom},
              ]}>
              <FlatList
                data={options}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={[styles.option]}
                    onPress={() => handleSelect(item)}>
                    <Text style={{color: colors.primary}}>{item}</Text>
                  </TouchableOpacity>
                )}
                keyExtractor={item => item}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  selectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    fontSize: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '100%',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  option: {
    paddingVertical: 15,
    borderBottomColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Select;
