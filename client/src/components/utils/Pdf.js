import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { Font } from "@react-pdf/renderer";
import MyCustomFont from "../../fonts/Anton-Regular.ttf";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

export default function PDFFile({ data }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Section #1</Text>
        </View>
        <View style={styles.section}>
          {data.map((item) => (
            <View key={item.id} style={styles.section}>
              <Text>Name: {item.name}</Text>
              <Text>Age: {item.age}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}
