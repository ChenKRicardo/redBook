import React, { memo, useEffect, useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native'
import icon_arrow from '@/assets/icon_arrow.png'
import CategoryModal, { CategoryRef } from './CategoryModal'

interface defineProps {
  children?: ReactNode
  categoryList: Category[]
  allCategoryList: Category[]
}
const CategoryList: FC<defineProps> = ({ categoryList, allCategoryList }) => {
  const [category, setCategory] = useState<Category>(categoryList[0])
  const modalRef = useRef<CategoryRef>(null)
  const onCategoryPress = (category: Category) => {
    setCategory(category)
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {categoryList.map((item: Category, index) => {
          const isSelected = item.name === category?.name
          return (
            <TouchableOpacity
              key={`${item.name}`}
              style={styles.tabItem}
              onPress={() => onCategoryPress(item)}
            >
              <Text
                style={
                  isSelected ? styles.tabItemTxtSelected : styles.tabItemTxt
                }
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
      <TouchableOpacity
        style={styles.openButton}
        onPress={() => {
          modalRef.current?.show()
        }}
      >
        <Image style={styles.openImg} source={icon_arrow} />
      </TouchableOpacity>
      <CategoryModal ref={modalRef} categoryList={allCategoryList} />
    </View>
  )
}
export default memo(CategoryList)

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 36,
    flexDirection: 'row',
    backgroundColor: 'white',
    marginBottom: 6
  },
  scrollView: {
    flex: 1,
    height: '100%'
  },
  openButton: {
    width: 40,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  openImg: {
    width: 18,
    height: 18,
    transform: [{ rotate: '-90deg' }]
  },
  tabItem: {
    width: 64,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  tabItemTxt: {
    fontSize: 16,
    color: '#999'
  },
  tabItemTxtSelected: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold'
  }
})
