import React, { useEffect, useState } from "react";
import AlertModal from "./alert";
import AlertService from "./AlertService";


export function AlertProvider({ children }: any) {
    const [visible, setVisible] = useState(false);
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [buttons, setButtons] = useState([]);

    const showAlert = (title: string, message: string, buttonsParam: any = []) => {
        setTitle(title);
        setMessage(message);
        setButtons(
            buttonsParam.length > 0
                ? buttonsParam
                : [{ text: "OK", onPress: hideAlert, style: "bg-blue-500" }]
        );
        setVisible(true);
    };

    // const showAlert = (title: string, message: string) => {
    //     setTitle(title);
    //     setMessage(message);
    //     setVisible(true);
    // };

    const hideAlert = () => setVisible(false);

    useEffect(() => {
        AlertService.register(showAlert, hideAlert);
    }, []);

    return (
        // <AlertContext.Provider value={{ showAlert, hideAlert }}>
        <>
            {children}
            <AlertModal
                visible={visible}
                title={title}
                message={message}
                buttons={buttons}
            />
        </>
        // </AlertContext.Provider>
    );
}