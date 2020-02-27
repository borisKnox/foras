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
  I18nManager,
  
  AsyncStorage,
  Alert
} from 'react-native';
import { Notification, NotificationOpen } from 'react-native-firebase';
import MapView from 'react-native-maps';
import Modal from "react-native-modal";
import Dash from 'react-native-dash';
import Spinner from 'react-native-loading-spinner-overlay';
import firebase from 'react-native-firebase';
import RNPickerSelect from 'react-native-picker-select';
import { Chevron, Triangle } from 'react-native-shapes';

import api from '../../constants/api';
import {LoginData} from '../../constants/Constants';
import Colors from '../../constants/Colors';
import { Labels } from '../../constants/Langs';
import { Container, Header, Title, Content,  Footer, FooterTab,  Body, 
    Left, Right, Icon, Button, } from "native-base";

export default class HeaderScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           
          
        }
    }


    render() {

        return (
            <Container >
                <Header androidStatusBarColor="#F2620F" style={{backgroundColor:"#F2620F"}}>
                    <Left style={{flex: 1}}>
                        <TouchableOpacity  onPress={() => this.props.navigation.openDrawer()}>
                            <Image source={require('../../assets/images/sidemenu/icon-sidemenu.png')} style={{ width: 18, height: 16, marginLeft: 12 }}/>
                        </TouchableOpacity>
                    </Left>
                    <Body style={styles.headerBody }>
                        <Title style={{color: '#FFF'}}>{Labels._sidemenu_map}</Title>
                    </Body>
                    <Right style={{flex: 1}}>
                        <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('NotificationScreen')}>
                                <Image source = { require('../../assets/images/sidemenu/icon-menu-bell.png') }style={{ width: 19, height: 18, marginRight: 16, marginTop: -2, resizeMode: 'stretch' }} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('MessageScreen')}>
                                <Image source = { require('../../assets/images/sidemenu/icon-menu-mail.png') }style={{ width: 20, height: 16, marginRight: 14, resizeMode: 'stretch' }} />
                            </TouchableOpacity>
                        </View>
                    </Right>
                </Header>                
            </Container>
        );
    }
  
}

const styles = StyleSheet.create({
    triangleDown: {
        transform: [
        {rotate: '180deg'}
        ]
    },
    testBorder: {
        borderColor: 'red',
        borderWidth: 2,
    },
    layoutDefault: {
        flex: 1
    },
    container: {
        flex: 1,
        backgroundColor: Colors.secondaryBackground,
        alignItems: 'center',
        overflow: 'hidden'
    },
    contentContainer: {
        flex: 1,
        paddingTop: 0,
        height: Dimensions.get('window').height  *1.7,
        width: Dimensions.get('window').width * 0.8,
        overflow: 'hidden'
    },
    backgroundImage: {
        position: 'absolute',
        marginTop: -50,
      
        width: '100%',
    },

    mapMaskView: {
        borderRadius: 20, 
        marginTop: 20, 
        overflow: 'hidden'
    },

    mapContainer: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width * 0.85,
        // borderRadius: 20,
        // marginTop: 20,
        // overflow: 'hidden'

    },

    bottomButtonPart: {
        position: 'absolute',
        bottom: 0,
        height: 53,
        backgroundColor: Colors.white,
      
        width: '100%',

        shadowColor: Colors.black,
        shadowOffset: {
            width: 8, height: 8
        },
        shadowOpacity: 0.5,
        elevation: 24
    },

    bottomListButton: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50
    },
    buttonIcon: {
        height: 24,
        width: 16,
    },
    buttonListText: {
        fontSize: 14,
        marginLeft: 15,
        // fontFamily: 'arbfonts-the-sans-plain'

    },

    filterButtonPart: {
        height: Dimensions.get('window').width * 0.14,
        width: Dimensions.get('window').width * 0.14,
        bottom: 100,
        right: 50,
        position: 'absolute',
        borderRadius: Dimensions.get('window').width * 0.28,
        backgroundColor: Colors.black,
        opacity: 0.7,
        alignItems: "center",
        justifyContent: 'center',
    },
    filterIcon: {
        width: 25,
        height: 25,
    },

    modalContainer: {
        flex: 1,
        alignItems: 'center'
    },
    modalContent: {
        width: Dimensions.get('window').width * 0.85,
        height: Dimensions.get('window').width * 0.46,
        backgroundColor: Colors.white,
        borderRadius: 10,
        position: "absolute",
        bottom: 200,
        flex: 1, 
        alignItems: "center"
    },
    modalButton: {
        width: Dimensions.get('window').width * 0.18,
        height: Dimensions.get('window').width * 0.18,
        borderRadius: Dimensions.get('window').width * 0.09,
        backgroundColor: Colors.black,
        opacity: 0.7,
        alignItems: 'center',
        justifyContent: 'center',
        position: "absolute",
        bottom: 80
    },
    modalGoIcon: {
   
        height: 30,
    },

    dash : {
        height: 1, 
        width: Dimensions.get('window').width * 0.7,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
    workDayButton: {
        height: 30, 
        width: '20%', 
        alignItems: "center", 
        justifyContent: 'center', 
        borderRadius: 20, 
        borderColor: Colors.secondaryText, 
        borderWidth: 1
    },
    workDayActiveButton: {
        height: 30, 
        width: '20%', 
        alignItems: "center", 
        justifyContent: 'center', 
        borderRadius: 20, 
        backgroundColor: Colors.primarySpeical
    },
    workdayText: {
        fontSize: 12, 
        color: Colors.secondaryText
    },
    workdayActiveText: {
        fontSize: 12, 
        color: Colors.white
    },
    optionIconDown: {
        position: 'absolute',
        right: 9,
        top: 12,
        height: 12,
        width: 12 
    },
    mapmarker: {

    }
  

    
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 15,
        paddingVertical: 8,
        // width: Dimensions.get('window').width * 0.7,
        width: Dimensions.get('window').width * 0.7,

        borderWidth: 0.5,
        borderColor: Colors.secondaryText,
        // backgroundColor:'#f8f8f8',
        borderRadius: 30,
        color: 'black',
        // marginBottom: 20,
        textAlign: 'right'  

    },
    inputAndroid: {
        fontSize: 15,
        // paddingLeft: '3%',
        // paddingRight: '60%',
        width: Dimensions.get('window').width * 0.7,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderRadius: 30,
        borderColor: Colors.secondaryText,
        // backgroundColor: 'red',
        //borderRadius: 8,
        color: 'black',
        // marginBottom: 20,
        textAlign: 'right'  
    },
});

const pickerSelectStyles1 = StyleSheet.create({
    inputIOS: {
        fontSize: 15,
        paddingVertical: 8,
        // width: Dimensions.get('window').width * 0.7,
        width: "100%",

        borderWidth: 0.5,
        borderColor: Colors.secondaryText,
        // backgroundColor:'#f8f8f8',
        borderRadius: 30,
        color: 'black',
        // marginBottom: 20,
        textAlign: 'right'  

    },
    inputAndroid: {
        fontSize: 15,
        // paddingLeft: '3%',
        // paddingRight: '60%',
        width: '100%',
        paddingVertical: 7,
        borderWidth: 0.5,
        borderRadius: 30,
        borderColor: Colors.secondaryText,
        // backgroundColor: 'red',
        //borderRadius: 8,
        color: 'black',
        // marginBottom: 20,
        textAlign: 'right'  
    },
});
