import React, { useState, useEffect } from 'react';
import Chart from '../../UI/chart/chart';
import StatisticTable from '../../UI/statisticTable/statisticTable';
import Export from '../../UI/export/export'; 
import Button from '@mui/material/Button';
import styles from './clientDashboard.module.css'; 

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
      <div className={styles.clientContainer}>
        <div className={styles.buttonContainer}>
          <Button
            className={styles.button}
            variant={activeTab === 'statistics' ? 'contained' : 'outlined'}
            color="primary"
            onClick={() => handleTabClick('statistics')}
          >
            Статистика
          </Button>
          <Button
            className={styles.button}
            variant={activeTab === 'offers' ? 'contained' : 'outlined'}
            color="primary"
            onClick={() => handleTabClick('offers')}
          >
            Офферы
          </Button>
          <Button
            className={styles.button}
            variant={activeTab === 'export' ? 'contained' : 'outlined'}
            color="primary"
            onClick={() => handleTabClick('export')}
          >
            Экспорт
          </Button>
        </div>
      </div>
      <div>
        {activeTab === 'statistics' && <Chart />}
        {activeTab === 'offers' && <StatisticTable />}
        {activeTab === 'export' && <Export />}
      </div>
    </div>
  );
}