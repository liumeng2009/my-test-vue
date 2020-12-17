<template>
  <a-card class="user-pane" hoverable :bodyStyle="{padding: 0}">
    <div class="avatar">
      <img :src="dataSource.avatar" alt="" />
      <span>{{ dataSource.username }}</span>
    </div>
    <div class="info">
      <span><a-icon type="clock-circle"></a-icon>{{ dataSource.birthday }}</span>
      <span><a-icon type="phone"></a-icon>{{ dataSource.phone }}</span>
      <span><a-icon type="idcard"></a-icon>{{ dataSource.idcard }}</span>
      <span><a-icon type="mail"></a-icon>{{ dataSource.email }}</span>
      <span><a-icon type="twitter"></a-icon>{{ dataSource.twitter }}</span>
    </div>
  </a-card>
</template>

<script>
export default {
  name: 'UserPane',
  props: {
    dataSource: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="less" scoped>
.user-pane {
  .avatar {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 170px;
    border-bottom: #eee 1px dashed;

    img {
      width: 72px;
      height: 72px;
      box-sizing: content-box;
      border-radius: 50%;
    }

    span {
      padding-top: 16px;
      font-weight: bolder;
    }
  }

  .info {
      padding: 16px 32px;

    & > span {
      height: 35px;
      line-height: 35px;
      display: flex;
      align-items: center;
      font-size: 14px;

      i {
          margin-right: 16px;
          font-size: 20px;
      }
    }
  }

  &:hover{
    .avatar {
        img {
            width: 70px;
            height: 70px;
            border: 1px solid #13c2c2;
        }
    }
  }
}
</style>
