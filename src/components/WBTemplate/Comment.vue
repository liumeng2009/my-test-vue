<template>
  <div class="comment-wrapper" :style="{paddingBottom: showToolbar ? '0px' : '16px'}">
    <WBUser :size="'small'" :avatar="dataSource.avatar" :nickname="dataSource.nickname" :username="dataSource.username" :createdAt="dataSource.createdAt" />
    <div class="wb-content">
      {{ dataSource.content }}
    </div>
    <WBVideo v-if="dataSource.video" :dataSource="dataSource.video" />
    <WBImageList v-if="dataSource.images" :dataSource="dataSource.images" />
    <WBToolbar v-if="showToolbar" :support="dataSource.support" :comment="dataSource.comment" :share="dataSource.share" />
  </div>
</template>

<script>
import WBUser from './User'
import WBToolbar from './Toolbar'
import WBVideo from './Video'
import WBImageList from './ImageList'
export default {
    name: 'WBComment',
    components: {
        WBUser,
        WBToolbar,
        WBVideo,
        WBImageList
    },
    props: {
        dataSource: {
            type: Object,
            default: () => {}
        },
        showToolbar: {
            type: Boolean,
            default: true
        }
    }
}
</script>

<style lang="less" scoped>
    .comment-wrapper{
        width: 100%;
        background-color: #eee;
        border-radius: 3px;
        box-sizing: border-box;
        padding: 16px;

        .wb-content{
            padding: 4px 0px;
            padding-left: 42px
        }
    }
</style>
