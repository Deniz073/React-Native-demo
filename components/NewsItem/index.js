import { Text, View } from 'react-native'
import styles from './NewsItem.component.style'

export default function NewsItem ({ title, content, category }) {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{title} - {category}</Text>
      <View style={{ borderBottomColor: 'black', borderBottomWidth: 1 }} />
      <Text>{content}</Text>
    </View>
  )
}
