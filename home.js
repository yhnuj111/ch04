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
import { useNavigationContainerRef } from '@react-navigation/native';
const circleSize = 8;
const circleMargin = 5;

export default class home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 0,
      advertisements: [
        {
          url: 'https://img13.360buyimg.com/cms/jfs/t4090/228/1399180862/217278/206073fe/5874e621Nc675c6d0.jpg'
        },
        {
          url: 'https://static.porn-images-xxx.com/upload/20160612/29/29284/7.jpg'
        },
        {
          url: 'https://static.porn-images-xxx.com/upload/20160609/23/22573/20.jpg'
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
    this._startTimer();
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  renderItem({ item, index }) {
    return (
      <TouchableHighlight
        onPress={() => this.props.navigation.navigate('Details')}>
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
      <View style={styles.container}>
        <StatusBar
          backgroundColor={'blue'}
          barStyle={'default'}
          networkActivityIndicatorVisible={true}
        />
        <View style={styles.searchBar}>
          <TextInput style={styles.input} placeholder="搜索商品"
            onChangeText={(text) => {
              this.setState({ searchText: text });
              console.log(this.state.searchText);
            }}
          />
          <Button
            style={styles.button}
            title="搜索"
            onPress={() => {
              // Alert.alert('你单击了搜索按钮' + this.state.searchText, null, null);
              this.props.navigation.navigate('Detail');
            }}
          />
        </View>
        <View style={styles.advertisement}>
          <ScrollView
            ref={res => {
              this.scrollView = res;
            }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            pagingEnabled={true}>
            {this.state.advertisements.map((ad, idx) => {
              return (
                <TouchableHighlight
                  key={idx}
                  onPress={() => Alert.alert('你单击了轮播图', null, null)}>
                  <Image style={styles.advertisementContent} source={{ uri: ad.url }}></Image>
                </TouchableHighlight>
              );
            })}
          </ScrollView>
          <View style={[styles.indicator, { left: left }]}>
            {this.state.advertisements.map((ad, idx) => {
              return (
                <View key={idx} style={(idx === this.state.currentPage) ? styles.circleSelected : styles.circle}></View>
              );
            })}
          </View>
        </View>
        <View style={styles.products}>
          <FlatList data={this.state.listData} renderItem={this.renderItem}
            ItemSeparatorComponent={this._renderSeperator}
            refreshControl={this._renderRefreshControl()}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBar: {
    marginTop: 0,
    height: 40,
    flexDirection: 'row',
  },
  advertisement: {
    height: 180,
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
    height: 180,
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
