import React from 'react';

import {
    View,
    Dimensions,
    ImageBackground
  } from 'react-native';


const SplashScreen = () => {
    return (
        <View style={{flex: 1}} >
            <ImageBackground source={require('../assets/images/splash.png')} style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height}}/>
        </View>
    );
}
export default SplashScreen;