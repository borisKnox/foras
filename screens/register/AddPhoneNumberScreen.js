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
  Alert,

} from 'react-native';
import firebase from 'react-native-firebase';
import Spinner from 'react-native-loading-spinner-overlay';

import StripeFooter from '../../components/StripeFooter';
import Colors from '../../constants/Colors';
import { Labels } from '../../constants/Langs';


const logoUri = require('../../assets/images/icon-logo.png');




export default class AddPhoneNumberScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            spinner: false,
            phoneNumber: ''
        }
    }

    componentDidMount(){     

    }

    phoneVerify() {
        
    }

    goNext() {
        if(this.state.phoneNumber != ''){
            this.setState({spinner: true});
            const { phoneNumber } = this.state;
            firebase.auth().signInWithPhoneNumber(phoneNumber)
            .then(confirmResult => {
                this.setState({spinner: false});

                this.props.navigation.replace('AddSmsScreen');
                
                // Alert.alert(
                //     'Success!',
                //     'Sent',
                //     [
                //         {text: 'OK', onPress: () =>  this.setState({spinner: false})},
                //     ],
                //     {cancelable: false},
                // );
                console.log("AAAAAA", confirmResult);
                // this.phoneConfirmResult = confirmResult;
                global.phoneConfirmResult = confirmResult;

            })
            .catch(error => {
                // alert(JSON.stringify(error));
                // console.log("ERROR", error);

                Alert.alert(
                    'Error!',
                    'Phone number Error',
                    [
                        {text: 'OK', onPress: () =>  this.setState({spinner: false})},
                    ],
                    {cancelable: false},
                );
            });
        }       

    }



    render() {

        return (
            <KeyboardAvoidingView style={styles.container}>
                <Spinner color="#FFF" visible={this.state.spinner}/>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                    <View style={{height: Dimensions.get('window').height * 0.7}}>
                        <View style={styles.logoContainer}>
                            <Image source={logoUri} style={styles.logoImage} resizeMode="contain"/>
                        </View>

                        <View style={styles.verificationPart}>

                            <View style={{marginTop: 30}}>

                                 
                                <View style={styles.contentBox}>
                                    <Text style= {{fontSize: 12, fontFamily: 'TheSans-Plain'}}>{Labels._add_phonenumber_line1}</Text> 
                                </View>
                        
                                <View style={styles.contentBox}>
                                    <Text style = {{fontSize: 12, fontFamily: 'TheSans-Plain'}}>{Labels._add_phonenumber_line2}</Text> 
                                </View>
                            </View>
                            
                            

                            <View style={styles.formBox}>
                                <View style={{}}>
                                    <View style={styles.formControl}>
                                        <Image source={require('../../assets/images/login/icon-phone.png')} name="mail" style={styles.formIconPhone} />
                                        <TextInput style={styles.formInput} placeholder={Labels._phone_number_placeholder}  value={this.state.phoneNumber} onChangeText={text => this.setState({phoneNumber: text})}/>
                                    </View>
                                </View>
                            
                            </View>
                        </View>

                    </View>
                    <View style={{height: Dimensions.get('window').height * 0.4, flexDirection: 'column'}}>
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

    titleBox: {
        marginTop: 30,
        height: 40, 
        width: Dimensions.get('window').width * 0.9,
        alignItems: 'center',
      
       
    },

    contentBox: {

     
        width: Dimensions.get('window').width * 0.9,
        alignItems: 'center',
    
    },

    verificationPart: {
        flex: 2,
        alignItems: 'center',
        // justifyContent: 'space-around',
    },
    formBox: {
        marginTop: 30,
        flex: 1,
        alignItems: 'center',
       
    },
    formControl: {
        borderColor: Colors.secondaryText, 
        borderWidth: 1,
        borderRadius: 20,
        height: 40, 
        width: Dimensions.get('window').width * 0.7,
        alignItems: 'flex-start',
    },
    formInput: {
        flex: 1,
        width: '100%',
        paddingLeft: 35,
        paddingRight: 8,
        textAlign: 'right', 
        fontFamily: 'TheSans-Plain'
    },
    formIconPhone: {
        position: 'absolute',
        left: 9,
        top: 11,
        height: 16,
        width: 18 
    },

    
});
