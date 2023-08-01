import React, { memo,useState,useEffect } from 'react'
import type { FC, ReactNode } from 'react'
import {
  Platform
} from 'react-native'
import _updateConfig from '../../update.json'

import {
  checkUpdate,
  downloadUpdate,
  isFirstTime,
  isRolledBack,
  markSuccess,
  switchVersionLater
} from 'react-native-update'
interface defineProps {
  children?: ReactNode
}
type IReactComponent = React.ClassicComponent | React.ComponentClass | React.FunctionComponent | React.ForwardRefExoticComponent<any>;

const { appKey } = (_updateConfig as any)[Platform.OS]

const withHotUpdate = (WrappedComponent:any) => {
  return (props:any)=>{    
    const [isFirstTime, setIsFirstTime] = useState(false);
    const [isRolledBack, setIsRolledBack] = useState(false);
    // 检查补丁更新
    const checkPatch = async () => {
      const info: any = await checkUpdate(appKey)
      const { update } = info
      if (update) {
        const hash = await downloadUpdate(
          info,
          // 下载回调为可选参数，从v5.8.3版本开始加入
          {
            onDownloadProgress: ({ received, total }) => {}
          }
        )
        if (hash) {
          switchVersionLater(hash)
          setIsFirstTime(true);
        }else {
          setIsRolledBack(true);
        }
      }
    }
    useEffect(()=>{
      // __DEV__ 的值为 true，表示当前是在开发环境中运行
      if(!__DEV__){
        checkPatch()
      }
    },[])
    useEffect(() => {
      // 处理更新成功逻辑
      if (isFirstTime) {
        // 必须调用此更新成功标记方法
        // 否则默认更新失败，下一次启动会自动回滚
        markSuccess();
        console.log('更新完成');
      }
    }, [isFirstTime]);
    useEffect(() => {
      // 处理回滚逻辑
      if (isRolledBack) {
        console.log('刚刚更新失败了，版本被回滚');
      }
    }, [isRolledBack]);
    return <WrappedComponent {...props} />;
  }
}
export default withHotUpdate
