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
  AsyncStorage,
  PermissionsAndroid,
} from 'react-native';

import firebase from 'react-native-firebase';
import firebaseSvc from '../../FirebaseSvc';
import { GoogleSignin, statusCodes } from 'react-native-google-signin';
import { LoginButton, AccessToken, LoginManager } from 'react-native-fbsdk';
import LinkedInModal from 'react-native-linkedin'
import Spinner from 'react-native-loading-spinner-overlay';
import InputScrollView from 'react-native-input-scroll-view';
import Geolocation from "@react-native-community/geolocation";
import Modal from 'react-native-modal'
// import RNFetchBlob from "rn-fetch-blob";

import StripeFooter from '../../components/StripeFooter';
import Colors from '../../constants/Colors';
import { Labels } from '../../constants/Langs';
import api from '../../constants/api';
import {LoginData} from '../../constants/Constants';
import { Button } from 'native-base';

const logoUri = require('../../assets/images/icon-logo.png');
const fbIconUri = require('../../assets/images/login/icon-facebook.png');
const gpIconUri = require('../../assets/images/login/icon-google.png');
const inIconUri = require('../../assets/images/login/icon-linkedin.png');


I18nManager.forceRTL(true);

export default class LoginScreen extends React.Component {
    linkedRef = React.createRef()

    constructor(props) {
        super(props);
        this.state = {
            email: 'Corporate1@gmail.com',
            //email: 'Individual@gmail.com',
            password: '12345678',
            userName: 'UserName111',
            register_email: 'Corporate1122@gmail.com',
            register_password: '123456',
            c_password: '123456',

            // email: '',
            // password: '',
            // userName: '',
            // register_email: '',
            // register_password: '',
            // c_password: '',
            
            pwShow_login: true,
            pwShow_register: true,
            confirmPwShow_register: true,

            isLoginMode: true,
            isIndividual: true,

            phoneNumber: "+385976457132",
            verifyNumber: "",
            spinner: false,

            visibleModal: false,
            isLoading: false,
            socialRole: true
        }
        console.log("====================constructor of LoginScreen================")
    }

    UNSAFE_componentWillMount() {
        AsyncStorage.removeItem('user_key')
        console.log("willmount of LoginScreen");
        console.log("===================global.logout====================", global.logout);
        if(global.logout){
            AsyncStorage.getItem('user_key')
            .then(res => {
                if (res) {
                    console.log('User exists!');
                    var LoginData = JSON.parse(res);
                    if(LoginData.login_type == 'email'){
                        this.setState({email: LoginData.email});
                        this.setState({password: LoginData.password});

                        console.log("=========email=======", this.state.email)
                        console.log("=========password=======", this.state.password)

                        this.setState({isLoginMode: true});
                        this.goNext();
                    }else{
                        this.socialLogins(LoginData.name, LoginData.email, LoginData.login_type)
                    }                 

                }else{
                    this.setState({isLoading: true})
                }
            })
        }else{
            this.setState({isLoading: true})
        }
    }

