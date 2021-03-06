import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableHighlight
} from 'react-native';

export default class detail extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {productTitle} = this.props.route.params;
        return (
            <View style={styles.container}>
                <TouchableHighlight onPress={this._pressBackButton.bind(this)}>
                    <Text style={styles.back}>返回</Text>
                </TouchableHighlight>
                <Text style={styles.text}>
                    {productTitle}
                </Text>
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
        backgroundColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 20
    },
    back: {
        fontSize: 20,
        color: 'blue'
    }
});