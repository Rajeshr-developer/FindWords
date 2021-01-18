import React, { Component } from 'react';
import { View, Image, ImageBackground, ScaledSize } from 'react-native';
import { MainStyle } from '../styles/Mainstyle';
import { Dimensions } from 'react-native';
import { GameButtons } from './GameButtons';
import GameHeader from './GameHeader';

const background = require('../assets/background.jpg');
const woodFooter = require('../assets/wood_footer.png');

export default class Main extends Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            gameHeight: 0,
            gameWidth: 0
        }
    }

    UNSAFE_componentWillMount() {
        const windowInfo: ScaledSize = Dimensions.get('window');
        console.log('windowInfo = ', windowInfo);
        /**
         *  Maintain equal aspect ratio for the game
         */
        let gameheight = windowInfo.width * 1.77 > windowInfo.height ? { 'h': windowInfo.height, 'w': windowInfo.height / 1.77 } : { 'h': windowInfo.width * 1.77, 'w': windowInfo.width }
        this.setState({ gameWidth: gameheight.w, gameHeight: gameheight.h })
    }

    render(): JSX.Element {
        return (
            <View style={MainStyle.GameBase}>
                <ImageBackground source={background} style={MainStyle.ImageBg}>
                    <View style={{ flexDirection: 'column', alignItems: 'center', width: this.state.gameWidth, height: this.state.gameHeight }}>
                        <GameButtons />
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Image source={woodFooter} style={MainStyle.Background}></Image>
                        </View>
                        <GameHeader />
                    </View>
                </ImageBackground>
            </View>
        )
    }
}