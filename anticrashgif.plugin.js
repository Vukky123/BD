/**
 * @name AntiCrashGIFs
 * @author Vukky
 * @description Do you hate crash GIFs? Sure you do. Let's fix that. (only blocks predefined URLs)
 * @version 0.1.0
 * @authorId 708333380525228082
 * @authorLink https://twitter.com/vukky_ltd
 * @patreon https://patreon.com/vukky
 * @website https://github.com/Vukky123/BD
 * @source https://github.com/Vukky123/BD/blob/main/anticrashgif.plugin.js
 * @updateUrl https://raw.githubusercontent.com/Vukky123/BD/main/anticrashgif.plugin.js
 */

module.exports = (_ => {
    config = {
		"info": {
			name: "AntiCrashGIFs",
			id: "AntiCrashGIFs",
			author: "Vukky",
			version: "0.1.0",
			description: "Do you hate crash GIFs? Sure you do. Let's fix that. (only blocks predefined URLs)"
		},
        "changelog": [
            {
                title: "Added",
                type: "added",
                items: [
                    "GIFs are now blocked by checksum instead of by URL.",
                    "Videos are now blocked too.",
                    "There's a changelog window now... yay?"
                ]
            }
        ]
	};
    return class {
        start() {
            if (!global.ZeresPluginLibrary) return window.BdApi.alert("Library Missing",`The library plugin needed for ${config.info.name} is missing. https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js`);
            ZLibrary.PluginUpdater.checkForUpdate(config.info.id, config.info.version, "https://raw.githubusercontent.com/Vukky123/BD/main/anticrashgif.plugin.js");
            this.checkChangelog();
        }
        stop() {}
    
        observer(changes) {
            let blockedGIF = "https://media.tenor.com/images/58a25ec79ec064d7d57166c1f6f8d3b4/tenor.gif"
            if(changes && changes.target && changes.target.className && changes.target.className.length > 0) {
                let bannedGIFPosters = ["5ba6353ac36213d2baaa252f3ccfd8a2965191c4", "316c208a3342e1391b48d38ae8f5f2e781c6d64d", "2df2af191e3a09ce2fd86888995c07ed20e1fd52", "d1b40761b4fe77e71268a1ca5cc0499db9db7819"]
                if(changes.type == "childList") {
                    if(changes.target.className.startsWith("imageAccessory") || changes.target.className.startsWith("imageWrapper") || changes.target.className.startsWith("message-")) {
                        let video;
                        if(changes.target.className.startsWith("imageAccessory")) video = changes.target.parentNode.querySelector("video")
                        if(changes.target.className.startsWith("imageWrapper")) video = changes.target.querySelector("video")
                        if(changes.target.className.startsWith("message-")) video = changes.target.querySelector("video")
                        if(video && video.poster != blockedGIF) {
                            fetch(video.poster)
                            .then(res => res.arrayBuffer())
                            .then(arrayBuffer => {
                                const sha1sum = require("crypto").createHash('sha1').update(new Uint8Array(arrayBuffer)).digest("hex");
                                console.log(sha1sum, video, bannedGIFPosters)
                                if(bannedGIFPosters.includes(sha1sum)) {
                                    video.poster = blockedGIF
                                    video.src = blockedGIF
                                }
                            })
                        }
                    }
                }
            }
        }
    
        checkChangelog() {
            const version = BdApi.loadData(config.info.id, "version");
            if (version != config.info.version) {
                ZLibrary.Modals.showChangelogModal(config.info.name, config.info.version, config.changelog)
                BdApi.saveData(config.info.id, "version", config.info.version);
            }
        }
    }
})();