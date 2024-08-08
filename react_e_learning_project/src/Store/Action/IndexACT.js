import CourseComp from "../../Components/CourseComp";

export const addCart = (Product) => {
    return {
        type: "ADDITEM",
        payload: Product,
    };
};

export const delCart = (Product) => {
    return {
        type: "DELITEM",
        payload: Product,
    };
};
