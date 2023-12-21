import React, { useEffect, useState } from "react";
import "./loading.css";

const LoadingWeb = () => {
  const [loading, setLoading] = useState(true);
  
    useEffect(() => {
        // Simüle edilmiş bir API isteği
        setTimeout(() => {
          setLoading(false); // Yükleme tamamlandığında loading durumunu değiştir
         
         
        }, 3000); // 3 saniye süren bir işlemi temsil ediyor
      }, []);
  
  return (
    <div className="app">
      {loading ? (
        <div className="loading-screen">
          
          <h1>selamun aleyküm geliyor gelmekte olan  </h1>
          <div className="progress-bar">
          
          </div>

        </div>
      ) : (
        // Yükleme tamamlandığında gösterilecek ana içerik
        <div className="main-content">
          {/* Burada ana içeriği gösterebilirsiniz */}
        </div>
      )}
    </div>
  );
};

export default LoadingWeb;