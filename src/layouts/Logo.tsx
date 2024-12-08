import React from "react";

export const Logo: React.FC<{style: string}> = ({style}) => {
    return(
        <span className={style}>
            <h1>¿Con qué profesor de <strong>ISIL</strong> no debo matricularme?</h1>
        </span>
    )
}