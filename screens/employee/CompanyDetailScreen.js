    
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
  Alert
} from 'react-native';
import { Rating } from 'react-native-ratings';
import Modal from "react-native-modal";
import Dash from 'react-native-dash';
import Spinner from 'react-native-loading-spinner-overlay';
import { Container, Header, Title, Content,  Footer, FooterTab,  Body, 
    Left, Right, Icon, Button, } from "native-base";
import Toast from 'react-native-simple-toast';

import api from '../../constants/api';
import {jobReviewsData} from '../../constants/Constants';
import Colors from '../../constants/Colors';
import { Labels } from '../../constants/Langs';



export default class CompanyDetailScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            spinner: false,
            loading: false,
            companyDetailData: '',
            detailLogo:global.detailLogo,
            likeStatus: global.favoriteCorporateStatus,
            companyReviewValue: 0,
            companyReviewComment: "",
            isReviewModalVisible: false,
            sendMessageModal: false,
            message: ''

        }
    }

    componentDidMount(){
        console.log("==============didmonunt of companyDetailScreen==============")
        this.setState({spinner: true});
        api.getCorporatesDetail(global.token, global.companyDetailId).then((res)=>{
            console.log('jobDetailData response____');
            if(res.status == 200){
                this.setState({spinner: false});
                this.setState({companyDetailData: res.data});

                // console.log("====companyDetailData===", this.state.companyDetailData);           
                this.setState({loading: true});
                
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

    toggleModal = () => {        
        this.setState({ isReviewModalVisible: true});
    };

    ratingCompleted=(rating)=>{
         console.log("Rating is: " + rating);
         this.setState({companyReviewValue: rating});  
    }

    saveCompanyReviews(){
        this.setState({ isReviewModalVisible: false});
        if(this.state.companyReviewComment != ""){

            this.setState({spinner: true});
            
            jobReviewsData.receiver_id = this.state.companyDetailData.user.id;
            jobReviewsData.marks = this.state.companyReviewValue;
            jobReviewsData.comment = this.state.companyReviewComment;
            
            jobReviewsData.token = global.token;
            api.jobReviews(jobReviewsData).then((res)=>{
                console.log('jobReviews response____', res);  
                if(res.status == 200){
                    this.setState({spinner: false});               
                    
                    
                }else{
                    Alert.alert(
                        'Error!',
                        res.errors,
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
            Toast.show("Pleae fill the comment");
        }
    }

    goToMap(){
        console.log("==========goToMap============");
        global.selectLongitude = this.state.companyDetailData.user.longitude;
        global.selectLatitude = this.state.companyDetailData.user.latitude;

        console.log("======global.selectLongitude======", global.selectLongitude,    "=========global.selectLatitude========", global.selectLatitude)
        this.props.navigation.replace('MapLocation1');
    }

    changeLike(likeStatus){

        this.setState({spinner: true});
        api.favoriteCorporateToggle(global.token, global.companyDetailId).then((res)=>{
            console.log('favoriteJobToggle response____', res);
            if(res.status == 200){
                this.setState({spinner: false});

                this.setState({likeStatus: likeStatus});
                
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

    sendMessageModal(){
        this.setState({sendMessageModal: true});
    }

    sendMessage=()=>{
        console.log("-----------------------", global.token, "---------", global.companyDetailId,)
        this.setState({sendMessageModal: false});

        if(this.state.message){
            this.setState({spinner: true});               

            api.sendMessages(global.token, global.companyDetailId, this.state.message).then((res)=>{
                console.log('sendMessage response____', res);  
                if(res.status == 200){
                    this.setState({spinner: false});               
                    Toast.show(Labels.sendMessageSuccessTxt);
                    
                }else{
                    Alert.alert(
                        'Error!',
                        res.errors,
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
                        <Title style={{color: '#FFF'}}>{Labels._compnay_detail_page_title}</Title>
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
                        
                        {/* -----------------------left Review Modal--------------- */}
                        <Modal 
                                isVisible={this.state.isReviewModalVisible}
                                animationInTiming={500}
                                animationOutTiming={500}
                                backdropTransitionInTiming={500}
                                backdropTransitionOutTiming={500}
                                style={{margin: 0}}
                            >
                            <View style={{width: '100%', alignItems: 'center'}}>
                                <View style={{width: Dimensions.get('window').width * 0.85 , height: 300, backgroundColor: 'white', alignItems: 'center', borderRadius: 10}}>
                                    <View style= {styles.logoDotContainer}>
                                        <View style={styles.logoContainer}>
                                            <Image source={{uri: this.state.detailLogo}}  style={{ height: 70, width: 70, borderRadius: 35}} />
                                        </View>
                                    </View>
                                    <View style={{ marginTop: 10}}>
                                        <Rating
                                                startingValue = {this.state.companyReviewValue}
                                                fractions={20}
                                                ratingCount={5}
                                                imageSize={20}
                                                ratingColor={Colors.primaryBackground}
                                                onFinishRating={this.ratingCompleted}
                                            />
                                    </View>
                                    
                                    <TextInput style={{marginTop: 15,  height: 120, width: '80%', borderColor: Colors.thirdBackground, borderWidth: 1, borderRadius: 20, textAlign: 'right', textAlignVertical: 'top', padding: 10} } blurOnSubmit={true} multiline={true} numberOfLines={10} value={this.state.companyReviewComment} onChangeText={text => this.setState({companyReviewComment: text})} />
                                    
                                    <TouchableOpacity style={{width: 70, height: 70, backgroundColor: Colors.primarySpeical, borderRadius: 35, bottom: -35, position: 'absolute', alignItems: 'center', justifyContent: 'center'}} onPress={()=>this.saveCompanyReviews()}>
                                        <Image source={require('../../assets/images/maps/icon-go.png')} style={{height: 30}}/>
                                    </TouchableOpacity>

                                </View>
                            </View>
                        </Modal>

                        {/* -------------------Send Message Modal-------------- */}

                        <Modal 
                                isVisible={this.state.sendMessageModal}
                                animationInTiming={500}
                                animationOutTiming={500}
                                backdropTransitionInTiming={500}
                                backdropTransitionOutTiming={500}
                                style={{margin: 0}}
                            >
                            <View style={{width: '100%', alignItems: 'center'}}>
                                <View style={{width: Dimensions.get('window').width * 0.85 , height: 300, backgroundColor: 'white', alignItems: 'center', borderRadius: 10}}>
                                    <View style= {styles.logoDotContainer}>
                                        <View style={styles.logoContainer}>
                                            <Image source={{uri: this.state.detailLogo}}  style={{ height: 70, width: 70, borderRadius: 35}} />
                                        </View>
                                    </View>
                                    
                                    <TextInput style={styles.modalTxtinput } blurOnSubmit={true} multiline={true} numberOfLines={10} value={this.state.message} onChangeText={text => this.setState({message: text})} />
                                    
                                    <TouchableOpacity style={{width: 70, height: 70, backgroundColor: Colors.primarySpeical, borderRadius: 35, bottom: -35, position: 'absolute', alignItems: 'center', justifyContent: 'center'}} onPress={()=>this.sendMessage()}>
                                        <Image source={require('../../assets/images/maps/icon-go.png')} style={{height: 30}}/>
                                    </TouchableOpacity>

                                </View>
                            </View>
                        </Modal>

                        {this.state.loading? 
                            <ScrollView  contentContainerStyle={styles.contentContainer}>
                                <View style={styles.cartContainer}>
                                    <TouchableOpacity style={styles.logoPart}>
                                        <View style= {styles.logoDotContainer}>
                                            <View style={styles.logoContainer}>
                                                <Image source={{uri: this.state.detailLogo }}  style={{ height: 70, width: 70, borderRadius: 35}} />
                                            </View>
                                        </View>
                                
                                        <View style= {styles.ratingContainer}>
                                            <Rating
                                                readonly
                                                startingValue = {this.state.companyDetailData.user.marks == null? "" : this.state.companyDetailData.user.marks} 
                                                fractions={20}
                                                ratingCount={5}
                                                imageSize={15}
                                                ratingColor={Colors.black}
                                                onFinishRating={this.ratingCompleted}
                                            />
                                        </View>
                                    </TouchableOpacity>

                                    <View style={styles.detailPart}>
                                        <TouchableOpacity style={styles.detailContainer}>
                                            <View style={styles.detailLine}>
                                                <Text style={styles.compnayText}>{this.state.companyDetailData.user.name == null? "" : this.state.companyDetailData.user.name}</Text>
                                            </View>
                                            <View style={styles.detailLine}>
                                                <Text style={styles.detailItemSubject}>{Labels._company_category}</Text>
                                                <Text style={styles.detailItemSubject}>:</Text>
                                                <Text style={styles.detailItemContent}>{this.state.companyDetailData.user.work_area == null? "" : this.state.companyDetailData.user.work_area}</Text>
                                            </View>
                                            <View style={styles.detailLine}>
                                                <Text style={styles.detailItemSubject}>{Labels._company_location}</Text>
                                                <Text style={styles.detailItemSubject}>:</Text>
                                                <Text style={styles.detailItemContent}>{this.state.companyDetailData.user.address == null? "" : this.state.companyDetailData.user.address}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    
                                        <View style={styles.locationContainer}>
                                            {this.state.likeStatus?
                                                <TouchableOpacity onPress={()=>this.changeLike(false)}>
                                                    <Image source={require('../../assets/images/icon-like.png')}  style={{ height: 20, width: 20}} />
                                                </TouchableOpacity>
                                            :
                                                <TouchableOpacity onPress={()=>this.changeLike(true)}> 
                                                    <Image source={require('../../assets/images/icon-unlike.png')}  style={{ height: 20, width: 20}} />
                                                </TouchableOpacity>                                    
                                            } 

                                            <TouchableOpacity onPress={()=>this.goToMap()}>
                                                <Image source={require('../../assets/images/icon-location.png')}  style={{ height: 20, width: 20, marginLeft: 3}} />
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.deadlineButton}>
                                                <Text style={styles.deadlineText}>{this.state.companyDetailData.user.created_at == null? "" : this.state.companyDetailData.user.created_at}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>

                                <View style={styles.profileContainer}>

                                    <View style={styles.categoryPart}>
                                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', borderRightColor: Colors.thirdBackground, borderRightWidth: 1}}>
                                            <Text style={{fontFamily: 'TheSans-Bold'}}>{Labels._company_profile_employment}</Text>
                                            <Text style={{fontFamily: 'TheSans-Plain'}}>{this.state.companyDetailData.user.work_area == null? "": this.state.companyDetailData.user.work_area}</Text>
                                        </View>
                                        <View style={{flex: 1, alignItems: 'center', justifyContent:'center'}}>
                                            <Text style={{fontFamily: 'TheSans-Bold'}}>{Labels._company_profile_location}</Text>
                                            <Text style={{fontFamily: 'TheSans-Plain'}}>{this.state.companyDetailData.user.city == null? "": this.state.companyDetailData.user.city}</Text>
                                        </View>
                                    </View>

                                    <Dash style={{width: '90%', height: 1, marginTop: 15,}} dashColor={Colors.thirdBackground}></Dash>

                                    <Text style={{marginTop: 15, fontFamily: 'TheSans-Bold'}}> {Labels._company_profile_inform}</Text>

                                    <Dash style={{width: '90%', height: 1, marginTop: 15,}} dashColor={Colors.thirdBackground}></Dash>

                                    <Text style={{padding: 20, textAlign: 'center', lineHeight: 16, fontFamily: 'TheSans-Plain'}}>{this.state.companyDetailData.user.about_me == null? "": this.state.companyDetailData.user.about_me}</Text>

                                    <TouchableOpacity onPress={()=>this.sendMessageModal()} style={{height: 40, width: '55%', backgroundColor: Colors.primarySpeical, borderRadius: 20, alignItems: 'center', justifyContent:'center'}}>
                                        <Text style={{color: 'white'}}>{Labels._company_profile_sending}</Text>
                                    </TouchableOpacity>

                                    <Dash style={{width: '90%', height: 1, marginTop: 20,}} dashColor={Colors.thirdBackground}></Dash>
                                    <Text style={{marginTop: 15,fontFamily: 'TheSans-Bold'}}> {Labels._copmpany_profile_open}</Text>
                                    <Dash style={{width: '90%', height: 1, marginTop: 20,}} dashColor={Colors.thirdBackground}></Dash>

                                    {this.state.companyDetailData.user.jobs.map((data, index)=>(
                                        <TouchableOpacity key={index} style={{ width: '90%', height: 50, backgroundColor: Colors.thirdBackground, borderRadius: 5, marginTop: 10, flexDirection: 'row'}}>
                                            <View style={{marginTop: 4, marginLeft: 4, width: 42, height: 42, alignItems: 'center', justifyContent: "center", backgroundColor: Colors.secondaryBackground, borderRadius: 5}}>
                                                <Image source={{uri: this.state.companyDetailData.user.logo}}  style={{ height: 30, width: 30, borderRadius: 15}} />
                                            </View>
                                            <View style={{justifyContent: 'center', marginLeft: 5}}>
                                                <Text>{data.job_name}</Text>
                                                <Text style={{color: Colors.primarySpeical}}>{data.salary_amount}</Text>
                                            </View>
                                            <View style={{right: 5,  position: 'absolute', justifyContent: 'center', marginTop: 6}}>
                                                <Text>{data.location}</Text>
                                                <Text>{data.salary_type}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    ))}

                                    <Dash style={{width: '90%', height: 1, marginTop: 20,}} dashColor={Colors.thirdBackground}></Dash>
                                    <Text style={{marginTop: 15,fontFamily: 'TheSans-Bold'}}> {Labels._company_profile_evaluation} </Text>
                                    <Dash style={{width: '90%', height: 1, marginTop: 20,}} dashColor={Colors.thirdBackground}></Dash>


                                    <View style={{width: '60%', flexDirection: 'row', marginBottom: 20}}>
                                        <View style= {styles.logoDotContainer}>
                                            <View style={styles.logoContainer}>
                                                <Image source={{uri: this.state.companyDetailData.user.logo}}  style={{ height: 70, width: 70, borderRadius: 35}} />
                                            </View>
                                        </View>

                                        <View style={{marginTop: 20, alignItems: 'center', marginLeft: 10}}>
                                            <Rating
                                                readonly
                                                startingValue = {this.state.companyReviewValue}
                                                fractions={20}
                                                ratingCount={5}
                                                imageSize={15}
                                                ratingColor={Colors.black}
                                                onFinishRating={this.ratingCompleted}
                                            />

                                            <Text style={{marginTop: 5,fontFamily: 'TheSans-Plain'}}>{this.state.companyReviewValue}/5</Text>
                                            <TouchableOpacity style={{height:30, width: 100, backgroundColor: Colors.primarySpeical, borderRadius:20, alignItems: 'center', justifyContent:'center', marginTop:5}} onPress={()=>this.toggleModal()}>
                                                <Text style={{ color: 'white'}}>{Labels._company_profile_evaluation}</Text>

                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                    {this.state.companyDetailData.reviews.map((data, index)=>(
                                        <View style={{width: '90%'}} key={index}>
                                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                                <Text style={{fontFamily: 'TheSans-Bold'}}> {Labels._company_profile_evaluation}</Text>
                                                <Rating
                                                    readonly
                                                    startingValue = {data.marks}
                                                    fractions={20}
                                                    ratingCount={5}
                                                    imageSize={15}
                                                    ratingColor={Colors.black}
                                                    onFinishRating={this.ratingCompleted}
                                                />
                                            </View>

                                            <Dash style={{width: '100%', height: 1, marginTop: 5,}} dashColor={Colors.thirdBackground}></Dash>
                                            <Text style={{textAlign: 'left', padding: 15, lineHeight: 16, fontFamily: 'TheSans-Plain'}}>{data.comment}</Text>
                                        </View>
                                    ))}

                                    <TouchableOpacity style={{width: '100%', height: 30, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', backgroundColor: Colors.black}}>
                                        <Image source={require('../../assets/images/joblist/icon-down.png')} style={{height: 9, width: 16}}/>
                                        <Text style={{marginLeft: 5, color: Colors.white, fontFamily: 'TheSans-Plain'}}>{Labels._job_detail_more}</Text>
                                    </TouchableOpacity>
                                </View>
                            </ScrollView>
                        :
                            null
                        }
                        
                        
                        
                    
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
    modalTxtinput: {
        marginTop: 15,  
        height: 120, 
        width: '80%', 
        borderColor: Colors.thirdBackground, borderWidth: 1,
        borderRadius: 20, 
        textAlign: 'right', 
        textAlignVertical: 'top', 
        padding: 10
    },
    contentContainer: {
  
        paddingTop: 0,
     
        width: Dimensions.get('window').width * 0.85,
        overflow: 'hidden'
    },
    backgroundImage: {
        position: 'absolute',
        marginTop: -50,
      
        width: '100%',
    },

    cartContainer: {
        width: Dimensions.get('window').width * 0.85, 
        height: Dimensions.get('window').width * 0.35, 
        backgroundColor: Colors.white, 
        marginTop: 10, 
        borderRadius: 10,
  
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
        borderColor: Colors.thirdBackground, 
        borderWidth: 1, 
        borderStyle: 'dotted', 
        padding: 4, 
        marginTop: 25
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
    }, 
    profileContainer: {
        width: Dimensions.get('window').width * 0.85, 
        backgroundColor: Colors.white, 
        marginTop: 10, 
        borderRadius: 10,
        backgroundColor: 'white',
        alignItems: 'center',
        marginBottom: 5

  
    },

    categoryPart: {
        flexDirection: 'row',
        width: '100%',
        height: 70,
        marginTop: 20,
    },
    logoDotContainer: {
        width: 80, 
        height: 80, 
        borderRadius: 40, 
        borderColor: Colors.thirdBackground, 
        borderWidth: 1, 
        borderStyle: 'dotted', 
        padding: 4, 
        marginTop: 7
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

});