    componentDidMount=()=>{
        console.log("========did mount of login===============")
        this.setState({isLoginMode: true});
        this.setState({isIndividual: true});

        global.isLoginMode = true;
        global.isIndividual = true;
        
        //----------get current location------------//
        // global.currentLongitude = 47.738586;
        // global.currentLatitude = 25.774265;

        var that =this;
        if(Platform.OS === 'ios'){
            this.callLocation(that);
        }else{
            async function requestLocationPermission() {
                try {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,{
                            'title': 'Location Access Required',
                            'message': 'This App needs to Access your location'
                        }
                    )
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        //To Check, If Permission is granted
                        that.callLocation(that);
                    } else {
                        alert("Permission Denied");
                    }
                } catch (err) {
                    alert("err",err);
                    console.warn(err)
                }
            }
            requestLocationPermission();
        }

    }

    callLocation(that){
        console.log("==============callLocation========")
        //alert("callLocation Called");
        Geolocation.getCurrentPosition(
        //Will give you the current location
        (position) => {
            const currentLongitude = JSON.stringify(position.coords.longitude);
            //getting the Longitude from the location json
            const currentLatitude = JSON.stringify(position.coords.latitude);
            //getting the Latitude from the location json
            that.setState({ currentLongitude:currentLongitude });
            global.currentLongitude = currentLongitude;
            
            //Setting state Longitude to re re-render the Longitude Text
            that.setState({ currentLatitude:currentLatitude });
            global.currentLatitude = currentLatitude;
            //Setting state Latitude to re re-render the Longitude Text
            console.log("=====latti====",global.currentLatitude, "===longti=====", global.currentLongitude)
        },
        (error) => console.log("===error===", error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
        that.watchID = Geolocation.watchPosition((position) => {
            //Will give you the location on location change
            console.log(position);
            const currentLongitude = JSON.stringify(position.coords.longitude);
            //getting the Longitude from the location json
            const currentLatitude = JSON.stringify(position.coords.latitude);
            //getting the Latitude from the location json
            that.setState({ currentLongitude:currentLongitude });
            global.currentLongitude = currentLongitude;
            //Setting state Longitude to re re-render the Longitude Text
            that.setState({ currentLatitude:currentLatitude });
            global.currentLatitude = currentLatitude;

            //Setting state Latitude to re re-render the Longitude Text
        });
    }

    componentWillUnmount = () => {
        Geolocation.clearWatch(this.watchID);
    }
    
    goSignup(){
        this.setState({isLoginMode: false});
        global.isLoginMode = false;

        console.log(this.state.isLoginMode);
    }

    goLogin(){
        this.setState({isLoginMode: true});
        global.isLoginMode = true;

        console.log(this.state.isLoginMode);
    }

    setIndividual(){
        this.setState({isIndividual: true});
        global.isIndividual = true;
    }

    setCompany(){
        this.setState({isIndividual: false});
        global.isIndividual = false;
    }   
    

    //------------ Linkedin login----------------------// 
    onLinkedInLogin() {
        this.linkedRef.current.open();
    }

    getLinkedInUser = async (data) => {
        this.setState({spinner: true})
        console.log("============linkedin Login===========", data)
        const { access_token, authentication_code } = data
        
        if (!authentication_code) {
            this.setState({spinner: false})

            this.setState({ refreshing: true })
        
            const response = await fetch('https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))', {
                method: 'GET',
                headers: {
                Authorization: 'Bearer ' + access_token,
                },
            })

            const payload = await response.json()        
            console.log("=============email============", payload.elements[0]['handle~'].emailAddress)
            //   this.setState({ ...payload, refreshing: false })

            const response1 = await fetch('https://api.linkedin.com/v2/me?projection=(id,firstName,lastName,profilePicture(displayImage~:playableStreams))', {
                method: 'GET',
                headers: {
                Authorization: 'Bearer ' + access_token,
                },
            })
            const payload1 = await response1.json()       
            console.log("=============firstName============", payload1.firstName.localized[payload1.firstName.preferredLocale.language+'_'+payload1.firstName.preferredLocale.country])
            console.log("=============lastName============", payload1.lastName.localized[payload1.lastName.preferredLocale.language+'_'+payload1.lastName.preferredLocale.country])
               
                
            console.log("=============Image============", payload1.profilePicture['displayImage~'].elements[0].identifiers[0].identifier)
            this.socialLogins(payload1.firstName.localized[payload1.firstName.preferredLocale.language+'_'+payload1.firstName.preferredLocale.country] + " " + payload1.lastName.localized[payload1.lastName.preferredLocale.language+'_'+payload1.lastName.preferredLocale.country], payload.elements[0]['handle~'].emailAddress, 'linkedin', payload1.profilePicture['displayImage~'].elements[0].identifiers[0].identifier);

        // console.log("============payload1111============", JSON.stringify(payload1))
        } else {
            this.setState({spinner: false})
            //   alert(`authentication_code = ${authentication_code}`)
            console.log("====")
        }
    }

    //-----------------Facebook Login------------------//
    goUserLogin(){
        console.log("=====facebook login=====");
        //Facebook Login
        // this.props.navigation.navigate('SideMenuEmployeeNav');
        LoginManager.logInWithPermissions(["public_profile", "email"]).then(
            (result) => {
                console.log("=======result=====", result)
                if (result.isCancelled) {
                    console.log("Login cancelled");
                } else {
                    console.log(
                        "Login success with permissions: " +
                        result.grantedPermissions.toString()
                    );
                    AccessToken.getCurrentAccessToken().then((data) => {
                        const { accessToken } = data
                        console.log("======data=====", accessToken)
                        this.initFbUser(accessToken)
                    })
                }
            },
            function(error) {
                console.log("Login fail with error: " + error);
            }
        );
    }

    initFbUser(accessToken) {
        console.log("=============facebook Access token==========")
        fetch('https://graph.facebook.com//v2.5/me?fields=email,name,picture.type(large),gender,first_name,last_name,friends&access_token=' + accessToken)
        .then((response) => response.json())
        .then((json) => {
            console.log('=====response=====', json.name, json.id, json.email, json.picture.data.url);
            // console.log('=====response=====', json);
            // alert(JSON.stringify(json));
            this.socialLogins(json.name, json.email, 'facebook', json.picture.data.url);
            // json: {email, name, id}
        })
        .catch(() => {
            reject('ERROR GETTING DATA FROM FACEBOOK')
        })
    }
    //---------------Google Login---------------------//
    async goCompanyLogin() {
        //Google Login
        // this.props.navigation.navigate('SideMenuEmployerNav');
        GoogleSignin.configure();
        
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            // alert(JSON.stringify(userInfo));
            // console.log("=======google login user info", userInfo.user.name, userInfo.user.email)
            console.log("======google login userInfo=========", JSON.stringify(userInfo))
            this.socialLogins(userInfo.user.name, userInfo.user.email, 'google', userInfo.user.photo);
            // userInfo: {idToken, user: {photo, givenName, familyName, name, email, id}}
            // this.setState({ userInfo });
        } catch (error) {
            // alert(JSON.stringify(error));
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
            // operation (f.e. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // play services not available or outdated
            } else {
            // some other error happened
            }
        }
    }

    //----------------socailLogins--------------------//

    selectRuleFromSocial(){
        this.setState({visibleModal: true})
    }

    changeRule(socialRole){
        this.setState({socialRole: socialRole});        
    }

    socialRegister(){
        this.setState({visibleModal: false})
        this.setState({spinner: true});

        api.socialRegister(global.loginInfo.name, global.loginInfo.email, global.loginInfo.registered_by, global.loginInfo.logo, this.state.socialRole).then((res)=>{
            console.log('socialRegister response____', res);  
            
            if(res.status == 200){
                this.setState({spinner: false});

                global.token = res.data.api_token;

                global.loginInfo = res.data;

                // AsyncStorage.setItem('user_key', JSON.stringify(LoginData));


                if(res.data.role == 'individual'){                    
                    this.props.navigation.replace('RegUserInfoScreen');
                }else{
                    this.props.navigation.replace('RegCompanyScreen');
                 
                }
                
            }else{
                Alert.alert(
                    'Error!',
                    'Error',
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

    socialLogins(name, email, login_type, logo){
        this.setState({spinner: true});
        console.log("===name===", name, "===email===", email, "===login_type===", login_type)
        api.socialLogin(name, email, login_type, logo).then((res)=>{
            console.log('socialLogin response____', res);  
            
            if(res.status == 200){
                this.setState({spinner: false});

                global.token = res.data.api_token;

                global.loginInfo = res.data;

                LoginData.name = name;
                LoginData.email = email;
                LoginData.longitude = global.currentLongitude;
                LoginData.latitude = global.currentLatitude;
                LoginData.login_type = login_type;

                // LoginData.password = this.state.password;

                AsyncStorage.setItem('user_key', JSON.stringify(LoginData));


                if(res.data.role == ''){
                    this.selectRuleFromSocial();                    
                }else{
                    if(res.data.role == 'individual'){
                        this.props.navigation.replace('Main1');                  

                    }else{
                        this.props.navigation.replace('Main');
                    }
                }
                
            }else{
                Alert.alert(
                    'Error!',
                    'Error',
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

    phoneVerify() {
        const { phoneNumber } = this.state;
        firebase.auth().signInWithPhoneNumber(phoneNumber)
        .then(confirmResult => {
            alert("Sent");
            console.log("AAAAAA", confirmResult);
            this.phoneConfirmResult = confirmResult;
        })
        .catch(error => {
            alert(JSON.stringify(error));
            console.log("ERROR", error);
        });
    }

    phoneConfirm() {
        const { verifyNumber } = this.state;
        console.log("ASDFSDFSADF", this.phoneConfirmResult);

        this.phoneConfirmResult.confirm(verifyNumber)
        .then(user => {
            alert("Success : " + JSON.stringify(user));
            console.log(user);
        }).catch(error =>  {
            alert("error : " + JSON.stringify(error));
            console.log("phone confirm error", error);
        });
    }

    //================Password Show===============//

    showPass_login(){
        this.setState({pwShow_login: !this.state.pwShow_login});
    }

    showPass_register(){
        this.setState({pwShow_register: !this.state.pwShow_register});
    }

    showConfirmPass_register(){
        this.setState({confirmPwShow_register: !this.state.confirmPwShow_register});
    }
    //=================GO To Next Step=============//

    //=================firebase login for Chat===================

    onFirebaseCreateAccountForChat = async () => {
        console.log('create account... email:' + LoginData.email);
        try {
            const user = {
                name: LoginData.userName,
                email: LoginData.email,
                password: LoginData.password,
              };
          await firebaseSvc.createAccount(user);
        } catch ({ message }) {
          console.log('create account failed. catch error:' + message);
        }
      };

    onFirebaseLoginForChat = async () => {
        const user = {
          email: LoginData.email,
          password: LoginData.password,
        };
        console.log(user);
        firebaseSvc.login(user, this.loginSuccess, this.loginFailed);
      };
    loginSuccess = () => {
        console.log('firebase login successful ***');
    };
    loginFailed = () => {
        console.log('firebase login failed ***');
    };

    goNext() {
        if(this.state.isLoginMode){
            
            console.log('Is Logined?: ', this.state.isLoginMode);

            this.setState({spinner: true});

            api.emailLogin(this.state.email, this.state.password).then((res)=>{
                console.log('emailLogin response____');  
                if(res.status == 200){
                    this.setState({spinner: false});

                    global.token = res.data.api_token;

                    global.loginInfo = res.data;

                    

                    LoginData.email = this.state.email;
                    LoginData.password = this.state.password;
                    LoginData.longitude = res.data.longitude;
                    LoginData.latitude = res.data.latitude;

                    LoginData.login_type = 'email';
                    AsyncStorage.setItem('user_key', JSON.stringify(LoginData));

                    this.onFirebaseLoginForChat();
                    if(res.data.role == 'individual'){
                        this.props.navigation.replace('Main1');
                               
                    }else{
                        this.props.navigation.replace('Main');
                    }
                }else{
                    Alert.alert(
                        '',
                        'عدم تطابق البريد الإلكتروني وكلمة المرور',
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
        } else {
            console.log('Is Logined?: ', this.state.isLoginMode);

                if(this.state.register_password == this.state.c_password){

                    this.setState({spinner: true});

                    if(global.isIndividual){
                        var role = 'individual';
                    } else {
                        var role = 'corporate';
                    }

                    api.emailRegister(this.state.userName, this.state.register_email, this.state.register_password, role).then((res)=>{
                        console.log('register_response____', res);
                        if(res.status == 200){
                            this.setState({spinner: false});
                            
                            global.token = res.data.api_token;
                            global.loginInfo = res.data;

                            LoginData.userName = this.state.userName;
                            LoginData.email = this.state.register_email;
                            LoginData.password = this.state.register_password;
                            LoginData.longitude = this.state.currentLongitude;
                            LoginData.latitude = this.state.currentLatitude;

                            LoginData.login_type = 'email';

                            AsyncStorage.setItem('user_key', JSON.stringify(LoginData));
                            this.onFirebaseCreateAccountForChat();
                            this.onFirebaseLoginForChat();

                            api.verifyEmail(global.token).then((res) => {
                                if(res.status == 200){

                                } else{
                                    console.log("verify email api response", res);
                                }
                            }).catch((error) => {
                                console.log(error);    
                            })
                            this.props.navigation.navigate('EmailVerificationScreen');
                            //this.props.navigation.navigate('CompanyPackage');
                        }else{
                            Alert.alert(
                                '',
                                [typeof(res.errors.name) == "undefined" ? "" : res.errors.name.toString()]  + " " + 
                                [typeof(res.errors.email) == "undefined" ? "": res.errors.email.toString()] + " " +
                                [typeof(res.errors.password) == "undefined" ? "": res.errors.password],
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
                                  
                }else{
                    Alert.alert(
                        '',
                        'كلمة المرور وتأكيد عدم تطابق كلمة المرور',
                        [
                            {text: 'OK', onPress: () =>  this.setState({spinner: false})},
                        ],
                        {cancelable: false},
                    );
                }
            
        }

    } 

    
    

    render() {        
        if(this.state.isLoading){
            return (
                <InputScrollView style={styles.container} topOffset={5}>
                    <Spinner color="#FFF" visible={this.state.spinner}/>
                    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                        <View style={{height: Dimensions.get('window').height * 0.7}}>
                            <View style={styles.logoContainer}>
                                <Image source={logoUri} style={styles.logoImage} resizeMode="contain"/>
                            </View>

                            <View style={styles.subNavContainer}>

                                <TouchableOpacity style={styles.navButton} onPress={() => this.goLogin()}>
                                    <View style = { this.state.isLoginMode ? styles.navButtonSelected : ''}>
                                        <Text style={{fontFamily: 'TheSans-Plain'}}>{Labels._sign_in}</Text>
                                    </View>
                                </TouchableOpacity>

                                <View style={{paddingBottom: 4, paddingTop: 4}}>
                                    <View style={{borderRightWidth: 1, borderColor: Colors.black, height: 14}}></View>
                                </View>

                                <TouchableOpacity style={styles.navButton} onPress={() => this.goSignup()}>
                                    <View style= {this.state.isLoginMode ? '': styles.navButtonSelected}>
                                        <Text style={{fontFamily: 'TheSans-Plain'}}>{Labels._sign_up}</Text>
                                    </View>
                                    
                                </TouchableOpacity>
                            </View>


                            {this.state.isLoginMode == true ? 

                                // --------------------- Login Start -------------------
                                
                                <View style = {{ flex: 2}}>    
                                    <View style={styles.loginForm}>
                                        <View style={{}}>
                                            <View style={styles.formControl}>
                                                <Image source={require('../../assets/images/login/icon-email.png')} name="mail" style={styles.formIconEmail} />
                                                <TextInput style={styles.formInput} placeholder={Labels._email_placeholder} keyboardType="email-address" value={this.state.email} onChangeText={text => this.setState({email: text})}/>
                                            </View>
                                        </View>
                                        <View style={{}}>
                                            <View style={styles.formControl}>
                                                <Image source={require('../../assets/images/login/icon-password.png')} name="lock1" style={styles.formIconPassword} />
                                                <TextInput style={[styles.formInput, {paddingRight: 45}]} placeholder={Labels._password_placehoder} secureTextEntry={this.state.pwShow_login} value={this.state.password} onChangeText={text => this.setState({password: text})}/>
                                                <TouchableOpacity style={{position: 'absolute', right: 8, top:9}} onPress={()=>this.showPass_login()}> 
                                                    <Text style = { {color: Colors.secondaryText, fontFamily: 'TheSans-Plain'} }>{Labels._show_password}</Text>
                                                </TouchableOpacity>
                                            </View>
                                            <TouchableOpacity style={{position: 'absolute', left: 8, top: 50}}> 
                                                <Text style={{color: Colors.primaryText, fontFamily: 'TheSans-Plain'}}>{Labels._forget_password}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style={styles.socialLoginContainer}>

                                        <View style={styles.socialLoginLabelContainer}>
                                            <View style={styles.lineElement}></View>
                                            <View style={styles.socialLoginLableTextContainer}>
                                                <Text style={styles.socialLoginLableText}>{Labels._social_log_in}</Text>
                                            </View>
                                            <View style={styles.lineElement}></View>
                                        </View>

                                        <View style={styles.socialLoginButtonsContainer}>
                                            <TouchableOpacity onPress={() => this.onLinkedInLogin()}>
                                                <Image source={ inIconUri} style={styles.socialButtonImage}/>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={()=>this.goCompanyLogin()}>
                                                <Image source={gpIconUri} style={styles.socialButtonImage}/>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={()=>this.goUserLogin()}>
                                                <Image source={fbIconUri} style={styles.socialButtonImage}/>
                                            </TouchableOpacity>
                                        </View>                                        
                                        <LinkedInModal
                                            ref={this.linkedRef}
                                            clientID="86ko034ammuzb2"
                                            clientSecret="5Tgh4ykyrLwkCFk1"
                                            redirectUri="https://foras.app/"
                                            onSuccess={this.getLinkedInUser.bind(this)}
                                            linkText=""
                                            permissions={["r_liteprofile", "r_emailaddress"]}
                                        /> 
                                    </View>
                                </View>

                                // --------------------- Login End ---------------------
                                
                                :
                            

                                // --------------------- Signup Start ---------------------
                            
                                <View style={styles.signupForm}>

                                    <View style={styles.switchButtonContainer}>
                                        <TouchableOpacity style={this.state.isIndividual? styles.switchActiveButton :  styles.switchButton} onPress={() => this.setIndividual()}>
                                            <Text style={styles.switchText} >{Labels._individual_user}</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity style={this.state.isIndividual? styles.switchButton : styles.switchActiveButton} onPress={() => this.setCompany()}>
                                            <Text style={styles.switchText}>{Labels._company_user}</Text>
                                        </TouchableOpacity>
                                    </View>
                        
                                    <View style={{}}>
                                        <View style={styles.formControl}>
                                            <Image source={ this.state.isIndividual?  require('../../assets/images/login/icon-user.png') : require('../../assets/images/login/icon-company-user.png')} name="mail" style={styles.formIconUser} />
                                            <TextInput style={styles.formInput} placeholder={Labels._company_user_placehoder}  value={this.state.userName} onChangeText={text => this.setState({userName: text})}/>
                                        </View>
                                    </View>

                                    <View style={{}}>
                                        <View style={styles.formControl}>
                                            <Image source={require('../../assets/images/login/icon-email.png')} name="mail" style={styles.formIconEmail} />
                                            <TextInput style={styles.formInput} placeholder={Labels._email_placeholder} keyboardType="email-address" value={this.state.register_email} onChangeText={text => this.setState({register_email: text})}/>
                                        </View>
                                    </View>
                                    <View style={{}}>
                                        <View style={styles.formControl}>
                                            
                                            <Image source={require('../../assets/images/login/icon-password.png')} name="lock1" style={styles.formIconPassword} />
                                            <TextInput style={[styles.formInput, {paddingRight: 45}]} secureTextEntry={this.state.pwShow_register} placeholder={Labels._password_placehoder}  value={this.state.register_password} onChangeText={text => this.setState({register_password: text})}/>
                                            <TouchableOpacity style={{position: 'absolute', right: 8, top:9}} onPress={()=>this.showPass_register()}>
                                                <Text style = { {color: Colors.secondaryText, fontFamily: 'TheSans-Plain'} }>{Labels._show_password}</Text>
                                            </TouchableOpacity>
                                        </View>
                                        
                                    </View>
                                    <View style={{}}>
                                        <View style={styles.formControl}>
                                            
                                            <Image source={require('../../assets/images/login/icon-password.png')} name="lock1" style={styles.formIconPassword} />
                                            <TextInput style={[styles.confirmPasswordformInput, {paddingRight: 45}]} secureTextEntry={this.state.confirmPwShow_register} placeholder={Labels._confirm_password_placehoder}  value={this.state.c_password} onChangeText={text => this.setState({c_password: text})}/>
                                            <TouchableOpacity style={{position: 'absolute', right: 8, top:9}} onPress={()=>this.showConfirmPass_register()}>
                                                <Text style = { {color: Colors.secondaryText, fontFamily: 'TheSans-Plain'} }>{Labels._show_password}</Text>
                                            </TouchableOpacity>
                                        </View>
                                        
                                    </View>
                                </View>
                                                        
                                //----------------------- Signup End -------------------------
                            }

                        </View>
                        <View style={{height: Dimensions.get('window').height * 0.4, flexDirection: 'column'}}>
                            <StripeFooter goNext = {() => this.goNext()}/>
                        </View>
                        <Modal
                            isVisible={this.state.visibleModal}
                            style={styles.modal}
                            animationInTiming={500}
                            animationOutTiming={500}
                            backdropTransitionInTiming={500}
                            backdropTransitionOutTiming={500}>

                            <View style={styles.modalContainer}>
                                <Text style={{fontSize: 25}}>يرجى تأكيد دورك.</Text>
                                <View>
                                    <View style={{flexDirection: 'row', padding: 10, alignItems: 'center'}}>
                                        <TouchableOpacity style={this.state.socialRole? styles.select : styles.selectNo} onPress={()=>this.changeRule(true)}>

                                        </TouchableOpacity>
                                        <Text style={styles.modalTxt}>Corporate</Text>

                                    </View>
                                    <View style={{flexDirection: 'row', padding: 10, alignItems: 'center'}}>

                                        <TouchableOpacity style={this.state.socialRole? styles.selectNo : styles.select} onPress={()=>this.changeRule(false)}>

                                        </TouchableOpacity>
                                        <Text style={styles.modalTxt}>Individual</Text>


                                    </View>
                                </View>
                                
                                <TouchableOpacity onPress={()=>this.socialRegister()}>
                                    <Image source={require('../../assets/images/icon-post.png')} style={{width: 35, height: 35}}/>

                                </TouchableOpacity>
                                
                            </View>
                        </Modal>
                    </ScrollView>
                </InputScrollView>
            );
        }else{
            return (
                <View style={{flex: 1}} >
                    <ImageBackground source={require('../../assets/images/splash.png')} style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height}}/>
                </View>
            );
        }
        
    }

}

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'center',
        
    },
    modalTxt: {
        fontSize: 20
    },
    modalContainer: {
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
        width: '90%',
        height: 200,
        borderRadius: 5,
        padding: 20
    },
    select: {
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: Colors.primarySpeical,
        marginHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray'
    },
    selectNo: {
        width: 16,
        height: 16,
        borderRadius: 8,
        marginHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray'
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
    subNavContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingBottom: 5,
    },
    navButton: {
        paddingLeft: 10,
        paddingRight: 10,

    },
    loginForm: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
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
        fontFamily: 'TheSans-plain'
    },
    formIconEmail: {
        position: 'absolute',
        left: 9,
        top: 12,
        height: 14,
        width: 18 
    },

    formIconPassword: {
        position: 'absolute',
        left: 10,
        top: 11,
        height: 16,
        width: 15
    },
    socialLoginContainer: {
        flex: 1,
        justifyContent: 'space-around',
    },
    socialLoginLabelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 20,
        marginTop: 20,
    },
    lineElement: {
        borderBottomColor: Colors.black,
        borderBottomWidth: 1,
        width: Dimensions.get('window').width * 0.1,
    },
    socialLoginLableTextContainer: {
        paddingLeft: 5,
        paddingRight: 5,
    },
    socialLoginLableText: {
        fontFamily: 'TheSans-Plain'
    },
    socialLoginButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingLeft: '15%',
        paddingRight: '15%',
    },
    socialButtonImage: {
        width: 40,
        height: 40,
    },


    ////////////////////////////////////////////////////////

    signupForm: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    switchButtonContainer: {
        marginTop: 20,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: Dimensions.get('window').width * 0.7,
        
    },
    switchButton : {
     
        borderRadius: 20,
        height: 30, 
        width: Dimensions.get('window').width * 0.31,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000'
       
       
    },

    switchActiveButton : {
     
        borderRadius: 20,
        height: 30, 
        width: Dimensions.get('window').width * 0.31,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primarySpeical
       
       
    },
    switchText: {
        color: '#fff',
        fontFamily: 'TheSans-Plain'
    },

    formIconUser: {
        position: 'absolute',
        left: 10,
        top: 10,
        height: 18,
        width: 14
    },

    confirmPasswordformInput: {
        flex: 1,
        width: '76%',
        paddingLeft: 35,
        paddingRight: 8,
        textAlign: 'right',
        fontFamily: 'TheSans-Plain'
    },

    navButtonSelected: {
        borderBottomWidth: 2, 
        borderColor: Colors.primarySpeical, 
        paddingBottom:4
    },
    navButtonNonSelected: {
      
        borderColor: Colors.primarySpeical, 
        paddingBottom:4
    }
});
