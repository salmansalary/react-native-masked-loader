import React, { PureComponent } from 'react';
import { View, Animated, Dimensions, StyleSheet } from 'react-native';
import MaskedView from '@react-native-community/masked-view';
import Svg, { LinearGradient, Defs, Rect, Stop } from 'react-native-svg';
const { width } = Dimensions.get('window');

const BackgroundComponent = (props) => {
    return <View style={{...styles.container, backgroundColor: props.backColor}}/>;
}

export default class ContentLoader extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            translateYValue: new Animated.Value(0),
        };
    }
    componentDidMount() {
        this.show();
    }
    show() {
        let { duration, delay } = this.props;
        duration = !!duration ? duration : 1200;
        delay = !!delay ? delay : 0;
        Animated.loop(Animated.timing(this.state.translateYValue, {
            toValue: width * 2,
            duration,
            delay,
            useNativeDriver: true,
        })).start();
    }
    getAnimationElement(forColor) {
        return (React.createElement(Svg, { height: "100%", preserveAspectRatio: "xMinYMin slice", width: "100%", viewBox: "0 0 100 100" },
            React.createElement(Defs, null,
                React.createElement(LinearGradient, { id: "grad", x1: "0", y1: "0.5", x2: "1", y2: "0.5" },
                    React.createElement(Stop, { offset: "0", stopColor: forColor, stopOpacity: "0" }),
                    React.createElement(Stop, { offset: "0.3", stopColor: forColor, stopOpacity: "1" }),
                    React.createElement(Stop, { offset: "0.7", stopColor: forColor, stopOpacity: "1" }),
                    React.createElement(Stop, { offset: "1", stopColor: forColor, stopOpacity: "0" }))),
            React.createElement(Rect, { x: "0", y: "0", width: "100%", height: "100%", fill: "url(#grad)" })));
    }
    render() {
        const { translateYValue } = this.state;
        const { MaskedElement } = this.props || {};
        const animatedStyle = {
            transform: [{ translateX: translateYValue }],
            width: width,
            left: -width,
            backgroundColor: 'transparent',
            zIndex: 2,
        };
        let { forColor, backColor } = this.props || {};
        forColor = !!forColor ? forColor : '#CBCBCB';
        backColor = !!backColor ? backColor : '#E0E0E0';
        const AnimationElement = this.getAnimationElement(forColor);
        return (React.createElement(MaskedView, { maskElement: MaskedElement },
            React.createElement(BackgroundComponent, { backColor: backColor }),
            React.createElement(Animated.View, { style: animatedStyle }, AnimationElement)));
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
        flex: 1
    }
});