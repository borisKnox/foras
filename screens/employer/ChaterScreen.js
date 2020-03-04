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
        }
    }

    componentDidMount(){
        this.setState({
            senderName: global.chatDetail.sender.name,
            jobID: global.chatDetail.job_id,
            jobTitle: global.chatDetail.subject
        });
        console.log('dddddddddd',global.chatDetail);
        // firebaseSvc.refOn(message => 
        //     this.setState(previousState => ({
        //       messages: GiftedChat.append(previousState.messages, message),
        //       })
        //     )
        // );
        if (global.chatDetail!=this.state.messages) {
  
            console.log("global.chatDetail===>",global.chatDetail);
            
            this.state.messages=[];
            this.setState({messages: this.state.messages});
    
            firebaseSvc.ref.on("child_added", function(snapshot) {
              
              if(snapshot.child('sender_id').val() == global.chatDetail.sender_id && snapshot.child('receiver_id').val() == global.loginInfo.api_token || 
              snapshot.child('receiver_id').val() == global.chatDetail.sender_id && snapshot.child('sender_id').val() == global.loginInfo.api_token ){
                this.state.messages.unshift(snapshot.val());
              }         
              this.setState({messages: this.state.messages});
              }, this);
        }     
    }

    componentWillUnmount() {
        firebaseSvc.refOff();
    }

    goJobDetail(jobID) {
        this.setState({spinner: true});
        this.props.navigation.replace('JobDetail1');
    }

    onClickAward(jobID){
        alert("Offer is completed");
    }

    sendMsg = (msg) => {

        let message = [];
        
        msg.map((obj, index) =>
            {
              message = [{
                sender_id: global.loginInfo.api_token,
                receiver_id: global.chatDetail.sender_id,
                // message: this.state.message,
                text: obj.text,
                message: obj.text,
                subject: 'real message',
                sender: { api_token: global.loginInfo.api_token,
                        name: global.loginInfo.name,
                        logo: global.loginInfo.logo,
                    }
              }];
              console.log('receiver id===>',message);
              firebaseSvc.send(message);
            }
        )
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
                        <Title style={{color: '#FFF'}}>{this.state.senderName}</Title>
                        {/* <TouchableOpacity onPress={() => this.goJobDetail(this.state.jobID)}>
                            <Text>{this.state.jobTitle}</Text>
                        </TouchableOpacity> */}
                        <TouchableOpacity onPress={() => this.onClickAward(this.state.jobID)}>
                            <Text>Award</Text>
                        </TouchableOpacity>
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
            <View style={{flex:2}}>
                <GiftedChat
                    placeholder="اكتب رسالة"
                    isTyping="true"
                    alwaysShowSend="true"
                    messages={this.state.messages}
                    onSend={this.sendMsg}
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