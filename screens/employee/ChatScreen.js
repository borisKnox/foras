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
import firebase from 'react-native-firebase';
import Colors from '../../constants/Colors';
import { Labels } from '../../constants/Langs';
import { GiftedChat } from 'react-native-gifted-chat';
import firebaseSvc from '../../FirebaseSvc';

export default class ChatScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            spinner: false,
            senderName: '',
            jobID: '',
            jobTitle: '',
            messages: [],
            accpet: 'Accept',
            reject: 'Reject'
        }
    }
    componentDidMount(){
        this.setState({
            senderName: global.chatDetail.sender.name,
            jobID: global.jobDetailId,
            jobTitle: global.chatDetail.subject
        });

        firebaseSvc.refOn(global.chatDetail, message => {
                if(message.subject == "Offer Job Message"){
                    global.offerMessage = 1;
                } else {
                    global.offerMessage = 0;
                }
                this.setState(previousState => ({
                    messages: GiftedChat.append(previousState.messages, message),
                    direction: global.chatDetail.meta.direction,
                    offer: global.chatDetail.subject
                })) 
            }
        );
    }
    componentWillUnmount() {
        firebaseSvc.refOff();
    }

    sendMsg = (msg) => {      
        const sender = {name : global.loginInfo.name, api_token : global.token, logo : global.loginInfo.logo};
        let message = [];
        msg.map((obj, index) =>
            {
              
              message = [{
                sender_id: global.senderID,
                receiver_id: global.receiverID,
                text: obj.text,
                message: obj.text,
                subject: "real message",
                sender: sender,
                id: this.state.jobID,
                user: {
                  id: sender.api_token,
                  name: sender.name,
                  avatar: sender.logo ? sender.logo : profile,
                },
                meta: {
                    received: true,
                    direction: true
                }
              }];                           
            }            
        );
        firebaseSvc.send(message);
    }
    get user() {
        const senduser = {
          id: global.token,
          name: global.loginInfo.name,
          avatar: global.loginInfo.logo ? global.loginInfo.logo : profile,
        }
        return senduser;
    }

    goJobDetail(jobID) {
        this.setState({spinner: true});
        this.props.navigation.replace('JobDetail1');
    }

    onClickAccept(jobID) {
        global.offerMessage = 0;
        this.setState({accpet: "Accepted"});
        const sender = {name : global.loginInfo.name, api_token : global.token, logo : global.loginInfo.logo};
        
        const message = [{
            sender_id: global.senderID,
            receiver_id: global.receiverID,
            text: sender.name + " accepted",
            message: sender.name + " accepted",
            subject: "accept message",
            sender: sender,
            id: this.state.jobID,
            user: {
              id: sender.api_token,
              name: sender.name,
              avatar: sender.logo ? sender.logo : profile,
            },
            meta: {
                received: true,
                direction: true
            }
        }];
        api.sendJobAccept(message[0], global.token).then( (res)=>{
            if (res.status == 200) {      
                console.log(res);
                firebaseSvc.send(message);
                this.setState({spinner: false});
                Toast.show("Accepted");
            } else {
                this.setState({spinner: false})
                // Alert.alert(
                //     'Error!',
                //     res.errors,
                //     [
                //         {text: 'OK', onPress: () =>  this.setState({spinner: false})},
                //     ],
                //     {cancelable: false},
                // );
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }

    onClickReject(jobID) {
        global.offerMessage = 0;
        this.setState({reject: "Rejected"});
        const sender = {name : global.loginInfo.name, api_token : global.token, logo : global.loginInfo.logo};
        
        const message = [{
            sender_id: global.senderID,
            receiver_id: global.receiverID,
            text: sender.name + " Rejected",
            message: sender.name + " Rejected",
            subject: "reject message",
            sender: sender,
            id: this.state.jobID,
            user: {
              id: sender.api_token,
              name: sender.name,
              avatar: sender.logo ? sender.logo : profile,
            },
            meta: {
                received: true,
                direction: true
            }
        }];
        api.sendJobReject(message[0], global.token).then( (res)=>{
            if (res.status == 200) {      
                console.log(res);
                firebaseSvc.send(message);
                this.setState({spinner: false});
                Toast.show("Rejected");
            } else {
                this.setState({spinner: false})
                // Alert.alert(
                //     'Error!',
                //     res.errors,
                //     [
                //         {text: 'OK', onPress: () =>  this.setState({spinner: false})},
                //     ],
                //     {cancelable: false},
                // );
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }
    render() {
        return (
        <View id="header" style={{flex:1}}>
            <Container>
                <Header androidStatusBarColor="#F2620F" style={{backgroundColor:"#F2620F"}}>
                    <Left style={{flex: 1}}>
                        <TouchableOpacity  onPress={() => this.props.navigation.openDrawer()}>
                            <Image source={require('../../assets/images/sidemenu/icon-sidemenu.png')} style={{ width: 18, height: 16, marginLeft: 12 }}/>
                        </TouchableOpacity>
                    </Left>
                    <Body style={styles.headerBody }>
                        { global.offerMessage == 1?
                        // <Title style={{color: '#FFF'}}>{this.state.senderName}</Title>
                        <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity style={{borderColor: 'white', borderRadius: 5, borderWidth: 0.5}} onPress={() => this.onClickAccept(this.state.jobID)}>
                                <Text style={{color:'white', padding: 8}}>{this.state.accpet}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{borderColor: 'white', borderRadius: 5, borderWidth: 0.5}} onPress={() => this.onClickReject(this.state.jobID)}>
                                <Text style={{color:'white', padding: 8}}>{this.state.reject}</Text>
                            </TouchableOpacity>
                        </View>
                        :
                        
                        <Text style={{color:'white', padding: 8}}></Text>
                        
                        }
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
                </Header>
            </Container>
            <View style={{flex:10}}>
                <GiftedChat
                    placeholder="اكتب رسالة"
                    isTyping="true"
                    alwaysShowSend="true"
                    messages={this.state.messages}
                    onSend={this.sendMsg}
                    user={this.user}
                />
            </View>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    headerBody: {
        // flex: 1,
        alignItems: 'center',
    },
});