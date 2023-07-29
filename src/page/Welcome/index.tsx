import React, { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import icon_logo_main from '@/assets/icon_main_logo.png'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { load } from '@/utils/Storage'
import UserStore from '@/store/UserStore'
interface defineProps {
  children?: ReactNode
}
const Welcome: FC<defineProps> = () => {
  const navigation = useNavigation<StackNavigationProp<any>>()
  useEffect(() => {
    setTimeout(() => {
      getUserInfo()
    }, 3000)
  }, [])
  const startLogin = () => {
    navigation.replace('Login')
  }
  const startHome = () => {
    navigation.replace('HomeTab')
  }
  const getUserInfo = async () => {
    const cacheUserInfo = await load('userInfo')
    if (!cacheUserInfo) {
      startLogin()
    } else {
      const parse = JSON.parse(cacheUserInfo)
      if (parse) {
        UserStore.setUserInfo(parse)
        startHome()
      } else {
        startLogin()
      }
    }
  }
  return (
    <View style={styles.root}>
      <Image style={styles.logo_main} source={icon_logo_main} />
    </View>
  )
}
export default memo(Welcome)

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center'
  },
  logo_main: {
    width: 200,
    height: 105,
    marginTop: 200,
    resizeMode: 'contain'
  }
})
