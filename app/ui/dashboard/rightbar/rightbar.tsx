"use client";

import styles from "./rightbar.module.css";
import RightbarWeather from "./RightbarWeather";

interface RightbarProps {
  title: string;
}

const Rightbar = ({ title }: RightbarProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}</div>
      <RightbarWeather />
    </div>
  );
};

export default Rightbar;
