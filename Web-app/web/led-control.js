const API_URL = "http://localhost:5000/api";

function set() {
    location.href = "/home"
}

function bulb_on() {
    var colour = document.getElementById("on").value;

    var light_id = localStorage.getItem("value_row");
    var floor = localStorage.getItem("floor");

    const body = {
        light_id,
        colour,
        floor
    };

    $.post(`${API_URL}/light`, body)
        .then((response) => {
            const MQTT_URL = 'http://localhost:5001/send-command';

            const deviceId = light_id;
            const command = light_id;
            $.post(MQTT_URL, { deviceId, command })
                .then(response => {
                    // alert(command)
                })
            const MQTT_URL1 = 'http://localhost:5001/send-command1';

            const deviceId1 = light_id;
            const command1 = floor;
            $.post(MQTT_URL1, { deviceId1, command1 })
                .then(response => {
                    // alert(command1)
                    setTimeout(() => { set() }, 2000);
                })
        })
        .catch((error) => {
            console.error(`Error: ${error}`);
        });
    document.getElementById('bulb').src = 'https://i.postimg.cc/6QyTynzr/bulb-on.png';
}
function bulb_off() {
    var colour = document.getElementById("off").value;

    var light_id = localStorage.getItem("value_row");
    var floor = localStorage.getItem("floor");

    const body = {
        light_id,
        colour,
        floor
    };

    $.post(`${API_URL}/light`, body)
        .then((response) => {
            const MQTT_URL = 'http://localhost:5001/send-command';

            const deviceId = light_id;
            const command = light_id;
            $.post(MQTT_URL, { deviceId, command })
                .then(response => {
                    // alert(command)
                })
            const MQTT_URL1 = 'http://localhost:5001/send-command1';

            const deviceId1 = light_id;
            const command1 = floor;
            $.post(MQTT_URL1, { deviceId1, command1 })
                .then(response => {
                    // alert(command1)
                    setTimeout(() => { set() }, 2000);
                })
        })
        .catch((error) => {
            console.error(`Error: ${error}`);
        });
    document.getElementById('bulb').src = 'https://i.postimg.cc/KjK1wL3c/bulb-off.png';
}