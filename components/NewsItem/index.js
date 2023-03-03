import { Text, View, TouchableOpacity } from 'react-native'
import styles from './NewsItem.component.style'
import axios from 'axios'

export default function NewsItem ({ title, content, category, id, handleDestroy }) {

 


  return (
    <View style={styles.item}>
      <Text style={styles.title}>{title} - {category}</Text>
      <View style={{ borderBottomColor: 'black', borderBottomWidth: 1 }} />
      <Text>{content}</Text>
      <TouchableOpacity onPress={() => {
        handleDestroy(id)
      }}>
            <Text style={{ color: 'red' }}>Verwijder</Text>
      </TouchableOpacity>
    </View>
  )
}
