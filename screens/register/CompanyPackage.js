import React, { useState }  from 'react';

import {
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
  Dimensions,
  TextInput,
  I18nManager,
  Alert,

} from 'react-native';
import firebase from 'react-native-firebase';
import Spinner from 'react-native-loading-spinner-overlay';
import StripeFooter from '../../components/StripeFooter';
import PackageList from '../../components/PackageList';
import Colors from '../../constants/Colors';
import { Labels } from '../../constants/Langs';

import api from '../../constants/api';


const logoUri = require('../../assets/images/icon-logo.png');
const checkIconUri = require('../../assets/images/Check.png');

 
 const options = [
	{
		key: 'pay',
		text: 'Most High Pay',
	},
	{
		key: 'performance',
		text: 'Most Perfomance',
	},
	{
		key: 'aToZ',
		text: 'A - Z',
	},
	{
		key: 'zToA',
		text: 'Z - A',
	},
];
export default class CompanyPackage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            spinner: false,
            packages: [
                {
                    key: 0,
                    contact: '30',
                    post: '3',
                    price: '250'
                 },
                 {
                    key: 1,
                    contact: '20',
                    post: '2',
                    price: '200'
                 },
                 {
                    key: 2,
                    contact: '10',
                    post: '1',
                    price: '150'
                 }
                ],
        }
    }

    componentDidMount(){     
        console.log(global.token);
        // api.getJobCategories(global.token).then((res)=>{
        //     console.log('message response____', res);  
        //     if(res.status == 200){
        //         console.log(res.data);
        //     }else{
        //         console.log(res);
        //     }
        // })
        // .catch((error) => {
        //     console.log(error);
        // })
    }

    goNext() {
        if( global.package == null ){
            alert("please select package");
        }else{
            console.log(global.package)
            this.props.navigation.replace('CompanyPackagePayment');
        }
    }
    
    render() {

        return (
            <View style={styles.container} >
                <Spinner color="#FFF" visible={this.state.spinner}/>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                    <View style={styles.logoContainer}>
                        <Image source={logoUri} style={styles.logoImage} resizeMode="contain"/>
                    </View>

                    <View style={styles.titleBox}>
                        <Text style= {{fontSize: 19, fontFamily: 'TheSans-Plain'}}>برجاء اختيار الحزمة</Text> 
                    </View>
                    <View style={styles.packageList} >
                        <PackageList options={this.state.packages} />
                    </View>

                    <View style={{height: Dimensions.get('window').height * 0.3, flexDirection: 'row'}}>
                        <StripeFooter goNext = {() => this.goNext()}/>
                    </View>

                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.secondaryBackground,
    },
    contentContainer: {
        //flex: 1,
        paddingTop: 0,
        alignItems: 'center',
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
        marginTop: 10,
        height: 40, 
        width: Dimensions.get('window').width * 0.9,
        alignItems: 'flex-end',
    },
    packageList: {
        width: Dimensions.get('window').width * 0.9,
        // height: 500
    }
   
});
