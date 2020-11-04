#!/usr/bin/env node

const chalk = require("chalk")
const figlet = require("figlet")
const clear = require("clear");
const helper = require("./helper")
console.log('hello, here is my first cli tool')

// 0. 아이디 정하기
// 1. root path 정하기
// 2. 해당 path의 모든 폴더 긁어오기
// 3. 모든 폴더를 돈다.
// 4. 폴더가 git 저장소면:
        //4-1. 마스터 브랜치의 아이디의 커밋을 몽땅 가져오기 (커밋 시간, 커밋 메세지, 커밋 아이디)
        //4-2. 시간순으로 쏘팅
// 5. 폴더가 git 저장소가 아니면:
        // 3. 의 행위를 반복한다.
// 6. 4-1에서 가져온 모든 커밋 목록을 프로젝트 이름으로 묶음.

clear()

console.log(
    chalk.blueBright(
        figlet.textSync('COMMIT CRAWLER', {horizontalLayout: 'full'})
    )
)

const crawl = (path, emails) => {
    if (helper.isGitDirectory(path))
        return [helper.getAllCommitsOf(path, emails)]
    else
        return helper.getAllSubDirectoriesPath(path).map((subPath) => crawl(subPath, emails)).flat()
}