# react-native-masked-loader

Creating butter smooth content and skeleton loader in react native.

***react-native-skeleton-loader*** is using ***react-native-masked-view*** and ***react-native-svg***.
you can simple create a SVG elements with an arbitry color and pass it to the library;

## Platforms Supported

- [x] iOS
- [x] Android


## Getting Started

```
$ yarn add react-native-masked-loader
```

or

```
$ npm install --save react-native-masked-loader
```

<img src="https://github.com/salmansalary/react-native-masked-loader/blob/master/preview.gif" width="200" height="380">

## Props

| Type          | Required | Description                                                       |
|---------------|----------|-------------------------------------------------------------------|
| MaskedElement | Yes      |                                                                   |
| duration      | No       | animation duration in millisecond the default is 1200             |
| delay         | No       | delay in millisecond for every round of animation default is zero |
| forColor      | No       | the animated gradient color default is #CBCBCB                    |
| backColor     | No       | the backgound of maked view the default is #E0E0E0                |


## Usage

```jsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Rect } from 'react-native-svg';
import ContentLoader from 'react-native-masked-loader';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: '35px 24px 0 24px',
    height: 285,
  }
});

function getMaskedElement() {
  return (
    <Svg height={250} width="100%" fill={'black'}>
      <Rect x="0" y="0" rx="8" ry="8" width="50%" height="16" />
      <Rect x="0" y="30" rx="9" ry="9" width="100%" height="128" />
      <Rect x="0" y="172" rx="4" ry="4" width="100%" height="8" />
      <Rect x="0" y="188" rx="4" ry="4" width="100%" height="8" />
      <Rect x="0" y="204" rx="4" ry="4" width="100%" height="8" />
    </Svg>
  );
}

export default function BOSLoader() {
  const MaskedElement = getMaskedElement();
  return (
    <View style={styles.container}>
      <ContentLoader MaskedElement={MaskedElement} />
    </View>
  );
}

```
