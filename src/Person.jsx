import React, { useState } from "react";
import "./Person.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import image from "./starwars.png";

function Person() {
    const { id } = useParams();
    const [personDetails, setPersonDetails] = useState(null);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        getPersonDetails(id);
    }, [id]);

    // Function to fetch person details from the API

    const getPersonDetails = async (id) => {
        setLoader(true);
        try {
            if (!id) {
                alert("Invalid ID");
                return;
            }
            const apiUrl = `https://swapi.dev/api/people/${id}`;
            const response = await axios.get(apiUrl);
            console.log(response);
            setPersonDetails(response.data);
            setTimeout(() => {
                setLoader(false);
            }, 1300);
        } catch (error) {
            console.error("Error fetching people:", error);
            alert("Error fetching people:", error);
            setLoader(false);
        }
    };

    return loader ? (
        <div class="loader"></div>
    ) : (
        <div className="main-container-detail">
            <div className="person-image">
                <img src={image} alt="img" />
            </div>
            <div className="person-detail-main">
                <div className="person-detail">
                    <p>
                        <strong>Name:</strong> {personDetails?.name}
                    </p>
                    <p>
                        <strong>Gender: </strong>
                        {personDetails?.gender}
                    </p>
                    <p>
                        <strong>Height: </strong>
                        {personDetails?.height / 100} meter
                    </p>
                    <p>
                        <strong>Mass: </strong>
                        {personDetails?.mass} Kgs
                    </p>
                    <p>
                        <strong>Hair-Color: </strong>
                        {personDetails?.hair_color}
                    </p>
                    <p>
                        <strong>Skin-Color: </strong>
                        {personDetails?.skin_color}
                    </p>
                    <p>
                        <strong>Eye-Color: </strong>
                        {personDetails?.eye_color}
                    </p>
                    <p>
                        <strong>Birth-year: </strong>
                        {personDetails?.birth_year}
                    </p>
                    <p>
                        <strong>Number of Films: </strong>
                        {personDetails?.films?.length}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Person;
