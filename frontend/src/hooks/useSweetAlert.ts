import Swal from 'sweetalert2'

const customClass = {
  popup: 'alerts',
  validationMessage: 'alerts'
}

const Toast = Swal.mixin({
  toast: true,
  customClass,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: false
})

export const useSweetAlert = () => {
  const throwToast = async (icon: any, title: string) => {
    await Toast.fire({
      heightAuto: false,
      icon,
      title
    })
  }

  return {
    throwToast
  }
}
