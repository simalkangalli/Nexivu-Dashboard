"use client";

import styles from "./rightbar.module.css";
import RightbarWeather from "../../../../components/rightbar/RightbarWeather";

const Rightbar = ({title}) => {
    return (
        <div className={styles.container}>
            <div> WEATHER</div>
            <RightbarWeather />
        </div>
    )
}

export default Rightbar;
