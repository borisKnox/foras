    
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
import { Container, Header, Title, Content,  Footer, FooterTab,  Body, 
    Left, Right, Icon, Button, } from "native-base";
import { Rating } from 'react-native-ratings';

import Dash from 'react-native-dash';

import Colors from '../../constants/Colors';
import { Labels } from '../../constants/Langs';

import StripeHeader from '../../components/StripeHeader';


export default class ProfileScreen extends React.Component {
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

    goToProfile = () =>{
        this.props.navigation.replace('EditProfile1');        
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
                        <Title style={{color: '#FFF'}}>{Labels._sidemenu_settings}</Title>
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
                        {/* {console.log("======his.state.profileInfo.logo======", this.state.profileInfo)} */}
                        {/* {this.state.profileInfo.logo == null ?
                            <StripeHeader imageUrl ={require('../../assets/images/individualAvatar.png')} isUserImage={true}/>
                            :
                            <StripeHeader imageUrl ={{uri: this.state.profileInfo.logo}} isUserImage={true}/>
                        } */}
                            <StripeHeader imageUrl ={{uri: this.state.profileInfo.logo}} isUserImage={true}/>


                        {/* <StripeHeader imageUrl ={require('../../assets/images/individualAvatar.png')} isUserImage={true}/> */}

        
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

                            <TouchableOpacity style={{marginTop: 12, width: '50%', height: 30, borderRadius: 20, backgroundColor: Colors.primarySpeical, alignItems: 'center', justifyContent: 'center'}} onPress={()=>this.goToProfile()}>
                                <Text style={{fontFamily: 'TheSans-Plain', color: Colors.white,}}>{Labels._user_profile_edit_button}</Text>
                            </TouchableOpacity>

                            <Dash style={{width: '90%', height: 1, marginTop: 20,}} dashColor={Colors.thirdBackground}></Dash>


                        </View>

                        <ScrollView  contentContainerStyle={styles.contentContainer}>
                            <View style={{width: Dimensions.get('window').width * 0.85, overflow: 'hidden' , borderRadius: 10, backgroundColor: 'white', alignItems: 'center', marginTop: 5}}>

                                <View style={{borderBottomWidth: 1, borderBottomColor: Colors.thirdBackground, width: '95%',marginTop: 20,}}>
                                    <View style={styles.categoryPart}>
                                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', borderRightColor: Colors.thirdBackground, borderRightWidth: 1}}>
                                            <Text style={{fontFamily: 'TheSans-Bold'}}>{Labels._user_profile_rectangle_1}</Text>
                                            <Text style={{fontFamily: 'TheSans-Plain'}}>{this.state.profileInfo.work_area == null? "": this.state.profileInfo.work_area}</Text>
                                        </View>
                                        <View style={{flex: 1, alignItems: 'center', justifyContent:'center'}}>
                                            <Text style={{fontFamily: 'TheSans-Bold'}}>{Labels._user_profile_rectangle_2}</Text>
                                            <Text style={{fontFamily: 'TheSans-Plain'}}>{this.state.profileInfo.city == null? "": this.state.profileInfo.city}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{borderBottomWidth: 1, borderBottomColor: Colors.thirdBackground, width: '95%'}}>
                                    <View style={styles.categoryPart}>
                                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', borderRightColor: Colors.thirdBackground, borderRightWidth: 1}}>
                                            <Text style={{fontFamily: 'TheSans-Bold'}}>{Labels._user_profile_rectangle_3}</Text>
                                            <Text style={{fontFamily: 'TheSans-Plain'}}>{this.state.profileInfo.hourly_rate == null? "": this.state.profileInfo.hourly_rate}</Text>
                                        </View>
                                        <View style={{flex: 1, alignItems: 'center', justifyContent:'center'}}>
                                            <Text style={{fontFamily: 'TheSans-Bold'}}>{Labels._user_profile_rectangle_4}</Text>
                                            <Text style={{fontFamily: 'TheSans-Plain'}}>{this.state.profileInfo.available_work_from_time == null? "": this.state.profileInfo.available_work_from_time}</Text>
                                        </View>
                                    </View>
                                </View>
                                
