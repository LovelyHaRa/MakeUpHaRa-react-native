import React from 'react';
import BarcodeRegist from '../../components/profile/BarcodeRegist';

const BarcodeRegistContainer = ({ route }) => {
  const { code: barcode } = route.params;
  return <BarcodeRegist barcode={barcode} />;
};

export default BarcodeRegistContainer;
