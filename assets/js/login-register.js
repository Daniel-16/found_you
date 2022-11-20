var form = document.getElementById('form')

form.addEventListener('submit', function (e) {
    e.preventDefault();
    var phoneNumber = document.getElementById("phoneNumber").value
    var password = document.getElementById("password").value
    localStorage.setItem("phoneNumber", phoneNumber)
    localStorage.setItem("password", password)

    // Log in
    fetch("https://phone-tracker.onrender.com/api/login", {
        "method": "POST",
        "body": JSON.stringify({
            "phoneNumber": phoneNumber,
            "password": password

        }),
        "headers": {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }).then(function (response) {
        return response.json()
    }).then(function (data) {
        // checks if user can login
        if (data['success'] == true) {
            location.replace('find.html')
        }
        else if(data['error']=="Incorrect password"){
            alert(data["error"])
        }
        else {

            //  Gets location of user
            if (navigator.geolocation) {
                navigator.geolocation.watchPosition(showExactPosition)
            }
            else {
                alert("Geolocation is not supported")
            }

            function showExactPosition(position) {
                localStorage.setItem("latitude", position.coords.latitude)
                localStorage.setItem("longitude", position.coords.longitude)

            }

            // Register the user
            fetch("https://phone-tracker.onrender.com/api/signup", {
                "method": "POST",
                "body": JSON.stringify({

                    "phoneNumber": phoneNumber,
                    "userLat": localStorage.getItem('latitude'),
                    "userLong": localStorage.getItem('longitude'),
                    "password": password

                }),
                "headers": {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }

            }).then(function (response) {
                return response.json()
            })
                .then(function (data) {
                    location.replace('find.html')

                })
                .catch((err) => {
                    console.error(err)
                })

        }
    }).catch((err) => {
        console.error(err)
    })


})




