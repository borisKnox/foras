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

import Dash from 'react-native-dash';

import StripeFooter from '../../components/StripeFooter';
import Colors from '../../constants/Colors';
import { Labels } from '../../constants/Langs';

const logoUri = require('../../assets/images/icon-logo.png');




export default class EmailVerificationScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          
        }
    }

    componentDidMount(){     

    }

    goNext() {
        this.props.navigation.replace('AddPhoneNumberScreen');
    }

    render() {

        return (
            <KeyboardAvoidingView style={styles.container}>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                    <View style={{height: Dimensions.get('window').height * 0.7}}>
                        <View style={styles.logoContainer}>
                            <Image source={logoUri} style={styles.logoImage} resizeMode="contain"/>
                        </View>

                        <View style={styles.verificationPart}>

                            <View style={{}}>
                                <View style={styles.titleBox}>
                                    <Text style= {{fontSize: 16, fontFamily: 'TheSans-Bold'}}>{Labels._confirm_alert}</Text> 
                                </View>
                            
                                <View style={styles.contentBox}>
                                    <Text style= {{fontSize: 10, fontFamily: 'TheSans-Plain'}}>{Labels._sent_inform_line1}</Text> 
                                </View>
                        
                                <View style={styles.contentBox}>
                                    <Text style = {{fontSize: 10, fontFamily: 'TheSans-Plain'}}>{Labels._sent_inform_line2}</Text> 
                                </View>
                            </View>
                            
                            

                            <View style={styles.switchButtonContainer}>
                                <TouchableOpacity style={styles.switchButton} >
                                    <Text style={styles.switchText} >{Labels._resend_email}</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.switchButton} onPress={() => this.setCompany()}>
                                    <Text style={styles.switchText}>{Labels._change_email}</Text>
                                </TouchableOpacity>
                            </View>

                            <Dash style={styles.dash} dashColor = {Colors.secondaryText}/>

                            <View style={{}}>
                                <TouchableOpacity style={styles.phoneVerifyButton}>
                                    <Text style={styles.switchText} >{Labels._confirm_by_mobile}</Text>
                                </TouchableOpacity>
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
    switchButtonContainer: {
        marginTop: 30,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: Dimensions.get('window').width * 0.8,
        
    },
    switchButton : {
     
        borderRadius: 20,
        height: 35, 
        width: Dimensions.get('window').width * 0.36,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000'
       
       
    },

    dash : {
     
      
        height: 1, 
        width: Dimensions.get('window').width * 0.73,
        alignItems: 'center',
        justifyContent: 'center',
      
        marginTop: 10,
        marginBottom:18
       
       
    },
    phoneVerifyButton : {
     
        borderRadius: 20,
        height: 35, 
        width: Dimensions.get('window').width * 0.72,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primarySpeical
       
       
    },

    switchText: {
        color: '#fff',
        fontFamily: 'TheSans-Plain',
        fontSize: 12
    },

    
});
