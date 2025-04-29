import React from 'react';
import Image from 'next/image';
import { searchIcon } from '../../assets/index';
import { UserCard } from './userCard';
import { User } from './usersMenu';
import { Upload } from 'lucide-react';
import StatesOptions from 'utils/stateOptions';
import { LogoTitleFile } from '../../assets/index';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Image as PDFImage } from '@react-pdf/renderer';

export function getStateLabel(key: string): string {
  const found = StatesOptions.find(option => option.key === key);
  return found ? found.value : key;
}

interface UsersTabProps {
  users: User[]; // já filtrados e paginados
  allUsers: User[]; // todos os usuários
  loading: boolean;
  error: string | null;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const styles = StyleSheet.create({
  page: {
    padding: 24,
    fontSize: 8,
    fontFamily: 'Helvetica',
  },
  section: {
    marginBottom: 24,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
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
    overflow: 'hidden', // simula cantos arredondados
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


const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

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

export const UsersTab: React.FC<UsersTabProps> = ({
  users,
  allUsers,
  error,
  searchTerm,
  onSearchChange,
}) => {
  
  if (error) return <div>Erro: {error}</div>;

  return (
    <div className="flex flex-col bg-white font-firaSans flex-1 rounded-b-[28px] px-8 py-4 gap-6 h-full">
      
      {/* Barra de Pesquisa */}
      <div className='flex felx-row gap-2'>
        <div className="sticky top-0 w-[60%]">
          <div className="relative flex justify-center items-center">
            <div className="absolute left-1">
              <Image src={searchIcon} alt="Search icon" />
            </div>
            <input
              type="text"
              placeholder="Buscar usuário..."
              value={searchTerm}
              onChange={(e) => {
                onSearchChange(e.target.value);
              }}
              className="w-full focus:outline-none p-3 pl-12 bg-[#ECE6F0] rounded-[28px] text-black"
            />
          </div>
        </div>

        {/* Botão de Exportar Usuários */}
        <PDFDownloadLink
          document={<UserPDFDocument allUsers={allUsers} />}
          fileName="usuarios.pdf"
          className='flex items-center gap-2 px-4 py-2 bg-[#ECE6F0] rounded-full hover:bg-[#d6cfe0] transition'
        >
          <Upload size={18} strokeWidth={2} color="black" />
          <span className="text-black font-firaSans">Exportar Usuários</span>
        </PDFDownloadLink>
      </div>

      {/* Lista de Usuários */}
      <div className="flex flex-col overflow-y-auto mt-6 mb-6 flex-1 scrollbar-hide">
        {users.length === 0 ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-black font-firaSans">
              {searchTerm
                ? "Nenhum usuário encontrado"
                : "Nenhum usuário cadastrado"}
            </p>
          </div>
        ) : (
          users.map(user => (
            <UserCard
              key={`${user.userRole}-${user.id}`}
              userName={user.name}
              userRole={user.userRole}
            />
          ))
        )}
      </div>
    </div>
  );
};
