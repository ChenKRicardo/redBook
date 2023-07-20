import React, { memo, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'
import icon_daily from '@/assets/icon_daily.png'
import icon_search from '@/assets/icon_search.png'
interface defineProps {
  children?: ReactNode
}
const title = ['关注', '发现', '上海']
const TitleBar: FC<defineProps> = () => {
  const [selectedIndex, setSelectIndex] = useState<number>(0)
  return (
    <View style={styles.titleLayout}>
      <TouchableOpacity style={styles.dailyButton}>
        <Image style={styles.icon} source={icon_daily} />
      </TouchableOpacity>
      {title.map((item, index) => {
        return (
          <TouchableOpacity
            style={styles.tabButton}
            onPress={() => {
              setSelectIndex(index)
            }}
            key={index}
          >
            <Text
              style={
                selectedIndex === index ? styles.tabTxtSelected : styles.tabTxt
              }
            >
              {item}
            </Text>
            {selectedIndex === index && <View style={styles.line} />}
          </TouchableOpacity>
        )
      })}
      <TouchableOpacity style={styles.searchButton}>
        <Image style={styles.icon} source={icon_search} />
      </TouchableOpacity>
    </View>
  )
}
export default memo(TitleBar)

const styles = StyleSheet.create({
  titleLayout: {
    width: '100%',
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 16
  },
  icon: {
    width: 28,
    height: 28
  },
  dailyButton: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 12,
    marginRight: 42
  },
  searchButton: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 12,
    marginLeft: 42
  },
  line: {
    width: 28,
    height: 2,
    backgroundColor: '#ff2442',
    borderRadius: 1,
    position: 'absolute',
    bottom: 6
  },
  tabButton: {
    flex: 1,
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  tabTxt: {
    fontSize: 16,
    color: '#999'
  },
  tabTxtSelected: {
    fontSize: 17,
    color: '#333'
  }
})
