import React from 'react';
import {
  Image,
  ImageBackground,
  TouchableOpacity,
  View,
  Text,
  Dimensions,
  StyleSheet
} from 'react-native';
import Colors from '../constants/Colors';

const backgroundUri = require('../assets/images/background-image.png');


export default class StripeHeader extends React.Component {

  constructor(props) {
    super(props);
 
  

    this.state = {
        backImageUrl: props.imageUrl,
        isUserImage: props.isUserImage
    }
  }

  render() {
    return (
      <View style={{flexDirection: 'column', height: Dimensions.get('window').height * 0.2, width: Dimensions.get('window').width}}>
        <ImageBackground style={{flex: 5}} source={backgroundUri} imageStyle={{resizeMode: 'stretch', }} >
          <View style={{alignSelf: 'center', marginTop: 'auto', marginBottom: 'auto',
            width: Dimensions.get('window').width * 0.26,
            height: Dimensions.get('window').width * 0.26,
            borderRadius:  Dimensions.get('window').width * 0.13,
            borderStyle: 'dotted',
            borderColor: Colors.secondaryText,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1
        
        }}>

            <View style={{alignSelf: 'center', marginTop: 'auto', marginBottom: 'auto',
                width: Dimensions.get('window').width * 0.24,
                height: Dimensions.get('window').width * 0.24,
                borderRadius:  Dimensions.get('window').width * 0.12,
             
               backgroundColor: 'white',
                alignItems: 'center',
                justifyContent: 'center',
               
            }}>

                <Image 
                source={this.state.backImageUrl}
                style={ this.state.isUserImage ? styles.useImageStyle : styles.companyImageStyle}
                />

            </View>

          </View>
        </ImageBackground>
      
      </View>
    );
  }
}

const styles = StyleSheet.create({
  useImageStyle: {
    width: Dimensions.get('window').width * 0.24,
    height: Dimensions.get('window').width * 0.24,
    borderRadius: Dimensions.get('window').width *0.12,
    // resizeMode: 'stretch'
  },
  companyImageStyle:{
    width: Dimensions.get('window').width * 0.24,
    height: Dimensions.get('window').width * 0.24,
    borderRadius: Dimensions.get('window').width *0.12,
    // resizeMode: 'stretch'
  }
});

