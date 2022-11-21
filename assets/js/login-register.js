var form = document.getElementById("form");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  var phoneNumber = document.getElementById("phoneNumber").value;
  var password = document.getElementById("password").value;
  localStorage.setItem("phoneNumber", phoneNumber);
  localStorage.setItem("password", password);
  fetch("https://phone-tracker.onrender.com/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      phoneNumber,
      password,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      location.replace("userFind.html");
    })
    .catch((err) => {
      console.error(err);
      alert(err.message);
    });

  // Log in
  //   fetch("https://phone-tracker.onrender.com/api/login", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       phoneNumber,
  //       password,
  //     }),
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //     },
  //   })
  //     .then(function (response) {
  //       return response.json();
  //     })
  //     .then(function (data) {
  //       console.log(data);
  //       function showExactPosition(position) {
  //         localStorage.setItem("latitude", position.coords.latitude);
  //         localStorage.setItem("longitude", position.coords.longitude);
  //       }
  //       //  Gets location of user
  //       if (navigator.geolocation) {
  //         navigator.geolocation.watchPosition(showExactPosition, errorOnPosition);
  //       }

  //       function errorOnPosition() {
  //         console.error("Error on loading location");
  //       }
  //   checks if user can login
  //   if (data["success"] === true) {
  //     location.replace("find.html");
  //     console.log(data);
  //   } else if (data["error"] === "Incorrect password") {
  //     alert(data["error"]);
  //   } else {
  //     // Register the user

  //   }
  // })
  // .catch((err) => {
  //   console.error(err);
  // });
});
