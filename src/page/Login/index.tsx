import React, { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  TextInput,
  LayoutAnimation,
  ToastAndroid
} from 'react-native'
import { formatPhone, replaceBlank } from '@/utils/StringUtil'
import { request } from '@/utils/request'
import icon_logo_main from '@/assets/icon_main_logo.png'
import icon_unselected from '@/assets/icon_unselected.png'
import icon_selected from '@/assets/icon_selected.png'
import icon_arrow from '@/assets/icon_arrow.png'
import icon_wx_small from '@/assets/icon_wx_small.png'
import icon_triangle from '@/assets/icon_triangle.png'
import icon_eye_open from '@/assets/icon_eye_open.png'
import icon_eye_close from '@/assets/icon_eye_close.png'
import icon_exchange from '@/assets/icon_exchange.png'
import icon_wx from '@/assets/icon_wx.png'
import icon_qq from '@/assets/icon_qq.webp'
import icon_close_modal from '@/assets/icon_close_modal.png'
import UserStore from '@/store/UserStore'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
interface defineProps {
  children?: ReactNode
}
const Login: FC<defineProps> = () => {
  const [loginType, setLoginType] = useState<'quick' | 'inputLogin'>('quick')
  const [isChecked, setChecked] = useState<boolean>(false)
  const [phone, setPhone] = useState<string>('')
  const [pwd, setPwd] = useState<string>('')
  const [eyeOpen, setEyeOpen] = useState<boolean>(true)
  const navgation = useNavigation<StackNavigationProp<any>>()
  const onLoginPress = async () => {
    const canLogin = phone?.length === 13 && pwd?.length === 6
    if (!canLogin || !isChecked) {
      return
    }
    UserStore.requestLogin(replaceBlank(phone), pwd, (success) => {
      if (success) {
        navgation.replace('HomeTab')
      } else {
        ToastAndroid.show('登录失败，请检查用户名和密码', ToastAndroid.LONG)
      }
    })
  }
  const renderProtocol = () => {
    return (
      <View style={styles.protocolLayout}>
        <TouchableOpacity
          onPress={() => {
            setChecked(!isChecked)
          }}
        >
          <Image
            style={styles.radioButton}
            source={isChecked ? icon_selected : icon_unselected}
          />
        </TouchableOpacity>
        <Text style={styles.lableTxt}>我已阅读并同意</Text>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL('https://www.baidu.com')
          }}
        >
          <Text style={styles.protocolTxt}>《用户协议》和《隐私政策》</Text>
        </TouchableOpacity>
      </View>
    )
  }
  const renderQuickLogin = () => {
    return (
      <View style={styles.renderQuickLogin}>
        {renderProtocol()}
        <TouchableOpacity
          style={styles.otherLoginBuuton}
          onPress={() => {
            LayoutAnimation.easeInEaseOut()
            setLoginType('inputLogin')
          }}
        >
          <Text style={styles.otherLoginTxt}>其他登陆方式</Text>
          <Image style={styles.icon_arrow} source={icon_arrow} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.wxLoginButton}>
          <Image style={styles.icon_wx} source={icon_wx_small} />
          <Text style={styles.wxLoginTxt}>微信登录</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.oneKeyLoginButton} activeOpacity={0.7}>
          <Text style={styles.oneKeyLoginTxt}>一键登陆</Text>
        </TouchableOpacity>
        <Image style={styles.logoMain} source={icon_logo_main} />
      </View>
    )
  }
  const renderInpitLogin = () => {
    const styles = StyleSheet.create({
      root: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        paddingHorizontal: 48
      },
      pwdLogin: {
        fontSize: 28,
        color: '#333',
        fontWeight: 'bold',
        marginTop: 56
      },
      tip: {
        fontSize: 14,
        color: '#bbb',
        marginTop: 6
      },
      phoneLayout: {
        width: '100%',
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginTop: 28
      },
      pre86: {
        fontSize: 24,
        color: '#bbb'
      },
      triangle: {
        width: 12,
        height: 6,
        marginLeft: 6
      },
      phoneInput: {
        flex: 1,
        height: 60,
        backgroundColor: 'transparent',
        textAlign: 'left',
        textAlignVertical: 'center',
        fontSize: 24,
        color: '#333',
        marginLeft: 16
      },
      pwdLayout: {
        width: '100%',
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginTop: 8
      },
      pwdInput: {
        marginLeft: 0,
        marginRight: 16
      },
      iconEye: {
        width: 30,
        height: 30
      },
      changeLayout: {
        width: '100%',
        marginTop: 10,
        alignItems: 'center',
        flexDirection: 'row'
      },
      exchangeIcon: {
        width: 16,
        height: 16,
        marginTop: 3
      },
      codeLoginTxt: {
        fontSize: 14,
        color: '#303080',
        flex: 1,
        marginLeft: 4
      },
      forgetPwdTxt: {
        fontSize: 14,
        color: '#303080'
      },
      loginButton: {
        width: '100%',
        height: 56,
        backgroundColor: '#ff2442',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 28,
        marginTop: 20
      },
      loginButtonDisable: {
        width: '100%',
        height: 56,
        backgroundColor: '#DDDDDD',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 28,
        marginTop: 20
      },
      loginTxt: {
        fontSize: 20,
        color: 'white'
      },
      wxqqLayout: {
        width: '100%',
        flexDirection: 'row',
        marginTop: 54,
        justifyContent: 'center'
      },
      iconWx: {
        width: 50,
        height: 50,
        marginRight: 60
      },
      iconQQ: {
        width: 50,
        height: 50,
        marginLeft: 60
      },
      closeButton: {
        position: 'absolute',
        left: 36,
        top: 24
      },
      closeImg: {
        width: 28,
        height: 28
      }
    })
    const canLogin = phone?.length === 13 && pwd?.length === 6
    return (
      <View style={styles.root}>
        <Text style={styles.pwdLogin}>密码登录</Text>
        <Text style={styles.tip}>未注册的手机号登录成功后自动注册</Text>
        <View style={styles.phoneLayout}>
          <Text style={styles.pre86}>+86</Text>
          <Image style={styles.triangle} source={icon_triangle} />
          <TextInput
            style={styles.phoneInput}
            placeholder="请输入手机号码"
            placeholderTextColor="#bbb"
            maxLength={13}
            keyboardType="number-pad"
            autoFocus={false}
            value={phone}
            onChangeText={(text: string) => {
              setPhone(formatPhone(text))
            }}
          />
        </View>
        <View style={styles.pwdLayout}>
          <TextInput
            style={[styles.phoneInput, styles.pwdInput]}
            placeholder="请输入密码"
            placeholderTextColor="#bbb"
            maxLength={6}
            keyboardType="number-pad"
            autoFocus={false}
            value={pwd}
            secureTextEntry={!eyeOpen}
            onChangeText={(text: string) => {
              setPwd(text)
            }}
          />
          <TouchableOpacity
            onPress={() => {
              setEyeOpen(!eyeOpen)
            }}
          >
            <Image
              style={styles.iconEye}
              source={eyeOpen ? icon_eye_open : icon_eye_close}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.changeLayout}>
          <Image style={styles.exchangeIcon} source={icon_exchange} />
          <Text style={styles.codeLoginTxt}>验证码登陆</Text>
          <Text style={styles.forgetPwdTxt}>忘记密码？</Text>
        </View>
        <TouchableOpacity
          activeOpacity={canLogin ? 0.7 : 1}
          style={canLogin ? styles.loginButton : styles.loginButtonDisable}
          onPress={onLoginPress}
        >
          <Text style={styles.loginTxt}>登录</Text>
        </TouchableOpacity>
        {renderProtocol()}
        <View style={styles.wxqqLayout}>
          <Image style={styles.iconWx} source={icon_wx} />
          <Image style={styles.iconQQ} source={icon_qq} />
        </View>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => {
            LayoutAnimation.easeInEaseOut()
            setLoginType('quick')
          }}
        >
          <Image style={styles.closeImg} source={icon_close_modal} />
        </TouchableOpacity>
      </View>
    )
  }
  return (
    <View style={styles.root}>
      {loginType === 'quick' ? renderQuickLogin() : renderInpitLogin()}
    </View>
  )
}
export default memo(Login)

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center'
  },
  logoMain: {
    width: 180,
    height: 95,
    resizeMode: 'contain',
    position: 'absolute',
    top: 170
  },
  renderQuickLogin: {
    width: '100%',
    height: '100%',
    flexDirection: 'column-reverse',
    alignItems: 'center',
    paddingHorizontal: 40
  },
  protocolLayout: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 32,
    alignItems: 'center',
    justifyContent: 'center'
  },
  radioButton: {
    width: 20,
    height: 20,
    marginTop: 4
  },
  lableTxt: {
    fontSize: 12,
    color: '#999',
    marginLeft: 6
  },
  protocolTxt: {
    fontSize: 12,
    color: '#1020ff'
  },
  otherLoginBuuton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginBottom: 100
  },
  icon_arrow: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    marginLeft: 6,
    transform: [{ rotate: '180deg' }]
  },
  otherLoginTxt: {
    fontSize: 16,
    color: '#303080'
  },
  wxLoginButton: {
    width: '100%',
    height: 56,
    backgroundColor: '#05c160',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  icon_wx: {
    width: 40,
    height: 40
  },
  wxLoginTxt: {
    fontSize: 18,
    color: 'white',
    marginLeft: 6
  },
  oneKeyLoginButton: {
    width: '100%',
    height: 56,
    backgroundColor: '#ff2442',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 20
  },
  oneKeyLoginTxt: {
    fontSize: 18,
    color: 'white',
    marginLeft: 6
  }
})
