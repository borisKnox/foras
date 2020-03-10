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
import { Container, Header, Title, Content,  Footer, FooterTab,  Body, 
    Left, Right, Icon, Button, } from "native-base";
import api from '../../constants/api';
import Colors from '../../constants/Colors';
import { Labels } from '../../constants/Langs';



const jobData = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        companyName: 'MP Marketing',
        jobTitle: 'مندوب',
        period: ' شهر',
        price: '3000',
        deadline: 'الفرصة متاحة حتى: 5 مارس 2019',
        logoUrl: 'www.thamsdfdsfdsfd',
        isFavorit: true 
    },
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad5d3abb28ba',
        companyName: 'MP Marketing',
        jobTitle: 'مندوب',
        period: ' شهر',
        price: '3000',
        deadline: 'الفرصة متاحة حتى: 5 مارس 2019',
        logoUrl: 'www.thamsdfdsfdsfd',
        isFavorit: true 
    },
];


class JobListItem extends React.Component {
    constructor(props) {
        super(props);
    }

    onSelect = (index) => {    
        this.props.onSelect(index);
    };

    changeLike = (item, index) => {
    
        this.props.changeLike(item, index);
    };
  
    render() {
      return (
        <View style={styles.tableContainer}>
            <TouchableOpacity style={styles.logoPart} onPress={() => this.onSelect(this.props.index)}>

                <View style={styles.logoContainer}>
                    <Image source={{uri: this.props.item.jobs.users.logo}}  style={{ height: 50, width: 50, borderRadius: 25}} />
                </View>
                <View style= {styles.ratingContainer}>
                    <Rating
                        readonly
                        startingValue = {this.props.item.jobs.users.marks == null? "0" : this.props.item.jobs.users.marks}
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
                        <Text style={styles.detailItemSubject}>{Labels._comany_name}</Text>
                        <Text style={styles.detailItemSubject}>:</Text>
                        <Text style={styles.detailItemContent}>{this.props.item.jobs.users.name == null?  "" : this.props.item.jobs.users.name}</Text>
                    </View>
                    <View style={styles.detailLine}>
                        <Text style={styles.detailItemSubject}>{Labels._job_title}</Text>
                        <Text style={styles.detailItemSubject}>:</Text>
                        <Text style={styles.detailItemContent}>{this.props.item.jobs.job_name == null?  "" : this.props.item.jobs.job_name}</Text>
                    </View>
                    <View style={styles.detailLine}>
                        <Text style={styles.detailItemSubject}>{Labels._period}</Text>
                        <Text style={styles.detailItemSubject}>:</Text>
                        <Text style={styles.detailItemContent}>{this.props.item.jobs.salary_type == null? "" : this.props.item.jobs.salary_type}</Text>
                    </View>
                    <View style={styles.detailLine}>
                        <Text style={styles.detailItemSubject}>{Labels._fees}</Text>
                        <Text style={styles.detailItemSubject}>:</Text>
                        <Text style={styles.detailItemContent}>{this.props.item.jobs.salary_amount ==null? "" : this.props.item.jobs.salary_amount}</Text>
                    </View>
                </TouchableOpacity>
               
                <View style={styles.locationContainer}>
                    <TouchableOpacity onPress={()=>this.changeLike( this.props.item, this.props.index)}>
                        <Image source={require('../../assets/images/icon-like.png')}  style={{ height: 20, width: 20}} />
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Image source={require('../../assets/images/icon-location.png')}  style={{ height: 20, width: 20, marginLeft: 3}} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.deadlineButton}>
                       <Text style={styles.deadlineText}>المشاركة متاحة حتى: {this.props.item.jobs.end_date ==null? "" : this.props.item.jobs.end_date}</Text>
                    </TouchableOpacity>                
                </View>
            </View>
        </View>
      )
    }
}


export default class FavoritJobListScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isWorkdaysModalVisible: false,
            spinner: false,
            favoriteJobs: [],
        }
    }

    componentDidMount(){
        this.setState({spinner: true});
        api.getFavoriteJobs(global.token).then((res)=>{
            console.log('getFavoriteJobs response____', res);  
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
    }

    onGoJobListScreen() {
        this.props.navigation.navigate('Main1');
    }

    toggleWorkdaysModal = () => {
        
        this.setState({ isWorkdaysModalVisible: !this.state.isWorkdaysModalVisible });
    };

    onSelect = (index) => {
        console.log('===>>>>', index);
        global.jobDetailId = this.state.favoriteJobs[index].jobs.id;   
        global.favoriteJobStatus = true;

        this.props.navigation.replace('JobDetail1');
        
    }

    changeLike = (item, index) => {
        console.log("====================index=====================", index)
        this.setState({spinner: true});
        api.favoriteJobToggle(global.token, item.job_id).then((res)=>{
            console.log('favoriteJobToggle response____', res);
            if(res.status == 200){
                this.setState({spinner: false});
                var removeItem = this.state.favoriteJobs.splice(index, 1);
                // this.setState({favoriteJobs: res.data})
                
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

        const deviceWidth = Dimensions.get("window").width;

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
                            data={this.state.favoriteJobs}
                            keyExtractor={item => item.id}
                            renderItem={({item, index, separators}) => <JobListItem item={item} onSelect={this.onSelect} changeLike={this.changeLike} index={index}/>} 
                            extraData={this.state}
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
    contentContainer: {
        flex: 1,
        paddingTop: 0,
        height: Dimensions.get('window').height  *1.7,
        width: Dimensions.get('window').width * 0.85,
        overflow: 'hidden', 
        alignItems: 'center'
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
    layoutDefault: {
        flex: 1
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
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.secondaryBackground,
        width: Dimensions.get('window').width * 0.2,

        borderRadius:5,
        marginTop: 15,
        flex: 4,
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
        // alignItems: 'center'
        justifyContent: 'center',
    },
    deadlineText: {
        color: Colors.primarySpeical,
        fontSize: 10,
        fontFamily: 'TheSans-Plain'
    },


    


  

    
});
