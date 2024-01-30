<template>
    <el-dialog
        :model-value="show"
        title="设置"
        @update:model-value="(f:boolean)=>show = f"
    >
        <div class="flex flex-col gap-1rem">
            <el-switch
                v-model="settingStore.showFullScreenTip"
                active-color="#13ce66"
                inactive-text="全屏关闭提示"
            />
            <div class="">
                <span class="mr-1rem">结束时间</span>
                <el-date-picker
                    v-model="settingStore.endTime"
                    type="datetime"
                    placeholder="选择结束时间"
                    format="YYYY-MM-DD HH:mm:ss"
                    value-format="YYYY-MM-DD HH:mm:ss"
                />
            </div>
        </div>
    </el-dialog>
</template>

<script lang='ts' setup>
import { useSettingStore } from '@renderer/store/setting';

const settingStore = useSettingStore();
const show = defineModel<boolean>();

watch([()=>settingStore.showFullScreenTip, ()=> settingStore.endTime], ()=>{
    window.electron.ipcRenderer.invoke('savedata-setting', {
        showFullScreenTip: settingStore.showFullScreenTip,
        endTime: settingStore.endTime
    });
});

</script>
<style lang='scss' scoped>

</style>