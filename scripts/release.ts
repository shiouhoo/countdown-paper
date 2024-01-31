// conventional-changelog -p angular -i CHANGELOG.md -s

import { exec } from 'child_process';

exec('conventional-changelog --config ./changelog-option.js -i CHANGELOG.md -s', (error) => {
    console.log('release');
    if (error) {
        console.error(`执行的错误: ${error}`);
        return;
    }
});