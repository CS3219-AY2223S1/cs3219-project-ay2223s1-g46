import {
    ormCreateHistory as _createHistory,
    ormGetUserHistory as _getUserHistory
} from '../model/history-orm.js'

export async function createHistory(req, res) {
    try {
        const { username, partnerUsername, question, chatHistory, codeHistory, finishDate } = req.body

        if (username && partnerUsername && question && chatHistory && codeHistory && finishDate) {

            let resp = await _createHistory(username, partnerUsername, question, chatHistory, codeHistory, finishDate)
            if (resp.err) {
                return res
                .status(400)
                .json({ message: 'Could not create a new history!' })
            } else {
                
                // create history for opposite user too
                let secondResp = await _createHistory(partnerUsername, username, question, chatHistory, codeHistory, finishDate)

                if (secondResp.err) {
                    return res
                    .status(400)
                    .json({ message: 'Could not create a new history!' })
                }

                console.log(`Created both users' history successfully!`)
                return res
                .status(201)
                .json({ message: `Created new history for ${username} and ${partnerUsername} successfully!` })
            }
        } else {
            return res
            .status(400)
            .json({ message: 'There are empty fields when creating a history!' })
        }
    } catch (err) {
        console.log(err)
        return res
        .status(500)
        .json({ message: 'Database failure when creating new history!' })
    }
}

export async function getUserHistory(req, res) {
    try {
        let username = req.username
        const resp = await _getUserHistory(username)

        if (resp.err) {
        return res
            .status(400)
            .json({ message: 'Could not get user history!' })
        } else {
        console.log(`Got all history for ${username} successfully!`)
        return res.json({ userHistory: resp.userHistory })
        }
    } catch (err) {
        return res
        .status(500)
        .json({ message: 'Database failure when getting user history!' })
    }
}