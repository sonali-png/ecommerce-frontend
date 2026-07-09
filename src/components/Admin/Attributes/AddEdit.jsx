import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../Admin/css/style.css";
import useCrud from "../../../hooks/useCrud";

export default function AddEdit() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [values, setValues] = useState([""]);
    const { addRecord, updateRecord } = useCrud();
    const [isFilterable, setIsFilterable] = useState(false);


    const addInput = () => {
        setValues(prev => [...prev, ""]);
    };

    const updateValue = (index, value) => {
        setValues(prev =>
            prev.map((item, i) =>
                i === index ? value : item
            )
        );
    };

    const removeValue = (index) => {
        setValues(prev =>
            prev.filter((_, i) => i !== index)
        );
    };
    const saveAttribute = async (payload) => {
        if (id) {
            payload.append("id", id);
            await updateRecord(payload);
        } else {
            await addRecord(payload);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const finalValues = values
            .map(v => v.trim())
            .filter(Boolean);

        const payload = new FormData();

        payload.append("collectionName", "attributes");

        payload.append(
            "data",
            JSON.stringify({
                name: name.trim(),
                values: finalValues
            })
        );

        try {
            await saveAttribute(payload);
            navigate("/admin/attributes");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="content-wrapper">
            <h2>
                {id ? "Edit Attribute" : "Add Attribute"}
            </h2>

            <form onSubmit={handleSubmit} className="form-input-wrapper">
                <div className="form-fields">
                    <div className="column1">

                        <div className="input-box">
                            <h4>Name</h4>
                            <input
                                type="text"
                                placeholder="Attribute Name"
                                value={name}
                                onChange={(e) =>
                                    setName(e.target.value)
                                }
                            />
                        </div>

                        <div className="input-box">
                            <div className="checkbox-wrapper">
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        checked={isFilterable}
                                        onChange={(e) => {
                                            setIsFilterable(e.target.checked);
                                        }}
                                    />
                                    <span>Is filterable ?</span>
                                </label>
                            </div>
                        </div>

                        <div className="input-box">
                            <h4>Values</h4>

                            {values.map((value, index) => (
                                <div
                                    key={index}
                                    className="attribute-add-row input-with-button"
                                >
                                    <input
                                        type="text"
                                        placeholder={`Value ${index + 1}`}
                                        value={value}
                                        onChange={(e) =>
                                            updateValue(index, e.target.value)
                                        }
                                    />

                                    {values.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeValue(index)}
                                        >
                                            Remove
                                        </button>
                                    )}
                                    
                                </div>
                            ))}

                            

                            <button
                                type="button"
                                onClick={addInput}
                            >
                                Add more
                            </button>
                        </div>
                        
                    </div>
                </div>
                <br></br>
                <button type="submit" className="submit-btn">Save Attribute</button>
            </form>
        </div>
    );
}