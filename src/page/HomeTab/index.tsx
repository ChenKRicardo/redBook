import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { StyleSheet, View, Text } from 'react-native'
interface defineProps {
  children?: ReactNode
}
const HomeTab: FC<defineProps> = () => {
  return <Text>HomeTab</Text>
}
export default memo(HomeTab)

const styles = StyleSheet.create({
  root: {}
})
