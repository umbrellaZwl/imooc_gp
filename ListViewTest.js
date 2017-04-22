import React, { Component } from 'react'
import {
    View,
    Text,
    Navigator,
    TouchableOpacity,
    Image,
    StyleSheet,
    ListView,
    RefreshControl
} from 'react-native'
import NavigationBar from './NavigationBar'
import Toast, {DURATION} from 'react-native-easy-toast'

const data = [
    {
        "email": '111@163.com',
        "fullName": "张一张一张一张一张一"
    },
    {
        "email": '222@163.com',
        "fullName": "张二张二张二张二张二"
    },
    {
        "email": '333@163.com',
        "fullName": "张三张三张三张三张三"
    },
    {
        "email": '444@163.com',
        "fullName": "张四张四张四张四张四"
    },
    {
        "email": '555@163.com',
        "fullName": "张五张五张五张五张五"
    },
    {
        "email": '555@163.com',
        "fullName": "张五张五张五张五张五"
    },
    {
        "email": '555@163.com',
        "fullName": "张五张五张五张五张五"
    },
    {
        "email": '555@163.com',
        "fullName": "张五张五张五张五张五"
    },
    {
        "email": '555@163.com',
        "fullName": "张五张五张五张五张五"
    },
    {
        "email": '555@163.com',
        "fullName": "张五张五张五张五张五"
    },
    {
        "email": '555@163.com',
        "fullName": "张五张五张五张五张五"
    },
    {
        "email": '555@163.com',
        "fullName": "张五张五张五张五张五"
    },
    {
        "email": '555@163.com',
        "fullName": "张五张五张五张五张五"
    },
    {
        "email": '555@163.com',
        "fullName": "张五张五张五张五张五"
    },
    {
        "email": '555@163.com',
        "fullName": "张五张五张五张五张五"
    }
]

export default class ListViewTest extends Component{
    constructor(props){
        super(props)
        const ds = new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2})
        this.state = {
            dataSource: ds.cloneWithRows(data),
            isLoading: true
        }
        this.onLoad();
    }
    renderRow(item){
        return <View style={styles.row}>
            <TouchableOpacity
                onPress={()=>{
                    this.toast.show('你单击了:'+item.fullName, DURATION.LENGTH_LONG)
                }}
            >
                <Text style={styles.tips}>{item.fullName}</Text>
                <Text style={styles.tips}>{item.email}</Text>
            </TouchableOpacity>
        </View>
    }
    renderSeparator(sectionID, rowID, adjacentRowHighlighted){
        return <View key={rowID} style={styles.line}>
        </View>
    }
    /*renderFooter(){
        return <Image style={{width: 375, height: 100}} source={{uri:'http://a.dwstatic.com/huya/main/img/logo.png'}}></Image>
    }*/
    renderFooter(){
        return <Text style={{flex: 1, textAlign: 'center', height: 30, lineHeight: 30}}>--The End--</Text>
    }
    onLoad(){
        setTimeout(()=>{
            this.setState({
                isLoading: false
            })
        },2000)
    }
    render(){
        return(
            <View style={styles.container}>
                <NavigationBar
                    title='ListViewTest'
                />
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(item)=>this.renderRow(item)}
                    renderSeparator={(sectionID, rowID, adjacentRowHighlighted)=>this.renderSeparator(sectionID, rowID, adjacentRowHighlighted)}
                    renderFooter={()=>this.renderFooter()}
                    refreshControl={<RefreshControl
                            refreshing={this.state.isLoading}
                            onRefresh={()=>this.onLoad()}
                        />}
                />
                <Toast ref={toast=>{this.toast=toast}} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    tips: {
        fontSize: 18
    },
    row: {
        height: 50
    },
    line: {
        height: 1,
        backgroundColor: 'black'
    }
})
