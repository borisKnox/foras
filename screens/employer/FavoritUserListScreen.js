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
  Alert
} from 'react-native';
import { Rating } from 'react-native-ratings';
import Spinner from 'react-native-loading-spinner-overlay';

import api from '../../constants/api';


import Colors from '../../constants/Colors';
import { Labels } from '../../constants/Langs';
import { Container, Header, Title, Content,  Footer, FooterTab,  Body, 
    Left, Right, Icon, Button, } from "native-base";
const userData = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        userName: 'عبد الرحيم علي الوليد',
        userCategory: 'خبير تسويق',
        userLocation: ' الرياض',
        userHourly: '40 ريال',
        availableFrom:'متوفر للعمل من: 5 مارس 2019',
        logoUrl: 'www.thamsdfdsfdsfd',
        isFavorit: true 
    },
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abbrty28ba',
        userName: 'عبد الرحيم علي الوليد',
        userCategory: 'خبير تسويق',
        userLocation: ' الرياض',
        userHourly: '40 ريال',
        availableFrom:'متوفر للعمل من: 5 مارس 2019',
        logoUrl: 'www.thamsdfdsfdsfd',
        isFavorit: true 
    },
];

class UserListItem extends React.Component{
    constructor(props) {
        super(props);
    }

    onSelect = (index) => {
        this.props.onSelect(index);
    };

    changeLike = (item, index) => {
    
        this.props.changeLike(item, index);
    };

    render(){
        return(            
            <View style={styles.tableContainer}>
                <TouchableOpacity style={styles.logoPart} onPress={() => this.onSelect(this.props.index)}>
                    <View style= {styles.logoDotContainer}>
                        <View style={styles.logoContainer}>
                            <Image source={{uri: this.props.item.individuals.logo}}  style={{ height: 70, width: 70, borderRadius: 35}} />
                        </View>
                    </View>
                    <View style= {styles.ratingContainer}>
                        <Rating
                            readonly
                            startingValue = {this.props.item.individuals.marks == null? "0" : this.props.item.individuals.marks}
                            fractions={20}
                            ratingCount={5}
                            imageSize={15}
                            ratingColor={Colors.primaryBackground}
                            onFinishRating={this.ratingCompleted}
                        />
                    </View>
                </TouchableOpacity>

                <View style={styles.detailPart}>
                    <TouchableOpacity style={styles.detailContainer} onPress={() => this.onSelect(this.props.index)}>
                        <View style={styles.detailLine}>
                            <Text style={styles.detailItemSubject}>{this.props.item.individuals.name == null? "" : this.props.item.individuals.name}</Text>                        
                        </View>
                        <View style={styles.detailLine}>
                            <Text style={styles.detailItemSubject}>{Labels._userList_cart_category}</Text>
                            <Text style={styles.detailItemSubject}>:</Text>
                            <Text style={styles.detailItemContent}>{this.props.item.individuals.work_area == null? "": this.props.item.individuals.work_area}</Text>
                        </View>
                        <View style={styles.detailLine}>
                            <Text style={styles.detailItemSubject}>{Labels._userList_cart_location}</Text>
                            <Text style={styles.detailItemSubject}>:</Text>
                            <Text style={styles.detailItemContent}>{this.props.item.individuals.address == null? "" : this.props.item.individuals.address}</Text>
                        </View>
                        <View style={styles.detailLine}>
                            <Text style={styles.detailItemSubject}>{Labels._userList_cart_hourly}</Text>
                            <Text style={styles.detailItemSubject}>:</Text>
                            <Text style={styles.detailItemContent}>{this.props.item.individuals.hourly_rate == null? "": this.props.item.individuals.hourly_rate}</Text>
                        </View>
                    </TouchableOpacity>
                
                    <View style={styles.locationContainer}>
                        <TouchableOpacity onPress={()=>this.changeLike( this.props.item, this.props.index)}>
                            <Image source={require('../../assets/images/icon-like.png')}  style={{ height: 20, width: 20}} />
                        </TouchableOpacity>
                    
                        <TouchableOpacity style={styles.deadlineButton}>
                            <Text style={styles.deadlineText}>متاح للعمل من: {this.props.item.individuals.available_work_from_time ==null? "" : this.props.item.individuals.available_work_from_time}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>               
        )
    }
}




