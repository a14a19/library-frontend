import Header from "../components/Header"
import Footer from "../components/Footer"
import AllBooks from "../components/AllBooks"
import { Routes, Route } from "react-router-dom";
import BookTrans from "../components/BookTrans";
import AddNewBook from "../components/AddNewBook";
import UserTrans from "../components/UserTrans";

function Home() {
    return (
        <>
            <Header />
            <div className="pt-20">
                <Routes>
                    <Route exact path="/" element={<AllBooks />} />
                    <Route exact path="/transactions/:bookId" element={<BookTrans />} />
                    <Route exact path="/add-book" element={<AddNewBook />} />
                    <Route exact path="/history" element={<UserTrans />} />
                </Routes>
            </div>
            <Footer />
        </>
    )
}

export default Home