/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';

import setup from './js/pages/setup'

AppRegistry.registerComponent('imooc_gp', () => setup);
