import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { I18nManager, Dimensions } from 'react-native';
import { createDrawerNavigator } from 'react-navigation-drawer';

import EmployeeDrawerContent from './EmployeeSideBar'
import EmployerDrawerContent from './EmployerSideBar'

import LoginScreen from '../screens/register/LoginScreen';
import CompanyPackage from '../screens/register/CompanyPackage';//knox
import CompanyPackagePayment from '../screens/register/CompanyPackagePayment';//knox
import EmailVerificationScreen from '../screens/register/EmailVerificationScreen';
import AddPhoneNumberScreen from '../screens/register/AddPhoneNumberScreen';
import AddSmsScreen from '../screens/register/AddSmsScreen';
import RegUserInfoScreen from '../screens/register/RegUserInfoScreen';
import RegCompanyScreen from '../screens/register/RegCompanyScreen';
import TutorialScreen from '../screens/register/TutorialScreen';

//-------------Employee-----------//
import MainScreen1 from '../screens/employee/MainScreen';
import NotificationScreen1 from '../screens/employee/NotificationScreen';
import MessageScreen1 from '../screens/employee/MessageScreen';
import FavoritJobListScreen1 from '../screens/employee/FavoritJobListScreen';
import JobListScreen1 from '../screens/employee/JobListScreen';
import CompanyListScreen1 from '../screens/employee/CompanyListScreen';
import MyProfileScreen1 from '../screens/employee/MyProfileScreen';
import JobDetailScreen1 from '../screens/employee/JobDetailScreen';
import CompanyDetailScreen1 from '../screens/employee/CompanyDetailScreen';
import MapScreen1 from '../screens/employee/MapScreen';
import EditProfileScreen1 from '../screens/employee/EditProfileScreen';
import ChatScreen from '../screens/employee/ChatScreen';


//------------Employer------------//
import MainScreen from '../screens/employer/MainScreen';
import NotificationScreen from '../screens/employer/NotificationScreen';
import MessageScreen from '../screens/employer/MessageScreen';
import FavoritUserListScreen from '../screens/employer/FavoritUserListScreen';
import JobListScreen from '../screens/employer/JobListScreen';
import JobDetailScreen from '../screens/employer/JobDetailScreen';
import UserListScreen from '../screens/employer/UserListScreen';
import UserDetailScreen from '../screens/employer/UserDetailScreen';
import MyProfileScreen from '../screens/employer/MyProfileScreen';
import JobPostScreen from '../screens/employer/JobPostScreen';
import MapScreen from '../screens/employer/MapScreen';
import EditProfileScreen from '../screens/employer/EditProfileScreen';

// import SideMenuEmployeeNav from './SideMenuEmployeeNav';

// import SideMenuEmployerNav from './SideMenuEmployerNav';

I18nManager.forceRTL(true);
const deviceWidth = Dimensions.get("window").width;

//--------------------Employee----------------------//
const Main1 = createDrawerNavigator(
    {        
        MainScreen1: MainScreen1, 
    },  
    {
        contentComponent: EmployeeDrawerContent,       
        drawerWidth: deviceWidth/1.8,        
    }
);
const Notification1 = createDrawerNavigator(
    {        
        NotificationScreen1: NotificationScreen1, 
    },  
    {
        contentComponent: EmployeeDrawerContent,       
        drawerWidth: deviceWidth/1.8,        
    }
);
const Message1 = createDrawerNavigator(
    {        
        MessageScreen1: MessageScreen1, 
    },  
    {
        contentComponent: EmployeeDrawerContent,       
        drawerWidth: deviceWidth/1.8,        
    }
);
const FavoritJobList1 = createDrawerNavigator(
    {        
        FavoritJobListScreen1: FavoritJobListScreen1, 
    },  
    {
        contentComponent: EmployeeDrawerContent,       
        drawerWidth: deviceWidth/1.8,        
    }
);
const JobList1 = createDrawerNavigator(
    {        
        JobListScreen1: JobListScreen1, 
    },  
    {
        contentComponent: EmployeeDrawerContent,       
        drawerWidth: deviceWidth/1.8,        
    }
);
const CompanyList1 = createDrawerNavigator(
    {        
        CompanyListScreen1: CompanyListScreen1, 
    },  
    {
        contentComponent: EmployeeDrawerContent,       
        drawerWidth: deviceWidth/1.8,        
    }
);
const MyProfile1 = createDrawerNavigator(
    {        
        MyProfileScreen1: MyProfileScreen1, 
    },  
    {
        contentComponent: EmployeeDrawerContent,       
        drawerWidth: deviceWidth/1.8,        
    }
);
const JobDetail1 = createDrawerNavigator(
    {        
        JobDetailScreen1: JobDetailScreen1, 
    },  
    {
        contentComponent: EmployeeDrawerContent,       
        drawerWidth: deviceWidth/1.8,        
    }
);
const CompanyDetail1 = createDrawerNavigator(
    {        
        CompanyDetailScreen1: CompanyDetailScreen1, 
    },  
    {
        contentComponent: EmployeeDrawerContent,       
        drawerWidth: deviceWidth/1.8,        
    }
);
const MapLocation1 = createDrawerNavigator(
    {       
        MapScreen1: {screen : MapScreen1},
    },  
    {
        contentComponent: EmployeeDrawerContent,
        drawerWidth: deviceWidth/1.8,
    }
);
const EditProfile1 = createDrawerNavigator(
    {       
        EditProfileScreen1: {screen : EditProfileScreen1},
    },  
    {
        contentComponent: EmployeeDrawerContent,
        drawerWidth: deviceWidth/1.8,
    }
);

