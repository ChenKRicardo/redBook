import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {
  ImagePickerResponse,
  launchImageLibrary
} from 'react-native-image-picker'
import Home from '../Home'
import Shop from '../Shop'
import Message from '../Message'
import Mine from '../Mine'
import icon_tab_publish from '@/assets/icon_tab_publish.png'
const BottomTab = createBottomTabNavigator()

interface defineProps {
  children?: ReactNode
}
const HomeTab: FC<defineProps> = () => {
  const CustomTabBar = ({ state, descriptors, navigation }: any) => {
    const onPublishPress = () => {
      launchImageLibrary(
        {
          mediaType: 'photo',
          quality: 1,
          includeBase64: true
        },
        (res: ImagePickerResponse) => {
          const { assets } = res
          if (!assets?.length) {
            console.log('选择图片失败')
            return
          }
          const { uri, width, height, fileName, fileSize, type } = assets[0]
          console.log(`uri=${uri}, width=${width}, height=${height}`)
          console.log(
            `fileName=${fileName}, fileSize=${fileSize}, type=${type}`
          )
        }
      )
    }
    return (
      <View style={styles.tabBarContainer}>
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key]
          const label = options.title
          const isFocused = state.index === index
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true
            })
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate({ name: route.name, merge: true })
            }
          }
          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key
            })
          }
          if (index === 2) {
            return (
              <TouchableOpacity
                style={styles.tabItem}
                key={label}
                onPress={onPublishPress}
              >
                <Image
                  source={icon_tab_publish}
                  style={styles.icon_tab_publish}
                />
              </TouchableOpacity>
            )
          }
          return (
            <TouchableOpacity
              style={styles.tabItem}
              key={label}
              onPress={onPress}
              onLongPress={onLongPress}
            >
              <Text
                style={{
                  fontSize: isFocused ? 18 : 16,
                  color: isFocused ? '#333' : '#999',
                  fontWeight: isFocused ? 'bold' : 'normal'
                }}
              >
                {label}
              </Text>
            </TouchableOpacity>
          )
        })}
      </View>
    )
  }
  return (
    <View style={styles.root}>
      <View style={styles.root}>
        <BottomTab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
          <BottomTab.Screen
            name="Home"
            component={Home}
            options={{
              title: '首页',
              headerShown: false
            }}
          />
          <BottomTab.Screen
            name="Shop"
            component={Shop}
            options={{
              title: '购物',
              headerShown: false
            }}
          />
          <BottomTab.Screen
            name="Publish"
            component={Shop}
            options={{
              title: '发布',
              headerShown: false
            }}
          />
          <BottomTab.Screen
            name="Message"
            component={Message}
            options={{
              title: '消息',
              headerShown: false
            }}
          />
          <BottomTab.Screen
            name="Mine"
            component={Mine}
            options={{
              title: '我',
              headerShown: false
            }}
          />
        </BottomTab.Navigator>
      </View>
    </View>
  )
}
export default memo(HomeTab)

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%'
  },
  tabBarContainer: {
    width: '100%',
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  tabItem: {
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon_tab_publish: {
    width: 58,
    height: 42,
    resizeMode: 'contain'
  }
})
