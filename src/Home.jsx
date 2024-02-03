import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import image from "./starwars.png";
import { useLocation, useNavigate } from "react-router-dom";

function Home() {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const [people, setPeople] = useState([]);
    const [page, setPage] = useState(parseInt(searchParams.get("page")) || 1);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        getPeople(page);
    }, [page]);

    // Function to fetch people data from the API

    const getPeople = async (page) => {
        setLoader(true);
        try {
            if (!page || page <= 0) {
                alert("Nagetive Page Not Found");
                return;
            }
            const apiUrl = `https://swapi.dev/api/people/?page=${page}`;
            const response = await axios.get(apiUrl);
            setPeople(response.data.results);
            setTimeout(() => {
                setLoader(false);
            }, 1000);
        } catch (error) {
            console.error("Error fetching people:", error);
            alert("Error fetching people:", error);
            setLoader(false);
        }
    };

    // Function to change the current page

    const changePage = (newPage) => {
        setLoader(true);
        if (!newPage || newPage <= 0) {
            alert("Nagetive Page Not Found");
            return;
        }
        setPage(newPage);
    };

    // Function to navigate to the details of a specific person

    const clickedOnPerson = (index) => {
        const x = (page - 1) * 10 + index;
        navigate(`/person/${x}`);
    };

    return loader ? (
        <div class="loader"></div>
    ) : (
        <div className="main-container">
            <div className="card-container">
                {people.map((it, index) => {
                    return (
                        <div
                            key={it.name}
                            className="card"
                            onClick={() => clickedOnPerson(index + 1)}
                        >
                            <img src={image} alt="img" />
                            <p>
                                <strong>Name: </strong> {it.name}
                            </p>
                            <p>Gender: {it.gender}</p>
                        </div>
                    );
                })}
            </div>
            <div className="pagination">
                <div onClick={() => changePage(page - 1)}>Prev</div>
                <div>
                    <p>{page}</p>
                </div>
                <div onClick={() => changePage(page + 1)}>Next</div>
            </div>
        </div>
    );
}

export default Home;
