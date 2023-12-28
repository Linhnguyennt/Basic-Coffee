import React, { Component } from 'react';
import { Text,ImageBackground, StyleSheet } from 'react-native';
import { Card , Button, Icon} from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import * as MailComposer from 'expo-mail-composer';
import { getDatabase, ref, child, onValue } from 'firebase/database';
const image2 = {uri: 'https://i.pinimg.com/564x/6c/ce/a8/6ccea85c558e90e6363fb1a3fa3de0bd.jpg'};

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: '',
      street: '',
      district: '',
      city: '',
      phone: '',
      fax: '',
      email: ''
    }
  }
  render() {
    return (
      <ImageBackground source={image2} resizeMode="cover" style={[styles.image,styles.container]}>

     
      <Animatable.View animation='fadeInDown' duration={2000} delay={1000}>
        <Card>
          <Card.Title>Contact Information</Card.Title>
          <Card.Divider />
          <Text style={{ margin: 10 }}>{this.state.number}, {this.state.street}</Text>
          <Text style={{ margin: 10 }}>{this.state.district}</Text>
          <Text style={{ margin: 10 }}>{this.state.city}</Text>
          <Text style={{ margin: 10 }}>Tel: {this.state.phone}</Text>
          <Text style={{ margin: 10 }}>Fax: {this.state.fax}</Text>
          <Text style={{ margin: 10 }}>Email: {this.state.email}</Text>
          <Button title=' Compose Email' buttonStyle={{ backgroundColor: '#b0c4de' }}
            icon={<Icon name='envelope-o' type='font-awesome' color='white' />}
            onPress={this.composeMail} />
        </Card>
      </Animatable.View>
      </ImageBackground>
    );

  }
  composeMail() {
    MailComposer.composeAsync({
      recipients: ['<ihavebeautifullife3000@gmail.com>'],
      subject: 'From Confusion',
      body: 'Hello my friends ...'
    });
  }
  componentDidMount() {
    const dbRef = ref(getDatabase());
    onValue(child(dbRef, 'contact/'), (snapshot) => {
      const value = snapshot.val();
      this.setState({
        number: value.address.number,
        street: value.address.street,
        district: value.address.district,
        city: value.address.city,
        phone: value.phone,
        fax: value.fax,
        email: value.email
      });
    });
  }
}
export default Contact;
const styles = StyleSheet.create({
  container: {
      flex: 4,
      // backgroundColor: '#424242',
      justifyContent: 'flex-start',
  },
  image: {
      //flex: 1,
      justifyContent: 'center',
    },
  })