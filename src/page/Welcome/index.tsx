import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { StyleSheet, View, Image } from 'react-native'
import icon_logo_main from '@/assets/icon_main_logo.png';
interface defineProps {
  children?: ReactNode
}
const Welcome: FC<defineProps> = () => {
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
