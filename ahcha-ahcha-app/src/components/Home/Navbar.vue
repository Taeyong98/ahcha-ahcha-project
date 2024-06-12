<template>
  <header>
    <nav class="navbar">
      <div class="container">
        <h1 class="navbar-brand">앗차앗차</h1>
        
        <ul class="nav">
          <li class="inButton">
            <router-link to="/">Home</router-link>
           
          </li>
          <li class="inButton">
           
            <router-link to="/">Info</router-link>

          </li>
          <li class="inButton">
           
            <router-link to="/">Ahcha Challenge</router-link>
          </li>
          
          <li>
            <router-link to="/"><img src="../../assets/navbar/profile.png" alt=""/></router-link>
          </li>
          <li>
            <router-link to="/"><img src="../../assets/navbar/setting.png" alt=""/></router-link>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<style>


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
}

/* 컨테이너 스타일 */
.container {

  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
}

/* 내비게이션 스타일 */
.nav {
 
  list-style: none;
  display: flex;
  align-items: center;
}

.nav li {
  padding: 0 20px;
}

.nav li a {
  color: black;
  text-decoration: none;
}




/* 이미지 스타일 */
img {
  width: 30px;
  height: 30px;
}
</style><template>
    <header>
      <nav class="navbar">
        <div class="container">
          <ul class="nav">
            <li><router-link to="/">홈</router-link></li>
            <li><router-link to="/">소개</router-link></li>
            <li><router-link to="/">아차챌린지</router-link></li>
          </ul>
          <ul class="nav justify-content-end">
            <li><router-link to="/"><img src="../assets/navbar/profile.png" alt=""/></router-link></li>
            <li><router-link to="/"><img src="../assets/navbar/setting.png" alt=""/></router-link></li>
          </ul> 
        </div>
      </nav>
    </header>
  </template>
  
  <style>
  .navbar {
    display: flex;
    justify-content: space-between; /* 왼쪽과 오른쪽 여백을 최대화하여 요소들을 좌우로 분산 배치 */
    align-items: center;
    height: 60px; /* 네비게이션 바의 적절한 높이 설정 */
    width: 100%;
    background-color: #FBE4A7;
    padding: 0 10 px;
  }
  
  .nav, .nav justify-content-end {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  
  .nav li, .nav justify-content-end li {
    float: left;
    padding: 20px;
  }
  
  .nav li:last-child, .nav justify-content-end li:last-child {
    margin-right: 0;
  }
  
  .nav li a, .nav justify-content-end li a {
    color: black;
    text-decoration: none;
  }
  
  .nav-left li a:hover, .nav-right li a:hover {
    /* 아무런 효과 없음 */
  }
  
  img {
    width: 30px; /* 아이콘의 너비 조정 */
    height: 30px; /* 아이콘의 높이 조정 */
  }
  
  @media screen and (min-width: 1024px) {
    .navbar {
      display: flex;
      justify-content: space-between; /* 왼쪽과 오른쪽 여백을 최대화하여 요소들을 좌우로 분산 배치 */
      align-items: center;
      height: 60px; /* 네비게이션 바의 적절한 높이 설정 */
      width: 100%;
      background-color: #FBE4A7;
      padding: 0;
    }
  
    .nav-left, .nav-right {
      list-style: none;
      margin: 0;
      padding: 0;
    }
  
    .nav-left li, .nav-right li {
      float: left;
      padding: 20px;
    }
  }
  </style>
  