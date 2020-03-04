    
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

import Modal from "react-native-modal";
import Dash from 'react-native-dash';

import api from '../../constants/api';
import {PostData, Languages, Salary_types} from '../../constants/Constants';


import Colors from '../../constants/Colors';
import { Labels } from '../../constants/Langs';

import StripeHeader from '../../components/StripeHeader';


export default class JobPostScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            spinner: false,
            job_name: '',
            jobCategory: [],
            category_id: '',
            location: '',
            start_date: Labels._job_start_date,
            end_date: Labels._job_end_date,
            workdays: 'monday, tuesday',
            workhours: [
                {
                    label: 'morning', 
					value: 'morning',
                },
                {
                    label: 'evening', 
					value: 'evening',
                },
                {
                    label: 'late night', 
					value: 'late night',
                },
            ],
            workhour: '',
            salary_amount: '',
            salary_type: '',
            language: '',      
            selectedSkills: [],
            job_details: '',
           

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
        this.setDate_end = this.setDate_end.bind(this);
    }

    setDate_start(newDate) {
        var momentDate = moment(newDate).format("YYYY-MM-DD");
        this.setState({ start_date: momentDate});
    }
    setDate_end(newDate) {
        var momentDate = moment(newDate).format("YYYY-MM-DD");
        this.setState({ end_date: momentDate});
    }

    componentDidMount(){
        this.setState({spinner: true});
        api.getJobCategories(global.token).then((res)=>{
            console.log('getJobCategories response____');  
            console.log(res);
            if(res.status == 200){
                this.setState({spinner: false});
                var jobCategory = [];
                res.data.map((data, index)=>(
                    jobCategory[index]= {
                        label: data.category_name, 
                        value: data.id,
                    }
                ));
                this.setState({jobCategory: jobCategory});
                console.log("=====jobCategory=====", this.state.jobCategory)
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
        
        // this.setState({ isModalVisible: !this.state.isModalVisible });
    };

    onWorkdayButton = (workday) => {
        if(workday == 1){
            this.setState({isMonday: !this.state.isMonday});
        }

        switch(workday) {
            case 1:
                this.setState({isMonday: !this.state.isMonday});
                break;
            case 2:
                this.setState({isTuesday: !this.state.isTuesday});
                break;
            case 3:
                this.setState({isWednesday: !this.state.isWednesday});
                break;
            case 4:
                this.setState({isThursday: !this.state.isThursday});
                break;
            case 5:
                this.setState({isFriday: !this.state.isFriday});
                break;
            case 6:
                this.setState({isSaturday: !this.state.isSaturday});
                break;
            case 7:
                this.setState({isSunday: !this.state.isSunday});
                break;
            default:
                this.setState({isMonday: !this.state.isMonday});
        }

    }

    addSkill=(value)=>{
        var selectedSkillArray = this.state.selectedSkills.push({item: value});
    }

    deleteSkill =(index)=>{
        console.log("==========index=========", index);
        var deletedSkill = this.state.selectedSkills.splice(index, 1)
        this.setState({selectedSkills: this.state.selectedSkills});
        console.log("==========selectedSkills=========", this.state.selectedSkills)
    }

    createJob(){
        this.setState({spinner: true});
        var selectedSkillArray = '';
        this.state.selectedSkills.map((data, index)=>{
            selectedSkillArray += data.item + ", "
        })

        var selectWeekdays = '';

        if(this.state.isMonday){
            selectWeekdays = 'monday, ';
        }
        if(this.state.isTuesday){
            selectWeekdays += 'tuesday, ';
        }
        if(this.state.isWednesday){
            selectWeekdays += 'wednesday, ';
        }
        if(this.state.isThursday){
            selectWeekdays += 'thursday, ';
        }
        if(this.state.isFriday){
            selectWeekdays += 'friday, ';
        }
        if(this.state.isSaturday){
            selectWeekdays += 'saturday, ';
        }
        if(this.state.isSunday){
            selectWeekdays += 'sunday';
        }

        console.log("========select Weekdays======", selectWeekdays)

        PostData.job_name = this.state.job_name
        PostData.category_id = this.state.category_id
        PostData.location = this.state.location			
        PostData.start_date = this.state.start_date				
        PostData.end_date = this.state.end_date
        PostData.workdays = selectWeekdays
        PostData.workhours = this.state.workhour
        PostData.salary_type = this.state.salary_type
        PostData.salary_amount = this.state.salary_amount
        PostData.languages = selectedSkillArray
        PostData.job_details = this.state.job_details
        PostData.token = global.token
        // console.log("===PostData===", PostData) 


        api.createJob(PostData).then((res)=>{
            console.log('createJob response____');  
            console.log(res);
            if(res.status == 200){
                this.setState({spinner: false});
                this.props.navigation.replace('JobList');
            }else{
                Alert.alert(
                    '',
                    [typeof(res.errors.job_name) == "undefined" ? "" : res.errors.job_name.toString()]  + " " + 
                    [typeof(res.errors.category_id) == "undefined" ? "": res.errors.category_id.toString()] + " " +
                    [typeof(res.errors.location) == "undefined" ? "": res.errors.location.toString()] + " " +
                    [typeof(res.errors.start_date) == "undefined" ? "": res.errors.start_date.toString()] + " " +
                    [typeof(res.errors.end_date) == "undefined" ? "": res.errors.end_date.toString()] + " " +
                    [typeof(res.errors.workdays) == "undefined" ? "": res.errors.workdays.toString()] + " " +
                    [typeof(res.errors.workhours) == "undefined" ? "": res.errors.workhours.toString()] + " " +
                    [typeof(res.errors.salary_type) == "undefined" ? "": res.errors.salary_type.toString()] + " " +
                    [typeof(res.errors.salary_amount) == "undefined" ? "": res.errors.salary_amount.toString()] + " " +
                    [typeof(res.errors.languages) == "undefined" ? "": res.errors.languages.toString()] + " " +
                    [typeof(res.errors.job_details) == "undefined" ? "": res.errors.job_details],
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
        
        const placeholder_jobCategory = {
            label: Labels._job_select_field,
            value: null,
            color: 'green',
        };
        
        const placeholder_workhour = {
            label: Labels._job_workinghours,
            value: null,
            color: 'green',
        };

        const placeholder_job_payment_method = {
            label: Labels._job_payment_method,
            value: null,
            color: 'green',
        };
        
        const placeholder_language = {
            label: Labels._job_select_language,
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
                        <Title style={{color: '#FFF'}}>اضافة وظيفة جديدة</Title>
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
                        <StripeHeader imageUrl ={{uri: global.loginInfo.logo}}/>                        
                        <View style={{
                            width:'100%',    
                            backgroundColor:'#8C2800',
                            alignItems: "center",
                            height: 50,
                            justifyContent: "center",
                            width: Dimensions.get('window').width * 0.85,
                            borderRadius: 10,
                            marginBottom: 20
                        }}>
                            <Text style={{color: 'white'}}>يمكنك نشر 3 وظائف</Text>
                        </View>
                        <ScrollView  contentContainerStyle={styles.contentContainer}>
                            <InputScrollView contentContainerStyle={{flex: 1}} topOffset={5}>
                                <View style={{width: Dimensions.get('window').width * 0.85, overflow: 'hidden' , borderRadius: 10, backgroundColor: 'white', alignItems: 'center', marginTop: 5}}>
                                    
                                    <Text style={{fontFamily: 'TheSans-bold', marginTop:15 }}>{Labels._job_post_title}</Text>
                                    <Dash style={{width: '90%', height: 1, marginTop: 10,}} dashColor={Colors.thirdBackground}></Dash>

                                    <View style={{marginTop: 10, marginBottom: 8}}>
                                        <View style={styles.formControl}>                                      
                                            <TextInput style={styles.formInput} placeholder={Labels._job_title} value={this.state.job_name} onChangeText={text => this.setState({job_name: text})}/>
                                        </View>
                                    </View> 
                                    <View style={{width: Dimensions.get('window').width * 0.65, alignItems: 'flex-start'}}>
                                        <Text style={{ color: Colors.secondaryText, paddingLeft: 15}}>{Labels._job_field}</Text>
                                    </View>

                                    {/* <View style={{marginTop: 10, marginBottom: 8}}>
                                        <View style={styles.formControl}>                                      
                                            <TextInput style={styles.formInput} placeholder={Labels._job_select_field} value={this.state.category_id} onChangeText={text => this.setState({category_id: text})}/>
                                            <Image source={require('../../assets/images/login/icon-down.png')} style={styles.optionIconDown} />
                                            
                                        </View>
                                    </View>  */}
                                    <View style={{marginTop: 10, marginBottom: 8, borderColor: 'red'}}>                           
                                        <RNPickerSelect
                                            placeholder={placeholder_jobCategory}
                                            items={this.state.jobCategory}
                                            onValueChange={value => {
                                                this.setState({ category_id: value});
                                            }}
                                            style={{
                                                ...pickerSelectStyles,
                                                iconContainer: {
                                                    top: 18,
                                                    right: 15,
                                                },
                                            }}
                                            value={this.state.category_id}
                                            useNativeAndroidPickerStyle={false}
                                            
                                            Icon={() => {                                        
                                                return (<Triangle style={styles.triangleDown}/>)}}
                                        />
                                    </View>

                                    <View style={{marginTop: 10, marginBottom: 8}}>
                                        <View style={styles.formControl}>                                      
                                            <TextInput style={styles.formInput} placeholder={Labels._job_location} value={this.state.location} onChangeText={text => this.setState({location: text})}/>
                                        </View>
                                    </View> 

                                    <View style={{width: Dimensions.get('window').width * 0.65, alignItems: 'flex-start'}}>
                                        <Text style={{ color: Colors.secondaryText, paddingLeft: 15}}>{Labels._job_duaration}</Text>
                                    </View>

                                    <View style={{marginTop: 10, marginBottom: 8}}>
                                        <TouchableOpacity style={styles.formControl}  onPress={()=>this.toggleModal()}>                                      
                                            {/* <TextInput style={styles.formInput} placeholder={Labels._job_start_date} value={this.state.start_date} onChangeText={text => this.setState({start_date: text})}/> */}
                                            <Text style={{marginTop: 7, marginLeft: 3, color: Colors.secondaryText}} >{this.state.start_date}</Text>
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
                                                // placeHolderText="Select date"
                                                textStyle={{ color: "#FFF" }}
                                                placeHolderTextStyle={{ color: "#FFF" }}
                                                onDateChange={this.setDate_start}
                                                disabled={false}                                        
                                            />
                                        </View>
                                    </View>                             

                                    <View style={{marginTop: 10, marginBottom: 8}}>
                                        <TouchableOpacity style={styles.formControl}  onPress={()=>this.toggleModal()}>                                                                       
                                            <Text style={{marginTop: 7, marginLeft: 3, color: Colors.secondaryText }} >{this.state.end_date}</Text>
                                            <Image source={require('../../assets/images/icon-calendar-gray.png')} style={[styles.optionIconCalendar, {zIndex: 9}]} />
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
                                                // placeHolderText="Select date"
                                                textStyle={{ color: "#FFF" }}
                                                placeHolderTextStyle={{ color: "#FFF" }}
                                                onDateChange={this.setDate_end}
                                                disabled={false}                                        
                                            />
                                        </View>
                                    </View> 
                                    

                                    <View style={{width: Dimensions.get('window').width * 0.65, alignItems: 'flex-start'}}>
                                        <Text style={{ color: Colors.secondaryText, paddingLeft: 15}}>{Labels._job_workdays}</Text>
                                    </View>

                                    <View style={{ flex: 3, width: '95%', marginBottom: 5}}>
                                        <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 15}}>
                                            <TouchableOpacity style={this.state.isSaturday ? styles.workDayActiveButton :  styles.workDayButton} onPress={()=>this.onWorkdayButton(6)}>
                                                <Text style={this.state.isSaturday ? styles.workdayActiveText : styles.workdayText}>{Labels._modal_workdays_sat}</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={this.state.isSunday ? styles.workDayActiveButton :  styles.workDayButton} onPress={()=>this.onWorkdayButton(7)}>
                                                <Text style={this.state.isSunday ? styles.workdayActiveText : styles.workdayText}>{Labels._modal_workdays_sun}</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={this.state.isMonday ? styles.workDayActiveButton :  styles.workDayButton} onPress={()=>this.onWorkdayButton(1)}>
                                                <Text style={this.state.isMonday ? styles.workdayActiveText : styles.workdayText}>{Labels._modal_workdays_mon}</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={this.state.isTuesday ? styles.workDayActiveButton :  styles.workDayButton} onPress={()=>this.onWorkdayButton(2)}>
                                                <Text style={this.state.isTuesday ? styles.workdayActiveText : styles.workdayText}>{Labels._modal_workdays_tue}</Text>
                                            </TouchableOpacity>

                                        </View>

                                        <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 10}}>
                                            <TouchableOpacity style={this.state.isWednesday ? styles.workDayActiveButton :  styles.workDayButton} onPress={()=>this.onWorkdayButton(3)}>
                                                <Text style={this.state.isWednesday ? styles.workdayActiveText : styles.workdayText}>{Labels._modal_workdays_wed}</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={this.state.isThursday ? styles.workDayActiveButton :  styles.workDayButton} onPress={()=>this.onWorkdayButton(4)}>
                                                <Text style={this.state.isThursday ? styles.workdayActiveText : styles.workdayText}>{Labels._modal_workdays_thu}</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={this.state.isFriday ? styles.workDayActiveButton :  styles.workDayButton} onPress={()=>this.onWorkdayButton(5)}>
                                                <Text style={this.state.isFriday ? styles.workdayActiveText : styles.workdayText}>{Labels._modal_workdays_fri}</Text>
                                            </TouchableOpacity>
                                            <View style={{height: 30, width: '20%'}}>
                                                
                                            </View>

                                        </View>

                                    </View>

                                    <View style={{width: Dimensions.get('window').width * 0.65, alignItems: 'flex-start'}}>
                                        <Text style={{ color: Colors.secondaryText, paddingLeft: 15}}>{Labels._job_workhours}</Text>
                                    </View>

                            

                                    <View style={{marginTop: 10, marginBottom: 8}}>
                                        {/* <View style={styles.formControl}>                                      
                                            <TextInput style={styles.formInput} placeholder={Labels._job_workinghours} value={this.state.workhours} onChangeText={text => this.setState({workhours: text})}/>
                                            <Image source={require('../../assets/images/login/icon-down.png')} style={styles.optionIconDown} />
                                        </View> */}
                                        <View style={{marginTop: 10, marginBottom: 8, borderColor: 'red'}}>                           
                                        <RNPickerSelect
                                            placeholder={placeholder_workhour}
                                            items={this.state.workhours}
                                            onValueChange={value => {
                                                this.setState({ workhour: value});
                                            }}
                                            style={{
                                                ...pickerSelectStyles,
                                                iconContainer: {
                                                    top: 18,
                                                    right: 15,
                                                },
                                            }}
                                            value={this.state.workhour}
                                            useNativeAndroidPickerStyle={false}
                                            
                                            Icon={() => {                                        
                                                return (<Triangle style={styles.triangleDown}/>)}}
                                        />
                                    </View>
                                    </View> 

                                    <View style={{width: Dimensions.get('window').width * 0.65, alignItems: 'flex-start'}}>
                                        <Text style={{ color: Colors.secondaryText, paddingLeft: 15}}>{Labels._job_fare}</Text>
                                    </View>

                                    <View style={{marginTop: 10, marginBottom: 8, flexDirection : 'row', justifyContent: 'flex-start'}}>
                                        {/* <View style={[styles.formControl, {width: '40%'}]}>                                      
                                            <TextInput style={styles.formInput} placeholder={Labels._job_payment_method} value={this.state.salary_type} onChangeText={text => this.setState({salary_type: text})}/>
                                            <Image source={require('../../assets/images/login/icon-down.png')} style={styles.optionIconDown} />
                                        </View> */}

                                        <RNPickerSelect
                                            placeholder={placeholder_job_payment_method}
                                            items={Salary_types}
                                            onValueChange={value => {
                                                this.setState({ salary_type: value});
                                            }}
                                            style={{
                                                ...pickerSelectStyles1,
                                                iconContainer: {
                                                    top: 18,
                                                    right: 15,
                                                },
                                            }}
                                            value={this.state.salary_type}
                                            useNativeAndroidPickerStyle={false}
                                            
                                            Icon={() => {                                        
                                                return (<Triangle style={styles.triangleDown}/>)}}
                                        />                                

                                        <View style={[styles.formControl, {width: '30%', marginLeft: 30}]}>                                      
                                            <TextInput style={styles.formInput} value={this.state.salary_amount} keyboardType="numeric" onChangeText={text => this.setState({salary_amount: text})}/>
                                        </View>
                                    </View> 
                                    <View style={{width: Dimensions.get('window').width * 0.65, alignItems: 'flex-start'}}>
                                        <Text style={{ color: Colors.secondaryText, paddingLeft: 15}}>{Labels._job_language_require}</Text>
                                    </View>

                                    {/* <View style={{marginTop: 10, marginBottom: 8}}>
                                        <View style={styles.formControl}>                                      
                                            <TextInput style={styles.formInput} placeholder={Labels._job_select_language} value={this.state.languages} onChangeText={text => this.setState({languages: text})}/>
                                            <Image source={require('../../assets/images/login/icon-down.png')} style={styles.optionIconDown} />
                                        </View>
                                    </View>  */}

                                    <View style={{marginTop: 10, marginBottom: 8, borderColor: 'red'}}>                           
                                        <RNPickerSelect
                                            placeholder={placeholder_language}
                                            items={Languages}
                                            onValueChange={value => {
                                                this.setState({ language: value});
                                                this.addSkill(value);
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
                                        {this.state.selectedSkills.map((data, index)=>(
                                            <View style={styles.selectedCategory} key={index}>
                                                <TouchableOpacity onPress={()=>this.deleteSkill(index)}>
                                                    <Icon name="close" type="AntDesign"  style={styles.closeIcon} />
                                                </TouchableOpacity>
                                                <Text style={{color: '#FFF', fontSize: 17}}>{data.item}</Text>
                                            </View>
                                        ))}                                            
                                    </View> 

                                    <TextInput style={{marginTop: 15,  height: 120, width: '80%', borderColor: Colors.thirdBackground, borderWidth: 1, borderRadius: 20, textAlign: 'right', textAlignVertical: 'top', padding: 10, marginBottom: 40} } blurOnSubmit={true} multiline={true} numberOfLines={10}   placeholder={Labels._job_detail}
                                        value={this.state.job_details} onChangeText={text => this.setState({job_details: text})}/>
                                
                                </View>

                                <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', marginTop: -25 }} onPress={()=>this.createJob()}>
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
    headerBody: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
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
        paddingVertical: 10
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
        paddingVertical: 9,
        width: Dimensions.get('window').width * 0.7,
        borderWidth: 1,        
        borderColor: Colors.secondaryText,
        borderRadius: 30,
        color: 'black',
        marginBottom: 20,
        textAlign: 'right'  

    },
    inputAndroid: {
        fontSize: 15,
        width: Dimensions.get('window').width * 0.7,
        paddingVertical: 7,
        borderWidth: 1,
        borderColor: Colors.secondaryText,
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
        borderWidth: 1,        
        borderColor: Colors.secondaryText,
        borderRadius: 30,
        color: 'black',
        marginBottom: 20,
        textAlign: 'right'  

    },
    inputAndroid: {
        fontSize: 15,
        width: Dimensions.get('window').width * 0.4,
        paddingVertical: 5,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: Colors.secondaryText,
        color: 'black',
        marginBottom: 20,
        textAlign: 'right'  
    },
});

