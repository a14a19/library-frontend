import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { closeErrBox } from '../../features/auth/authSlice';
import { btnCss } from '../../common-css/commonCss';
import { bookDataByIdAPI, deleteBookAPI } from '../../features/bookData/bookDataSlice';

function Popup() {
    const { isErr, errorMsgArr, errorMsg } = useSelector((store) => store.auth)
    const { bookById } = useSelector((store) => store.bookData)
    const user = JSON.parse(localStorage.getItem("user"));
    const dispatch = useDispatch()

    function closeModal(e) {
        console.log(e, "btnFree")
        // if (bookById) {
        //     dispatch(deleteBookAPI({ body: "", params: bookById._id, options: user.token }))
        // }
        return dispatch(closeErrBox())
    }

    function closeModalDel(e) {
        console.log(e, "btn")
        if (bookById) {
            dispatch(deleteBookAPI({ body: "", params: bookById._id, options: user.token }))
        }
        return dispatch(closeErrBox())
    }

    return (
        <Transition appear show={isErr} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-red-600"
                                >
                                    {errorMsgArr.length > 0 || errorMsg && "Error!"}
                                    {bookById && "Are you sure, you want to delete it ?"}
                                </Dialog.Title>
                                <div className="mt-2">
                                    {
                                        errorMsgArr.length > 0 && (
                                            <>
                                                {errorMsgArr[0].msg}
                                            </>
                                        )
                                    }
                                    {
                                        errorMsg && (
                                            <>
                                                {errorMsg}
                                            </>
                                        )
                                    }
                                    {
                                        bookById && (
                                            <>
                                                <h4>{bookById.name}</h4>
                                            </>
                                        )
                                    }
                                </div>

                                <div className="mt-4">
                                    {
                                        errorMsgArr.length > 0 || errorMsg
                                        &&
                                        <button
                                            type="button"
                                            className={btnCss}
                                            onClick={closeModal}
                                        >
                                            Close
                                        </button>
                                    }
                                    {
                                        bookById
                                        &&
                                        <button
                                            type="button"
                                            className={btnCss}
                                            onClick={closeModalDel}
                                        >
                                            Yes
                                        </button>
                                    }
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default Popup