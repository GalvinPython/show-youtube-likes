/**
 * Show-YouTube-Likes is a Google extension that displays the true value of likes on a YouTube video instead of it being abbreviated
 * i.e. a video with 3,220 likes will be abbreviated as 3.2K and a video with 12,716 likes will be shown as 12K likes.
 * Whilst this doesn't matter, I just prefer unabbreviated numbers (as a data nerd)
 * NOTE: Do not install this if your language doesn't abbreviate the like counts
 * NOTE: This doesn't count your likes (yet)
 */

const targetEl = document.getElementsByClassName("yt-spec-button-shape-next yt-spec-button-shape-next--tonal yt-spec-button-shape-next--mono yt-spec-button-shape-next--size-m yt-spec-button-shape-next--icon-leading yt-spec-button-shape-next--segmented-start")

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
    let trueCount;
    if (targetAriaValue == "I like this") return
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
    const span = button.getElementsByClassName('yt-core-attributed-string yt-core-attributed-string--white-space-no-wrap')[0];
    span.innerHTML = trueCount;
}

// The script up to this point only works
// so we need to constantly see if the user has gone to a new page
// At the current moment it refreshes every 3 seconds to give the script enough to update properly
setInterval(function() {
    let currentURL = window.location.href;
    if (!(currentURL.includes('watch') || currentURL.includes('clip'))) {
        return;
    }
    checkElementExists()
}, 3000)