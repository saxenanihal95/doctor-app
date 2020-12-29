import { createServer } from "miragejs";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patients from "../static/patients";

let server = createServer();
server.db.loadData({
  patients,
});
server.get("/api/patient/:id", (schema, request) => {
  let id = request.params.id;
  console.log(id);
  return schema.db.patients.find({ guid: id });
});

export default function PatientDetails() {
  const [patient, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);

  const params = useParams();

  const id = params.id;

  useEffect(() => {
    setLoading(true);
    fetch(`/api/patient/${id}`)
      .then((res) => res.json())
      .then((json) => {
        setPatients(json.patients);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
      });
  }, []);
  console.log(patient);
  return <div></div>;
}
