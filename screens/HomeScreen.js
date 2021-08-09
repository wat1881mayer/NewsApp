import React ,{useState,useEffect,useRef} from 'react';
import { StyleSheet, View,FlatList,SafeAreaView, RefreshControl} from 'react-native';
import ListItem from '../components/ListItem';
import Loding from '../components/Loding'
import dummyArticles from '../dummies/articles.json';
import constants from 'expo-constants'
import axios from 'axios'


const URL = `https://newsapi.org/v2/top-headlines?country=jp&apiKey=${constants.manifest.extra.newsApiKey}`

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  itemContainer: {
    height: 100,
    borderColor: "gray",
    borderWidth: 1,
    width: "100%",
    flexDirection: "row"
  },
  leftContainer:{
    width: 100,
  },
  rightContainer:{
    flex: 1,
    padding: 10,
    justifyContent: "space-between",
  },
  text: {
    fontSize: 15,
  },
  subtText: {
    fontSize: 12,
    color: "gray",
  }
});

export default HomeScreen = ({navigation})=> {
  const [articles,setArticles] = useState(dummyArticles)
  const [loading,setLoading] = useState(false)
  const [refreshing ,setRefreshing] = useState(false)
  const pageRef = useRef(1)
  const fetchedAllRef = useRef(false)

  useEffect(()=> {
    setLoading(true)
    fetchArticles(1)
    setLoading(false)
  },[])

const fetchArticles =  async (page)=>{
  
  try{
    const response = await axios.get(`${URL}&page=${page}`)
    if (response.data.articles.length >0){
      setArticles((prevArticles) => [...prevArticles,...response.data.articles])
    }else {
      fetchedAllRef.current = true
    }
    
  }catch{(error)
    console.error(error)
  }
  
}

const onEndReached = () => {
  pageRef.current = pageRef.current + 1
  fetchArticles(pageRef.current)
}

const onRefresh = async () => {
  setRefreshing(true)
  setArticles([])
  pageRef.current = 1
  fetchedAllRef.current = false
  await fetchArticles(1)
  setRefreshing(false)
}

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={articles}
        renderItem={({item})=>
          <ListItem 
          imageUrl={item.urlToImage}
          title={item.title}
          author={item.author}
          onPress={()=> navigation.navigate('Article',{article: item})}
          />}
          keyExtractor={(item,index)=> index.toString()}
          onEndReached={onEndReached}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              />
            }
            />
      </SafeAreaView>
  );
}

