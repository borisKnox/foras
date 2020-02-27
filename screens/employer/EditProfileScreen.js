    
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

import CalendarPicker from 'react-native-calendar-picker';
import InputScrollView from 'react-native-input-scroll-view';
import RNPickerSelect from 'react-native-picker-select';
import { Chevron, Triangle } from 'react-native-shapes';
import Spinner from 'react-native-loading-spinner-overlay';
// import DatePicker from 'react-native-datepicker';
import { DatePicker } from 'native-base';
import moment from "moment";
import { Container, Header, Title, Content,  Footer, FooterTab,  Body, 
    Left, Right, Icon, Button, } from "native-base";
import ImagePicker from 'react-native-image-picker';
import Modal from "react-native-modal";
import Dash from 'react-native-dash';

import api from '../../constants/api';
import {companyEditProfileData, WorkAreas, Languages, Skills} from '../../constants/Constants';


import Colors from '../../constants/Colors';
import { Labels } from '../../constants/Langs';

import StripeHeader from '../../components/StripeHeader';

const options = {
    title: 'Select Avatar',
    takePhotoButtonTitle: 'Take photo with your camera',
    chooseFromLibraryButtonTitle: 'Choose photo from library'
}

export default class EditProfileScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            spinner: false,
            logo: global.loginInfo.logo,
            name: global.loginInfo.name == null? "" : global.loginInfo.name,
            workArea: global.loginInfo.work_area == null? "" : global.loginInfo.work_area,          
            city: global.loginInfo.city == null? "" : global.loginInfo.city,
            // hourlyRate: global.loginInfo.hourly_rate == null? "" : global.loginInfo.hourly_rate,
            // availableWorkFromTime: global.profileInfo.available_work_from_time,
            // experience: global.loginInfo.experience == null? "" : global.loginInfo.experience,,
            language: '',            
            selectedLanguage: [],
            skill: '',            
            selectedSkills: [],
            aboutYou: global.loginInfo.about_me == null? "" : global.loginInfo.about_me,           
           

            selectedStartDate: null,
            selectedEndDate: null,
            isMonday: false,
            isTuesday: false,
            isWednesday: false,
            isThursday: false,
            isFriday: false,
            isSaturday: false,
            isSunday: false, 
            
            isModalVisible: false
        }
        this.setDate_start = this.setDate_start.bind(this);        
    }

    setDate_start(newDate) {
        var momentDate = moment(newDate).format("YYYY-MM-DD");
        this.setState({ availableWorkFromTime: momentDate});
    }    

    componentDidMount(){
        
    }

    toggleModal = () => {
        
        // this.setState({ isModalVisible: !this.state.isModalVisible });
    };    

    addLanguage=(value)=>{
        var selectedLanguageArray = this.state.selectedLanguage.push({item: value});        
    }
    addSkill=(value)=>{
        var selectedSkillArray = this.state.selectedSkills.push({item: value});
    }

    deleteLanguage =(index)=>{
        console.log("==========index=========", index);
        var deletedLanguage = this.state.selectedLanguage.splice(index, 1)
        this.setState({selectedLanguage: this.state.selectedLanguage});
        console.log("==========selectLanguage=========", this.state.selectedLanguage)
    }

    deleteSkill =(index)=>{
        console.log("==========index=========", index);
        var deletedSkill = this.state.selectedSkills.splice(index, 1)
        this.setState({selectedSkills: this.state.selectedSkills});
        console.log("==========selectedSkills=========", this.state.selectedSkills)
    }

    changeLogo=()=>{
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else {
                let source = response;
                this.setState({logo: source.uri});
                console.log("-----------LOGO-------------", source.uri)
            }
        });
    }

    saveProfile(){        
        this.setState({spinner: true});

        companyEditProfileData.logo = this.state.logo
        companyEditProfileData.name = this.state.name
        companyEditProfileData.work_area = this.state.workArea
        companyEditProfileData.city = this.state.city			        
        companyEditProfileData.about_me = this.state.aboutYou
        companyEditProfileData.token = global.token
        companyEditProfileData.role = "corporate"
        // console.log("===companyEditProfileData===", companyEditProfileData)    


        api.companyEditProfile(companyEditProfileData).then((res)=>{
            console.log('userEditProfile response____');  
            console.log(res);
            if(res.status == 200){
                // this.setState({spinner: false});
                // global.loginInfo = res.data;

                api.uploadAvatar(global.token, this.state.logo).then((res)=>{
                    console.log('uploadAvatar response____');  
                    console.log(res);
                    if(res.status == 200){
                        this.setState({spinner: false});
                        console.log("Upload avatar Success!!!");    
                        global.loginInfo = res.data;
                        this.props.navigation.replace('MyProfile');

                    }else{
                        Alert.alert(
                            '',
                            "error",
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
                    '',
                    [typeof(res.errors.name) == "undefined" ? "" : res.errors.name.toString()]  + " " + 
                    [typeof(res.errors.work_area) == "undefined" ? "": res.errors.work_area.toString()] + " " +
                    [typeof(res.errors.city) == "undefined" ? "": res.errors.city.toString()] + " " +                                      
                    [typeof(res.errors.about_me) == "undefined" ? "": res.errors.about_me],
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
        
        const placeholder_workArea = {
            label: Labels.edit_workArea,
            value: null,
            color: 'green',
        };
        
        const placeholder_language = {
            label: Labels.eidt_languages,
            value: null,
            color: 'green',
        };

        const placeholder_skills = {
            label: Labels.eidt_skills,
            value: null,
            color: 'green',
        };        
        

        const { selectedStartDate, selectedEndDate } = this.state;
        const minDate = new Date(); // Today
        const maxDate = new Date(2017, 6, 3);
        const startDate  =  selectedStartDate ? selectedStartDate.toString() : '';
        const endDate = selectedEndDate ? selectedEndDate.toString() : '';
        return (
            <Container >
                <Header androidStatusBarColor="#F2620F" style={{backgroundColor:"#F2620F"}}>
                    <Left style={{flex: 1}}>
                        <TouchableOpacity  onPress={() => this.props.navigation.openDrawer()}>
                            <Image source={require('../../assets/images/sidemenu/icon-sidemenu.png')} style={{ width: 18, height: 16, marginLeft: 12 }}/>
                        </TouchableOpacity>
                    </Left>
                    <Body style={styles.headerBody }>
                        <Title style={{color: '#FFF'}}>{Labels.edit_EditProfile}</Title>
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
                    <View style={styles.container}>
                        <Spinner color="#FFF" visible={this.state.spinner}/>                
                        {/* <StripeHeader imageUrl ={{uri: this.state.logo}}/> */}
                        <View style={{flexDirection: 'column', height: Dimensions.get('window').height * 0.2, width: Dimensions.get('window').width}}>
                            <ImageBackground style={{flex: 5}} source={require('../../assets/images/background-image.png')} imageStyle={{resizeMode: 'stretch', }} >
                            <View style={{alignSelf: 'center', marginTop: 'auto', marginBottom: 'auto',
                                width: Dimensions.get('window').width * 0.26,
                                height: Dimensions.get('window').width * 0.26,
                                borderRadius:  Dimensions.get('window').width * 0.13,
                                borderStyle: 'dotted',
                                borderColor: Colors.secondaryText,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderWidth: 1
                            
                            }}>

                                <View style={{alignSelf: 'center', marginTop: 'auto', marginBottom: 'auto',
                                    width: Dimensions.get('window').width * 0.24,
                                    height: Dimensions.get('window').width * 0.24,
                                    borderRadius:  Dimensions.get('window').width * 0.12,
                                
                                    backgroundColor: 'red',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                
                                }}>

                                    <Image source={{uri: this.state.logo}} style={ styles.useImageStyle }/>

                                </View>

                            </View>
                            </ImageBackground>
                        
                        </View>

                        <TouchableOpacity onPress={()=>this.changeLogo()} style={{marginTop: -10, marginBottom: 10, width: '40%', height: 20, borderRadius: 20, backgroundColor: Colors.primarySpeical, alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                            <Text style={{color: Colors.white, paddingLeft: 6}}>{Labels.edit_UploadNewImage}</Text>                            
                        </TouchableOpacity>

                        <ScrollView  contentContainerStyle={styles.contentContainer}>
                            <InputScrollView contentContainerStyle={{flex: 1}} topOffset={5}>
                                <View style={{width: Dimensions.get('window').width * 0.85, overflow: 'hidden' , borderRadius: 10, backgroundColor: 'white', alignItems: 'center', marginTop: 5}}>
                                    
                                    <View style={[styles.itemBlock, {marginTop: 20}]}>
                                        <View style={{width: Dimensions.get('window').width * 0.65, alignItems: 'flex-start'}}>
                                            <Text style={{ color: Colors.secondaryText, paddingLeft: 15}}>{Labels.edit_name}</Text>
                                        </View>
                                        
                                        <View style={{marginTop: 10, marginBottom: 8}}>
                                            <View style={styles.formControl}>                                      
                                                <TextInput style={styles.formInput} placeholder={Labels.edit_name} value={this.state.name} onChangeText={text => this.setState({name: text})}/>
                                            </View>
                                        </View> 
                                    </View>
                                    
                                    <View style={styles.itemBlock}>
                                        <View style={{width: Dimensions.get('window').width * 0.65, alignItems: 'flex-start'}}>
                                            <Text style={{ color: Colors.secondaryText, paddingLeft: 15}}>{Labels.edit_workArea}</Text>
                                        </View>

                                        <View style={{marginTop: 10,  borderColor: 'red'}}>                           
                                            <RNPickerSelect
                                                placeholder={placeholder_workArea}
                                                items={WorkAreas}
                                                onValueChange={value => {
                                                    this.setState({ workArea: value});
                                                }}
                                                style={{
                                                    ...pickerSelectStyles,
                                                    iconContainer: {
                                                        top: 18,
                                                        right: 15,
                                                    },
                                                }}
                                                value={this.state.workArea}
                                                useNativeAndroidPickerStyle={false}
                                                
                                                Icon={() => {                                        
                                                    return (<Triangle style={styles.triangleDown}/>)}}
                                            />
                                        </View>
                                    </View>

                                    <View style={styles.itemBlock}>
                                        <View style={{width: Dimensions.get('window').width * 0.65, alignItems: 'flex-start'}}>
                                            <Text style={{ color: Colors.secondaryText, paddingLeft: 15}}>{Labels.edit_city}</Text>
                                        </View>
                                        
                                        <View style={{ marginBottom: 8}}>
                                            <View style={styles.formControl}>                                      
                                                <TextInput style={styles.formInput} placeholder={Labels._job_title} value={this.state.city} onChangeText={text => this.setState({city: text})}/>
                                            </View>
                                        </View> 
                                    </View>

                                    {/* <View style={styles.itemBlock}>
                                        <View style={{width: Dimensions.get('window').width * 0.65, alignItems: 'flex-start'}}>
                                            <Text style={{ color: Colors.secondaryText, paddingLeft: 15}}>{Labels.eidt_hourlyRate}</Text>
                                        </View>
                                        
                                        <View style={{marginTop: 10, marginBottom: 8}}>
                                            <View style={styles.formControl}>                                      
                                                <TextInput style={styles.formInput} placeholder={Labels._job_title} value={this.state.hourlyRate} onChangeText={text => this.setState({hourlyRate: text})}/>
                                            </View>
                                        </View> 
                                    </View> */}

                                    {/* <View style={styles.itemBlock}>
                                        <View style={{width: Dimensions.get('window').width * 0.65, alignItems: 'flex-start'}}>
                                            <Text style={{ color: Colors.secondaryText, paddingLeft: 15}}>{Labels.eidt_availableFromTime}</Text>
                                        </View>

                                        <View style={{marginTop: 10, marginBottom: 8}}>
                                            <TouchableOpacity style={styles.formControl}  onPress={()=>this.toggleModal()}>                                                                                      
                                                <Text style={{marginTop: 7, marginLeft: 3, }} >{this.state.availableWorkFromTime}</Text>
                                                <Image source={require('../../assets/images/icon-calendar-gray.png')} style={styles.optionIconCalendar} />
                                            </TouchableOpacity>

                                            <View style={{marginTop: -40, paddingRight: 30}}>
                                                <DatePicker
                                                    defaultDate={new Date()}
                                                    minimumDate={new Date(1920, 1, 1)}
                                                    maximumDate={new Date(2100, 12, 31)}
                                                    locale={"en"}
                                                    timeZoneOffsetInMinutes={undefined}
                                                    modalTransparent={false}
                                                    animationType={"fade"}
                                                    androidMode={"default"}                                                    
                                                    textStyle={{ color: "#FFF" }}
                                                    placeHolderTextStyle={{ color: "#FFF" }}
                                                    onDateChange={this.setDate_start}
                                                    disabled={false}                                        
                                                />
                                            </View>
                                        </View>                                    
                                    </View>  */}

                                    {/* <View style={styles.itemBlock}>
                                        <View style={{width: Dimensions.get('window').width * 0.65, alignItems: 'flex-start'}}>
                                            <Text style={{ color: Colors.secondaryText, paddingLeft: 15}}>{Labels.eidt_experience}</Text>
                                        </View>
                                        
                                        <View style={{marginTop: 10, marginBottom: 8}}>
                                            <View style={styles.formControl}>                                      
                                                <TextInput style={styles.formInput} placeholder={Labels._job_title} value={this.state.experience} onChangeText={text => this.setState({experience: text})}/>
                                            </View>
                                        </View> 
                                    </View> */}
                                   
                                    {/* <View style={styles.itemBlock}>
                                        <View style={{width: Dimensions.get('window').width * 0.65, alignItems: 'flex-start'}}>
                                            <Text style={{ color: Colors.secondaryText, paddingLeft: 15}}>{Labels.eidt_languages}</Text>
                                        </View>
                                                                            
                                        <View style={{marginTop: 10, borderColor: 'red'}}>                           
                                            <RNPickerSelect
                                                placeholder={placeholder_language}
                                                items={Languages}
                                                onValueChange={value => {
                                                    this.setState({ language: value});
                                                    this.addLanguage(value);
                                                }}
                                                style={{
                                                    ...pickerSelectStyles,
                                                    iconContainer: {
                                                        top: 18,
                                                        right: 15,
                                                    },
                                                }}
                                                value={this.state.language}
                                                useNativeAndroidPickerStyle={false}
                                                
                                                Icon={() => {                                        
                                                    return (<Triangle style={styles.triangleDown}/>)}}
                                            />
                                        </View>

                                        <View style={styles.selectedCategoryBlock}>
                                            {this.state.selectedLanguage.map((data, index)=>(
                                                <View style={styles.selectedCategory} key={index}>
                                                    <TouchableOpacity onPress={()=>this.deleteLanguage(index)}>
                                                        <Icon name="close" type="AntDesign"  style={styles.closeIcon} />
                                                    </TouchableOpacity>
                                                    <Text style={{color: '#FFF', fontSize: 17}}>{data.item}</Text>
                                                </View>
                                            ))}                                            
                                        </View>                              
                                    </View>                                   

                                    <View style={styles.itemBlock}>
                                        <View style={{width: Dimensions.get('window').width * 0.65, alignItems: 'flex-start'}}>
                                            <Text style={{ color: Colors.secondaryText, paddingLeft: 15}}>{Labels.eidt_skills}</Text>
                                        </View>

                                        <View style={{ borderColor: 'red'}}>                           
                                            <RNPickerSelect
                                                placeholder={placeholder_skills}
                                                items={Skills}
                                                onValueChange={value => {
                                                    this.setState({ skill: value});
                                                    this.addSkill(value);
                                                }}
                                                style={{
                                                    ...pickerSelectStyles,
                                                    iconContainer: {
                                                        top: 18,
                                                        right: 15,
                                                    },
                                                }}
                                                value={this.state.skill}
                                                useNativeAndroidPickerStyle={false}
                                                
                                                Icon={() => {                                        
                                                    return (<Triangle style={styles.triangleDown}/>)}}
                                            />
                                        </View>

                                        <View style={styles.selectedCategoryBlock}>
                                            {this.state.selectedSkills.map((data, index)=>(
                                                <View style={styles.selectedCategory} key={index}>
                                                    <TouchableOpacity onPress={()=>this.deleteSkill(index)}>
                                                        <Icon name="close" type="AntDesign"  style={styles.closeIcon} />
                                                    </TouchableOpacity>
                                                    <Text style={{color: '#FFF', fontSize: 17}}>{data.item}</Text>
                                                </View>
                                            ))}                                            
                                        </View>  
                                    </View> */}
                                
                                
                                    <View style={{width: Dimensions.get('window').width * 0.65, alignItems: 'flex-start'}}>
                                        <Text style={{ color: Colors.secondaryText, paddingLeft: 15}}>{Labels.eidt_aboutYou}</Text>
                                    </View>
                                    <TextInput style={{  height: 120, width: '80%', borderColor: Colors.thirdBackground, borderWidth: 1, borderRadius: 20, textAlign: 'right', textAlignVertical: 'top', padding: 10, marginBottom: 40} } blurOnSubmit={true} multiline={true} numberOfLines={10}   placeholder={Labels._job_detail}
                                        value={this.state.aboutYou} onChangeText={text => this.setState({aboutYou: text})}/>
                                
                                                                
                                </View>

                                <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', marginTop: -25 }} onPress={()=>this.saveProfile()}>
                                        <Image source={require('../../assets/images/icon-post.png')} style={{width: 50, height: 50, resizeMode: 'stretch'}}/>
                                </TouchableOpacity>

                            </InputScrollView>             
                        </ScrollView>
                    
                    </View>
                </Content>
            </Container>
        );
    }
  
}

const styles = StyleSheet.create({
    triangleDown: {
        transform: [
        {rotate: '180deg'}
        ]
    },
    useImageStyle: {
        width: Dimensions.get('window').width * 0.24,
        height: Dimensions.get('window').width * 0.24,
        borderRadius: Dimensions.get('window').width *0.12,
        // resizeMode: 'stretch'
    },
    selectedCategory: {
        paddingVertical: 1,
        paddingHorizontal: 10,
        backgroundColor: 'gray',
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 5,
        marginTop: 10


    },    
    selectedCategoryBlock: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        width: Dimensions.get('window').width * 0.65,
    },
    closeIcon: {
        fontSize: 20, 
        color: '#FFF',
        marginRight: 5
    },
    container: {
        flex: 1,
        backgroundColor: Colors.secondaryBackground,
        alignItems: 'center',
        overflow: 'hidden'
    },
    layoutDefault: {
        flex: 1
    },
    itemBlock: {
        marginTop: 5
    },
    headerBody: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentContainer: {
  
        paddingTop: 0,
     
        width: Dimensions.get('window').width * 0.85,
        overflow: 'hidden',
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
    workDayButton: {
        height: 30, 
        width: '20%', 
        alignItems: "center", 
        justifyContent: 'center', 
        borderRadius: 20, 
        borderColor: Colors.secondaryText, 
        borderWidth: 1
    },

    workDayActiveButton: {
        height: 30, 
        width: '20%', 
        alignItems: "center", 
        justifyContent: 'center', 
        borderRadius: 20, 
        backgroundColor: Colors.primarySpeical
    },
    workdayText: {
        fontSize: 12, 
        color: Colors.secondaryText
    },
    workdayActiveText: {
        fontSize: 12, 
        color: Colors.white
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
        fontFamily: 'TheSans-bold'
    },
    detailItemContent: {
        fontSize: 14,
        // fontFamily: 'arbfonts-the-sans-plain',
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
        // fontFamily: 'arbfonts-the-sans-plain'
    },
    compnayText: {
        fontSize: 16,
        color: Colors.primarySpeical,
        fontFamily: 'TheSans-bold',
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

    formControl: {
        borderColor: Colors.secondaryText, 
        borderWidth: 1,
        borderRadius: 20,
        height: 40, 
        width: Dimensions.get('window').width * 0.7,
        alignItems: 'flex-start',
        flexDirection: 'row'
    },
    formInput: {
        flex: 1,
        width: '100%',
        paddingLeft: 8,
        paddingRight: 8,
        textAlign: 'right', 
        paddingVertical: 10,
        // fontFamily: 'TheSans-plain'        
    },

    optionsControl: {
        borderColor: Colors.secondaryText, 
        borderWidth: 1,
        borderRadius: 20,
        height: 40, 
        width: Dimensions.get('window').width * 0.31,
        alignItems: 'center',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },

    optionIconDown: {
        position: 'absolute',
        right: 9,
        top: 12,
        height: 12,
        width: 12 
    },
    optionIconCalendar: {
        position: 'absolute',
        right: 9,
        top: 10,
        height: 19,
        width: 22 
    },
    optionText: {
        color: Colors.secondaryText,
        textAlign: 'left',
        marginLeft: 10, 
        fontFamily: 'TheSans-plain'
    },

    calendarContainer: {
        width:Dimensions.get('window').width * 0.85, 
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'center' 
    }

});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 15,
        paddingVertical: 8,
        width: Dimensions.get('window').width * 0.7,
        borderWidth: 0.5,
        borderColor: '#A6B3B3',
        borderRadius: 30,
        color: 'black',
        marginBottom: 20,
        textAlign: 'right'  

    },
    inputAndroid: {
        fontSize: 15,
        width: Dimensions.get('window').width * 0.7,
        paddingVertical: 7,
        borderWidth: 0.5,
        borderRadius: 30,
        color: 'black',
        marginBottom: 20,
        textAlign: 'right'  
    },
});

const pickerSelectStyles1 = StyleSheet.create({
    inputIOS: {
        fontSize: 15,
        paddingVertical: 9,
        width: Dimensions.get('window').width * 0.4,
        borderWidth: 0.5,
        borderColor: "#A6B3B3",
        borderRadius: 30,
        color: 'black',
        textAlign: 'right'  

    },
    inputAndroid: {
        fontSize: 15,
        width: Dimensions.get('window').width * 0.4,
        paddingVertical: 5,
        borderWidth: 0.5,
        borderRadius: 30,
        color: 'black',
        textAlign: 'right'  
    },
});

