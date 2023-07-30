import React, { memo, useEffect, useState, useCallback } from 'react'
import type { FC, ReactNode } from 'react'
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity
} from 'react-native'
import HomeStore from '@/store/HomeStore'
import { observer, useLocalStore } from 'mobx-react'
import icon_heart_empty from '@/assets/icon_heart_empty.png'
import FlowList from '@/components/flowlist/FlowList.js'
import ResizeImage from '@/components/ResizeImage'
import TitleBar from '@/components/TitleBar'
import CategoryList from './components/CategoryList'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
interface defineProps {
  children?: ReactNode
}
const { width: SCREEN_WIDTH } = Dimensions.get('window')
const Home: FC<defineProps> = () => {
  const homeStore = useLocalStore(() => new HomeStore())
  const navigation = useNavigation<StackNavigationProp<any>>()
  const initCategoryList = homeStore.categoryList.filter((i) => i.isAdd)
  useEffect(() => {
    homeStore.requestHomeList()
    homeStore.getCategoryList()
  }, [])
  const refreshNewData = () => {
    homeStore.resetPage()
    homeStore.requestHomeList()
  }
  const loadMoreData = () => {
    homeStore.requestHomeList()
  }
  const pressArticleItem = useCallback(
    (article: ArticleSimple) => () => {
      navigation.push('ArticleDetail', { id: article.id })
    },
    []
  )
  const Footer = () => <Text style={styles.footerTxt}>正在加载，请稍后！</Text>
  const renderItem = ({
    item,
    index
  }: {
    item: ArticleSimple
    index: number
  }) => {
    return (
      <TouchableOpacity style={styles.item} onPress={pressArticleItem(item)}>
        <View>
          <ResizeImage uri={item.image400} />
          <Text style={styles.titleTxt}>{item.title}</Text>
          <View style={styles.nameLayout}>
            <Image
              style={styles.avatarImg}
              source={{ uri: item.avatarUrl200 }}
            />
            <Text style={styles.nameTxt}>{item.userName}</Text>
            <Image style={styles.heart} source={icon_heart_empty} />
            <Text style={styles.countTxt}>{item.favoriteCount}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
  return (
    <View style={styles.root}>
      <TitleBar />
      <FlowList
        style={styles.flatList}
        data={homeStore.homeList}
        renderItem={renderItem}
        keyExtractor={(item: ArticleSimple) => `${item.title}`}
        contentContainerStyle={styles.container}
        numColumns={2}
        refreshing={homeStore.refreshing}
        onRefresh={refreshNewData}
        extraData={[homeStore.refreshing]}
        onEndReachedThreshold={0.1}
        onEndReached={loadMoreData}
        ListFooterComponent={<Footer />}
        stickyHeaderIndices={[0]}
        ListHeaderComponent={
          <CategoryList
            categoryList={initCategoryList}
            allCategoryList={homeStore.categoryList}
          />
        }
      />
    </View>
  )
}
export default observer(Home)

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0'
  },
  flatList: {
    width: '100%',
    height: '100%'
  },
  container: {
    // paddingTop: 6,
  },
  item: {
    width: (SCREEN_WIDTH - 18) >> 1,
    backgroundColor: 'white',
    marginLeft: 6,
    marginBottom: 6,
    borderRadius: 8,
    overflow: 'hidden'
  },
  titleTxt: {
    fontSize: 14,
    color: '#333',
    marginHorizontal: 10,
    marginVertical: 4
  },
  nameLayout: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 10
  },
  avatarImg: {
    width: 20,
    height: 20,
    resizeMode: 'cover',
    borderRadius: 10
  },
  nameTxt: {
    fontSize: 12,
    color: '#999',
    marginLeft: 6,
    flex: 1
  },
  heart: {
    width: 20,
    height: 20,
    resizeMode: 'contain'
  },
  countTxt: {
    fontSize: 14,
    color: '#999',
    marginLeft: 4
  },
  footerTxt: {
    width: '100%',
    fontSize: 14,
    color: '#999',
    marginVertical: 16,
    textAlign: 'center',
    textAlignVertical: 'center'
  }
})
