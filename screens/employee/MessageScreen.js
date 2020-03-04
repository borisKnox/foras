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
  FlatList,
  Alert
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { Container, Header, Title, Content,  Footer, FooterTab,  Body, 
    Left, Right, Icon, Button, } from "native-base";
import api from '../../constants/api';

import Colors from '../../constants/Colors';
import { Labels } from '../../constants/Langs';


const messageData = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        timestamp: 'اليوم - ص 11:30',
        title: 'MP Marketing',
        content: 'شركة MP Marketing  قامت بالموافقة على طلب تعيينك'
    },
    {
        id: 'bd7acbea-c1b1-46c2-aesd5-3ad53abb28ba',
        timestamp: 'اليوم - ص 09:30',
        title: 'MP Marketing',
        content: 'برجاء تحديث ملفك الشخصي لضمان حصولك على فرص أكثر'
    },
  
]

class Item extends React.Component{
    constructor(props) {
        super(props);
    }

    onSelect = (data) => {
        this.props.onSelect(data);
    };

    render(){
        return(
            <View style={this.props.item.type =="offer_job"? styles.tableContainer1 : styles.tableContainer}>
                <View style={styles.messageIconContainer}>
                    <Image source={{uri: this.props.item.sender.logo}} style={{width: 50, height: 50, borderRadius: 25}}/>
                </View>
                {this.props.item.type =="offer_job"?
                    <TouchableOpacity style={styles.messageTextContainer} onPress={() => this.onSelect(this.props.item)}>
                        <Text style={styles.messageTitle1}>{this.props.item.subject}</Text>
                        <Text style={styles.name}>{this.props.item.sender.name}</Text>
                        <Text style={styles.messageContent}>{this.props.item.message}</Text>                    
                        <Text style={styles.messageTime}>{this.props.item.created_at}</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.messageTextContainer} onPress={() => this.onSelect(this.props.item)}>
                        {/* <Text style={styles.messageTitle}>{this.props.item.subject}</Text> */}
                        <Text style={styles.name}>{this.props.item.sender.name}</Text>
                        <Text style={styles.messageContent}>{this.props.item.message}</Text>                    
                        <Text style={styles.messageTime}>{this.props.item.created_at}</Text>
                    </TouchableOpacity>
                }
            </View>
        )
    }
}

export default class MessageScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            spinner: false,
            messageData: [],
            favoriteJobs: []
        }
    }

    componentDidMount(){
        this.setState({spinner: true});
        api.message(global.token).then((res)=>{
            console.log('message response____', res);  
            if(res.status == 200){
                // this.setState({spinner: false});
                this.setState({messageData: res.data});

                api.getFavoriteJobs(global.token).then((res)=>{
                    //console.log('getFavoriteJobs response____', );  
                    if(res.status == 200){
                        this.setState({spinner: false});
                        this.setState({favoriteJobs: res.data});               
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

    onSelect = (data) => {
        global.favoriteJobStatus = false;
        this.state.favoriteJobs.map((datas, index)=>{
            if(data.job_id == datas.job_id){
                global.favoriteJobStatus = true;
            }
        })
        global.jobDetailId = data.job_id;
        global.detailLogo = data.sender.logo;
        global.chatDetail = data;
        //this.props.navigation.replace('Chat');
        this.props.navigation.navigate('Chat');
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
                        <Title style={{color: '#FFF'}}>{Labels._sidemenu_message}</Title>
                    </Body>
                    <Right style={{flex: 1}}>
                        <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity onPress={() => this.props.navigation.replace('Notification1')}>
                                <Image source = { require('../../assets/images/sidemenu/icon-menu-bell.png') }style={{ width: 19, height: 18, marginRight: 16, marginTop: -2, resizeMode: 'stretch' }} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigation.replace('Message1')}>
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
                    
                            <FlatList
                                data={this.state.messageData}
                                renderItem={({ item }) => <Item item={item} onSelect={this.onSelect}/>}
                                keyExtractor={item => item.id}
                            />
                    
                        <TouchableOpacity style={styles.editButtonPart} >
                            <Image source={require('../../assets/images/notification/icon-edit-message.png')} style={styles.editIcon}/>
                        </TouchableOpacity>

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
    headerBody: {
        flex: 2,
        alignItems: 'center',
    },
    contentContainer: {
        flex: 1,
        paddingTop: 0,
        height: Dimensions.get('window').height  *1.7,
        width: Dimensions.get('window').width * 0.85,
        overflow: 'hidden'
    },
    layoutDefault: {
        flex: 1
    },
    backgroundImage: {
        position: 'absolute',
        marginTop: -50,
      
        width: '100%',
    },

    tableContainer: {
        width: Dimensions.get('window').width * 0.85, 
        height: 90, 
        backgroundColor: Colors.white, 
        marginTop: 10, 
        borderRadius: 5,
        flex: 1,
        flexDirection: 'row',
        overflow: 'hidden',
        padding: 15,
    },
    tableContainer1: {
        width: Dimensions.get('window').width * 0.85,
        backgroundColor: "#d3ecf2", 
        marginTop: 10, 
        borderRadius: 5,
        flex: 1,
        flexDirection: 'row',
        overflow: 'hidden',
        padding: 15,
    },
    messageIconContainer: {
        height: 50, 
        width: 50, 
        backgroundColor: Colors.secondaryBackground, 
        borderRadius: 25, 
        alignItems: 'center', 
        justifyContent:'center'
    },
    messageTextContainer: {
        alignItems: 'flex-start', 
        marginLeft: 5, 
        paddingRight: 20,
       
        justifyContent: 'space-around'
    },
    messageTime: {
        textAlign: 'left',
        fontFamily: 'TheSans-Bold', 
        fontSize: 12

    },
    messageTitle: {
        textAlign: 'left',
        fontFamily: 'TheSans-Bold', 
        fontSize: 14

    },
    messageTitle1: {
        textAlign: 'left',
        fontFamily: 'TheSans-Bold', 
        fontSize: 15,
        color: 'red'
    },
    messageContent: {
        textAlign: 'left',
        fontFamily: 'TheSans-Plain', 
        fontSize: 12,
        lineHeight: 14,
        marginTop: 3,


    }, 

    editButtonPart: {
        height: Dimensions.get('window').width * 0.17,
        width: Dimensions.get('window').width * 0.17,
        bottom: 40,
        right: 40,
        position: 'absolute',
        borderRadius: Dimensions.get('window').width * 0.34,
        backgroundColor: Colors.black,
        opacity: 0.7,
        alignItems: "center",
        justifyContent: 'center',
        shadowColor: Colors.black,
        shadowOffset: {
            width: 8, height: 8
        },
        shadowOpacity: 0.5,
        elevation: 24
    },
    editIcon: {
        width: 25,
        height: 25,
    },

});
