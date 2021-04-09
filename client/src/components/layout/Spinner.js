import React from 'react'

const Spinner = () => {
    return (
        <div class="text-center" style={{ marginTop: "20%" }}>
            <div
                class="spinner-border" role="status"
                style={{ height: "5rem", width: "5rem", color: "#ff6433" }}
            >
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}

export default Spinner
