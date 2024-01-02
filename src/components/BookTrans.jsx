import { btnCss, inputCss } from "../common-css/commonCss"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { getAllUsersApi } from "../features/userData/userSlice";
import { bookDataByIdAPI, getTransTypeUpdateApi, transTypeCreateApi, transTypeUpdateApi } from "../features/bookData/bookDataSlice";
import { HiOutlineArrowLeft } from "react-icons/hi";

function BookTrans() {

    const [transData, setTransData] = useState({ userId: "", bookId: "", transType: "", date: "" });
    const { token } = useSelector((store) => store.auth)
    const { usersData } = useSelector((store) => store.user)
    const { bookById, transType } = useSelector((store) => store.bookData)
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const location = useLocation();
    const path = location.pathname.split("/")[2]
    const localData = localStorage.getItem("user");
    const user = JSON.parse(localData);

    useEffect(() => {
        if (!localData) {
            navigate("/login")
        }
        if (path) {
            setTransData({ ...transData, bookId: path })
            dispatch(bookDataByIdAPI({ body: "", params: path, options: user.token }))
        }
    }, [path])

    useEffect(() => {
        // console.log(token, user.token)
        if (token) {
            dispatch(getAllUsersApi({ body: "", params: "", options: token }))
        } else if (user) {
            dispatch(getAllUsersApi({ body: "", params: "", options: user.token }))
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log("e.target.date", transData.transType, transType.transactionType)
        if (transType && (transData.transType !== transType.transactionType)) {
            // update old entry amd update book

            await dispatch(transTypeUpdateApi({ body: { transactionType: transData.transType }, params: { bookId: path, userId: transData.userId }, options: user.token }))
            setTimeout(() => {
                navigate("/")
            }, 1500)
        } else if (transType && transData.transType == transType.transactionType) {
            console.log("do nothing", transData, transType)

        } else {
            console.log(e.target.date.value, transData, transType)
            // create new entry and update book
            await dispatch(transTypeCreateApi({
                body: {
                    userId: transData.userId,
                    bookId: transData.bookId,
                    dueDate: transData.date,
                    transactionType: transData.transType
                }, params: { bookId: path, userId: transData.userId }, options: user.token
            }))
            setTimeout(() => {
                navigate("/")
            }, 1500)
        }

    }

    const onUserChange = async (e) => {
        setTransData({ ...transData, userId: e.target.value })
        console.log(e.target.value);
        if (user) {
            const getData = await dispatch(getTransTypeUpdateApi({ body: "", params: { bookId: path, userId: e.target.value }, options: user.token }))
            if (getData.payload.data.length > 0) {
                setTransData({ ...transData, userId: e.target.value, transType: getData.payload.data[0].transactionType, date: getData.payload.data[0].dueDate.split("T")[0] })
            }
        }
        // setTransData({ ...transData, userId: e.target.value })
    }

    return (
        <div className="bg-white rounded-lg py-3 px-4">
            <div className="flex items-center justify-between">
                <Link to="/">
                    <HiOutlineArrowLeft />
                </Link>
                <h2 className="text-center font-semibold my-2">Book Transaction Entry</h2>
                <div></div>
            </div>
            <form onSubmit={(e) => handleSubmit(e)} className="mx-auto md:w-max w-full">
                <input type='text' placeholder='Book Name' name="bookName" required className={`${inputCss}`} value={bookById.name || ""} disabled />
                <select
                    name="user"
                    autoComplete="userName"
                    className={`${inputCss}`}
                    defaultValue=""
                    onChange={(e) => onUserChange(e)}
                >
                    <option value="" disabled>- Select User -</option>
                    {
                        usersData && usersData.map((user) => {
                            return (
                                <option key={user._id} value={user._id}>{user.name} // {user.userName}</option>
                            )
                        })
                    }
                </select>
                <>
                    <select
                        name="type"
                        autoComplete="Transaction Type"
                        className={`${inputCss}`}
                        value={transData.transType}
                        onChange={(e) => setTransData({ ...transData, transType: e.target.value })}
                    >
                        <option value="" disabled>- Transaction Type -</option>
                        <option value="borrow">Borrow</option>
                        <option value="return">Return</option>
                    </select>
                    <input
                        type="date"
                        className={`${inputCss}`}
                        name="date"
                        value={transData.date}
                        onChange={(e) => setTransData({ ...transData, date: e.target.value })}
                    />
                </>
                <button type="submit" className={`${btnCss} w-full my-2`}>Submit</button>
            </form>
        </div>
    )
}

export default BookTrans