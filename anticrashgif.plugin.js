/**
 * @name AntiCrashGIFs
 * @author Vukky
 * @description Do you hate crash GIFs? Sure you do. Let's fix that. (only blocks predefined URLs)
 * @version 0.0.1
 * @authorId 708333380525228082
 * @authorLink https://twitter.com/vukky_ltd
 * @patreon https://patreon.com/vukky
 * @website https://github.com/Vukky123/BD
 * @source https://github.com/Vukky123/BD/blob/main/anticrashgif.plugin.js
 * @updateUrl https://raw.githubusercontent.com/Vukky123/BD/main/anticrashgif.plugin.js
 */

 module.exports = class AntiCrashGIFs {
    start() {}
    stop() {}

    observer(changes) {
        if(changes && changes.target && changes.target.className && changes.target.className.length > 0) {
            let bannedGIFs = ["https://giant.gfycat.com/thoughtfulwastefularcticwolf.mp4", "https://gfycat.com/thoughtfulwastefularcticwolf", "https://giant.gfycat.com/neatphonyacornweevil.mp4", "https://gfycat.com/neatphonyacornweevil"]
            if(changes.type == "childList" && changes.target.className.startsWith("imageAccessory")) {
                if(bannedGIFs.includes(changes.target.parentNode.href.toLowerCase())) {
                    changes.target.parentNode.querySelector("video").poster = "https://media.tenor.com/images/58a25ec79ec064d7d57166c1f6f8d3b4/tenor.gif"
                    changes.target.parentNode.querySelector("video").src = "https://media.tenor.com/images/58a25ec79ec064d7d57166c1f6f8d3b4/tenor.gif"
                }
            }
        }
    }
}