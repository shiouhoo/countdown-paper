<script setup lang="ts">
import { useSettingStore } from '@renderer/store/setting';
import 龙年大吉_彼岸壁纸 from '@renderer/assets/images/龙年大吉_彼岸壁纸.jpg';
import Lndj from '@renderer/views/countdown/Lndj.vue';
import { PapaerItem } from '@renderer/types';
import { ElMessage } from 'element-plus';

const settingStore = useSettingStore();

const waperList = shallowRef<PapaerItem[]>([{
    name: '龙年大吉_彼岸壁纸',
    pic: 龙年大吉_彼岸壁纸,
    com: Lndj,
}]);

const active = ref<PapaerItem>();

// 点击选择壁纸
function onChooseWaper(item) {
    window.electron.ipcRenderer.invoke('window-max', 'main');
    window.electron.ipcRenderer.invoke('window-fullScreen', 'main', true);
    active.value = item;
    settingStore.showFullScreenTip && ElMessage.success('双击屏幕或点击ESC退出全屏');
}
// 双击退出全屏
function quitLook() {
    if(isMaxWindow.value) {
        window.electron.ipcRenderer.invoke('window-fullScreen', 'main', false);
        window.electron.ipcRenderer.invoke('window-max', 'main');
    }
}

const isMaxWindow = ref(false);
onMounted(() => {
    // 读取数据
    window.electron.ipcRenderer.invoke('loaddata-setting').then((res)=>{
        settingStore.endTime = res.endTime;
        settingStore.showFullScreenTip = res.showFullScreenTip;
    });
    window.electron.ipcRenderer.invoke('window-listen', 'main');
    // 监听窗口最大化事件
    window.electron.ipcRenderer.on('window-change', (_, isMaximized: boolean) => {
        isMaxWindow.value = isMaximized;
    });
    window.addEventListener('keydown', (e) => {
        // 禁用f11
        if (e.key === 'F11') {
            e.preventDefault();
            // esc退出全屏
        } else if (e.key === 'Escape') {
            quitLook();
        }
    });
});

// 计算倒计时
let endtime = '';
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
let timer: NodeJS.Timeout;
watch(()=>settingStore.endTime, ()=>{
    endtime = settingStore.endTime;
    timer && clearInterval(timer);
    timer = setInterval(() => {
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
}, {
    immediate: true
});

</script>

<template>
    <div
        class="main h-100%"
        :style="{paddingTop: isMaxWindow ?0:'36px',backgroundImage: isMaxWindow ?`url(${active?.pic})` : ''}"
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
                <component :is="active?.com" :duration="duration" />
            </div>
        </div>
    </div>
</template>

<style lang="less">

.main{
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center;
}
</style>
