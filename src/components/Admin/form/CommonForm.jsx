import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import FormFields from "./FormFields";
import useCommonList from "../../../hooks/useCommonList";
import useCrud from "../../../hooks/useCrud";
import CommonStyles from "../../../css/Admin/Common.module.css";

export default function CommonForm({ config }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addRecord, updateRecord } = useCrud();
    const { records } = useCommonList(config.collection);
    const [formData, setFormData] = useState(config.initialValues);

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

        const data = config.beforeSubmit
            ? config.beforeSubmit(formData)
            : formData;

        const payload = new FormData();

        payload.append("collectionName", config.collection);
        payload.append("data", JSON.stringify(data));

        if (id) {
            payload.append("id", id);
            await updateRecord(payload);
        } else {
            await addRecord(payload);
        }

        navigate(config.redirect);
    };

    return (
        
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
                        />
                ))}

                <button
                    type="submit"
                    className={CommonStyles.btn}
                >
                    {id ? "Update" : "Save"}
                </button>

            </form>

        </div>
    );
}