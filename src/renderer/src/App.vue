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

// 计算倒计时
const endtime = '2024-2-9 00:00:00';
const duration = ref<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
});
setInterval(() => {
    const now = new Date().getTime();
    const end = new Date(endtime).getTime();
    const leftTime = end - now;
    const days = Math.floor(leftTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((leftTime / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((leftTime / 1000 / 60) % 60);
    const seconds = Math.floor((leftTime / 1000) % 60);
    duration.value = {
        days,
        hours,
        minutes,
        seconds
    };
}, 1000);

</script>

<template>
    <div
        class="main h-100%"
        :style="{paddingTop: isMaxWindow ?0:'30px',backgroundImage: `url(${active.pic})`}"
        @dblclick="quitLook"
    >
        <TitleBar v-show="!isMaxWindow" />
        <div class="flex h-100%">
            <div v-if="!isMaxWindow" class="flex flex-1 justify-between ellipsis-2">
                <div
                    v-for="(item,index) in waperList"
                    :key="index"
                    class="w-30% h-3rem cursor-pointer"
                    @click="onChooseWaper(item)"
                >
                    <img class="w-100%" :src="item.pic">
                </div>
            </div>
            <div v-else class="relative w-100% h-100%">
                <div class="absolute left-5rem top-50% -translate-y-50% text-#fff text-8rem write-vertical-left -tracking-3rem whitespace-nowrap font-[HongLeiXingShuJianTi]">
                    放假倒计时
                </div>
                <div class="absolute right-2rem top-50% -translate-y-50% text-#fff text-8rem write-vertical-right -tracking-3rem  font-[HongLeiXingShuJianTi]">
                    <div class="whitespace-nowrap">
                        <span class="write-initial tracking-1rem h-8rem">{{ duration.days }}</span> 天
                        <span class="write-initial tracking-1rem h-8rem">{{ duration.hours }}</span> 小时
                    </div>
                    <div class="whitespace-nowrap">
                        <span class="write-initial tracking-1rem h-8rem">{{ duration.minutes }}</span> 分钟
                        <span class="write-initial tracking-1rem h-8rem">{{ duration.seconds }}</span> 秒
                    </div>
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
