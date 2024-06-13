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
          <li class="icon">
            <router-link to=""><img src="../../assets/navbar/setting.png" alt="Setting"/></router-link>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<style scoped>
/* 네비게이션 바 스타일 */
.navbar {
  background-color: #FBE4A7;
  height: 70px;
  display: flex;
  align-items: center;
  padding: 0 10px;
}

/* 홈페이지 이름 스타일 */
.navbar-brand {
  font-size: 24px;
  font-weight: bold;
  color: black; /* 글자색을 검은색으로 변경 */
}

.navbar-brand .router-link {
  color: black;
  text-decoration: none;
}

/* 컨테이너 스타일 */
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
}

/* 내비게이션 스타일 */
.nav {
  list-style: none;
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
}

.nav li {
  padding: 0 10px; /* 패딩을 줄여서 공간 확보 */
}

.nav li a {
  color: black;
  text-decoration: none;
}

/* 이미지 스타일 */
.nav .icon img {
  width: 30px;
  height: 30px;
}

/* 반응형 디자인을 위한 미디어 쿼리 */
@media (max-width: 520px) {
  .navbar {
    height: auto;
    padding: 5px;
  }

  .container {
    flex-direction: column;
    align-items: center;
  }

  .nav {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
  }

  .nav li {
    padding: 5px; /* 패딩을 줄여서 공간 확보 */
    text-align: center;
    flex: 1 1 1; /* 요소들이 동일한 비율로 늘어나도록 설정 */
  }

  .navbar-brand {
    margin-bottom: 10px;
    font-size: 20px;
  }

  .nav .icon img {
    width: 20px;
    height: 20px; /* 이미지 크기 줄이기 */
  }
}
</style>
