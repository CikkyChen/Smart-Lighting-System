const API_URL = "http://localhost:5000/api";

$("#register-Light").on("click", () => {
    var date = new Date();
    const light_id = $("#user").val();
    const light_name = $("#name").val();
    const floor_num = $("#floor").val();
    var i = 0;

    const _Date = date;

    const body = {
        light_id,
        light_name,
        floor_num,
        _Date,
    };

    if (light_id == "" || light_name == "" || floor_num == "") {
        alert("Please enter all Fields");
        return;
    }

    if (light_id != "" || light_name != "" || floor_num != "") {
        $.get(`${API_URL}/devices`)
            .then((response) => {
                console.log(response)
                response.forEach((data) => {
                    if (light_id == data.light_id && light_name == data.light_name && floor_num == data.floor_num) {
                        i = i + 1;
                    }
                })
                if (i == 1) {
                    alert("Entry already present");
                    return;
                }
                else {
                    $.post(`${API_URL}/devices`, body)
                        .then((response) => {
                            location.href = "/home";
                        })
                        .catch((error) => {
                            console.error(`Error: ${error}`);
                        });
                }
            })
            .catch((error) => {
                console.error(`Error: ${error}`);
            });
    }
})


function callback(id) {
    localStorage.setItem("value_row", id)
}

function call(num) {
    localStorage.setItem("floor", num)
}

$.get(`${API_URL}/devices`)
    .then((response) => {
        // console.log(response)
        response.forEach((data) => {
            $("#Lights tbody").append(`
        <tr>
          <td>${data.light_id}</td>
          <td>${data.light_name}</td>
          <td>${data.floor_num}</td>
          <td>${data._Date}</td>
          <td id="a"><a href="/led"><img src="/img/1.png" onclick="callback(${data.light_id}), call(${data.floor_num})" alt="" height=50 width=50 style="margin-top:-10px"/></a></td >
          </tr > `);
        })
    })