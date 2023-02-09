import SelectDropdown from 'react-native-select-dropdown'
import styles from './Dropdown.component.style.js'

export default function Dropdown ({ data, defaultText, itemTextProperty, onSelect }) {
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
