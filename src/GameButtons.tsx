import React, { Component, Fragment, SyntheticEvent } from "react";
import { View, Image, TouchableOpacity, GestureResponderEvent, Animated, Easing } from 'react-native';
import { MainStyle } from "../styles/Mainstyle";
import { AlphabetButtons } from '../src/ButtonsData';

const woodHeader = require('../assets/wood_header.png');

const $difference: number = 42.5;

const positions: Array<Array<number>> = [[10, 50], [10, 50, 90], [10, 50, 90, 130], [10, 50, 90, 130, 170]]

const alphabets = AlphabetButtons;

interface IstateProps {
    fromx: number,
    fromy: number,
    tox: number,
    toy: number,
    selectedFromText: string,
    selectedToText: string,
    tappedLetter: string,
    direction: string,
    letters: Array<Array<string>>
}

class GameButtons extends Component<any, IstateProps> {

    private fromPosx: Animated.Value;
    private fromPosy: Animated.Value;

    private toPosx: Animated.Value;
    private toPosy: Animated.Value;

    private frompos: [number | null, number | null] = [null, null];
    private topos: [number | null, number | null] = [null, null];

    firstSelect: string = "";
    secondSelect: string = "";

    startingIndex: Array<number> | null;
    endingIndex: Array<number> | null;

    animationStarted: Boolean;

    constructor(props: any) {
        super(props);
        this.state = {
            fromx: 0,
            fromy: 0,
            tox: 0,
            toy: 0,
            selectedFromText: '',
            selectedToText: '',
            tappedLetter: '',
            direction: '',
            letters: [['s', 'a'], ['n', 'd', 'a'], ['y', 'm', 'r', 'a'], ['a', 'c', 't', 'r', 'o']]
        }
    }

    animationCompleted() {
        this.startingIndex = null;
        this.endingIndex = null;
        this.frompos = null;
        this.topos = null;
        this.fromPosx = null;
        this.fromPosy = null;
        this.toPosx = null;
        this.toPosy = null;
        this.firstSelect = '';
        this.secondSelect = '';
        this.animationStarted = false;
        this.setState({ tappedLetter: '' })
    }

    async reArrangePositions() {

        let [fromLettr, toLetter] = [this.state.letters[this.startingIndex[0]][this.startingIndex[1]], this.state.letters[this.endingIndex[0]][this.endingIndex[1]]]

        this.state.letters[this.startingIndex[0]].splice(this.startingIndex[1], 1, toLetter);
        this.state.letters[this.endingIndex[0]].splice(this.endingIndex[1], 1, fromLettr);

        console.log(this.state.letters.toString());

        this.setState({ letters: this.state.letters }, () => {
            this.animationCompleted();
        });
    }

    startAnimation() {

        this.animationStarted = true;

        Animated.parallel([
            Animated.timing(this.fromPosx, { toValue: this.topos[0], duration: 300, useNativeDriver: false }),
            Animated.timing(this.fromPosy, { toValue: this.topos[1], duration: 300, useNativeDriver: false }),
            Animated.timing(this.toPosx, { toValue: this.frompos[0], duration: 300, useNativeDriver: false }),
            Animated.timing(this.toPosy, { toValue: this.frompos[1], duration: 300, useNativeDriver: false })]).start(() => {
                this.reArrangePositions();
            })
    }

    shuffleAlphabets(indexs: Array<number>) {

        if (this.animationStarted) return;

        const [$name, $pos] = ['alpha-' + indexs[0] + '-' + indexs[1], this.state.tappedLetter == '' ? 'fromPos' : 'toPos'];

        if (this.state.tappedLetter == '') {
            this.startingIndex = indexs;
            this.firstSelect = $name;
            this.fromPosx = new Animated.Value(positions[indexs[0]][indexs[1]]);
            this.fromPosy = new Animated.Value(indexs[2]);
            this.frompos = [positions[indexs[0]][indexs[1]], indexs[2]];
            this.setState({ tappedLetter: $name, direction: $pos })
        } else {

            this.endingIndex = indexs;
            this.secondSelect = $name;

            if (this.firstSelect == this.secondSelect) {
                this.animationCompleted();
                return;
            }

            this.toPosx = new Animated.Value(positions[indexs[0]][indexs[1]]);
            this.toPosy = new Animated.Value(indexs[2]);
            this.topos = [positions[indexs[0]][indexs[1]], indexs[2]];
            this.setState({ tappedLetter: $name, direction: $pos })
            setTimeout(this.startAnimation.bind(this), 100);
        }
    }

    doValidation() {
        if (this.state.letters.toString() == 'a,s,a,n,d,a,r,m,y,a,c,t,o,r') {
            return false;
        }
        return true;
    }

    render() {

        if (!this.doValidation()) return null;

        /**
         * return if user clicks same button twice..!
         */

        return (
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Image source={woodHeader} style={MainStyle.Background}></Image>
                <View style={{ position: 'absolute', flexDirection: 'row', width: '85%', height: '50%', top: '43%' }} pointerEvents={'box-none'}>
                    {
                        this.state.letters.map((_values: string[], _index: number) => {
                            {
                                return <Fragment key={'alpha' + _index}>
                                    {
                                        _values.map((_alpha: string, _indx: number) => {
                                            return (
                                                <Animated.View key={'alpha-' + _index + '-' + _indx} style={{ height: '18%', width: '18%', alignItems: 'center', justifyContent: 'center', position: 'absolute', left: this.firstSelect == 'alpha-' + _index + '-' + _indx ? this.fromPosx : this.secondSelect == 'alpha-' + _index + '-' + _indx ? this.toPosx : positions[_index][_indx], top: this.firstSelect == 'alpha-' + _index + '-' + _indx ? this.fromPosy : this.secondSelect == 'alpha-' + _index + '-' + _indx ? this.toPosy : _index * $difference }}>
                                                    <TouchableOpacity onPress={(e: GestureResponderEvent) => { this.shuffleAlphabets([_index, _indx, _index * $difference]) }} style={{ alignItems: 'center' }}>
                                                        <Image source={alphabets[_alpha].uri} style={{ resizeMode: 'contain', width: '100%', height: '100%', paddingLeft: 45, paddingTop: 10 }} />
                                                    </TouchableOpacity>
                                                </Animated.View>
                                            )
                                        })
                                    }
                                </Fragment>
                            }
                        })
                    }
                </View>
            </View >
        )
    }
}

export { GameButtons }