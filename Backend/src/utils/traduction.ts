export const valueTraduccion = {
  id: 'ID',
  noEmpleado: 'Número de Empleado',
  nss: 'NSS',
  curp: 'CURP',
  rfc: 'RFC',
  blood: 'Tipo de Sangre',
  account: 'Cuenta Bancaria',
  emmergencyContact: 'Contacto de Emergencia',
  positionId: 'Posición',
  admissionDate: 'Fecha de Admisión',
  active: 'Activo',
  emmergencyNumber: 'Número de Emergencia',
  areaId: 'Área',
  quitDate: 'Fecha de Renuncia',
  bornLocation: 'Lugar de Nacimiento',
  genre: 'Género',
  sons: 'Hijos',
  clinicNo: 'Número de Clínica',
  email: 'Correo Electrónico',
  number: 'Número',
  direction: 'Dirección',
  bank: 'Banco',
  infonavitNo: 'Número de Infonavit',
  infonavitFee: 'Cuota de Infonavit',
  infonavitDiscount: 'Descuento de Infonavit',
  positionType: 'Tipo de Posición',
  cim: 'CIM',
  shift: 'Turno',
  nominaSalary: 'Salario Nómina',
  immsSalary: 'Salario IMSS',
  name: 'Nombre',
  paternalLastName: 'Apellido Paterno',
  maternalLastName: 'Apellido Materno',
  nationality: 'Nacionalidad',
  civilStatus: 'Estado Civil',
  bornDate: 'Fecha de Nacimiento',
  studies: 'Estudios',
  quitReason: 'Motivo de Renuncia',
  quitStatus: 'Estado de Renuncia',
  quitNotes: 'Notas de Renuncia',
  username: 'Nombre de Usuario',
  password: 'Contraseña',
  perm_assistance_areas: 'Permisos de Áreas de Asistencia',
  perm_users: 'Permisos de Usuarios',
  perm_assistance: 'Permisos de Asistencia',
  perm_productivity: 'Permisos de Productividad',
  perm_employees: 'Permisos de Empleados',
  perm_inventory: 'Permisos de Inventario',
  programation: 'Programacion',
  jobpo: 'Job o PO',
  import: 'Importacion',
  date: 'Fecha',
  due: 'Fecha',
  anydeskPW: "Anydesk PW",
  lastMaintance: "Ultimo mantenimiento",
  owner: "Usuario",
  docs: "Documentación",
};

export const getTraducction = (value: string) => {
  const lowerValue = value.toLowerCase();
  for (const key in valueTraduccion) {
    if (lowerValue === key.toLowerCase()) {
      return valueTraduccion[key];
    }
  }
  return value; // Return original value if no match found
};
