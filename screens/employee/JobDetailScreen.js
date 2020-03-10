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
import { Container, Header, Title, Content,  Footer, FooterTab,  Body, 
    Left, Right, Icon, Button, } from "native-base";
import { Rating } from 'react-native-ratings';

import MapView from 'react-native-maps';
import Modal from "react-native-modal";
import Dash from 'react-native-dash';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-simple-toast';

import {jobReviewsData} from '../../constants/Constants';
import api from '../../constants/api';
import Colors from '../../constants/Colors';
import { Labels } from '../../constants/Langs';
import firebaseSvc from '../../FirebaseSvc';

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
];

function Item({ item}) {
    return (
        <View style={styles.tableContainer}>
            <TouchableOpacity style={styles.logoPart}>
                <View style={styles.logoContainer}>
                    <Image source={{uri: item.users.logo}}  style={{ height: 50, width: 50, borderRadius: 25}} />
                </View>
                <View style= {styles.ratingContainer}>
                    <Rating
                        readonly
                        startingValue = {item.users.marks == null? "0" : item.users.marks}
                        fractions={20}
                        ratingCount={5}
                        imageSize={15}
                        ratingColor={Colors.primaryBackground}                  
                    />
                </View>
               
                
            </TouchableOpacity>
            <View style={styles.detailPart}>
                <TouchableOpacity style={styles.detailContainer}>
                    <View style={styles.detailLine}>
                        <Text style={styles.detailItemSubject}>{Labels._comany_name}</Text>
                        <Text style={styles.detailItemSubject}>:</Text>
                        <Text style={styles.detailItemContent}>{item.users.name == null? "" : item.users.name}</Text>
                    </View>
                    <View style={styles.detailLine}>
                        <Text style={styles.detailItemSubject}>{Labels._job_title}</Text>
                        <Text style={styles.detailItemSubject}>:</Text>
                        <Text style={styles.detailItemContent}>{item.job_name == null? "" : item.job_name}</Text>
                    </View>
                    <View style={styles.detailLine}>
                        <Text style={styles.detailItemSubject}>{Labels._period}</Text>
                        <Text style={styles.detailItemSubject}>:</Text>
                        <Text style={styles.detailItemContent}>{item.salary_type == null? "" : item.salary_type}</Text>
                    </View>
                    <View style={styles.detailLine}>
                        <Text style={styles.detailItemSubject}>{Labels._fees}</Text>
                        <Text style={styles.detailItemSubject}>:</Text>
                        <Text style={styles.detailItemContent}>{item.salary_amount == null? "" : item.salary_amount}</Text>
                    </View>
                </TouchableOpacity>
               
                <View style={styles.locationContainer}>
                    <TouchableOpacity>
                        <Image source={require('../../assets/images/icon-unlike.png')}  style={{ height: 20, width: 20}} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={require('../../assets/images/icon-location.png')}  style={{ height: 20, width: 20, marginLeft: 3}} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.deadlineButton}>
                       <Text style={styles.deadlineText}>المشاركة متاحة حتى: {item.end_date == null? "" : item.end_date}</Text>
                    </TouchableOpacity>
                
                </View>
              
               

            </View>
        </View>
    );
}


