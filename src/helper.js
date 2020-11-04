const inquirer = require('inquirer')
const fs = require('fs')
const p = require('path')
const simpleGit = require('simple-git')
const CLI = require('clui')
const Spinner = CLI.Spinner
const _validatePath = (possiblePath) => {
    return fs.statSync(possiblePath).isDirectory()
}

module.exports = {
    validatePath: (possiblePath) => {
        return _validatePath(possiblePath)
    },
    inquire: async () => {
        return await (function (){
        const questions = [
            {
                name: 'rootPath',
                type: 'input',
                message: '검색대상인 path를 적어주세요.',
                validate: function( value ) {
                    if (this.validatePath(value)) {
                        return true;
                    } else {
                        return 'path가 올바르지 않습니다. 다시 입력해주세요.';
                    }
                }
            },
            {
                name: 'emails',
                type: 'input',
                message: 'Enter your emails',
                validate: function(value) {
                    if (value.length) {
                        return true;
                    } else {
                        return 'enter your emails';
                    }
                }
            }
        ];
        return inquirer.prompt(questions);
        })()
    },
    isGitDirectory: (path) => {
        return fs.existsSync(`${path}\\.git`)
    }
    ,
    getAllSubDirectoriesPath: (path) => {
        return fs.readdirSync(path, {
            withFileTypes: true
        }).filter((dir) => dir.isDirectory()).map((directory) =>
                 `${path}\\${directory.name}`
        )
    },
    getAllCommitsOf : async (path, emails) => {
        const status = new Spinner(`Getting All Commits Of ${path}`)
        status.start()
        const git = simpleGit(`${path}`)
        const authorCondition = emails.map((email) => `\\(${email}\\)`).join('\\|')
        const result = await git.log( {
             'master' : null,
            '--author' : `${authorCondition}`
        })
        status.stop()
        return {
            name: p.basename(path),
            commits: result.all.map((all) => ({ date: all.date, message: all.message}))
        }
    },
    writeItAsJsonFile: (commitData) => {

    }
}