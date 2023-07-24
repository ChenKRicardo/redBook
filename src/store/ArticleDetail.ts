import Loading from '@/components/widget/Loading'
import { load } from '@/utils/Storage'
import { request } from '@/utils/request'
import { action, observable } from 'mobx'
export default class ArticleDetailStore {
  @observable detail: Article = {} as Article
  requestArticleDetail = async (id: number) => {
    Loading.show()
    try {
      const params = {
        id: id
      }
      const { data } = await request('articleDetail', params)
      this.detail = data.data || {}
    } catch (error) {
      console.log(error)
    } finally {
      Loading.hide()
    }
  }
}
