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
</style>