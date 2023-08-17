import AdminEditClient from './admin/AdminEditClient';
import DoctorEditClient from './doctor/DoctorEditClient';
import ManagerEditClient from './manager/ManagerEditClient';
import EditPatient from './reception/EditPatient';

const SwitchEditClient = () => {
  const role = localStorage.getItem('userRole');

  return (
    <>
      {(() => {
        switch (role) {
          case '3':
            return <AdminEditClient />
          case '1':
            return <DoctorEditClient />
          case '2':
            return <ManagerEditClient />
          case '4':
            return <EditPatient />
          default:
            return null
        }
      })()}
    </>
  )
}

export default SwitchEditClient;