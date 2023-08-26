import AdminEditClient from './admin/AdminEditClient';
import DoctorEditClient from './doctor/DoctorEditClient';
import ManagerEditClient from './manager/ManagerEditClient';
import EditPatient from './reception/EditPatient';

const SwitchViewPatient = () => {
  const role = localStorage.getItem('userRole');

  return (
    <>
      {(() => {
        switch (role) {
          case '3':
            return <AdminEditClient disabled={true} display={"none"} />
          case '1':
            return <DoctorEditClient disabled={true} display={"none"} />
          case '2':
            return <ManagerEditClient disabled={true} display={"none"} />
          case '4':
            return <EditPatient disabled={true} display={"none"} />
          default:
            return null
        }
      })()}
    </>
  )
}

export default SwitchViewPatient;