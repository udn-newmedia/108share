<template>
  <div class="home">
    <div class="share-box">
      <div class="job">
        <div class="job-title">*1.你的身分是?</div>
        <ul class="job-lists">
          <li v-for="(item, index) in jobs" :key="item.id" class="job-list">
            <div @click="handleChoose(jobs, 'jobs', index)" :class="{'active': item.isActive}" class="list-btn">{{ item.title }}</div>
          </li>
        </ul>
      </div>
      <div class="name">
        <div class="name-title">*2. 名字、暱稱</div>
        <input type="text" v-model="picked.name.data" placeholder="我的名稱">
      </div>
      <div class="emotion">
        <div class="emotion-title">*3.你對12年國教課綱 (108課綱) 的心情是?</div>
        <div class="emotion-faces">
           <span @click="handleChoose(emoji, 'emoji', index)" v-for="(item, index) in emoji" :key="item.id" :class="{'active': item.isActive}" class="emotion-face" title="item.title">{{ item.face }}</span>
        </div>
      </div>
      <div class="experience">
        <div class="experience-title">*4.想分享的經驗?</div>
        <textarea class="experience-text-box" v-model="picked.experience.data" placeholder="想分享的經驗..."></textarea>
      </div>
      <div class="contact">
        <div class="contact-title">5.可以怎麼聯絡你(選項，各種聯絡方式皆可)</div>
        <input type="text" v-model="picked.contact.data" placeholder="我的聯絡方式">
      </div>
    </div>
    <div @click="shareArticle" class="send">送出</div>
    <div v-if="isFromComplete" class="savingData">
      資料儲存中...{{ timer }}
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios'

export default {
  name: 'home',
  data () {
    return {
      timer: 1,
      isFromComplete: false,
      message: "",
      jobs: [
        {
          id: 'student',
          title: '學生',
          isActive: false
        }, 
        {
          id: 'parent',
          title: '家長',
          isActive: false
        },
        {
          id: 'teacher',
          title: '老師',
          isActive: false
        }, 
        {
          id: 'other',
          title: '其他',
          isActive: false
        }],
      emoji: [
        {
          id: 'sob',
          title: 'sob',
          face: '😭',
          isActive: false
        }, 
        {
          id: 'confused',
          title: 'confused',
          face: '😕',
          isActive: false
        },
        {
          id: 'neutral_face',
          title: 'neutral_face',
          face: '😐',
          isActive: false
        }, 
        {
          id: 'smile',
          title: 'smile',
          face: '😄',
          isActive: false
        },
        {
          id: 'blush',
          title: 'blush',
          face: '😊',
          isActive: false
        }, 
        {
          id: 'heart_eyes',
          title: 'heart_eyes',
          face: '😍',
          isActive: false
        }
      ],
      picked: {
        jobs: {
          isRequire: true,
          data: ''
        },
        name: {
          isRequire: true,
          data: ''
        },
        emoji: {
          isRequire: true,
          data: ''
        },
        experience: {
          isRequire: true,
          data: ''
        },
        contact: {
          isRequire: false,
          data: ''
        }
      }
    }
  },
  components: {
    HelloWorld
  },
  methods: {
    shareArticle () {
      let vm = this
      let currentURL = this.$route.path
      let msg = this.message
      vm.timer = 3

      //驗證是否為空的
      vm.isFromComplete = this.verify()

      if (vm.isFromComplete) {
        this.$store.dispatch('saveData', this.picked);
        let target = setInterval(() => {
          vm.timer = vm.timer - 1
          if (vm.timer === 0) {
            
            this.$router.push({ path: 'share' })
            
            clearInterval(target)
          }
        }, 1000);
      }

      // //跳轉router 頁面
      // this.$router.push({ path: 'share' })

      //後端儲存資料
      // axios.get('http://jsonplaceholder.typicode.com/posts/5')
      // .then(function (response) {
      //   console.log(response)
        

      // })
      // .catch(function (error) {
      //   // handle error
      //   console.log(error);
      // })
      
    },
    verify () {
     let vm = this
     let keys = Object.keys(this.picked)
     let isComplete = true
     
     keys.forEach((key)=>{
       if (vm.picked[key].isRequire === true && vm.picked[key].data === '') {
         isComplete = false
       } 
       
     })

     if (isComplete === false) {
       alert('有資料尚未填寫')
       return false
     } else {
       return true
     }
     
    },
    handleChoose (DOM, DOMname, option) {
      let vm = this
      DOM.forEach((d, i)=>{
        if (i === option) {
          d.isActive = true
          vm.picked[DOMname].data = d.title
        } else {
          d.isActive = false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
*, html, body {
  box-sizing: border-box;
}
.home {
  .share-box {
    font-size: 28px;
    .job, .name, .emotion, .experience, .contact {
      margin: 40px 0;
    }
    .job {
      .job-lists {
        display: flex;
        list-style: none;
        justify-content: center;
        padding: 0;
        .job-list {
          .list-btn {
            margin: 5px;
            border-radius: 20px;
            border: solid 1px rgba(#044389,0.7);
            padding: 5px 10px;
            cursor: pointer;
            &.active {
              background-color: #044389;
              color: #fff;
              transition: all .5s;
            }
          }
        }
      }
    }
    .name {

    }
    .emotion {
      .emotion-faces {
        .emotion-face {
          cursor: pointer;
          margin: 5px;
          &.active {
            transition: all .5s;
            font-size: 36px;
          }
        }
      }
    }
    .experience {

    }
  }
  .send {
    width: 100px;
    margin: 0 auto;
    padding: 10px;
    border-radius: 50px;
    background-color: black;
    color: #fff;
    cursor: pointer;
  }
  .savingData {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(#000, 0.9);
    color: white;
    font-size: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
