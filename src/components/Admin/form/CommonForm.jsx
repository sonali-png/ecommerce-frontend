import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import FormFields from "./FormFields";
import Loader from "../Loader";
import Popup from "../Popup";

import useCommonList from "../../../hooks/useCommonList";
import useCrud from "../../../hooks/useCrud";
import CommonStyles from "../../../css/Admin/Common.module.css";

export default function CommonForm({ config }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const { loading, addRecord, updateRecord } = useCrud();
    const { records } = useCommonList(config.collection);
    const [formData, setFormData] = useState(config.initialValues);
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const [popupType, setPopupType] = useState("");
    const [errors, setErrors] = useState("");

    const clearError = (fieldName) => {
        setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors[fieldName];
            return newErrors;
        });
    };
    useEffect(() => {
        if (!id) return;

        const record = records.find(item => item._id === id);

        if (!record) return;

        const loadedData = config.afterLoad
            ? config.afterLoad(record)
            : record;

        setFormData(loadedData);

    }, [id, records]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (config.validate) {
            const validationErrors = config.validate(formData);
            if (Object.keys(validationErrors).length > 0) {
                setErrors(validationErrors);
                return;
            }
        }
        // setErrors({});

        const data = config.beforeSubmit
            ? config.beforeSubmit(formData)
            : formData;
                    
        const payload = new FormData();

        payload.append("collectionName", config.collection);
        payload.append("data", JSON.stringify(data));

        let response;
        try {
            if (id) {
                payload.append("id", id);
                response = await updateRecord(payload);
            } else {
                response = await addRecord(payload);
            }
            setShowPopup(true);
            setPopupMessage((response.message));
            setPopupType("success");
        } catch (error) {
            console.log(error);
            setPopupType("error");
            setPopupMessage(
                error?.response?.message || 
                "Something went wrong"
            )
            setShowPopup(true);
        }
        
    };

    return (
        <>
            { loading && <Loader />}
            <div className={CommonStyles.formContainer}>

                <div className={CommonStyles.formHeader}>
                    <h3>{id ? `Edit ${config.title}` : `Add ${config.title}`}</h3>
                </div>

                <form onSubmit={handleSubmit}>
                    
                    {config.fields.map(field => (
                        
                            <FormFields
                                key={field.name}
                                field={field}
                                value={formData[field.name]}
                                formData={formData}
                                setFormData={setFormData}
                                error={errors[field.name]}
                                clearError={clearError}
                            />
                    ))}

                    <button
                        type="submit"
                        className={CommonStyles.btn}
                    >
                        {id ? "Update" : "Save"}
                    </button>

                    <Popup
                        open={showPopup}
                        type={popupType}
                        message={popupMessage}
                        onClose = {() => {
                            setShowPopup(false);
                            if (popupType === "success") {
                                navigate(config.redirect);
                            }
                        }}
                    />


                </form>

            </div>
        </>
    );
}