                                <View style={{}}>
                                    <View style={styles.categoryPart}>
                                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', borderRightColor: Colors.thirdBackground, borderRightWidth: 1}}>
                                            <Text style={{fontFamily: 'TheSans-Bold'}}>{Labels._user_profile_rectangle_5}</Text>
                                            <Text style={{fontFamily: 'TheSans-Plain'}}>{this.state.profileInfo.experience == null? "": this.state.profileInfo.experience}</Text>
                                        </View>
                                        <View style={{flex: 1, alignItems: 'center', justifyContent:'center'}}>
                                            <Text style={{fontFamily: 'TheSans-Bold'}}>{Labels._user_profile_rectangle_6}</Text>
                                            <Text style={{fontFamily: 'TheSans-Plain'}}>{this.state.profileInfo.languages == null? "": this.state.profileInfo.languages}</Text>
                                        </View>
                                    </View>
                                </View>

                                <Text style={{marginTop: 15, fontFamily: 'TheSans-Bold'}}> {Labels._user_detail_skills}</Text>

                                <View style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: 10}}>
                                    {this.state.profileInfo.skills == null?
                                        null
                                        :
                                        this.state.profileInfo.skills.split(",").map((data, index)=>(
                                            index + 1 < this.state.profileInfo.skills.split(",").length ?
                                                <View key= {index} style={{marginRight: 15, paddingHorizontal: 10, paddingVertical: 1, borderRadius: 20, borderColor: Colors.thirdBackground, alignItems: 'center', borderWidth: 1, justifyContent: 'center'}}>
                                                    <Text style={{fontSize: 17,  textAlign:'center', color: Colors.primarySpeical}}>{data}</Text>
                                                </View>
                                                : 
                                                null
                                        )
                                    )}
                                    
                                </View>
                                

                                <Dash style={{width: '90%', height: 1, marginTop: 15,}} dashColor={Colors.thirdBackground}></Dash>

                                <Text style={{marginTop: 15, fontFamily: 'TheSans-Bold'}}> {Labels._user_profile_about_me}</Text>

                                <Dash style={{width: '90%', height: 1, marginTop: 15,}} dashColor={Colors.thirdBackground}></Dash>

                                <Text style={{padding: 20, textAlign: 'center', lineHeight: 16, fontFamily: 'TheSans-Plain'}}>{this.state.profileInfo.about_me == null? "": this.state.profileInfo.about_me}</Text>

                                <TouchableOpacity style={{marginTop: 12, width: '50%', height: 30, borderRadius: 20, backgroundColor: Colors.primarySpeical, alignItems: 'center', justifyContent: 'center'}}>
                                    <Text style={{fontFamily: 'TheSans-Plain', color: Colors.white}}>{Labels._user_profile_cv_button}</Text>
                                </TouchableOpacity>


                                <Dash style={{width: '90%', height: 1, marginTop: 20,}} dashColor={Colors.thirdBackground}></Dash>

                                <Text style={{marginTop: 15,fontFamily: 'TheSans-Bold'}}> {Labels._user_profile_experience}</Text>
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

                                        <Text style={{marginTop: 5,fontFamily: 'TheSans-Plain'}}>{this.state.profileInfo.marks}/5</Text>
                                    
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
                                        <Text style={{textAlign: 'left', padding: 15, lineHeight: 16, fontFamily: 'TheSans-Plain'}}>{data.comment}</Text>
                                    </View>
                                ))}

                                

                                <TouchableOpacity style={{width: '100%', height: 30, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', backgroundColor: Colors.black}}>
                                    <Image source={require('../../assets/images/joblist/icon-down.png')} style={{height: 9, width: 16}}/>
                                    <Text style={{marginLeft: 5, color: Colors.white, fontFamily: 'TheSans-Plain'}}>{Labels._job_detail_more}</Text>
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
        overflow: 'hidden'
    },
    contentContainer: {
  
        paddingTop: 0,
     
        width: Dimensions.get('window').width * 0.85,
        overflow: 'hidden'
    },
    layoutDefault: {
        flex: 1
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
