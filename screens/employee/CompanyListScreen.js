    
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
import Modal from "react-native-modal";
import Spinner from 'react-native-loading-spinner-overlay';
import { Container, Header, Title, Content,  Footer, FooterTab,  Body, 
    Left, Right, Icon, Button, } from "native-base";
import api from '../../constants/api';
import Colors from '../../constants/Colors';
import { Labels } from '../../constants/Langs';

const companyData = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        companyName: 'MP Marketing',
        categroy: 'التسويق',
        location: 'الرياض',
       
        openCount: '3 وظائف مفتوحة',
        logoUrl: 'www.thamsdfdsfdsfd',
        isFavorit: true 
    },
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad5ewrer3abb28ba',
        companyName: 'MP Marketing',
        categroy: 'التسويق',
        location: 'الرياض',
       
        openCount: '3 وظائف مفتوحة',
        logoUrl: 'www.thamsdfdsfdsfd',
        isFavorit: true 
    },
];


class CompanyListItem extends React.Component{
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
        return(
            <View style={styles.tableContainer}>
                <TouchableOpacity style={styles.logoPart} onPress={() => this.onSelect(this.props.index)}>
                    <View style= {styles.logoDotContainer}>
                        <View style={styles.logoContainer}>
                            <Image source={{uri: this.props.item.logo}}  style={{ height: 50, width: 50, borderRadius: 25}} />
                        </View>
                    </View>
                    
                    <View style= {styles.ratingContainer}>
                        <Rating
                            readonly
                            startingValue = {this.props.item.marks == null? "" : this.props.item.marks} 
                            fractions={20}
                            ratingCount={5}
                            imageSize={15}
                            ratingColor={Colors.black}
                            onFinishRating={this.ratingCompleted}
                        />
                    </View>
                </TouchableOpacity>

                <View style={styles.detailPart}>
                    <TouchableOpacity style={styles.detailContainer} onPress={() => this.onSelect(this.props.index)}>
                        <View style={styles.detailLine}>
                            <Text style={styles.compnayText}>{this.props.item.name == null? "" : this.props.item.name}</Text>
                    
                        </View>

                        <View style={styles.detailLine}>
                            <Text style={styles.detailItemSubject}>{Labels._company_category}</Text>
                            <Text style={styles.detailItemSubject}>:</Text>
                            <Text style={styles.detailItemContent}>{this.props.item.work_area == null? "" : this.props.item.work_area}</Text>
                        </View>

                        <View style={styles.detailLine}>
                            <Text style={styles.detailItemSubject}>{Labels._company_location}</Text>
                            <Text style={styles.detailItemSubject}>:</Text>
                            <Text style={styles.detailItemContent}>{this.props.item.address == null? "" : this.props.item.address}</Text>
                        </View>                        
                    </TouchableOpacity>
                
                    <View style={styles.locationContainer}>                            
                        
                        {this.props.item.favoriteStatus?
                            <TouchableOpacity onPress={()=>this.changeLike( this.props.item, this.props.index)}>
                                <Image source={require('../../assets/images/icon-like.png')}  style={{ height: 20, width: 20}} />
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={()=>this.changeLike( this.props.item, this.props.index)}>
                                <Image source={require('../../assets/images/icon-unlike.png')}  style={{ height: 20, width: 20}} />
                            </TouchableOpacity>
                        }
                        
                        <TouchableOpacity>
                            <Image source={require('../../assets/images/icon-location.png')}  style={{ height: 20, width: 20, marginLeft: 3}} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.deadlineButton}>
                        <Text style={styles.deadlineText}>{this.props.item.created_at == null? "" : this.props.item.created_at}</Text>
                        </TouchableOpacity>                    
                    </View>
                </View>
            </View>            
        )
    }
}



