import React, {memo} from 'react';
import type {FC, ReactNode} from 'react';
import {StyleSheet, View, Text} from 'react-native';
interface defineProps {
  children?: ReactNode;
}
const Message: FC<defineProps> = () => {
  return <Text>Message</Text>;
};
export default memo(Message);

const styles = StyleSheet.create({
  root: {},
});
