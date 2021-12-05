import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ActivityIndicator,
    Dimensions,
    Switch
} from 'react-native';
import Slider from '@react-native-community/slider';
import { WebView } from 'react-native-webview';

export default class detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFirstLoad: true,
            mapRegion: null,
            mapRegionInput: null,
            annotation: [],
            language: 'java',
            sliderValue: 5,
            isOn: false
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <WebView source={{ uri: 'http://wnacg.org/' }} style={styles.web}/>
            </View>
        );
    }
    _pressBackButton() {
        const { navigation } = this.props;
        if (navigation) {
            navigation.pop();
        }
    }
    _onRegionChange = (region) => {
        this.setState({ mapRegion: region });
    }
    _onRegionChangeComplete = (region) => {
        if (this.state.isFirstLoad) {
            this.setState({
                mapRegionInput: region,
                annotation: this._getAnnotation(region),
                isFirstLoad: false
            });
        }
    }
    _getAnnotation = (region) => {
        return [
            {
                latlong: { latitude: region.latitude, longitude: region.longitude },
                title: '你的位置'
            }
        ];
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
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    picker: {
        width: 200,
        height: 200
    },
    web: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    }
});