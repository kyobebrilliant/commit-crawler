const helper = require("./helper")
const _crawl = async (path, emails) => {
    if (helper.isGitDirectory(path))
        return [await helper.getAllCommitsOf(path, emails)]
    else
        return await (Promise.allSettled
            (helper.getAllSubDirectoriesPath(path)
                .map(
                    (subPath) => _crawl(subPath, emails)
                )
            )).then((results) => results.filter(result => result.status === 'fulfilled').map(result => result.value) ).then(
                results => results.flat()
        )
}

module.exports = {
    crawl: _crawl
}