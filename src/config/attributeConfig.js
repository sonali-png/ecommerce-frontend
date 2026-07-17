export const attributesConfig = {
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
    ]
};