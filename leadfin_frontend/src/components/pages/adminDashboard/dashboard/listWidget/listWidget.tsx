import React from 'react';
import { Card, CardContent, List, ListItem, ListItemText, Typography } from '@mui/material';
import styles from './listWidget.module.css';

interface ListItemData {
  name: string;
  value: string;
}

interface ListWidgetProps {
  title: string;
  items: ListItemData[];
}

export const ListWidget: React.FC<ListWidgetProps> = ({ title, items }) => {
  return (
    <Card variant="outlined" className={styles.widget}>
      <CardContent>
        <Typography variant="caption" className={styles.widgetTitle}>{title}</Typography>
        <List dense>
          {items.map((item, index) => (
            <ListItem key={index} className={styles.listItem}>
              <ListItemText primary={item.name} secondary={item.value} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};
