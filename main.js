
function createGreenBadge() {
    let wrapper = document.createElement("div")
    let badge = document.createElement("span")
    badge.setAttribute("class", "uk-badge uk-label-success")
    badge.appendChild(document.createTextNode("ACTIVE"))
    wrapper.appendChild(badge)
    return wrapper;
}

function createOrangeBadge(text) {
    let wrapper = document.createElement("div")
    let badge = document.createElement("span")
    badge.setAttribute("class", "uk-badge uk-label-warning")
    badge.appendChild(document.createTextNode(text))
    wrapper.appendChild(badge)
    return wrapper;
}

function createCardElement(badeg, title, meta1, meta2, text) {
    let outerWrapper = document.createElement("div")

    let card = document.createElement("div")
    card.setAttribute("class","uk-card uk-card-default uk-width-1-1@m")

    let cardBody = document.createElement("div")
    cardBody.setAttribute("class", "uk-grid-small uk-card-body uk-flex-middle")
    cardBody.setAttribute("uk-grid","")

    let cardHeader = document.createElement("div")
    cardHeader.setAttribute("class","uk-width-expand")

    let cardHeaderH3 = document.createElement("h3")
    cardHeaderH3.setAttribute("class","uk-card-title uk-margin-remove-bottom")
    cardHeaderH3.appendChild(document.createTextNode(title))

    let cardMetaList = document.createElement("ul")
    cardMetaList.setAttribute("class","uk-card-meta uk-subnav uk-subnav-divider")

    let cardMetaListItem1 = document.createElement("li")

    var link1 = document.createElement("div")
    link1.setAttribute("style","margin: none;")
    link1.appendChild(document.createTextNode(meta1))
    cardMetaListItem1.appendChild(link1)

    let cardMetaListItem2 = document.createElement("li")

    var link2 = document.createElement("div")
    link2.appendChild(document.createTextNode(meta2))
    link2.setAttribute("style","margin: none;")
    cardMetaListItem2.appendChild(link2)

    let cardMainContent = document.createElement("p")
    if(text != null) cardMainContent.appendChild(document.createTextNode(text))

    cardMetaList.appendChild(cardMetaListItem1)
    cardMetaList.appendChild(cardMetaListItem2)
    cardHeader.appendChild(cardHeaderH3)
    cardHeader.appendChild(cardMetaList)

    cardBody.appendChild(badeg)
    cardBody.appendChild(cardHeader)
    cardBody.appendChild(cardMainContent)

    card.appendChild(cardBody)

    outerWrapper.appendChild(card)

    return outerWrapper;
}

function createMoreField(currentWrapper) {
    let outerWrapper = document.createElement("div")

    let card = document.createElement("div")
    card.setAttribute("class","uk-card uk-card-default uk-width-1-1@m uk-card-hover")

    let cardBody = document.createElement("div")
    cardBody.setAttribute("class","uk-grid-small uk-card-body uk-flex-middle")
    cardBody.setAttribute("uk-grid","")

    let innerWrapper = document.createElement("div")
    innerWrapper.setAttribute("style","padding: 0px;")
    innerWrapper.setAttribute("class","uk-position-center")

    let h3 = document.createElement("h3")
    let a = document.createElement("a")
    a.setAttribute("class","uk-link-heading")
    a.setAttribute("href","#moreWorkExperience")
    a.setAttribute("uk-toggle","")
    a.appendChild(document.createTextNode("mehr..."))

    h3.appendChild(a)
    innerWrapper.appendChild(h3)
    cardBody.appendChild(innerWrapper)
    card.appendChild(cardBody)
    outerWrapper.appendChild(card)
    currentWrapper.appendChild(outerWrapper)
}

function initEducationItems() {
    let education = data["education"]
    let currentWrapper
    education.forEach( (item, index) => {

        if(index % 3 == 0) {
            currentWrapper = document.createElement("div")
            currentWrapper.setAttribute("class", "uk-grid-match uk-child-width-expand@m")
            currentWrapper.setAttribute("uk-grid", "")
            document.getElementById("educationItems").appendChild(currentWrapper);
        }

        let badge;
        if(item["status"] === "ACTIVE") badge = createGreenBadge()
        else badge = createOrangeBadge(item["statusText"])

        currentWrapper.appendChild(createCardElement(badge, item["name"], item["meta1"], item["meta2"], item["content"]))

    })
}

function initWorkExperienceItems() {
    let workExperience = data["workExperience"]["current"]
    let currentWrapper
    workExperience.forEach( (item, index) => {

        if(index % 3 == 0) {
            currentWrapper = document.createElement("div")
            currentWrapper.setAttribute("class", "uk-grid-match uk-child-width-expand@m")
            currentWrapper.setAttribute("uk-grid", "")
            document.getElementById("workExperienceItems").appendChild(currentWrapper);
        }

        let badge;
        if(item["status"] === "ACTIVE") badge = createGreenBadge()
        else badge = createOrangeBadge(item["statusText"])

        currentWrapper.appendChild(createCardElement(badge, item["name"], item["meta1"], item["meta2"], item["content"]))

    })

    createMoreField(currentWrapper)

}

function createArticle(title, subtitle, content, last) {
    let article = document.createElement("article")
    article.setAttribute("class","uk-comment")

    let header = document.createElement("header")
    header.setAttribute("class","uk-comment-header uk-grid-medium uk-flex-middle text-center")
    header.setAttribute("uk-grid","")

    let headerInner = document.createElement("div")
    headerInner.setAttribute("class","uk-width-expand")

    let h4 = document.createElement("h4")
    h4.setAttribute("class","uk-comment-title uk-margin-remove")

    let a = document.createElement("a")
    a.setAttribute("class", "uk-link-reset")
    a.setAttribute("href","#")
    a.appendChild(document.createTextNode(title))

    let ul = document.createElement("ul")
    ul.setAttribute("class","uk-comment-meta uk-subnav uk-subnav-divider uk-margin-remove-top")

    let li = document.createElement("li")

    let aInner = document.createElement("a")
    aInner.setAttribute("href","#")
    aInner.appendChild(document.createTextNode(subtitle))

    let commentBody = document.createElement("div")
    commentBody.setAttribute("class","uk-comment-body")

    let p = document.createElement("p")
    content.forEach( item => {
        p.appendChild(document.createTextNode(item))
        p.appendChild(document.createElement("br"))
        p.appendChild(document.createElement("br"))
    })

    h4.appendChild(a)
    li.appendChild(aInner)
    ul.appendChild(li)

    headerInner.appendChild(h4)
    headerInner.appendChild(ul)

    header.appendChild(headerInner)

    commentBody.appendChild(p)

    // article.appendChild(document.createElement("br"))
    article.appendChild(header)
    article.appendChild(commentBody)

    let divider = document.createElement("hr")
    divider.setAttribute("class","uk-divider-icon")

    if(!last) article.appendChild(divider)

    return article
}

function initArticles() {
    let articles = data["news"]
    let currentWrapper = document.getElementById("newsItems")
    articles.forEach( (item, index) => {
        let newArticle = createArticle(item["title"],item["subTitle"], item["content"], index + 1 === data["news"].length )
        currentWrapper.appendChild(newArticle)
    })
}

initArticles()
initEducationItems()
initWorkExperienceItems()


