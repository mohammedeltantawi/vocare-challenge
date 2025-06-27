"use client";

import TermineBarComponent from '@/components/termine-bar.component';
import CalendarGrid from "@/components/calendar-grid.component";
import ListView from '@/components/list-view.component';
import { ViewEnum } from '@/enums/view-type.enum';
import { Appointment } from "@/models/appointment.model";
import { useState } from 'react';
import { CategoryContext } from '@/context/category.context';
import MonthView from '@/components/month-view.component';
import DaySidebar from '@/components/day-sidebar.component';
import { Category } from '@/models/category.model';
import { Patient } from '@/models/patient.model';
import { PatientContext, usePatients } from '@/context/patient.context';

interface Props {
  appointments: Appointment[];
  categories: Category[];
  patients: Patient[];
}

export default function AppointmentsClient({ appointments, categories, patients }: Props) {
  const [view, setView] = useState<ViewEnum>(ViewEnum.WEEK);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedClient, setSelectedClient] = useState<string>("");
  const [dateRange, setDateRange] = useState<{ from: Date | null; to: Date | null }>({ from: null, to: null });
  const getPatient = (patientId: string) => {
    const patient = patients.find((c) => c.id === patientId);

    return `${patient?.firstname} ${patient?.lastname}`
  }
  const filteredAppointments = appointments.filter(appt => {
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(appt.category);
    const matchesClient = selectedClient === "" || getPatient(appt.patient).toLowerCase().includes(selectedClient.toLowerCase());
    const apptDate = new Date(appt.start);
    const matchesDateRange = (!dateRange.from || apptDate >= dateRange.from) && (!dateRange.to || apptDate <= dateRange.to);
    return matchesCategory && matchesClient && matchesDateRange;
  });

  const startOfWeek = new Date(selectedDate);
  const dayOfWeek = startOfWeek.getDay();
  const diffToMonday = (dayOfWeek + 6) % 7;
  startOfWeek.setDate(startOfWeek.getDate() - diffToMonday);

  const weekDates = [...Array(7)].map((_, i) => {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + i);
    return d;
  });

  const dayAppointments = selectedDate
    ? filteredAppointments.filter(
        (a) => new Date(a.start).toDateString() === selectedDate.toDateString()
      )
    : [];

  return (
    <CategoryContext.Provider value={categories}>
      <PatientContext.Provider value={patients}>
        <main className="p-4">
          <TermineBarComponent
            view={view}
            setView={setView}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            selectedClient={selectedClient}
            setSelectedClient={setSelectedClient}
            dateRange={dateRange}
            setDateRange={setDateRange}
          />
          <div className='flex'>
            <div className='flex-1'>
              {view === ViewEnum.LIST && (
                <ListView appointments={filteredAppointments} selectedDate={selectedDate} />
              )}
              {view === ViewEnum.WEEK && (
                <CalendarGrid weekDates={weekDates} appointments={filteredAppointments} />
              )}
              {view === ViewEnum.MONTH && (
                <MonthView selectedDate={selectedDate} appointments={filteredAppointments} setSelectedDate={setSelectedDate} />
              )}
            </div>

            {selectedDate && view === ViewEnum.MONTH && (
              <div className="w-[350px] shrink-0">
                <DaySidebar date={selectedDate} appointments={dayAppointments} />
              </div>
            )}
          </div>
        </main>
      </PatientContext.Provider>
    </CategoryContext.Provider>
  );
}
