import React from 'react'

import {
    FlatList
  } from "native-base";
import {ActivityIndicator } from 'react-native';


const InfiniteFlatList = (props) => {
    const {data,renderItem , pagingState,loadData,endList,setEndList} = props
    const renderFooter = () => {
        if (!endList && data.length !== 0) {
            return <ActivityIndicator size="small" />;
        } else {
            return null;
        }
    };
    const handleRefresh = () =>{
        loadData(0, true);
        setEndList(false)
    }
    const fetchMore = async() => {
        if (pagingState.loading){
          return null;
        }
        loadData(pagingState.page )   
    };          
  return (
      <>
        <FlatList
            style={{paddingLeft:18, paddingRight:18}}
            data={data}
            renderItem={({ item, index }) => renderItem(item, index)}
            refreshing={pagingState.loading}
            ListFooterComponent={renderFooter}
            onEndReached={fetchMore}
            keyExtractor={(item, index) => item.uuid.toString()}
            onEndReachedThreshold={1}
            onRefresh={handleRefresh}
        />
    </>
  )
}

export default InfiniteFlatList




