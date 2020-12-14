<template>
  <div class="wb-item-container">
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
.wb-item-container{
    width: 100%;
    height: 100%;
    animation: slowShow .5s linear 1;

    .wb-item-wrapper{
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        background-color: #fff;
        box-shadow: 2px 2px 2px #eee;
        padding: 16px;
        padding-bottom: 0px;
        border-radius: 3px;
        opacity: 1;
        animation: slowHoverBack .4s linear;

        &:hover{
            box-shadow: 4px 4px 5px #ddd;
            animation: slowHover .4s linear;
        }

        .wb-content{
            width: 100%;
            box-sizing: border-box;
            padding: 8px 8px 8px 58px;
        }
    }
}

@keyframes slowShow {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

@keyframes slowHover {
    from {
        box-shadow: 2px 2px 2px #eee;
    }
    to {
        box-shadow: 4px 4px 5px #ddd;
    }
}
@keyframes slowHoverBack {
    from {
        box-shadow: 4px 4px 5px #ddd;
    }
    to {
        box-shadow: 2px 2px 2px #eee;
    }
}
</style>
