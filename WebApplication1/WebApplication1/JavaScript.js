var myArr;
var Url;

var xmlhttp = new XMLHttpRequest();
var url = "http://learn.gifi.co.il/api/users/";

xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        myArr = JSON.parse(xmlhttp.responseText);
        getListbox();
    }
};

xmlhttp.open("GET", url, true);
xmlhttp.send();

function getListbox() {
    var listbox = document.getElementById("list");
    for (var i = 0 ; i < myArr.users.length ; i++) {
        var c = document.createElement("option");
        c.text = myArr.users[i].fullname;
        listbox.options.add(c, i);
    }
}

function getComboA(sel) {
    var value = sel.value;
    for (var i = 0 ; i < myArr.users.length ; i++) {
        if (value == myArr.users[i].fullname) {
            var url = myArr.users[i].video;
            url = url.substring(0, 4) + url.substring(5, 24) + 'embed/' + url.substring(32, url.length) + '?enablejsapi=1';
            Url = url;
            document.getElementById('video').setAttribute('src', url);
        }
    }
}

// Inject YouTube API script
var tag = document.createElement('script');
tag.src = "//www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;

function onYouTubePlayerAPIReady() {
    // create the global player from the specific iframe (#video)
    player = new YT.Player('video', {
        events: {
            // call this function when player is ready to use
            'onReady': onPlayerReady
        }
    });
}

function onPlayerReady(event) {

    // bind events
    var playButton = document.getElementById("play-button");
    playButton.addEventListener("click", function () {
        player.playVideo();
    });

    var pauseButton = document.getElementById("pause-button");
    pauseButton.addEventListener("click", function () {
        player.pauseVideo();
    });

}