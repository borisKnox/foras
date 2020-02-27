import 'core-js'
import React, { useState , useEffect, Component } from 'react';
import { Platform, StatusBar, StyleSheet, View, AsyncStorage } from 'react-native';


import AppNavigator from './navigation/AppNavigator';
import SplashScreen from './screens/SplashScreen';


export default function App(props) {

  // componentDidMount() {
  //   console.log("==========didMount of App. js================")
  // }

  const API_KEY = "d92fc707c0ae46298a601742a7a33b7c";
  const URL = 'https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${API_KEY}';
  const [articles, setArticles] = useState([]);
  const [loading, setLoading ] = useState(true);
  useEffect(()=>{
    fetch(URL)
    .then((response) => response.json())
    .then((responseJson) => {
      
      return responseJson.articles;
    })
    .then( articles  => {
      setArticles(articles);
      //console.log(articles);
      setLoading(false);
    })
    .catch( error => {
      console.error(error);
    });

  } , []);


  if (loading) {
    return (
      //  <SplashScreen />
       <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <AppNavigator />
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <AppNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});