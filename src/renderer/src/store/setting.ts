import { defineStore } from 'pinia';

export const useSettingStore = defineStore('setting', () => {
    // 是否展示全屏提示信息
    const showFullScreenTip = ref(true);
    // 倒计时结束时间
    const endTime = ref('');

    return { showFullScreenTip, endTime };
});