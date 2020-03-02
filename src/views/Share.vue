<template>
  <div class="share">
    <div class="share-img-title">
      <img class="share-img" :src="share.img" alt="">
      <div class="share-title">{{ share.title }}</div>
    </div>
    <div class="share-content">
      {{ share.content }}
    </div>
    <div class="share-btns">
      <div @click="handelShareFacebook" class="share-btn">分享出去</div>
      <div @click="handleRoute" class="share-btn">看別人怎麼說</div>
    </div>
    <div class="share-more">
      <ul class="infos">
        <li v-for="item in 10" :key="item" class="info">更多課綱消息</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'share',
  data () {
    return {
      share: {
        img: "https://www.fillmurray.com/360/360",
        title: '😕的老師',
        content: '自己是九年一貫的第一批，中間又經歷建構式數學，然後現在是108課綱。自己學都來不及，教學生也越來越困難...'
      },
      emoji: {
        sob: {
          face: '😭'
        },
        confused: {
          face: '😕'
        },
        neutral_face: {
          face: '😐'
        },
        smile: {
          face: '😄'
        },
        blush: {
          face: '😊'
        },
        heart_eyes: {
          face: '😍'
        }
      }
    }
  },
  components: {

  },
  mounted () {
    let emotion = this.$store.getters.doneSaves.emoji.data
    this.share.title = this.emoji[emotion].face + '的' +  this.$store.getters.doneSaves.jobs.data
    this.share.content = this.$store.getters.doneSaves.experience.data
  },
  methods: {
    handelShareFacebook () {
      let shareMsg = this.share.content
      //{ "jobs": { "isRequire": true, "data": "家長" }, "name": { "isRequire": true, "data": "324234" }, "emoji": { "isRequire": true, "data": "blush" }, "experience": { "isRequire": true, "data": "435345" }, "contact": { "isRequire": false, "data": "" } }
      FB.ui({
          display: 'popup',
          method: 'share',
          redirect_uri: 'http://nmdap.udn.com.tw/test/facebookShare/',
          quote: shareMsg,
          href: 'http://nmdap.udn.com.tw/test/facebookShare/',
        }, function(response){});
    },
    handleRoute () {
      this.$router.push({ path: 'home' })
    }
  }
}
</script>
<style lang="scss">
.share {
  font-size: 28px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .share-img-title {
    position: relative;
    .share-title {
      width: 100%;
      position: absolute;
      bottom: 10px;
      left: 0;
      text-align: center;
      color: #fff;
      z-index: 1;
      font-size: 32px;
      text-align: center;
    }
  }
  .share-content {
    width: 100%;
    padding: 10px 5px;
    border: solid 1px #5995ED;
    background-color: #7CAFC4;
    border-radius: 5px;
    text-align: left;
    color: #fff;
  }
  .share-btns {
    display: flex;
    font-size: 16px;
    .share-btn {
      width: 100px;
      margin: 0 5px;
      padding: 5px 10px;
      border: solid 1px #FFAD05;
      border-radius: 5px;
      background-color: #FCFF4B;
      margin: 10px
    }
  }
  .share-more {
    .infos {
      list-style: none;
      padding: 0;
      .info {
        margin: 5px 0;
      }
    }
  }
}
</style>