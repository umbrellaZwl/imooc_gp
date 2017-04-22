import React, { Component } from 'react'
import {
    View,
    Text,
    Navigator,
    StyleSheet
} from 'react-native'

import Girl from './girl'
import NavigationBar from './NavigationBar'

export default class Boy extends Component{
    constructor(props){
        super(props)
        this.state = {
            what: ''
        }
    }
    render(){
        return(
            <View style={styles.container}>
                <NavigationBar
                    title={'Boy'}
                    style={{
                        backgroundColor: 'red',
                    }}
                />
                <Text>我是男孩</Text>
                <Text onPress={()=>{
                    let _this = this
                    let navigator = this.props.navigator
                    navigator.push({
                        name: 'Girl',
                        component: Girl,
                        params: {
                            id: 2,
                            setWord(girlWord) {
                                _this.setState({
                                    what: girlWord
                                })
                            }
                        }
                    })
                }}>点我送一支玫瑰给女孩</Text>
                <Text>我收到的礼物：{this.state.what}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'gray'
    }
})
