import { Text, View } from 'react-native'
import styles from './NewsItem.component.style'

export default function NewsItem ({ item, handleDelete }) {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{item.title} - {item.category.name}</Text>
      <View style={{ borderBottomColor: 'black', borderBottomWidth: 1 }} />
      <Text>{item.content}</Text>
      <Button title="Delete" onPress={() => handleDelete(item.id)}/>
    </View>
  )
}
