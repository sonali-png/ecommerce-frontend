export const attributeConfig = {
    title: "Attribute",
    collection: "attributes",
    redirect: "/admin/attributes",
    columns: [
        {
            header:"#",
            type:"serial"
        },
        {
            header:"Name",
            field:"name"
        },
        {
            header:"Status",
            type:"status",
            field:"status"
        },
        {
            header:"Actions",
            type:"actions"
        }
    ],
    filters: [
        {
            name: "search",
            type: "search",
            placeholder: "Search attribute name",
        },
        {
            name: "status",
            type: "select",
            placeholder: "Status",
            options: [
                {
                    label: "Active",
                    value: true
                },
                {
                    label: "Inactive",
                    value: false
                }
            ]
        }
    ],
    initialValues: {
        name: "",
        isFilterable: false,
        isUsedForMeasurement: false,
        isVariant: false,
        status: true,
        values: [""]
    },
    fields: [ 
        {
            type: "text",
            name: "name",
            label: "Attribute Name"
        },
        {
            type: "text",
            name: "values",
            label: "values",
            addMore:true
        },
        {
            type: "checkbox",
            name: "isFilterable",
            label: "Is Filterable"
        },
        {
            type: "checkbox",
            name: "isUsedForMeasurement",
            label: "Is Used For Measurement"
        },
        {
            type: "checkbox",
            name: "isVariant",
            label: "Is Variant"
        },
        {
            type: "checkbox",
            name: "status",
            label: "Is Active"
        } 
    ],
    validate(formData) {
        const errors = {};
        if (!formData?.name.trim()) {
            errors.name = "Name is required.";
        }
        const values = (formData.values || [])
            .map(v => v.trim())
            .filter(v => v !== "");

        if (values.length === 0) {
            errors.values = "Please enter at least one value.";
        }
        return errors;
    }
};