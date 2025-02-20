import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Patient } from "../../types";
import patientService from "../../services/patients";
import { Typography } from "@mui/material";
import { Male, Female, Transgender } from "@mui/icons-material";

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchPatient = async () => {
      if (id) {
        const patient = await patientService.getById(id);
        setPatient(patient);
      }
    };
    void fetchPatient();
  }, [id]);

  if (!patient) {
    return null;
  }

  const getGenderIcon = () => {
    switch (patient.gender) {
      case "male":
        return <Male />;
      case "female":
        return <Female />;
      default:
        return <Transgender />;
    }
  };

  return (
    <div>
      <Typography variant="h4" style={{ marginTop: "0.5em" }}>
        {patient.name} {getGenderIcon()}
      </Typography>
      <div>
        <p>ssn: {patient.ssn}</p>
        <p>occupation: {patient.occupation}</p>
      </div>
    </div>
  );
};

export default PatientPage;
