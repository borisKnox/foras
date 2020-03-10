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
  Alert
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import InputScrollView from 'react-native-input-scroll-view';
import RNPickerSelect from 'react-native-picker-select';
import { Chevron, Triangle } from 'react-native-shapes';

import api from '../../constants/api';
import {UserData} from '../../constants/Constants';

import StripeFooter from '../../components/StripeFooter';
import Colors from '../../constants/Colors';
import { Labels } from '../../constants/Langs';

const logoUri = require('../../assets/images/icon-logo.png');

const cities = [
    {
        label: 'city1', 
        value: 'city1',
    },
    {
        label: 'city2', 
        value: 'city2',
    },
    {
        label: 'city3', 
        value: 'city3',
    },
];

const states = [
    {
        label: 'state1', 
        value: 'state1',
    },
    {
        label: 'state2', 
        value: 'state2',
    },
    {
        label: 'state3', 
        value: 'state3',
    },
];

export default class RegCompanyScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            spinner: false,
            address: '',
            state: '',
            city: '',
            phone: '',
            mobile: '',
            commercial: '',
            sector: '',
        }
    }

    componentDidMount(){       

    }

    goSignup(){
        this.setState({isLogin: false});
        global.isLogin = false;

        console.log(this.state.isLogin);
    }

    goLogin(){
        this.setState({isLogin: true});
        global.isLogin = true;

        console.log(this.state.isLogin);
    }

    setIndividual(){
        this.setState({isIndividual: true});
    }

    setCompany(){
        this.setState({isIndividual: false});
    }

    goNext() {
        this.setState({spinner: true});

        UserData.address = this.state.address;
        UserData.state = this.state.state;
        UserData.city = this.state.city;
        UserData.gender = this.state.gender;
        UserData.phone = this.state.phone;
        UserData.mobile = this.state.mobile;
        UserData.commercial = this.state.commercial;
        UserData.sector = this.state.sector;
        UserData.longitude = global.currentLongitude;
        UserData.latitude = global.currentLatitude;

        UserData.token = global.token;        

        api.registerCorporateProfile(UserData).then((res)=>{
            console.log('registerCorporateProfile response____');  
            console.log(res);
            if(res.status == 200){
                this.setState({spinner: false});
                
                global.loginInfo = res.data;
				this.props.navigation.replace('CompanyPackage'); 
                //this.props.navigation.replace('AddPhoneNumberScreen');                           
            }else{
                Alert.alert(
                    '',
                    [typeof(res.errors.address) == "undefined" ? "" : res.errors.address.toString()]  + "\n" + 
                    [typeof(res.errors.state) == "undefined" ? "": res.errors.state.toString()] + "\n" +
                    [typeof(res.errors.city) == "undefined" ? "": res.errors.city.toString()] + "\n" +
                    [typeof(res.errors.phone) == "undefined" ? "": res.errors.phone.toString()] + "\n" +
                    [typeof(res.errors.mobile) == "undefined" ? "": res.errors.mobile.toString()] + "\n" +
                    [typeof(res.errors.commercial_registeration) == "undefined" ? "": res.errors.commercial_registeration.toString()] + "\n" +
                    [typeof(res.errors.sector) == "undefined" ? "": res.errors.sector],
                    [
                        {text: 'OK', onPress: () =>  this.setState({spinner: false})},
                    ],
                    {cancelable: false},
                );
            }
        })
        .catch((error) => {
            console.log(error);
        })        
    }

   

    render() {
        const placeholder_city = {
            label: Labels._city,
            value: null,
            color: 'green',
        };

        const placeholder_state = {
            label: Labels._country,
            value: null,
            color: 'green',
        };
        
        return (
            <InputScrollView style={styles.container} topOffset={5}>   
                <Spinner color="#FFF" visible={this.state.spinner}/>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                    <View style={{height: Dimensions.get('window').height * 0.8}}>
                        <View style={styles.logoContainer}>
                            <Image source={logoUri} style={styles.logoImage} resizeMode="contain"/>
                        </View>
                   
                        <View style={styles.companyInfoForm}>

                            <View style={{}}>

                            
                                <View style={styles.contentBox}>
                                    <Text style= {{fontSize: 12, fontFamily: 'TheSans-Plain'}}>{Labels._company_register_line1}</Text> 
                                </View>

                                <View style={styles.contentBox}>
                                    <Text style = {{fontSize: 12, fontFamily: 'TheSans-Plain'}}>{Labels._company_register_line2}</Text> 
                                </View>
                            </View>

                            
                
                            <View style={{marginTop: 18}}>
                                <View style={styles.formControl}>
                                    <Image source={ require('../../assets/images/login/icon-map.png')} style={styles.formIconMarker} />
                                    <TextInput style={styles.formInput} placeholder={Labels._title} value={this.state.address} onChangeText={text => this.setState({address: text})}/>
                                </View>
                            </View>

                            <View style={styles.optionsContainer}>
                                {/* <TouchableOpacity style={styles.optionsControl}>
                                    <Image source={require('../../assets/images/login/icon-down.png')} style={styles.optionIconDown} />
                                    <Text style={styles.optionText} >{Labels._country}</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.optionsControl}>
                                    <Image source={require('../../assets/images/login/icon-down.png')} style={styles.optionIconDown} />
                                    <Text style={styles.optionText}>{Labels._city}</Text>
                                </TouchableOpacity> */}
                                <RNPickerSelect
                                    placeholder={placeholder_state}
                                    items={states}
                                    onValueChange={value => {
                                        this.setState({ state: value});
                                    }}
                                    style={{
                                        ...pickerSelectStyles,
                                        iconContainer: {
                                            top: 15,
                                            right: 15,
                                        },
                                    }}
                                    value={this.state.state}
                                    useNativeAndroidPickerStyle={false}
                                    
                                    Icon={() => {                                        
                                        return (<Triangle style={styles.triangleDown}/>)}}
                                />

                                <RNPickerSelect
                                    placeholder={placeholder_city}
                                    items={cities}
                                    onValueChange={value => {
                                        this.setState({ city: value});
                                    }}
                                    style={{
                                        ...pickerSelectStyles,
                                        iconContainer: {
                                            top: 15,
                                            right: 15,
                                        },
                                    }}
                                    value={this.state.city}
                                    useNativeAndroidPickerStyle={false}
                                    
                                    Icon={() => {                                        
                                        return (<Triangle style={styles.triangleDown}/>)}}
                                />
                            </View>

                        

                            <View style={{marginTop: 10}}>
                                <View style={styles.formControl}>
                                    
                                    <Image source={require('../../assets/images/login/icon-phone.png')}  style={styles.formIconPhone} />
                                    <TextInput style={[styles.formInput, {paddingRight: 45}]} placeholder={Labels._telephone_number} keyboardType="numeric" value={this.state.phone} onChangeText={text => this.setState({phone: text})}/>
                                  
                                </View>
                                
                            </View>

                            <View style={{marginTop: 10}}>
                                <View style={styles.formControl}>
                                    
                                    <Image source={require('../../assets/images/login/icon-phone.png')}  style={styles.formIconPhone} />
                                    <TextInput style={[styles.formInput, {paddingRight: 45}]} placeholder={Labels._mobile_number} keyboardType="numeric" value={this.state.mobile} onChangeText={text => this.setState({mobile: text})}/>
                                  
                                </View>
                                
                            </View>
                            <View style={{marginTop: 10}}>
                                <View style={styles.formControl}>
                                    
                                    <Image source={require('../../assets/images/login/icon-commercial.png')}  style={styles.formIconPhone} />
                                    <TextInput style={[styles.formInput, {paddingRight: 45}]} placeholder={Labels._commercial_number} value={this.state.commercial} onChangeText={text => this.setState({commercial: text})}/>
                                  
                                </View>
                                
                            </View>
                            <View style={{marginTop: 10}}>
                                <View style={styles.formControl}>
                                    
                                    <Image source={require('../../assets/images/login/icon-workfield.png')}  style={styles.formIconPhone} />
                                    <TextInput style={[styles.formInput, {paddingRight: 45}]} placeholder={Labels._field_company} value={this.state.sector} onChangeText={text => this.setState({sector: text})}/>
                                  
                                </View>
                                
                            </View>

                         
                            
                        </View>

                    </View>
                    <View style={{height: Dimensions.get('window').height * 0.2, flexDirection: 'column'}}>
                        <StripeFooter goNext = {() => this.goNext()}/>
                    </View>
                </ScrollView>
            </InputScrollView>
        );
    }

}

