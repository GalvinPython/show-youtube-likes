// ==UserScript==
// @name         Show YouTube Likes
// @namespace    https://github.com/GalvinPython/show-youtube-likes
// @version      1.0
// @description  Shows the full like count on YouTube pages
// @author       GalvinPython
// @match        *://*.youtube.com/*
// @icon         https://raw.githubusercontent.com/GalvinPython/show-youtube-likes/main/Chrome/icon.png
// @run-at document-start
// @grant        none
// ==/UserScript==

const targetEl = document.getElementsByClassName("yt-spec-button-shape-next yt-spec-button-shape-next--tonal yt-spec-button-shape-next--mono yt-spec-button-shape-next--size-m yt-spec-button-shape-next--icon-leading yt-spec-button-shape-next--segmented-start")
let prevURL = '';
let hasUpdated = false;

function checkElementExists() {
    if (targetEl.length !== 0) {
        showLikes()
    } else {
        setTimeout(function () {
            checkElementExists()
        }, 100)
    }
}

function showLikes() {
    // Step 1 - Get aria label
    const targetAriaValue = targetEl[0].ariaLabel
    
    // Step 2 - Split aria label so we get know the true number of like.
    // The 6th index should always be the target value if the video isn't liked
    // But if the video is liked, we should get the first value
    let trueCount = '';
    const targetIndex = targetAriaValue.split(" ")
    if (targetIndex[5]) {
        trueCount = targetIndex[5]
    } else if (targetIndex[0]) {
        trueCount = targetIndex[0]
    } else {
        throw err;
    }
    
    // Step 3 - Update the like count
    const button = document.querySelector('.yt-spec-button-shape-next--segmented-start');
    const div = button.querySelector('.cbox.yt-spec-button-shape-next--button-text-content');
    const span = div.querySelector('.yt-core-attributed-string.yt-core-attributed-string--white-space-no-wrap');
    span.innerHTML = trueCount;
}

// The script up to this point only works
// so we need to constantly see if the user has gone to a new page
// At the current moment it refreshes every 3 seconds to give the script enough to update properly
setInterval(function() {
    let currentURL = window.location.href;
    if (!(currentURL.includes('watch'))) {
        return;
    }
    checkElementExists()
}, 3000)