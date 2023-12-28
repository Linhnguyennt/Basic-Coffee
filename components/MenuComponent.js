import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { ListItem, Avatar } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes
  };
};

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterPrice: '' // Lọc giá (asc: tăng dần, desc: giảm dần)
    };
  }

  // Phương thức xử lý khi người dùng chọn lọc theo giá giảm dần
  filterByDescendingPrice = () => {
    this.setState({ filterPrice: 'desc' });
  }

  // Phương thức xử lý khi người dùng chọn lọc theo giá tăng dần
  filterByAscendingPrice = () => {
    this.setState({ filterPrice: 'asc' });
  }

  // Hàm lọc danh sách món ăn dựa trên giá
  filterDishesByPrice = (dishes) => {
    const { filterPrice } = this.state;

    // Nếu không có lọc giá thì trả về danh sách món ăn ban đầu
    if (!filterPrice) {
      return dishes;
    }

    // Lọc danh sách món ăn dựa trên giá
    if (filterPrice === 'desc') {
      return dishes.slice().sort((a, b) => b.price - a.price);
    } else if (filterPrice === 'asc') {
      return dishes.slice().sort((a, b) => a.price - b.price);
    }
  }
  render() {
    const { dishes } = this.props;
    // Lấy danh sách món ăn đã được lọc theo giá
    const filteredDishes = this.filterDishesByPrice(dishes.dishes);
    if (dishes.isLoading) {
      return <Loading />;
    } else if (dishes.errMess) {
      return <Text>{dishes.errMess}</Text>;
    } else {
      return (
        <View>
          {/* Phần giao diện cho nút Lọc giá */}
          <View style={styles.filterContainer}>
            <Text style={styles.filterText}>Lọc theo giá:</Text>
            <TouchableOpacity
              style={styles.filterButton}
              onPress={this.filterByDescendingPrice}
            >
              <Text style={styles.buttonText}>Giá giảm dần</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.filterButton}
              onPress={this.filterByAscendingPrice}
            >
              <Text style={styles.buttonText}>Giá tăng dần</Text>
            </TouchableOpacity>
          </View>

          {/* Hiển thị danh sách món ăn đã được lọc */}
          <FlatGrid
            data={filteredDishes}
            itemDimension={180}
            spacing={10}
            renderItem={({ item }) => this.renderMenuItem(item)}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      );
    }
  }
  renderMenuItem(item) {
    const { navigate } = this.props.navigation;
    return (
      <Animatable.View animation='fadeInLeftBig' duration={2000}>
      <ListItem containerStyle={styles.container} underlayColor="#f2f2f2" onPress={() => navigate('Dishdetail', { dishId: item.id })}>
        <View style={styles.row}>
          <Avatar source={{ uri: baseUrl + item.image }} style={styles.photo} />
          <View style={styles.detailsContainer}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.description}>${item.price}</Text>
          </View>
        </View>
      </ListItem>
    </Animatable.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderColor: '#cccccc',
    borderWidth: 0.5,
    borderRadius: 15
  },
  photo: {
    width: 160,
    aspectRatio: 1,
    borderRadius: 100,
    marginBottom: 10,  
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#444444',
    marginBottom: 5
  },
  description: {
    textAlign: 'center',
    color: '#444444',
    marginBottom: 5
  },
  row: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginBottom: 10,
    marginTop: 10
  },
  filterText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444444'
  },
  filterButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: '#dddddd',
    marginLeft: 10,
    flex: 1
  },
  buttonText: {
    fontSize: 14,
    color: '#444444'
  },
});

export default connect(mapStateToProps)(Menu);
