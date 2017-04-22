import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Navigator,
    TextInput,
    ListView,
    RefreshControl,
    DeviceEventEmitter
} from 'react-native';

import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view'
import NavigationBar from '../common/NavigationBar'
import HomePage from './HomePage'
import DataRepository,{FLAG_STORAGE} from '../expand/dao/DataRepository'
import RepositoryCell from '../common/RepositoryCell'
import RepositoryDetail from '../pages/RepositoryDetail'
import LanguageDao, {FLAG_LANGUARE} from '../expand/dao/LanguageDao'

const URL = 'https://api.github.com/search/repositories?q='
const QUERY_STR = '&sort=starts'

export default class PopularPage extends Component{
    constructor(props){
        super(props)
        this.languageDao = new LanguageDao(FLAG_LANGUARE.flag_key)
        this.state = {
            languages: []
        }
    }
    componentDidMount(){
        this.loadData()
    }
    loadData(){
        this.languageDao.fetch()
            .then(result=>{
                this.setState({
                    languages: result
                })
            })
            .catch(error=>{
                console.log(error)
            })
    }
    render(){
        let content = this.state.languages.length>0 ? <ScrollableTabView
                tabBarBackgroundColor="#2196F3"
                tabBarInactiveTextColor="mintcream"
                tabBarActiveTextColor="white"
                tabBarUnderlineStyle={{backgroundColor:'#e7e7e7',height:2}}
                renderTabBar={()=><ScrollableTabBar/>}
            >
                {this.state.languages.map((result, i, arr)=>{
                    let lan=arr[i];
                    return lan.checked? <PopularTab key={i} tabLabel={lan.name} {...this.props}>JAVA</PopularTab>:null
                })}
            </ScrollableTabView>:null
        return <View style={styles.container}>
            <NavigationBar
                title={'最热'}
                statusBar={{
                    backgroundColor: '#2196F3'
                }}
            />
            {content}
        </View>
    }
}

class PopularTab extends Component{
    constructor(props){
        super(props)
        this.dataRepository = new DataRepository(FLAG_STORAGE.flag_popular)
        this.state = {
            result: '',
            dataSource: new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2}),
            isLoading: false
        }
    }
    componentDidMount(){
        this.loadData();
    }
    loadData(){
        this.setState({
            isLoading: true
        })
        let url = URL+this.props.tabLabel+QUERY_STR
        this.dataRepository.fetchRepository(url)
            .then(result => {
                let items = result&&result.items ? result.items : result ? result : []
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(items),
                    isLoading: false
                })
                if(result&&result.update_data&&!this.dataRepository.checkData(result.update_data)){
                    DeviceEventEmitter.emit('showToast','数据过期')
                    return this.dataRepository.fetchNetRepository(url)
                }else{
                    DeviceEventEmitter.emit('showToast','显示缓存数据')
                }
            })
            .then(items=>{
                if(!items || items.length===0) return;
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(items)
                })
                DeviceEventEmitter.emit('showToast','显示网络数据')
            })
            .catch(error => {
                this.setState({
                    result: JSON.stringify(error)
                })
            })
    }
    onSelect(item){
        this.props.navigator.push({
            component: RepositoryDetail,
            params: {
                item: item,
                ...this.props
            }
        })
    }
    renderRow(data){
        return <RepositoryCell
            onSelect={()=>this.onSelect(data)}
            key={data.id}
            data={data}
        />
    }
    render(){
        return <View style={{flex:1}}>
            <ListView
                dataSource={this.state.dataSource}
                renderRow={(data)=>this.renderRow(data)}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.isLoading}
                        onRefresh={()=>this.loadData()}
                        colors={['#2196F3']}
                        tintColor={'#2196F3'}
                        title={'Loading...'}
                        titleColor={'#2196F3'}
                    />}
            />
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tips: {
        fontSize: 18
    }
})
