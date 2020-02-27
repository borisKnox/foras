    
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
import Dash from 'react-native-dash';
import {individualReviewsData} from '../../constants/Constants';
import Spinner from 'react-native-loading-spinner-overlay';
import { Container, Header, Title, Content,  Footer, FooterTab,  Body, 
    Left, Right, Icon, Button, } from "native-base";
import api from '../../constants/api';
import Toast from 'react-native-simple-toast';

import Colors from '../../constants/Colors';
import { Labels } from '../../constants/Langs';
    import HeaderScreen from './HeaderScreen';

const userData = 
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        userName: 'عبد الرحيم علي الوليد',
        userCategory: 'خبير تسويق',
        userLocation: ' الرياض',
        userHourly: '40 ريال',
        availableFrom:'متوفر للعمل من: 5 مارس 2019',
        logoUrl: 'www.thamsdfdsfdsfd',
        isFavorit: true 
    };
    
    



export default class UserDetailScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isReviewModalVisible: false,
            userDetailData: '',
            detailLogo:global.detailLogo,
            likeStatus: global.favoriteIndividualStatus,
            individaulReviewValue: 0,
            individualReviewComment: "",
            spinner: false,
            loading: false,
            sendMessageModal: false,
            sendOfferJobModal: false,
            message: '',
            offerJobMessage: ''
        }
    }

    componentDidMount(){
        console.log("==============didmonunt of UserDetailScreen==============")
        this.setState({spinner: true});
        api.getIndividualDetail(global.token, global.userDetailId).then((res)=>{
            console.log('getIndividualDetail response____', res);
            if(res.status == 200){
                this.setState({spinner: false});
                this.setState({userDetailData: res.data});

                // console.log("====userDetailData===", this.state.userDetailData.reviews_received);           
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
    }

    ratingCompleted=(rating)=>{
         console.log("Rating is: " + rating);
         this.setState({individaulReviewValue: rating});  
    }

    saveIndividualReviews(){
        this.setState({ isReviewModalVisible: false});
        if(this.state.individualReviewComment == ""){
            Toast.show("Pleae fill the comment");
        }else{
            this.setState({spinner: true});

            // individualReviewsData.job_id = this.state.jobDetailData.id;
            // individualReviewsData.corporate_id = this.state.jobDetailData.users.id;
            individualReviewsData.receiver_id = this.state.userDetailData.user.id;
            individualReviewsData.marks = this.state.individaulReviewValue;
            individualReviewsData.comment = this.state.individualReviewComment;
            
            individualReviewsData.token = global.token;
            api.jobReviews(individualReviewsData).then((res)=>{
                console.log('getJobList response____', res);  
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
        }

    }

    changeLike(likeStatus){

        this.setState({spinner: true});
        api.favoriteIndividualToggle(global.token, global.userDetailId).then((res)=>{
            console.log('favoriteIndividualToggle response____', res);
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

            api.sendMessages(global.token, global.userDetailId, this.state.message, "Common Message", "common").then((res)=>{
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

    sendOfferJobModal(){
        this.setState({sendOfferJobModal: true});
    }

    sendOfferJob=()=>{
        
        this.setState({sendOfferJobModal: false});

        if(this.state.offerJobMessage){
            this.setState({spinner: true});

            api.sendMessages(global.token, global.userDetailId, global.job_id, this.state.offerJobMessage, "Offer Job Message", "offer_job").then((res)=>{
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
                        <Title style={{color: '#FFF'}}>السيرة الذاتية</Title>
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

                        <View style={{height: 50, width: Dimensions.get('window').width * 0.85, backgroundColor: Colors.primarySpeical, borderRadius: 7, alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={{color: '#FFF', fontSize: 15}}>تفاصيل المستخدم</Text>
                        </View>

                        {/* -----------------------left Review Modal-------------------- */}                        

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
                                        <View style={styles.logoContainer}>
                                            <Image source={{uri: this.state.detailLogo}}  style={{ height: 70, width: 70, borderRadius: 35}} />
                                        </View>
                                    </View>
                                    <View style={{ marginTop: 10}}>
                                        <Rating
                                            startingValue = {this.state.individaulReviewValue}  
                                            fractions={20}
                                            ratingCount={5}
                                            imageSize={20}
                                            ratingColor={Colors.primaryBackground}
                                            onFinishRating={this.ratingCompleted}
                                        />
                                    </View>
                                    
                                    <TextInput style={{marginTop: 15,  height: 120, width: '80%', borderColor: Colors.thirdBackground, borderWidth: 1, borderRadius: 20, textAlign: 'right', textAlignVertical: 'top', padding: 10} } blurOnSubmit={true} multiline={true} numberOfLines={10}  value={this.state.individualReviewComment} onChangeText={text => this.setState({individualReviewComment: text})}/>
                                    
                                    <TouchableOpacity style={{width: 70, height: 70, backgroundColor: Colors.primarySpeical, borderRadius: 35, bottom: -35, position: 'absolute', alignItems: 'center', justifyContent: 'center'}} onPress={()=>this.saveIndividualReviews()}>
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
                                        <View style={styles.logoContainer}>
                                            <Image source={{uri: this.state.detailLogo}}  style={{ height: 70, width: 70, borderRadius: 35}} />
                                        </View>
                                    </View>                                   
                                    
                                    <TextInput style={{marginTop: 15,  height: 120, width: '80%', borderColor: Colors.thirdBackground, borderWidth: 1, borderRadius: 20, textAlign: 'right', textAlignVertical: 'top', padding: 10} } blurOnSubmit={true} multiline={true} numberOfLines={10}  value={this.state.message} onChangeText={text => this.setState({message: text})}/>
                                    
                                    <TouchableOpacity style={{width: 70, height: 70, backgroundColor: Colors.primarySpeical, borderRadius: 35, bottom: -35, position: 'absolute', alignItems: 'center', justifyContent: 'center'}} onPress={()=>this.sendMessage()}>
                                        <Image source={require('../../assets/images/maps/icon-go.png')} style={{height: 30}}/>
                                    </TouchableOpacity>

                                </View>
                            </View>
                        </Modal>

                        {/* --------------------------send Offer job Modal----------------- */}

                        <Modal 
                            isVisible={this.state.sendOfferJobModal}
                            animationInTiming={500}
                            animationOutTiming={500}
                            backdropTransitionInTiming={500}
                            backdropTransitionOutTiming={500}
                            style={{margin: 0}}>

                            <View style={{width: '100%', alignItems: 'center'}}>
                                <View style={{width: Dimensions.get('window').width * 0.85 , height: 300, backgroundColor: 'white', alignItems: 'center', borderRadius: 10}}>
                                    <View style= {styles.logoDotContainer}>
                                        <View style={styles.logoContainer}>
                                            <Image source={{uri: this.state.detailLogo}}  style={{ height: 70, width: 70, borderRadius: 35}} />
                                        </View>
                                    </View>                                   
                                    
                                    <TextInput style={{marginTop: 15,  height: 120, width: '80%', borderColor: Colors.thirdBackground, borderWidth: 1, borderRadius: 20, textAlign: 'right', textAlignVertical: 'top', padding: 10} } blurOnSubmit={true} multiline={true} numberOfLines={10}  value={this.state.offerJobMessage} onChangeText={text => this.setState({offerJobMessage: text})}/>
                                    
                                    <TouchableOpacity style={{width: 70, height: 70, backgroundColor: Colors.primarySpeical, borderRadius: 35, bottom: -35, position: 'absolute', alignItems: 'center', justifyContent: 'center'}} onPress={()=>this.sendOfferJob()}>
                                        <Image source={require('../../assets/images/maps/icon-go.png')} style={{height: 30}}/>
                                    </TouchableOpacity>

                                </View>
                            </View>
                        </Modal>


                        {/* ------------------------------------------------------------- */}

                        {this.state.loading? 
                            <ScrollView  contentContainerStyle={styles.contentContainer}>

                                <View style={styles.cartContainer}>
                                    <TouchableOpacity style={styles.logoPart}>
                                        <View style= {styles.logoDotContainer}>
                                            <View style={styles.logoContainer}>
                                                <Image source={{uri: this.state.userDetailData.user.logo}}  style={{ height: 70, width: 70, borderRadius: 35}} />
                                            </View>
                                        </View>
                                        <View style= {styles.ratingContainer}>
                                            <Rating
                                                readonly
                                                startingValue = {this.state.userDetailData.user.marks == null? "0" : this.state.userDetailData.user.marks}
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
                                                <Text style={styles.detailItemSubject}>{this.state.userDetailData.user.name == null? "" : this.state.userDetailData.user.name}</Text>                                
                                            </View>

                                            <View style={styles.detailLine}>
                                                <Text style={styles.detailItemSubject}>{Labels._userList_cart_category}</Text>
                                                <Text style={styles.detailItemSubject}>:</Text>
                                                <Text style={styles.detailItemContent}>{this.state.userDetailData.user.work_area ==null? "" :  this.state.userDetailData.user.work_area}</Text>
                                            </View>

                                            <View style={styles.detailLine}>
                                                <Text style={styles.detailItemSubject}>{Labels._userList_cart_location}</Text>
                                                <Text style={styles.detailItemSubject}>:</Text>
                                                <Text style={styles.detailItemContent}>{this.state.userDetailData.user.address == null? "" : this.state.userDetailData.user.address}</Text>
                                            </View>

                                            <View style={styles.detailLine}>
                                                <Text style={styles.detailItemSubject}>{Labels._userList_cart_hourly}</Text>
                                                <Text style={styles.detailItemSubject}>:</Text>
                                                <Text style={styles.detailItemContent}>{this.state.userDetailData.user.hourly_rate == null? "" : this.state.userDetailData.user.hourly_rate}</Text>
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
                                        
                                            <TouchableOpacity style={styles.deadlineButton}>
                                                <Text style={styles.deadlineText}>متاح للعمل من: {this.state.userDetailData.user.available_work_from_time == null? "" : this.state.userDetailData.user.available_work_from_time}</Text>
                                            </TouchableOpacity>                            
                                        </View>
                                    </View>
                                </View>

                                <View style={styles.profileContainer}>
                                    <View style={{borderBottomWidth: 1, borderBottomColor: Colors.thirdBackground, width: '90%',marginTop: 20,}}>
                                        <View style={styles.categoryPart}>
                                            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', borderRightColor: Colors.thirdBackground, borderRightWidth: 1}}>
                                                <Text style={{fontFamily: 'TheSans-Bold'}}>{Labels._user_detail_rectangle_1}</Text>
                                                <Text style={{fontFamily: 'TheSans-Plain'}}>{this.state.userDetailData.user.experience == null? "" : this.state.userDetailData.user.experience}</Text>
                                            </View>

                                            <View style={{flex: 1, alignItems: 'center', justifyContent:'center'}}>
                                                <Text style={{fontFamily: 'TheSans-Bold'}}>{Labels._user_detail_rectangle_2}</Text>
                                                <Text style={{fontFamily: 'TheSans-Plain'}}>{this.state.userDetailData.user.languages == null? "" : this.state.userDetailData.user.languages}</Text>
                                            </View>
                                        </View>
                                    </View>

                                    <Text style={{marginTop: 15, fontFamily: 'TheSans-Bold'}}> {Labels._user_detail_skills}</Text>

                                    <View style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: 10}}>
                                        {this.state.userDetailData.user.skills == null?
                                            null
                                            :
                                            this.state.userDetailData.user.skills.split(",").map((data, index)=>(
                                                index + 1 < this.state.userDetailData.user.skills.split(",").length ?
                                                    <View key= {index} style={{marginRight: 15, paddingHorizontal: 10, paddingVertical: 1, borderRadius: 20, borderColor: Colors.thirdBackground, alignItems: 'center', borderWidth: 1, justifyContent: 'center'}}>
                                                        <Text style={{fontSize: 17,  textAlign:'center', color: Colors.primarySpeical}}>{data}</Text>
                                                    </View>
                                                    : 
                                                    null
                                            )
                                        )}
                                        
                                    </View>
                                

                                    <Dash style={{width: '90%', height: 1, marginTop: 15,}} dashColor={Colors.thirdBackground}></Dash>

                                    <Text style={{marginTop: 15, fontFamily: 'TheSans-Bold'}}> {Labels._user_detail_about}</Text>

                                    <Dash style={{width: '90%', height: 1, marginTop: 15,}} dashColor={Colors.thirdBackground}></Dash>

                                    <Text style={{padding: 20, textAlign: 'center', lineHeight: 16, fontFamily: 'TheSans-Plain'}}>{this.state.userDetailData.user.about_me == null? "" : this.state.userDetailData.user.about_me}</Text>

                                    <View style={{flexDirection: 'row', justifyContent: 'space-around', width: '100%'}}>
                                        <TouchableOpacity onPress={()=>this.sendMessageModal()} style={{height: 40, width: '35%', backgroundColor: Colors.primarySpeical, borderRadius: 20, alignItems: 'center', justifyContent:'center'}}>
                                            <Text style={{color: 'white'}}>{Labels._company_profile_sending}</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity  onPress={()=>this.sendOfferJobModal()}  style={{height: 40, width: '35%', backgroundColor: Colors.primarySpeical, borderRadius: 20, alignItems: 'center', justifyContent:'center'}}>
                                            <Text style={{color: 'white'}}>{Labels._user_detail_offer_button}</Text>
                                        </TouchableOpacity>
                                    </View>                            

                                    {/* <Dash style={{width: '90%', height: 1, marginTop: 20,}} dashColor={Colors.thirdBackground}></Dash>
                                    <Text style={{marginTop: 15,fontFamily: 'TheSans-Bold'}}> {Labels._job_detail_about_company}</Text>
                                    <Dash style={{width: '90%', height: 1, marginTop: 20,}} dashColor={Colors.thirdBackground}></Dash> */}


                                    {/* <Text style={{padding: 20, textAlign: 'center', lineHeight: 16, fontFamily: 'TheSans-Plain'}}>شركة MP Marketing  هي شركة مساهمة سعودية ذات خبرةكبيرة في مجال التسويق. أنشئت عام 1992 ميلادي. وتعمل فيمجالات عديدة من ظمنها التسويقء الدعاية والإعلان, التسويقالإلكتروني والمبيعات</Text> */}

                                    <Dash style={{width: '90%', height: 1, marginTop: 20,}} dashColor={Colors.thirdBackground}></Dash>
                                    <Text style={{marginTop: 15,fontFamily: 'TheSans-Bold'}}> {Labels._copmpany_profile_open}</Text>
                                    <Dash style={{width: '90%', height: 1, marginTop: 20,}} dashColor={Colors.thirdBackground}></Dash>


                                    <TouchableOpacity style={{ width: '90%', height: 50, backgroundColor: Colors.thirdBackground, borderRadius: 5, marginTop: 10, flexDirection: 'row'}}>
                                        <View style={{marginTop: 4, marginLeft: 4, width: 42, height: 42, alignItems: 'center', justifyContent: "center", backgroundColor: Colors.secondaryBackground, borderRadius: 5}}>
                                            <Image source={require('../../assets/images/temple/icon-company-brand1.png')}  style={{ height: 30, width: 30,}} />
                                        </View>

                                        <View style={{justifyContent: 'center', marginLeft: 5}}>
                                            <Text style={{fontSize: 12}}>Femail Marketing</Text>
                                            <Text style={{color: Colors.primarySpeical, fontSize: 12}}>مندوب مبيعات</Text>
                                        </View>

                                        <View style={{right: 5, width: 100, position: 'absolute', justifyContent: 'center', marginTop: 10}}>
                                            <Text style={{padding: 5, fontSize: 10}}>مارس ٢٠١٧ - مارس ٢٠١٨</Text>                               
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{ width: '90%', height: 50, backgroundColor: Colors.thirdBackground, borderRadius: 5, marginTop: 10, flexDirection: 'row'}}>
                                        <View style={{marginTop: 4, marginLeft: 4, width: 42, height: 42, alignItems: 'center', justifyContent: "center", backgroundColor: Colors.secondaryBackground, borderRadius: 5}}>
                                            <Image source={require('../../assets/images/temple/icon-company-brand1.png')}  style={{ height: 30, width: 30,}} />
                                        </View>

                                        <View style={{justifyContent: 'center', marginLeft: 5}}>
                                            <Text style={{fontSize: 12}}>Femail Marketing</Text>
                                            <Text style={{color: Colors.primarySpeical, fontSize: 12}}>مندوب مبيعات</Text>
                                        </View>

                                        <View style={{right: 5, width: 100, position: 'absolute', justifyContent: 'center', marginTop: 10}}>
                                            <Text style={{padding: 5, fontSize: 10}}>مارس ٢٠١٧ - مارس ٢٠١٨</Text>                               
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{ width: '90%', height: 50, backgroundColor: Colors.thirdBackground, borderRadius: 5, marginTop: 10, flexDirection: 'row'}}>
                                        <View style={{marginTop: 4, marginLeft: 4, width: 42, height: 42, alignItems: 'center', justifyContent: "center", backgroundColor: Colors.secondaryBackground, borderRadius: 5}}>
                                            <Image source={require('../../assets/images/temple/icon-company-brand1.png')}  style={{ height: 30, width: 30,}} />
                                        </View>

                                        <View style={{justifyContent: 'center', marginLeft: 5}}>
                                            <Text style={{fontSize: 12}}>Femail Marketing</Text>
                                            <Text style={{color: Colors.primarySpeical, fontSize: 12}}>مندوب مبيعات</Text>
                                        </View>

                                        <View style={{right: 5, width: 100, position: 'absolute', justifyContent: 'center', marginTop: 10}}>
                                            <Text style={{padding: 5, fontSize: 10}}>مارس ٢٠١٧ - مارس ٢٠١٨</Text>                               
                                        </View>
                                    </TouchableOpacity> 

                                    <Dash style={{width: '90%', height: 1, marginTop: 20,}} dashColor={Colors.thirdBackground}></Dash>
                                    <Text style={{marginTop: 15,fontFamily: 'TheSans-Bold'}}> {Labels._user_detail_review_title} </Text>
                                    <Dash style={{width: '90%', height: 1, marginTop: 20,}} dashColor={Colors.thirdBackground}></Dash>

                                    <View style={{width: '60%', flexDirection: 'row', marginBottom: 20}}>
                                    
                                        <View style= {styles.logoDotContainer}>
                                            <View style={styles.logoContainer}>
                                                <Image source={{uri: this.state.detailLogo}}  style={{ height: 70, width: 70, borderRadius: 35}} />
                                            </View>
                                        </View>       

                                        <View style={{marginTop: 20, alignItems: 'center', marginLeft: 10}}>
                                            <Rating
                                                readonly
                                                startingValue = {this.state.individaulReviewValue}
                                                fractions={20}
                                                ratingCount={5}
                                                imageSize={15}
                                                ratingColor={Colors.black}
                                                onFinishRating={this.ratingCompleted}
                                            />

                                            <Text style={{marginTop: 5,fontFamily: 'TheSans-Plain'}}>{this.state.individaulReviewValue}/5</Text>
                                            <TouchableOpacity style={{height:30, width: 100, backgroundColor: Colors.primarySpeical, borderRadius:20, alignItems: 'center', justifyContent:'center', marginTop:5}} onPress={()=>this.toggleModal()}>
                                                <Text style={{ color: 'white',fontFamily: 'TheSans-Plain'}}>{Labels._user_detail_review_button}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                    {this.state.userDetailData.reviews.length >=1?
                                        this.state.userDetailData.reviews.map((data, index)=>(
                                            <View style={{width: '90%'}} key={index}>
                                                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                                    <Text style={{fontFamily: 'TheSans-Bold'}}>تقييم</Text>
                                                    <Rating
                                                        readonly
                                                        startingValue = {data.marks == null? "0": data.marks}
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
                                        ))
                                    : 
                                        null 
                                    }
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


});
