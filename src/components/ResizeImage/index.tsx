import React, { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { StyleSheet, Image, Text, Dimensions } from 'react-native'
interface defineProps {
  children?: ReactNode
  uri: string
}
const { width: SCREEN_WIDTH } = Dimensions.get('window')
const SHOW_WIDTH = (SCREEN_WIDTH - 18) >> 1
const ResizeImage: FC<defineProps> = ({ uri }) => {
  const [height, setHeight] = useState<number>(200)
  useEffect(() => {
    Image.getSize(uri, (width: number, height: number) => {
      const showHeight = (SHOW_WIDTH * height) / width
      setHeight(showHeight)
    })
  }, [uri])
  return (
    <Image
      style={{
        width: (SCREEN_WIDTH - 18) >> 1,
        height,
        resizeMode: 'cover'
      }}
      source={{ uri: uri }}
    />
  )
}
export default memo(ResizeImage)

const styles = StyleSheet.create({
  root: {}
})
