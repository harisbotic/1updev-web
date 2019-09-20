import React from "react";

export const TransactionTime = ({ timestamp }) => {
    let log = new Date(timestamp);
    log = `${log.getHours() > 9 ? '' : 0}${log.getHours()}:${log.getMinutes()}`;
    return (
        <div className="timestamp">{log}</div>
    );
} 