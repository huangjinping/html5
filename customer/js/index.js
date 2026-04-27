var qmStr = "2e515eb029fcfe879405638b3ef287ca"
var workOrderId = ""
var missNum = ""
var type = ""
var formObj = {
}
formObj = { ...locationObj }
if (formObj.userId == 'undefined') {
    delete formObj.userId
}
let submitClick = false
buttonX.onclick=function(){

    if (!submitAcitve || submitClick) {
        if (!submitAcitve) {
            $(".ToastBox").show()
            $("#toast").html("Hay espacios obligatorios sin completar, complétalos primero.")
            setTimeout(() => {
                $(".ToastBox").hide()
            }, 2000)
        }
        return
    }
    $(".loading").show()
    submitClick = true
    let arr = []
    fileListArr.forEach(item => {
        fileCodeArr.forEach(item2 => {
            if (item.name == item2.fileName) {
                arr.push(item2.fileCode)
            }
        })
    })
    let fileCodeStr = arr.join(",")
    formObj.attachments = fileCodeStr
    Key()
    formObj.remark = $(".input5").val()
    $.ajax({
        headers: {
            apiName: "ccce7ab3dcebdb600cfaf2895fab79fe358f7d1fcc71792d1134f90901370b3f",
            "client-id": locationObj.appssid,
        },
        type: 'POST',
        url: baseUrl + "/api/apply/anon/cs/submitOrder",
        data: JSON.stringify(formObj),
        contentType: "application/json",
        dataType: "json",
        success: function (res) {
            submitClick = false
            $(".loading").hide()
            if (res.code != 1000) {
                delete formObj.remark;
                console.log(2, res.msg)
                $(".ToastBox").show()
                $("#toast").html(res.msg)
                setTimeout(() => {
                    $(".ToastBox").hide()
                }, 3000)
            } else {
                missNum = res.data.missNum
                workOrderId = res.data.workOrderId
                aiType = res.data.aiType
                window.location.href = `./submitResult.html?aiType=${aiType}&workOrderId=${workOrderId}&missNum=${missNum}&appSsid=${locationObj.appssid}&type=${locationObj.type}`
            }
        },
        fail: function (res) {
            delete formObj.remark;
            submitClick = false
            $(".loading").hide()

        }
    });
}
// $("#buttonX").click(function () {
   

// })
function Key() {
    console.log(2)
    let keys = Object.keys(formObj);
    let str = ""
    keys.sort();
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        let value = formObj[key];
        if (i == keys.length - 1) {
            str += key + '=' + value
        } else {
            str += key + '=' + value + '&'
        }
    }
    console.log(str)
    console.log("md5参数",str + qmStr)
    formObj.sign = md5(str + qmStr)
}

