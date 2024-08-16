"use client"
import { createContext, useState } from "react";
import Alert from "@/components/Alert";
const alertTypes = ["success", "info", "warning", "error"] as const;
type Alerts = (typeof alertTypes)[number];

const AlertContext = createContext({
  showAlert: (type: Alerts, msg: string) => {},
  message: "",
  visible: false,
  type: "",
});

const AlertProvider = ({ children }) => {
  const [type, setAlertType] = useState<Alerts>("success");
  const [message, setAlertMessage] = useState<string>("");
  const [visible, setAlertVisible] = useState<boolean>(false);

  const showAlert = (type: Alerts, msg: string) => {
    if (!visible) {
      setAlertType(type);
      setAlertMessage(msg);
      setAlertVisible(true);
      setTimeout(() => setAlertVisible(false), 3000);
    }
  };

  return (
    <AlertContext.Provider value={{ showAlert, message, visible, type }}>
      <Alert />
      {children}
    </AlertContext.Provider>
  );
};

export { AlertContext, AlertProvider };
