import React, { useState, useEffect } from 'react';
import Chart from '../clientDashboard/chart/chart';
import Button from '@mui/material/Button';
import styles from './adminDashboard.module.css';
import ClientsTable from './clientTable/clientsTable';

export default function ClientDashboard() {
  const [activeTab, setActiveTab] = useState('statistics');

  useEffect(() => {
    const savedTab = localStorage.getItem('activeTab');
    if (savedTab) {
      setActiveTab(savedTab);
    }
  }, []);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    localStorage.setItem('activeTab', tab);
  };

  return (
    <div>
      <div className={styles.adminContainer}>
        <div className={styles.buttonContainer}>
          <Button
            className={`${styles.button} ${activeTab === 'Рекламодатели' ? styles.active : ''}`}
            variant="text"
            color="primary"
            onClick={() => handleTabClick('clients')}
          >
            Рекламодатели
          </Button>
        </div>
      </div>
      <div>
        {activeTab === 'clients' && <ClientsTable/>}
      </div>
    </div>
  );
}
