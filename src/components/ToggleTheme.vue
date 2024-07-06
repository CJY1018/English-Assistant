<template>
  <div>
    <el-switch v-model="value" @click="handleChange">
      <template #active-action>
        <span class="custom-active-action">🌒</span>
      </template>
      <template #inactive-action>
        <span class="custom-inactive-action">☀️</span>
      </template>
    </el-switch>
  </div>
</template>

<script>
export default {
  name: "ToggleTheme",
  data() {
    return {
      value: document.documentElement.classList.contains("dark")
    };
  },
  methods: {
    handleChange(e) {
      const x = e.clientX;
      const y = e.clientY;

      const targetRadius = Math.hypot(
          Math.max(x, window.innerWidth - x),
          Math.max(y, window.innerHeight - y)
      );

      const transition = document.startViewTransition(() => {
        document.documentElement.classList.toggle("dark");
      });

      const clipPath = [`circle(0 at ${x}px ${y}px)`, `circle(${targetRadius}px at ${x}px ${y}px)`];

      transition.ready.then(() => {
        document.documentElement.animate(
            {
              clipPath: this.value ? clipPath : clipPath.reverse()
            },
            {
              duration: 400,
              pseudoElement: this.value ? "::view-transition-new(root)" : "::view-transition-old(root)"
            }
        );
      });
    }
  },
};
</script>

<style>
:root {
  background-color: #ffffff;
}

:root.dark {
  background-color: #1d1d1f !important;
}

::view-transition-old(root),
::view-transition-new(root) {
  background-color: #fff;
  animation: none;
  mix-blend-mode: normal;
}

/* 进入dark模式和退出dark模式时，两个图像的位置顺序正好相反 */
::view-transition-old(root) {
  z-index: 200;
}

::view-transition-new(root) {
  z-index: 1;
}

html.dark::view-transition-old(root) {
  z-index: 1;
}

html.dark::view-transition-new(root) {
  z-index: 200;
}
</style>
