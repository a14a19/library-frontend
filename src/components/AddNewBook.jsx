import { HiOutlineArrowLeft } from "react-icons/hi"
import { Link, useNavigate } from "react-router-dom"
import { btnCss, inputCss } from "../common-css/commonCss";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBookAPI } from "../features/bookData/bookDataSlice";

function AddNewBook() {

    const [addBook, setAddBook] = useState({ name: "", author: "" });
    const dispatch = useDispatch();
    const { } = useSelector((store) => store.bookData)
    const localData = localStorage.getItem("user");
    const user = JSON.parse(localData);
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const bookadded = await dispatch(addBookAPI({ body: addBook, params: "", options: user.token }))
        console.log(bookadded.payload.status, "doneinit")
        if (bookadded.payload.status) {
            navigate("/");
        }
    }

    return (
        <div className="bg-white rounded-lg py-3 px-4">
            <div className="flex items-center justify-between">
                <Link to="/">
                    <HiOutlineArrowLeft />
                </Link>
                <h2 className="text-center font-semibold my-2">Add Book</h2>
                <div></div>
            </div>
            <form onSubmit={(e) => handleSubmit(e)} className="mx-auto md:w-max w-full">
                <input type='text' placeholder='Book Name' name="bookName" required className={`${inputCss}`} onChange={(e) => setAddBook({ ...addBook, name: e.target.value })} />
                <input type='text' placeholder='Author Name' name="author" required className={`${inputCss}`} onChange={(e) => setAddBook({ ...addBook, author: e.target.value })} />
                <button type="submit" className={`${btnCss} w-full my-2`}>Add</button>
            </form>
        </div>
    )
}

export default AddNewBook
