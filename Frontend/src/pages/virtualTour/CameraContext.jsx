import { createContext, useContext, useState } from "react";

const CameraContext = createContext();

export function CameraProvider({ children }) {
    const [activeDepartment, setActiveDepartment] = useState(null);
    return (
        <CameraContext.Provider value={{ activeDepartment, setActiveDepartment }}>
            {children}
        </CameraContext.Provider>
    );
}

export function useCameraContext() {
    return useContext(CameraContext);
}
