let fileListArr = []
let fileCodeArr = []
var zs2 = document.getElementById("zs2")
$(function() {
    var delParent;
    var imgIndex;
    /*点击图片的文本框*/
    $(".file").change(function() {
        $('.boxtime').fadeIn("slow")
        $(".loading").show()
        var idFile = $(this).attr("id")
        var file = document.getElementById(idFile)
        var imgContainer = $(this).parents(".z_photo") //存放图片的父亲元素
        fileList = file.files; //获取的图片文件
        var imgArr = [];
        //遍历得到的图片文件
        var numUp = imgContainer.find(".up-section").length;
        zs2.innerHTML = fileListArr.length + "/6"
        fileListArr.push(fileList[0])
        zs2.innerHTML = fileListArr.length + "/6"
        for (var i = 0; i < fileList.length; i++) {
            var imgUrl = window.URL.createObjectURL(fileList[i]);
            imgArr.push(imgUrl);
            var $section = $(`
            <section class='up-section fl'>
            </section>
            `);
            $('.z_file').before($section)
            var $mask1 = $("<div class='mask1'>")
            var $img0 = $("<img class='close-upimg'  data-id=" + i + " >").on("click", function(event) {
                event.preventDefault();
                event.stopPropagation();
                imgIndex = $(this).attr('data-id');
                delParent = $(this).parent();
                var numUp = delParent.siblings().length;
                let indexx = numUp - 1
                fileListArr.splice(indexx, 1)
                zs2.innerHTML = fileListArr.length + "/6"
                if (numUp < 7) {
                    delParent.parent().find(".z_file").show();
                }
                delParent.remove()
            });
            $img0.attr("src", "./img/a7.png").appendTo($section);

            var $img = $("<img class='up-img' style='position:absolute'>");
            $img.attr("src", imgArr[i]);
            $img.appendTo($section);
        }
        var formData = new FormData();
        formData.append("attachment", fileList[0])
        $.ajax({
            headers: {
                "apiName": "655896977f55f174faaeb58b97b52fc3c0c16a5bda88f0093a46dcc3f57764b6",
                "client-id": locationObj.appssid
            },
            type: 'post',
            url: baseUrl + "/api/apply/anon/cs/uploadImage", //上传文件的请求路径必须是绝对路劲
            data: formData,
            cache: false,
            processData: false,
            contentType: false,
        }).success(function(res) {
            $(".loading").hide()
            if (res.code != 1000) {
                $mask1.appendTo($section);
                $(".ToastBox").show()
                $("#toast").html(res.msg)
                setTimeout(() => {
                    $(".ToastBox").hide()

                }, 3000)
            } else {
                $('.boxtime').fadeOut("slow")
                fileCodeArr.push(res.data)
            }

        }).error(function() {
            $mask1.appendTo($section);
            $(".ToastBox").show()
            $("#toast").html("error")
            setTimeout(() => {
                $(".ToastBox").hide()
            }, 3000)
            $('.loading').hide()
        });
        numUp = imgContainer.find(".up-section").length;
        if (numUp >= 6) {
            $(this).parent().hide();
        }
        //input内容清空
        $(this).val("");
    });

})