const styles = StyleSheet.create({
    triangleDown: {
        transform: [
        {rotate: '180deg'}
        ]
    },
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
    companyInfoForm: {
        flex: 2.5,
        alignItems: 'center',
        justifyContent: 'space-between'
     
    },

    contentBox: {
        width: Dimensions.get('window').width * 0.9,
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


    ////////////////////////////////////////////////////////

    optionsContainer: {
        marginTop: 10,

        flexDirection: 'row',
        justifyContent: 'space-between',
        width: Dimensions.get('window').width * 0.7,
        
    },

    optionsControl: {
        borderColor: Colors.secondaryText, 
        borderWidth: 1,
        borderRadius: 20,
        height: 40, 
        width: Dimensions.get('window').width * 0.31,
        alignItems: 'center',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },

    optionIconDown: {
        position: 'absolute',
        right: 9,
        top: 12,
        height: 12,
        width: 12 
    },
    optionText: {
        color: Colors.secondaryText,
        textAlign: 'left',
        marginLeft: 10, 
        fontFamily: 'TheSans-Plain'
       
    },

    
    genderButtonContainer: {
        marginTop: 10,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: Dimensions.get('window').width * 0.7,
        
    },
    genderButton : {
     
        borderColor: Colors.secondaryText, 
        borderWidth: 1,
        borderRadius: 20,
        height: 30, 
        width: Dimensions.get('window').width * 0.31,
        alignItems: 'center',
        justifyContent: 'center',
     
        flexDirection: 'row'
       
       
    },

    genderText: {
        color: Colors.secondaryText,
        marginLeft: 10
    },

    genderIcon: {
   
        height: 20,
        width: 16,
     
    },

    uploadCVButton : {
     
        borderRadius: 20,
        height: 35, 
        width: Dimensions.get('window').width * 0.72,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primarySpeical
       
       
    },
    

    formIconMarker: {
        position: 'absolute',
        left: 10,
        top: 10,
        height: 18,
        width: 12
    },
    formIconPhone: {
        position: 'absolute',
        left: 10,
        top: 10,
        height: 18,
        width: 20
    },

});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 15,
        paddingVertical: 5,
        width: Dimensions.get('window').width * 0.3,
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
        width: Dimensions.get('window').width * 0.3,
        paddingVertical: 5,
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
