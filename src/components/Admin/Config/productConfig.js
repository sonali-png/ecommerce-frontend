export const productConfig = {
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
    ]

};