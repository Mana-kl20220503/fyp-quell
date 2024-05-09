<template>
  <div class="about">
    <h1>About Us</h1>
    <p>This is the about page.</p>
  </div>
</template>

<script setup>
// JavaScript for About page if needed
</script>

<style scoped>
.about {
  background-image: url('@/assets/AboutBg.png');
  background-size: contain; /* 画像がコンテナの全面を覆うように調整 */
  background-position: center; /* 画像がコンテナの中央に配置される */
  background-repeat: no-repeat; /* 画像が繰り返し表示されないようにする */
  width: 100%; /* 必要に応じて高さ調整 */
  min-height: 300px; /* 最小の高さを指定 */
}
.about img {
  height: 300px;
  object-fit: cover;
}
</style>
