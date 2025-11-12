import React, { use, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import { updateProfile } from "firebase/auth";
import { Link, useNavigate } from "react-router";
import useAxios from "../../hooks/useAxios";

const Register = () => {
  const { user, singInWithGoogle, register } = use(AuthContext);
  const axiosInstance = useAxios();
  // const location = useLocation();
  const navigate = useNavigate();

  // const from = location.state?.from?.pathName || "/";

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [navigate, user]);

  const handleSinginWithgoogle = () => {
    singInWithGoogle()
      .then((result) => {
        console.log(result);
        toast.success(" Continue with Google successful!");

        const userData = {
          email: result.user.email,
          name: result.user.displayName,
          photoURL: result.user.photoURL,
        };
        axiosInstance.post("/users", userData).then(() => {});

      })
      .catch((err) => {
        const errorMessage = err.message;
        toast.error(errorMessage);
      });
  };

  const handleSingUp = (e) => {
    e.preventDefault();
    const form = e.target;
    const displayName = form.name.value;

    // name
    if (displayName.length < 3) {
      toast.error("Name must be at least 3 characters long.");
      return;
    }

    const email = form.email.value;

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    const photoURL = form.photoURL.value;

    // Photo URL validation
    try {
      new URL(photoURL);
    } catch {
      toast.error("Please enter a valid photo URL.");
      return;
    }

    const password = form.password.value;

    // Password Validation
    if (!/[A-Z]/.test(password)) {
      toast.error("Password must contain at least one uppercase letter.");
      return;
    }

    if (!/[a-z]/.test(password)) {
      toast.error("Password must contain at least one lowercase letter.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    register(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // console.log("after login", user);

        updateProfile(user, {
          displayName,
          photoURL,
        })
          .then(() => {
            toast.success("Register successful!");

            const userData = {
              email: email,
              name: displayName,
              photoURL: photoURL,
            };
            return axiosInstance.post("/users", userData).then(() => {});
          })
          .catch((error) => {
            console.error(error.message);
          });
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
  };

  return (
    <div>
      <div className="hero min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse min-w-[90%]">
          <div className="card bg-base-100 min-w-[90%] md:min-w-[70%] lg:min-w-[480px] max-w-sm shrink-0 shadow-2xl">
            <h1 className="text-5xl font-bold text-center mt-3">
              Register now!
            </h1>
            <div className="card-body">
              <form onSubmit={handleSingUp}>
                <fieldset className="fieldset">
                  <label className="label">Name</label>
                  <input
                    name="name"
                    type="text"
                    className="input w-full"
                    placeholder="Enter Your Full Name"
                  />
                  <label className="label">Email</label>
                  <input
                    name="email"
                    type="email"
                    className="input w-full"
                    placeholder="Enter Your Email"
                  />
                  <label className="label">Photo URL</label>
                  <input
                    name="photoURL"
                    type="url"
                    className="input w-full"
                    placeholder="Enter Your PhotoURL"
                  />
                  <label className="label">Password</label>
                  <input
                    name="password"
                    type="password"
                    className="input w-full"
                    placeholder="Password"
                  />
                  <div>
                    <a className="link link-hover">Forgot password?</a>
                  </div>
                  <button
                    type="submite"
                    className="btn btn-neutral mt-4 primary-btn"
                  >
                    Register
                  </button>
                </fieldset>
              </form>
              <div className="">
                {/* Google */}
                <button
                  onClick={handleSinginWithgoogle}
                  className="btn w-full hover:opacity-90 bg-white text-black border-[#e5e5e5]"
                >
                  <svg
                    aria-label="Google logo"
                    width="16"
                    height="16"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <g>
                      <path d="m0 0H512V512H0" fill="#fff"></path>
                      <path
                        fill="#34a853"
                        d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                      ></path>
                      <path
                        fill="#4285f4"
                        d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                      ></path>
                      <path
                        fill="#fbbc02"
                        d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                      ></path>
                      <path
                        fill="#ea4335"
                        d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                      ></path>
                    </g>
                  </svg>
                  Continue with Google
                </button>
              </div>
              <div class="">
                <p>
                  Don’t have an account?{" "}
                  <Link
                    class="link link-hover text-red-400"
                    to="/login"
                    data-discover="true"
                  >
                    {" "}
                    Login
                  </Link>
                </p>
                <div class=""></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
