import React, { Component } from 'react'
import {
    View,
    Text,
    Navigator,
    StyleSheet,
    WebView,
    TextInput,
    DeviceEventEmitter
} from 'react-native'

import NavigationBar from '../common/NavigationBar'
import ViewUtils from '../util/ViewUtils'

const URL = 'http://www.imooc.com'
const TRENDING_URL = 'https://github.com/';
export default class RepositoryDetail extends Component{
    constructor(props){
        super(props)
        this.url = this.props.item.html_url?this.props.item.html_url:TRENDING_URL+this.props.item.fullName
        let title = this.props.item.full_name?this.props.item.full_name:this.props.item.fullName
        this.state = {
            url: this.url,
            title: title,
            canGoBack: false
        }
    }
    onBack(){
        if( this.state.canGoBack ){
            this.webView.goBack()
        }else{
            this.props.navigator.pop()
        }
    }
    go(){
        this.setState({
            url: this.text
        })
    }
    onNavigationStateChange(e){
        this.setState({
            canGoBack: e.canGoBack,
            url: e.url,
        })
    }
    render(){
        return(
            <View style={styles.container}>
                <NavigationBar
                    title={this.state.title}
                    style={{backgroundColor: '#6495ED'}}
                    leftButton={ViewUtils.getLeftButton(()=>this.onBack())}
                />
                <WebView
                    ref={webView=>this.webView=webView}
                    source={{uri:this.state.url}}
                    onNavigationStateChange={(e)=>this.onNavigationStateChange(e)}
                    startInLoadingState={true}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tips: {
        fontSize: 20
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10
    },
    input: {
        height: 40,
        flex: 1,
        borderWidth: 1,
        margin: 2
    }
})
