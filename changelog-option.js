module.exports = {
    options: {
        preset: {
            name: 'conventional-changelog-conventionalcommits',
            types: [
                { type: 'feat', section: '✨ Features | 新功能' },
                { type: 'fix', section: '🐛 Bug Fixes | Bug 修复' },
                { type: 'perf', section: '⚡ Performance Improvements | 性能优化' },
                { type: 'revert', section: '⏪ Reverts | 回退' },
                { type: 'docs', section: '📝 Documentation | 文档' },
                { type: 'style', section: '💄 Styles | 风格' },
                { type: 'refactor', section: '♻ Code Refactoring | 代码重构' },
                { type: 'test', section: '✅ Tests | 测试' },
                { type: 'build', section: '👷‍ Build System | 构建' },
                { type: 'ci', section: '🔧 Continuous Integration | CI 配置' },
                { type: 'chore', section: '🎫 Chores | 其他更新' },
            ],
            preMajor: false,
            commitUrlFormat: '{{host}}/{{owner}}/{{repository}}/commit/{{hash}}',
            compareUrlFormat: '{{host}}/{{owner}}/{{repository}}/compare/{{previousTag}}...{{currentTag}}',
            issueUrlFormat: '{{host}}/{{owner}}/{{repository}}/issues/{{id}}',
            userUrlFormat: '{{host}}/{{user}}',
            releaseCommitMessageFormat: 'chore(release): {{currentTag}}',
            issuePrefixes: ['#']
        }
    }
};
