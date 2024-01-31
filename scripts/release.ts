// conventional-changelog -p angular -i CHANGELOG.md -s
import pkg from '../package.json';
import { exec } from 'child_process';
// tag
const tag = `v${pkg.version}`;
exec(`conventional-changelog --config ./changelog-option.js -i CHANGELOG.md -s && git add . && git commit -m "feat: 发布版本${tag}"`, (error) => {
    if (error) {
        console.error(`执行changelog错误: ${error}`);
        return;
    }
    exec(`git tag -a ${tag} -m "release ${tag}"`, (error) => {
        if (error) {
            console.error(`执行tag错误: ${error}`);
            return;
        }
    });
    console.log('release');
});