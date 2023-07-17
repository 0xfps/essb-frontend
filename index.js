const chat = (chat) => {
    if (empty(chat)) return
    createTextBubble("right", chat)
    document.getElementById('chat').value = ""

    const data = {
        search: chat
    }

    fetch("https://essb.vercel.app/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(function (response) {
        if (response.ok) {
            return response.json()
        }
        throw new Error("Error: " + response.status)
    })
        .then(function (responseData) {
            var message = responseData.msg
            createTextBubble("left", message)
        })
}

const createTextBubble = (direction, content) => {
    const textarea = document.getElementById("chatarea")
    const div = document.createElement("div")
    const p = document.createElement("p")

    let elementClass = ""
    if (direction == "left") {
        elementClass = "bg-gray-100 px-2 py-4 w-fit rounded-lg float-left"

        if (screen.width < "500px") p.setAttribute("style", "width: 100%;")
        else if ((screen.width >= "500px") && ((screen.width < "1000px"))) p.setAttribute("style", "width: 85%;")
        else p.setAttribute("style", "width: 50%;")
    } else elementClass = "bg-green-100 px-2 py-4 w-fit rounded-lg float-right"

    p.setAttribute("class", elementClass)
    p.innerHTML = cut(content)

    div.append(p)
    textarea.append(div)
}

const empty = (val) => {
    if (val == undefined || val == null) {
        return true
    } else {
        const valString = val.toString()

        if (valString.trim().length == 0) {
            return true
        }

        if (valString.replace(/\s/g, '').length == 0) {
            return true
        }

        return false
    }
}

const cut = (text) => {
    const textArr = text.split(" ")
    let newText = ""
    let i = 0

    while (i < textArr.length) {
        if (i % 11 == 0) newText += "\n"
        newText += textArr[i]
        if (i != textArr.length) newText += " "
        i++
    }

    return newText
}