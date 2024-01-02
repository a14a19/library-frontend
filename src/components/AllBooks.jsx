import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allBooksDataAPI, bookDataByIdAPI, bookDeleteId } from "../features/bookData/bookDataSlice";
import { HiPencil, HiTrash } from "react-icons/hi";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { openPopup } from "../features/auth/authSlice";

function AllBooks() {

    const { token } = useSelector((store) => store.auth)
    const { bookData, bookById } = useSelector((store) => store.bookData)
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
    }, [path])

    useEffect(() => {
        console.log(bookById, "value changed")
        if (token) {
            dispatch(allBooksDataAPI({ body: "", params: "", options: token }))
        } else if (user) {
            dispatch(allBooksDataAPI({ body: "", params: "", options: user.token }))
        }
    }, [bookById])

    const handleDelete = (e, bookId) => {
        e.preventDefault();
        dispatch(bookDataByIdAPI({ body: "", params: bookId, options: user.token }))
        dispatch(openPopup())
    }

    return (
        <div className="bg-white rounded-lg py-3 px-4 flex flex-wrap gap-5">
            {
                bookData &&
                bookData.map((book) => {
                    return (
                        <div key={book._id} className="w-[280px] flex flex-col justify-between rounded-lg border border-gray-200 shadow-[0_0_60px_-15px_rgba(0,0,0,0.3)] p-3 h-[10rem] relative">
                            {user.role == "admin" && (
                                <>
                                    <Link className="w-min text-base font-semibold absolute top-1 right-1" title="Edit Transaction" to={`/transactions/${book._id}`}><HiPencil /></Link>
                                    <Link className="w-min text-base font-semibold absolute top-7 right-1" title="Delete Book" onClick={(e) => handleDelete(e, book._id)}><HiTrash className="text-red-600" /></Link>
                                </>
                            )
                            }
                            <div>
                                <h2 className="font-semibold">{book.name}</h2>
                                <h4 className="italic text-sm">by {book.author}</h4>
                            </div>
                            {
                                book.status == "available" && (
                                    <button className="uppercase text-xs w-full bg-green-600 text-white py-1.5 rounded-lg">{book.status}</button>
                                )
                            }
                            {
                                book.status == "borrowed" && (
                                    <button className="uppercase text-xs w-full bg-red-600 text-white py-1.5 rounded-lg">{book.status}</button>
                                )
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}

export default AllBooks;