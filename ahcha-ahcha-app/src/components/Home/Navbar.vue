<template>
  <header>
    <nav class="navbar">
      <div class="container">
        <span class="navbar-brand"><router-link style="text-decoration: none; color: black;" to="/ahcha/">앗차앗차</router-link></span>
        <ul class="nav">
          <li class="inButton">
            <router-link to="/ahcha/">홈</router-link>
          </li>
          <li class="inButton">
            <router-link to="/ahcha/trade">거래</router-link>
          </li>
          <li class="inButton">
            <router-link to="/ahcha/challenge">앗차챌린지</router-link>
          </li>
          <li class="icon">
            <router-link to="/ahcha/mypage"><img src="../../assets/navbar/profile.png" alt="Profile"/></router-link>
          </li>

          <!-- 설정 버튼에 기능 넣기 -->
          <div>
            <li class="icon" @click="toggleSettings">
            <img src="../../assets/navbar/setting.png" alt="Setting"/>
          </li>
          <div v-if="showSettings" class="settings-dropdown">
      <div class="settings-option">
        <label>
          알림 설정
          <input type="checkbox" >
        </label>
      </div>
      <div class="settings-option">
        <label>
          테마 변경
          <input type="checkbox" v-model="modeChangeEnabled" @change="toggleTheme">
        </label>
      </div>

      <div class="settings-option">
        <button @click="logout">로그아웃</button>
      </div>
    </div>
    </div>
  </ul>
  </div>
  </nav>
</header>
</template>

<script setup>
import { ref, watch } from 'vue';
import {useRouter} from "vue-router";

const router = useRouter();

const showSettings = ref(false);
const notificationsEnabled = ref(false);
const modeChangeEnabled = ref(false);

const toggleSettings = () => {
  showSettings.value = !showSettings.value;
};

const toggleTheme = () => {
  if (modeChangeEnabled.value) {
    document.documentElement.classList.add('mode-change');
  } else {
    document.documentElement.classList.remove('mode-change');
  }
};

const logout = ()=>{
  let id = sessionStorage.getItem("userid");
  
  if(id != undefined){
    console.log(id);
    sessionStorage.removeItem("userid");
    router.push("/ahcha/login"); 
  }
  showSettings.value = !showSettings.value;
}

// 테마 변경 기능
watch(modeChangeEnabled, (newValue) => {
  localStorage.setItem('modeChange', newValue);
});

// 테마 변경 초기화
if (localStorage.getItem('modeChange') === 'true') {
  modeChangeEnabled.value = true;
  document.documentElement.classList.add('mode-change');
}


</script>

<style scoped>
.navbar {
  background-color: #FBE4A7;
  height: 70px;
  display: flex;
  align-items: center;
  padding: 0 10px;
}

.navbar-brand {
  font-size: 24px;
  font-weight: bold;
  color: black; /* 글자색을 검은색으로 변경 */
}

.navbar-brand .router-link {
  color: black;
  text-decoration: none;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
}

.nav {
  list-style: none;
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
}

.nav li {
  padding: 0 10px;
}

.nav li a {
  color: black;
  text-decoration: none;
}

.nav .icon img {
  width: 30px;
  height: 30px;
}

.settings-dropdown {
  position: absolute; 
  top: 70px;

  background-color: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 10px;
  z-index: 1000;
}

.settings-option {
  margin-bottom: 10px;
  padding:5px;
}

.settings-option label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 150px;
}
.settings-option button {
  width: 100%;
  padding: 5px;
  background-color:#FBE4A7;
  border:#fbe5a734 solid 3px;
  border-radius: 10px;
  padding:5px;

  cursor: pointer;
  text-align: center; /* 버튼 내 텍스트 중앙 정렬 */
}


.mode-change {
  background-color: #333;
}

.mode-change .navbar {
  background-color: #d3f59c;
  color:rgb(0, 0, 0);
}

.mode-change .settings-dropdown button{
  background-color: #e2f1ca;
}
</style>
