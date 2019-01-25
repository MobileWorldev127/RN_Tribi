export const API = {
    BASE_URL: 'http://tribi-env-1.3eief9hcp2.us-east-2.elasticbeanstalk.com/',
    //BASE_URL: 'http://localhost:3000/',
    //BASE_URL: 'https://tribi.herokuapp.com/',
    CATEGORIES: 'foursquare/categories',
    NEARVENUES: 'foursquare/popularvenues',
    VENUEDETAIL: 'foursquare/venuedetails',
	

    SETFVORITEVENUE: 'user/set_favorite_venue',
    UNSETFVORITEVENUE: 'user/unset_favorite_venue',

    GETGROUPS: 'foursquare/get_groups',
    GETFAVORITES: 'user/get_favorite_venues',
    CREATENEWGROUP: 'foursquare/create_group',
    RECOMMENDVENUE: 'foursquare/recommend_venue',
    JOINGROUPREQUEST: 'foursquare/join_group_request',
    LEAVEGROUP: 'foursquare/leave_group',
    COMMENTCANDIDATE: 'foursquare/comment_candidate',
    ACCEPTGROUPREQUEST: 'foursquare/accept_group_request',
    REJECTGROUPREQUEST: 'foursquare/reject_group_request',
    SETPUSHTOKEN: 'foursquare/setpushnotification_token',
    GETALLMEMBERS: 'foursquare/getAllMembers',
	
    LOGIN_URL: 'user/signin',
    SEND_TWOSTEPVCODE: 'user/send_two_step_vcode',
    VERIFY_TWOSTEPVCODE: 'user/verify_two_step_vcode',
    UPDATE_URL: 'user/update_profile',
    UPLOAD_PHOTO: 'user/upload_photo',
    REGISTER_URL: 'user/signup',
    RESETPASSWORD: 'user/reset_password',
    SENDFEEDBACK: 'user/sendfeedback',
    SEND_PHONEVERIFICAIONCODE: 'user/send_phone_verify_code',
    VERIFY_PHONEVCODE: 'user/verify_phone_vcode'
}