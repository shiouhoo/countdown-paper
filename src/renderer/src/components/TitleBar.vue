<template>
    <div className="title-bar">
        <div class="icon-name">
            <img
                class="icon"
                :src="icon"
                alt=""
            >
            <div class="flex ml-1rem gap-0.5rem no-drag">
                <el-menu
                    class="el-menu-demo"
                    mode="horizontal"
                    :ellipsis="false"
                >
                    <el-sub-menu index="2">
                        <template #title>
                            <span class="text-[#918b8b] leading-100% text-0.88rem cursor-pointer">编辑</span>
                        </template>
                        <el-menu-item
                            @click="settingVisible = true"
                        >
                            设置
                        </el-menu-item>
                    </el-sub-menu>
                </el-menu>
                <SettingDialog v-model="settingVisible" />
            </div>
        </div>
        <!-- 右侧三个操作图标 -->
        <div className="no-drag action">
            <span
                class="action-item"
                @click="hideWinow"
            >
                <img
                    class="action-icon"
                    :src="minWindowIcon"
                >
            </span>
            <span
                class="action-item"
                @click="maxWinow"
            >
                <img
                    class="action-icon"
                    :src="isMaxWindow ? maxWindowRestoreIcon :maxWindowIcon"
                >
            </span>
            <span
                class="action-item"
                @click="closeWinow"
            >
                <img
                    class="action-icon"
                    :src="closeIcon"
                >
            </span>
        </div>
    </div>
</template>

<script lang='ts' setup>
import icon from '@renderer/assets/icons/icon.png';
import maxWindowRestoreIcon from '@renderer/assets/icons/max-window-restore.svg';
import maxWindowIcon from '@renderer/assets/icons/max-window.svg';
import minWindowIcon from '@renderer/assets/icons/min-window.svg';
import closeIcon from '@renderer/assets/icons/close.svg';
import { WindowType } from '@main/type';

const props = withDefaults(defineProps<{
    type?: WindowType;
}>(), {
    type: 'main'
});

const isMaxWindow = ref(false);
onMounted(() => {
    window.electron.ipcRenderer.invoke('window-listen', props.type);
    // 监听窗口最大化事件
    window.electron.ipcRenderer.on('window-change', (_, isMaximized: boolean) => {
        isMaxWindow.value = isMaximized;
    });
});

const hideWinow = () =>{
    window.electron.ipcRenderer.invoke('window-min', props.type);
};
const maxWinow = () =>{
    window.electron.ipcRenderer.invoke('window-max', props.type);
};
const closeWinow = () =>{
    window.electron.ipcRenderer.invoke('window-close', props.type);
};

const settingVisible = ref(false);

</script>
<style lang='less' scoped>
.title-bar{
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 10px;
    width: 100vw;
    height: 36px;
    background-color: rgb(42,42,42);
    -webkit-app-region: drag;
    .icon-name{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .icon{
        width: 20px;
        height: 20px;
    }
    .action{
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        .action-item{
            display: flex;
            align-items: center;
            justify-content: center;
            width: 45px;
            height: 100%;
            cursor: pointer;
            &:hover{
                background-color: rgb(50,50,50);
            }
        }
        .action-icon{
            width: 16px;
            height: 16px;
        }
    }
}
:deep(.el-menu--horizontal.el-menu){
    height: 1.5rem;
    border-bottom: 0;
}
:deep(.el-sub-menu__title){
    padding: 0 !important;
    border-bottom: 0 !important;
}
:deep(.el-sub-menu__icon-arrow){
    display: none;
}
</style>