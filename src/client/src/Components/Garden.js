import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Program from './Program';
import GardenCSS from "../styles/Garden.module.css";
import {CSSProvider} from "../Context/CSSProvider";
import AddSvg from "./svg/AddSvg";

const GARDEN_URL = '/garden';

const Garden = () => {

    const axiosPrivate = useAxiosPrivate();

    const [programs, setPrograms] = useState([]);
    const [selectedProgram, setSelectedProgram] = useState([]);
    const [errMsg, setErrMsg] = useState('');


    useEffect(() => {

        fetchPrograms();

    }, []);


    const fetchPrograms = async () => {
        try {

            const response = await axiosPrivate.get(GARDEN_URL);

            const programs = response?.data;

            setPrograms(programs);
            setSelectedProgram(programs.filter((program) => program.active) || []);

        } catch(err) {

            if (!err?.response)
            {
                setErrMsg('No server response');

            } else if (err.response?.status === 401)
            {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Internal server error');
            }
        }
    }

    const handleAdd = async () => {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        const name = 'newProgram_' + `${hours}:${minutes}:${seconds}`;
        const active = false;

        const day1 = {
            day: 'L',
            selected: true,
        };

        const day2 = {
            day: 'M',
            selected: false,
        };

        const day3 = {
            day: 'X',
            selected: false,
        };

        const day4 = {
            day: 'J',
            selected: false,
        };

        const day5 = {
            day: 'V',
            selected: false,
        };

        const day6 = {
            day: 'S',
            selected: false,
        };

        const day7 = {
            day: 'D',
            selected: false,
        };

        const wateringDays = [day1, day2, day3, day4, day5, day6, day7];

        const program = {
            name: name,
            active: active,
            hour: '13:00',
            duration: 8,
            wateringDays: wateringDays
        };

        try {
            const response = await axiosPrivate.post(GARDEN_URL, JSON.stringify(program));

            await fetchPrograms();

            setErrMsg('');

        } catch (err) {
            if (!err?.response)
            {
                setErrMsg('No server response');

            } else if (err.response?.status === 401)
            {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Internal server error');
            }
        }
    }

    const handleDelete = async (program) => {

        if (program.active === true) {
            return setErrMsg('Program must be deactivated first');
        }

        try {
            const url = `${GARDEN_URL}/${program._id}`;

            const response = await axiosPrivate.get(url);

            await fetchPrograms();

            setErrMsg('');

        } catch (err) {
            if (!err?.response)
            {
                setErrMsg('No server response');

            } else {
                setErrMsg('Internal server error');
            }
        }
    }

    const handleSave = async (program, name, hour, duration, selectedDays) => {

        try {

            const url = `${GARDEN_URL}/${program._id}`;

            // fields to change
            program.name = name;
            program.hour = hour;
            program.duration = duration;


            Object.keys(program.wateringDays).forEach(key => {
                if (selectedDays.includes(program.wateringDays[key].day)) {
                    program.wateringDays[key].selected = true;
                } else {
                    program.wateringDays[key].selected = false;
                }
            });

            const response = await axiosPrivate.put(
                url,
                JSON.stringify(program),
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                }
            );

            if (program.active) {
                const response = await axiosPrivate.get(
                    `${GARDEN_URL}/activate/${program._id}`,
                    JSON.stringify(program),
                    {
                        headers: {'Content-Type': 'application/json'},
                        withCredentials: true
                    }
                );
            }

            setErrMsg('');

        } catch (err) {
            if (!err?.response)
            {
                setErrMsg('No server response');

            } else if (err.response?.status === 400)
            {
                setErrMsg('Missing required fields');

            } else if (err.response?.status === 433) {

                setErrMsg('At least one day must be active');

            }
            else {
                setErrMsg('Internal server error');
            }
        }
    };

    const handleSelectProgram = async (e) => {

        const isActive = e.target.checked;
        const program = programs.filter((program) => program.name === e.target.value);

        if (isActive) {

            try {
                const url = `${GARDEN_URL}/activate/${program[0]._id}`;

                const response = await axiosPrivate.get(url);

                await fetchPrograms();

                console.log(response.data);

                setErrMsg('');

            } catch (err) {
                if (!err?.response)
                {
                    setErrMsg('No server response');

                } else if (err.response?.status === 400)
                {
                    setErrMsg('Missing required fields');

                } else {
                    setErrMsg('Internal server error');
                }
            }

        } else {
            try {
                const url = `${GARDEN_URL}/deactivate/${program[0]._id}`;

                const response = await axiosPrivate.get(url);

                await fetchPrograms();

                console.log(response);

                setErrMsg('');

            } catch (err) {
                if (!err?.response)
                {
                    setErrMsg('No server response');

                } else if (err.response?.status === 400)
                {
                    setErrMsg('Missing required fields');

                } else {
                    setErrMsg('Internal server error');
                }
            }
        }

    }


    return (
        <CSSProvider cssModule={GardenCSS}>
            <main>
                <p>Garden</p>
                <p className={errMsg ? GardenCSS.errMsg : "offscreen"} aria-live="assertive"> {errMsg} </p>
                {programs.map((program, index) => (
                    <div className={GardenCSS.card} key={index}>
                        <label className={GardenCSS.label}>
                            <input
                                className={GardenCSS.checkbox}
                                type="checkbox"
                                value={program.name}
                                checked={selectedProgram.includes(program)}
                                onChange={handleSelectProgram}
                            />
                            <span className={GardenCSS.span}></span>
                        </label>
                        <Program program={program} handleSave={handleSave} handleDelete={handleDelete}/>
                    </div>))}

                <button className={GardenCSS.butAdd} onClick={handleAdd}>
                    <AddSvg />
                </button>
            </main>
        </CSSProvider>
    )
}

export default Garden