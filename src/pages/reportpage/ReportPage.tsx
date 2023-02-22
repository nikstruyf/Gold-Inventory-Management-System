import React from 'react';
import './reportpage.css';

import { useSideNavWidth } from '../../contexts/SideNavWidthContext';
// import { useAlert } from '../../contexts/AlertContext';

import LineChartTransCount from '../../components/chart/LineChartTransCount';
import DoughnutChartSoldType from '../../components/chart/DoughnutChartSoldType';

function ReportPage() {
  const { sideNavWidth } = useSideNavWidth();
  // const { setAlert } = useAlert();

  return (
    <div className={`report-page page-background ${sideNavWidth === 'short' ? 'wide' : ''}`}>
      {/* -- Header -- */}
      <div className="page-header">
        report
      </div>
      {/* -- Container Inventory -- */}
      <div className="report-page page-container">
        <div className={`report-page page-grid ${sideNavWidth === 'short' ? 'wide' : ''}`}>
          <div className="report-page page-content trans-stat">
            <div className="trans-stat header">
              transaction
            </div>
            <div className="trans-stat value">
              1111
            </div>
            <div className="trans-stat today">
              <span className="today-value"> +6 </span>
              today
            </div>
          </div>
          <div className="report-page page-content trans-stat">
            <div className="trans-stat header">
              buy transaction
            </div>
            <div className="trans-stat value">
              1111
            </div>
            <div className="trans-stat today">
              <span className="today-value"> +6 </span>
              today
            </div>
          </div>
          <div className="report-page page-content trans-stat">
            <div className="trans-stat header">
              sell transaction
            </div>
            <div className="trans-stat value">
              1111
            </div>
            <div className="trans-stat today">
              <span className="today-value"> +6 </span>
              today
            </div>
          </div>
          <div className="report-page page-content trans-stat">
            <div className="trans-stat header">
              change transaction
            </div>
            <div className="trans-stat value">
              1111
            </div>
            <div className="trans-stat today">
              <span className="today-value"> +6 </span>
              today
            </div>
          </div>
          <div className="report-page page-content trans-chart-line">
            <LineChartTransCount />
          </div>
          <div className="report-page page-content trans-chart-doughnut">
            <DoughnutChartSoldType />
          </div>
          <div className="report-page page-content trans-value">
            <div className="trans-value header">
              sell transaction cost total
            </div>
            <div className="trans-value cost">
              <span className="value">฿ 1111</span>
              <span className="trans-value-today">
                <span className="today-value">(+฿ 6)</span>
              </span>
            </div>
          </div>
          <div className="report-page page-content trans-value">
            <div className="trans-value header">
              buy transaction cost total
            </div>
            <div className="trans-value cost">
              <span className="value">฿ 1111</span>
              <span className="trans-value-today">
                <span className="today-value">(+฿ 6)</span>
              </span>
            </div>
          </div>
          <div className="report-page page-content trans-value">
            <div className="trans-value header">
              change transaction cost total
            </div>
            <div className="trans-value cost">
              <span className="value">฿ 1111</span>
              <span className="trans-value-today">
                <span className="today-value">(+฿ 6)</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportPage;
