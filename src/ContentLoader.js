import React, { useEffect } from 'react';
import { View, Animated, Dimensions, StyleSheet, I18nManager } from 'react-native';
import MaskedView from '@react-native-community/masked-view';
import Svg, { LinearGradient, Defs, Rect, Stop } from 'react-native-svg';

const { width } = Dimensions.get('window');
const translateYValue = new Animated.Value(0);
const animatedStyle = {
    transform: [{ translateX: translateYValue }],
    width: width,
    left: -width,
    backgroundColor: 'transparent',
    zIndex: 2
};
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
        flex: 1,
    }
});

const BackgroundComponent = (props) => {
    return <View style={{...styles.container, backgroundColor: props.backColor}}/>;
}

const ContentLoader = (props) => {
    const { MaskedElement } = props || {};
    let { forColor, backColor } = props || {};
    
    forColor = !!forColor ? forColor : '#CBCBCB';
    backColor = !!backColor ? backColor : '#E0E0E0';
    
    
    
    const show = () => {
        let { duration, delay } = props;
        duration = !!duration ? duration : 1200;
        delay = !!delay ? delay : 0;
        Animated.loop(Animated.timing(translateYValue, {
            toValue: !I18nManager.isRTL ? (2 * width) : (-2 * width),
            duration,
            delay,
            useNativeDriver: true,
        })).start();
    }

    const getAnimationElement = (forColor) => {
        return (
            React.createElement(Svg, { height: "100%", preserveAspectRatio: "xMinYMin slice", width: "100%", viewBox: "0 0 100 100" },
            React.createElement(Defs, null,
            React.createElement(LinearGradient, { id: "grad", x1: "0", y1: "0.5", x2: "1", y2: "0.5" },
            React.createElement(Stop, { offset: "0", stopColor: forColor, stopOpacity: "0" }),
            React.createElement(Stop, { offset: "0.3", stopColor: forColor, stopOpacity: "1" }),
            React.createElement(Stop, { offset: "0.7", stopColor: forColor, stopOpacity: "1" }),
            React.createElement(Stop, { offset: "1", stopColor: forColor, stopOpacity: "0" }))),
            React.createElement(Rect, { x: "0", y: "0", width: "100%", height: "100%", fill: "url(#grad)" }))
        );
    }

    useEffect(() => {
        show()
    }, []);

    return (
        React.createElement(MaskedView, { maskElement: MaskedElement },
        React.createElement(BackgroundComponent, { backColor: backColor }),
        React.createElement(Animated.View, { style: animatedStyle }, getAnimationElement(forColor)))
    );
}



export default ContentLoader;