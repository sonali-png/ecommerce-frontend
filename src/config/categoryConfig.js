export const categoryConfig = {
    title: "Category",
    collection: "categories",
    redirect: "/admin/categories",
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
            placeholder: "Search category name",
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
        description: "",
        parentCategory: "",
        attributeIds: []
    },
    fields: [ 
        {
            type: "text",
            name: "name",
            label: "Category Name"
        },

        {
            type: "textarea",
            name: "description",
            label: "Description"
        },

        {
            type: "checkbox",
            name: "isParent",
            label: "Is Parent"
        },

        {
            type: "select",
            name: "parentCategory",
            label: "Parent Category",
            collection: "categories",
            valueField: "_id",
            labelField: "name",
            visible: (form)=>!form.isParent
        },

        {
            type: "checkboxGroup",
            name: "attributeIds",
            label: "Attributes",
            collection: "attributes",
            labelField: "name",
            valueField: "_id"
        }
    ],
    beforeSubmit(formData) {
        return {
            ...formData,
            isParent: undefined,
            parentCategory: formData.isParent
                ? null
                : formData.parentCategory

        };

    },
    afterLoad(record) {
        return {
            ...record,
            isParent: !record.parentCategory
        };

    },
    validate(formData) {
        const errors = {};

        if (!formData.name?.trim()) {
            errors.name = "Name is required.";
        }
        if (!formData.isParent && formData.parentCategory === "") {
            errors.parentCategory = "Please select parent category";
        }
        if (!formData.attributeIds || formData.attributeIds.length === 0) {
            errors.attributeIds = "Please select attributes";
        }
        return errors;
    }
};