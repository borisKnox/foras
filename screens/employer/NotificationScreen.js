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
  FlatList,
  Alert,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import api from '../../constants/api';
import Colors from '../../constants/Colors';
import { Labels } from '../../constants/Langs';
import { Container, Header, Title, Content,  Footer, FooterTab,  Body, 
    Left, Right, Icon, Button, } from "native-base";

const notificationData = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        timestamp: 'اليوم - ص 11:30',
        content: 'شركة MP Marketing  قامت بالموافقة على طلب تعيينك'
    },
    {
        id: 'bd7acbea-c1b1-46c2-aesd5-3ad53abb28ba',
        timestamp: 'اليوم - ص 09:30',
        content: 'برجاء تحديث ملفك الشخصي لضمان حصولك على فرص أكثر'
    },  
]

function Item({id, timestamp, content}){
    return (
        <TouchableOpacity style={styles.tableContainer}>
            <View style={styles.notiIconContainer}>
                <Image source={require('../../assets/images/notification/icon-notification.png')} style={{width: 20, height: 23}}/>
            </View>
            <View style={styles.notiTextContainer}>
                <Text style={styles.notiText}>{content}</Text>
                <Text style={styles.notiText}>{timestamp}</Text>
            </View>

        </TouchableOpacity>
    );

}

export default class NotificationScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            spinner: false,
            notificationData: [],     
        }
    }

    componentDidMount(){
        this.setState({spinner: true});
        api.notification(global.token).then((res)=>{
            console.log('message response____', res);  
            if(res.status == 200){
                this.setState({spinner: false});
                this.setState({notificationData: res.data});                
                
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

    render() {

        return (
             <Container >
                <Header androidStatusBarColor="#F2620F" style={{backgroundColor:"#F2620F"}}>
                    <Left style={{flex: 1}}>
                        <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                            <Image source={require('../../assets/images/sidemenu/icon-sidemenu.png')} style={{ width: 18, height: 16, marginLeft: 12 }}/>
                        </TouchableOpacity>
                    </Left>
                    <Body style={styles.headerBody }>
                        <Title style={{color: '#FFF'}}>{Labels._sidemenu_alert}</Title>
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
                </Header>

                <Content contentContainerStyle={styles.layoutDefault}>
                    <KeyboardAvoidingView style={styles.container}>
                        <Spinner color="#FFF" visible={this.state.spinner}/>
                        <Image source={require('../../assets/images/background-image.png')} style={styles.backgroundImage}/>

                        <TouchableOpacity style={styles.settingButton}>
                            <Image source={require('../../assets/images/notification/icon-setting-white.png')} style={{height: 16, width: 15}}/>
                            <Text style={styles.settingButtonText}>{Labels._notification_setting}</Text>
                        </TouchableOpacity>

                    
                            <FlatList
                                data={this.state.notificationData}
                                renderItem={({ item }) => <Item timestamp={item.created_at} content={item.message}  />}
                                keyExtractor={item => item.id}
                            />
                    </KeyboardAvoidingView>
                </Content>
            </Container>
        );
    }
  
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.secondaryBackground,
        alignItems: 'center',
        overflow: 'hidden'
    },
    layoutDefault: {
        flex: 1
    },
    contentContainer: {
        flex: 1,
        paddingTop: 0,
        height: Dimensions.get('window').height  *1.7,
        width: Dimensions.get('window').width * 0.85,
        overflow: 'hidden'
    },
    headerBody: {
        flex: 2,
        alignItems: 'center',
    },
    backgroundImage: {
        position: 'absolute',
        marginTop: -50,
      
        width: '100%',
    },

    settingButton: {
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: Colors.black,
        height: 30,
        width: Dimensions.get('window').width * 0.85,
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 20,
        justifyContent: 'center'

    },
    settingButtonText: {
        color: 'white', 
        marginLeft: 10, 
        fontFamily: 'TheSans-Plain', 
        fontSize: 14
    },

    tableContainer: {
        width: Dimensions.get('window').width * 0.85, 
        height: 60, 
        backgroundColor: Colors.white, 
        marginTop: 10, 
        borderRadius: 5,
        flex: 1,
        flexDirection: 'row',
        overflow: 'hidden',
        padding: 5,
    },
    notiIconContainer: {
        height: 50, 
        width: 50, 
        backgroundColor: Colors.secondaryBackground, 
        borderRadius: 5, 
        alignItems: 'center', 
        justifyContent:'center'
    },
    notiTextContainer: {
        alignItems: 'flex-start', 
        marginLeft: 5, 
        paddingRight: 20,
       
        justifyContent: 'space-around'
    },
    notiText: {
        textAlign: 'left',
        fontFamily: 'TheSans-Plain', 
        fontSize: 12,
        paddingRight: 20

    }

});
