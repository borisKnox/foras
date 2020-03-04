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
  Share,
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

    import HeaderScreen from './HeaderScreen';

const workhours = [
    {
        label: 'morning', 
        value: 'morning',
    },
    {
        label: 'evening', 
        value: 'evening',
    },
    {
        label: 'late night', 
        value: 'late night',
    },
]

const salary_types = [
    {
        label: 'hourly', 
        value: 'hourly',
    },
    {
        label: 'monthly', 
        value: 'monthly',
    },
]

const periods = [
    {
        label: 'days', 
        value: 'days',
    },
    {
        label: 'weeks', 
        value: 'weeks',
    },
    {
        label: 'months', 
        value: 'months',
    },
]


export default class MainScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFilterModalVisible: false,
            isWorkdaysModalVisible: false,
            isFulltimeModalVisible: false,
            isSalaryModalVisible: false,
            isParttimeModalVisible: false,
            selectedFilter: 0,
            region: {},
            individualsList: [],
            spinner: false,

            workhour: "morning",
            salary_amount: "",
            salary_type: "hourly",
            salary_amount1: "",

            period: 'days',
            salary_amount2: "",



            isMonday: false,
            isTuesday: false,
            isWednesday: false,
            isThursday: false,
            isFriday: false,
            isSaturday: false,
            isSunday: false,
          
        }
    }

    async componentDidMount(){        

        console.log("============login Data============",LoginData )
        var region  = {
            latitude: Number(LoginData.latitude),
            longitude: Number(LoginData.longitude),       
            latitudeDelta: 1.00864195044303443,
            longitudeDelta: 1.000142817690068,             
        }
        this.setState({region: region});

        api.getIndividualsList(global.token).then((res)=>{
            // console.log('getJobList response____', res); 
            

            if(res.status == 200){
                this.setState({spinner: false});
                this.setState({individualsList: res.data});
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

        //---------------Notification----------------//
        AsyncStorage.removeItem('fcmToken')

        let fcmToken = await AsyncStorage.getItem('fcmToken');
        console.log("fcmToken_from_AsyncStorage==="+ fcmToken);
        
        if (fcmToken) {
            console.log("===fcmToken  exist===");
            
        }else{
            console.log("===fcmToken doesn't exist===");
            this.checkPermission();
        }
        // this.checkPermission();

        this.createNotificationListeners(); 
        // this.onTokenRefreshListener = firebase.messaging().onTokenRefresh(fcmToken => {
        //     // Process your token as required
        //     console.log("ANUJ",fcmToken);
        // });
    }

    //------------------------NOtification---------------------//
    componentWillUnmount() {
        // this.onTokenRefreshListener();
        this.notificationListener;
        this.notificationOpenedListener;
    }

    //1
    async checkPermission() {
        const enabled = await firebase.messaging().hasPermission();
        if (enabled) {
        this.getToken();
        } else {
        this.requestPermission();
        }
    }

    //2
    async requestPermission() {
        try {
        await firebase.messaging().requestPermission();
        // User has authorised
        this.getToken();
        } catch (error) {
        // User has rejected permissions
        console.log('permission rejected');
        }
    }

    //3
    async getToken() {
        var fcmToken = await firebase.messaging().getToken();
        console.log('fcmToken:', fcmToken);
        await AsyncStorage.setItem('fcmToken', fcmToken);
        // Share.share({
        //     message: fcmToken
        // })
        // this.register_deviceToken(fcmToken);
    }

    async createNotificationListeners() {

        /*
        * Triggered when a particular notification has been received in foreground
        * */
        const channel = new firebase.notifications.Android.Channel('fcm_default_channel', 'Demo app name', firebase.notifications.Android.Importance.High)
        .setDescription('Demo app description')
        .setSound('sampleaudio.mp3');

        firebase.notifications().android.createChannel(channel);

        this.notificationListener = firebase.notifications().onNotification((notification) => {
            const { title, body } = notification; 
            if(Platform.OS === 'android'){
                const localNotification = new firebase.notifications.Notification({
                    sound: 'default',
                    show_in_foreground: true,
                })
                .setNotificationId(notification.notificationId)
                .setTitle(notification.title)
                .setSubtitle(notification.subtitle)
                .setBody(notification.body)
                .setData(notification.data)
                .android.setChannelId('fcm_default_channel') // e.g. the id you chose above
                .android.setSmallIcon('@drawable/ic_launcher') // create this icon in Android Studio
                .android.setColor('#000000') // you can set a color here
                .android.setPriority(firebase.notifications.Android.Priority.High)
                .android.setAutoCancel(true); // To remove notification when tapped on it

                firebase.notifications()
                    .displayNotification(localNotification)
                    .catch(err => console.error(err));
            } else if (Platform.OS === 'ios') {

                const localNotification = new firebase.notifications.Notification()
                  .setNotificationId(notification.notificationId)
                  .setTitle(notification.title)
                  .setSubtitle(notification.subtitle)
                  .setBody(notification.body)
                  .setData(notification.data)
                  .ios.setBadge(notification.ios.badge);
        
                firebase.notifications()
                  .displayNotification(localNotification)
                  .catch(err => console.error(err));
        
              }
        });

        /*
        * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
        * */
        this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
            const { title, body } = notificationOpen.notification;
            console.log('onNotificationOpened:');
            
            this.props.navigation.replace('Notification');
        });

        /*
        * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
        * */
        const notificationOpen = await firebase.notifications().getInitialNotification();
       
        if (notificationOpen) {
            const { title, body } = notificationOpen.notification;
        }
        /*
        * Triggered for data only payload in foreground
        * */
        this.messageListener = firebase.messaging().onMessage((message) => {
            var text=JSON.stringify(message);
            var text1 = JSON.parse(text)._data.gcm_message;
            var text2=JSON.parse(text1).title;
            var text3=JSON.parse(text1).body;
        
        
            console.log(JSON.stringify(message));
            const notification = new firebase.notifications.Notification()
            .setNotificationId('notificationId')
            .setTitle(text2)
            .setBody(text3)
            .setData({
                key1: 'value1',
                key2: 'value2',
            });
            notification
            .android.setChannelId('channelId')
            .android.setSmallIcon('ic_launcher');
            firebase.notifications().displayNotification(notification);
        });
    }
    //------------------Notification End---------------//
    
    toggleFitlerModal = () => {
        this.setState({ isFilterModalVisible: !this.state.isFilterModalVisible });
    };

    toggleWorkdaysModal = () => {
        
        this.setState({ isWorkdaysModalVisible: !this.state.isWorkdaysModalVisible });
        var filterCategory = "";
        
        if(this.state.isMonday){
            filterCategory = 'monday, ';
        }
        if(this.state.isTuesday){
            filterCategory += 'tuesday, ';
        }
        if(this.state.isWednesday){
            filterCategory += 'wednesday, ';
        }
        if(this.state.isThursday){
            filterCategory += 'thursday, ';
        }
        if(this.state.isFriday){
            filterCategory += 'friday, ';
        }
        if(this.state.isSaturday){
            filterCategory += 'saturday, ';
        }
        if(this.state.isSunday){
            filterCategory += 'sunday';
        }

        this.setState({spinner: true});
        api.getIndividualsList_filter_workdays(global.token, filterCategory).then((res)=>{
            console.log('getJobList response____');  
            if(res.status == 200){
                this.setState({spinner: false});
                this.setState({individualsList: res.data});
                // console.log("this.state.individualsList", this.state.individualsList);
                
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
    };

    toggleFulltimeModal = () => {
        
        this.setState({ isFulltimeModalVisible: !this.state.isFulltimeModalVisible });

        this.setState({spinner: true});

        api.getIndividualsList_filter_workhour(global.token, this.state.workhour).then((res)=>{
            console.log('getJobList response____');  
            if(res.status == 200){
                this.setState({spinner: false});
                this.setState({individualsList: res.data});
                console.log("this.state.individualsList", this.state.individualsList);
                
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
    };

    toggleSalaryModal = () => {
        
        this.setState({ isSalaryModalVisible: !this.state.isSalaryModalVisible });
        this.setState({spinner: true});

        api.getIndividualsList_filter_compensation(global.token, this.state.salary_type, this.state.salary_amount1).then((res)=>{
            console.log('getJobList response____');  
            if(res.status == 200){
                this.setState({spinner: false});
                this.setState({individualsList: res.data});
                console.log("this.state.individualsList", this.state.individualsList);
                
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

    };

    toggleParttimeModal = () => {
        
        this.setState({ isParttimeModalVisible: !this.state.isParttimeModalVisible });

        this.setState({spinner: true});

        api.getIndividualsList_filter_Period (global.token, this.state.period, this.state.salary_amount2).then((res)=>{
            console.log('getJobList response____');  
            if(res.status == 200){
                this.setState({spinner: false});
                this.setState({individualsList: res.data});
                console.log("this.state.individualsList", this.state.individualsList);
                
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
    };

    selectFilter = (filter) => {
        console.log(filter);
        this.setState({selectedFilter: filter});
        this.setState({ isFilterModalVisible: !this.state.isFilterModalVisible });
    }

    checkFilterModalHide = () =>{
        if(this.state.selectedFilter == 1){
            this.setState({ isWorkdaysModalVisible: !this.state.isWorkdaysModalVisible });
        }

        if(this.state.selectedFilter == 2){
            this.setState({ isFulltimeModalVisible: !this.state.isFulltimeModalVisible });
        }

        if(this.state.selectedFilter == 3){
            this.setState({ isSalaryModalVisible: !this.state.isSalaryModalVisible });
        }

        if(this.state.selectedFilter == 4){
            this.setState({ isParttimeModalVisible: !this.state.isParttimeModalVisible });
        }
    }

    onWorkdayButton = (workday) => {
        if(workday == 1){
            this.setState({isMonday: !this.state.isMonday});
        }

        switch(workday) {
            case 1:
                this.setState({isMonday: !this.state.isMonday});
                break;
            case 2:
                this.setState({isTuesday: !this.state.isTuesday});
                break;
            case 3:
                this.setState({isWednesday: !this.state.isWednesday});
                break;
            case 4:
                this.setState({isThursday: !this.state.isThursday});
                break;
            case 5:
                this.setState({isFriday: !this.state.isFriday});
                break;
            case 6:
                this.setState({isSaturday: !this.state.isSaturday});
                break;
            case 7:
                this.setState({isSunday: !this.state.isSunday});
                break;
            default:
                this.setState({isMonday: !this.state.isMonday});
        }

    }


    onGoUserListScreen() {
        this.props.navigation.navigate('UserListScreen');
    }
    goToUserDetail=(data)=>{
        global.userDetailId = data.id;
        this.props.navigation.navigate('UserDetailScreen');        
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
                            <TouchableOpacity onPress={() => this.props.navigation.replace('Notification')}>
                                <Image source = { require('../../assets/images/sidemenu/icon-menu-bell.png') }style={{ width: 19, height: 18, marginRight: 16, marginTop: -2, resizeMode: 'stretch' }} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigation.replace('Message')}>
                                <Image source = { require('../../assets/images/sidemenu/icon-menu-mail.png') }style={{ width: 20, height: 16, marginRight: 14, resizeMode: 'stretch' }} />
                            </TouchableOpacity>
                        </View>
                    </Right>
                    {/* <HeaderScreen navigation={this.props.navigation} /> */}
                </Header>

                <Content contentContainerStyle={styles.layoutDefault}>
                    <KeyboardAvoidingView style={styles.container}>                
                        <Spinner color="#FFF" visible={this.state.spinner}/>
                        <Image source={require('../../assets/images/background-image.png')} style={styles.backgroundImage}/>
                        {/* <Image source={require('../../assets/images/marker_ownPosition.png')}   style={styles.mapmarker} /> */}
                        
                        <View style={styles.mapMaskView}>
                            <MapView 
                                style={styles.mapContainer}
                                region ={this.state.region} 
                            >
                                <MapView.Marker
                                    // onPress={() => this.goToJobDetail(data)}
                                    coordinate={{ latitude: Number(LoginData.latitude), longitude: Number(LoginData.longitude)}}>
                                        <View style={styles.markerBg}>                                            
                                            <Image source={require('../../assets/images/marker_ownPosition.png')}   style={styles.mapmarker} />
                                        </View> 
                                </MapView.Marker>
                                {this.state.individualsList.map((data, index)=>(
                                    <MapView.Marker
                                        key={index}
                                        onPress={() => this.goToUserDetail(data)}                                
                                        coordinate={{ latitude: Number(data.latitude), longitude: Number(data.longitude)}}>
                                            <View style={styles.markerBg}>                                            
                                                <Image source={require('../../assets/images/marker_otherPosition.png')}   style={styles.mapmarker} />
                                            </View> 
                                    </MapView.Marker>    
                                ))}
                            </MapView>
                        </View>
                        

                        <TouchableOpacity style={styles.filterButtonPart} onPress={this.toggleFitlerModal}>
                            <Image source={require('../../assets/images/maps/icon-filter.png')} style={styles.filterIcon}/>
                        </TouchableOpacity>

                        <Modal 
                            isVisible={this.state.isFilterModalVisible}
                            animationInTiming={1}
                            animationOutTiming={1}
                            onModalHide={() =>this.checkFilterModalHide()}>
                            
                            <View style={styles.modalContainer}>
                                <View style={styles.modalContent}>
                                    <View style={{flexDirection: 'row', flex: 1, borderBottomWidth: 1, borderBottomColor: Colors.secondaryText}}>
                                        <TouchableOpacity style={{flex:1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRightWidth: 1, borderRightColor: Colors.secondaryText}} onPress={() => this.selectFilter(1)}>
                                            <View style={{flex: 1.5, justifyContent: 'center', alignItems: 'center'}}>
                                                <Image source={require('../../assets/images/maps/icon-calendar.png')} style={{width: 34, height: 30, marginTop: 10}}/>
                                            </View>
                                            <View style={{flex: 2.5,flexDirection: 'column'}}>
                                                <Text style={{fontSize: 14, textAlign: 'left', fontFamily: 'TheSans-Bold',}}>{Labels._fiter_workdays_1}</Text>
                                                <Text style={{fontSize: 10, textAlign: 'left', fontFamily: 'TheSans-Plain'}}>{Labels._filter_workdays_2}</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{flex:1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',}} onPress={() => this.selectFilter(2)}>
                                            <View style={{flex: 1.5, justifyContent: 'center', alignItems: 'center'}}>
                                                <Image source={require('../../assets/images/maps/icon-full-timer.png')} style={{width: 32, height: 32, marginTop: 10}}/>
                                            </View>
                                            <View style={{flex: 2.5,flexDirection: 'column'}}>
                                                <Text style={{fontSize: 14, textAlign: 'left', fontFamily: 'TheSans-Bold',}}>{Labels._filter_fulltime_1}</Text>
                                                <Text style={{fontSize: 10, textAlign: 'left', fontFamily: 'TheSans-Plain'}}>{Labels._filter_fulltime_2}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{flexDirection: 'row', flex: 1}}>
                                        <TouchableOpacity style={{flex:1, borderRightWidth: 1, borderRightColor: Colors.secondaryText, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}} onPress={() => this.selectFilter(3)}>
                                            <View style={{flex: 1.5, justifyContent: 'center', alignItems: 'center'}}>
                                                <Image source={require('../../assets/images/maps/icon-money.png')} style={{width: 40, height: 24, marginTop: 10}}/>
                                            </View>
                                            <View style={{flex: 2.5,flexDirection: 'column'}}>
                                                <Text style={{fontSize: 14, textAlign: 'left', fontFamily: 'TheSans-Bold',}}>{Labels._filter_salary_1}</Text>
                                                <Text style={{fontSize: 10, textAlign: 'left', fontFamily: 'TheSans-Plain'}}>{Labels._filter_salary_2}</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{flex:1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}} onPress={() => this.selectFilter(4)}>
                                            <View style={{flex: 1.5, justifyContent: 'center', alignItems: 'center'}}>
                                                <Image source={require('../../assets/images/maps/icon-part-timer.png')} style={{width: 34, height: 31, marginTop: 10}}/>
                                            </View>
                                            <View style={{flex: 2.5,flexDirection: 'column'}}>
                                                <Text style={{fontSize: 14, textAlign: 'left', fontFamily: 'TheSans-Bold',}}>{Labels._filter_parttime_1}</Text>
                                                <Text style={{fontSize: 10, textAlign: 'left', fontFamily: 'TheSans-Plain'}}>{Labels._filter_parttime_2}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <TouchableOpacity style={styles.modalButton} onPress={this.toggleFitlerModal}>
                                    <Image source={require('../../assets/images/maps/icon-go.png')} style={styles.modalGoIcon}/>
                                </TouchableOpacity>
                                
                            </View>
                        </Modal>


                        <Modal 
                            isVisible={this.state.isWorkdaysModalVisible}
                            animationInTiming={1}
                            animationOutTiming={1}>

                            <View style={styles.modalContainer}>
                                <View style={styles.modalContent}>
                                    <View style={{flex: 2,alignItems: 'center', justifyContent: 'center'}}>
                                        <View style={{flexDirection: 'row'}}>
                                            <Image source={require('../../assets/images/maps/icon-calendar.png')} style={{width: 34, height: 30, marginTop: 10}}/>
                                            <Text style={{fontSize: 14, fontFamily: 'TheSans-Bold', paddingTop: 15, paddingLeft: 10}}>{Labels._modal_workdays_title}</Text>
                                        </View>
                                        <Text style={{fontSize: 12, fontFamily: 'TheSans-Plain', paddingTop: 3}}>{Labels._modal_workdays_text}</Text>
                                        <Dash style={styles.dash} dashColor = {Colors.secondaryText}/>

                                    </View>
                                    <View style={{ flex: 3, width: '95%'}}>
                                        <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 15}}>
                                            <TouchableOpacity style={this.state.isSaturday ? styles.workDayActiveButton :  styles.workDayButton} onPress={()=>this.onWorkdayButton(6)}>
                                                <Text style={this.state.isSaturday ? styles.workdayActiveText : styles.workdayText}>{Labels._modal_workdays_sat}</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={this.state.isSunday ? styles.workDayActiveButton :  styles.workDayButton} onPress={()=>this.onWorkdayButton(7)}>
                                                <Text style={this.state.isSunday ? styles.workdayActiveText : styles.workdayText}>{Labels._modal_workdays_sun}</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={this.state.isMonday ? styles.workDayActiveButton :  styles.workDayButton} onPress={()=>this.onWorkdayButton(1)}>
                                                <Text style={this.state.isMonday ? styles.workdayActiveText : styles.workdayText}>{Labels._modal_workdays_mon}</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={this.state.isTuesday ? styles.workDayActiveButton :  styles.workDayButton} onPress={()=>this.onWorkdayButton(2)}>
                                                <Text style={this.state.isTuesday ? styles.workdayActiveText : styles.workdayText}>{Labels._modal_workdays_tue}</Text>
                                            </TouchableOpacity>

                                        </View>

                                        <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 10}}>
                                            <TouchableOpacity style={this.state.isWednesday ? styles.workDayActiveButton :  styles.workDayButton} onPress={()=>this.onWorkdayButton(3)}>
                                                <Text style={this.state.isWednesday ? styles.workdayActiveText : styles.workdayText}>{Labels._modal_workdays_wed}</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={this.state.isThursday ? styles.workDayActiveButton :  styles.workDayButton} onPress={()=>this.onWorkdayButton(4)}>
                                                <Text style={this.state.isThursday ? styles.workdayActiveText : styles.workdayText}>{Labels._modal_workdays_thu}</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={this.state.isFriday ? styles.workDayActiveButton :  styles.workDayButton} onPress={()=>this.onWorkdayButton(5)}>
                                                <Text style={this.state.isFriday ? styles.workdayActiveText : styles.workdayText}>{Labels._modal_workdays_fri}</Text>
                                            </TouchableOpacity>
                                            <View style={{height: 30, width: '20%'}}>
                                                
                                            </View>

                                        </View>

                                    </View>
                                </View>
                                <TouchableOpacity style={styles.modalButton} onPress={this.toggleWorkdaysModal}>
                                    <Image source={require('../../assets/images/maps/icon-go.png')} style={styles.modalGoIcon}/>
                                </TouchableOpacity>
                                
                            </View>
                        </Modal>


                        <Modal 
                            isVisible={this.state.isFulltimeModalVisible}
                            animationInTiming={1}
                            animationOutTiming={1}>

                            <View style={styles.modalContainer}>
                                <View style={styles.modalContent}>
                                    <View style={{flex: 2,alignItems: 'center', justifyContent: 'center'}}>
                                        <View style={{flexDirection: 'row'}}>
                                            <Image source={require('../../assets/images/maps/icon-full-timer.png')} style={{width: 32, height: 32, marginTop: 10}}/>
                                            <Text style={{fontSize: 14, fontFamily: 'TheSans-Bold', paddingTop: 15, paddingLeft: 10}}>{Labels._modal_fulltime_title}</Text>
                                        </View>
                                        <Text style={{fontSize: 12, fontFamily: 'TheSans-Plain', paddingTop: 3}}>{Labels._modal_fulltime_text}</Text>
                                        <Dash style={styles.dash} dashColor = {Colors.secondaryText}/>

                                    </View>
                                    <View style={{ flex: 3, width: '80%', justifyContent: 'center', alignItems: 'center'}}>
                                        {/* <View style={{flexDirection: 'row', height: 40, width: '100%', borderRadius: 20, borderWidth: 1, borderColor: Colors.secondaryText}}> */}
                                            {/* <Text style={{paddingLeft: 10, paddingTop: 7}}>8</Text>
                                            <Text style={{paddingLeft: 3, paddingTop: 7}}> {Labels._modal_fulltime_hour}</Text>
                                            <Image source={require('../../assets/images/login/icon-down.png')} style={styles.optionIconDown} /> */}
                                            <RNPickerSelect
                                                placeholder={{}}
                                                items={workhours}
                                                onValueChange={value => {
                                                    this.setState({ workhour: value});
                                                }}
                                                style={{
                                                    ...pickerSelectStyles,
                                                    iconContainer: {
                                                        top: 18,
                                                        right: 15,
                                                    },
                                                }}
                                                value={this.state.workhour}
                                                useNativeAndroidPickerStyle={false}
                                                
                                                Icon={() => {                                        
                                                    return (<Triangle style={styles.triangleDown}/>)}}
                                            />
                                        {/* </View> */}
                                    </View>
                                </View>
                                <TouchableOpacity style={styles.modalButton} onPress={this.toggleFulltimeModal}>
                                    <Image source={require('../../assets/images/maps/icon-go.png')} style={styles.modalGoIcon}/>
                                </TouchableOpacity>
                                
                            </View>
                        </Modal>

                        <Modal 
                            isVisible={this.state.isSalaryModalVisible}
                            animationInTiming={1}
                            animationOutTiming={1}>
                            <View style={styles.modalContainer}>
                                <View style={styles.modalContent}>
                                    <View style={{flex: 2,alignItems: 'center', justifyContent: 'center'}}>
                                        <View style={{flexDirection: 'row'}}>
                                            <Image source={require('../../assets/images/maps/icon-money.png')} style={{width: 40, height: 24, marginTop: 10}}/> 
                                            <Text style={{fontSize: 14, fontFamily: 'TheSans-Bold', paddingTop: 15, paddingLeft: 10}}>{Labels._modal_salary_title}</Text>
                                        </View>
                                        <Text style={{fontSize: 12, fontFamily: 'TheSans-Plain', paddingTop: 3}}>{Labels._modal_salary_text}</Text>
                                        <Dash style={styles.dash} dashColor = {Colors.secondaryText}/>

                                    </View>
                                    <View style={{ flex: 3, width: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                                        <View style={{ width: '50%', }}>
                                            {/* <Text style={{paddingLeft: 10, paddingTop: 7}}>8</Text> */}
                                            {/* <Text style={{paddingLeft: 3, paddingTop: 7}}> {Labels._modal_salary_dropdown}</Text> */}
                                            {/* <Image source={require('../../assets/images/login/icon-down.png')} style={styles.optionIconDown} /> */}
                                            <RNPickerSelect
                                                placeholder={{}}
                                                items={salary_types}
                                                onValueChange={value => {
                                                    this.setState({ salary_type: value});
                                                }}
                                                style={{
                                                    ...pickerSelectStyles1,
                                                    iconContainer: {
                                                        top: 18,
                                                        right: 15,
                                                    },
                                                }}
                                                value={this.state.salary_type}
                                                useNativeAndroidPickerStyle={false}
                                                
                                                Icon={() => {                                        
                                                    return (<Triangle style={styles.triangleDown}/>)}}
                                            />
                                        </View>
                                        <View style={{height: 40, width: '35%', borderRadius: 20, borderWidth: 1, borderColor: Colors.secondaryText, marginLeft: 10}}>
                                            <TextInput style={{paddingTop: 7, textAlign: 'right', color: Colors.secondaryText}} keyboardType="numeric" placeholder={Labels._modal_salary_textinput} value={this.state.salary_amount1} onChangeText={text => this.setState({salary_amount1: text})}/>
                                        </View>
                                    </View>
                                </View>
                                <TouchableOpacity style={styles.modalButton} onPress={this.toggleSalaryModal}>
                                    <Image source={require('../../assets/images/maps/icon-go.png')} style={styles.modalGoIcon}/>
                                </TouchableOpacity>
                                
                            </View>
                        </Modal>

                        <Modal 
                            isVisible={this.state.isParttimeModalVisible}
                            animationInTiming={1}
                            animationOutTiming={1}>
                            <View style={styles.modalContainer}>
                                <View style={styles.modalContent}>
                                    <View style={{flex: 2,alignItems: 'center', justifyContent: 'center'}}>
                                        <View style={{flexDirection: 'row'}}>
                                        <Image source={require('../../assets/images/maps/icon-part-timer.png')} style={{width: 34, height: 31, marginTop: 10}}/>
                                            <Text style={{fontSize: 14, fontFamily: 'TheSans-Bold', paddingTop: 15, paddingLeft: 10}}>{Labels._modal_parttime_title}</Text>
                                        </View>
                                        <Text style={{fontSize: 12, fontFamily: 'TheSans-Plain', paddingTop: 3}}>{Labels._modal_parttime_text}</Text>
                                        <Dash style={styles.dash} dashColor = {Colors.secondaryText}/>

                                    </View>
                                    <View style={{ flex: 3, width: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                                        {/* <TouchableOpacity style={{flexDirection: 'row', height: 40, width: '50%', borderRadius: 20, borderWidth: 1, borderColor: Colors.secondaryText}}>
                                            <Text style={{paddingLeft: 10, paddingTop: 7}}> {Labels._modal_parttime_dropdown}</Text>
                                            <Image source={require('../../assets/images/login/icon-down.png')} style={styles.optionIconDown} />
                                        </TouchableOpacity> */}
                                        <View style={{ width: '50%', }}>                                   
                                            <RNPickerSelect
                                                placeholder={{}}
                                                items={periods}
                                                onValueChange={value => {
                                                    this.setState({ period: value});
                                                }}
                                                style={{
                                                    ...pickerSelectStyles1,
                                                    iconContainer: {
                                                        top: 18,
                                                        right: 15,
                                                    },
                                                }}
                                                value={this.state.period}
                                                useNativeAndroidPickerStyle={false}
                                                
                                                Icon={() => {                                        
                                                    return (<Triangle style={styles.triangleDown}/>)}}
                                            />
                                        </View>
                                        <View style={{height: 40, width: '35%', borderRadius: 20, borderWidth: 1, borderColor: Colors.secondaryText, marginLeft: 10}}>
                                            {/* <Text style={{paddingTop: 7, textAlign: 'center', color: Colors.secondaryText}}>{Labels._modal_parttime_textinput} </Text> */}
                                            <TextInput style={{paddingTop: 7, textAlign: 'right', color: Colors.secondaryText}} placeholder={Labels._modal_parttime_textinput} value={this.state.salary_amount2} onChangeText={text => this.setState({salary_amount2: text})}/>

                                        </View>
                                    </View>
                                </View>
                                <TouchableOpacity style={styles.modalButton} onPress={this.toggleParttimeModal}>
                                    <Image source={require('../../assets/images/maps/icon-go.png')} style={styles.modalGoIcon}/>
                                </TouchableOpacity>
                                
                            </View>
                        </Modal>


                        <View style={styles.bottomButtonPart}>
                            <TouchableOpacity style= {styles.bottomListButton} onPress={() => this.onGoUserListScreen()} >
                                <Image source={require('../../assets/images/maps/icon-bottom-list.png')} style={styles.buttonIcon}/>
                                <Text style= {styles.buttonListText} >
                                    {Labels._bottom_button_company}
                                </Text>
                            </TouchableOpacity>
                        </View>                
                    
                    </KeyboardAvoidingView>
                </Content>
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
    headerBody: {
        flex: 2,
        alignItems: 'center',
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
