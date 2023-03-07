import { TouchableOpacity, Text, View } from 'react-native'
import styles from './NewsItem.component.style'
import axios from 'axios'

export default function NewsItem ({ id, title, content, category, setNews }) {

  function fetchData () {
    axios.get('https://joeyvs.eu-1.sharedwithexpose.com/api/news/')
      .then(response => {
        setNews(response.data.newsItems)
      })
      .catch(error => {
        console.error(error)
      })
  }

  function handleDelete() {
    axios.delete('https://joeyvs.eu-1.sharedwithexpose.com/api/news/'.concat(id))
    .then(response => {
      fetchData()
    })
    .catch(error => {
      console.error(error?.response?.data?.errors)
    })
  }

  return (
    <View style={styles.item}>
      <Text style={styles.title}>{title} - {category}</Text>
      <View style={{ borderBottomColor: 'black', borderBottomWidth: 1 }} />
      <Text>{content}</Text>
      <TouchableOpacity onPress={handleDelete}>
            <Text style={{ color: 'red' }}>Delete</Text>
          </TouchableOpacity>
    </View>
  )
}
