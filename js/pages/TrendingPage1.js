import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput
} from 'react-native';

import NavigationBar from '../common/NavigationBar'
import DataRepository, {FLAG_STORAGE} from '../expand/dao/DataRepository'

const KEY = 'flag_language_key'
const URL = 'https://github.com/trending/'

export default class TrendingPage extends Component{
    constructor(){
        super()
        this.dataRepository = new DataRepository(FLAG_STORAGE.flag_trending)
        this.state = {
            result: ''
        }
    }
    componentDidMount(){
        this.text = ''
    }
    onLoad(){
        let url = URL + this.text
        this.dataRepository.fetchRepository(url)
            .then(result=>{
                this.setState({
                    result: JSON.stringify(result)
                })
            })
            .catch(error=>{
                this.setState({
                    result: JSON.stringify(error)
                })
            })
    }
    render(){
        return(<View style={styles.container}>
            <NavigationBar
                title={'GitHubTrending'}
                statusBar={{
                    backgroundColor: '#2196F3'
                }}
            />
            <TextInput
                style={{height:30,borderWidth:1,margin:5}}
                onChangeText={text=>this.text=text}
            />
            <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                <Text onPress={this.onLoad.bind(this)}>加载数据</Text>
                <Text style={{flex:1}}>{this.state.result}</Text>
            </View>
        </View>)
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1
    }
})
