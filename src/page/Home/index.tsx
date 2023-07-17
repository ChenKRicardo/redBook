import React, {memo} from 'react';
import type {FC, ReactNode} from 'react';
import {StyleSheet, View, Text} from 'react-native';
interface defineProps {
  children?: ReactNode;
}
const Home: FC<defineProps> = () => {
  return <Text>Home</Text>;
};
export default memo(Home);

const styles = StyleSheet.create({
  root: {},
});
