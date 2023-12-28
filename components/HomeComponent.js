import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableHighlight, ImageBackground } from 'react-native';
import { Card, Image } from 'react-native-elements';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';
import * as Animatable from 'react-native-animatable';
import { RecipeCard } from '../AppStyles';

const image2 = { uri: 'https://i.pinimg.com/564x/6c/ce/a8/6ccea85c558e90e6363fb1a3fa3de0bd.jpg' };

class RenderItem extends Component {
  render() {
    if (this.props.isLoading) {
      return (<Loading />);
    } else if (this.props.errMess) {
      return (<Text>{this.props.errMess}</Text>);
    } else {
      const item = this.props.item;
      if (item != null) {
        return (
          <TouchableHighlight underlayColor="rgba(73,182,77,0.9)" style={styles.container}>
            <View style={[styles.itemContainer]}>
              <Image source={{ uri: baseUrl + item.image }} style={styles.photo} />
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.category}>{item.designation}</Text>
            </View>
          </TouchableHighlight>
        );
      }
      return (<View />);
    }
  }
}
// redux
import { connect } from 'react-redux';
const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    promotions: state.promotions,
    leaders: state.leaders,
    bestseller: state.bestseller
  }
};
class Home extends Component {
  // constructor(props) {
  //   super(props);

  // }
  render() {

    const dish = this.props.dishes.dishes.filter((dish) => dish.featured === true)[0];
    const promo = this.props.promotions.promotions.filter((promo) => promo.featured === true)[0];
    const bestseller = this.props.dishes.dishes.filter((dish) => dish.countSeller >= 100)[0];
    const leader = this.props.leaders.leaders.filter((leader) => leader.featured === true)[0];
    return (

      <ScrollView>
        <Image source={{ uri: 'https://i.pinimg.com/564x/6c/ce/a8/6ccea85c558e90e6363fb1a3fa3de0bd.jpg' }} style={{ width: '100%', height: 150, flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Card.FeaturedTitle color='#ffb6c1' >Welcome to</Card.FeaturedTitle>
          <Card.FeaturedTitle color='#ffb6c1' >Basic Coffee</Card.FeaturedTitle>
        </Image>

        <Card>
          <Card.Title>Some of the shop's outstanding dishes</Card.Title>
          <Animatable.View animation='fadeInDown' duration={2000} delay={1000}>
            <RenderItem item={dish}
              isLoading={this.props.dishes.isLoading}
              errMess={this.props.dishes.errMess} />
          </Animatable.View>
        </Card>
        <Card>
          <Card.Title>The new food is on sale</Card.Title>
          <Animatable.View animation='fadeInRight' duration={2000} delay={1000}>
            <RenderItem item={promo}
              isLoading={this.props.promotions.isLoading}
              errMess={this.props.promotions.errMess} />
          </Animatable.View>
        </Card>
        <Card>
          <Card.Title>Bestseller</Card.Title>
          <Animatable.View animation='fadeInRight' duration={2000} delay={1000}>
            <RenderItem
              item={bestseller}
              isLoading={this.props.dishes.isLoading}
              errMess={this.props.dishes.errMess}
            />
          </Animatable.View>
        </Card>


        {/* <Card>
<Animatable.View animation='fadeInRight' duration={2000} delay={1000}>
          <RenderItem item={leader}
            isLoading={this.props.leaders.isLoading}
            errMess={this.props.leaders.errMess} />
        </Animatable.View>
</Card> */}


      </ScrollView>

    );

  }
}
export default connect(mapStateToProps)(Home);

const styles = StyleSheet.create({
  container: RecipeCard.container,
  itemContainer: {
    flex: 1,
    
  },
  row: RecipeCard.row,
  photo: RecipeCard.photo,
  title: RecipeCard.title,
  category: RecipeCard.category,
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  container1: {
    flex: 1,
    // backgroundColor: '#424242',
    justifyContent: 'flex-start',
  },
  image1: {
    //flex: 1,
    justifyContent: 'center',
  },
});