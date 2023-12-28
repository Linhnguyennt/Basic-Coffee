import React, { Component } from 'react';
import { FlatList, Text, View, TouchableOpacity, Alert, StyleSheet, ImageBackground } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import Loading from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { SwipeListView } from 'react-native-swipe-list-view';
import { deleteCart, updateQuantity, checkoutCart } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';
const image2 = { uri: 'https://i.pinimg.com/564x/6c/ce/a8/6ccea85c558e90e6363fb1a3fa3de0bd.jpg' };
// redux
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        dishes: state.dishes,
        cart: state.cart,
        checkout: state.checkout
    };
};

const mapDispatchToProps = (dispatch) => ({
    deleteCart: (dishId) => dispatch(deleteCart(dishId)),
    updateQuantity: (dishId, quantity) => dispatch(updateQuantity(dishId, quantity)),
    checkoutCart: (cart) => dispatch(checkoutCart(cart)) // Thêm checkoutCart action
});

class Cart extends Component {
    render() {
        if (this.props.dishes.isLoading) {
            return <Loading />;
        } else if (this.props.dishes.errMess) {
            return <Text>{this.props.dishes.errMess}</Text>;
        } else {
            const dishesInCart = this.props.cart.map((cartItem) => {
                const dish = this.props.dishes.dishes.find((dish) => dish.id === cartItem.dishId);
                return { ...dish, quantity: cartItem.quantity };
            });

            return (
                <ImageBackground source={image2} resizeMode="cover" style={[styles.image, styles.container]}>
                    <Animatable.View animation="fadeInRightBig" duration={2000}>
                        <SwipeListView
                            data={dishesInCart}
                            renderItem={({ item }) => this.renderCartItem(item)}
                            renderHiddenItem={({ item }) => this.renderHiddenItem(item)}
                            leftOpenValue={75}
                            rightOpenValue={-75}
                            // keyExtractor={(item) => item.id.toString()}
                        />
                    </Animatable.View>
                    <TouchableOpacity onPress={this.handleCheckout}>
                        <Text>Checkout</Text>
                    </TouchableOpacity>
                </ImageBackground>
            );
        }
    }

    handleCheckout = () => {
        const { cart, checkoutCart } = this.props;
        checkoutCart(cart);
    };

    updateQuantity = (item, newQuantity) => {
        const { dishId } = item;
        this.props.updateQuantity(dishId, newQuantity);
    };

    renderCartItem(item) {
        const { navigate } = this.props.navigation;
        const totalPrice = item.price * item.quantity;
        const { checkout } = this.props;
        return (
            <ListItem onPress={() => navigate('Dishdetail', { dishId: item.id })}>
                <Avatar source={{ uri: baseUrl + item.image }} />
                <ListItem.Content>
                    <ListItem.Title>{item.name}</ListItem.Title>
                    <ListItem.Subtitle>${item.price}</ListItem.Subtitle>
                    <ListItem.Subtitle>Quantity: {item.quantity}</ListItem.Subtitle>
                    <ListItem.Subtitle>Total: ${totalPrice}</ListItem.Subtitle>
                    <TouchableOpacity onPress={() => this.updateQuantity(item, item.quantity + 1)} style={styles.quantityButton}>
                        <Text style={styles.quantityText}>+</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.updateQuantity(item, item.quantity - 1)} style={styles.quantityButton}>
                        <Text style={styles.quantityText}>-</Text>
                    </TouchableOpacity>
                </ListItem.Content>

            </ListItem>
        );
    }

    renderHiddenItem(item) {
        return (
            <View
                style={{
                    alignItems: 'center',
                    backgroundColor: '#DDD',
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingLeft: 15,
                }}
            >
                <TouchableOpacity
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        right: 0,
                        width: 100,
                        backgroundColor: 'red',
                    }}
                    onPress={() => {
                        Alert.alert(
                            'Delete dish on cart?',
                            'Are you sure you wish to remove this dish on cart: ' + item.name + '?',
                            [
                                { text: 'Cancel', onPress: () => { } },
                                { text: 'OK', onPress: () => this.props.deleteCart(item.id) },
                            ]
                        );
                    }}
                >
                    <Text style={{ color: '#FFF' }}>Delete</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

const styles = StyleSheet.create({
    container: {
        flex: 4,
        justifyContent: 'flex-start',
    },
    image: {
        justifyContent: 'center',
    },
    quantityButton: {
        backgroundColor: '#F1F1F1',
        borderRadius: 4,
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginVertical: 4,
    },
    quantityText: {
        fontSize: 18,
    },
});
