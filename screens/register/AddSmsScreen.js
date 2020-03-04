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
  AsyncStorage
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import api from '../../constants/api';
import {LoginData} from '../../constants/Constants';

import StripeFooter from '../../components/StripeFooter';
import Colors from '../../constants/Colors';
import { Labels } from '../../constants/Langs';


const logoUri = require('../../assets/images/icon-logo.png');




export default class AddSmsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          spinner: false,
          verifyNumber: ''
        }
    }

    componentDidMount(){     

    }

    phoneConfirm() {
        this.setState({spinner: true});
        const { verifyNumber } = this.state;
        console.log("ASDFSDFSADF", this.phoneConfirmResult);

        global.phoneConfirmResult.confirm(verifyNumber)
        .then(user => {
            this.setState({spinner: false});

            // alert("Success : " + JSON.stringify(user));
            // console.log(user);

            console.log("Is Individual? ", global.isIndividual);        

            if(global.isIndividual){                    
                this.props.navigation.replace('TutorialScreen');
            } else {
                this.props.navigation.replace('CompanyPackage');
            }

        }).catch(error =>  {
            this.setState({spinner: false});

            // alert("error : " + JSON.stringify(error));
            // console.log("phone confirm error", error);
            Alert.alert(
                'Error!',
                'Confirm your verification code',
                [
                    {text: 'OK', onPress: () =>  this.setState({spinner: false})},
                ],
                {cancelable: false},
            );
        });
    }

    goNext() {

                
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

                            <View style={{}}>

                                <View style={styles.titleBox}>
                                    <Text style= {{fontSize: 16, fontFamily: 'TheSans-Bold'}}>{Labels._sms_confirm_title}</Text> 
                                </View>
                                <View style={styles.contentBox}>
                                    <Text style= {{fontSize: 12, fontFamily: 'TheSans-Plain'}}>{Labels._sms_confirm_line1}</Text> 
                                </View>
                        
                                <View style={styles.contentBox}>
                                    <Text style = {{fontSize: 12, fontFamily: 'TheSans-Plain'}}>{Labels._sms_confirm_line2}</Text> 
                                </View>
                            </View>
                            
                            

                            <View style={styles.formBox}>
                                <View style={{}}>
                                    <View style={styles.formControl}>
                                      
                                        <TextInput style={styles.formInput} keyboardType="numeric" placeholder={Labels._sms_input_placeholder} value={this.state.verifyNumber} onChangeText={text => this.setState({verifyNumber: text})}/>
                                    </View>
                                </View>
                            
                            </View>
                        </View>

                    </View>
                    <View style={{height: Dimensions.get('window').height * 0.4, flexDirection: 'column'}}>
                        <StripeFooter goNext = {() => this.phoneConfirm()}/>
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
        marginTop: 35,
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
        paddingLeft: 8,
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
