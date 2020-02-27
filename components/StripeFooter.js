import React from 'react';
import {
  Image,
  ImageBackground,
  TouchableOpacity,
  View,
  Text,
  Dimensions
} from 'react-native';
import Colors from '../constants/Colors';

const backgroundUri = require('../assets/images/login/divider.png');
const backIconUri = require('../assets/images/login/icon-back.png');

export default class StripeFooter extends React.Component {

  constructor(props) {
    super(props);
 
  }

  render() {
    return (
      <View style={{flex:1, flexDirection: 'column'}}>
        <ImageBackground 
          style={{flex: 5}} 
          source={backgroundUri}
          imageStyle={{
            resizeMode: 'stretch', 
          }}
        >
          <TouchableOpacity
            style={{
              alignSelf: 'center',
              marginTop: 'auto',
              marginBottom: 'auto',
            }}
            onPress={() => this.props.goNext()}
          >

            <Image 
              source={backIconUri}
              style={{
                width: Dimensions.get('window').width * 0.25,
                height: Dimensions.get('window').width * 0.25,
              }}
            />

          </TouchableOpacity>
        </ImageBackground>
        <View style={{flex: 3, backgroundColor: Colors.primaryBackground}}></View>
      </View>
    );
  }
}
