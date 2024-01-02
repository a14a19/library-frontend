import { useLocation, useNavigate } from "react-router-dom";
import { btnCss, inputCss } from "../common-css/commonCss";
// import { userSignUp } from "../apis/api";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authorization, userSignUpApi } from "../features/auth/authSlice";

function LoginSignup() {

    const [userForm, setUserForm] = useState({ name: "", userName: "", email: "", number: "", password: "", });
    const dispatch = useDispatch();
    const { auth } = useSelector((store) => store.auth)
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname.split("/")[1]
    const localData = localStorage.getItem("user")
    const userDetail = JSON.parse(localData);

    useEffect(() => {
        setUserForm({ name: "", userName: "", email: "", number: "", password: "", })
        if (userDetail) {
            navigate("/");
        }
    }, [path])

    useEffect(() => {
        if (auth) {
            navigate("/");
        }
    }, [auth])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (path == "login") {
            dispatch(authorization({ email: userForm.email, password: userForm.password }))
            // console.log(e.target.emailSignIn.value, e.target.passwordSignIn.value, auth)
        } else {
            const data = await dispatch(userSignUpApi(userForm))
            // console.log(data.payload.status, e.target.email.value, e.target.password.value, e.target.name.value, e.target.number.value, e.target.userName.value)
            // dispatch(userSignUpApi(userForm));
            if (data.payload.status) {
                navigate("/login");
            }
            // console.log(await userSignUp(userForm))
        }
    }

    return (
        <section className="w-full h-full flex items-center justify-center">
            <div className="min-h-min bg-white md:w-6/12 w-full p-5 rounded-lg">
                <div>
                    <button className={btnCss} onClick={() => navigate(`${path == 'login' ? '/sign-up' : '/login'}`)}>{path == 'login' ? 'Sign Up' : 'Sign In'}</button>
                </div>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <h2 className="text-center my-3 font-bold text-lg">{path !== 'login' ? 'Sign Up' : 'Sign In'}</h2>
                    {
                        path == "sign-up" ? (
                            <>
                                <input type='text' placeholder='Name' name="name" value={userForm.name} required className={inputCss} onChange={(e) => setUserForm({ ...userForm, name: e.target.value })} />
                                <input type='text' placeholder='User Name' name="userName" value={userForm.userName} required className={inputCss} onChange={(e) => setUserForm({ ...userForm, userName: e.target.value })} />
                                <input type='number' placeholder='Number' name="number" value={userForm.number} required className={inputCss} onChange={(e) => setUserForm({ ...userForm, number: e.target.value })} />
                                <input type='email' placeholder='Email' name="email" value={userForm.email} required className={inputCss} onChange={(e) => setUserForm({ ...userForm, email: e.target.value })} />
                                <input type='password' placeholder='Password' name="password" value={userForm.password} required className={inputCss} onChange={(e) => setUserForm({ ...userForm, password: e.target.value })} />
                            </>
                        ) : (
                            <>
                                <input type='email' placeholder='Email' name="emailSignIn" value={userForm.email} className={inputCss} required onChange={(e) => setUserForm({ ...userForm, email: e.target.value })} />
                                <input type='password' placeholder='Password' name="passwordSignIn" value={userForm.password} className={inputCss} required onChange={(e) => setUserForm({ ...userForm, password: e.target.value })} />
                            </>
                        )
                    }
                    <button type="submit" className={`${btnCss} w-full my-2`}>
                        {path !== 'login' ? 'Sign Up' : 'Sign In'}
                    </button>
                </form>
            </div>
        </section>
    )
}

export default LoginSignup