import SearchedClass from "./SearchedClass"
import Cookies from "js-cookie";
import EventEmitter from "./EventEmitter";

export default function ListClasses() {

    let courses = Object.keys(Cookies.get()).map(key => JSON.parse(Cookies.get(key)));
    let courseList = [];

    return (
        <>
            {
                courses.length > 0 && courses.map((course, index) => <SearchedClass key={index} data={course.data} />)                
            }
        </>
    );
}