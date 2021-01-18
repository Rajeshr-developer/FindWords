import React, { Component } from "react";
import { View, Image } from 'react-native';

const background = require('../assets/pause.png');
const levels = require('../assets/Level01.png');
const setting = require('../assets/setting.png');

class GameHeader extends Component {
    render() {
        return (
            <View style={{ position: 'absolute', flexDirection: 'row',  height: '8%', width: '100%' }}>
                <Image source={background} style={{ resizeMode: 'contain', width: '30%', height: '100%' }} />
                <Image source={levels} style={{ left: '30%', resizeMode: 'contain', width: '30%' }} />
                <Image source={setting} style={{ left: '30%', resizeMode: 'contain', width: '30%' }} />
            </View>
        )
    }
}

export default GameHeader