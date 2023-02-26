import React from 'react';
import {
  Page, Text, View, Document, StyleSheet
} from '@react-pdf/renderer';

const styles = StyleSheet.create({
  doc: {
    margin: 10
  },
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

export default function PdfDocument() {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Section #1</Text>
        </View>
        <View style={styles.section}>
          <Text>Section #2</Text>
        </View>
      </Page>
    </Document>
  );
}
