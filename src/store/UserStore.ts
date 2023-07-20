import Loading from '@/components/widget/Loading'
import { request } from '@/utils/request'
import { save } from '@/utils/Storage'

class UserStore {
  userInfo: any
  requestLogin = async (
    phone: string,
    pwd: string,
    callBack: (success: boolean) => void
  ) => {
    Loading.show()
    try {
      const params = {
        name: phone,
        pwd
      }
      const { data } = await request('login', params)
      if (data) {
        this.userInfo = data
        save('userInfo', JSON.stringify(this.userInfo))
        callBack?.(true)
      } else {
        this.userInfo = null
        callBack?.(false)
      }
    } catch (error) {
      console.log(error)
      this.userInfo = null
      callBack?.(false)
    } finally {
      Loading.hide()
    }
  }
}
export default new UserStore()
