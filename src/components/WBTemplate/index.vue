<template>
  <div class="wb-item-wrapper">
    <!-- 发消息的用户 -->
    <WBUser :avatar="dataSource.avatar" :nickname="dataSource.nickname" :username="dataSource.username" :createdAt="dataSource.createdAt" />
    <!-- 发的消息文字内容 -->
    <div class="wb-content">
      {{ dataSource.content }}
    </div>
    <!-- 是转发的情况，这是被转发的内容 -->
    <WBComment v-if="dataSource.commentWith" :showToolbar="false" :dataSource="dataSource.commentWith" />
    <!-- 视频内容 -->
    <WBVideo v-if="dataSource.video" :dataSource="dataSource.video" />
    <!-- 图片内容 -->
    <WBImageList v-if="dataSource.images" :dataSource="dataSource.images" />
    <!-- 三个按钮 -->
    <WBToolbar :support="dataSource.support" :comment="dataSource.comment" :share="dataSource.share" />
  </div>
</template>

<script>
/* 普通的情况，该账号发布的消息 */
import WBToolbar from './Toolbar'
import WBUser from './User'
import WBComment from './Comment'
import WBVideo from './Video'
import WBImageList from './ImageList'
export default {
    name: 'WBTemplate',
    components: {
        WBToolbar,
        WBUser,
        WBComment,
        WBVideo,
        WBImageList
    },
    props: {
        dataSource: {
            type: Object,
            default: () => {}
        }
    }
}
</script>

<style lang="less" scoped>
.wb-item-wrapper{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background-color: #fff;
    box-shadow: 2px 2px 2px #eee;
    padding: 16px;
    padding-bottom: 0px;
    border-radius: 3px;

    &:hover{
        box-shadow: 3px 3px 5px #ddd;
    }

    .wb-content{
        width: 100%;
        box-sizing: border-box;
        padding: 8px 8px 8px 58px;
    }
}
</style>