export default class JobDetailScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isReviewModalVisible: false,
            spinner: false,
            loading: false,
            jobDetailData: [],
            detailLogo:global.detailLogo,
            likeStatus: global.favoriteJobStatus,
            spinner: false,
            jobReviewValue: 0,
            jobReviewComment: "",     
            sendMessageModal: false,
            sendApplyJobModal: false,
            message: '',
            applyJobMessage: ''

        }
    }

    componentDidMount(){
        console.log("==============didmonunt of jobDetailScreen==============")
        this.setState({spinner: true});
        api.getJobDetail(global.token, global.jobDetailId).then((res)=>{
            console.log('jobDetailData response____');
            if(res.status == 200){
                this.setState({spinner: false});
                this.setState({jobDetailData: res.data});

                console.log("=========jobDetailData========", this.state.jobDetailData.job.users.logo);           
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
        
        this.setState({ isReviewModalVisible: !this.state.isReviewModalVisible });
    }

    ratingCompleted=(rating)=>{
         console.log("Rating is: " + rating);
         this.setState({jobReviewValue: rating});  
    }

    saveJobReviews(){
        this.setState({ isReviewModalVisible: !this.state.isReviewModalVisible });
        if(this.state.jobReviewComment != ""){
            
            this.setState({spinner: true});

            // jobReviewsData.job_id = this.state.jobDetailData.id;
            // jobReviewsData.corporate_id = this.state.jobDetailData.users.id;
            jobReviewsData.receiver_id = this.state.jobDetailData.job.users.id;
            jobReviewsData.marks = this.state.jobReviewValue;
            jobReviewsData.comment = this.state.jobReviewComment;
            
            jobReviewsData.token = global.token;
            api.jobReviews(jobReviewsData).then((res)=>{
                console.log('getJobList response____', res);  
                if(res.status == 200){
                    this.setState({spinner: false});               
                    
                    
                }else{
                    Alert.alert(
                        '',
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
        global.selectLongitude = this.state.jobDetailData.job.users.longitude;
        global.selectLatitude = this.state.jobDetailData.job.users.latitude;

        console.log("======global.selectLongitude======", global.selectLongitude,    "=========global.selectLatitude========", global.selectLatitude)
        this.props.navigation.replace('MapLocation1');
    }

    changeLike(likeStatus){
        this.setState({spinner: true});
        api.favoriteJobToggle(global.token, global.jobDetailId).then((res)=>{
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
        
        this.setState({sendMessageModal: false});

        if(this.state.message){
            this.setState({spinner: true});               
            const sender = {
                api_token: global.token,
                name: global.loginInfo.name,
                logo: global.loginInfo.logo,
            };
            const message = [{
                sender_id: global.token,
                receiver_id: global.userDetailApiToken,
                text: this.state.message,
                message: this.state.message,
                subject: 'Common Message',
                sender: sender,
                type: 'common'
            }];

            firebaseSvc.send(message);
            // this.setState({spinner: false});
            // Toast.show("تم إرسال الرسالة بنجاح");

            api.sendMessages(global.token, this.state.jobDetailData.job.users.id,  this.state.message, "Common Message", "common").then((res)=>{
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
        }else{
            Toast.show("Pleae fill the message text");
        }

    }

    sendApplyJobModal(){
        this.setState({sendApplyJobModal: true});
    }

    sendApplyJob=()=>{
        
        this.setState({sendApplyJobModal: false});

        if(this.state.applyJobMessage){
            this.setState({spinner: true});               
            const sender = {
                name : global.loginInfo.name, 
                api_token : global.token,
                logo : global.loginInfo.logo
            };
            const message = [{
                sender_id: sender.api_token,// freelancer id
                receiver_id: global.userDetailApiToken,//client id
                text: this.state.applyJobMessage,
                message: this.state.applyJobMessage,
                subject: 'Apply Job Message',
                sender: sender,
                id: this.state.jobDetailData.job.id,
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
            // this.setState({spinner: false});
            // Toast.show("تم إرسال الرسالة بنجاح");
            api.sendMessages(global.token, this.state.jobDetailData.job.users.id, this.state.jobDetailData.job.id, this.state.applyJobMessage, "Apply Job Message", "apply_job").then((res)=>{
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
        }else{
            Toast.show("Pleae fill the message text");
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
                        <Title style={{color: '#FFF'}}>{Labels._job_detail}</Title>
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
                            style={{margin: 0}}>

                            <View style={{width: '100%', alignItems: 'center'}}>
                                <View style={{width: Dimensions.get('window').width * 0.85 , height: 300, backgroundColor: 'white', alignItems: 'center', borderRadius: 10}}>
                                    <View style= {styles.logoDotContainer}>
                                        <View style={styles.logoModalContainer}>
                                            <Image source={{uri: this.state.detailLogo}}  style={{ height: 70, width: 70, borderRadius: 35}} />
                                        </View>
                                    </View>
                                    <View style={{ marginTop: 10}}>
                                        <Rating
                                            startingValue = {this.state.jobReviewValue}                               
                                            fractions={20}
                                            ratingCount={5}
                                            imageSize={20}
                                            ratingColor={Colors.primaryBackground}
                                            onFinishRating={this.ratingCompleted}
                                        />
                                    </View>
                                    
                                    <TextInput style={styles.jobReviewComment} blurOnSubmit={true} multiline={true} numberOfLines={10}  value={this.state.jobReviewComment} onChangeText={text => this.setState({jobReviewComment: text})}/>
                                    
                                    <TouchableOpacity style={{width: 70, height: 70, backgroundColor: Colors.primarySpeical, borderRadius: 35, bottom: -35, position: 'absolute', alignItems: 'center', justifyContent: 'center'}} onPress={()=>this.saveJobReviews()}>
                                        <Image source={require('../../assets/images/maps/icon-go.png')} style={{height: 30}}/>
                                    </TouchableOpacity>

                                </View>
                            </View>
                        </Modal>    

                        {/* --------------------------send Message Modal----------------- */}

                        <Modal 
                            isVisible={this.state.sendMessageModal}
                            animationInTiming={500}
                            animationOutTiming={500}
                            backdropTransitionInTiming={500}
                            backdropTransitionOutTiming={500}
                            style={{margin: 0}}>

                            <View style={{width: '100%', alignItems: 'center'}}>
                                <View style={{width: Dimensions.get('window').width * 0.85 , height: 300, backgroundColor: 'white', alignItems: 'center', borderRadius: 10}}>
                                    <View style= {styles.logoDotContainer}>
                                        <View style={styles.logoModalContainer}>
                                            <Image source={{uri: this.state.detailLogo}}  style={{ height: 70, width: 70, borderRadius: 35}} />
                                        </View>
                                    </View>
                                    
                                    <TextInput style={styles.jobReviewComment} blurOnSubmit={true} multiline={true} numberOfLines={10}  value={this.state.message} onChangeText={text => this.setState({message: text})}/>
                                    
                                    <TouchableOpacity style={{width: 70, height: 70, backgroundColor: Colors.primarySpeical, borderRadius: 35, bottom: -35, position: 'absolute', alignItems: 'center', justifyContent: 'center'}} onPress={()=>this.sendMessage()}>
                                        <Image source={require('../../assets/images/maps/icon-go.png')} style={{height: 30}}/>
                                    </TouchableOpacity>

                                </View>
                            </View>
                        </Modal> 

                        {/* --------------------------send Apply Job Modal----------------- */}

                        <Modal 
                            isVisible={this.state.sendApplyJobModal}
                            animationInTiming={500}
                            animationOutTiming={500}
                            backdropTransitionInTiming={500}
                            backdropTransitionOutTiming={500}
                            style={{margin: 0}}>

                            <View style={{width: '100%', alignItems: 'center'}}>
                                <View style={{width: Dimensions.get('window').width * 0.85 , height: 300, backgroundColor: 'white', alignItems: 'center', borderRadius: 10}}>
                                    <View style= {styles.logoDotContainer}>
                                        <View style={styles.logoModalContainer}>
                                            <Image source={{uri: this.state.detailLogo}}  style={{ height: 70, width: 70, borderRadius: 35}} />
                                        </View>
                                    </View>
                                    
                                    <TextInput style={styles.jobReviewComment} blurOnSubmit={true} multiline={true} numberOfLines={10}  value={this.state.applyJobMessage} onChangeText={text => this.setState({applyJobMessage: text})}/>
                                    
                                    <TouchableOpacity style={{width: 70, height: 70, backgroundColor: Colors.primarySpeical, borderRadius: 35, bottom: -35, position: 'absolute', alignItems: 'center', justifyContent: 'center'}} onPress={()=>this.sendApplyJob()}>
                                        <Image source={require('../../assets/images/maps/icon-go.png')} style={{height: 30}}/>
                                    </TouchableOpacity>

                                </View>
                            </View>
                        </Modal> 

                        {/* -------------------------------------------------------------------- */}
                        
                        {this.state.loading? 
                            <ScrollView  contentContainerStyle={styles.contentContainer}>

                                <View style={styles.cartContainer}>
                                    <TouchableOpacity style={styles.logoPart}>
                                        <View style={styles.logoContainer}>
                                            <Image source={{uri: this.state.jobDetailData.job.users.logo}}  style={{ height: 50, width: 50, borderRadius: 25}} />
                                        </View>
                                        <View style= {styles.ratingContainer}>
                                            <Rating
                                                readonly
                                                fractions={20}
                                                ratingCount={5}
                                                imageSize={15}
                                                ratingColor={Colors.primaryBackground}
                                                onFinishRating={this.ratingCompleted}
                                            />
                                        </View>
                                    </TouchableOpacity>

                                    <View style={styles.detailPart}>
                                        <TouchableOpacity style={styles.detailContainer}>
                                            <View style={styles.detailLine}>
                                                <Text style={styles.detailItemSubject}>{Labels._comany_name}</Text>
                                                <Text style={styles.detailItemSubject}>:</Text>
                                                <Text style={styles.detailItemContent}>{this.state.jobDetailData.job.users.name == null ? "" : this.state.jobDetailData.job.users.name}</Text>
                                            </View>

                                            <View style={styles.detailLine}>
                                                <Text style={styles.detailItemSubject}>{Labels._job_title}</Text>
                                                <Text style={styles.detailItemSubject}>:</Text>
                                                <Text style={styles.detailItemContent}>{this.state.jobDetailData.job.job_name == null? "" : this.state.jobDetailData.job.job_name}</Text>
                                            </View>

                                            <View style={styles.detailLine}>
                                                <Text style={styles.detailItemSubject}>{Labels._period}</Text>
                                                <Text style={styles.detailItemSubject}>:</Text>
                                                <Text style={styles.detailItemContent}>{this.state.jobDetailData.job.salary_type == null? "" : this.state.jobDetailData.job.salary_type}</Text>
                                            </View>

                                            <View style={styles.detailLine}>
                                                <Text style={styles.detailItemSubject}>{Labels._fees}</Text>
                                                <Text style={styles.detailItemSubject}>:</Text>
                                                <Text style={styles.detailItemContent}>{this.state.jobDetailData.job.salary_amount == null? "" : this.state.jobDetailData.job.salary_amount}</Text>
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
                                                <Text style={styles.deadlineText}>المشاركة متاحة حتى: {this.state.jobDetailData.job.end_date}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>


                                <View style={styles.profileContainer}>
                                    <View style={{borderBottomWidth: 1, borderBottomColor: Colors.thirdBackground, width: '90%',marginTop: 20,}}>
                                        <View style={styles.categoryPart}>
                                            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', borderRightColor: Colors.thirdBackground, borderRightWidth: 1}}>
                                                <Text style={{fontFamily: 'TheSans-Bold'}}>{Labels._job_detail_rectangle_1}</Text>
                                                <Text style={{fontFamily: 'TheSans-Plain'}}>{this.state.jobDetailData.job.experience == null? "" : this.state.jobDetailData.job.experience}</Text>
                                            </View>
                                            <View style={{flex: 1, alignItems: 'center', justifyContent:'center'}}>
                                                <Text style={{fontFamily: 'TheSans-Bold'}}>{Labels._job_detail_rectangle_2}</Text>
                                                <Text style={{fontFamily: 'TheSans-Plain'}}>{this.state.jobDetailData.job.category_id ==null? "": this.state.jobDetailData.job.category_id}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{}}>
                                        <View style={styles.categoryPart}>
                                            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', borderRightColor: Colors.thirdBackground, borderRightWidth: 1}}>
                                                <Text style={{fontFamily: 'TheSans-Bold'}}>{Labels._job_detail_rectangle_3}</Text>
                                                <Text style={{fontFamily: 'TheSans-Plain'}}>{this.state.jobDetailData.job.languages == null? "" : this.state.jobDetailData.job.languages}</Text>
                                            </View>
                                            <View style={{flex: 1, alignItems: 'center', justifyContent:'center'}}>
                                                <Text style={{fontFamily: 'TheSans-Bold'}}>{Labels._job_detail_rectangle_4}</Text>
                                                <Text style={{fontFamily: 'TheSans-Plain'}}>{this.state.jobDetailData.job.location == null? "" : this.state.jobDetailData.job.location}</Text>
                                            </View>
                                        </View>
                                    </View>
                                        

                                    <Dash style={{width: '90%', height: 1, marginTop: 15,}} dashColor={Colors.thirdBackground}></Dash>

                                    <Text style={{marginTop: 15, fontFamily: 'TheSans-Bold'}}> {Labels._job_detail}</Text>

                                    <Dash style={{width: '90%', height: 1, marginTop: 15,}} dashColor={Colors.thirdBackground}></Dash>

                                    <Text style={{padding: 20, textAlign: 'center', lineHeight: 16, fontFamily: 'TheSans-Plain'}}>{this.state.jobDetailData.job.job_details}</Text>

                                    <View style={{flexDirection: 'row', justifyContent: 'space-around', width: '100%'}}>
                                        {/* <TouchableOpacity onPress={()=>this.sendMessageModal()} style={{height: 40, width: '35%', backgroundColor: Colors.primarySpeical, borderRadius: 20, alignItems: 'center', justifyContent:'center'}}>
                                            <Text style={{color: 'white'}}>{Labels._company_profile_sending}</Text>
                                        </TouchableOpacity> */}
                                        <TouchableOpacity onPress={()=>this.sendApplyJobModal()} style={{height: 40, width: '35%', backgroundColor: Colors.primarySpeical, borderRadius: 20, alignItems: 'center', justifyContent:'center'}}>
                                            <Text style={{color: 'white'}}>{Labels._job_detail_advance_button}</Text>
                                        </TouchableOpacity>
                                    </View>
                            

                                    <Dash style={{width: '90%', height: 1, marginTop: 20,}} dashColor={Colors.thirdBackground}></Dash>
                                    <Text style={{marginTop: 15,fontFamily: 'TheSans-Bold'}}> {Labels._job_detail_about_company}</Text>
                                    <Dash style={{width: '90%', height: 1, marginTop: 20,}} dashColor={Colors.thirdBackground}></Dash>


                                    <Text style={{padding: 20, textAlign: 'center', lineHeight: 16, fontFamily: 'TheSans-Plain'}}>شركة MP Marketing  هي شركة مساهمة سعودية ذات خبرةبيرة في مجال التسويق. أنشئت عام 1992 ميلادي. وتعمل فيمجالات عديدة من ظمنها التسويقء الدعاية والإعلان, التسويقالإلكتروني والمبيعات</Text>

                                    <Dash style={{width: '90%', height: 1, marginTop: 20,}} dashColor={Colors.thirdBackground}></Dash>
                                    <Text style={{marginTop: 15,fontFamily: 'TheSans-Bold'}}> {Labels._job_detail_ratingpart_title} </Text>
                                    <Dash style={{width: '90%', height: 1, marginTop: 20,}} dashColor={Colors.thirdBackground}></Dash>


                                    <View style={{width: '60%', flexDirection: 'row', marginBottom: 20}}>
                                    
                                        <View style={styles.logoContainer}>
                                            <Image source={{uri: this.state.jobDetailData.job.users.logo}}  style={{ height: 50, width: 50, borderRadius: 25}} />
                                        </View>
                

                                        <View style={{marginTop: 20, alignItems: 'center', marginLeft: 10}}>
                                            <Rating
                                                readonly
                                                startingValue = {this.state.jobReviewValue}   
                                                fractions={20}
                                                ratingCount={5}
                                                imageSize={15}
                                                ratingColor={Colors.black}
                                                onFinishRating={this.ratingCompleted}
                                            />

                                            <Text style={{marginTop: 5,fontFamily: 'TheSans-Plain'}}>{this.state.jobReviewValue}/5</Text>
                                            <TouchableOpacity style={{height:30, width: 100, backgroundColor: Colors.primarySpeical, borderRadius:20, alignItems: 'center', justifyContent:'center', marginTop:5}} onPress={()=>this.toggleModal()}>
                                                <Text style={{ color: 'white',fontFamily: 'TheSans-Plain'}}>{Labels._job_detail_company_evaluation}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                    {this.state.jobDetailData.job.users.reviews_received.map((data, index)=>(
                                        <View style={{width: '90%'}} key={index}>
                                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                                <Text style={{fontFamily: 'TheSans-Bold'}}>تقييم</Text>
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

                                    {/* <View style={{width: '90%'}}>
                                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                            <Text style={{fontFamily: 'TheSans-Bold'}}>تقييم</Text>
                                            <Rating
                                                fractions={20}
                                                ratingCount={5}
                                                imageSize={15}
                                                ratingColor={Colors.black}
                                                onFinishRating={this.ratingCompleted}
                                            />
                                        </View>

                                        <Dash style={{width: '100%', height: 1, marginTop: 5,}} dashColor={Colors.thirdBackground}></Dash>
                                        <Text style={{textAlign: 'left', padding: 15, lineHeight: 16, fontFamily: 'TheSans-Plain'}}>تعاملت مع هذة الشركة أكثر من مرة. تعامل محترف ويتميز القائمون علىإدارتها بالخبرة والمرونة في التعامل. أنصح بالتعامل معهم,</Text>
                                    </View>

                                    <View style={{width: '90%'}}>
                                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                            <Text style={{fontFamily: 'TheSans-Bold'}}>تقييم</Text>
                                            <Rating
                                                fractions={20}
                                                ratingCount={5}
                                                imageSize={15}
                                                ratingColor={Colors.black}
                                                onFinishRating={this.ratingCompleted}
                                            />
                                        </View>

                                        <Dash style={{width: '100%', height: 1, marginTop: 5,}} dashColor={Colors.thirdBackground}></Dash>
                                        <Text style={{textAlign: 'left', padding: 15,lineHeight: 16 ,fontFamily: 'TheSans-Plain'}}>املت مع هذة الشركة أكثر من مرة. تعامل محترف ويتميز القائمون علىإدارتها بالخبرة والمرونة في التعامل. أنصح بالتعامل معهم,</Text>
                                    </View> */}

                                    <TouchableOpacity style={{width: '100%', height: 30, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', backgroundColor: Colors.black}}>
                                        <Image source={require('../../assets/images/joblist/icon-down.png')} style={{height: 9, width: 16}}/>
                                        <Text style={{marginLeft: 5, color: Colors.white, fontFamily: 'TheSans-Plain'}}>{Labels._job_detail_more}</Text>
                                    </TouchableOpacity>


                                </View>

                                <Text style={{textAlign: 'center', paddingTop: 15, paddingBottom: 15, fontFamily: 'TheSans-Bold',}}>{Labels._job_detai_related}</Text>

                                <FlatList
                                    data={this.state.jobDetailData.similars}
                                    renderItem={({ item }) => <Item item={item} />}
                                    keyExtractor={item => item.id}
                                />
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
    contentContainer: {
      
        paddingTop: 0,
        width: Dimensions.get('window').width * 0.85,

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
        flex: 1,
        flexDirection: 'row',
        overflow: 'hidden',
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
        paddingBottom: 5,
       
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
        alignItems: 'center',
        justifyContent: 'center',
    },
    deadlineText: {
        color: Colors.primarySpeical,
        fontSize: 10,
        fontFamily: 'TheSans-Plain'
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
    logoModalContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.secondaryBackground,
        width: 70,
        height: 70,
        borderRadius: 35,
      
        // marginTop: 15,
       
    },
    jobReviewComment: {
        marginTop: 15,  
        height: 120, 
        width: '80%', 
        borderColor: Colors.thirdBackground, 
        borderWidth: 1, 
        borderRadius: 20, 
        textAlign: 'right', 
        textAlignVertical: 'top', 
        padding: 10
    }



});
