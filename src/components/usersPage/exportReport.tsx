import React from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "../ui/dialog";
import { Button } from "../ui/button";
import { Upload, FileText, FileSpreadsheet } from "lucide-react";
import * as XLSX from "xlsx";
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Image as PDFImage } from '@react-pdf/renderer';
import { LogoTitleFile } from '../../assets/index';
import StatesOptions from 'utils/stateOptions';
import { User } from "./usersMenu";

interface ExportUsersDialogProps {
  allUsers: User[];
}

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

function exportUsersToExcel(allUsers: User[]) {
  const formatUser = (user: User) => ({
    Nome: capitalize(user.name),
    Estado: getStateLabel(user.userState),
    Cidade: user.userCity,
    Tipo: user.userRole,
  });

  const formattedUsers = allUsers.map(formatUser);

  const ws = XLSX.utils.json_to_sheet(formattedUsers);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Usuários');
  XLSX.writeFile(wb, 'EducaBetes_Usuários.xlsx');
}

export const ExportUsersDialog: React.FC<ExportUsersDialogProps> = ({ allUsers }) => {
  const handleExportExcel = () => {
    exportUsersToExcel(allUsers);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#ECE6F0] rounded-full hover:bg-[#d6cfe0] transition">
          <Upload size={18} strokeWidth={2} color="black" />
          <span className="text-black font-firaSans">Exportar Usuários</span>
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-md font-firaSansCondensed">
      <DialogHeader className="flex w-full bg-[#ECE6F0] pt-6 pb-2 items-start pl-6">
          <DialogTitle className="text-[24px] text-[#1A1847] leading-8 font-firaSans">
            Exportar Usuários
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-4">
          <PDFDownloadLink
            document={<UserPDFDocument allUsers={allUsers} />}
            fileName="EducaBetes_Usuários.pdf"
            
          >
              <Button className="flex gap-2 justify-start text-xl font-normal bg-transparent text-black hover:bg-[#d6cfe0] w-full">
                <FileText size={18}/>
                <span> Exportar como PDF</span>
              </Button>
          </PDFDownloadLink>

          <Button
            onClick={handleExportExcel}
            className="flex gap-2 justify-start text-xl font-normal bg-transparent text-black hover:bg-[#d6cfe0] w-full"
          >
            <FileSpreadsheet size={18} />
            Exportar como Excel
          </Button>
        </div>

        <DialogFooter className="flex gap-4 justify-end p-6 bg-[#ECE6F0]">
          <DialogClose asChild>
            <Button className="bg-[#404AA0] text-[#DFE0FF] leading-5 font-medium text-[14px] px-4 py-2 rounded-[100px] transition-all hover:bg-[#303880]">Fechar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
