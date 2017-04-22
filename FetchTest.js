import React, { Component } from 'react'
import {
    View,
    Text,
    Navigator,
    TouchableOpacity,
    Image,
    StyleSheet
} from 'react-native'
import NavigationBar from './NavigationBar'
import HttpUtils from './HttpUtils'

export default class FetchTest extends Component{
    constructor(props){
        super(props)
        this.state = {
            result: ''
        }
    }
    load(url){
        /*fetch(url)
            .then(response => response.json())
            .then(result => {
                this.setState({
                    result: JSON.stringify(result)
                })
            })
            .catch(error => {
                this.setState({
                    result: JSON.stringify(error)
                })
            })*/
            HttpUtils.get(url)
                .then(result => {
                    this.setState({
                        result: JSON.stringify(result)
                    })
                })
                .catch(error => {
                    this.setState({
                        result: JSON.stringify(error)
                    })
                })

    }
    submitUser() {
        /*fetch('http://rap.taobao.org/mockjsdata/15837/submitUser?username=sss&password=123456', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: 'sss',
                password: '123456'
            })
        })
        .then(response => response.json())
        .then(result => {
            this.setState({
                result: JSON.stringify(result)
            })
        })
        .catch(error => {
            this.setState({
                result: JSON.stringify(error)
            })
        })*/
        HttpUtils.post('http://rap.taobao.org/mockjsdata/15837/submitUser')
            .then(result => {
                this.setState({
                    result: JSON.stringify(result)
                })
            })
            .catch(error => {
                this.setState({
                    result: JSON.stringify(error)
                })
            })
    }
    render(){
        return(
            <View style={styles.container}>
                <NavigationBar
                    title={'Fetch的使用'}
                />
                <Text
                    onPress={()=>this.load('http://rap.taobao.org/mockjsData/15837/queryUserList')}
                >获取数据</Text>
                <Text onPress={()=>this.submitUser()}>提交数据</Text>
                <Text>返回结果：{this.state.result}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
})
