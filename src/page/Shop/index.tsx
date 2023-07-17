import React, {memo} from 'react';
import type {FC, ReactNode} from 'react';
import {StyleSheet, View, Text} from 'react-native';
interface defineProps {
  children?: ReactNode;
}
const Shop: FC<defineProps> = () => {
  return <Text>Shop</Text>;
};
export default memo(Shop);

const styles = StyleSheet.create({
  root: {},
});
