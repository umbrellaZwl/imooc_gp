import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Navigator,
    TouchableOpacity,
    ScrollView,
    Image,
    Alert
} from 'react-native';

import NavigationBar from '../../common/NavigationBar'
import ViewUtils from '../../util/ViewUtils'
import LanguageDao,{FLAG_LANGUARE} from '../../expand/dao/LanguageDao'
import CheckBox from 'react-native-check-box'
import ArrayUtils from '../../util/ArrayUtils'

export default class MyPage extends Component{
    constructor(props){
        super(props)
        this.languageDao = new LanguageDao(FLAG_LANGUARE.flag_key)
        this.changeValues = []
        this.isRemoveKey=this.props.isRemoveKey ? true : false
        this.state={
            dataArray: []
        }
    }
    componentDidMount(){
        this.loadData()
    }
    loadData(){
        this.languageDao.fetch()
            .then(result=>{
                this.setState({
                    dataArray: result
                })
            })
            .catch(error=>{
                console.log(error)
            })
    }
    onSave(){
        if(this.changeValues.length === 0){
            this.props.navigator.pop()
            return;
        }
        for(let i=0,l=this.changeValues.length;i<l;i++){
            ArrayUtils.remove(this.state.dataArray, this.changeValues[i])
        }
        this.languageDao.save(this.state.dataArray);
        this.props.navigator.pop()
    }
    renderView(){
        if(!this.state.dataArray||this.state.dataArray.length===0) return null;
        let len=this.state.dataArray.length
        let views=[]
        for(let i=0,l=len-2;i<l;i+=2){
            views.push(
                <View key={i}>
                    <View style={styles.item}>
                        {this.renderCheckBox(this.state.dataArray[i])}
                        {this.renderCheckBox(this.state.dataArray[i+1])}
                    </View>
                    <View style={styles.line}></View>
                </View>
            )
        }
        views.push(
            <View key={len-1}>
                <View style={styles.item}>
                    {len%2===0 ? this.renderCheckBox(this.state.dataArray[len-2]) : null}
                    {this.renderCheckBox(this.state.dataArray[len-1])}
                </View>
                <View style={styles.line}></View>
            </View>
        )
        return views;
    }
    renderCheckBox(data){
        let leftText=data.name;
        let isChecked = this.isRemoveKey ? false : data.checked
        return(
            <CheckBox
                style={{flex:1,padding:10}}
                onClick={()=>this.onClick(data)}
                leftText={leftText}
                isChecked={isChecked}
                checkedImage={<Image style={{tintColor:'#6495ED'}}
                    source={require('./img/ic_check_box.png')} />}
                unCheckedImage={<Image style={{tintColor:'#6495ED'}}
                    source={require('./img/ic_check_box_outline_blank.png')} />}
            ></CheckBox>
        )
    }
    onClick(data){
        if(!this.isRemoveKey) data.checked = !data.checked;
        ArrayUtils.updateArray(this.changeValues, data)
    }
    onBack(){
        if(this.changeValues.length===0){
            this.props.navigator.pop();
            return;
        }
        Alert.alert(
            '提示',
            '要保存修改吗？',
            [
              {text: '不保存', onPress: () => {
                  this.props.navigator.pop()
              }},
              {text: '保存', onPress: () => {
                  this.onSave();
              }},
            ]
          )
    }
    render(){
        let title = this.isRemoveKey ? '标签移除' : '自定义标签'
        let rightButtonTitle = this.isRemoveKey ? '移除' : '保存'

        return <View style={styles.container}>
            <NavigationBar
                title={title}
                style={{backgroundColor: '#6495ED'}}
                leftButton={ViewUtils.getLeftButton(()=>this.onBack())}
                rightButton={ViewUtils.getRightButton(rightButtonTitle,()=>this.onSave())}
            />
            <ScrollView>
                {this.renderView()}
            </ScrollView>
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        color: 'white'
    },
    line: {
        height: 0.3,
        backgroundColor: 'darkgray'
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})
