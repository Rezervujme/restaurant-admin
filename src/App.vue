<template>
  <router-view />
</template>

<style>
#nprogress {
  pointer-events: none;
}

#nprogress .bar {
  @apply bg-teal-600 opacity-75;

  position: fixed;
  z-index: 1337;
  top: 0;
  left: 0;

  width: 100%;
  height: 3px;
}
</style>
