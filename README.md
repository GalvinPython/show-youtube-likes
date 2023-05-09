# Show YouTube Likes Extension
Show YouTube Likes is an extension for web browsers that displays the full like count of a YouTube video, instead of it being rounded to a million, or thousand etc.  
![A picture showing the difference on a video without the extension and with the extension](https://raw.githubusercontent.com/GalvinPython/show-youtube-likes/main/Assets/1-BeforeAfter.jpg "Before/After image")

# Layouts
YouTube will frequently do A/B testing, and thus the layout may change, affecting the HTML for the like counter. If this is ever the case, file a bug report and I'll investigate. Presently, it only supports the current layout that was released late last year.

# Supported Areas
* Current:
  * Main video page
* Potentially:
  * YouTube Music (still investigating)
* Can't do:
  * YouTube Community Posts
    * No unabbreviated value found
  * Comments (this is on the backburner. I can't imagine how painful this'd be)
     * No unabbreviated value found

# Supported Browsers
This extension has been tested on the following:
* Chrome
* Edge

# Known Issues
* The like count flickers on livestreams
* May not update properly if you like/unlike

If you come across any issues, open an issue on this repo and I'll investigate it.
