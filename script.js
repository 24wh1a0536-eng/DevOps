function register() {

    let firstName =
        document.getElementById("firstName")
        .value.trim();

    let lastName =
        document.getElementById("lastName")
        .value.trim();

    let username =
        document.getElementById("username")
        .value.trim();

    let password =
        document.getElementById("password")
        .value.trim();

    let dob =
        document.getElementById("dob")
        .value;

    let mobile =
        document.getElementById("mobile")
        .value.trim();

    let address =
        document.getElementById("address")
        .value.trim();

    let pincode =
        document.getElementById("pincode")
        .value.trim();

    let gender =
        document.getElementById("gender")
        .value;


    // Simple validation

    if (firstName === "") {

        document.getElementById(
            "firstNameError"
        ).innerText =
            "First name is required";

        return;
    }


    if (lastName === "") {

        document.getElementById(
            "lastNameError"
        ).innerText =
            "Last name is required";

        return;
    }


    if (username === "") {

        document.getElementById(
            "usernameError"
        ).innerText =
            "Username is required";

        return;
    }


    if (password === "") {

        document.getElementById(
            "passwordError"
        ).innerText =
            "Password is required";

        return;
    }


    // Send data to server

    fetch("/register", {

        method: "POST",

        headers: {
            "Content-Type":
                "application/json"
        },

        body: JSON.stringify({

            firstName: firstName,
            lastName: lastName,
            username: username,
            password: password,
            dob: dob,
            mobile: mobile,
            address: address,
            pincode: pincode,
            gender: gender

        })

    })

    .then(res => res.text())

    .then(msg => {

        alert(msg);

        if (
            msg ===
            "Registration successful"
        ) {

            window.location.href =
                "login.html";
        }

    });
}

function login() {

    let username =
        document.getElementById("username")
        .value.trim();

    let password =
        document.getElementById("password")
        .value.trim();


    if (
        username === "" ||
        password === ""
    ) {

        alert(
            "Please enter username and password"
        );

        return;
    }


    fetch("/login", {

        method: "POST",

        headers: {
            "Content-Type":
                "application/json"
        },

        body: JSON.stringify({

            username: username,
            password: password

        })

    })

    .then(res => res.text())

    .then(msg => {

        if (msg === "Success") {

            alert("Login Successful");

            window.location.href =
                "user.html";

        } else {

            alert("Invalid login");

        }

    });
}

function loadUsers() {

    fetch("/users")

        .then(res => res.json())

        .then(data => {

            let output = "";


            data.forEach((user, index) => {

                output += `

                    <div
                        style="
                            text-align:left;
                            margin-bottom:15px;
                        "
                    >

                        <b>
                            User ${index + 1}
                        </b>
                        <br>

                        <b>First Name:</b>
                        ${user.firstName}
                        <br>

                        <b>Last Name:</b>
                        ${user.lastName}
                        <br>

                        <b>Username:</b>
                        ${user.username}
                        <br>

                        <b>Password:</b>
                        ${user.password}
                        <br>

                        <b>Mobile:</b>
                        ${user.mobile}
                        <br>

                        <b>DOB:</b>
                        ${user.dob}
                        <br>

                        <b>Address:</b>
                        ${user.address}
                        <br>

                        <b>PIN Code:</b>
                        ${user.pincode}
                        <br>

                        <b>Gender:</b>
                        ${user.gender}

                    </div>

                `;

            });


            document.getElementById(
                "users"
            ).innerHTML = output;

        });
}


loadUsers();