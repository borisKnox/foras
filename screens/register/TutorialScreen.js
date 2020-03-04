import React from 'react';

import {
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  TextInput,
  I18nManager
} from 'react-native';

import AppIntroSlider from 'react-native-app-intro-slider';

import StripeFooter from '../../components/StripeFooter';
import Colors from '../../constants/Colors';
import { Labels } from '../../constants/Langs';


const logoUri = require('../../assets/images/icon-logo.png');

const slides = [
    {
        key: '_tutorial1',
        title: Labels._tutorial1_text,
       
        image: require('../../assets/images/login/image-tutorial1.png'),
        backgroundColor: Colors.secondaryBackground,
        imageStyle: {
          
            width: '85%',
            resizeMode: 'stretch'
          
        },
        titleStyle: {
            fontFamily: 'TheSans-Bold',
            fontSize: 12,
            color: Colors.black,
            marginTop: 15,
            marginBottom: 20,
            textAlign: 'center',
        }        
    },
    {
        key: '_tutorial2',
        title: Labels._tutorial2_text,
      
        image: require('../../assets/images/login/image-tutorial2.png'),
        backgroundColor: Colors.secondaryBackground,
        imageStyle: {
         
            width: '85%',
            resizeMode: 'stretch'
        },
        titleStyle: {
            fontFamily: 'TheSans-Bold',
            fontSize: 12,
            color: Colors.black,
            marginTop: 15,
            marginBottom: 20,
            textAlign: 'center',
        }

        
    },
    {
        key: '_tutorial3',
        title: Labels._tutorial2_text,
      
        image: require('../../assets/images/login/image-tutorial3.png'),
        backgroundColor: Colors.secondaryBackground,
        imageStyle: {
         
            width: '85%',
            resizeMode: 'stretch'
        },
        titleStyle: {
            fontFamily: 'TheSans-Bold',
            fontSize: 12,
            color: Colors.black,
            marginTop: 15,
            marginBottom: 20,
            textAlign: 'center',
        }

        
    },
    {
        key: '_tutorial4',
        title: Labels._tutorial2_text,
      
        image: require('../../assets/images/login/image-tutorial4.png'),
        backgroundColor: Colors.secondaryBackground,
        imageStyle: {
         
            width: '85%',
            resizeMode: 'stretch'
        },
        titleStyle: {
            fontFamily: 'TheSans-Bold',
            fontSize: 12,
            color: Colors.black,
            marginTop: 15,
            marginBottom: 20,
            textAlign: 'center',
        }

        
    },
    {
        key: '_tutorial5',
        title: Labels._tutorial2_text,
      
        image: require('../../assets/images/login/image-tutorial5.png'),
        backgroundColor: Colors.secondaryBackground,
        imageStyle: {
         
            width: '85%',
            resizeMode: 'stretch'
        },
        titleStyle: {
            fontFamily: 'TheSans-Bold',
            fontSize: 12,
            color: Colors.black,
            marginTop: 15,
            marginBottom: 20,
            textAlign: 'center',
        }

        
    },
  ];


export default class TutorialScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            pwdSecure: true,

            isLogin: true,
            isIndividual: true,
        }
    }

    componentDidMount(){
        this.setState({isLogin: true});
        this.setState({isIndividual: true});

        global.isLogin = true;

    }

    goNext() {

        if(global.isIndividual){
            this.props.navigation.replace('Main1');
        } else {
            this.props.navigation.replace('Main');
        }

    }

    render() {

        return (
            <KeyboardAvoidingView style={styles.container}>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                    <View style={{height: Dimensions.get('window').height * 0.8}}>
                        <View style={styles.logoContainer}>
                            <Image source={logoUri} style={styles.logoImage} resizeMode="contain"/>
                        </View>
                   
                        <View style={styles.userSlideContainer}>
                            <View style={{height: Dimensions.get('window').height * 0.6,}}>
                                <AppIntroSlider slides={slides} showNextButton={false} showDoneButton={false}
                                activeDotStyle={{backgroundColor: 'rgba(0, 0, 0, .9)'}}/>
                            </View>
                       
                        </View>

                    </View>
                    <View style={{height: Dimensions.get('window').height * 0.3, flexDirection: 'column'}}>
                        <StripeFooter goNext = {() => this.goNext()}/>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.secondaryBackground,
    },
    contentContainer: {
        flex: 1,
        paddingTop: 0,
    },
    logoContainer: {
        height: Dimensions.get('window').width * 0.35,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    logoImage: {
        width: Dimensions.get('window').width * 0.4,
    },
    userSlideContainer: {
        flex: 2.5,

        
        alignItems: 'center',
     
     
    },

    slideImage: {
        height: Dimensions.get('window').width * 0.35,
        width: Dimensions.get('window').width * 0.9,
    }

   

});
