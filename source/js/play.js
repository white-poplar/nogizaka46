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

var Audio46 = $("#player")[0];
var angle = 0;
var delta = 0;
Audio46.src = "";

// 播放状态
function play() {
    Audio46.play().catch(function (e) {
        $("#play").html('<i class="fa fa-play fa-1x fa-fw"></i>播放');
        delta = 0;
    });
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

// 进度条
function present() {
    var length = Audio46.currentTime / Audio46.duration * 100;
    $('.progressbar').width(length + '%');
    if (Audio46.ended || Audio46.currentTime == Audio46.duration) {
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
setInterval(function () {
    angle += delta;
    $('#img').rotate(angle);
}, 15);

$(function(){

    // 微信验证
    var isWeixin = navigator.userAgent.toLowerCase().indexOf('micromessenger') != -1;
    if (isWeixin) {
        $(".tips").show();
    } else {
        $(".tips").hide();
    }

    // main
    var hmt = decodeURIComponent(GetQueryString("hmt"));

    if(hmt == null || hmt.split('/').length != 3){
        var init_music_image = "//cdn.white-poplar.work/nogizaka46/11th%20%E5%91%BD%E3%81%AF%E7%BE%8E%E3%81%97%E3%81%84/4.jpg";
        $("#background").css("background-image", "url('" + init_music_image + "')");
        $("#img").attr("src", init_music_image);

        var init_music_src = "//cdn.white-poplar.work/nogizaka46/11th%20%E5%91%BD%E3%81%AF%E7%BE%8E%E3%81%97%E3%81%84/01%20%E5%91%BD%E3%81%AF%E7%BE%8E%E3%81%97%E3%81%84.mp3";
        Audio46.src = init_music_src;
        $("#download").attr("href", init_music_src).attr("download", "命は美しい.mp3");
        return;
    }

    var hmtArr = hmt.split('/');
    var music_album = hmtArr[0];
    var music_src = hmtArr[2];
    var music_name = music_src.slice(3);
    var music_image = hmtArr[1];

    $("#title").text(music_name);
    $("#subtitle").text("《" + music_album + "》");
    $(document).attr("title", music_name + " - 命美");

    var domain = "//cdn.white-poplar.work/nogizaka46/";

    var music_image_src = domain + music_album + "/" + Math.floor(Math.random()*parseInt(music_image) + 1) + ".jpg";
    $("#background").css("background-image", "url('" + music_image_src + "')");
    $("#img").attr("src", music_image_src);

    var music_file_src = domain + music_album + "/" + music_src + ".mp3";
    Audio46.src = music_file_src;
    $("#download").attr("href", music_file_src).attr("download", music_src.slice(3) + ".mp3");

    setTimeout(play(),2500);
});
