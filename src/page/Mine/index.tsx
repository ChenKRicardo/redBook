import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { StyleSheet, View, Text } from 'react-native'
interface defineProps {
  children?: ReactNode
}
const Mine: FC<defineProps> = () => {
  return <Text>Mine</Text>
}
export default memo(Mine)

const styles = StyleSheet.create({
  root: {}
})
