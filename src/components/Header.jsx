import { Link } from "react-router-dom"
import { useSelector } from "react-redux";

function Header() {

    const { role } = useSelector((store) => store.auth)
    const localData = localStorage.getItem("user");
    const user = JSON.parse(localData);

    return (
        <header className="z-30 fixed top-4 right-0 left-0 bg-[#8787871a] backdrop-blur py-3 px-4 max-w-[1140px] w-full mx-auto rounded-3xl font-semibold overflow-hidden flex justify-between">
            <Link to="/">LS</Link>
            {
                (role === "admin" || user.role === "admin") && (
                    <Link to="/add-book">
                        Add Book
                    </Link>
                )
            }
            {
                (role === "user" || user.role === "user") && (
                    <Link to="/history">
                        Transaction
                    </Link>
                )
            }
        </header>
    )
}

export default Header

//     z-index: 15;
//     backdrop-filter: blur(8px);
//     -webkit-backdrop-filter: blur(8px);