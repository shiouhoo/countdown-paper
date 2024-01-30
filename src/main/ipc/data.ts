import { ipcMain } from 'electron';
import fs from 'fs';
import jsonFile from '../../../resources/setting.json?commonjs-external&asset';
import { mainWindow } from '../window';

export default function () {
    let settingData;
    // 将数据保存到本地
    ipcMain.handle('savedata-setting', function (_, data: any) {
        settingData = {
            ...settingData,
            ...data,
        };
    });
    // 关闭软件时保存到本地
    mainWindow.on('close', () => {
        fs.writeFileSync(jsonFile, JSON.stringify(settingData));
    });
    // 读取本地数据
    ipcMain.handle('loaddata-setting', function () {
        const _data = JSON.parse(fs.readFileSync(jsonFile, 'utf-8'));
        settingData = _data;
        return _data;
    });
}