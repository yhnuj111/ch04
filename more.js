import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ActivityIndicator
} from 'react-native';

export default class detail extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.container}>
               <ActivityIndicator color="purple" size="large"/>
            </View>
        );
    }
    _pressBackButton() {
        const { navigation } = this.props;
        if (navigation) {
            navigation.pop();
        }
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 20
    }
});