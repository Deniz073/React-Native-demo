import { Text, View, Button } from 'react-native'
import styles from './NewsItem.component.style'

export default function NewsItem ({ newsItem, handleDelete }) {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{newsItem.title} - {newsItem.category.name}</Text>
      <View style={{ borderBottomColor: 'black', borderBottomWidth: 1 }} />
      <Text>{newsItem.content}</Text>
      <Button title='Delete' onPress={() => handleDelete(newsItem.id)}></Button>
    </View>
  )
}
