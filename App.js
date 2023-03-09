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
    axios.get('https://2594-2a02-a443-aef9-1-38b0-17da-5f51-5d37.eu.ngrok.io/api/news')
      .then(response => {
        setNews(response.data.newsItems)
        setCategories(response.data.categories)
      })
      .catch(error => {
        console.error(error)
      })
  }

  function handledDelete (id) {
    axios.delete('https://2594-2a02-a443-aef9-1-38b0-17da-5f51-5d37.eu.ngrok.io/api/news/' + id)
      .then(response => {
        console.log(response.data)
        fetchData()
      })
      .catch(error => {
        console.error(error.response.data.errors)
      })
  }

  function handleAdd () {
    axios.post('https://2594-2a02-a443-aef9-1-38b0-17da-5f51-5d37.eu.ngrok.io/api/news/', newsData)
      .then(response => {
        console.log(response.data)
        setNewsData({ title: '', content: '', categoryId: null })
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
        renderItem={({ item }) => <NewsItem title={item.title} content={item.content} category={item.category?.name} id={item.id} handledDelete={handledDelete}/>}
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
            <Text style={ styles.button }>Voeg toe</Text>
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
  },
  button: {
    width: 100,
    color: 'red'
  }
})
