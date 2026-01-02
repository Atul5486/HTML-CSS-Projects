document.addEventListener("DOMContentLoaded", function () {
  const signupForm = document.getElementById("signupForm");
  const otpSection = document.getElementById("otpSection");
  const signupSection = document.getElementById("signupSection");
  const generatedOtpElement = document.getElementById("generatedOtp");
  const verifyOtpButton = document.getElementById("verifyOtpButton");
  let generatedOtp;

  // Password validation function
  function isPasswordValid(password) {
    if (password.length < 6) {
      return "Password must be at least 6 characters long.";
    }
    return true; // Password is valid
  }

  if (signupForm) {
    signupForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const username = document.getElementById("newUsername").value;
      const password = document.getElementById("newPassword").value;
      const email = document.getElementById("email").value;

      // Validate password
      const passwordValidationResult = isPasswordValid(password);
      if (passwordValidationResult !== true) {
        alert(passwordValidationResult); // Show specific validation message
        return;
      }

      // Save user details locally
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
      localStorage.setItem("email", email);
      localStorage.setItem("name",name );

      // Generate OTP
      generatedOtp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP

      // Display OTP for testing (remove in production)
      // generatedOtpElement.textContent = `Your OTP: ${generatedOtp}`;

      // Show OTP section
      signupSection.style.display = "none";
      otpSection.style.display = "block";

      // Send OTP via EmailJS
      const emailParams = {
        name:name,
        username: username,
        email1: email,
        otp: generatedOtp,
      };

      emailjs.send("service_b8b4md3", "template_xocbzqa", emailParams)
        .then(() => {
          alert("OTP sent successfully!");
        })
        .catch((error) => {
          alert("Error sending OTP:", error);
        });
    });
  }

  if (verifyOtpButton) {
    verifyOtpButton.addEventListener("click", function () {
      // Collect OTP from input fields
      const otpInputs = [
        document.getElementById("otp1").value,
        document.getElementById("otp2").value,
        document.getElementById("otp3").value,
        document.getElementById("otp4").value,
        document.getElementById("otp5").value,
        document.getElementById("otp6").value,
      ];

      const enteredOtp = otpInputs.join(""); // Combine all input values

      if (parseInt(enteredOtp) === generatedOtp) {
        alert("OTP verified successfully!");
        window.location.href = "index.html";
      } else {
        alert("Invalid OTP. Please try again.");
      }
    });
  }

  // Autofocus and move to next field
  const otpInputs = document.querySelectorAll(".otp-input");
  otpInputs.forEach((input, index) => {
    input.addEventListener("input", () => {
      if (input.value && index < otpInputs.length - 1) {
        otpInputs[index + 1].focus();
      }
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Backspace" && !input.value && index > 0) {
        otpInputs[index - 1].focus();
      }
    });
  });

    // Handle login
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;
            if (
                username === localStorage.getItem("username") &&
                password === localStorage.getItem("password")
            ) {
                sessionStorage.setItem("loggedIn", "true");
                window.location.href = "Nieby Code/index.html";
                alert("Login successful!");
                
            } else {
                alert("Invalid username or password");
            }
        });
    }

    // Display username on profile
    const displayUsername = document.getElementById("displayUsername");
    if (displayUsername) {
        if (sessionStorage.getItem("loggedIn") === "true") {
            displayUsername.innerText = localStorage.getItem("username");
        } else {
            window.location.href = "index.html";
        }
    }

    // Logout
    const logoutButton = document.getElementById("logoutButton");
    if (logoutButton) {
        logoutButton.addEventListener("click", function () {
            // sessionStorage.removeItem("loggedIn");zz
            window.location.href = "index.html";
        });
    }
});
