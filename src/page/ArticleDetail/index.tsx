import React, { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  Platform
} from 'react-native'
import ArticleDetailStore from '@/store/ArticleDetail'
import { observer, useLocalStore } from 'mobx-react'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import icon_arrow from '@/assets/icon_arrow.png'
import icon_share from '@/assets/icon_share.png'
import icon_collection from '@/assets/icon_collection.png'
import icon_collection_selected from '@/assets/icon_collection_selected.png'
import icon_comment from '@/assets/icon_comment.png'
import icon_edit_comment from '@/assets/icon_edit_comment.png'
import { StackNavigationProp } from '@react-navigation/stack'
import { reaction } from 'mobx'
import { ImageSlider } from '@/components/slidePager'
import UserStore from '@/store/UserStore'
import { load } from '@/utils/Storage'
import dayjs from 'dayjs'
import Heart from '@/components/Heart'
interface defineProps {
  children?: ReactNode
}
type RouteParams = {
  ArticleDetail: {
    id: number
  }
}
const { width: SCREEN_WIDTH } = Dimensions.get('window')
const ArticleDetail: FC<defineProps> = () => {
  const ArticleStore = useLocalStore(() => new ArticleDetailStore())
  const navigation = useNavigation<StackNavigationProp<any>>()
  const { params } = useRoute<RouteProp<RouteParams, 'ArticleDetail'>>()
  const [articleData, setArticleData] = useState<Article>()
  const [height, setHeight] = useState<number>(400)
  const [userInfo, setUserInfo] = useState<UserInfo>()
  useEffect(() => {
    ArticleStore.requestArticleDetail(params.id)
    getUserInfo()
  }, [])
  useEffect(() => {
    const reactionDisposer = reaction(
      () => ArticleStore.detail,
      (newDetail) => {
        setArticleData(newDetail)
      }
    )
    return () => {
      reactionDisposer()
    }
  }, [ArticleStore.detail])
  useEffect(() => {
    if (!articleData?.images?.length) {
      return
    }
    const firstImg = articleData?.images[0]
    Image.getSize(firstImg, (width: number, height: number) => {
      const showHeight = (SCREEN_WIDTH * height) / width
      setHeight(showHeight)
    })
  }, [articleData?.images])
  const getUserInfo = async () => {
    const cacheuserInfo = await load('userInfo')
    if (cacheuserInfo && JSON.parse(cacheuserInfo)) {
      setUserInfo(JSON.parse(cacheuserInfo))
    }
  }
  const renderTitle = () => {
    return (
      <View style={styles.titleLayout}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            navigation.pop()
          }}
        >
          <Image style={styles.backImg} source={icon_arrow} />
        </TouchableOpacity>
        <Image
          style={styles.avatarImg}
          source={{ uri: articleData?.avatarUrl }}
        />
        <Text style={styles.userNameTxt}>{articleData?.userName}</Text>
        <Text style={styles.followTxt}>关注</Text>
        <Image style={styles.shareImg} source={icon_share} />
      </View>
    )
  }
  const renderImages = () => {
    if (!articleData?.images?.length) {
      return
    }

    const data: any[] = articleData?.images.map((i) => {
      return { img: i }
    })

    return (
      <View style={{ paddingBottom: 30 }}>
        <ImageSlider
          data={data}
          autoPlay={false}
          closeIconColor="white"
          caroselImageStyle={{ height }}
          indicatorContainerStyle={{ bottom: -40 }}
          activeIndicatorStyle={styles.activeDot}
          inActiveIndicatorStyle={styles.inActiveDot}
        />
      </View>
    )
  }
  const renderInfo = () => {
    const tags = articleData?.tag?.map((i) => `# ${i}`).join(' ')
    return (
      <>
        <Text style={styles.articleTitleTxt}>{articleData?.title}</Text>
        <Text style={styles.descTxt}>{articleData?.desc}</Text>
        <Text style={styles.tagsTxt}>{tags}</Text>
        <Text style={styles.timeAndLocationTxt}>
          {articleData?.dateTime} {articleData?.location}
        </Text>
        <View style={styles.line} />
      </>
    )
  }
  const renderComments = () => {
    const count = articleData?.comments?.length || 0

    return (
      <>
        <Text style={styles.commentsCountTxt}>
          {count ? `共 ${count} 条评论` : '暂无评论'}
        </Text>
        <View style={styles.inputLayout}>
          <Image
            style={styles.userAvatarImg}
            source={{ uri: userInfo?.avatar }}
          />
          <TextInput
            style={styles.commentInput}
            placeholder="说点什么吧，万一火了呢～"
            placeholderTextColor={'#bbb'}
          />
        </View>
        {!!count && (
          <View style={styles.commentsContainer}>
            {articleData?.comments?.map(
              (item: ArticleComment, index: number) => {
                return (
                  <View key={index}>
                    <View style={styles.commentItem}>
                      <Image
                        style={styles.cAvatar}
                        source={{ uri: item?.avatarUrl }}
                      />
                      <View style={styles.contentLayout}>
                        <Text style={styles.nameTxt}>{item.userName}</Text>
                        <Text style={styles.messageTxt}>
                          {item.message}
                          <Text style={styles.timeAndLocationTxt}>
                            {dayjs(item.dateTime).format('MM-DD')}{' '}
                            {item.location}
                          </Text>
                        </Text>
                        {!!item.children?.length &&
                          item.children.map(
                            (j: ArticleComment, subIndex: number) => {
                              return (
                                <View
                                  key={subIndex}
                                  style={[
                                    styles.commentItem,
                                    { marginTop: 12, width: SCREEN_WIDTH - 80 }
                                  ]}
                                >
                                  <Image
                                    style={styles.cAvatar}
                                    source={{ uri: j?.avatarUrl }}
                                  />
                                  <View style={styles.contentLayout}>
                                    <Text style={styles.nameTxt}>
                                      {j.userName}
                                    </Text>
                                    <Text style={styles.messageTxt}>
                                      {j.message}
                                      <Text style={styles.timeAndLocationTxt}>
                                        {dayjs(j.dateTime).format('MM-DD')}{' '}
                                        {j.location}
                                      </Text>
                                    </Text>
                                  </View>
                                  <View style={styles.countLayout}>
                                    <Heart size={20} value={item.isFavorite} />
                                    <Text style={styles.fCount}>
                                      {item.favoriteCount}
                                    </Text>
                                  </View>
                                </View>
                              )
                            }
                          )}
                      </View>
                      <View style={styles.countLayout}>
                        <Heart size={20} value={item.isFavorite} />
                        <Text style={styles.fCount}>{item.favoriteCount}</Text>
                      </View>
                    </View>
                    <View style={styles.divider}></View>
                  </View>
                )
              }
            )}
          </View>
        )}
      </>
    )
  }
  const renderBottom = () => {
    return (
      <View style={styles.bottomLayout}>
        <View style={styles.bottomEditLayout}>
          <Image style={styles.editImg} source={icon_edit_comment} />
          <TextInput
            style={styles.bottomCommentInput}
            placeholder="说点什么..."
            placeholderTextColor={'#bbb'}
          />
        </View>
        <Heart value={articleData?.isFavorite as boolean} size={30} />
        <Text style={styles.bottomCount}>{articleData?.favoriteCount}</Text>
        <Image
          style={styles.bottomIcon}
          source={
            articleData?.isCollection
              ? icon_collection_selected
              : icon_collection
          }
        />
        <Text style={styles.bottomCount}>{articleData?.collectionCount}</Text>
        <Image style={styles.bottomIcon} source={icon_comment} />
        <Text style={styles.bottomCount}>
          {articleData?.comments?.length || 0}
        </Text>
      </View>
    )
  }
  return articleData ? (
    <View style={styles.root}>
      {renderTitle()}
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {renderImages()}
        {renderInfo()}
        {renderComments()}
      </ScrollView>
      {renderBottom()}
    </View>
  ) : null
}
export default observer(ArticleDetail)

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white'
  },
  titleLayout: {
    width: '100%',
    height: 56,
    flexDirection: 'row',
    alignItems: 'center'
  },
  backButton: {
    paddingHorizontal: 16,
    height: '100%',
    justifyContent: 'center'
  },
  backImg: {
    width: 20,
    height: 20
  },
  avatarImg: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
    borderRadius: 20
  },
  userNameTxt: {
    fontSize: 15,
    flex: 1,
    color: '#333',
    marginLeft: 16
  },
  followTxt: {
    paddingHorizontal: 16,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ff2442',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 12,
    color: '#ff2442'
  },
  shareImg: {
    width: 28,
    height: 28,
    marginHorizontal: 16
  },
  activeDot: {
    width: 6,
    height: 6,
    backgroundColor: '#ff2442',
    borderRadius: 3
  },
  inActiveDot: {
    width: 6,
    height: 6,
    backgroundColor: '#c0c0c0',
    borderRadius: 3
  },
  articleTitleTxt: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
    paddingHorizontal: 16
  },
  descTxt: {
    fontSize: 15,
    color: '#333',
    marginTop: 6,
    paddingHorizontal: 16
  },
  tagsTxt: {
    fontSize: 15,
    color: '#305090',
    marginTop: 6,
    paddingHorizontal: 16
  },
  timeAndLocationTxt: {
    fontSize: 12,
    color: '#bbb',
    marginVertical: 16,
    marginLeft: 16
  },
  line: {
    marginHorizontal: 16,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#eee'
  },
  bottomLayout: {
    width: '100%',
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee'
  },
  bottomEditLayout: {
    height: 40,
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginRight: 12
  },
  editImg: {
    width: 20,
    height: 20,
    tintColor: '#333'
  },
  bottomCommentInput: {
    height: '100%',
    fontSize: 16,
    color: '#333',
    textAlignVertical: 'center',
    paddingVertical: 0
  },
  bottomCount: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
    marginLeft: 8
  },
  bottomIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginLeft: 12
  },
  commentsCountTxt: {
    fontSize: 14,
    color: '#666',
    marginTop: 20,
    marginLeft: 16
  },
  inputLayout: {
    width: '100%',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center'
  },
  userAvatarImg: {
    width: 32,
    height: 32,
    borderRadius: 16,
    resizeMode: 'cover'
  },
  commentInput: {
    flex: 1,
    height: 32,
    borderRadius: 16,
    marginLeft: 12,
    backgroundColor: '#f0f0f0',
    fontSize: 14,
    color: '#333',
    textAlignVertical: 'center',
    paddingVertical: 0,
    paddingHorizontal: 12
  },
  commentsContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32
  },
  commentItem: {
    width: '100%',
    flexDirection: 'row'
  },
  cAvatar: {
    width: 36,
    height: 36,
    resizeMode: 'cover',
    borderRadius: 18
  },
  contentLayout: {
    flex: 1,
    marginHorizontal: 12
  },
  nameTxt: {
    fontSize: 12,
    color: '#999'
  },
  messageTxt: {
    fontSize: 14,
    color: '#333',
    marginTop: 6
  },
  timeLocationTxt: {
    fontSize: 12,
    color: '#bbb'
  },
  countLayout: {
    alignItems: 'center'
  },
  fCount: {
    fontSize: 12,
    color: '#666',
    marginTop: 2
  },
  divider: {
    marginLeft: 50,
    marginRight: 0,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#eee',
    marginVertical: 16
  }
})
