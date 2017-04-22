/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Navigator,
    DeviceEventEmitter
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Toast,{DURATION} from 'react-native-easy-toast'
import PopularPage from './PopularPage'
import TrendingPage from './TrendingPage'
import AsyncStorageTest from '../../AsyncStorageTest'
import MyPage from './my/MyPage'
import WebViewTest from '../../WebViewTest'
export default class HomePage extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedTab: 'tb_popular'
        }
    }
    componentDidMount(){
        this.listener = DeviceEventEmitter.addListener('showToast',(text)=>{
            this.toast.show(text,DURATION.LENGTH_LONG)
        })
    }
    componentWillUnmount(){
        this.listener && this.listener.remove()
    }
    _renderTab(Component, selectTab, title, renderIcon){
        return <TabNavigator.Item
            selected={this.state.selectedTab === selectTab}
            selectedTitleStyle={{color:'#2196F3'}}
            title={title}
            renderIcon={() => <Image style={styles.image} source={renderIcon} />}
            renderSelectedIcon={() => <Image style={[styles.image, {tintColor: '#2196F3'}]} source={renderIcon} />}
            onPress={() => this.setState({ selectedTab: selectTab })}>
            <Component {...this.props} />
        </TabNavigator.Item>
    }
    render() {
        return (
            <View style={styles.container}>
                <TabNavigator>
                    {this._renderTab(PopularPage, 'tb_popular', '最热', require('../../res/images/ic_polular.png'))}
                    {this._renderTab(TrendingPage, 'tb_trending', '趋势', require('../../res/images/ic_trending.png'))}
                    {this._renderTab(AsyncStorageTest, 'tb_favorite', '收藏', require('../../res/images/ic_trending.png'))}
                    {this._renderTab(MyPage, 'tb_my', '我的', require('../../res/images/ic_trending.png'))}
                </TabNavigator>
                <Toast ref={toast=>this.toast=toast}></Toast>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    page1: {
        flex: 1,
        backgroundColor: 'red'
    },
    page2: {
        flex: 1,
        backgroundColor: 'yellow'
    },
    image: {
        height: 22,
        width: 22
    }
});
