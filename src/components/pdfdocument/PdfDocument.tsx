import React from 'react';
import {
  Page, Text, View, Document, StyleSheet
} from '@react-pdf/renderer';

import { TransactionDashboard, TransactionDataJoinGold } from '../../interfaces/TransactionData';

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
    fontSize: '10px',
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
    width: '30%',
  },
  tableColGoldPrice: {
    width: '15%',
  },
  tableColWeight: {
    width: '15%',
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

export default function PdfDocument(
  props: {data: TransactionDashboard, from: string | null, to: string | null}
) {
  const {
    data,
    from,
    to
  }: { data: TransactionDashboard, from: string | null, to: string | null } = props;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>transaction reports</Text>
        <Text style={styles.date}>
          {`start date: ${from} | end date: ${to} `}
        </Text>
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
              <Text style={styles.tableCellValue}>weight (gram)</Text>
            </View>
            <View style={styles.tableColTotal}>
              <Text style={styles.tableCellValue}>total amount</Text>
            </View>
          </View>
          <Text style={styles.line} />
          {/* Table Body */}
          {
            data?.buy_transaction.map((el: TransactionDataJoinGold) => (
              <View style={styles.tableRow} key={el.transaction.transaction_id}>
                <View style={styles.tableColDate}>
                  <Text style={styles.tableCell}>
                    {el.transaction.date.split('T')[0]}
                  </Text>
                </View>
                <View style={styles.tableColType}>
                  <Text style={styles.tableCell}>
                    {el.transaction.transaction_type}
                  </Text>
                </View>
                <View style={styles.tableColBy}>
                  <Text style={styles.tableCell}>
                    {el.transaction.username}
                  </Text>
                </View>
                <View style={styles.tableColNote}>
                  <Text style={styles.tableCell}>
                    {el.transaction.note}
                  </Text>
                </View>
                <View style={styles.tableColGoldPrice}>
                  <Text style={styles.tableCellValue}>
                    {el.transaction.gold_price}
                  </Text>
                </View>
                <View style={styles.tableColWeight}>
                  <Text style={styles.tableCellValue}>
                    {el?.transaction.weight}
                  </Text>
                </View>
                <View style={styles.tableColTotal}>
                  <Text style={styles.tableCellValue}>
                    {el.transaction.sell_price - el.transaction.buy_price}
                  </Text>
                </View>
              </View>
            ))
          }
          {
            data?.sell_transaction.map((el: TransactionDataJoinGold) => (
              <View style={styles.tableRow} key={el.transaction.transaction_id}>
                <View style={styles.tableColDate}>
                  <Text style={styles.tableCell}>
                    {el.transaction.date.split('T')[0]}
                  </Text>
                </View>
                <View style={styles.tableColType}>
                  <Text style={styles.tableCell}>
                    {el.transaction.transaction_type}
                  </Text>
                </View>
                <View style={styles.tableColBy}>
                  <Text style={styles.tableCell}>
                    {el.transaction.username}
                  </Text>
                </View>
                <View style={styles.tableColNote}>
                  <Text style={styles.tableCell}>
                    {el.transaction.note}
                  </Text>
                </View>
                <View style={styles.tableColGoldPrice}>
                  <Text style={styles.tableCellValue}>
                    {el.transaction.gold_price}
                  </Text>
                </View>
                <View style={styles.tableColWeight}>
                  <Text style={styles.tableCellValue}>
                    {el?.transaction.weight}
                  </Text>
                </View>
                <View style={styles.tableColTotal}>
                  <Text style={styles.tableCellValue}>
                    {el.transaction.sell_price - el.transaction.buy_price}
                  </Text>
                </View>
              </View>
            ))
          }
          {
            data?.change_transaction.map((el: TransactionDataJoinGold) => (
              <View style={styles.tableRow} key={el.transaction.transaction_id}>
                <View style={styles.tableColDate}>
                  <Text style={styles.tableCell}>
                    {el.transaction.date.split('T')[0]}
                  </Text>
                </View>
                <View style={styles.tableColType}>
                  <Text style={styles.tableCell}>
                    {el.transaction.transaction_type}
                  </Text>
                </View>
                <View style={styles.tableColBy}>
                  <Text style={styles.tableCell}>
                    {el.transaction.username}
                  </Text>
                </View>
                <View style={styles.tableColNote}>
                  <Text style={styles.tableCell}>
                    {el.transaction.note}
                  </Text>
                </View>
                <View style={styles.tableColGoldPrice}>
                  <Text style={styles.tableCellValue}>
                    {el.transaction.gold_price}
                  </Text>
                </View>
                <View style={styles.tableColWeight}>
                  <Text style={styles.tableCellValue}>
                    {`${el?.gold_detail.weight} / `}
                    {el?.transaction.weight}
                  </Text>
                </View>
                <View style={styles.tableColTotal}>
                  <Text style={styles.tableCellValue}>
                    {el.transaction.sell_price - el.transaction.buy_price}
                  </Text>
                </View>
              </View>
            ))
          }
        </View>
        <Text style={styles.line} />
        {/* Table Sum */}
        <View style={styles.tableRowSum}>
          <View style={styles.tableColSum}>
            <Text style={styles.tableCell}>
              {`total transaction: ${
                (data.buy_transaction?.length || 0)
                + (data.sell_transaction?.length || 0)
                + (data.change_transaction?.length || 0)
              }`}
            </Text>
          </View>
          <View style={styles.tableColWeight}>
            <Text style={styles.tableCellValue}>Total: </Text>
          </View>
          <View style={styles.tableColTotal}>
            <Text style={styles.tableCellValue}>
              {data.total_price}
            </Text>
          </View>
        </View>
        <Text style={styles.line} />
        <Text style={styles.doubleLine} />
      </Page>
    </Document>
  );
}