export default class FavoritUserListScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isWorkdaysModalVisible: false,
            spinner: false,
            favoriteIndividuals: []
        }
    }

    componentDidMount(){
        this.setState({spinner: true});
        api.getFavoriteIndividuals(global.token).then((res)=>{
            console.log('getJobList response____', res);  
            if(res.status == 200){
                this.setState({spinner: false});
                this.setState({favoriteIndividuals: res.data});
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

    onGoJobListScreen() {
        this.props.navigation.navigate('Main');
    }

    toggleWorkdaysModal = () => {
        
        this.setState({ isWorkdaysModalVisible: !this.state.isWorkdaysModalVisible });
    };

    onSelect = (index) => {
        console.log('===>>>>', index);
        global.userDetailId = this.state.favoriteIndividuals[index].individuals.id;
        this.props.navigation.replace('UserDetail');
    }

    changeLike = (item, index) => {
        console.log("====================select likeStatus=====================")
        this.setState({spinner: true});
        api.favoriteIndividualToggle(global.token, item.individuals.id).then((res)=>{
            console.log('favoriteJobToggle response____', res);
            if(res.status == 200){
                this.setState({spinner: false});
                var removeItem = this.state.favoriteIndividuals.splice(index, 1);
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
                        <TouchableOpacity  onPress={() => this.props.navigation.openDrawer()}>
                            <Image source={require('../../assets/images/sidemenu/icon-sidemenu.png')} style={{ width: 18, height: 16, marginLeft: 12 }}/>
                        </TouchableOpacity>
                    </Left>
                    <Body style={styles.headerBody }>
                        <Title style={{color: '#FFF'}}>{Labels._sidemenu_favorits}</Title>
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
                    
                            <FlatList
                                data={this.state.favoriteIndividuals}
                                keyExtractor={item => item.id}
                                extraData={this.state}
                                renderItem={({item, index, separators}) => <UserListItem item={item} onSelect={this.onSelect} changeLike={this.changeLike} index={index}/>}
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
    headerBody: {
        flex: 2,
        alignItems: 'center',
    },
    contentContainer: {
        flex: 1,
        paddingTop: 0,
        height: Dimensions.get('window').height  *1.7,
        width: Dimensions.get('window').width * 0.85,
        overflow: 'hidden', 
        alignItems: 'center'
    },
    backgroundImage: {
        position: 'absolute',
        marginTop: -50,
      
        width: '100%',
    },



    bottomButtonPart: {
        position: 'absolute',
        bottom: 0,
        height: 70,
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
        height: 18,
        width: 19,
    },
    buttonListText: {
        fontSize: 14,
        marginLeft: 15,
        // fontFamily: 'TheSans-Plain'

    },

    dash : {
        height: 1, 
        width: Dimensions.get('window').width * 0.7,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },

    tableContainer: {
        width: Dimensions.get('window').width * 0.85, 
        height: Dimensions.get('window').width * 0.35, 
        backgroundColor: Colors.white, 
        marginTop: 10, 
        borderRadius: 10,
        flex: 1,
        flexDirection: 'row',
        overflow: 'hidden',
    },

    logoPart: {
        flex: 1,
        alignItems: 'center',
   
    },
    logoDotContainer: {
        width: 80, 
        height: 80, 
        borderRadius: 40, 
        borderColor: Colors.secondaryText, 
        borderWidth: 1, 
        borderStyle: 'dotted', 
        padding: 4, 
        marginTop: 15
    }, 
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.secondaryBackground,
        width: 70,
        height: 70,
        borderRadius: 35,
      
        // marginTop: 15,
       
    },

    ratingContainer: {
        marginTop: 10, 
        flex: 1,
        paddingBottom: 5

    },
    detailPart: {
        flex: 2,
        
        alignItems: 'flex-start',
    },
    detailContainer:{
        flex: 4,
        width: '100%',
        
        paddingTop:10
    },
    detailLine:{
        flexDirection: 'row',
        alignItems: 'flex-start',
        width: '100%',
        height: 20
    },
    detailItemSubject: {
        fontSize: 14,
        fontFamily: 'TheSans-Bold'
    },
    detailItemContent: {
        fontSize: 14,
        fontFamily: 'TheSans-Plain',
        color: Colors.secondaryText
    },

    locationContainer: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        
        paddingBottom: 7

    },
    deadlineButton: {
        borderRadius: 10, 
        borderColor: Colors.black, 
        borderWidth: 1, 
        height: 20, 
        width: '75%', 
        marginLeft: 3, 
        // alignItems: 'center',
        justifyContent: 'center',
    },
    deadlineText: {
        color: Colors.primarySpeical,
        fontSize: 10,
        fontFamily: 'TheSans-Plain'
    },

    modalContainer: {
        position: 'absolute',
        bottom: 0,
        height: Dimensions.get('window').width * 0.7,
        backgroundColor: Colors.white,
        alignItems: 'center',
      
      
        width: '100%',

        shadowColor: Colors.black,
        shadowOffset: {
            width: 8, height: 8
        },
        shadowOpacity: 0.5,
        elevation: 24,
    },

    modalDownButton: {
        backgroundColor:Colors.primaryBackground, 
        height: 20, 
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    filterButtonPart:{
        width: Dimensions.get('window').width * 0.8 ,
        height: Dimensions.get('window').width * 0.9 - 80,
    
        flex: 1,
    }
    


  

    
});
