import React, { createContext, useState, useEffect, useCallback } from 'react';
import { fetchPatients } from '../services/api';

export const PatientContext = createContext(null);

export function PatientProvider({ children }) {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadPatients = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPatients();
      setPatients(data);
    } catch (err) {
      setError(err.message || 'Failed to load patients');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPatients();
  }, [loadPatients]);

  const getPatientById = (id) => patients.find((p) => p.id === id);

  return (
    <PatientContext.Provider value={{ patients, loading, error, getPatientById, reload: loadPatients }}>
      {children}
    </PatientContext.Provider>
  );
}
