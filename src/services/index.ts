import { verifyEmail } from './verifyEmail';
import { updatePassword } from './updatePassword';
import { Admin, getAdmins } from './Users/GetAdmin';
import { HealthPro, getHealthPro } from './Users/GetHealthPro';
import { Patient, getPatients } from './Users/GetPatients';
import { AdminInput, postAdmin } from './Users/PostAdmin';
import { HealthProInput, postHealthPro } from './Users/PostHealthPro';
import { PatientInput, postPatient, DiagnosisTime, userState } from './Users/PostPatient';
import { Report } from './Reports/GetReport';
import { deleteReport } from './Reports/DeleteReport';
import { updateReport } from './Reports/UpdateReport';
import { ReportInput } from './Reports/PostReport';
import api from './api';

export {
    api,
    updateReport,
    getAdmins,
    deleteReport,
    getPatients, 
    getHealthPro, 
    postAdmin,
    postPatient, 
    postHealthPro,
    verifyEmail,
    updatePassword
};    

export type {
    userState, 
    DiagnosisTime,
    ReportInput,
    Admin,
    Patient, 
    HealthPro, 
    AdminInput, 
    HealthProInput,
    PatientInput,
    Report
};

