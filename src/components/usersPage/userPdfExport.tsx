"use client";

import React from "react";
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Image as PDFImage } from '@react-pdf/renderer';
import { Button } from "../ui/button";
import { FileText } from "lucide-react";
import { LogoTitleFile } from '../../assets';
import StatesOptions from 'utils/stateOptions';
import { User } from "./usersMenu";

export function getStateLabel(key: string): string {
  const found = StatesOptions.find(option => option.key === key);
  return found ? found.value : key;
}

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

// estilo para o pdf 
const styles = StyleSheet.create({
    page: {
      padding: 24,
      fontSize: 8,
      fontFamily: 'Helvetica',
    },
    section: {
      marginBottom: 24,
    },
    logo: {
      width: 160,
      height: 80,
      alignSelf: 'center',
    },
    title: {
      fontSize: 14,
      marginBottom: 12,
      textAlign: 'left',
      fontWeight: 'bold',
    },
    table: {
      display: 'flex',
      flexDirection: 'column',
      borderWidth: 1,
      borderColor: '#cccccc',
      borderRadius: 6,
      overflow: 'hidden',
      marginBottom: 16,
    },
    tableRow: {
      flexDirection: 'row',
    },
    tableColHeader: {
      width: '33.33%',
      backgroundColor: '#404AA0',
      padding: 6,
      borderRightWidth: 1,
      borderRightColor: '#cccccc',
    },
    tableCol: {
      width: '33.33%',
      padding: 6,
      borderRightWidth: 1,
      borderRightColor: '#cccccc',
      borderBottomWidth: 1,
      borderBottomColor: '#cccccc',
    },
    headerText: {
      color: 'white',
      fontWeight: 'bold',
    },
    cellText: {
      color: '#282828',
    },
  });

const UserPDFDocument = ({ allUsers }: { allUsers: User[] }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <PDFImage src={LogoTitleFile.src} style={styles.logo} />
      <View style={styles.section}>
             <Text style={styles.title}>Lista de Pacientes</Text>
             <View style={styles.table}>
               <View style={styles.tableRow}>
                 <View style={styles.tableColHeader}><Text style={styles.headerText}>Nome</Text></View>
                 <View style={styles.tableColHeader}><Text style={styles.headerText}>Estado</Text></View>
                 <View style={styles.tableColHeader}><Text style={styles.headerText}>Cidade</Text></View>
               </View>
               {allUsers.filter(u => u.userRole === 'Paciente').map((user, idx) => (
                 <View key={idx} style={styles.tableRow}>
                   <View style={styles.tableCol}><Text style={styles.cellText}>{capitalize(user.name)}</Text></View>
                   <View style={styles.tableCol}><Text style={styles.cellText}>{getStateLabel(user.userState)}</Text></View>
                   <View style={styles.tableCol}><Text style={styles.cellText}>{user.userCity}</Text></View>
                 </View>
               ))}
             </View>
           </View>
     
           <View style={styles.section}>
             <Text style={styles.title}>Lista de Profissionais de Saúde</Text>
             <View style={styles.table}>
               <View style={styles.tableRow}>
                 <View style={styles.tableColHeader}><Text style={styles.headerText}>Nome</Text></View>
                 <View style={styles.tableColHeader}><Text style={styles.headerText}>Estado</Text></View>
                 <View style={styles.tableColHeader}><Text style={styles.headerText}>Cidade</Text></View>
               </View>
               {allUsers.filter(u => u.userRole === 'Profissional de Saúde').map((user, idx) => (
                 <View key={idx} style={styles.tableRow}>
                   <View style={styles.tableCol}><Text style={styles.cellText}>{capitalize(user.name)}</Text></View>
                   <View style={styles.tableCol}><Text style={styles.cellText}>{getStateLabel(user.userState)}</Text></View>
                   <View style={styles.tableCol}><Text style={styles.cellText}>{user.userCity}</Text></View>
                 </View>
               ))}
             </View>
           </View>
    </Page>
  </Document>
);

export const UserPDFExport = ({ allUsers }: { allUsers: User[] }) => {
  return (
    <PDFDownloadLink
      document={<UserPDFDocument allUsers={allUsers} />}
      fileName="EducaBetes_Usuários.pdf"
    >
      <Button className="flex gap-2 justify-start text-xl font-normal bg-transparent text-black hover:bg-[#d6cfe0] w-full">
        <FileText size={18} />
        <span>Exportar como PDF</span>
      </Button>
    </PDFDownloadLink>
  );
};
