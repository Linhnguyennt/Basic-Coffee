import React, { Component } from 'react';
import { Text, FlatList } from 'react-native';
import { Card, ListItem, Avatar } from 'react-native-elements';
import { ScrollView } from 'react-native-virtualized-view';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';
import * as Animatable from 'react-native-animatable';

class RenderLeadership extends Component {
  render() {
    if (this.props.isLoading) {
      return (
        <Card>
          <Card.Title>Corporate Leadership</Card.Title>
          <Card.Divider />
          <Loading />
        </Card>
      );
    } else if (this.props.errMess) {
      return (
        <Card>
          <Card.Title>Corporate Leadership</Card.Title>
          <Card.Divider />
          <Text>{this.props.errMess}</Text>
        </Card>
      );
    } else {
      return (
        <Card>
          <Card.Title>Corporate Leadership</Card.Title>
          <Card.Divider />
          <FlatList data={this.props.leaders}
            renderItem={({ item, index }) => this.renderLeaderItem(item, index)}
            keyExtractor={(item) => item.id.toString()} />
        </Card>
      );
    }
  }
  renderLeaderItem(item, index) {
    return (
      <ListItem key={index}>
        <Avatar rounded source={{ uri: baseUrl + item.image }} />
        <ListItem.Content>
          <ListItem.Title style={{ fontWeight: 'bold' }}>{item.name}</ListItem.Title>
          <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    );
  }
}
class RenderHistory extends Component {
  render() {
    return (
      <Card>
        <Card.Title>About Us</Card.Title>
        <Card.Divider>
          <Text style={{ margin: 10 }}>
            Started in 2020, Coffee Basics quickly established itself as a premier coffee destination in the heart of the city. With its commitment to quality, cozy atmosphere, and exceptional customer service, Coffee Basics has become a beloved gathering place for coffee lovers in the area. Whether you're looking for a morning pick-me-up, a place to meet friends, or a cozy spot to relax with a good book, Coffee Basics has you covered.
          </Text>
          <Text style={{ margin: 10 }}>
            Our dedicated team of baristas, led by our passionate and experienced head barista, ensures that every cup of coffee is expertly brewed to perfection. We carefully source the finest coffee beans from around the world, ensuring a rich and flavorful experience with every sip.
          </Text>
          <Text style={{ margin: 10 }}>
            At Coffee Basics, we believe that coffee is more than just a beverage—it's a way of life. We strive to create a welcoming and inclusive space where coffee enthusiasts can come together to indulge in their passion for coffee and connect with like-minded individuals.
          </Text>
          <Text style={{ margin: 10 }}>
            We invite you to visit Coffee Basics and experience the artistry of coffee-making firsthand. Whether you're a seasoned coffee connoisseur or new to the world of specialty coffee, our knowledgeable staff will guide you through our menu and help you discover the perfect coffee to suit your taste.
          </Text>
        </Card.Divider>
      </Card>
    );
  }
}
// redux
import { connect } from 'react-redux';
const mapStateToProps = (state) => {
  return {
    leaders: state.leaders
  }
};

class About extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <ScrollView>
        <Animatable.View animation='fadeInDown' duration={2000} delay={1000}>
          <RenderHistory />
        </Animatable.View>
        <Animatable.View animation='fadeInUp' duration={2000} delay={1000}>
          <RenderLeadership
            leaders={this.props.leaders.leaders}
            isLoading={this.props.leaders.isLoading}
            errMess={this.props.leaders.errMess} />
        </Animatable.View>

      </ScrollView>
    );
  }
}
export default connect(mapStateToProps)(About);