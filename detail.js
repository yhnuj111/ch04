import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';

export default class detail extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>
                    详情页面
                </Text>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'gray',
        alignItems: 'center'
    },
    text: {
        fontSize: 20
    }
});