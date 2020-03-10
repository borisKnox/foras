    
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
} from 'react-native';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { Container, Header, Title, Content,  Footer, FooterTab,  Body, 
    Left, Right, Icon, Button, } from "native-base";

import Dash from 'react-native-dash';

import Colors from '../../constants/Colors';
import { Labels } from '../../constants/Langs';

import StripeHeader from '../../components/StripeHeader';


const checkIconUri = require('../../assets/images/Check.png');

export default class MyProfileScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profileInfo: global.loginInfo,
        }
    }

    componentDidMount(){     

    }

    toggleModal = () => {
        
        this.setState({ isReviewModalVisible: !this.state.isReviewModalVisible });
    };

    goPackageScreen= () =>{
        this.props.navigation.replace('CompanyPackage');
    }

    goJobPostScreen= () =>{
        this.props.navigation.replace('JobPost');
    }

    goToProfileEdit =()=>{
        this.props.navigation.replace('EditProfile');
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
                        <Title style={{color: '#FFF'}}>ملف الشركة</Title>
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
                        {/* {console.log("======his.state.profileInfo.logo======", this.state.profileInfo.logo)} */}
                        
                        <StripeHeader imageUrl ={{uri: this.state.profileInfo.logo}} isUserImage={false}/>
                        {/* <StripeHeader imageUrl ={require('../../assets/images/individualAvatar.png')} isUserImage={true} /> */}
        
                        <View style={{ width: '100%', alignItems: 'center'}}>
                        <Text style={{fontSize: 20, fontWeight: '300'}}>{this.state.profileInfo.name == null? "" : this.state.profileInfo.name}</Text> 

                            <Rating          
                                readonly
                                startingValue = {this.state.profileInfo.marks == null? "0" : this.state.profileInfo.marks}      
                                fractions={1}
                                ratingCount={5}
                                imageSize={18}
                                type='custom'
                                ratingColor={Colors.primaryBackground}
                                ratingBackgroundColor={Colors.thirdBackground}
                                tintColor={Colors.secondaryBackground}
                                style={{marginTop: 15}}
                            
                                onFinishRating={this.ratingCompleted}
                            />

                            <TouchableOpacity style={{marginTop: 12, width: '50%', height: 30, borderRadius: 20, borderWidth: 1, alignItems: 'center', justifyContent: 'center'}} onPress={()=> this.goToProfileEdit()}>
                                <Text style={{ color: Colors.primarySpeical}}>{Labels._company_profile_edit_button}</Text>
                            </TouchableOpacity>
                            
                            <View style={{width: Dimensions.get('window').width * 0.85, overflow: 'hidden' , borderRadius: 10, backgroundColor: 'white', alignItems: 'center', marginTop: 5}}>
                                <Text style={{marginTop:10,marginBottom:10}}>حزمة التواصل مع ٣٠ م</Text>
                                <Dash style={{width: '90%', height: 1,}} dashColor={Colors.thirdBackground}></Dash>
                                <View style={{alignItems: 'flex-start'}}>
                                    <Text>
                                        contact 30 candiates directly
                                        <Image source={checkIconUri}/>
                                    </Text>
                                    <Text>
                                        Post 3 jobs
                                        <Image source={checkIconUri}/>
                                    </Text>
                                    <Text>
                                        Advance CV search
                                        <Image source={checkIconUri}/>
                                    </Text>
                                </View>
                                <Dash style={{width: '90%', height: 1,}} dashColor={Colors.thirdBackground}></Dash>
                                <TouchableOpacity onPress={()=> this.goPackageScreen()} style={{marginTop: 10, marginBottom: 10, width: '85%', height: 35, borderRadius: 20, backgroundColor: '#F2620F', alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                                    <Text style={{ color: 'white',}}>تجديد الحزمة او اختي</Text>
                                </TouchableOpacity>
                            </View>
                            <Dash style={{width: '90%', height: 1, marginTop: 20,}} dashColor={Colors.thirdBackground}></Dash>

                            <TouchableOpacity onPress={()=> this.goJobPostScreen()} style={{marginTop: 12, width: '65%', height: 35, borderRadius: 20, backgroundColor: Colors.primarySpeical, alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                                <Image source={require('../../assets/images/icon-plus.png')} style={{height: 13, width: 13, marginRight: 10}}/>
                                <Text style={{color: Colors.white, paddingLeft: 6}}>{Labels._add_new_job_post}</Text>
                            </TouchableOpacity>

                            <Dash style={{width: '90%', height: 1, marginTop: 20,}} dashColor={Colors.thirdBackground}></Dash>

                        </View>

                        <ScrollView  contentContainerStyle={styles.contentContainer}>
                            <View style={{width: Dimensions.get('window').width * 0.85, overflow: 'hidden' , borderRadius: 10, backgroundColor: 'white', alignItems: 'center', marginTop: 5}}>
                                <Text style={{fontFamily: 'TheSans-Bold', marginTop:15 }}>{Labels._company_profile_edit_open}</Text>
                                <Dash style={{width: '90%', height: 1, marginTop: 20,}} dashColor={Colors.thirdBackground}></Dash>

                                {this.state.profileInfo.jobs.map((data, index)=>(
                                    <TouchableOpacity key={index} style={{ width: '90%', height: 50, backgroundColor: Colors.thirdBackground, borderRadius: 5, marginTop: 10, flexDirection: 'row'}}>
                                        <View style={{marginTop: 4, marginLeft: 4, width: 42, height: 42, alignItems: 'center', justifyContent: "center", backgroundColor: Colors.secondaryBackground, borderRadius: 5}}>
                                            <Image source={{uri: this.state.profileInfo.logo}}  style={{ height: 30, width: 30, borderRadius: 15}} />
                                        </View>
                                        <View style={{justifyContent: 'center', marginLeft: 5, }}>
                                            <Text style={{textAlign: 'left'}}>{data.job_name}</Text>
                                            <Text style={{color: Colors.primarySpeical, textAlign: 'left'}}>{data.salary_amount} ريال</Text>
                                        </View>
                                        <View style={{right: 5,  position: 'absolute', justifyContent: 'center', marginTop: 6}}>
                                            <Text>{data.location}</Text>
                                            <Text>{data.salary_type}</Text>
                                        </View>
                                    </TouchableOpacity>
                                ))}

                                <View style={{height: 15, width:'100%', backgroundColor: 'white'}}></View>
                            </View>

                            <Dash style={{width: '90%', height: 1, marginTop: 20,}} dashColor={Colors.thirdBackground}></Dash>

                            <View style={styles.profileContainer}>

                                <View style={styles.categoryPart}>
                                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', borderRightColor: Colors.thirdBackground, borderRightWidth: 1}}>
                                        <Text style={{fontFamily: 'TheSans-Bold'}}>{Labels._company_profile_employment}</Text>
                                        <Text style={{}}>{this.state.profileInfo.work_area == null? "": this.state.profileInfo.work_area}</Text>
                                    </View>
                                    <View style={{flex: 1, alignItems: 'center', justifyContent:'center'}}>
                                        <Text style={{fontFamily: 'TheSans-Bold'}}>{Labels._company_profile_location}</Text>
                                        <Text style={{}}>{this.state.profileInfo.city == null? "": this.state.profileInfo.city}</Text>
                                    </View>
                                </View>

                                <Dash style={{width: '90%', height: 1, marginTop: 15,}} dashColor={Colors.thirdBackground}></Dash>

                                <Text style={{marginTop: 15, fontFamily: 'TheSans-Bold'}}> {Labels._company_profile_inform}</Text>

                                <Dash style={{width: '90%', height: 1, marginTop: 15,}} dashColor={Colors.thirdBackground}></Dash>

                                <Text style={{padding: 20, textAlign: 'center', lineHeight: 16, }}>{this.state.profileInfo.about_me == null? "": this.state.profileInfo.about_me}</Text>

                            

            

                                {/* <Dash style={{width: '90%', height: 1, marginTop: 20,}} dashColor={Colors.thirdBackground}></Dash>
                                <Text style={{marginTop: 15,fontFamily: 'TheSans-Bold'}}> {Labels._company_profile_evaluation} </Text>
                                <Dash style={{width: '90%', height: 1, marginTop: 20,}} dashColor={Colors.thirdBackground}></Dash>


                                <View style={{width: '60%', flexDirection: 'row', marginBottom: 20}}>
                                    <View style= {styles.logoDotContainer}>
                                        <View style={styles.logoContainer}>
                                            <Image source={{uri: this.state.profileInfo.logo}}  style={{ height: 60, width: 60, borderRadius: 30}} />
                                        </View>
                                    </View>

                                    <View style={{marginTop: 20, alignItems: 'center', marginLeft: 10}}>
                                        <Rating
                                            readonly
                                            startingValue = {this.state.profileInfo.marks}
                                            fractions={20}
                                            ratingCount={5}
                                            imageSize={15}
                                            type='custom'
                                            ratingColor={Colors.primaryBackground}
                                            ratingBackgroundColor={Colors.thirdBackground}
                                            onFinishRating={this.ratingCompleted}
                                        />

                                        <Text style={{marginTop: 5,}}>{this.state.profileInfo.marks}/5</Text>
                                        <TouchableOpacity style={{height:30, width: 100, backgroundColor: Colors.primarySpeical, borderRadius:20, alignItems: 'center', justifyContent:'center', marginTop:5}} onPress={()=>this.toggleModal()}>
                                            <Text style={{ color: 'white'}}>{Labels._company_profile_evaluation}</Text>

                                        </TouchableOpacity>
                                    </View>
                                </View> */}
                                
                                {this.state.profileInfo.reviews_received.map((data, index)=>(
                                    <View style={{width: '90%'}} key={index}>
                                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                            <Text style={{fontFamily: 'TheSans-Bold'}}>تقييم</Text>
                                            <Rating
                                                readonly
                                                startingValue = {data.marks}
                                                fractions={20}
                                                ratingCount={5}
                                                imageSize={15}
                                                type='custom'
                                                ratingColor={Colors.primaryBackground}
                                                ratingBackgroundColor={Colors.thirdBackground}
                                                onFinishRating={this.ratingCompleted}
                                            />
                                        </View>                           

                                        <Dash style={{width: '100%', height: 1, marginTop: 5,}} dashColor={Colors.thirdBackground}></Dash>
                                        <Text style={{textAlign: 'left', padding: 15,lineHeight: 16 ,}}>{data.comment}</Text>
                                    </View>
                                ))}

                                <TouchableOpacity style={{width: '100%', height: 30, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', backgroundColor: Colors.black}}>
                                    <Image source={require('../../assets/images/joblist/icon-down.png')} style={{height: 9, width: 16}}/>
                                    <Text style={{marginLeft: 5, color: Colors.white, }}>{Labels._job_detail_more}</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
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
        // overflow: 'hidden'
    },
    layoutDefault: {
        flex: 1
    },
    headerBody: {
        flex: 2,
        alignItems: 'center',
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
        // fontFamily: 'arbfonts-the-sans-plain',
        color: Colors.primarySpeical,
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
        // fontFamily: 'arbfonts-the-sans-plain'
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
