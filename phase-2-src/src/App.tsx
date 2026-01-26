import { useEffect } from "react";
import { GetJsonInfo } from "./services/apiServices";

function App() {
  useEffect(() => {
    GetJsonInfo();
  }, []);
  return <></>;
}

export default App;
