import React, { memo, useEffect, useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  LayoutAnimation,
  TextInput,
  TouchableWithoutFeedback
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import icon_search from '@/assets/icon_search.png'
import icon_arrow from '@/assets/icon_arrow.png'
interface defineProps {
  children?: ReactNode
}

const SearchGoods: FC<defineProps> = () => {
  const [showBack, setShowBack] = useState<boolean>(false)
  const inputRef = useRef<TextInput>(null)
  const navaigation = useNavigation<StackNavigationProp<any>>()
  useEffect(() => {
    setTimeout(() => {
      LayoutAnimation.easeInEaseOut()
      inputRef.current?.focus()
      setShowBack(true)
    }, 100)
    return () => {
      inputRef.current?.blur()
    }
  }, [])
  const onBackPress = () => {
    LayoutAnimation.easeInEaseOut()
    setShowBack(false)
    inputRef.current?.blur()
    setTimeout(() => {
      navaigation.pop()
    }, 300)
  }
  const handleTapOutside = () => {
    // 点击其他地方时触发失焦事件
    inputRef.current?.blur()
  }
  const renderTitle = () => {
    return (
      <View style={styles.titleLayout}>
        {showBack && (
          <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
            <Image style={styles.backImg} source={icon_arrow} />
          </TouchableOpacity>
        )}
        <View style={styles.searchLayout}>
          <Image style={styles.searchIcon} source={icon_search} />
          <TextInput
            ref={inputRef}
            style={styles.searchTxt}
            placeholder="coser"
            placeholderTextColor={'#bbb'}
          />
        </View>
        <Text style={styles.searchBotton}>搜索</Text>
      </View>
    )
  }
  return <View style={styles.root}>{renderTitle()}</View>
}
export default memo(SearchGoods)

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent'
  },
  backButton: {
    height: '100%',
    paddingLeft: 16,
    justifyContent: 'center'
  },
  backImg: {
    width: 20,
    height: 20
  },
  titleLayout: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  searchLayout: {
    height: 32,
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginLeft: 16
  },
  searchIcon: {
    width: 18,
    height: 18
  },
  searchTxt: {
    fontSize: 14,
    color: '#bbb',
    marginLeft: 6,
    paddingHorizontal: 8,
    paddingVertical: 0
  },
  menuIcon: {
    width: 22,
    height: 22,
    marginHorizontal: 6
  },
  searchBotton: {
    fontSize: 16,
    color: '#666',
    marginHorizontal: 12
  }
})
