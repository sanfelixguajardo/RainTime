import React, {useEffect, useState} from 'react';
import useCSS from "../hooks/useCSS";
import EditSvg from "./svg/EditSvg";
import SaveSvg from "./svg/SaveSvg";
import CancelSvg from "./svg/CancelSvg";
import DeleteSvg from "./svg/DeleteSvg";

const Program = ( { program, handleSave, handleDelete }) => {
    const ProgramCSS = useCSS();

    const [name, setName] = useState('');
    const [hour, setHour] = useState('');
    const [duration, setDuration] = useState(0);
    const [selectedDays, setSelectedDays] = useState([]);

    const [editMode, setEditMode] = useState(false);

    useEffect( () => {

        initializeStates();

    },[]);

    const initializeStates = () => {
        // initialize states
        setName(program.name);
        setHour(program.hour);
        setDuration(program.duration);
        setSelectedDays(program.wateringDays.filter((W_day) => W_day.selected === true).map((W_day) => W_day.day));
    };

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleCancel = () => {
        initializeStates();
        setEditMode(false);
    };

    const handleCheckboxChange = (e) => {

        const isActive = e.target.checked;
        const day = e.target.value;

        if (isActive) {
            setSelectedDays([...selectedDays, day]);

        } else {
            setSelectedDays((prevData) => {
                return prevData.filter((d) => d !== day);
            });
        }
    };


    return (

        <div className={ProgramCSS.programCard}>

            <div className={ProgramCSS.inputFields}>
                <label>
                    <input className={ProgramCSS.nameInput}
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        readOnly={!editMode}
                    />
                </label>

                <label>
                    <input className={ProgramCSS.hourInput}
                           type="time"
                           value={hour}
                           onChange={(e) => setHour(e.target.value)}
                           readOnly={!editMode}
                    />
                </label>

                <label>
                    <input className={ProgramCSS.durationInput}
                        type="number"
                        min="1"
                        max="10"
                        value={duration}
                        onChange={(e) => setDuration(parseInt(e.target.value))}
                        readOnly={!editMode}
                    />
                </label>

            </div>

            <div className={ProgramCSS.weekDays}>
                {program.wateringDays.map((W_day, index) => (
                    <div key={index}>
                        <label className={ProgramCSS.labelDay}>
                            <input className={ProgramCSS.checkbox}
                                type="checkbox"
                                value={W_day.day}
                                checked={selectedDays.includes(W_day.day)}
                                onChange={handleCheckboxChange}
                                disabled={!editMode}
                            />
                            <span className={ProgramCSS.square}>{W_day.day}</span>
                        </label>
                    </div>
                ))}
            </div>

            {!editMode &&
                <button className={ProgramCSS.but} onClick={handleEdit}>
                    <EditSvg />
                </button>
            }

            {editMode &&
                <>
                    <button className={ProgramCSS.but} onClick={() => {
                        handleSave(program, name, hour, duration, selectedDays);
                        setEditMode(false);
                    } }>
                        <SaveSvg />
                    </button>

                    <button className={ProgramCSS.but} onClick={handleCancel}>
                        <CancelSvg />
                    </button>

                    <button className={ProgramCSS.but} onClick={() => handleDelete(program)}>
                        <DeleteSvg />
                    </button>
                </>
            }

        </div>
    );
};

export default Program;