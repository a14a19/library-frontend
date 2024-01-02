import { useEffect } from "react";
import { HiOutlineArrowLeft } from "react-icons/hi"
import { btnCss, inputCss } from "../common-css/commonCss"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { getBasedOnUserApi } from "../features/userData/userSlice";


function UserTrans() {

    const { userHistory } = useSelector((store) => store.user)
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const location = useLocation();
    const path = location.pathname.split("/")[1]
    const localData = localStorage.getItem("user");
    const user = JSON.parse(localData);

    useEffect(() => {
        if (!localData) {
            navigate("/login")
        }
    }, [path, localData])

    useEffect(() => {
        console.log(user._id, user.token)
        dispatch(getBasedOnUserApi({ body: "", params: user._id, options: user.token }))
    }, [])

    return (
        <div className="bg-white rounded-lg py-3 px-4">
            <div className="flex items-center justify-between">
                <Link to="/">
                    <HiOutlineArrowLeft />
                </Link>
                <h2 className="text-center font-semibold my-2">History</h2>
                <div></div>
            </div>
            <table className="table-fixed w-full my-5">
                <thead>
                    <tr>
                        <th className="border-b-2 border-gray-500 py-2 px-3">Book Name</th>
                        <th className="border-b-2 border-gray-500 py-2 px-3">Status</th>
                        <th className="border-b-2 border-gray-500 py-2 px-3">Due Date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        userHistory &&
                        userHistory.map((transaction, i) => {
                            return (
                                <tr key={i}>
                                    <td className="border-b-2 border-gray-300 font-semibold py-2 px-3">{transaction?.bookId && transaction?.bookId?.name}</td>
                                    <td className="text-center border-b-2 border-gray-300 py-2 px-3">{transaction.transactionType}</td>
                                    <td className="text-center border-b-2 border-gray-300 py-2 px-3">{transaction.dueDate.split("T")[0]}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default UserTrans