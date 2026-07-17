import Text from "./fields/TextField";
import TextArea from "./fields/TextArea";
import Select from "./fields/SelectField";
import Checkbox from "./fields/CheckboxField";
import CheckboxGroup from "./fields/CheckboxGroup";
import FileUpload from "./fields/FileUpload";

export default function FormFields({
    field,
    value,
    formData,
    setFormData
}) {

    // Hide field if visible() returns false
    if (field.visible && !field.visible(formData)) {
        return null;
    }

    const commonProps = {
        field,
        value,
        formData,
        setFormData
    };

    switch (field.type) {

        case "text":
        case "email":
        case "password":
        case "number":
            return <Text {...commonProps} />;

        case "textarea":
            return <TextArea {...commonProps} />;

        case "select":
            return <Select {...commonProps} />;

        case "checkbox":
            return <Checkbox {...commonProps} />;

        case "checkboxGroup":
            return <CheckboxGroup {...commonProps} />;

        case "file":
            return <FileUpload {...commonProps} />;

        default:
            return null;
    }
}