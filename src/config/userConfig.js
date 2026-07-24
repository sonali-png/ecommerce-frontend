export const userConfig = {
    columns: [
        {
            header:"#",
            type:"serial"
        },
        {
            header:"Name",
            render: (row) => {
                const first = row.firstName?.trim() || "";
                const last = row.lastName?.trim() || "";

                return `${first} ${last}`.trim() || "";
            }
        },
        {
            header:"UserID",
            field:"userId"
        },
        {
            header:"Email",
            field:"email"
        },
        { 
            header:"Status",
            type:"status",
            field:"status"
        },
        // {
        //     header:"Actions",
        //     type:"actions"
        // }
    ],
    filters: [
        {
            name: "search",
            type: "search",
            placeholder: "Search user name",
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