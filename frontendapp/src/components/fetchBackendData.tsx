import { useEffect, useState } from "react";
import { BackendResponse } from "../type/types";

  export const useBackendFetch = () => {
      const [backendData, setBackendData] = useState<BackendResponse | null>(null);
  
      useEffect(() => {
          fetch("/api/display")
              .then(response => response.json())
              .then(data => {
                setBackendData({
                    message: data.message,
                    success: data.success,
                    data: data.data, 
                  });    
              })
              .catch(error => {
                  console.error("Error fetching data:", error);
              });
      }, []);
      console.log("everve",backendData)
      return { backendData, setBackendData };
  }    
 