export default class CompanyListScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            spinner: false,
            corporatesList: [],
            favoriteCorporates: [],
            newCorporatesList: []
        }
    }

    componentDidMount(){
        this.setState({spinner: true}) ;
        api.getCorporatesList(global.token).then((res)=>{
            console.log('getJobList response____');  
            if(res.status == 200){
                
                this.setState({corporatesList: res.data});

                api.getFavoriteCorporates(global.token).then((res)=>{
                    console.log('getFavoriteCorporates response____', res);  
                    if(res.status == 200){

                        this.setState({spinner: false});
                        this.setState({favoriteCorporates: res.data});

                        var newCorporatesList =[];
                        this.state.corporatesList.map((corporatesListData, index)=>{
                            var favoriteStatus = false;

                            res.data.map((favoriteCorporatesData, indexs)=>{
                                if(corporatesListData.id == favoriteCorporatesData.corporate_id){
                                    favoriteStatus = true;
                                    console.log("===================")
                                }
                            })

                            corporatesListData.favoriteStatus = favoriteStatus

                            newCorporatesList[index] = corporatesListData
                        })

                        // console.log("==================this.state.jobList================", newCorporatesList)
                        this.setState({newCorporatesList: newCorporatesList})
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

    toggleWorkdaysModal = () => {
        
        this.setState({ isWorkdaysModalVisible: !this.state.isWorkdaysModalVisible });
    };

    onSelect = (index) => {
        console.log('===>>>>', index);
        global.companyDetailId = this.state.newCorporatesList[index].id;
        global.favoriteCorporateStatus = this.state.newCorporatesList[index].favoriteStatus;
        global.detailLogo = this.state.newCorporatesList[index].logo;
        this.props.navigation.replace('CompanyDetail1');
    }

    sort(sortCategory){
        this.setState({ isWorkdaysModalVisible: !this.state.isWorkdaysModalVisible });

        this.setState({spinner: true});
        api.getCorporatesList_sort(global.token, sortCategory).then((res)=>{
            console.log('getJobList_sort response____', res);  
            if(res.status == 200){
                // this.setState({spinner: false});
                this.setState({corporatesList: res.data});                

                api.getFavoriteCorporates(global.token).then((res)=>{
                    console.log('getFavoriteCorporates response____', res);  
                    if(res.status == 200){

                        this.setState({spinner: false});
                        this.setState({favoriteCorporates: res.data});

                        var newCorporatesList =[];
                        this.state.corporatesList.map((corporatesListData, index)=>{
                            var favoriteStatus = false;

                            res.data.map((favoriteCorporatesData, indexs)=>{
                                if(corporatesListData.id == favoriteCorporatesData.corporate_id){
                                    favoriteStatus = true;
                                    console.log("===================")
                                }
                            })

                            corporatesListData.favoriteStatus = favoriteStatus

                            newCorporatesList[index] = corporatesListData
                        })

                        // console.log("==================this.state.jobList================", newCorporatesList)
                        this.setState({newCorporatesList: newCorporatesList})
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

    changeLike = (item, index) => {
        console.log("====================select likeStatus=====================")
        this.setState({spinner: true});
        api.favoriteCorporateToggle(global.token, item.id).then((res)=>{
            console.log('favoriteJobToggle response____', res);
            if(res.status == 200){
                this.setState({spinner: false});
                this.state.newCorporatesList[index].favoriteStatus = !this.state.newCorporatesList[index].favoriteStatus;
                this.forceUpdate();
                // this.setState({likeStatus: likeStatus});
                
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
                        <Title style={{color: '#FFF'}}>{Labels._sidemenu_companylist}</Title>
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

                        <View style={{marginBottom: 70}}>
                            <FlatList
                                data={this.state.newCorporatesList}                
                                keyExtractor={item => item.id}
                                extraData={this.state}
                                renderItem={({item, index, separators}) => <CompanyListItem item={item} onSelect={this.onSelect} changeLike={this.changeLike} index={index}/>}
                            />   
                        </View>
                        
                        <Modal 
                            isVisible={this.state.isWorkdaysModalVisible}
                            animationInTiming={500}
                            animationOutTiming={500}
                            backdropTransitionInTiming={500}
                            backdropTransitionOutTiming={500}
                            style={{margin: 0}}
                        >

                            <View style={styles.modalContainer} >
                                <TouchableOpacity style={styles.modalDownButton} onPress={()=>this.toggleWorkdaysModal()}>
                                    <Image source={require('../../assets/images/joblist/icon-down.png')} style={{height: 9, width: 16}}/>
                                </TouchableOpacity>
                                <View style= {styles.bottomListButton} >
                                    <Image source={require('../../assets/images/joblist/icon-filter.png')} style={styles.buttonIcon}/>
                                    <Text style= {styles.buttonListText} >
                                        {Labels._bottom_fiter}
                                    </Text>
                                </View>
                                <View style={styles.filterButtonPart}>
                                    <View style={{borderBottomColor: Colors.secondaryText, borderBottomWidth: 1, flex: 1, flexDirection: 'row' }}>
                                        <TouchableOpacity style={{borderRightColor: Colors.secondaryText, borderRightWidth: 1, flex: 1, flexDirection: 'row'}} onPress={()=>this.sort('distance')}>
                                            <View style={{alignItems:'center', justifyContent: 'space-around', flex: 1.5}}>
                                                <Image source={require('../../assets/images/joblist/icon-marker.png')} style={{height: 27, width: 17}}/>
                                            </View>
                                            <View style={{flex: 2.5, alignItems: 'flex-start', paddingTop: 20, paddingBottom: 20}}>
                                                <Text>
                                                    {Labels._sort_by_date_1}
                                                </Text>
                                                <Text>
                                                    {Labels._filter_distance}
                                                </Text>
                                            </View>
                                        </TouchableOpacity>

                                        <TouchableOpacity style={{flex: 1, flexDirection: 'row'}} onPress={()=>this.sort('city')}>
                                            <View style={{alignItems:'center', justifyContent: 'space-around', flex: 1.5}}>
                                                <Image source={require('../../assets/images/joblist/icon-paper.png')} style={{height: 26, width: 18}}/>
                                            </View>
                                            <View style={{flex: 2.5, alignItems: 'flex-start', paddingTop: 20, paddingBottom: 20}}>
                                                <Text>
                                                    {Labels._sort_by_date_1}
                                                </Text>
                                                <Text>
                                                    {Labels._filter_function}
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                
                                    
                                    <TouchableOpacity style={{flex: 1, flexDirection: 'row'}} onPress={()=>this.sort('star_rate')}>
                                        <View style={{alignItems: 'flex-end', justifyContent: 'center', flex: 1, paddingRight: 20}}>
                                            <Image source={require('../../assets/images/joblist/icon-star.png')} style={{height: 27, width: 28}}/>
                                        </View>
                                        <View style={{flex: 1.2, alignItems: 'flex-start', paddingTop: 20, paddingBottom: 20}}>
                                            <Text>
                                                {Labels._sort_by_date_1}
                                            </Text>
                                            <Text>
                                                {Labels._filter_review}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </Modal>
                        
                        <TouchableOpacity style={styles.bottomButtonPart} onPress={()=>this.toggleWorkdaysModal()}>
                            <View style={styles.modalDownButton}>
                                    <Image source={require('../../assets/images/joblist/icon-up.png')} style={{height: 9, width: 16}}/>
                            </View>
                            <View style= {styles.bottomListButton} >
                                <Image source={require('../../assets/images/joblist/icon-filter.png')} style={styles.buttonIcon}/>
                                <Text style= {styles.buttonListText} >
                                    {Labels._bottom_fiter}
                                </Text>
                            </View>
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
    backgroundImage: {
        position: 'absolute',
        marginTop: -50,
      
        width: '100%',
    },
    headerBody: {
        flex: 2,
        alignItems: 'center',
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

    modalContainer: {
        position: 'absolute',
        bottom: 0,
        height: Dimensions.get('window').width * 0.6,
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
        height: Dimensions.get('window').width * 0.6 - 80,
    
        flex: 1,
    },

    tableContainer: {
        width: Dimensions.get('window').width * 0.85, 
        height: Dimensions.get('window').width * 0.35, 
        backgroundColor: Colors.white, 
        marginTop: 10, 
        borderRadius: 10,
        flex: 1,
        flexDirection: 'row',
        
       
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
        marginTop: 18
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
        position: 'absolute',
        bottom: 10
    },
    detailPart: {
        flex: 2,
        
        alignItems: 'flex-start',
    },
    detailContainer:{
        flex: 4,
        width: '100%',
        
        paddingTop:20
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
        color: Colors.primarySpeical
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
        width: '65%', 
        marginLeft: 3, 
        alignItems: 'center'
    },
    deadlineText: {
        color: Colors.primarySpeical,
        fontSize: 12,
        fontFamily: 'TheSans-Plain'
    },
    compnayText: {
        fontSize: 16,
        color: Colors.primarySpeical,
        fontFamily: 'TheSans-Bold',
        fontWeight: '700'
    }

});
