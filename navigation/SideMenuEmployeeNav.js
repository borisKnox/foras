import React, { Component } from 'react';
import { Dimensions, View, Image, StyleSheet, TouchableOpacity, Text, ActivityIndicator, Alert, AsyncStorage, BackHandler, ToastAndroid, Button} from 'react-native';

// import all basic components

//For React Navigation 2.+ import following
//import {DrawerNavigator, StackNavigator} from 'react-navigation';

//For React Navigation 3.+ import following
import { createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { createDrawerNavigator, DrawerItems  } from 'react-navigation-drawer';

import Dash from 'react-native-dash';

import Colors from '../constants/Colors';
import { Labels } from '../constants/Langs';



import MainScreen from '../screens/employee/MainScreen';
import MapScreen from '../screens/employer/MapScreen';
import MessageScreen from '../screens/employee/MessageScreen';
import NotificationScreen from '../screens/employee/NotificationScreen';
import FavoritJobListScreen from '../screens/employee/FavoritJobListScreen';
import JobListScreen from '../screens/employee/JobListScreen';
import CompanyListScreen from '../screens/employee/CompanyListScreen';
import MyProfileScreen from '../screens/employee/MyProfileScreen';
import JobDetailScreen from '../screens/employee/JobDetailScreen';
import CompanyDetailScreen from '../screens/employee/CompanyDetailScreen';



class NavigationDrawerStructure extends Component {
    componentDidMount() {
        // this.props.navigation.closeDrawer();
        // BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }    
    componentWillUnmount() {
        // BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }
    // handleBackButton() {
    //     ToastAndroid.show('Please Log out!', ToastAndroid.SHORT);
    //     return true;
    // }
    //Structure for the navigatin Drawer
    toggleDrawer = () => {
        //Props to open/close the drawer
        this.props.navigationProps.toggleDrawer();
    };

    render() {
        return (
            <View style={{ flexDirection: 'row', paddingLeft: 10, }}>
                <TouchableOpacity onPress={this.toggleDrawer.bind(this)} >
                {/*Donute Button Image */}
                    <Image source={require('../assets/images/sidemenu/icon-sidemenu.png')} style={{ width: 18, height: 16, marginLeft: 12 }}/>
                </TouchableOpacity>
            </View>
           
        );
    }
}



const MainScreenStackNavigator = createStackNavigator({
    //All the screen from the Screen1 will be indexed here
    MainScreen: {
        screen: MainScreen,
        navigationOptions : { 
            headerTitle: 'خريطة الفرص' ,
        }
    
    },     
},{
    
    initialRouteName: 'MainScreen',    
    defaultNavigationOptions: ({ navigation }) => ({
          
            headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
            headerRight: 
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity onPress={() => navigation.replace('NotificationScreen')}>
                        <Image source = { require('../assets/images/sidemenu/icon-menu-bell.png') }style={{ width: 19, height: 18, marginRight: 16, marginTop: -2, resizeMode: 'stretch' }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.replace('MessageScreen')}>
                        <Image source = { require('../assets/images/sidemenu/icon-menu-mail.png') }style={{ width: 20, height: 16, marginRight: 14, resizeMode: 'stretch' }} />
                    </TouchableOpacity>
                </View>,

            headerStyle: {
                backgroundColor: Colors.primaryBackground,
                elevation: 0,       //remove shadow on Android
                shadowOpacity: 0,   //remove shadow on iOS
                borderColor: Colors.primaryBackground,
                borderBottomWidth: 0,
                shadowColor: 'transparent'
            },

            headerTitleStyle: {
                alignSelf: 'center',
                textAlign: 'center',
                width: '90%',
            },
            headerTintColor: '#fff',
            gesturesEnabled: true,
        }),
});

const MessageScreenStackNavigator = createStackNavigator({
    //All the screen from the Screen1 will be indexed here
    MessageScreen: {
        screen: MessageScreen,
        navigationOptions : { 
            headerTitle: Labels._sidemenu_message,
        }
    
    },     
},{
    
    initialRouteName: 'MessageScreen',    
    defaultNavigationOptions: ({ navigation }) => ({
          
        headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
        headerRight: 
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={() => navigation.replace('NotificationScreen')}>
                    <Image source = { require('../assets/images/sidemenu/icon-menu-bell.png') }style={{ width: 19, height: 18, marginRight: 16, marginTop: -2, resizeMode: 'stretch' }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.replace('MessageScreen')}>
                    <Image source = { require('../assets/images/sidemenu/icon-menu-mail.png') }style={{ width: 20, height: 16, marginRight: 14, resizeMode: 'stretch' }} />
                </TouchableOpacity>
            </View>,

        headerStyle: {
            backgroundColor: Colors.primaryBackground,
            elevation: 0,       //remove shadow on Android
            shadowOpacity: 0,   //remove shadow on iOS
            borderColor: Colors.primaryBackground,
            borderBottomWidth: 0,
            shadowColor: 'transparent'
        },

        headerTitleStyle: {
            alignSelf: 'center',
            textAlign: 'center',
            width: '90%',
        },
        headerTintColor: '#fff',
        gesturesEnabled: true,
    }),
});



const NotificationScreenStackNavigator = createStackNavigator({
    //All the screen from the Screen1 will be indexed here
    NotificationScreen: {
        screen: NotificationScreen,
        navigationOptions : { 
            headerTitle: Labels._sidemenu_alert,
        }
    
    },     
},{
    
    initialRouteName: 'NotificationScreen',    
    defaultNavigationOptions: ({ navigation }) => ({
          
        headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
        headerRight: 
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={() => navigation.replace('NotificationScreen')}>
                    <Image source = { require('../assets/images/sidemenu/icon-menu-bell.png') }style={{ width: 19, height: 18, marginRight: 16, marginTop: -2, resizeMode: 'stretch' }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.replace('MessageScreen')}>
                    <Image source = { require('../assets/images/sidemenu/icon-menu-mail.png') }style={{ width: 20, height: 16, marginRight: 14, resizeMode: 'stretch' }} />
                </TouchableOpacity>
            </View>,

        headerStyle: {
            backgroundColor: Colors.primaryBackground,
            elevation: 0,       //remove shadow on Android
            shadowOpacity: 0,   //remove shadow on iOS
            borderColor: Colors.primaryBackground,
            borderBottomWidth: 0,
            shadowColor: 'transparent'
        },

        headerTitleStyle: {
            alignSelf: 'center',
            textAlign: 'center',
            width: '90%',
        },
        headerTintColor: '#fff',
        gesturesEnabled: true,
    }),
});

const FavoritJobListScreenStackNavigator = createStackNavigator({
    //All the screen from the Screen1 will be indexed here
    FavoritJobListScreen: {
        screen: FavoritJobListScreen,
        navigationOptions : { 
            headerTitle: Labels._sidemenu_favorits,
        }
    
    },     
},{
    
    initialRouteName: 'FavoritJobListScreen',    
    defaultNavigationOptions: ({ navigation }) => ({
          
        headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
        headerRight: 
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={() => navigation.replace('NotificationScreen')}>
                    <Image source = { require('../assets/images/sidemenu/icon-menu-bell.png') }style={{ width: 19, height: 18, marginRight: 16, marginTop: -2, resizeMode: 'stretch' }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.replace('MessageScreen')}>
                    <Image source = { require('../assets/images/sidemenu/icon-menu-mail.png') }style={{ width: 20, height: 16, marginRight: 14, resizeMode: 'stretch' }} />
                </TouchableOpacity>
            </View>,

        headerStyle: {
            backgroundColor: Colors.primaryBackground,
            elevation: 0,       //remove shadow on Android
            shadowOpacity: 0,   //remove shadow on iOS
            borderColor: Colors.primaryBackground,
            borderBottomWidth: 0,
            shadowColor: 'transparent'
        },

        headerTitleStyle: {
            alignSelf: 'center',
            textAlign: 'center',
            width: '90%',
        },
        headerTintColor: '#fff',
        gesturesEnabled: true,
    }),
});

const JobListScreenStackNavigator = createStackNavigator({
    //All the screen from the Screen1 will be indexed here
    JobListScreen: {
        screen: JobListScreen,
        navigationOptions : { 
            headerTitle: Labels._sidemenu_list,
        }
    
    },     
},{
    
    initialRouteName: 'JobListScreen',    
    defaultNavigationOptions: ({ navigation }) => ({
          
        headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
        headerRight: 
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={() => navigation.replace('NotificationScreen')}>
                    <Image source = { require('../assets/images/sidemenu/icon-menu-bell.png') }style={{ width: 19, height: 18, marginRight: 16, marginTop: -2, resizeMode: 'stretch' }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.replace('MessageScreen')}>
                    <Image source = { require('../assets/images/sidemenu/icon-menu-mail.png') }style={{ width: 20, height: 16, marginRight: 14, resizeMode: 'stretch' }} />
                </TouchableOpacity>
            </View>,

        headerStyle: {
            backgroundColor: Colors.primaryBackground,
            elevation: 0,       //remove shadow on Android
            shadowOpacity: 0,   //remove shadow on iOS
            borderColor: Colors.primaryBackground,
            borderBottomWidth: 0,
            shadowColor: 'transparent'
        },

        headerTitleStyle: {
            alignSelf: 'center',
            textAlign: 'center',
            width: '90%',
        },
        headerTintColor: '#fff',
        gesturesEnabled: true,
    }),
});

const CompanyListScreenStackNavigator = createStackNavigator({
    //All the screen from the Screen1 will be indexed here
    CompanyListScreen: {
        screen: CompanyListScreen,
        navigationOptions : { 
            headerTitle: Labels._sidemenu_companylist,
        }
    
    },     
},{
    
    initialRouteName: 'CompanyListScreen',    
    defaultNavigationOptions: ({ navigation }) => ({
          
            headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
            headerRight: 
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity onPress={() => navigation.replace('NotificationScreen')}>
                        <Image source = { require('../assets/images/sidemenu/icon-menu-bell.png') }style={{ width: 19, height: 18, marginRight: 16, marginTop: -2, resizeMode: 'stretch' }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.replace('MessageScreen')}>
                        <Image source = { require('../assets/images/sidemenu/icon-menu-mail.png') }style={{ width: 20, height: 16, marginRight: 14, resizeMode: 'stretch' }} />
                    </TouchableOpacity>
                </View>,

            headerStyle: {
                backgroundColor: Colors.primaryBackground,
                elevation: 0,       //remove shadow on Android
                shadowOpacity: 0,   //remove shadow on iOS
                borderColor: Colors.primaryBackground,
                borderBottomWidth: 0,
                shadowColor: 'transparent'
            },

            headerTitleStyle: {
                alignSelf: 'center',
                textAlign: 'center',
                width: '90%',
            },
            headerTintColor: '#fff',
            gesturesEnabled: true,
        }),
});


const SettingsScreenStackNavigator = createStackNavigator({
    //All the screen from the Screen1 will be indexed here
    MyProfileScreen: {
        screen: MyProfileScreen,
        navigationOptions : { 
            headerTitle: Labels._sidemenu_settings,
        }
    
    },     
},{
    
    initialRouteName: 'MyProfileScreen',    
    defaultNavigationOptions: ({ navigation }) => ({
          
            headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
            headerRight: 
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity onPress={() => navigation.replace('NotificationScreen')}>
                        <Image source = { require('../assets/images/sidemenu/icon-menu-bell.png') }style={{ width: 19, height: 18, marginRight: 16, marginTop: -2, resizeMode: 'stretch' }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.replace('MessageScreen')}>
                        <Image source = { require('../assets/images/sidemenu/icon-menu-mail.png') }style={{ width: 20, height: 16, marginRight: 14, resizeMode: 'stretch' }} />
                    </TouchableOpacity>
                </View>,

            headerStyle: {
                backgroundColor: Colors.primaryBackground,
                elevation: 0,       //remove shadow on Android
                shadowOpacity: 0,   //remove shadow on iOS
                borderColor: Colors.primaryBackground,
                borderBottomWidth: 0,
                shadowColor: 'transparent'
            },

            headerTitleStyle: {
                alignSelf: 'center',
                textAlign: 'center',
                width: '90%',
            },
            headerTintColor: '#fff',
            gesturesEnabled: true,
        }),
});

const JobDetailScreenStackNavigator = createStackNavigator({
    //All the screen from the Screen1 will be indexed here
    JobDetailScreen: {
        screen: JobDetailScreen,
        navigationOptions : { 
            headerTitle: Labels._job_detail,
        }
    
    },     
},{
    
    initialRouteName: 'JobDetailScreen',    
    defaultNavigationOptions: ({ navigation }) => ({
          
            headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
            headerRight: 
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity onPress={() => navigation.replace('NotificationScreen')}>
                        <Image source = { require('../assets/images/sidemenu/icon-menu-bell.png') }style={{ width: 19, height: 18, marginRight: 16, marginTop: -2, resizeMode: 'stretch' }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.replace('MessageScreen')}>
                        <Image source = { require('../assets/images/sidemenu/icon-menu-mail.png') }style={{ width: 20, height: 16, marginRight: 14, resizeMode: 'stretch' }} />
                    </TouchableOpacity>
                </View>,

            headerStyle: {
                backgroundColor: Colors.primaryBackground,
                elevation: 0,       //remove shadow on Android
                shadowOpacity: 0,   //remove shadow on iOS
                borderColor: Colors.primaryBackground,
                borderBottomWidth: 0,
                shadowColor: 'transparent'
            },

            headerTitleStyle: {
                alignSelf: 'center',
                textAlign: 'center',
                width: '90%',
            },
            headerTintColor: '#fff',
            gesturesEnabled: true,
        }),
});

const CompanyDetailScreenStackNavigator = createStackNavigator({
    //All the screen from the Screen1 will be indexed here
    CompanyDetailScreen: {
        screen: CompanyDetailScreen,
        navigationOptions : { 
            headerTitle: Labels._compnay_detail_page_title,
        }
    
    },     
},{
    
    initialRouteName: 'CompanyDetailScreen',    
    defaultNavigationOptions: ({ navigation }) => ({
          
            headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
            headerRight: 
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity onPress={() => navigation.replace('NotificationScreen')}>
                        <Image source = { require('../assets/images/sidemenu/icon-menu-bell.png') }style={{ width: 19, height: 18, marginRight: 16, marginTop: -2, resizeMode: 'stretch' }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.replace('MessageScreen')}>
                        <Image source = { require('../assets/images/sidemenu/icon-menu-mail.png') }style={{ width: 20, height: 16, marginRight: 14, resizeMode: 'stretch' }} />
                    </TouchableOpacity>
                </View>,

            headerStyle: {
                backgroundColor: Colors.primaryBackground,
                elevation: 0,       //remove shadow on Android
                shadowOpacity: 0,   //remove shadow on iOS
                borderColor: Colors.primaryBackground,
                borderBottomWidth: 0,
                shadowColor: 'transparent'
            },

            headerTitleStyle: {
                alignSelf: 'center',
                textAlign: 'center',
                width: '90%',
            },
            headerTintColor: '#fff',
            gesturesEnabled: true,
        }),
});

const MapScreenStackNavigator = createStackNavigator({
    //All the screen from the Screen1 will be indexed here
    MapScreen: {
        screen: MapScreen,
        navigationOptions: ({ navigation }) => ({
            headerTitle: 'خريطة الفرص' ,
            headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
            headerRight: 
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity onPress={() => navigation.replace('NotificationScreen1')}>
                        <Image source = { require('../assets/images/sidemenu/icon-menu-bell.png') }style={{ width: 19, height: 18, marginRight: 16, marginTop: -2, resizeMode: 'stretch' }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.replace('MessageScreen1')}>
                        <Image source = { require('../assets/images/sidemenu/icon-menu-mail.png') }style={{ width: 20, height: 16, marginRight: 14, resizeMode: 'stretch' }} />
                    </TouchableOpacity>
                </View>,

            headerStyle: {
                backgroundColor: Colors.primaryBackground,
                elevation: 0,       //remove shadow on Android
                shadowOpacity: 0,   //remove shadow on iOS
                borderColor: Colors.primaryBackground,
                borderBottomWidth: 0,
                shadowColor: 'transparent'
            },

            headerTitleStyle: {
                alignSelf: 'center',
                textAlign: 'center',
                width: '90%',
            },
            headerTintColor: '#fff',
            gesturesEnabled: true,
        }),
    },
  
}, 
{
    initialRouteName: 'MapScreen',
});


const DrawerContent = (props) => (

    <ScrollView style={{flex: 1}}>

        <View style={{height: Dimensions.get('window').height * 1.3, alignItems: 'center',}}>
            
            <View style={styles.searchBox}>
                
                <TouchableOpacity style={styles.formIconPhone}>
                    <Image source={require('../assets/images/sidemenu/icon-menu-search.png')}  style={{ height: 23, width: 23,}} />
                </TouchableOpacity>
                <TextInput style={styles.formInput}  />
            </View>

            <Dash style={styles.dash} dashColor = {Colors.secondaryText} />
     
            <View style={styles.companyBrandPart}>
               
                    <View style={{flex: 1, alignItems: 'center'}}>
                        <TouchableOpacity >
                            <Image source={{uri: global.loginInfo.logo}}  style={{ height: 50, width: 50, borderRadius: 25}} />
                        </TouchableOpacity>
                    </View>

                    <View style={{flex: 2, alignItems: 'flex-start'}}>
                        <Text style={{color: Colors.secondaryText, fontSize: 18, fontWeight: '500'}}>{global.loginInfo.name}</Text>
                        <View style={{borderRadius: 20, borderColor: Colors.secondaryText, height: 28, borderWidth: 1, alignItems: 'center', justifyContent: 'center', width: 100, marginTop: 10}}>
                            <Text style={{color: Colors.secondaryText, fontSize: 10, borderColor: Colors.white, fontFamily: 'TheSans-Plain',}}>اسفا اسنعاي</Text>
                        </View>
                    </View>
            </View>


            <Dash style={styles.dash} dashColor = {Colors.secondaryText} />


            <View style={styles.menuPart}>
                <DrawerItems {...props} />
            </View>

            <View style={{width: '100%'}}>
                <TouchableOpacity style={{flexDirection: 'row',  height: 40, width: 90, marginLeft: 29, marginTop: -30}} onPress={()=>{global.logout = false; AsyncStorage.removeItem('user_key'); props.navigation.replace('LoginScreen');  } }>
                    <Image source={require('../assets/images/sidemenu/icon-menu-out.png')}  style={{width: 19, height: 21,}}/>
                    <Text  style={ {fontSize: 14, fontFamily: 'TheSans-Plain', marginLeft: 18, color: Colors.secondaryText}}>{Labels._sidemenu_exit}</Text>
                </TouchableOpacity>
            </View>
        
            <Dash style={[styles.dash, {marginTop: 100}]} dashColor = {Colors.secondaryText} />

            <View style={styles.companyLocationPart}>
               
                    <View style={{flex: 1, alignItems: 'center'}}>
                        <TouchableOpacity >
                            <Image source={require('../assets/images/sidemenu/icon-menu-marker.png')}  style={{ height:30, width: 18, resizeMode: 'stretch'}} />
                        </TouchableOpacity>
                    </View>

                    <View style={{flex: 3, alignItems: 'flex-start'}}>
                        
                        <Text style={styles.locationText}>{Labels._sidemenu_location1}</Text>
                        <Text style={styles.locationText}>{Labels._sidemenu_location2}</Text>
                        <Text style={styles.locationText_gray}>{Labels._sidemenu_location3}</Text>
                        
                    </View>
            </View>
        </View>
        
    </ScrollView>
);

const DrawerNavigator = createDrawerNavigator(
    {
        //Drawer Optons and indexing
        Map: {
            //Title
            screen: MainScreenStackNavigator,
            navigationOptions: {
                drawerLabel: ({tinColor}) => (<Text  style={styles.menuItemText}>{Labels._sidemenu_map}</Text>),
                drawerIcon: ({tinColor})=>( <Image source={require('../assets/images/sidemenu/icon-menu-map.png')}  style={styles.menuItemIcon}/>),
            },
        },
        Notification: {
            //Title
            screen: NotificationScreenStackNavigator,
            navigationOptions: {
                drawerLabel: ({tinColor}) => (<Text  style={styles.menuItemText}>{Labels._sidemenu_alert}</Text>),
                drawerIcon: ({tinColor})=>( <Image source={require('../assets/images/sidemenu/icon-menu-bell.png')}  style={{width: 20, height: 22, marginLeft: 8, marginTop: 12, marginBottom: 10}}/>),
            },
        },
        Message: {
            //Title
            screen: MessageScreenStackNavigator,
            navigationOptions: {
                drawerLabel: ({tinColor}) => (<Text  style={styles.menuItemText}>{Labels._sidemenu_message}</Text>),
                drawerIcon: ({tinColor})=>( <Image source={require('../assets/images/sidemenu/icon-menu-mail.png')}  style={{width: 23, height: 16, }}/>),
            },
        },
        Favorit: {
            //Title
            screen: FavoritJobListScreenStackNavigator,
            navigationOptions: {
                drawerLabel: ({tinColor}) => (<Text  style={styles.menuItemText}>{Labels._sidemenu_favorits}</Text>),
                drawerIcon: ({tinColor})=>( <Image source={require('../assets/images/sidemenu/icon-menu-like.png')}  style={{width: 23, height: 19, }}/>),
            },
        },
        JobList: {
            //Title
            screen: JobListScreenStackNavigator,
            navigationOptions: {
                drawerLabel: ({tinColor}) => (<Text  style={styles.menuItemText}>{Labels._sidemenu_list}</Text>),
                drawerIcon: ({tinColor})=>( <Image source={require('../assets/images/sidemenu/icon-menu-list.png')}  style={{width: 18, height: 26, }}/>),
            },
        },
        CompanyList: {
            //Title
            screen: CompanyListScreenStackNavigator,
            navigationOptions: {
                drawerLabel: ({tinColor}) => (<Text  style={styles.menuItemText}>{Labels._sidemenu_companylist}</Text>),
                drawerIcon: ({tinColor})=>( <Image source={require('../assets/images/sidemenu/icon-menu-company.png')}  style={{width: 21, height: 25, }}/>),
            },
        },
        Settings: {
            //Title
            screen: SettingsScreenStackNavigator,
            navigationOptions: {
                drawerLabel: ({tinColor}) => (<Text  style={styles.menuItemText}>{Labels._sidemenu_settings}</Text>),
                drawerIcon: ({tinColor})=>( <Image source={require('../assets/images/sidemenu/icon-menu-setting.png')}  style={{width: 22, height: 23, }}/>),
            },
        },
        JobDetailScreenHidden: {
            //Title
            screen: JobDetailScreenStackNavigator,
            navigationOptions: {
                drawerLabel: ({tinColor}) => (<Text >{Labels._sidemenu_settings}</Text>),
           
            },
        },
        
        CompanyDetailScreenHidden: {
            //Title
            screen: CompanyDetailScreenStackNavigator,
            navigationOptions: {
                drawerLabel: ({tinColor}) => (<Text >{Labels._sidemenu_settings}</Text>),
           
            },
        },

        //-------------
        MapHidden: {
            //Title
            screen: MapScreenStackNavigator,
            navigationOptions: {
               
                drawerLabel: ({tinColor}) => (<Text >{Labels._sidemenu_settings}</Text>),
            },
        },
        
    },
    {
        // define customComponent here
        contentComponent: DrawerContent,
        drawerPosition: 'right' ,
        drawerBackgroundColor: Colors.black,
        drawerWidth: Dimensions.get('window').width * 0.65,
        contentOptions: {
          
            iconContainerStyle: {
              opacity: 1,
           
              height: 50,
              justifyContent: 'center',
              
            },
            itemsContainerStyle: {
                marginLeft: 8,
            },
          
        }
      
    },
    
);

//For React Navigation 2.+ need to export App only
//export default DrawerNavigator;
//For React Navigation 3.+
export default SideMenuContainer = createAppContainer(DrawerNavigator); 


const styles = StyleSheet.create({

    searchBox: {
        borderRadius: 20,
        height: 40, 
        width: Dimensions.get('window').width * 0.45,
        alignItems: 'flex-start',
        backgroundColor: Colors.white,
        marginTop: 40
    },

    formInput: {
        flex: 1,
        width: '80%',
        marginLeft: 30,
        paddingRight: 8,
        textAlign: 'right', 
        fontFamily: 'TheSans-Plain',
        backgroundColor: Colors.white,
        borderRadius: 20,
    },

    formIconPhone: {
        position: 'absolute',
        left:6,
        top: 8,
        height: 23,
        width: 23,
    },

    dash: {
        height: 1, 
        width: Dimensions.get('window').width * 0.5,
        marginTop: 20,
        marginBottom:10,
    },

    companyBrandPart: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: Dimensions.get('window').width * 0.5,
        marginTop: 15
    },

    companyLocationPart: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: Dimensions.get('window').width * 0.5,
    },

    menuPart: {
        alignItems: 'flex-start',
        width: '100%'
    },

    addressPart: {
        flex: 1,
        alignItems: 'center',
    },

    menuItemIcon: {
        marginLeft: 8, 
        marginBottom: 10, 
        marginTop: 15,
        width: 20,
        height: 20,
        resizeMode: 'stretch'
    },

    menuItemText: {
        paddingLeft: 15, 
        paddingTop: 5,
        color: Colors.secondaryText, 
        textShadowRadius: 1, 
        textShadowColor: '#efefef', 
        fontSize: 14, 
        alignItems: "center",
        textAlign: 'center',
        height: 24,
        fontFamily: 'TheSans-Plain'
    },

    locationText: {
        color: Colors.white, 
        fontSize: 14, 
        fontFamily: 'TheSans-Plain',
        marginTop: 5,
    },

    locationText_gray: {
        color: '#8E8E8E', 
        fontSize: 14, 
        fontFamily: 'TheSans-Plain',
        marginTop: 5,
    },
})
