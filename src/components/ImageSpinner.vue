<template>
  <div class="ripple">
    <div class="ripple-circle"></div>
    <div class="ripple-circle ripple-inner-circle"></div>
  </div>
</template>

<script>
export default {
  name: 'ImageSpinner'
}
</script>

<style lang="scss" scoped>

.ripple {
  display: inline-block;
  position: absolute;
  width: 64px;
  height: 64px;

  .ripple-circle {
    position: absolute;
    border: 4px solid rgb(96, 208, 112);
    opacity: 1;
    border-radius: 50%;
    animation: ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }

  .ripple-inner-circle {
    animation-delay: -0.5s;
  }

  @keyframes ripple {
    0% {
      top: 28px;
      left: 28px;
      width: 0;
      height: 0;
      opacity: 1;
    }
    100% {
      top: -1px;
      left: -1px;
      width: 58px;
      height: 58px;
      opacity: 0;
    }
  }
}

</style>
