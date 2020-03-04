import React, { Component } from "react";
import { StyleSheet, Image, TouchableOpacity, FlatList, ScrollView, Dimensions, ToastAndroid, Alert, AsyncStorage, Text,  View,} from "react-native";
import {  Content,    List,  ListItem,  Icon,  Container,  Left,  Right,  Badge,   Accordion } from "native-base";
import Dash from 'react-native-dash';
import Colors from '../constants/Colors';
import { Labels } from '../constants/Langs';


// const drawerCover = require("../../../assets/drawer-cover.png");


class EmployeeSideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shadowOffsetWidth: 1,
            shadowRadius: 4,
            matchList: false,
            avatarSource: "https://rcmi.fiu.edu/wp-content/uploads/sites/88/2019/08/avatar-1577909__340-300x300.png",
        };
        global.avatarSource = "https://rcmi.fiu.edu/wp-content/uploads/sites/88/2019/08/avatar-1577909__340-300x300.png"
    }

   

    render() {       
        return (
            <Container>
                <Content
                    bounces={false}
                    style={{ flex: 1, backgroundColor: "black", }} 
                    contentContainerStyle={{flex: 1}}>
                
                   <ScrollView style={{flex: 1}}>

                        <View style={{ alignItems: 'center',}}>
                            
                            <View style={styles.searchBox}>
                                
                                <TouchableOpacity style={styles.formIconPhone}>
                                    <Image source={require('../assets/images/sidemenu/icon-menu-search.png')}  style={{ height: 20, width: 20,}} />
                                </TouchableOpacity>
                                {/* <TextInput style={styles.formInput}  /> */}
                            </View>

                            <Dash style={styles.dash} dashColor = {Colors.secondaryText} />
                    
                            <TouchableOpacity style={styles.companyBrandPart} onPress={()=> this.props.navigation.replace('MyProfile1')}>
                            
                                <View style={{flex: 1, alignItems: 'center'}}>
                                    <View style={{height: 54, width: 54, borderRadius: 27, borderColor: '#FFF', borderWidth: 1, borderStyle: 'dotted', alignItems: 'center', justifyContent: 'center',}}>
                                        <Image source={{uri: global.loginInfo.logo}}  style={{ height: 50, width: 50, borderRadius: 25}} />
                                    </View>
                                </View>

                                <View style={{flex: 2, alignItems: 'flex-start'}}>
                                    <Text style={{color: Colors.secondaryText, fontSize: 18, fontWeight: '500', alignItems: 'flex-start'}}>{global.loginInfo.name}</Text>
                                    <View style={{borderRadius: 20, borderColor: Colors.secondaryText, height: 17, borderWidth: 1, alignItems: 'center', justifyContent: 'center', width: 100, marginTop: 10}}>
                                        <Text style={{color: Colors.secondaryText, fontSize: 10, borderColor: Colors.white, fontFamily: 'TheSans-Plain',}}>{Labels._goToPorfile}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>


                            <Dash style={styles.dash} dashColor = {Colors.secondaryText} />

                            <View style={{width: '100%'}}>
                                <TouchableOpacity style={styles.menuItem} onPress={()=>this.props.navigation.replace('Main1') }>
                                    <Image source={require('../assets/images/sidemenu/icon-menu-map.png')}  style={{width: 19, height: 21, resizeMode:"contain" }}/>
                                    <Text  style={ {fontSize: 14, fontFamily: 'TheSans-Plain', marginLeft: 16, color: Colors.secondaryText}}>{Labels._sidemenu_map}</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{width: '100%'}}>
                                <TouchableOpacity style={styles.menuItem} onPress={()=>this.props.navigation.replace('Notification1') }>
                                    <Image source={require('../assets/images/sidemenu/icon-menu-bell.png')}  style={{width: 19, height: 21, resizeMode:"contain" }}/>
                                    <Text  style={ {fontSize: 14, fontFamily: 'TheSans-Plain', marginLeft: 16, color: Colors.secondaryText}}>{Labels._sidemenu_alert}</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{width: '100%'}}>
                                <TouchableOpacity style={styles.menuItem} onPress={()=>this.props.navigation.replace('Message1') }>
                                    <Image source={require('../assets/images/sidemenu/icon-menu-mail.png')}  style={{width: 19, height: 21, resizeMode:"contain" }}/>
                                    <Text  style={ {fontSize: 14, fontFamily: 'TheSans-Plain', marginLeft: 16, color: Colors.secondaryText}}>{Labels._sidemenu_message}</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{width: '100%'}}>
                                <TouchableOpacity style={styles.menuItem} onPress={()=>this.props.navigation.replace('FavoritJobList1') }>
                                    <Image source={require('../assets/images/sidemenu/icon-menu-like.png')}  style={{width: 19, height: 21, resizeMode:"contain" }}/>
                                    <Text  style={ {fontSize: 14, fontFamily: 'TheSans-Plain', marginLeft: 16, color: Colors.secondaryText}}>{Labels._sidemenu_favorits}</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{width: '100%'}}>
                                <TouchableOpacity style={styles.menuItem} onPress={()=> this.props.navigation.replace('JobList1')}>
                                    <Image source={require('../assets/images/sidemenu/icon-menu-list.png')}  style={{width: 19, height: 21, resizeMode:"contain" }}/>
                                    <Text  style={ {fontSize: 14, fontFamily: 'TheSans-Plain', marginLeft: 16, color: Colors.secondaryText}}>{Labels._sidemenu_list}</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{width: '100%'}}>
                                <TouchableOpacity style={styles.menuItem} onPress={()=>this.props.navigation.replace('CompanyList1') }>
                                    <Image source={require('../assets/images/sidemenu/icon-menu-company.png')}  style={{width: 19, height: 21, resizeMode:"contain" }}/>
                                    <Text  style={ {fontSize: 14, fontFamily: 'TheSans-Plain', marginLeft: 16, color: Colors.secondaryText}}>{Labels._sidemenu_companylist}</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{width: '100%'}}>
                                <TouchableOpacity style={styles.menuItem} onPress={()=> this.props.navigation.replace('MyProfile1') }>
                                    <Image source={require('../assets/images/sidemenu/icon-menu-setting.png')}  style={{width: 19, height: 21, resizeMode:"contain" }}/>
                                    <Text  style={ {fontSize: 14, fontFamily: 'TheSans-Plain', marginLeft: 16, color: Colors.secondaryText}}>{Labels._sidemenu_settings}</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{width: '100%'}}>
                                <TouchableOpacity style={styles.menuItem} onPress={()=>{global.logout = false; AsyncStorage.removeItem('user_key'); this.props.navigation.replace('LoginScreen'); } }>
                                    <Image source={require('../assets/images/sidemenu/icon-menu-out.png')}  style={{width: 19, height: 21, resizeMode:"contain" }}/>
                                    <Text  style={ {fontSize: 14, fontFamily: 'TheSans-Plain', marginLeft: 16, color: Colors.secondaryText}}>{Labels._sidemenu_exit}</Text>
                                </TouchableOpacity>
                            </View>


                            <Dash style={[styles.dash, {marginTop: 40}]} dashColor = {Colors.secondaryText} />

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

                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({

    searchBox: {
        borderRadius: 20,
        height: 25, 
        width: Dimensions.get('window').width * 0.45,
        alignItems: 'flex-start',
        backgroundColor: Colors.white,
        marginTop: 40
    },
    menuItem: {
        flexDirection: 'row',  
        // height: 30,  
        marginLeft: 15, 
        marginTop: 15
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
        top: 4,
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
    },

    companyLocationPart: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: Dimensions.get('window').width * 0.5,
        marginBottom: 40
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

export default EmployeeSideBar;