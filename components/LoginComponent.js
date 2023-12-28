import React, { Component } from 'react';
import { View, Button } from 'react-native';
import { Input, CheckBox } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';
import { getDatabase, ref, child, get } from 'firebase/database';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
};
import { loginUser } from '../redux/ActionCreators';
const mapDispatchToProps = (dispatch) => ({
  loginUser: (userinfo) => dispatch(loginUser(userinfo))
});


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      remember: false
    }
  }
 
  render() {
    return (
      <View style={{ justifyContent: 'center', margin: 20 }}>
        <Input
          placeholder='Username'
          leftIcon={{ name: 'user-o', type: 'font-awesome' }}
          value={this.state.username}
          onChangeText={(username) => this.setState({ username })} />
        <Input
          placeholder='Password'
          leftIcon={{ name: 'key', type: 'font-awesome' }}
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })} />
        <CheckBox containerStyle={{ backgroundColor: null }}
          title='Remember Me' center
          checked={this.state.remember}
          onPress={() => this.setState({ remember: !this.state.remember })} />
        <View style={{ marginTop: 20 }}>
          <Button title='Login' color='#7cc' onPress={() => this.handleLogin()} />
        </View>
      </View>
    );
  }
  
  componentDidMount() {
    if (this.props.users.userinfo && this.props.users.userinfo.remember === true) {
      this.setState({
        username: this.props.users.userinfo.username,
        password: this.props.users.userinfo.password,
        remember: this.props.users.userinfo.remember
      });
    }
  }
  handleLogin() {
    const dbRef = ref(getDatabase());
    get(child(dbRef, 'accounts/' + this.state.username)).then((snapshot) => {
      if (snapshot.exists()) {
        const account = snapshot.val();
        if (account.password === this.state.password) {
          alert('Come on baby!');
          const userinfo = {
            username: this.state.username,
            password: this.state.password,
            remember: this.state.remember
          };
          this.props.loginUser(userinfo);
          this.props.navigation.navigate('HomeScreen');
        } else {
          alert('Invalid password!');
        }
      } else {
        alert('Invalid username!');
      }
    }).catch((error) => alert('Could not get data from firebase', error));
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);