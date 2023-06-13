var token;

function getTokenFromUNPW(username, password) {
    return new Promise((resolve, reject) => {
        fetch('https://api.glowmarkt.com/api/v0-1/auth', {
            method: 'post',
            headers: {
                "Content-Type": "application/json",
                "applicationId": "b0f1b774-a586-4f72-9edd-27ead8aa7a8d"
            },
            body: JSON.stringify({
                username,
                password
            })
        }).then(resp => {
            resp.json().then(data => {
                token = data.token
                console.log(token)
                resolve(token)
            })
        })
    })
}

function getEntities() {
    return new Promise((resolve, reject) => {
        fetch('https://api.glowmarkt.com/api/v0-1/virtualentity', {
            method: 'get',
            headers: {
                "Content-Type": "application/json",
                "applicationId": "b0f1b774-a586-4f72-9edd-27ead8aa7a8d",
                token
            },
        }).then(resp => {
            resp.json().then(data => {
                console.log(data)
                resolve(data)
            })
        })
    })
}

function getReadings(resourceId) {
    return new Promise((resolve, reject) => {
        fetch(`https://api.glowmarkt.com/api/v0-1/resource/${resourceId}/readings?from=2023-01-01T00:00:00&to=2023-01-02T00:00:00&period=PT1H&offset=0&function=sum`, {
            method: 'get',
            headers: {
                "Content-Type": "application/json",
                "applicationId": "b0f1b774-a586-4f72-9edd-27ead8aa7a8d",
                token
            },
        }).then(resp => {
            resp.json().then(data => {
                console.log("readings", data)
                resolve(data)
            })
        })
    })
}

export default {
    getTokenFromUNPW,
    getEntities,
    getReadings
}