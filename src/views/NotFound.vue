<template>
  <div class="not-found">
    <ul class="bg-bubbles">
      <li
        v-for="i in 10"
        :key="i"
      ></li>
    </ul>
    <div>
      <h2>404</h2>

      <h1>Page Not Found !</h1>
    </div>
  </div>
</template>
<style lang="scss" scoped>
$transformHeight: 960px;
$bgColor: #50a3a2;
$bgColor2: #53e3a6;
.not-found {
  width: 100%;
  min-height: 100vh;
  height: 100%;
  background: $bgColor;
  text-align: center;
  padding-top: 12vh;
  color: #fff;
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  h2 {
    text-shadow: 0 3px 0px #404853, 0 6px 0px #333333;
    color: #fff;
    font-size: 100px;
    letter-spacing: 2px;
    font-weight: 700;
  }

  .bg-bubbles {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    li {
      position: absolute;
      list-style: none;
      display: block;
      width: 40px;
      height: 40px;
      border-radius: 340px;
      background-color: rgba(255, 255, 255, 0.15);
      bottom: -160px;
      -webkit-animation: square 25s infinite;
      animation: square 25s infinite;
      -webkit-transition-timing-function: linear;
      transition-timing-function: linear;
      &:nth-child(1) {
        left: 10%;
        color: #67c23a;
      }
      &:nth-child(2) {
        left: 20%;
        width: 80px;
        height: 80px;
        -webkit-animation-delay: 2s;
        animation-delay: 2s;
        -webkit-animation-duration: 17s;
        animation-duration: 17s;
      }
      &:nth-child(3) {
        left: 25%;
        -webkit-animation-delay: 4s;
        animation-delay: 4s;
      }
      &:nth-child(4) {
        left: 40%;
        width: 60px;
        height: 60px;
        -webkit-animation-duration: 22s;
        animation-duration: 22s;
        background-color: rgba(255, 255, 255, 0.25);
      }
      &:nth-child(5) {
        left: 70%;
      }
      &:nth-child(6) {
        left: 80%;
        width: 120px;
        height: 120px;
        -webkit-animation-delay: 3s;
        animation-delay: 3s;
        background-color: rgba(255, 255, 255, 0.2);
      }
      &:nth-child(7) {
        left: 32%;
        width: 160px;
        height: 160px;
        -webkit-animation-delay: 7s;
        animation-delay: 7s;
      }
      &:nth-child(8) {
        left: 55%;
        width: 20px;
        height: 20px;
        -webkit-animation-delay: 15s;
        animation-delay: 15s;
        -webkit-animation-duration: 40s;
        animation-duration: 40s;
      }
      &:nth-child(9) {
        left: 25%;
        width: 10px;
        height: 10px;
        -webkit-animation-delay: 2s;
        animation-delay: 2s;
        -webkit-animation-duration: 40s;
        animation-duration: 40s;
        background-color: rgba(255, 255, 255, 0.3);
      }
      &:nth-child(10) {
        left: 90%;
        width: 160px;
        height: 160px;
        -webkit-animation-delay: 11s;
        animation-delay: 11s;
      }
    }
  }
  @-webkit-keyframes square {
    0% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
    }
    100% {
      -webkit-transform: translateY(-700px) rotate(600deg);
      transform: translateY(-700px) rotate(600deg);
    }
  }
  @keyframes square {
    0% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
    }
    100% {
      -webkit-transform: translateY(-$transformHeight) rotate(600deg);
      transform: translateY(-$transformHeight) rotate(600deg);
    }
  }
}
</style>
