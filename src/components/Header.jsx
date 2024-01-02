import { Link, useNavigate, useLocation } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { btnCss } from "../common-css/commonCss";
import Lib from "../assets/library.svg";
import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import { logoutUser } from "../features/auth/authSlice";
// import { ChevronDownIcon } from '@heroicons/react/20/solid'

function Header() {

    const { role } = useSelector((store) => store.auth)
    const localData = localStorage.getItem("user");
    const user = JSON.parse(localData);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const location = useLocation();
    const path = location.pathname.split("/")[1]

    useEffect(() => {
        console.log(localData);
        if (!localData) {
            navigate("/login")
        }
    }, [])

    const logout = () => {
        dispatch(logoutUser())
        setTimeout(() => {
            navigate("/login")
        }, 1500)
    }


    return (
        <header className="z-30 fixed top-4 right-0 left-0 bg-[#8787871a] backdrop-blur py-3 px-4 max-w-[1140px] w-full mx-auto rounded-3xl font-semibold flex justify-between items-center">
            <Link to="/" className="flex justify-center items-center">
                <img src={Lib} alt="" className="h-6 me-2" />
                <span>Library</span>
            </Link>
            <div className="">
                <Menu as="div" className="relative inline-block text-left">
                    <div>
                        <Menu.Button className={`${btnCss} mx-3`}>
                            Options
                        </Menu.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                            <div className="px-1 py-1 ">
                                <Menu.Item>
                                    {({ active }) => (
                                        <Link to={(role === "admin" || (user && user.role === "admin")) ? "/add-book" : "/history"}>
                                            <button
                                                className={`${active ? 'bg-black text-white' : 'text-gray-900'
                                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                            >
                                                {(role === "admin" || (user && user.role === "admin")) ? "Add book" : "Transaction"}
                                            </button>
                                        </Link>
                                    )}
                                </Menu.Item>
                            </div>
                            <div className="px-1 py-1">
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            className={`${active ? 'bg-black text-white' : 'text-gray-900'
                                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                            onClick={() => logout()}
                                        >
                                            Logout
                                        </button>
                                    )}
                                </Menu.Item>
                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
        </header>
    )
}

export default Header

//     z-index: 15;
//     backdrop-filter: blur(8px);
//     -webkit-backdrop-filter: blur(8px);