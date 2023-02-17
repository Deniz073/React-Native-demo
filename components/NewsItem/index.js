import { Text, View, Button } from 'react-native'
import styles from './NewsItem.component.style'

export default function NewsItem ({ title, content, category, handleDelete, id }) {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{title} - {category}</Text>
      <View style={{ borderBottomColor: 'black', borderBottomWidth: 1 }} />
      <Text>{content}</Text>
      <Button title="Delete" onPress={() => handleDelete(id)}/>
    </View>
  )
}