const Chat = createDrawerNavigator(
    {       
        ChatScreen: {screen : ChatScreen},
    },  
    {
        contentComponent: EmployeeDrawerContent,
        drawerWidth: deviceWidth/1.8,
    }
);

//-------------------------------------------------//

//--------------------Employer---------------------//
const Main = createDrawerNavigator(
    {
        MainScreen: {screen : MainScreen},
    },  
    {
        contentComponent: EmployerDrawerContent,
        drawerWidth: deviceWidth/1.8,
    }
);
const Notification = createDrawerNavigator(
    {       
        NotificationScreen: {screen : NotificationScreen},
    },  
    {
        contentComponent: EmployerDrawerContent,
        drawerWidth: deviceWidth/1.8,
    }
);
const Message = createDrawerNavigator(
    {       
        MessageScreen: {screen : MessageScreen},
    },  
    {
        contentComponent: EmployerDrawerContent,
        drawerWidth: deviceWidth/1.8,
    }
);
const FavoritUserList = createDrawerNavigator(
    {       
        FavoritUserListScreen: {screen : FavoritUserListScreen},
    },  
    {
        contentComponent: EmployerDrawerContent,
        drawerWidth: deviceWidth/1.8,
    }
);
const JobList = createDrawerNavigator(
    {       
        JobListScreen: {screen : JobListScreen},
    },  
    {
        contentComponent: EmployerDrawerContent,
        drawerWidth: deviceWidth/1.8,
    }
);
const JobDetail = createDrawerNavigator(
    {       
        JobDetailScreen: {screen : JobDetailScreen},
    },  
    {
        contentComponent: EmployerDrawerContent,
        drawerWidth: deviceWidth/1.8,
    }
);
const UserList = createDrawerNavigator(
    {       
        UserListScreen: {screen : UserListScreen},
    },  
    {
        contentComponent: EmployerDrawerContent,
        drawerWidth: deviceWidth/1.8,
    }
);
const UserDetail = createDrawerNavigator(
    {       
        UserDetailScreen: {screen : UserDetailScreen},
    },  
    {
        contentComponent: EmployerDrawerContent,
        drawerWidth: deviceWidth/1.8,
    }
);
const MyProfile = createDrawerNavigator(
    {       
        MyProfileScreen: {screen : MyProfileScreen},
    },  
    {
        contentComponent: EmployerDrawerContent,
        drawerWidth: deviceWidth/1.8,
    }
);
const JobPost = createDrawerNavigator(
    {       
        JobPostScreen: {screen : JobPostScreen},
    },  
    {
        contentComponent: EmployerDrawerContent,
        drawerWidth: deviceWidth/1.8,
    }
);
const MapLocation = createDrawerNavigator(
    {       
        MapScreen: {screen : MapScreen},
    },  
    {
        contentComponent: EmployerDrawerContent,
        drawerWidth: deviceWidth/1.8,
    }
);
const EditProfile = createDrawerNavigator(
    {       
        EditProfileScreen: {screen : EditProfileScreen},
    },  
    {
        contentComponent: EmployerDrawerContent,
        drawerWidth: deviceWidth/1.8,
    }
);

//---------------------------------------------//


const RootStackBeforeLogIn = createStackNavigator({
    LoginScreen: {screen: LoginScreen},
    CompanyPackage: {screen: CompanyPackage},//knox
    CompanyPackagePayment: {screen: CompanyPackagePayment},//knox
    EmailVerificationScreen: { screen: EmailVerificationScreen},
    AddPhoneNumberScreen: {screen: AddPhoneNumberScreen},
    RegUserInfoScreen: {screen: RegUserInfoScreen},
    RegCompanyScreen: {screen: RegCompanyScreen},
    AddSmsScreen: { screen: AddSmsScreen},
    TutorialScreen: { screen: TutorialScreen},

    // SideMenuEmployeeNav: {screen: SideMenuEmployeeNav},
    // SideMenuEmployerNav: {screen: SideMenuEmployerNav},

    //--------------Employee------------//
    Main1: {screen: Main1},
    Notification1: {screen: Notification1},
    Message1: {screen: Message1},
    FavoritJobList1: {screen: FavoritJobList1},
    JobList1: {screen: JobList1},
    CompanyList1: {screen: CompanyList1},
    MyProfile1: {screen: MyProfile1},
    JobDetail1: {screen: JobDetail1},
    CompanyDetail1: {screen: CompanyDetail1},
    MapLocation1: {screen: MapLocation1},
    EditProfile1: {screen: EditProfile1},
    Chat: {screen: Chat},
    
    //-------------Employer------------//
    Main: {screen: Main},
    Notification: {screen: Notification},
    Message: {screen: Message},
    FavoritUserList: {screen: FavoritUserList},
    JobList: {screen: JobList},
    JobDetail: {screen: JobDetail},    
    UserList: {screen: UserList},
    UserDetail: {screen: UserDetail},
    MyProfile: {screen: MyProfile},
    JobPost: {screen: JobPost},
    MapLocation: {screen: MapLocation},
    EditProfile: {screen: EditProfile},
    
},{
    initialRouteName: 'LoginScreen',
    //initialRouteName: 'Message1',
    //initialRouteName: 'RegUserInfoScreen',
    headerMode: 'none',
})

const AppContainerBeforeLogIn = createAppContainer(RootStackBeforeLogIn);

class App extends React.Component {
    constructor(){
  
        super();
        global.logout = true;  
        // Creating Global Variable.
    }    
  
    render() {       
        console.log("render of AppNavigator")
        return (
            <AppContainerBeforeLogIn/>
        ) 
     
    }
}
  
export default App;