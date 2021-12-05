/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TextInput,
  Button,
  ScrollView,
  Dimensions,
  FlatList,
  Alert,
  TouchableHighlight,
  StatusBar,
  Image,
  RefreshControl,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Swiper from 'react-native-swiper';
import { Container, Heading, Center, NativeBaseProvider, Box, InputGroup, Icon, Input, Stack } from 'native-base';

import More from './more';

const circleSize = 8;
const circleMargin = 5;
const Tab = createBottomTabNavigator();

class home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 0,
      advertisements: [
        {
          url: 'https://static.porn-images-xxx.com/upload/20160609/23/22574/9.jpg'
        },
        {
          url: 'https://static.porn-images-xxx.com/upload/20160612/29/29284/7.jpg'
        },
        {
          url: 'https://static.porn-images-xxx.com/upload/20160609/23/22573/20.jpg'
        },
        {
          url: 'https://static.porn-images-xxx.com/upload/20160609/23/22574/10.jpg'
        }
      ],
      searchText: '',
      isRefreshing: false,
      listData: [
        {
          url: 'https://static.porn-images-xxx.com/upload/20160609/23/22573/1.jpg',
          title: '商品1',
          subTitle: '描述1'
        },
        {
          url: 'https://static.porn-images-xxx.com/upload/20160609/23/22573/2.jpg',
          title: '商品2',
          subTitle: '描述2'
        },
        {
          url: 'https://static.porn-images-xxx.com/upload/20160609/23/22573/3.jpg',
          title: '商品3',
          subTitle: '描述3'
        },
        {
          url: 'https://static.porn-images-xxx.com/upload/20160609/23/22573/4.jpg',
          title: '商品4',
          subTitle: '描述4'
        },
        {
          url: 'https://static.porn-images-xxx.com/upload/20160609/23/22573/5.jpg',
          title: '商品5',
          subTitle: '描述5'
        },
        {
          url: 'https://static.porn-images-xxx.com/upload/20160609/23/22573/6.jpg',
          title: '商品6',
          subTitle: '描述6'
        },
        {
          url: 'https://static.porn-images-xxx.com/upload/20160609/23/22573/7.jpg',
          title: '商品7',
          subTitle: '描述7'
        },
        {
          url: 'https://static.porn-images-xxx.com/upload/20160609/23/22573/8.jpg',
          title: '商品8',
          subTitle: '描述8'
        },
        {
          url: 'https://static.porn-images-xxx.com/upload/20160609/23/22573/9.jpg',
          title: '商品9',
          subTitle: '描述9'
        },
        {
          url: 'https://static.porn-images-xxx.com/upload/20160609/23/22573/10.jpg',
          title: '商品10',
          subTitle: '描述10'
        }
      ]
    };
    this.renderItem = this.renderItem.bind(this);
  }
  componentDidMount() {
    // this._startTimer();
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  renderItem({ item, index }) {
    return (
      <TouchableHighlight
        onPress={() => {
          const navigation = this.props.navigation;
          if (navigation) {
            navigation.navigate('Details', {
              productTitle: item.title
            });
          }
        }}>
        <View style={styles.row}>
          <Image source={{ uri: item.url }} style={styles.productImage}></Image>
          <View style={styles.productText}>
            <Text style={styles.productTitle}>{item.title}</Text>
            <Text style={styles.productSubtitle}>{item.subTitle}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
  _startTimer() {
    this.interval = setInterval(() => {
      let nextPage = this.state.currentPage + 1;
      if (nextPage >= 3) {
        nextPage = 0;
      }
      this.setState({ currentPage: nextPage });
      const offSetX = nextPage * Dimensions.get('window').width;
      this.scrollView.scrollTo({
        x: offSetX,
        y: 0,
        animated: true,
      });
    }, 2000);
  }
  _renderSeperator(sectionID, rowID, adjacentRowHighlighted) {
    return (
      <View key={`${sectionID} - ${rowID}`} style={styles.divider}></View>
    );
  }
  _renderRefreshControl() {
    return (
      <RefreshControl
        onRefresh={this._onRefresh}
        refreshing={this.state.isRefreshing}
        tintColor={'#ff0000'}
        title={'正在刷新数据，请稍后...'}
        titleColor={'#0000ff'}
      ></RefreshControl>
    );
  }
  _onRefresh = () => {
    this.setState({ isRefreshing: true });
    setTimeout(() => {
      const products = Array.from(new Array(10)).map((value, idx) => ({
        image: 'https://static.porn-images-xxx.com/upload/20160609/23/22573/35.jpg',
        title: '新商品' + idx,
        subTitle: '商品描述' + idx
      }));
      this.setState({ isRefreshing: false, listData: products });
    }, 2000);
  }
  render() {
    const advertisementCount = this.state.advertisements.length;
    const indicatorWidth = circleSize * advertisementCount + circleMargin * advertisementCount * 2;
    const left = (Dimensions.get('window').width - indicatorWidth) / 2;
    return (
      <NativeBaseProvider>
        <Center flex={1}>
          <Container maxWidth="100%">
            <View style={styles.searchBar}>
              <Stack direction="row">
                <Input
                  w={{
                    base: "83%",
                    md: "25%",
                  }}
                  ml="2"
                  placeholder="搜索商品"
                  bg="gray.100"
                  borderRadius="15"
                  onChangeText={(text) => {
                    this.setState({ searchText: text });
                    console.log(`搜索的文字${this.state.searchText}`);
                  }}
                  _hover={{ bg: 'gray.200', borderWidth: 0 }}
                  placeholderTextColor="gray.500"
                  InputLeftElement={
                    <Icon
                      as={<Feather name="search" />}
                      size={5}
                      ml="2"
                      color="muted.400"
                    />
                  }
                />
                <Button
                  style={styles.button}
                  title="搜索"
                  onPress={() => {
                    // Alert.alert('你单击了搜索按钮' + this.state.searchText, null, null);
                    console.log(this.props.navigation)
                    const navigation = this.props.navigation;
                    if (navigation) {
                      navigation.navigate('Details');
                    }
                  }}
                />
              </Stack>

            </View>

            <View style={styles.advertisement}>
              <Swiper
                height={190}
                autoplay={true}
              >
                {this.state.advertisements.map((ad, idx) => {
                  return (
                    <TouchableHighlight key={idx} onPress={() => Alert.alert('你单击了轮播图', null, null)}>
                      <Image style={styles.advertisementContent} source={{ uri: ad.url }}></Image>
                    </TouchableHighlight>
                  );
                })}
              </Swiper>

            </View>
            <View style={styles.products}>
              <FlatList data={this.state.listData} renderItem={this.renderItem}
                ItemSeparatorComponent={this._renderSeperator}
                refreshControl={this._renderRefreshControl()}
              />
            </View>
          </Container>
        </Center>
      </NativeBaseProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBar: {
    marginTop: Platform.OS === 'ios' ? 35 : 0,
    height: 40,
    flexDirection: 'row',
  },
  advertisement: {
    height: 350,
  },
  products: {
    flex: 1,
  },
  input: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 10
  },
  button: {
    flex: 1,
  },
  row: {
    height: 60,
    flexDirection: 'row',
    backgroundColor: 'white'
  },
  productImage: {
    marginLeft: 10,
    marginRight: 10,
    width: 40,
    height: 40,
    alignSelf: 'center'
  },
  productText: {
    flex: 1,
    marginTop: 10,
    marginBottom: 10
  },
  productTitle: {
    flex: 3,
    fontSize: 16
  },
  productSubtitle: {
    flex: 2,
    fontSize: 14,
    color: 'gray'
  },
  divider: {
    height: 1,
    width: Dimensions.get('window').width - 5,
    marginLeft: 5,
    backgroundColor: 'lightgray'
  },
  advertisementContent: {
    width: Dimensions.get('window').width,
    height: 350,
  },
  indicator: {
    position: 'absolute',
    top: 160,
    flexDirection: 'row'
  },
  circle: {
    width: circleSize,
    height: circleSize,
    borderRadius: circleSize / 2,
    backgroundColor: 'gray',
    marginHorizontal: circleMargin
  },
  circleSelected: {
    width: circleSize,
    height: circleSize,
    borderRadius: circleSize / 2,
    backgroundColor: 'white',
    marginHorizontal: circleMargin
  }
});


export default class root extends Component {
  render() {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused
                ? 'home'
                : 'home-outline';
            } else if (route.name === 'More') {
              iconName = 'more-horizontal';
              return <Feather name={iconName} size={size} color={color} />;
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={home} options={{
          title: '首页', headerShown: false
        }}></Tab.Screen>
        <Tab.Screen name="More" component={More} options={{ title: 'More', tabBarBadge: 3 }}></Tab.Screen>
      </Tab.Navigator>
    );
  }
}