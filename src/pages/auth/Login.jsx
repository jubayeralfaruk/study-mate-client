import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router";
import useAxios from "../../hooks/useAxios";

const Login = () => {
  const { user, singInWithGoogle, login } = useContext(AuthContext);
  const axiosInstance = useAxios()
  // const location = useLocation();
  const navigate = useNavigate();

  // const from = location.state?.from?.pathName || "/";

  useEffect(()=>{
    if (user) {
      navigate('/');
    }
  },[user, navigate])

  const handleSinginWithgoogle = () => {
    singInWithGoogle()
      .then((result) => {
        toast.success("Continue with Google successful!");
        console.log(result);
        

        const userData = {
          email: result.user.email,
          name: result.user.displayName,
          photoURL: result.user.photoURL,
        }
        axiosInstance.post("/users", userData)
          .then(() => {})
      })
      .catch((err) => {
        const errorMessage = err.message;
        toast.error(errorMessage);
      });
  };

  const handleSingIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    const password = form.password.value;

    login(email, password)
      .then(() => {
        toast.success("Login successful!");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div>
      <div className="hero min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse min-w-[90%]">
          <div className="card bg-base-100 min-w-[90%] md:min-w-[70%] lg:min-w-[480px] max-w-sm shrink-0 shadow-2xl">
            <h1 className="text-5xl font-bold text-center mt-3">Login now!</h1>
            <div className="card-body">
              <form onSubmit={handleSingIn}>
                <fieldset className="fieldset">
                  <label className="label">Email</label>
                  <input
                    name="email"
                    type="email"
                    className="input w-full"
                    placeholder="Enter Your Email"
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
                  <button className="btn btn-neutral mt-4 primary-btn">
                    Login
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
                    to="/register"
                    data-discover="true"
                  >
                    {" "}
                    Register
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

export default Login;
