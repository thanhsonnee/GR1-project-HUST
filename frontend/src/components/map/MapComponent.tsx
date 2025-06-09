// frontend/src/components/map/MapComponent.tsx

import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

interface Location {
  name: string;
  address: string;
  warehouseAddress: string;
  orderWeight: number;
}

interface MapComponentProps {
  locations: Location[];
}

const MapComponent: React.FC<MapComponentProps> = ({ locations }) => {
  return (
    <List>
      {locations.map((location, index) => (
        <ListItem key={index}>
          <ListItemText
            primary={`${index + 1}. ${location.name}`}
            secondary={`Delivery: ${location.address} | Warehouse: ${location.warehouseAddress} | Weight: ${location.orderWeight}kg`}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default MapComponent;