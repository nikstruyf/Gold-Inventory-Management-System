import React from 'react';
import {
  Page, Text, View, Document, StyleSheet, Font
} from '@react-pdf/renderer';

import THSarabunNewFront from '../../assets/fonts/THSarabunNew.ttf';

Font.register({
  family: 'THSarabunNew',
  src: THSarabunNewFront
});

const styles = StyleSheet.create({
  doc: {
    margin: 20,
  },
  page: {
    backgroundColor: '#ffffff',
    padding: 15,
    fontFamily: 'THSarabunNew',
  },
  title: {
    fontSize: '26px',
    fontWeight: 'bold',
    textTransform: 'capitalize'
  },
  date: {
    fontSize: '14px',
    textTransform: 'capitalize',
  },
  line: {
    borderBottom: '1px',
    marginBottom: '2px',
  },
  doubleLine: {
    borderBottom: '2px',
  },
  price: {
    fontSize: '12px',
    textTransform: 'capitalize',
    marginTop: '10px',
  },
  header: {
    fontSize: '14px',
    fontWeight: 'extrabold',
    textTransform: 'capitalize',
    color: 'white',
    backgroundColor: 'black',
    padding: '0 2px',
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
    padding: '7px 2px',
  },
  tableRowSum: {
    flexDirection: 'row',
    padding: '5px 2px 2px 2px',
  },
  tableColCode: {
    width: '25%',
  },
  tableColNote: {
    width: '45%',
  },
  tableColWeight: {
    width: '15%',
  },
  tableColAmount: {
    width: '15%',
  },
  tableColEmpty: {
    width: '70%',
  },
  tableCell: {
    fontSize: '12px',
    textAlign: 'left',
    textTransform: 'capitalize',
  },
  tableCellValue: {
    fontSize: '12px',
    textAlign: 'right',
    textTransform: 'capitalize',
  },
});

export default function PdfBillDocument() {
  return (
    <Document>
      <Page size="A5" style={styles.page}>
        <Text style={styles.title}>
          transaction bill
        </Text>
        <Text style={styles.date}>
          time: 15:59 date: 2023/03/05
        </Text>
        <Text style={styles.date}>
          craete by: yodyim
        </Text>
        <Text style={styles.line} />
        <Text style={styles.header}>gold detail: NE2B500L1</Text>
        {/* Table Gold Detail */}
        <View style={styles.table}>
          {/* Table Head */}
          <View style={styles.tableRowHead}>
            <View style={styles.tableColCode}>
              <Text style={styles.tableCell}>type</Text>
            </View>
            <View style={styles.tableColNote}>
              <Text style={styles.tableCell}>detail</Text>
            </View>
            <View style={styles.tableColWeight}>
              <Text style={styles.tableCellValue}>weight (gram)</Text>
            </View>
            <View style={styles.tableColAmount}>
              <Text style={styles.tableCellValue}>gold percent</Text>
            </View>
          </View>
          <Text style={styles.line} />
          {/* Table Body */}
          <View style={styles.tableRow}>
            <View style={styles.tableColCode}>
              <Text style={styles.tableCell}>Necklace</Text>
            </View>
            <View style={styles.tableColNote}>
              <Text style={styles.tableCell}>สร้อยคอทองลายบิดเงา CD</Text>
            </View>
            <View style={styles.tableColWeight}>
              <Text style={styles.tableCellValue}>76</Text>
            </View>
            <View style={styles.tableColAmount}>
              <Text style={styles.tableCellValue}>96.5</Text>
            </View>
          </View>
          <Text style={styles.doubleLine} />
        </View>
        <Text style={styles.price}>gold price: 30150 - 30250</Text>
        <Text style={styles.header}>transaction detail: sell</Text>
        {/* Table Transaction */}
        <View style={styles.table}>
          {/* Table Head */}
          <View style={styles.tableRowHead}>
            <View style={styles.tableColCode}>
              <Text style={styles.tableCell}>gold code</Text>
            </View>
            <View style={styles.tableColNote}>
              <Text style={styles.tableCell}>note</Text>
            </View>
            <View style={styles.tableColWeight}>
              <Text style={styles.tableCellValue}>weight (gram)</Text>
            </View>
            <View style={styles.tableColAmount}>
              <Text style={styles.tableCellValue}>amount</Text>
            </View>
          </View>
          <Text style={styles.line} />
          {/* Table Body */}
          <View style={styles.tableRow}>
            <View style={styles.tableColCode}>
              <Text style={styles.tableCell}>NE2B500L1</Text>
            </View>
            <View style={styles.tableColNote}>
              <Text style={styles.tableCell}>สร้อยคอทองลายบิดเงา CD</Text>
            </View>
            <View style={styles.tableColWeight}>
              <Text style={styles.tableCellValue}>76</Text>
            </View>
            <View style={styles.tableColAmount}>
              <Text style={styles.tableCellValue}>151250</Text>
            </View>
          </View>
          <Text style={styles.line} />
          <View style={styles.tableRowSum}>
            <View style={styles.tableColEmpty}>
              <Text style={styles.tableCell} />
            </View>
            <View style={styles.tableColWeight}>
              <Text style={styles.tableCellValue}>total:</Text>
            </View>
            <View style={styles.tableColAmount}>
              <Text style={styles.tableCellValue}>151250</Text>
            </View>
          </View>
          <Text style={styles.line} />
          <Text style={styles.doubleLine} />
        </View>
      </Page>
    </Document>
  );
}
