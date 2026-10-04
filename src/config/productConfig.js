export const productConfig = {
    title: "Product",
    collectionName: "products",
    redirect: "/admin/products",
    columns: [
        {
            header:"#",
            type:"serial"
        },

        // {
        //     header:"Image",
        //     type:"image",
        //     field:"image"
        // },

        {
            header:"Product Name",
            field:"name"
        },
        {
            header:"Category",
            field:"categorySlug"
        },

        {
            header:"Brand",
            field:"brandSlug"
        },
        {
            header:"Product Code",
            field:"details.productCode",
            type: "nested"
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
            placeholder: "Search Product Name or SKU",
        },
        {
            name: "category",
            type: "select",
            placeholder: "All Categories",
            collection: "categories",
            labelField: "name",
            valueField: "slug"
        },

        {
            name: "brand",
            type: "select",
            placeholder: "All Brands",
            collection: "brands",
            labelField: "name",
            valueField: "slug"
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
        name: ""
    },
    fields: [ 
        {
            type: "text",
            name: "name",
            label: "Product Name"
        },
        {
            type: "textarea",
            name:"description",
            label: "Description"
        },
        {
            type: "select",
            name:"category",
            label: "Select Category",
            collection: "categories",
            valueField: "_id",
            labelField: "name"
        },
        {
            type: "select",
            name:"brand",
            label: "Select Brand",
            collection: "brands",
            valueField: "_id",
            labelField: "name"
        }   
    ],
    validate(formData) {
        const errors = {};

        if (!formData?.name) {
            errors.name = "Name is required.";
        }
        if (!formData?.description) {
            errors.description = "Description is required";
        }
        if (!formData?.categoryId) {
            errors.categoryId = "Please select category";
        }
        console.log("FORM DATA INSIDE CONFIG ", formData);
        console.log("formData?.brandId" , formData?.brandId);
        console.log(formData?.brandId.length);
        console.log(formData?.brandId.length);
        if (!formData?.brandId) {
            errors.brandId = "Please select brand";
        }
        if (!formData?.details?.genericName) {
            errors.genericName = "Generic Name is required";
        }
        console.log("Inside validate", formData);
        console.log(formData?.details?.countryOfOrigin);
        if (!formData?.details?.countryOfOrigin) {
            errors.countryOfOrigin = "Please select country";
        }
        console.log(formData?.details?.manufacturedBy);
        if (!formData?.details?.manufacturedBy) {
            errors.manufacturedBy = "Manufacturer Name is required";
        }
        if (!formData?.details?.manufacturerAddress) {
            errors.manufacturerAddress = "Manufacturer Address is required";
        }
        if (!formData?.details?.packedBy) {
            errors.packedBy = "Packer Name is required";
        }
        if (!formData?.details?.packerAddress) {
            errors.packerAddress = "Packer Address is required";
        }
        return errors;
    }
};