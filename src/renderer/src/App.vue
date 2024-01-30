<script setup lang="ts">
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import Main from './views/Index.vue';
</script>

<template>
    <el-config-provider :locale="zhCn">
        <Main />
    </el-config-provider>
</template>
<style lang="less">
@import './assets/css/styles.less';

</style>

