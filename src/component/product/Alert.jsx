import { Alert, AlertTitle } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideAlert } from '../../redux/observeCart';

const AlertComponent = () => {
  const dispatch = useDispatch();
  const showAlert = useSelector((state) => state.cart.showAlert);
  const message = useSelector((state) => state.cart.message);
  useEffect(() => {
    let timeoutId;
    if (showAlert) {
      timeoutId = setTimeout(() => {
        dispatch(hideAlert());
      }, 4000); // 4 saniye sonra alert gizlenecek (4000 milisaniye)
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [showAlert, dispatch]);
    
  return (
    <div  style={{display:"flex",justifyContent:"flex-end",padding:"40px"}}>
      {showAlert && (
        <Alert severity="success" style={{width:"25%"}}  >
          <AlertTitle>bilgilendirme</AlertTitle>
          {message} — <strong>Sepetini kontrol et</strong>
        </Alert>
      )}
      
    </div>
  );
};

export default AlertComponent;