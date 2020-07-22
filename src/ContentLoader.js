import React, { useEffect, useState } from 'react';
import { View, Animated, Dimensions, StyleSheet, I18nManager } from 'react-native';
import MaskedView from '@react-native-community/masked-view';
import Svg, { LinearGradient, Defs, Rect, Stop } from 'react-native-svg';

const { width } = Dimensions.get('window');

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
    const { backColor,onLayout } = props; 
    return <View style={{ ...styles.container, backgroundColor: backColor }} onLayout={onLayout} />;
}

let dirOrigin = {
    ltr: {
        left: (I18nManager.isRTL ? -1 : 1) * -width,
    },
    rtl: {
        left: (I18nManager.isRTL ? -1 : 1) * width
    },
}

let dirDestination = {
    ltr: 2 * width,
    rtl: 2 * -width,
}

const ContentLoader = (props) => {
    const { MaskedElement } = props || {};
    let { forColor, backColor } = props || {};
    
    forColor = !!forColor ? forColor : '#CBCBCB';
    backColor = !!backColor ? backColor : '#E0E0E0';
    
    const translateYValue = new Animated.Value(0)
    const [animatedStyle, setAnimatedStyle] = useState({});
    
    const getAnimationElement = (forColor) => {
        let { dir } = props;
        return !!['top','bottom'].find(ky=> ky === dir) ? 
        (
            React.createElement(Svg, { height: "100%", width: "100%" },
            React.createElement(Defs, null,
            React.createElement(LinearGradient, { id: "grad", x1: "0.5", y1: "0", x2: "0.5", y2: "1" },
            React.createElement(Stop, { offset: "0", stopColor: forColor, stopOpacity: "0" }),
            React.createElement(Stop, { offset: "0.3", stopColor: forColor, stopOpacity: "1" }),
            React.createElement(Stop, { offset: "0.7", stopColor: forColor, stopOpacity: "1" }),
            React.createElement(Stop, { offset: "1", stopColor: forColor, stopOpacity: "0" }))),
            React.createElement(Rect, { x: "0", y: "0", width: "100%", height: "100%", fill: "url(#grad)" }))
        )
        : (
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

    const show = ()=>{

        let { dir } = props;
        const transform = !!['top','bottom'].find(ky=> ky === dir) ? [{translateY: translateYValue }] :  [{ translateX: translateYValue }];
        
        setAnimatedStyle({
            transform,
            width: width,
            backgroundColor: 'transparent',
            zIndex: 2,
            ...dirOrigin[props.dir || 'ltr']
        });
       
        let { duration, delay } = props;
        duration = !!duration ? duration : 1200;
        delay = !!delay ? delay : 0;
        
        Animated.loop(Animated.timing(translateYValue, {
            toValue:  dirDestination[props.dir || 'ltr'],
            duration,
            delay,
            useNativeDriver: true,
        })).start();

    }

    useEffect(() => {
        let { dir } = props;
        //for vertical wait for the onLayout to get the height
        if(!!['top','bottom'].find(ky=> ky === dir)) return;
        show();
    },[]);


    return (
        React.createElement(MaskedView, { maskElement: MaskedElement },
        React.createElement(BackgroundComponent, { backColor: backColor, onLayout:ev=>{
            let { dir } = props;

            //for Horizantal will happen in useeffect
            if(!['top','bottom'].find(ky=> ky === dir)) return;

            const {layout} = ev.nativeEvent;
            const {height} = layout;
            if(dir === 'bottom') {

                dirOrigin = {
                    ...dirOrigin,
                    bottom : {
                        bottom: -height
                    }
                }
    
                dirDestination = {
                    ...dirDestination,
                    bottom: -2 * height
                }

            } else {

                dirOrigin = {
                    ...dirOrigin,
                    top : {
                        top: -height
                    }
                }
    
                dirDestination = {
                    ...dirDestination,
                    top: 2 * height
                }
            }

            show();
            
        }}),
        React.createElement(Animated.View, { style: animatedStyle }, getAnimationElement(forColor)))
    );
}



export default ContentLoader;