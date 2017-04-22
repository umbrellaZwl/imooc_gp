import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  AsyncStorage
} from 'react-native';

import NavigationBar from './js/common/NavigationBar'
import Toast, {DURATION} from 'react-native-easy-toast'

const KEY = 'flag_language_language'

export default class AsyncStorageTest extends Component{
    componentDidMount(){
        this.text = ''
    }
    onSave(){
        AsyncStorage.setItem(KEY,this.text,(error) => {
            if(!error){
                this.toast.show('保存成功',DURATION.LENGTH_LONG)
            }else{
                this.toast.show('保存失败',DURATION.LENGTH_LONG)
            }
        })
    }
    onFetch(){
        AsyncStorage.getItem(KEY,(error,result) => {
            if(!error){
                if((result !== '') && (result !== null)){
                    // this.toast.show(result)
                    this.toast.show('取出的内容为：'+result,DURATION.LENGTH_LONG)
                }else{
                    this.toast.show('取出的内容为空')
                }
            }else{
                this.toast.show('取出出错')
            }
        })
    }
    onRemove(){
        AsyncStorage.removeItem(KEY,(error) => {
            if(!error){
                this.toast.show('移除成功')
            }else{
                this.toast.show('移除失败')
            }
        })
    }
    render(){
        return(<View style={styles.container}>
            <NavigationBar
                title={'AsyncStorageTest'}
                statusBar={{
                    backgroundColor: '#2196F3'
                }}
            />
            <TextInput
                style={{height:30,borderWidth:1,margin:5}}
                onChangeText={text=>this.text=text}
            />
            <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                <Text onPress={this.onSave.bind(this)}>保存</Text>
                <Text onPress={this.onRemove.bind(this)}>移除</Text>
                <Text onPress={this.onFetch.bind(this)}>取出</Text>
            </View>
            <Toast ref={toast=>this.toast=toast} />
        </View>)
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1
    }
})
