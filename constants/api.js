const server = "https://foras.app/api/";
//const server = "http://10.10.10.143/api/";

const emailLoginUrl = server + "auth/login";
const socialLoginUrl = server + "auth/login/socials";

const emailRegisterUrl = server + "auth/register";
const registerProfileUrl = server + "auth/register/profile";
const getJobCategoriesUrl = server + "categories";
const createJobUrl = server + "jobs/create";
const getJobListUrl = server + "jobs/read";
const getJobDetailtUrl = server + "jobs/details/";

const getIndividualsListUrl = server + "users/individuals";

const getCorporatesListtUrl = server + "users/corporates";

const getFavoriteIndividualstUrl = server + "favorites/individuals";
const getFavoriteCorporatestUrl = server + "favorites/corporates";

const getFavoriteJobsUrl = server + "favorites/jobs";

const favoriteIndividualToggleUrl = server + "favorites/individuals/toggle";
const favoriteCorporateToggleUrl = server + "favorites/corporates/toggle";
const favoriteJobToggleUrl = server + "favorites/jobs/toggle";



const jobReviewsUrl = server + "reviews/create";
const messageUrl = server + "messages";
const sendMessagesUrl = server + "messages/create";

const notificationUrl = server + "notifications";


const editProfileUrl = server + "users/profile/update";
const uploadAvatarUrl = server + "users/profile/upload";


