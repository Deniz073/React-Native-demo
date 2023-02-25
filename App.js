import { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, FlatList, TouchableOpacity, Button, TextInput, StyleSheet, Platform } from 'react-native'
import Dropdown from './components/Dropdown'
import NewsItem from './components/NewsItem'
import axios from 'axios'

export default function App () {
  const [news, setNews] = useState([])
  const [categories, setCategories] = useState([])
  const [newsData, setNewsData] = useState({ title: '', content: '', categoryId: null })

  function fetchData () {
    axios.get('https://noorschreuder.eu-1.sharedwithexpose.com/api/news')
      .then(response => {
        setNews(response.data.newsItems)
        setCategories(response.data.categories)
      })
      .catch(error => {
        console.error(error)
      })
  }

  function handleAdd () {
    axios.post('https://noorschreuder.eu-1.sharedwithexpose.com/api/news', newsData)
      .then(response => {
        console.log(response.data)
        setNewsData({ title: '', content: '', categoryId: null })
        fetchData()
      })
      .catch(error => {
        console.error(error.response.data.errors)
      })
  }

  function handleUpdate () {
    axios.put(`https://noorschreuder.eu-1.sharedwithexpose.com/api/news/${newsData.id}`, newsData)
      .then(response => {
        console.log(response.data)
        setNewsData({ title: '', content: '', categoryId: null })
        fetchData()
      })
      .catch(error => {
        console.error(error.response.data.errors)
      })
  }

  function handleDelete (id) {
    axios.delete(`https://noorschreuder.eu-1.sharedwithexpose.com/api/news/${id}`)
      .then(response => {
        console.log(response.data)
        fetchData()
      })
      .catch(error => {
        console.error(error.response.data.errors)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>React native demo</Text>

      <FlatList
        style={{ height: 400 }}
        data={news}
        renderItem={({ item }) => <NewsItem title={item.title} content={item.content} category={item.category?.name} />}
        keyExtractor={item => item.id}
      />

      <View>
        <TextInput
          style={styles.textInput}
          placeholder="Title"
          value={newsData.title}
          onChangeText={text => setNewsData({ ...newsData, title: text })}
        />

        <TextInput
          style={styles.textInput}
          placeholder="Content"
          value={newsData.content}
          onChangeText={text => setNewsData({ ...newsData, content: text })}
        />

        <Dropdown
          data={categories}
          defaultText="Select category"
          itemTextProperty="name"
          onSelect={(selectedItem, index) => {
            setNewsData({ ...newsData, categoryId: selectedItem.id })
          }}
        />

        <View style={styles.buttonGroup}>
          <Button title="Add" onPress={handleAdd} />

          <TouchableOpacity onPress={handleAdd}>
            <Text style={{ color: 'red' }}>Voeg toe</Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'android' ? 25 : 0
  },
  header: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%'
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    margin: 10
  }
})
