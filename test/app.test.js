const assert = require('assert')
const helper = require('../src/helper')
const crawl = require('../src/crawl')

// describe('Simple Math Test', () => {
//     it('should return 2', () => {
//         assert.equal(1 + 1, 2);
//     });
//     it('should return 9', () => {
//         assert.equal(3 * 3, 9);
//     });
// });

describe('helper function test', () => {
    it('autoever-blue-communitymanagement-web is valid directory', () => {
        assert.strictEqual(
            true, helper.validatePath('E:\\repository')
        )
    })

    it('is git directory', () => {
        assert.strictEqual(
            helper.isGitDirectory('E:\\repository\\aws-htbeyond\\autoever-blue-communitymanagement-web'), true
        )
    })

    it ('is not git directory', () => {
        assert.strictEqual(
            helper.isGitDirectory('E:\\repository'), false
        )
    })

    it ('print', () => {
        console.log(helper.getAllSubDirectoriesPath('E:\\repository'))
    })

    it('print commits', async () => {
        require('debug').enable('simple-git')
        const result = await helper.getAllCommitsOf('E:\\repository\\aws-htbeyond\\autoever-blue-communitymanagement-web', [
            'sukyology@htbeyond.com', 'chingoo@hanmail.net'
        ])
        console.log(result)
    })

    it('test crawl', async () => {
        require('debug').enable('simple-git')
        const result = await crawl.crawl('E:\\repository', ['sukyology@htbeyond.com', 'chingoo@hanmail.net'])
        console.log(JSON.stringify(result.flat(), null, 2))
    })

})