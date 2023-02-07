import { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, FlatList, TouchableOpacity, Button, TextInput, StyleSheet } from 'react-native';
import NewsItem from './components/NewsItem';

export default function App() {
  const [news, setNews] = useState([]);
  const [newsData, setNewsData] = useState({ title: '', content: '' });

  useEffect(() => {

    fetch('http://192.168.2.11:8000/api/news')
      .then(response => response.json())
      .then(data => {
        setNews(data);
      })
      .catch(error => {
        console.error(error);
      });

  }, []);

  function handleAdd() {
    setNews(
      [...news, { id: news.length + 2, title: newsData.title, content: newsData.content }]
    )
  }

  return (
    <SafeAreaView>
      <Text>React native demo</Text>

      <FlatList
        data={news}
        renderItem={({ item }) => <NewsItem title={item.title} content={item.content} category={item.category.name} />}
        keyExtractor={item => item.id}
      />

      <View>
        <TextInput style={styles.textInput} placeholder="Title" onChangeText={text => setNewsData({ ...newsData, title: text })} />
        <TextInput style={styles.textInput} placeholder="Content" onChangeText={text => setNewsData({ ...newsData, content: text })} />

        <View style={styles.buttonGroup}>
          <Button title="Add" onPress={handleAdd} />

          <TouchableOpacity onPress={handleAdd}>
            <Text style={{ color: "red" }}>Voeg toe</Text>
          </TouchableOpacity>
        </View>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    margin: 10,
  }
});




