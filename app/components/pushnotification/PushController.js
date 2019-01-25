
import React, { Component } from 'react';

import { connect } from 'react-redux';
import PushNotification from 'react-native-push-notification';
import { 
  Alert
} from 'react-native';
import {acceptGroupRequest,rejectGroupRequest, setpushnotification_token, getGroups} from '../../actions'

var push_titles = {
  "recommend_venue": "Venue Notification!",
  "comment_candidate": "Venue Notification!",
  "leave_group": "Group Notification!",
  "join_group_request": "Group Notification!",
  "pushtest": "Test!",
}
class PushController extends Component {
  constructor(props){
    super(props);
    var phone = this.props.user.phone
    var self = this
    PushNotification.configure({
       // (optional) Called when Token is generated (iOS and Android)
      onRegister: function(token) {
          let params = {
            phone: phone,
            token: token.token
          }
          setpushnotification_token(params)
      },
      onNotification: function(notification) {
        let data = notification.data
        const username = data.username
        const group_id = data.group_id
        if (data.notification_type == 'join_group_request') {
          Alert.alert(
            'Invite to group',
            `${username} has invited you to their group, Would you like to join?`,
            [
                {text: 'Accept', onPress: () => {self.acceptGroupInvite(group_id)}},
                {text: 'Reject', onPress: () => {self.rejectGroupInvite(group_id)}},
            ],
            { cancelable: false }
          )
        } else {
          if (phone != data.callbacknumber) {
            Alert.alert(
              push_titles[data.notification_type],
              notification.message,
              [
                // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ],
              { cancelable: true }
            )
          }
        }

        let {dispatch} = props
        getGroups(phone).then((data) => {
            dispatch ({ type: 'saveGroups', data: data.data.groups });
        })
      },
      
      requestPermissions: true,
    });
  }
  acceptGroupInvite = (group) => {
    let params = {
        user_id : this.props.user._id,
        group_id : group,
        phone : this.props.user.phone
    }
    acceptGroupRequest(params).then((res)=>{
        if (res.success) {
            let {dispatch} = this.props
            getGroups(this.props.user.phone).then((data) => {
                console.log( data.data.groups)
                dispatch ({ type: 'saveGroups', data: data.data.groups });
            })
        } else {
            alert(res.error.message)
        }
    })
  }
  rejectGroupInvite = (group) =>{
      let params = {
          user_id : this.props.user._id,
          group_id : group,
          phone : this.props.user.phone
      }
      rejectGroupRequest(params).then((res)=>{
          if (res.success) {
              let {dispatch} = this.props
              getGroups(this.props.user.phone).then((data) => {
                  console.log( data.data.groups)
                  dispatch ({ type: 'saveGroups', data: data.data.groups });
              })
          } else {
              alert(res.error.message)
          }
      })
  }
  componentDidMount() {
    
  }

  render() {
    return null;
  }
}
function mapStateToProps(state) {
  return { user: state.user.userInfo }
}
export default connect(mapStateToProps, null)(PushController);