import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card, Image } from 'react-native-elements';
import { LEADERS } from '../shared/leaders';
class RenderLeader extends Component {
  render() {
    const leader = this.props.leader;
    if (leader != null) {
      return (
        <Card>
          <Image source={require('./images/uthappizza.png')} style={{ width: '100%', height: 100, flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Card.FeaturedTitle>{leader.name}</Card.FeaturedTitle>
          </Image>
          <Text style={{ margin: 10 }}>{leader.description}</Text>
        </Card>
      );
    }
    return (<View />);
  }
}

class Leaderdetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
          leader: LEADERS
        };
      }
  render() {
    const leaderId = parseInt(this.props.route.params.leaderId);
    const leader = this.state.leader[leaderId];
    return (
      <RenderLeader leader={leader} />
    );
  }
}
export default Leaderdetail;