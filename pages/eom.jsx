import React from "react";
import { Toolbar } from "../components/toolbar";
import styles from "../styles/EOM.module.css"

export default function eom({ employee }) {
    console.log(employee)
  return (
    <div className="page-container">

      <Toolbar />

      <div className={styles.main}>
        <h1>Employee Of The Month</h1>

        <div className={styles.employeeofTheMonth}>
            <h3>{employee.name}</h3>
            <h6>{employee.position}</h6>
            <img src={employee.image} alt="nothing to show" />
            <p>{employee.description}</p>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async (pageContext) => {
    const apiResponse = await fetch(
        "https://my-json-server.typicode.com/portexe/next-news/employeeofTheMonth",
    )

    const employee = await apiResponse.json();

    return {
        props: {
            employee: employee
        }
    }
};