const api = {

    emailLogin(email, password) {
        console.log('_====emailLogin API===');        
        result = fetch(emailLoginUrl, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": email,
                "password": password,                
            })
        }).then((response) => response.json());
        
        return result;
    },

    socialLogin(name, email, login_type, logo) {
        // console.log('_====socialLogin API===', name, email, login_type);  
        console.log("===name===", name, "===email===", email, "===login_type===", login_type, "===logo===", logo)

        result = fetch(socialLoginUrl, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                // "role": 'individual',
                "name": name,
                "email": email,
                "login_type": login_type,
                "logo": logo           
            })
        }).then((response) => response.json());
        
        return result;
    },    

    socialRegister(name, email, login_type, logo, role) {
        // console.log('_====socialLogin API===', name, email, login_type);  
        console.log("===name===", name, "===email===", email, "===login_type===", login_type, "===logo===", logo)

        result = fetch(socialLoginUrl, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "role": role? 'corporate' : 'individual',
                "name": name,
                "email": email,
                "login_type": login_type,
                "logo": logo           
            })
        }).then((response) => response.json());
        
        return result;
    },    

    

    emailRegister(name, email, password, role) {
        console.log('_====emailRegister API===');        
        result = fetch(emailRegisterUrl, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "name": name,
                "email": email,
                "password": password,                
                "password_confirmation": password,
                "role": role,
                "logo": role == "individual"? "https://foras.app/profile-images/default-individual.png" : " https://foras.app/profile-images/default-corporate.png"

            })
        }).then((response) => response.json());
        
        return result;
    },

    registerIndividualProfile(UserData) {
        console.log('_====emailRegister API===');        
        result = fetch(registerProfileUrl, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + UserData.token
            },
            body: JSON.stringify({
                "address": UserData.address,
				"state": "state code",
				"city": "city code",
				"gender": UserData.gender?  "male" : "female",
				"phone": UserData.phone,
				"cv": "cv file",
                "longitude": UserData.longitude,
                "latitude": UserData.latitude
            })
        }).then((response) => response.json());
        
        return result;
    },

    registerCorporateProfile(UserData) {
        console.log('_====emailRegister API===');        
        result = fetch(registerProfileUrl, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + UserData.token
            },
            body: JSON.stringify({
                "address": UserData.address,
				"state": UserData.state,
				"city": UserData.city,				
				"phone": UserData.phone,				
				"mobile": UserData.mobile,
				"commercial_registeration": UserData.commercial,
				"sector": UserData.sector,
                "longitude": UserData.longitude,
                "latitude": UserData.latitude            

            })
        }).then((response) => response.json());
        
        return result;
    },
    //------------------ Job -----------------//
    getJobCategories(token) {
        console.log('_====getJobCategories API===');        
        result = fetch(getJobCategoriesUrl, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
        }).then((response) => response.json());
        
        return result;
    },

    createJob(PostData) {
        console.log('_====createJob API===', PostData);        
        result = fetch(createJobUrl, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + PostData.token
            },
            body: JSON.stringify({
                "job_name": PostData.job_name,
				"category_id": PostData.category_id,
				"location": PostData.location,				
				"start_date": PostData.start_date,				
				"end_date": PostData.end_date,
				"workdays": PostData.workdays,
				"workhours": PostData.workhours,
				"salary_type": PostData.salary_type,
				"salary_amount": PostData.salary_amount,    
				"languages": PostData.languages,    
				"job_details": PostData.job_details, 
            })
        }).then((response) => response.json());
        
        return result;
    },

    getJobList(token) {
        console.log('_====getJobList API===');        
        result = fetch(getJobListUrl, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },            
        }).then((response) => response.json());
        
        return result;
    },

    getJobList_sort(token, sortCategory) {
        console.log('_====getJobList_sort API===');        
        result = fetch(getJobListUrl, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
            body: JSON.stringify({
                // "sort": sortCategory,
                "orderBy": sortCategory,
                "orderDirection": 'DESC'

            })

        }).then((response) => response.json());
        
        return result;
    },

    getJobList_filter_workdays(token, filterCategory) {
        console.log('_====getJobList_filter API===');        
        result = fetch(getJobListUrl, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
            body: JSON.stringify({
                "workdays": filterCategory,        

            })

        }).then((response) => response.json());
        
        return result;
    },

    getJobList_filter_workhour(token, filterCategory) {
        console.log('_====getJobList_filter API===');        
        result = fetch(getJobListUrl, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
            body: JSON.stringify({
                "workdays": filterCategory,        

            })

        }).then((response) => response.json());
        
        return result;
    },

    getJobList_filter_compensation(token, salary_type, salary_amount) {
        console.log('_====getJobList_filter API===');        
        result = fetch(getJobListUrl, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
            body: JSON.stringify({
                "salary_type": salary_type,
                "salary_amount": salary_amount
            })

        }).then((response) => response.json());
        
        return result;
    },    

    getJobList_filter_Period (token, Period , salary_amount) {
        console.log('_====getJobList_filter API===');        
        result = fetch(getJobListUrl, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
            body: JSON.stringify({
                "Period ": Period ,
                "salary_amount": salary_amount
            })

        }).then((response) => response.json());
        
        return result;
    }, 
    
    getJobDetail(token, id) {
        console.log('_====getJobDetail API===');
        var url =  getJobDetailtUrl + id ;
        result = fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },            
        }).then((response) => response.json());
        
        return result;
    },    
    
    //-------------Individual------------//
    getIndividualsList(token) {
        console.log('_====getIndividualsList API===');        
        result = fetch(getIndividualsListUrl, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },            
        }).then((response) => response.json());
        
        return result;
    },

    getIndividualsList_sort(token, sortCategory) {
        console.log('_====getIndividualsList API===');        
        result = fetch(getIndividualsListUrl, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
            body: JSON.stringify({
                // "sort": sortCategory, 
                "orderBy": sortCategory,
                "orderDirection": 'DESC'
            })      
        }).then((response) => response.json());
        
        return result;
    },

    getIndividualsList_filter_workdays(token, filterCategory) {
        console.log('_====getJobList_filter API===');        
        result = fetch(getIndividualsListUrl, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
            body: JSON.stringify({
                "workdays": filterCategory,        

            })

        }).then((response) => response.json());
        
        return result;
    },

    getIndividualsList_filter_workhour(token, filterCategory) {
        console.log('_====getJobList_filter API===');        
        result = fetch(getIndividualsListUrl, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
            body: JSON.stringify({
                "workdays": filterCategory,        

            })

        }).then((response) => response.json());
        
        return result;
    },

    getIndividualsList_filter_compensation(token, salary_type, salary_amount) {
        console.log('_====getJobList_filter API===');        
        result = fetch(getIndividualsListUrl, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
            body: JSON.stringify({
                "salary_type": salary_type,
                "salary_amount": salary_amount
            })

        }).then((response) => response.json());
        
        return result;
    },    

    getIndividualsList_filter_Period (token, Period , salary_amount) {
        console.log('_====getJobList_filter API===');        
        result = fetch(getIndividualsListUrl, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
            body: JSON.stringify({
                "Period ": Period ,
                "salary_amount": salary_amount
            })

        }).then((response) => response.json());
        
        return result;
    }, 

    getIndividualDetail(token, id) {
        console.log('_====getIndividualDetail API===');
        var url =  getIndividualsListUrl + '/' + id ;
        result = fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },            
        }).then((response) => response.json());
        
        return result;
    },

    //-------------Corporate-------------//
    getCorporatesList(token) {
        console.log('_====getCorporatesList API===');        
        result = fetch(getCorporatesListtUrl, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },            
        }).then((response) => response.json());
        
        return result;
    },

    getCorporatesList_sort(token, sortCategory) {
        console.log('_====getCorporatesList API===');        
        result = fetch(getCorporatesListtUrl, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
            body: JSON.stringify({
                // "sort": sortCategory,
                "orderBy": sortCategory,
                "orderDirection": 'DESC'
            })       
        }).then((response) => response.json());
        
        return result;
    },

    getCorporatesDetail(token, id) {
        console.log('_====getCorporatesDetail API===');   
        var url =  getCorporatesListtUrl + '/' + id ;
        result = fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },            
        }).then((response) => response.json());
        
        return result;
    },

    jobReviews(jobReviewsData) {
        console.log('_====jobReviews API===');        
        result = fetch(jobReviewsUrl, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
            body: JSON.stringify({
                // "job_id": jobReviewsData.job_id,
				// "corporate_id": jobReviewsData.corporate_id,
				"receiver_id": jobReviewsData.receiver_id,				
				"marks": jobReviewsData.marks,				
				"comment": jobReviewsData.comment,
            })     
        }).then((response) => response.json());
        
        return result;
    },

    //------------Favorite--------------//
    
    getFavoriteIndividuals(token) {
        console.log('_====getFavoriteIndividuals API===');        
        result = fetch(getFavoriteIndividualstUrl, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },            
        }).then((response) => response.json());
        
        return result;
    },

    getFavoriteCorporates(token) {
        console.log('_====getFavoriteCorporates API===');        
        result = fetch(getFavoriteCorporatestUrl, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },            
        }).then((response) => response.json());
        
        return result;
    },

    getFavoriteJobs(token) {
        console.log('_====getFavoriteJobs API===');        
        result = fetch(getFavoriteJobsUrl, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },            
        }).then((response) => response.json());
        
        return result;
    },  

    favoriteIndividualToggle(token, individual_id) {
        console.log('_====favoriteIndividualToggle API===');        
        result = fetch(favoriteIndividualToggleUrl, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
            body: JSON.stringify({
                "individual_id": individual_id
            })

        }).then((response) => response.json());
        
        return result;
    }, 

    favoriteCorporateToggle(token, corporate_id) {
        console.log('_====favoriteIndividualToggle API===');        
        result = fetch(favoriteCorporateToggleUrl, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
            body: JSON.stringify({
                "corporate_id": corporate_id
            })

        }).then((response) => response.json());
        
        return result;
    },

    favoriteJobToggle(token, job_id) {
        console.log('_====favoriteJobToggle API===');        
        result = fetch(favoriteJobToggleUrl, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
            body: JSON.stringify({
                "job_id": job_id
            })

        }).then((response) => response.json());
        
        return result;
    }, 
    

    //---------------Message-----------//
    message(token) {
        console.log('_====message API===');        
        result = fetch(messageUrl, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },            
        }).then((response) => response.json());
        
        return result;
    },

     sendMessages(token, receiver_id, job_id, message, subject, type) {             
        result = fetch(sendMessagesUrl, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
            body: JSON.stringify({
                "receiver_id": receiver_id,
                "job_id": job_id,
                "subject": subject,
				"message": message,
                "type": type
            })
        }).then((response) => response.json());
        
        return result;
    },

    //---------------Notification-------//
    notification(token) {
        console.log('_====notification API===');        
        result = fetch(notificationUrl, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },            
        }).then((response) => response.json());
        
        return result;
    },

    //---------------Edit Profile-------//

    userEditProfile(userEditProfileData) {
        // console.log('_====editProfileData API===', userEditProfileData);        
        result = fetch(editProfileUrl, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + userEditProfileData.token
            },
            body: JSON.stringify({
                "name": userEditProfileData.name,
				"work_area": userEditProfileData.work_area,
				"city": userEditProfileData.city,				
				"hourly_rate": userEditProfileData.hourly_rate,				
				"available_work_from_time": userEditProfileData.available_work_from_time,
				"experience": userEditProfileData.experience,
				"languages": userEditProfileData.languages,
				"skills": userEditProfileData.skills,
				"about_me": userEditProfileData.about_me,    
				"role": userEditProfileData.role,  
            })
        }).then((response) => response.json());
        
        return result;
    },

    companyEditProfile(companyEditProfileData) {
        // console.log('_====companyEditProfile API===', userEditProfileData);        
        result = fetch(editProfileUrl, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + companyEditProfileData.token
            },
            body: JSON.stringify({
                "name": companyEditProfileData.name,
				"work_area": companyEditProfileData.work_area,
				"city": companyEditProfileData.city,
				"about_me": companyEditProfileData.about_me,    
				"role": companyEditProfileData.role,  
            })
        }).then((response) => response.json());
        
        return result;
    },

    uploadAvatar (token, imageFile){        
        console.log("===uploadAvatar Api===", imageFile);    
        let uploadData = new FormData(); 
        uploadData.append('logo', {
            type: 'image/png',             
            uri: imageFile,
            name: 'photo.png',
        })

        console.log("upload data", uploadData)

        result = fetch(uploadAvatarUrl, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
                Authorization: 'Bearer ' + token 
            },
            body: uploadData            
        }).then((response) => response.json());
        
        return result;
    },
    

    

    

    

    

}

module.exports = api;