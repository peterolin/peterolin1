"use client";
import styles from "./articles.module.css";
import React, { useEffect, useState } from 'react';


const MethodSelect = ({changeCallback}) => {

    return (
        <div className={styles.radioLayout} >
            <fieldset className={styles.fieldset} >
                <legend className={styles.legend}>Articles search/selection method</legend>
                <div className={styles.radioDiv}>
                    <input className={styles.radio} type="radio" name="select_method" id="select_method_DROPDOWN" value="DROPDOWN" title="Dropdown"
                        onChange={changeCallback} />
                    <label htmlFor="select_method_DROPDOWN">
                        <code>SELECT / OPTION</code>
                    </label>
                </div>
                <div className={styles.radioDiv}>
                    <input className={styles.radio} type="radio" name="select_method" id="select_method_FILTERDROPDOWN" value="FILTERDROPDOWN" title="Filtered dropdown"
                        onChange={changeCallback} />
                    <label htmlFor="ssl_type_NONE">
                        <code>INPUT / SELECT / OPTION</code>
                    </label>
                </div>
                <div className={styles.radioDiv}>
                    <input className={styles.radio} type="radio" name="select_method" id="select_method_DYNAMICMENU" value="DYNAMICMENU" title="Filtered dynamic menu"
                        onChange={changeCallback} />
                    <label htmlFor="ssl_type_NONE">
                        <code>MENU - UNKNOWN</code>
                    </label>
                </div>
            </fieldset>
        </div>
    )
};

export default MethodSelect