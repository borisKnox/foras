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
import DocumentPicker  from "react-native-document-picker";


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


export default class RegUserInfoScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            spinner: false,
            address: '',
            state: '',
            city: '',
            gender: true,
            phone: ''
        }
    }

    componentDidMount(){
        
    }

    selectGender(selectValue){
        this.setState({gender: selectValue});
    }

    goNext() {
        console.log("=======UserData======", UserData)

        this.setState({spinner: true});

        UserData.address = this.state.address;
        UserData.state = this.state.state;
        UserData.city = this.state.city;
        UserData.gender = this.state.gender;
        UserData.phone = this.state.phone;
        UserData.longitude = global.currentLongitude;
        UserData.latitude = global.currentLatitude;
        
        UserData.token = global.token;


        api.registerIndividualProfile(UserData).then((res)=>{
            console.log('emailLogin response____');  
            console.log(res);
            if(res.status == 200){
                this.setState({spinner: false});
                
                global.loginInfo = res.data;

                this.props.navigation.replace('TutorialScreen');                           
            }else{
                Alert.alert(
                    '',
                    [typeof(res.errors.address) == "undefined" ? "" : res.errors.address.toString()]  + " " + 
                    [typeof(res.errors.state) == "undefined" ? "": res.errors.state.toString()] + " " +
                    [typeof(res.errors.city) == "undefined" ? "": res.errors.city.toString()] + " " +
                    [typeof(res.errors.phone) == "undefined" ? "": res.errors.phone.toString()] + " " +
                    [typeof(res.errors.gender) == "undefined" ? "": res.errors.gender.toString()] + " " +                    
                    [typeof(res.errors.cv) == "undefined" ? "": res.errors.cv],
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

    async selectOneFile() {
        //Opening Document Picker for selection of one file
        try {
          const res = await DocumentPicker.pick({
            type: [DocumentPicker.types.allFiles],
            //There can me more options as well
            // DocumentPicker.types.allFiles
            // DocumentPicker.types.images
            // DocumentPicker.types.plainText
            // DocumentPicker.types.audio
            // DocumentPicker.types.pdf
          });
          //Printing the log realted to the file
          console.log('res : ' + JSON.stringify(res));
          console.log('URI : ' + res.uri);
          console.log('Type : ' + res.type);
          console.log('File Name : ' + res.name);
          console.log('File Size : ' + res.size);
          //Setting the state to show single file attributes
          this.setState({ singleFile: res });
        } catch (err) {
          //Handling any exception (If any)
          if (DocumentPicker.isCancel(err)) {
            //If user canceled the document selection
            // alert('Canceled from single doc picker');
            console.log("======Canceled from single doc picker======")
          } else {
            //For Unknown Error
            // alert('Unknown Error: ' + JSON.stringify(err));
            console.log('Unknown Error: ' + JSON.stringify(err))
            throw err;
          }
        }
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
                   
                        <View style={styles.userInfoForm}>

                            <View style={{}}>

                            
                                <View style={styles.contentBox}>
                                    <Text style= {{fontSize: 12, fontFamily: 'TheSans-Plain'}}>{Labels._up_line1}</Text> 
                                </View>

                                <View style={styles.contentBox}>
                                    <Text style = {{fontSize: 12, fontFamily: 'TheSans-Plain'}}>{Labels._up_line2}</Text> 
                                </View>
                            </View>

                            
                
                            <View style={{marginTop: 20}}>
                                <View style={styles.formControl}>
                                    <Image source={ require('../../assets/images/login/icon-map.png')} style={styles.formIconMarker} />
                                    <TextInput style={styles.formInput} placeholder={Labels._title} value={this.state.address} onChangeText={text => this.setState({address: text})}/>
                                </View>
                            </View>

                            <View style={styles.optionsContainer}>
                                {/* <TouchableOpacity style={styles.optionsControl}>
                                    <Image source={require('../../assets/images/login/icon-down.png')} style={styles.optionIconDown} />
                                    <Text style={styles.optionText} >{Labels._country}</Text>
                                </TouchableOpacity> */}

                                {/* <View style={styles.optionsControl}>
                                    <Image source={require('../../assets/images/login/icon-down.png')} style={styles.optionIconDown} />
                                    <Text style={styles.optionText}>{Labels._city}</Text>
                                    
                                </View> */}
                                <RNPickerSelect
                                    placeholder={placeholder_state}
                                    items={states}
                                    onValueChange={value => {
                                        this.setState({ state: value});
                                    }}
                                    style={{
                                        ...pickerSelectStyles,
                                        iconContainer: {
                                            top: 18,
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
                                            top: 18,
                                            right: 15,
                                        },
                                    }}
                                    value={this.state.city}
                                    useNativeAndroidPickerStyle={false}
                                    
                                    Icon={() => {                                        
                                        return (<Triangle style={styles.triangleDown}/>)}}
                                />
                            </View>

                            <View style={styles.genderButtonContainer}>
                                <TouchableOpacity style={this.state.gender? styles.select_genderButton : styles.genderButton} onPress={()=>this.selectGender(true)}>
                                    <Image source={require('../../assets/images/login/icon-male.png')} style={styles.genderIcon} />
                                    <Text style={styles.genderText} >{Labels._male}</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={this.state.gender? styles.genderButton : styles.select_genderButton} onPress={()=>this.selectGender(false)}>
                                    <Image source={require('../../assets/images/login/icon-female.png')} style={styles.genderIcon} />
                                    <Text style={styles.genderText} >{Labels._female}</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{marginTop: 10}}>
                                <View style={styles.formControl}>
                                    
                                    <Image source={require('../../assets/images/login/icon-phone.png')}  style={styles.formIconPhone} />
                                    <TextInput style={[styles.formInput, {paddingRight: 45}]} placeholder={Labels._mobile_number} keyboardType="numeric" value={this.state.phone} onChangeText={text => this.setState({phone: text})}/>
                                  
                                </View>
                                
                            </View>

                            <View style={{marginTop: 15}}>
                                <TouchableOpacity style={styles.uploadCVButton} onPress={this.selectOneFile.bind(this)}>
                                    <Text style={{color: Colors.white, fontFamily: 'TheSans-Plain'}} >{Labels._upload_cv}</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{marginTop: 5}}>

                                <View style={styles.contentBox}>
                                    <Text style= {{fontSize: 12, fontFamily: 'TheSans-Plain'}}>{Labels._down_line1}</Text> 
                                </View>

                                <View style={styles.contentBox}>
                                    <Text style = {{fontSize: 12, fontFamily: 'TheSans-Plain'}}>{Labels._down_line2}</Text> 
                                </View>
                            </View>
                            
                        </View>

                    </View>
                    <View style={{height: Dimensions.get('window').height * 0.3, flexDirection: 'column'}}>
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
    userInfoForm: {
        flex: 2.5,
        alignItems: 'center',
     
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
        marginTop: 20,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: Dimensions.get('window').width * 0.7,
        
    },

    optionsControl: {
        // borderColor: Colors.secondaryText, 
        // borderWidth: 1,
        // borderRadius: 20,
        height: 40, 
        width: Dimensions.get('window').width * 0.31,
        // alignItems: 'center',
        // justifyContent: 'center',
        // alignItems: 'flex-start'
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
        flexDirection: 'row',
    },

    select_genderButton: {
        borderColor: Colors.secondaryText, 
        borderWidth: 1,
        borderRadius: 20,
        height: 30, 
        width: Dimensions.get('window').width * 0.31,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#FFF'
    },

    genderText: {
        color: Colors.secondaryText,
        marginLeft: 10, 
        fontFamily: 'TheSans-Plain'
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
