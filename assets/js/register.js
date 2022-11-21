var form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const phoneNumber = document.getElementById("phoneNumber").value;
  const password = document.getElementById("password").value;
  function showPosition(position) {
    localStorage.setItem("userLat", position.coords.latitude);
    localStorage.setItem("userLong", position.coords.longitude);
  }
  function errorOnPosition() {
    console.error("Could not get your current location");
  }
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(showPosition, errorOnPosition);
    fetch("https://phone-tracker.onrender.com/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        phoneNumber,
        password,
        userLat: localStorage.getItem("userLat"),
        userLong: localStorage.getItem("userLong"),
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data.err === "This user already exists") {
          alert(data.err);
        } else {
          location.replace("welcome.html");
        }
      })
      .catch((err) => {
        console.error(err);
        alert(err.message);
      });
  }
});
