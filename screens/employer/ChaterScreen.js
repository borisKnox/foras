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

export default class ChaterScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            spinner: false,
            senderName: '',
            jobID: '',
            jobTitle: '',
            messages: [],
            award: 'Award',
        }
    }

    componentDidMount(){
        // console.log("global.chatdetail in charterscreen",global.chatDetail);
        this.setState({
            senderName: global.chatDetail.sender.name,
            jobID: global.chatDetail.id,
            jobTitle: global.chatDetail.subject
        });        
 
        // if (global.chatDetail != this.state.messages) {   

            firebaseSvc.refOn(global.chatDetail, message => 
                this.setState(previousState => ({
                    messages: GiftedChat.append(previousState.messages, message),
                    direction: global.chatDetail.meta.direction,
                    offer: global.chatDetail.subject
                }))
            );
        // } 
    }

    componentWillUnmount() {
        firebaseSvc.refOff();
    }

    goJobDetail(jobID) {
        this.setState({spinner: true});
        this.props.navigation.replace('JobDetail');
    }

    onClickAward(jobID){
        const sender = {name : global.loginInfo.name, api_token : global.token, logo : global.loginInfo.logo};
        let message = [];
    
        message = [{
            sender_id: global.senderID,
            receiver_id: global.receiverID,
            text:  this.state.senderName + ' are awarded',
            message: this.state.senderName + ' are awarded',
            subject: 'Offer Job Message',
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

        firebaseSvc.send(message);
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
                subject: 'real message',
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

    render() {
        return (
        <View style={{flex:1}}>
            <Container>
                <Header androidStatusBarColor="#F2620F" style={{backgroundColor:"#F2620F"}}>
                    <Left style={{flex: 1}}>
                        <TouchableOpacity  onPress={() => this.props.navigation.openDrawer()}>
                            <Image source={require('../../assets/images/sidemenu/icon-sidemenu.png')} style={{ width: 18, height: 16, marginLeft: 12 }}/>
                        </TouchableOpacity>
                    </Left>
                    <Body style={styles.headerBody }>
                        {/* <Title style={{color: '#FFF'}}>{this.state.senderName}</Title> */}
                        
                        <TouchableOpacity style={{borderColor: 'white', borderRadius: 5, borderWidth: 0.5}} onPress={() => this.onClickAward(this.state.jobID)}>
                            <Text style={{color:'white', padding: 8}}>{this.state.award}</Text>
                        </TouchableOpacity>
                        
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
            </Container>
            <View style={{flex:2}}>
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
        flex: 2,
        alignItems: 'center',
    },
});