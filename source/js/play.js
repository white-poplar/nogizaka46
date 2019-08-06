function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
}
function s_to_hs(s) {
    var h = Math.floor(s / 60);
    s = s % 60;
    h += '';
    s += '';
    h = (h.length == 1) ? '0' + h : h;
    s = (s.length == 1) ? '0' + s : s;
    if (isNaN(h)) {
        return "&infin;"
    }
    return h + ':' + s;
}

;$(function(){
    var Audio46 = $("#player")[0];
    var angle = 0;
    var delta = 0;
    Audio46.src = "//cdn.white-poplar.work/nogizaka46/11th%20%E5%91%BD%E3%81%AF%E7%BE%8E%E3%81%97%E3%81%84/01%20%E5%91%BD%E3%81%AF%E7%BE%8E%E3%81%97%E3%81%84.mp3";

    function play() {
        Audio46.play();
        $("#play").html('<i class="fa fa-pause fa-1x fa-fw"></i>暂停');
        delta = 0.2;
    }
    function pause() {
        Audio46.pause();
        $("#play").html('<i class="fa fa-play fa-1x fa-fw"></i>播放');
        delta = 0;
    }
    function turnonoff() {
        if (Audio46.paused) {
            play();
        } else {
            pause();
        }
    }

    //进度条
    function present() {
        var length = Audio46.currentTime / Audio46.duration * 100;
        $('.progressbar').width(length + '%');
        if (Audio46.ended || Audio46.currentTime == myAudio.duration) {
            Audio46.play();
        }
        $("#currenttime").html(s_to_hs(parseInt(Audio46.currentTime)));
        $("#totaltime").html(s_to_hs(parseInt(Audio46.duration)));
    }
    $(".basebar").mousedown(function (ev) {
        var posX = ev.offsetX;
        var basebarwidth = $(".basebar").width();
        var percentage = (posX) / basebarwidth * 100;
        Audio46.currentTime = Audio46.duration * percentage / 100;
    });
    setInterval(present, 100);

});
