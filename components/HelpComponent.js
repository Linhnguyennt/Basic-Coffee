import React, { Component } from 'react';
import { View, Text, FlatList, Modal, Button, PanResponder, Alert, TouchableOpacity  } from 'react-native';
import { Card, Image, Icon, Rating, Input } from 'react-native-elements';
import { ScrollView } from 'react-native-virtualized-view';
import { SliderBox } from 'react-native-image-slider-box';
import { baseUrl } from '../shared/baseUrl';
import CartComponent from './CartComponent'
import * as Animatable from 'react-native-animatable';
import { postmessage } from '../redux/ActionCreators';

import { connect } from 'react-redux';
const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    favorites: state.favorites
  }
};
const mapDispatchToProps = (dispatch) => ({
  postmessage: (author, comment) => dispatch(postmessage(author, comment))
});
class Help extends Component {
    constructor(props) {
        super(props);
        this.state = {
          author: '',
          comment: ''
        };
      }
render(){
    return(
        <View style={{ justifyContent: 'center', margin: 20 }}>
        <View style={{ height: 20 }} />
        <Input value={this.state.author} placeholder='Email' leftIcon={{ name: 'user-o', type: 'font-awesome' }}
          onChangeText={(text) => this.setState({ author: text })} />
        <Input value={this.state.comment} placeholder='Description' leftIcon={{ name: 'comment-o', type: 'font-awesome' }}
          onChangeText={(text) => this.setState({ comment: text })} />
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Button title='SUBMIT' color='#b0c4de'
            onPress={() => this.handleSubmit()} />
          <View style={{ width: 10 }} />
          <Button title='CANCEL' color='#b0c4de'
            onPress={() => this.props.onPressCancel()} />
        </View>
      </View>
    )
}
handleSubmit() {
    this.props.postmessage(this.state.author, this.state.comment);
    this.props.onPressCancel();
  }
}

// redux
export default connect(mapStateToProps,mapDispatchToProps)(Help);

//export default Help;