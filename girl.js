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

export default class Girl extends Component{
    constructor(props){
        super(props)
    }
    renderButton(image){
        return(
            <TouchableOpacity
            onPress={()=>{
                this.props.navigator.pop()
            }}
            >
                <Image style={{width:22,height:22,margin:5}} source={image}></Image>
            </TouchableOpacity>
        )
    }
    render(){
        return(
            <View style={styles.container}>
                <NavigationBar
                    title={'girl'}
                    style={{
                        backgroundColor: '#EE6363'
                    }}
                    leftButton={
                        this.renderButton(require('./res/images/ic_arrow_back_white_36pt.png'))
                    }
                    rightButton={
                        this.renderButton(require('./res/images/ic_star.png'))
                    }
                />
                <Text>我是女孩</Text>
                <Text>我收到男{this.props.id}号的一枝玫瑰</Text>
                <Text onPress={()=>{
                    let navigator = this.props.navigator
                    this.props.setWord('小狗')
                    navigator.pop()
                }}>回送一个小狗</Text>
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
