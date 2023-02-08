import SelectDropdown from 'react-native-select-dropdown'
import { StyleSheet } from 'react-native'

export default function SelectDropDown({ data, defaultText, itemTextProperty, onSelect }) {
  return (
    <SelectDropdown
      data={data}
      defaultButtonText={defaultText}
      onSelect={(selectedItem, index) => {
        onSelect(selectedItem, index)
      }}
      buttonTextAfterSelection={(selectedItem) => {
        return selectedItem.name
      }}
      rowTextForSelection={(item) => {
        return item[itemTextProperty]
      }}
      buttonStyle={styles.dropdown1BtnStyle}
      buttonTextStyle={styles.dropdown1BtnTxtStyle}
      dropdownStyle={styles.dropdown1DropdownStyle}
      rowStyle={styles.dropdown1RowStyle}
      rowTextStyle={styles.dropdown1RowTxtStyle}
    />
  )
}

const styles = StyleSheet.create({
  dropdown1BtnStyle: {
    padding: 10,
    marginHorizontal: 10,
    width: '95%',
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
  },
  dropdown1BtnTxtStyle: { color: '#444', textAlign: 'center' },
  dropdown1DropdownStyle: { backgroundColor: '#EFEFEF' },
  dropdown1RowStyle: { backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5' },
  dropdown1RowTxtStyle: { color: '#444', textAlign: 'center' },
});
