function langs(phrase) {
    const data = {
        // sidebar
        "dashboard"  :  "dashboard",
        "department" :  "department",
        "item"       :  "item",
        "media"      :  "media",
        "cart"       :  "cart",
        "users"       :  "users",
        // control
        "save"       :  "save",
        "view"       :  "view",
        "add"        :  "add",
        "edit"       :  "edit",
        "delete"     :  "delete",
        "logout"     :  "logout",
        "profile"     :  "profile",


    }

    return data[phrase];
}


export default langs;