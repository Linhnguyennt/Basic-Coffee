import React, { Component } from 'react';
import { View, Text, FlatList, Modal, Button, PanResponder, Alert  } from 'react-native';
import { Card, Image, Icon, Rating, Input } from 'react-native-elements';
import { ScrollView } from 'react-native-virtualized-view';
import { SliderBox } from 'react-native-image-slider-box';
import { baseUrl } from '../shared/baseUrl';
import * as Animatable from 'react-native-animatable';
import * as MailComposer from 'expo-mail-composer'; 
import { Asset } from 'expo-asset';

class ModalContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 3,
      author: '',
      comment: ''
    };
  }
  render() {
    return (
      <View style={{ justifyContent: 'center', margin: 20 }}>
        <Rating startingValue={this.state.rating} showRating={true}
          onFinishRating={(value) => this.setState({ rating: value })} />
        <View style={{ height: 20 }} />
        <Input value={this.state.author} placeholder='Author' leftIcon={{ name: 'user-o', type: 'font-awesome' }}
          onChangeText={(text) => this.setState({ author: text })} />
        <Input value={this.state.comment} placeholder='Comment' leftIcon={{ name: 'comment-o', type: 'font-awesome' }}
          onChangeText={(text) => this.setState({ comment: text })} />
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Button title='SUBMIT' color='#7cc'
            onPress={() => this.handleSubmit()} />
          <View style={{ width: 10 }} />
          <Button title='CANCEL' color='#7cc'
            onPress={() => this.props.onPressCancel()} />
        </View>
      </View>
    );
  }
  handleSubmit() {
    this.props.postComment(this.props.dishId, this.state.rating, this.state.author, this.state.comment);
    this.props.onPressCancel();
  }
}
class RenderSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 30,
      height: 0
    };
  }
  render() {
    const images = [
      baseUrl + this.props.dish.image,
      baseUrl + 'images/Kimchi-noodles.jpg',
      baseUrl + 'images/logo.png'
    ];
    return (
      <Card onLayout={this.onLayout}>
        <SliderBox images={images} parentWidth={this.state.width - 30} />
      </Card>
    );
  }
  onLayout = (evt) => {
    this.setState({
      width: evt.nativeEvent.layout.width,
      height: evt.nativeEvent.layout.height,
    });
  };
}

class RenderDish extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1
    };
  }
  render() {
    
     // gesture
     const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
      if (dx < -200) return 1; // right to left
      else if(dx>200) return 2;//left to right
      return 0;
    };
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gestureState) => { return true; },
      onPanResponderEnd: (e, gestureState) => {
        if (recognizeDrag(gestureState) === 1) {
          Alert.alert(
            'Add Favorite',
            'Are you sure you wish to add ' + dish.name + ' to favorite?',
            [
              { text: 'Cancel', onPress: () => { /* nothing */ } },
              { text: 'OK', onPress: () => { this.props.favorite ? alert('Already favorite') : this.props.onPressFavorite(this.state.quantity) } },
            ]
          );
        }
        else if(recognizeDrag(gestureState)===2){
          this.props.onPressComment();
        }
        return true;
      }
    });
    // render
    const dish = this.props.dish;
    const { quantity } = this.state;
    if (dish != null) {
      return (
        <Card {...panResponder.panHandlers}>
          <Card.Title>{dish.name}</Card.Title>
          <Card.Divider />
          <Text style={{ margin: 10 }}>{dish.description}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Icon raised reverse name='cart-plus' type='font-awesome' color='#f50'
               onPress={() => this.props.cart? alert('Already cart') : this.props.onPressCart(quantity)}   />
            <Icon raised reverse name={this.props.favorite ? 'heart' : 'heart-o'} type='font-awesome' color='#f50'
              onPress={() => this.props.favorite ? alert('Already favorite') : this.props.onPressFavorite()} />
            <Icon raised reverse name='pencil' type='font-awesome' color='#f50'
              onPress={() => this.props.onPressComment()} />
            <Icon raised reverse name='share' type='font-awesome' color='#f50'
              onPress={() => this.shareDish(dish.name, dish.description, baseUrl + dish.image, dish.price)}
          />
          </View>
        </Card>
      );
    }
    return (<View />);
  }
  shareDish(title, message, image, price) {
    const asset = Asset.fromModule(image);
    asset.downloadAsync().then(() => {
      MailComposer.composeAsync({
        subject: title,
        body: `Price: $${price}\nDescription: ${message}\n`,
        attachments: [asset.localUri],
        recipients: ['<ihavebeautifullife3000@gmail.com>'],
      });
    });
  }
}
// redux
import { connect } from 'react-redux';
const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    favorites: state.favorites,
    cart: state.cart
  }
};

class RenderComments extends Component {
  render() {
    const comments = this.props.comments;
    return (
      <Card>
        <Card.Title>Comments</Card.Title>
        <Card.Divider />
        <FlatList data={comments}
          renderItem={({ item, index }) => this.renderCommentItem(item, index)}
          keyExtractor={(item) => item.id.toString()} />
      </Card>
    );
  }
  renderCommentItem(item, index) {
    return (
      <View key={index} style={{ margin: 10 }}>
        <Text style={{ fontSize: 14 }}>{item.comment}</Text>
        <Rating startingValue={item.rating} imageSize={16} readonly style={{ flexDirection: 'row' }} />
        <Text style={{ fontSize: 12 }}>{'-- ' + item.author + ', ' + item.date} </Text>
      </View>
    );
  };
}
import { postFavorite, postComment, postCart } from '../redux/ActionCreators';
const mapDispatchToProps = (dispatch) => ({
  postFavorite: (dishId) => dispatch(postFavorite(dishId)),
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  postCart: (dishId, quantity) => dispatch(postCart(dishId, quantity)),
  
  
});
class Dishdetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }

  render() {
    const dishId = parseInt(this.props.route.params.dishId);
    const dish = this.props.dishes.dishes[dishId];
    const comments = this.props.comments.comments.filter((cmt) => cmt.dishId === dishId);
    const favorite = this.props.favorites.some((el) => el === dishId);
    const cart = this.props.cart.some((el) => el === dishId);
    return (
      <ScrollView>
          <Animatable.View animation='flipInY' duration={2000} delay={1000}>
          <RenderSlider dish={dish} />
        </Animatable.View>
        <Animatable.View animation='fadeInDown' duration={2000} delay={1000}>
        <RenderDish dish={dish} cart={cart} onPressCart={(quantity) => this.markCart(dishId, quantity)} favorite={favorite} onPressFavorite={() => this.markFavorite(dishId)} onPressComment={() => this.setState({ showModal: true })} />
        </Animatable.View>
       
        <Animatable.View animation='fadeInUp' duration={2000} delay={1000}>
          <RenderComments comments={comments} />
        </Animatable.View>
        <Modal animationType={'slide'} visible={this.state.showModal}
          onRequestClose={() => this.setState({ showModal: false })}>
          <ModalContent dishId={dishId}
            onPressCancel={() => this.setState({ showModal: false })}
            postComment={this.props.postComment} />
        </Modal>
        
      </ScrollView>
    );
  }
  markFavorite(dishId) {
    this.props.postFavorite(dishId);
  }
  markCart(dishId, quantity) {
    this.props.postCart(dishId, quantity);
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);