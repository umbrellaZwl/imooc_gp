import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Navigator
} from 'react-native';

import NavigationBar from '../../common/NavigationBar'
import CustomKeyPage from './CustomKeyPage'
import SortKeyPage from './SortKeyPage'

export default class MyPage extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return <View style={styles.container}>
            <NavigationBar
                title={'我的'}
                style={{backgroundColor: '#6495ED'}}
            />
            <Text
                onPress={()=>{
                    this.props.navigator.push({
                        component: CustomKeyPage,
                        params: {...this.props}
                    })
                }}
            >自定义标签</Text>
            <Text
                onPress={()=>{
                    this.props.navigator.push({
                        component: SortKeyPage,
                        params: {...this.props}
                    })
                }}
            >标签排序</Text>
            <Text
                onPress={()=>{
                    this.props.navigator.push({
                        component: CustomKeyPage,
                        params: {
                            ...this.props,
                            isRemoveKey: true
                        }
                    })
                }}
            >移除标签</Text>
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
