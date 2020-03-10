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
import {UserData, LoginData} from '../../constants/Constants';

import StripeFooter from '../../components/StripeFooter';
import Colors from '../../constants/Colors';
import { Labels } from '../../constants/Langs';

const logoUri = require('../../assets/images/icon-logo.png');

const months = [
    { label: 'Jan', value: '1',},
    { label: 'Feb', value: '2',},
    { label: 'Mar', value: '3',},
    { label: 'Apr', value: '4',},
    { label: 'May', value: '5',},
    { label: 'Jun', value: '6',},
    { label: 'Jul', value: '7',},
    { label: 'Aug', value: '8',},
    { label: 'Sep', value: '9',},
    { label: 'Oct', value: '10',},
    { label: 'Nov', value: '11',},
    { label: 'Dec', value: '12',},
    
];

const years = [
    {
        label: '2021', 
        value: '2021',
    },
    {
        label: '2022', 
        value: '2022',
    },
    {
        label: '2023', 
        value: '2023',
    },
    {
        label: '2024', 
        value: '2024',
    },
    {
        label: '2025', 
        value: '2025',
    },
    {
        label: '2026', 
        value: '2026',
    },
];

export default class CompanyPackagePayment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            spinner: false,
            cardNumber: '4005550000000001',
            cardName: 'Visa',
            expMonth: 'May',
            expYear: '21',
            csvNumber: '123',
            packageID: {},
            payAmount: 10,
        }
    }

    componentDidMount(){
        //console.log(global.package);
        this.state.packageID = global.package.id;
        this.state.payAmount = global.package.price;
    }


    goNext() {
        // console.log(this.state);
        const packageData = {
            email: LoginData.email,
            packageID :this.state.packageID,
            cardNumber:this.state.cardNumber,
            cardName :this.state.cardName,
            expMonth: this.state.expMonth,
            expYear:this.state.expYear,
            csvNumber:this.state.csvNumber,
            token : global.token,
        }
        console.log(packageData);

        api.setPackage(packageData).then((res)=>{
            console.log('setPackage response____', res);  
            if(res.status == 200){
                this.props.navigation.replace('TutorialScreen');
            }else{
                Alert(res);
            }
        })
        .catch((error) => {
            console.log(error);
        })
        
    }


    render() {
        const placeholder_month = {
            label: "الإنتهاء",
            value: null,
            color: 'green',
        };

        const placeholder_year = {
            label: "الشهر",
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
                   
                        <View style={styles.paymentInfoForm}>

                            <View style={{}}>
                                <View style={styles.contentBox}>
                                    <Text style= {{fontSize: 19, fontFamily: 'TheSans-Plain'}}>طريقة الدفع</Text> 
                                </View>
                            </View>

                            <View style={{marginTop: 18}}>
                                <View style={styles.formControl}>
                                    <Image source={ require('../../assets/images/payment.png')} style={styles.formIconVisa} />
                                    <TextInput style={styles.formInput} placeholder="رقم البطاقة" keyboardType="numeric" value={this.state.cardNumber} onChangeText={text => this.setState({cardNumber: text})}/>
                                </View>
                            </View>

                            <View style={{marginTop: 18}}>
                                <View style={styles.formControl}>
                                    
                                    <TextInput style={styles.formInput} placeholder="الإسم على البطاقة" value={this.state.cardName} onChangeText={text => this.setState({cardName: text})}/>
                                </View>
                            </View>
                            <View style={{marginTop: 18}}>
                                <Text style= {{fontSize: 19, fontFamily: 'TheSans-Plain'}}>تاريخ الإنتهاء</Text> 
                            </View>
                            <View style={styles.optionsContainer}>
                                <RNPickerSelect
                                    placeholder={placeholder_year}
                                    items={years}
                                    onValueChange={value => {
                                        this.setState({ expYear: value});
                                    }}
                                    style={{
                                        ...pickerSelectStyles,
                                        iconContainer: {
                                            top: 15,
                                            right: 15,
                                        },
                                    }}
                                    value={this.state.expYear}
                                    useNativeAndroidPickerStyle={false}
                                    
                                    Icon={() => {                                        
                                        return (<Triangle style={styles.triangleDown}/>)}}
                                />

                                <RNPickerSelect
                                    placeholder={placeholder_month}
                                    items={months}
                                    onValueChange={value => {
                                        this.setState({ expMonth: value});
                                    }}
                                    style={{
                                        ...pickerSelectStyles,
                                        iconContainer: {
                                            top: 15,
                                            right: 15,
                                        },
                                    }}
                                    value={this.state.expMonth}
                                    useNativeAndroidPickerStyle={false}
                                    
                                    Icon={() => {                                        
                                        return (<Triangle style={styles.triangleDown}/>)}}
                                />
                            </View>

                        

                            <View style={{marginTop: 18}}>
                                <View style={styles.formControl}>
                                    <TextInput style={[styles.formInput, {paddingRight: 45}]} placeholder="الرقم السري" keyboardType="numeric" value={this.state.csvNumber} onChangeText={text => this.setState({csvNumber: text})}/>
                                  
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
        ],
        color: "#7A7A7A",
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
    paymentInfoForm: {
        flex: 2.5,
        alignItems: 'center',
        // justifyContent: 'space-between'
     
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

    formIconVisa: {
        position: 'absolute',
        right: 0,
        top: 0,
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
