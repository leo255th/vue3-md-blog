module.exports = {
    presets: [
        '@vue/cli-plugin-babel/preset'
    ],
    plugins: [
        [
            'prismjs',
            {
                languages: ['json', 'bash', 'javascript', 'typescript'],
            },
        ],
    ],
}