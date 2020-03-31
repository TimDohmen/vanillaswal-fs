export default class NotificationService {


  static toast(text = "", title = text, timer = 5500) {
    // @ts-ignore
    swal.fire({
      title,
      type: "success",
      timer,
      showConfirmButton: false,
      position: "top-right",
      toast: true
    });
  }

  static toastError(error) {
    if (error.isAxiosError) {
      error.message = error.response.data
    }
    // @ts-ignore
    swal.fire({
      title: "Fill in required field",
      text: error.message || error,
      type: "error",
      timer: 8500,
      showConfirmButton: false,
      position: "top-right",
      toast: true
    });
  }

  static async confirmDelete() {
    swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        return true
      }
      else {
        return false
      }
    })
    return false
  }



}