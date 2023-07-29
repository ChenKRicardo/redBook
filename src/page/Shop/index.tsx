import ShopStore from '@/store/ShopStore'
import { observer, useLocalStore } from 'mobx-react'
import React, { memo, useEffect } from 'react'
import type { FC, ReactNode } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity
} from 'react-native'
import icon_search from '@/assets/icon_search.png'
import icon_shop_car from '@/assets/icon_shop_car.png'
import icon_orders from '@/assets/icon_orders.png'
import icon_menu_more from '@/assets/icon_menu_more.png'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
interface defineProps {
  children?: ReactNode
}
const { width: SCREEN_WIDTH } = Dimensions.get('window')
const ITEM_WIDTH = (SCREEN_WIDTH - 18) >> 1
const Shop: FC<defineProps> = () => {
  const store = useLocalStore(() => new ShopStore())
  const navaigation = useNavigation<StackNavigationProp<any>>()
  const { categoryList } = store
  useEffect(() => {
    store.requestGoodsList()
    store.requestTop10Category()
  }, [])
  const onSearchPress = () => {
    navaigation.push('SearchGoods')
  }
  const renderTitle = () => {
    return (
      <View style={styles.titleLayout}>
        <TouchableOpacity style={styles.searchLayout} onPress={onSearchPress}>
          <Image style={styles.searchIcon} source={icon_search} />
          <Text style={styles.searchTxt}>背带裤</Text>
        </TouchableOpacity>
        <Image style={styles.menuIcon} source={icon_shop_car} />
        <Image style={styles.menuIcon} source={icon_orders} />
        <Image style={styles.menuIcon} source={icon_menu_more} />
      </View>
    )
  }
  const renderItem = ({
    item,
    index
  }: {
    item: GoodsSimple
    index: number
  }) => {
    return (
      <View style={styles.item}>
        <Image style={styles.img} source={{ uri: item.image }} />
        <Text style={styles.priceTxt}>{item.title}</Text>
        {!!item.promotion && (
          <Text style={styles.promotionTxt}>{item.promotion}</Text>
        )}
        <Text style={styles.prefix}>
          ¥
          <Text style={styles.priceTxt}>
            {item.price}
            {'  '}
            {!!item.originPrice && (
              <Text style={styles.originTxt}>原价：{item.originPrice}</Text>
            )}
          </Text>
        </Text>
      </View>
    )
  }
  const ListHeader = () => {
    return (
      <View style={styles.container}>
        {categoryList.map((item, index) => {
          return (
            <View style={styles.categoryItem} key={index}>
              <Image style={styles.itemImg} source={{ uri: item.image }} />
              <Text style={styles.itemNameTxt}>{item.name}</Text>
            </View>
          )
        })}
      </View>
    )
  }
  return (
    <View style={styles.root}>
      {renderTitle()}
      <FlatList
        style={{ flex: 1 }}
        data={store.goodsList}
        extraData={[store.categoryList]}
        renderItem={renderItem}
        numColumns={2}
        ListHeaderComponent={ListHeader}
      />
    </View>
  )
}
export default observer(Shop)

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white'
  },
  titleLayout: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16
  },
  searchLayout: {
    height: 32,
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16
  },
  searchIcon: {
    width: 18,
    height: 18
  },
  searchTxt: {
    fontSize: 14,
    color: '#bbb',
    marginLeft: 6
  },
  menuIcon: {
    width: 22,
    height: 22,
    marginHorizontal: 6
  },
  container: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  categoryItem: {
    width: '20%',
    alignItems: 'center',
    paddingVertical: 16
  },
  itemImg: {
    width: 40,
    height: 40,
    resizeMode: 'contain'
  },
  itemNameTxt: {
    fontSize: 14,
    color: '#333',
    marginTop: 6
  },
  item: {
    width: ITEM_WIDTH,
    borderRadius: 8,
    overflow: 'hidden',
    marginLeft: 6,
    marginTop: 6
  },
  img: {
    width: '100%',
    height: 200,
    resizeMode: 'cover'
  },
  titleTxt: {
    fontSize: 14,
    color: '#333',
    marginTop: 6
  },
  prefix: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
    marginTop: 4
  },
  priceTxt: {
    fontSize: 22,
    color: '#333',
    fontWeight: 'bold',
    textAlign: 'justify'
  },
  originTxt: {
    fontSize: 13,
    color: '#999',
    fontWeight: 'normal'
  },
  promotionTxt: {
    width: 78,
    fontSize: 12,
    color: '#999',
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#bbb',
    textAlign: 'center',
    marginTop: 4
  }
})
