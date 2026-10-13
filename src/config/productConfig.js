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
        validateField(fieldName, value) {

        switch (fieldName) {

            case "name":
                if (!value || typeof value !== "string" || !value.trim()) {
                    return "Name is required.";
                }

                if (value.trim().length < 3) {
                    return "Name must be at least 3 characters.";
                }

                if (value.trim().length > 100) {
                    return "Name cannot exceed 100 characters.";
                }

                return "";

            case "description":
                if (!value || typeof value !== "string" || !value.trim()) {
                    return "Description is required";
                }

                if (value.trim().length < 10) {
                    return "Description must be at least 10 characters";
                }

                return "";

            case "categoryId":
                if (!value) {
                    return "Please select category";
                }

                return "";

            case "brandId":
                if (!value) {
                    return "Please select brand";
                }

                return "";

            case "genericName":
                if (!value || typeof value !== "string" || !value.trim()) {
                    return "Generic Name is required";
                }

                return "";

            case "countryOfOrigin":
                if (!value) {
                    return "Please select country";
                }

                return "";

            case "manufacturedBy":
                if (!value || typeof value !== "string" || !value.trim()) {
                    return "Manufacturer Name is required";
                }

                if (value.trim().length < 2) {
                    return "Manufacturer Name must be at least 2 characters";
                }

                return "";

            case "manufacturerAddress":
                if (
                    !value ||
                    typeof value !== "string" ||
                    !value.trim()
                ) {
                    return "Manufacturer Address is required";
                }

                if (value.trim().length < 5) {
                    return "Please enter a valid manufacturer address";
                }

                return "";

            case "packedBy":
                if (!value || typeof value !== "string" || !value.trim()) {
                    return "Packer Name is required";
                }

                if (value.trim().length < 2) {
                    return "Packer Name must be at least 2 characters";
                }

                return "";

            case "packerAddress":
                if (
                    !value ||
                    typeof value !== "string" ||
                    !value.trim()
                ) {
                    return "Packer Address is required";
                }

                if (value.trim().length < 5) {
                    return "Please enter a valid packer address";
                }

                return "";

            case "colorImages":
                if (
                    !Array.isArray(value) ||
                    value.length === 0
                ) {
                    return "Please add images";
                }

                return "";

            default:
                return "";
        }
    },
    validate(formData) {

        const errors = {};
        const nameError = this.validateField(
            "name",
            formData?.name
        );

        if (nameError) {
            errors.name = nameError;
        }
        const descriptionError = this.validateField(
            "description",
            formData?.description
        );

        if (descriptionError) {
            errors.description = descriptionError;
        }
        const categoryError = this.validateField(
            "categoryId",
            formData?.categoryId
        );

        if (categoryError) {
            errors.categoryId = categoryError;
        }
        const brandError = this.validateField(
            "brandId",
            formData?.brandId
        );

        if (brandError) {
            errors.brandId = brandError;
        }
        const genericNameError = this.validateField(
            "genericName",
            formData?.details?.genericName
        );

        if (genericNameError) {
            errors.genericName = genericNameError;
        }
        const countryError = this.validateField(
            "countryOfOrigin",
            formData?.details?.countryOfOrigin
        );

        if (countryError) {
            errors.countryOfOrigin = countryError;
        }
        const manufacturerError = this.validateField(
            "manufacturedBy",
            formData?.details?.manufacturedBy
        );

        if (manufacturerError) {
            errors.manufacturedBy = manufacturerError;
        }
        const manufacturerAddressError = this.validateField(
            "manufacturerAddress",
            formData?.details?.manufacturerAddress
        );

        if (manufacturerAddressError) {
            errors.manufacturerAddress = manufacturerAddressError;
        }
        const packerError = this.validateField(
            "packedBy",
            formData?.details?.packedBy
        );

        if (packerError) {
            errors.packedBy = packerError;
        }
        const packerAddressError = this.validateField(
            "packerAddress",
            formData?.details?.packerAddress
        );

        if (packerAddressError) {
            errors.packerAddress = packerAddressError;
        }
        const imagesError = this.validateField(
            "colorImages",
            formData?.colorImages
        );
        if (imagesError) {
            errors.colorImages = imagesError;
        }
        return errors;
    }
};