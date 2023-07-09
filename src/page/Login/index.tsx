import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { StyleSheet, View, Text } from 'react-native'
interface defineProps {
  children?: ReactNode
}
const Login: FC<defineProps> = () => {
  return <Text>Login</Text>
}
export default memo(Login)

const styles = StyleSheet.create({
  root: {}
})
