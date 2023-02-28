import React from 'react';
import {
  Page, Text, View, Document, StyleSheet
} from '@react-pdf/renderer';

// 1696511344
// 386674373
const styles = StyleSheet.create({
  doc: {
    margin: 10,
  },
  page: {
    backgroundColor: '#ffffff',
    padding: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: '5px',
    textTransform: 'capitalize'
  },
  date: {
    fontSize: '12px',
    textTransform: 'capitalize',
    marginBottom: '10px'
  },
  line: {
    borderBottom: '1px',
    marginBottom: '2px',
  },
  doubleLine: {
    borderBottom: '2px',
  },
  header: {
    fontSize: '12px',
    textTransform: 'capitalize',
    color: 'white',
    backgroundColor: 'black',
    padding: '2px',
    marginTop: '20px',
  },
  table: {
    display: 'flex',
    width: '100%',
  },
  tableRowHead: {
    flexDirection: 'row',
    padding: '5px 2px 2px 2px',
  },
  tableRow: {
    flexDirection: 'row',
    padding: '2px',
  },
  tableRowSum: {
    flexDirection: 'row',
    padding: '5px 2px 2px 2px',
  },
  tableColDate: {
    width: '10%',
  },
  tableColType: {
    width: '10%',
  },
  tableColBy: {
    width: '10%',
  },
  tableColNote: {
    width: '35%',
  },
  tableColGoldPrice: {
    width: '15%',
  },
  tableColWeight: {
    width: '10%',
  },
  tableColTotal: {
    width: '15%',
  },
  tableColSum: {
    width: '85%',
  },
  tableCell: {
    fontSize: '8px',
    textTransform: 'capitalize',
  },
  tableCellValue: {
    fontSize: '8px',
    textAlign: 'right',
    textTransform: 'capitalize',
  },
});

export default function PdfDocument() {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>transaction reports</Text>
        <Text style={styles.date}>start date: | end date: </Text>
        <Text style={styles.line} />
        <Text style={styles.header}>transaction summary</Text>
        {/* Table */}
        <View style={styles.table}>
          {/* Table Head */}
          <View style={styles.tableRowHead}>
            <View style={styles.tableColDate}>
              <Text style={styles.tableCell}>date</Text>
            </View>
            <View style={styles.tableColType}>
              <Text style={styles.tableCell}>type</Text>
            </View>
            <View style={styles.tableColBy}>
              <Text style={styles.tableCell}>create by</Text>
            </View>
            <View style={styles.tableColNote}>
              <Text style={styles.tableCell}>note</Text>
            </View>
            <View style={styles.tableColGoldPrice}>
              <Text style={styles.tableCellValue}>gold price</Text>
            </View>
            <View style={styles.tableColWeight}>
              <Text style={styles.tableCellValue}>weight</Text>
            </View>
            <View style={styles.tableColTotal}>
              <Text style={styles.tableCellValue}>total amount</Text>
            </View>
          </View>
          <Text style={styles.line} />
          {/* Table Body */}
          <View style={styles.tableRow}>
            <View style={styles.tableColDate}>
              <Text style={styles.tableCell}>2019-02-20</Text>
            </View>
            <View style={styles.tableColType}>
              <Text style={styles.tableCell}>change</Text>
            </View>
            <View style={styles.tableColBy}>
              <Text style={styles.tableCell}>nik</Text>
            </View>
            <View style={styles.tableColNote}>
              <Text style={styles.tableCell}>2019-02-20 - 2020-02-19</Text>
            </View>
            <View style={styles.tableColGoldPrice}>
              <Text style={styles.tableCellValue}>5€</Text>
            </View>
            <View style={styles.tableColWeight}>
              <Text style={styles.tableCellValue}>5€</Text>
            </View>
            <View style={styles.tableColTotal}>
              <Text style={styles.tableCellValue}>5€</Text>
            </View>
          </View>
        </View>
        <Text style={styles.line} />
        {/* Table Sum */}
        <View style={styles.tableRowSum}>
          <View style={styles.tableColSum}>
            <Text style={styles.tableCell}>total transaction: </Text>
          </View>
          <View style={styles.tableColTotal}>
            <Text style={styles.tableCellValue}>5€</Text>
          </View>
        </View>
        <Text style={styles.line} />
        <Text style={styles.doubleLine} />
      </Page>
    </Document>
  );
}
