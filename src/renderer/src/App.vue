<script setup lang="ts">
import 龙年大吉_彼岸壁纸 from '@renderer/assets/images/龙年大吉_彼岸壁纸.jpg';

const waperList = ref([{
    name: '龙年大吉_彼岸壁纸',
    pic: 龙年大吉_彼岸壁纸
}]);

const active = ref<{name:string, pic:string}>({ name: '', pic: '' });

// 点击选择壁纸
function onChooseWaper(item) {
    window.electron.ipcRenderer.invoke('window-max', 'main');
    window.electron.ipcRenderer.invoke('window-fullScreen', 'main', true);
    active.value = item;
}
// 双击退出全屏
function quitLook() {
    if(isMaxWindow.value) {
        window.electron.ipcRenderer.invoke('window-fullScreen', 'main', false);
        window.electron.ipcRenderer.invoke('window-max', 'main');
        active.value = { name: '', pic: '' };
    }
}

const isMaxWindow = ref(false);
onMounted(() => {
    window.electron.ipcRenderer.invoke('window-listen', 'main');
    // 监听窗口最大化事件
    window.electron.ipcRenderer.on('window-change', (_, isMaximized: boolean) => {
        isMaxWindow.value = isMaximized;
    });
});

</script>

<template>
    <div
        class="main h-100%"
        :style="{paddingTop: isMaxWindow ?0:'30px',backgroundImage: `url(${active.pic})`}"
        @dblclick="quitLook"
    >
        <TitleBar v-show="!isMaxWindow" />
        <div class="flex h-100%">
            <div v-if="!isMaxWindow" class="flex flex-1 justify-between">
                <div
                    v-for="(item,index) in waperList"
                    :key="index"
                    class="w-30% h-3rem cursor-pointer"
                    @click="onChooseWaper(item)"
                >
                    <img class="w-100%" :src="item.pic">
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="less">
@import './assets/css/styles.less';
.main{
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center;
}
</style>
