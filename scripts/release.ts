// conventional-changelog -p angular -i CHANGELOG.md -s

import { exec } from 'child_process';
// -p custom-config 指定风格*
// -i CHANGELOG.md 指定输出的文件名称*
// *-s -r 0 指定增量更新，不会覆盖以前的更新日志
// -n ./changelog-option.js 指定自定义配置*
exec('conventional-changelog -p cmyr-config -i CHANGELOG.md -s -r 0', (error) => {
    console.log('release');
    if (error) {
        console.error(`执行的错误: ${error}`);
        return;
    }
});