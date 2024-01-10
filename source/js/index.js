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

var isRandom = true,palyCount = 0,playList = [],palyId = -1;
var domain = "//cdn.white-poplar.work/nogizaka46/";
var Audio46 = $("#player")[0],angle = 0,delta = 0;
var hmtArr = [],hmt="";
Audio46.src = "";

var func = {
    play:function () {
        Audio46.play().catch(function (e) {
            $("#onoff").html('<i class="fa fa-play fa-3x"></i>');
            delta = 0;
        });
        $("#onoff").html('<i class="fa fa-pause fa-3x"></i>');
        delta = 0.2;
    },
    pause:function () {
        Audio46.pause();
        $("#onoff").html('<i class="fa fa-play fa-3x"></i>');
        delta = 0;
    },
    repeat:function () {
        isRandom = false;
        $("#repeat i").css("color","#ccc");
        $("#random i").css("color","#333");
    },
    random:function () {
        isRandom = true;
        $("#repeat i").css("color","#333");
        $("#random i").css("color","#ccc");
    },
    backward: function () {
        if(palyCount === 0) return;
        if(isRandom){
            func.playGo(Math.floor(Math.random()*parseInt(palyCount)));
        }else{
            if(palyId <= 0)
                palyId = palyCount - 1;
            else
                palyId -= 1;
            if(palyId > palyCount)
                palyId = palyCount - 1;
            func.playGo(palyId);
        }
    },
    forward: function () {
        if(palyCount === 0) return;
        if(isRandom){
            func.playGo(Math.floor(Math.random()*parseInt(palyCount)));
        }else{
            if(palyId < 0 || palyId === palyCount - 1)
                palyId = 0;
            else
                palyId += 1;
            if(palyId > palyCount)
                palyId = 0;
            func.playGo(palyId);
        }
    },
    playGo: function (id) {
        palyId = id;
        hmtArr = playList[palyId].split('/');
        $("#title").text(hmtArr[2].slice(3));
        $("#subtitle").text("《" + hmtArr[0] + "》");
        $(document).attr("title", hmtArr[2].slice(3) + " - 命美");
        $("#img").attr("src", domain + hmtArr[0] + "/" + Math.floor(Math.random()*parseInt(hmtArr[1]) + 1) + ".jpg");
        Audio46.src = domain + hmtArr[0] + "/" + hmtArr[2] + ".mp3";
        func.play();
        hmt = hmtArr[0]+"/" + hmtArr[1] + "/" + hmtArr[2];
    }
};
$("#onoff").click(function () {
    if (Audio46.paused) {
        func.play();
    } else {
        func.pause();
    }
});
$("#repeat").click(function () {
    func.repeat();
});
$("#random").click(function () {
    func.random();
});
$("#backward").click(function () {
    $("#backward").addClass("disable");
    $("#forward").addClass("disable");

    func.backward();

    setTimeout(function(){
        $("#backward").removeClass("disable");
        $("#forward").removeClass("disable");
    },2000);
});
$("#forward").click(function () {
    $("#backward").addClass("disable");
    $("#forward").addClass("disable");

    func.forward();

    setTimeout(function(){
        $("#backward").removeClass("disable");
        $("#forward").removeClass("disable");
    },2000);
});

// 进度条
function present() {
    var length = Audio46.currentTime / Audio46.duration * 100;
    $('.progressbar').width(length + '%');
    if (Audio46.ended || Audio46.currentTime == Audio46.duration) {
        func.forward();
    }
    $("#currenttime").html(s_to_hs(parseInt(Audio46.currentTime)));
    $("#totaltime").html(s_to_hs(parseInt(Audio46.duration)));
}
$(".basebar").mousedown(function (ev) {
    console.log("aaaa");
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

$(function () {
    var currentDate = new Date();
    var hour = currentDate.getHours();
    setTimeout(function () {
        if (hour >= 6 && hour <= 10) {
            $("#hello").html("早安！").fadeIn(1000);
            $("#hello").slideDown(1000);
            $("#hello").delay(2000).slideUp("slow");
        }
        else if (hour >= 21 || hour <= 4) {
            $("#hello").html("晚安！").fadeIn(1000);
            $("#hello").slideDown(1000);
            $("#hello").delay(2000).slideUp("slow");
        }
    }, 1000);

    var init_music_image = "//cdn.white-poplar.work/nogizaka46/11th%20%E5%91%BD%E3%81%AF%E7%BE%8E%E3%81%97%E3%81%84/4.jpg";
    $("#img").attr("src", init_music_image);

    var init_music_src = "//cdn.white-poplar.work/nogizaka46/11th%20%E5%91%BD%E3%81%AF%E7%BE%8E%E3%81%97%E3%81%84/01%20%E5%91%BD%E3%81%AF%E7%BE%8E%E3%81%97%E3%81%84.mp3";
    Audio46.src = init_music_src;

    hmt = "11th%20%E5%91%BD%E3%81%AF%E7%BE%8E%E3%81%97%E3%81%84/4/01%20%E5%91%BD%E3%81%AF%E7%BE%8E%E3%81%97%E3%81%84";

    var data = {"data":eval(decodeURIComponent(escape(atob(source))))};
    $("#accordion").empty();
    $('#accordion').html(template('albumTemp', data));
    var Accordion = function (el, multiple) {
        this.el = el || {};
        this.multiple = multiple || false;
        var links = this.el.find('.album');
        links.on('click', {el: this.el, multiple: this.multiple}, this.dropdown);
    };
    Accordion.prototype.dropdown = function (e) {
        var $el = e.data.el;
        $this = $(this), $next = $this.next();
        $next.slideToggle();
        $this.parent().toggleClass('open');
        if (!e.data.multiple) {
            $el.find('.song').not($next).slideUp().parent().removeClass('open');
        }
    };
    new Accordion($('#accordion'), false);

    $.each(data.data, function(i, album){
        $.each(album.song,function (j,song) {
            playList.push(album.album + "/" + album.cover + "/" + song);
        });
    });
    palyCount = playList.length;

    $("#randomall").bind("click", function () {
        $.each(data.data, function(i, album){
            $.each(album.song,function (j,song) {
                playList.push(album.album + "/" + album.cover + "/" + song);
            });
        });
        palyCount = playList.length;
        isRandom = true;
        func.forward();
    });

    $("a.playall").bind("click", function () {
        var _albumname = this.getAttribute("albumname");
        var _album = data.data.find(function(x) {
            return x.album === _albumname;
        });
        if(_album != null){
            playList = [];
            $.each(_album.song,function (j,song) {
                playList.push(_album.album + "/" + _album.cover + "/" + song);
            });
            palyCount = playList.length;
            func.forward();
        }
    });

    $("a.playsong").bind("click", function () {
        var _songname = this.getAttribute("data-src");

        palyId = 0;
        hmtArr = _songname.split('/');
        $("#title").text(hmtArr[2].slice(3));
        $("#subtitle").text("《" + hmtArr[0] + "》");
        $(document).attr("title", hmtArr[2].slice(3) + " - 命美");
        $("#img").attr("src", domain + hmtArr[0] + "/" + Math.floor(Math.random()*parseInt(hmtArr[1]) + 1) + ".jpg");
        Audio46.src = domain + hmtArr[0] + "/" + hmtArr[2] + ".mp3";
        func.play();
        hmt = hmtArr[0]+"/" + hmtArr[1] + "/" + hmtArr[2];
    });

    $("#share i").bind("click", function () {
        location.href = "share.html?hmt=" + encodeURIComponent(hmt);
    });
});