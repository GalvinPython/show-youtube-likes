/**
 * TEST FILE - DO NOT SHIP WITH THE RELEASE
 * This isn't a "test" file, this just includes the main file,
 * but with logging to make it easier to spot issues.
 * idk maybe do development here  ¯\_(ツ)_/¯
 * 
 * main.min.js should be the shipped file
*/

const targetEl = document.getElementsByClassName("yt-spec-button-shape-next yt-spec-button-shape-next--tonal yt-spec-button-shape-next--mono yt-spec-button-shape-next--size-m yt-spec-button-shape-next--icon-leading yt-spec-button-shape-next--segmented-start")
const consoleDecorations = ['background: #13212E; color: #FFF; padding: 5px 10px;', 'background: #05E5C8; color: #13212E; padding: 5px 10px;']
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
    console.log('%c SYTL TESTING: Show YouTube Likes' + '%c Element Found', consoleDecorations[0], consoleDecorations[1]);
    console.log('%c SYTL TESTING: Show YouTube Likes' + `%c ${targetEl.length}`, consoleDecorations[0], consoleDecorations[1]);
    const targetAriaValue = targetEl[0].ariaLabel
    console.log('%c SYTL TESTING: Show YouTube Likes' + `%c ${targetAriaValue}`, consoleDecorations[0], consoleDecorations[1]);
    
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
    const div = button.querySelector('.cbox.yt-spec-button-shape-next__button-text-content');
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